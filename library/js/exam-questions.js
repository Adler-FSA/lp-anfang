// ░░ exam-questions.js – Sammeln der 50 Prüfungsfragen (DE/EN) ░░
// Holt 4×10 Fragen aus den Kurs-Bausteinen + 10 aus exam-extra.js (falls vorhanden).
// Kein doppelter Content: wir lesen die originalen Kursfragen direkt aus den Kurs-Dateien.

(function () {
  // Versucht verschiedene globale Variablennamen zu finden (course1..4)
  function pickCourseVar(n) {
    const candidates = [
      n === 1 ? "block03_course" : `block03_course_${n}`,
      // Fallbacks, falls anders benannt wurde:
      n === 1 ? "block_03_course" : `block_03_course_${n}`,
      n === 1 ? "course_block_03" : `course_block_03_${n}`
    ];
    for (const k of candidates) {
      if (typeof window[k] === "object") return window[k];
    }
    return null;
  }

  // Extrahiert DE/EN-Fragen aus einem Kurs-Objekt in vereinheitlichtem Format {q,a,mentor}
  function extractQA(courseObj) {
    if (!courseObj) return { de: [], en: [] };
    const map = (arr) =>
      (arr || []).map((q) => ({
        q: q.q,
        a: (q.a || []).map((o) => ({ text: o.text, correct: !!o.correct })),
        mentor: q.mentor || ""
      }));
    return {
      de: map(courseObj.de?.questions || courseObj.de?.items || []),
      en: map(courseObj.en?.questions || courseObj.en?.items || [])
    };
  }

  // Kurs 1–4 einsammeln
  const c1 = extractQA(pickCourseVar(1));
  const c2 = extractQA(pickCourseVar(2));
  const c3 = extractQA(pickCourseVar(3));
  const c4 = extractQA(pickCourseVar(4));

  // Zusatzfragen (optional)
  const extra_de = (window.fsa_exam_extra && window.fsa_exam_extra.de) || [];
  const extra_en = (window.fsa_exam_extra && window.fsa_exam_extra.en) || [];

  // Finaler Export
  window.fsa_exam_questions = {
    de: {
      course1: c1.de,
      course2: c2.de,
      course3: c3.de,
      course4: c4.de,
      extra: extra_de
    },
    en: {
      course1: c1.en.length ? c1.en : c1.de, // falls EN noch nicht übersetzt, nimm DE
      course2: c2.en.length ? c2.en : c2.de,
      course3: c3.en.length ? c3.en : c3.de,
      course4: c4.en.length ? c4.en : c4.de,
      extra: extra_en.length ? extra_en : extra_de
    }
  };
})();
