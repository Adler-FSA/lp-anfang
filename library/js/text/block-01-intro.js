// ░░ Baustein 01 – Begrüßungsblock (DE/EN) ░░
// Enthält Text + automatische Strukturierung (Karten-Layout + Abstand zum Hauptmenü)

const block01_intro = {
  de: {
    title: "Grundkurs 1 – Basis",
    line1: "Herzlich willkommen in deinem ersten Grundkurs. Es gibt vier Grundkurse – jeder baut auf dem vorherigen auf und führt dich sicher bis zu deiner Prüfung.",
    line2: "Insgesamt gibt es 40 Fragen, verteilt auf vier Kurse. Du erhältst je Kurs einen Status: 0–5 wiederholen, 6–7 Bronze, 8–9 Silber, 10 Gold. In der Prüfung werden alle 40 Fragen durcheinander abgefragt. Das Ziel ist, dir Sicherheit im Umgang zu lehren.",
    line3: "Am Ende jedes Kurses bekommst du eine Auswertung: 1) deine Frage, 2) deine Antwort, 3) ein Mentor-Tipp bei falscher Antwort oder ein kurzes Lob bei richtiger. Bitte trage unten Vorname und Nachname ein – dein Mentor spricht dich persönlich an und dein Name erscheint später auf dem Zertifikat."
  },
  en: {
    title: "Basic Course 1 – Foundation",
    line1: "Welcome to your first basic course. There are four basic courses – each builds on the previous one and guides you safely to your final exam.",
    line2: "There are 40 questions in total, distributed across four courses. For each course you receive a status: 0–5 repeat, 6–7 bronze, 8–9 silver, 10 gold. In the final exam, all 40 questions appear in random order. The goal is to help you gain confidence.",
    line3: "At the end of each course you’ll receive an evaluation: 1) your question, 2) your answer, 3) a mentor tip if wrong or short praise if right. Please enter your first and last name below – your mentor will address you personally and your name will later appear on the certificate."
  }
};

// ░░ Renderer – sorgt automatisch für Stil & Abstand ░░
function renderIntro(lang = "de") {
  const t = block01_intro[lang] || block01_intro.de;
  const section = document.getElementById("intro");
  if (!section) return;

  section.className = "card intro-block";
  section.style.marginTop = "3cm"; // fester Abstand zum Hauptmenü
  section.innerHTML = `
    <h1>${t.title}</h1>
    <p>${t.line1}</p>
    <p>${t.line2}</p>
    <p>${t.line3}</p>
  `;
}
