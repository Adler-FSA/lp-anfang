<!-- ░░ Baustein 03 – Quiz-Layout mit Fortschrittsbalken + A/B/C Labels ░░ -->
<section id="quiz-block">
  <div id="quiz-header">
    <div id="quiz-progress">
      <div id="quiz-progress-bar"></div>
    </div>
    <div id="quiz-question-info">
      <span id="quiz-question-number"></span>
      <span id="quiz-question-total"></span>
    </div>
    <h2 id="quiz-question-text"></h2>
  </div>

  <div id="quiz-answers"></div>

  <div id="quiz-footer">
    <button id="quiz-next-btn" disabled data-i18n="nextQuestion">Nächste Frage</button>
  </div>
</section>

<style>
  #quiz-block {
    max-width: 700px;
    margin: 50px auto;
    background: #0f172a;
    padding: 2rem;
    border-radius: 10px;
    color: #e5e7eb;
    font-family: system-ui, sans-serif;
    box-shadow: 0 0 15px rgba(212, 175, 55, 0.25);
  }
  #quiz-progress {
    background: #1e293b;
    height: 6px;
    width: 100%;
    border-radius: 4px;
    margin-bottom: 1rem;
    overflow: hidden;
  }
  #quiz-progress-bar {
    background: #d4af37;
    width: 0%;
    height: 100%;
    transition: width 0.3s ease;
  }
  #quiz-question-info {
    display: flex;
    justify-content: space-between;
    font-size: 0.9rem;
    color: #d4af37;
    margin-bottom: 0.5rem;
  }
  #quiz-question-text {
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 1rem;
  }
  .quiz-answer {
    display: flex;
    align-items: center;
    background: #1e293b;
    border: 1px solid transparent;
    padding: 0.75rem 1rem;
    border-radius: 8px;
    cursor: pointer;
    margin-bottom: 0.75rem;
    transition: all 0.2s ease;
  }
  .quiz-answer:hover {
    border-color: #d4af37;
  }
  .quiz-label {
    display: inline-block;
    width: 24px;
    height: 24px;
    background: #d4af37;
    color: #0f172a;
    font-weight: 700;
    text-align: center;
    line-height: 24px;
    border-radius: 50%;
    margin-right: 10px;
  }
  .quiz-answer.selected {
    border-color: #d4af37;
    background: #0b0f14;
  }
  #quiz-footer {
    text-align: right;
    margin-top: 1rem;
  }
  #quiz-next-btn {
    background: #2563eb;
    color: #fff;
    border: none;
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    border-radius: 8px;
    cursor: pointer;
    transition: background 0.2s ease;
  }
  #quiz-next-btn:hover:enabled {
    background: #1d4ed8;
  }
  #quiz-next-btn:disabled {
    background: #475569;
    cursor: not-allowed;
  }
</style>

<script>
  (function () {
    const lang = document.documentElement.lang === 'en' ? 'en' : 'de';
    const quizData = window.block03_course[lang].questions;
    const totalQuestions = quizData.length;

    let currentIndex = 0;
    let selectedAnswer = null;

    const questionNumber = document.getElementById('quiz-question-number');
    const questionTotal = document.getElementById('quiz-question-total');
    const questionText = document.getElementById('quiz-question-text');
    const answersContainer = document.getElementById('quiz-answers');
    const nextButton = document.getElementById('quiz-next-btn');
    const progressBar = document.getElementById('quiz-progress-bar');

    questionTotal.textContent = ` / ${totalQuestions}`;

    function loadQuestion(index) {
      const current = quizData[index];
      questionNumber.textContent = `Frage ${index + 1}`;
      questionText.textContent = current.q;

      answersContainer.innerHTML = '';
      const labels = ['A', 'B', 'C'];

      current.a.forEach((answer, i) => {
        const answerEl = document.createElement('div');
        answerEl.classList.add('quiz-answer');
        answerEl.dataset.correct = answer.correct;

        const labelEl = document.createElement('span');
        labelEl.classList.add('quiz-label');
        labelEl.textContent = labels[i];

        const textEl = document.createElement('span');
        textEl.textContent = answer.text;

        answerEl.appendChild(labelEl);
        answerEl.appendChild(textEl);
        answersContainer.appendChild(answerEl);

        answerEl.addEventListener('click', () => {
          document.querySelectorAll('.quiz-answer').forEach(a => a.classList.remove('selected'));
          answerEl.classList.add('selected');
          selectedAnswer = answerEl;
          nextButton.disabled = false;
        });
      });

      updateProgress(index);
      nextButton.disabled = true;
      selectedAnswer = null;
    }

    function updateProgress(index) {
      const percent = ((index) / totalQuestions) * 100;
      progressBar.style.width = `${percent}%`;
    }

    nextButton.addEventListener('click', () => {
      if (!selectedAnswer) return;
      currentIndex++;
      if (currentIndex < totalQuestions) {
        loadQuestion(currentIndex);
      } else {
        progressBar.style.width = '100%';
        questionText.textContent = '✅ Quiz abgeschlossen';
        answersContainer.innerHTML = '';
        nextButton.style.display = 'none';
      }
    });

    loadQuestion(currentIndex);
  })();
</script>
