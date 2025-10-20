// Baustein 02 – Nameingabe & lokale Speicherung (DE/EN)
// DSGVO-konform: speichert nur lokal im Browser, keine Serverübertragung

const block02_userdata = {
  de: {
    labelFirst: "Vorname",
    labelLast: "Nachname",
    buttonStart: "Kurs starten",
    placeholder: "Bitte trage deinen Namen ein, damit dein Mentor dich persönlich ansprechen kann."
  },
  en: {
    labelFirst: "First name",
    labelLast: "Last name",
    buttonStart: "Start course",
    placeholder: "Please enter your name so your mentor can address you personally."
  }
};

// Logik für lokale Speicherung und Wiederherstellung
document.addEventListener("DOMContentLoaded", () => {
  const first = document.getElementById("firstName");
  const last = document.getElementById("lastName");
  const form = document.getElementById("nameForm");

  // Vorhandene Daten laden (falls schon gespeichert)
  const savedFirst = localStorage.getItem("fsa_firstName");
  const savedLast = localStorage.getItem("fsa_lastName");
  if (savedFirst) first.value = savedFirst;
  if (savedLast) last.value = savedLast;

  // Beim Absenden speichern
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    localStorage.setItem("fsa_firstName", first.value.trim());
    localStorage.setItem("fsa_lastName", last.value.trim());
  });
});
