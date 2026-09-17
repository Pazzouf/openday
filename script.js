/* =========================================
   DOMANDE
   =========================================

   A (indice 0) → Liceo scientifico
   B (indice 1) → Istituto tecnico informatico
   C (indice 2) → Liceo economico sociale

   Non esistono risposte corrette o sbagliate.
   ========================================= */

const questions = [
  {
    question: "Cosa ti piacerebbe fare da grande?",
    answers: [
      "A. Un lavoro dove aiuto le persone o le ascolto, tipo insegnante, psicologo o educatore",
      "B. Un lavoro con computer, macchine o tecnologia, tipo programmatore, tecnico o ingegnere",
      "C. Un lavoro dove parlo con la gente, mi informo su quello che succede nel mondo o mi occupo di come funziona la società"
    ]
  },
  {
    question: "Quale materia ti piace di più a scuola?",
    answers: [
      "A. Umanistiche (italiano, storia, filosofia)",
      "B. Tecniche (informatica, sistemi e reti)",
      "C. Economiche sociali (diritto, economia)"
    ]
  },
  {
    question: "Se potessi scegliere un laboratorio pomeridiano, quale prenderesti?",
    answers: [
      "A. Teatro o scrittura",
      "B. Robotica o coding",
      "C. Lingue (conversazioni in lingue straniere) o simulazione di un processo di tribunale"
    ]
  },
  {
    question: "In un lavoro di gruppo, cosa fai di solito?",
    answers: [
      "A. Ascolto le idee di tutti e cerco di far andare d'accordo il gruppo",
      "B. Mi occupo del computer, delle ricerche o della parte pratica",
      "C. Espongo il lavoro alla classe e cerco di convincere gli altri delle nostre idee"
    ]
  },
  {
    question: "Immagina di avere un pomeriggio libero, senza compiti: cosa faresti più volentieri?",
    answers: [
      "A. Leggere un libro",
      "B. Provare a smontare o sistemare qualcosa, o giocare con un programma al computer",
      "C. Guardare un video o ascoltare un podcast su un fatto di attualità che ti incuriosisce"
    ]
  }
];


/* =========================================
   STATO
   ========================================= */

let currentQuestion = 0;

const scores = {
  scientifico: 0,
  informatico: 0,
  economico:   0
};


/* =========================================
   RIFERIMENTI DOM
   ========================================= */

const questionEl  = document.getElementById("question");
const progressEl  = document.getElementById("progress");
const buttons     = [
  document.getElementById("btn-0"),
  document.getElementById("btn-1"),
  document.getElementById("btn-2")
];


/* =========================================
   CARICA DOMANDA
   ========================================= */

function loadQuestion() {
  const q = questions[currentQuestion];

  questionEl.textContent = q.question;
  progressEl.textContent = `Domanda ${currentQuestion + 1} di ${questions.length}`;

  buttons.forEach((btn, i) => {
    btn.textContent = q.answers[i];
  });
}


/* =========================================
   RISPOSTA

   0 → A → Scientifico
   1 → B → Informatico
   2 → C → Economico sociale
   ========================================= */

function answer(selectedIndex) {
  const map = ["scientifico", "informatico", "economico"];
  scores[map[selectedIndex]]++;

  currentQuestion++;

  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    showResult();
  }
}


/* =========================================
   CALCOLO E MOSTRA RISULTATO
   ========================================= */

function showResult() {
  document.getElementById("quiz-section").classList.add("d-none");
  document.getElementById("result-section").classList.remove("d-none");

  document.getElementById("score-scientifico").textContent = scores.scientifico;
  document.getElementById("score-informatico").textContent = scores.informatico;
  document.getElementById("score-economico").textContent   = scores.economico;

  const maxScore = Math.max(
    scores.scientifico,
    scores.informatico,
    scores.economico
  );

  const labels = {
    scientifico: "Liceo delle scienze umane",
    informatico: "Istituto tecnico informatico",
    economico:   "Liceo economico sociale"
  };

  const consigliati = Object.entries(scores)
    .filter(([, v]) => v === maxScore)
    .map(([k]) => labels[k]);

  const resultEl = document.getElementById("result-text");

  if (consigliati.length === 1) {
    resultEl.innerHTML = `
      <strong>Il tuo indirizzo consigliato è:</strong><br><br>
      🎓 <strong>${consigliati[0]}</strong>
    `;
  } else {
    resultEl.innerHTML = `
      <strong>Il risultato mostra un pareggio tra:</strong><br><br>
      🎓 <strong>${consigliati.join("<br>🎓 ")}</strong>
    `;
  }

  createQRCode();
}


/* =========================================
   GENERAZIONE QR CODE
   ========================================= */

function createQRCode() {
  const container = document.getElementById("qrcode");
  container.innerHTML = "";

  new QRCode(container, {
    text:         window.location.href,
    width:        200,
    height:       200,
    colorDark:    "#000000",
    colorLight:   "#ffffff",
    correctLevel: QRCode.CorrectLevel.H
  });
}


/* =========================================
   AVVIO
   ========================================= */

loadQuestion();
