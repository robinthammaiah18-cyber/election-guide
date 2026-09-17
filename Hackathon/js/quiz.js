/**
 * Civic Knowledge Quiz Engine
 * Tests voter literacy, explains right/wrong answers with educational feedback,
 * and generates a shareable 'Certified Informed Voter' certificate.
 */

class CivicQuiz {
  constructor() {
    this.allQuestions = ELECTION_DATA.quiz || [];
    this.totalPerQuiz = 5;
    this.previousQuestionIds = new Set();
    this.questions = [];
    this.currentIndex = 0;
    this.score = 0;
    this.hasAnswered = false;

    this.initElements();
    this.bindEvents();
    this.startNewQuizSession();
  }

  initElements() {
    this.questionScreenEl = document.getElementById("quizQuestionScreen");
    this.resultScreenEl = document.getElementById("quizResultScreen");
    this.metaEl = document.getElementById("quizMeta");
    this.progressBarEl = document.getElementById("quizProgressBar");
    this.questionTextEl = document.getElementById("quizQuestionText");
    this.optionsListEl = document.getElementById("quizOptionsList");
    this.feedbackBoxEl = document.getElementById("quizFeedbackBox");
    this.nextBtnEl = document.getElementById("quizNextBtn");
    this.restartBtnEl = document.getElementById("quizRestartBtn");

    // Result elements
    this.scoreTextEl = document.getElementById("quizScoreText");
    this.scoreGradeEl = document.getElementById("quizScoreGrade");
    this.certNameInputEl = document.getElementById("certNameInput");
    this.certPrintBtnEl = document.getElementById("certPrintBtn");
  }

  bindEvents() {
    if (this.nextBtnEl) {
      this.nextBtnEl.addEventListener("click", () => this.handleNext());
    }
    if (this.restartBtnEl) {
      this.restartBtnEl.addEventListener("click", () => this.restartQuiz());
    }

    if (this.certPrintBtnEl) {
      this.certPrintBtnEl.addEventListener("click", () => window.print());
    }
  }

  startNewQuizSession() {
    this.questions = this.sampleQuestions(this.totalPerQuiz);
    this.currentIndex = 0;
    this.score = 0;
    this.hasAnswered = false;

    if (this.resultScreenEl) this.resultScreenEl.classList.remove("show");
    if (this.questionScreenEl) this.questionScreenEl.style.display = "block";

    this.renderQuestion();
  }

  sampleQuestions(n) {
    if (!this.allQuestions || this.allQuestions.length === 0) return [];

    // Create a copy of the question pool
    const pool = [...this.allQuestions];

    // Fisher-Yates shuffle
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }

    // Filter questions not used in the immediately preceding attempt
    const fresh = pool.filter(q => !this.previousQuestionIds.has(q.id));
    let selected = [];

    if (fresh.length >= n) {
      selected = fresh.slice(0, n);
    } else {
      // If pool of fresh questions is low, reset history and pick from shuffled pool
      this.previousQuestionIds.clear();
      selected = pool.slice(0, n);
    }

    // Save selected question IDs for tracking next retake
    this.previousQuestionIds = new Set(selected.map(q => q.id));

    // Dynamically shuffle options for each question so answers are distributed across A, B, C, and D
    return selected.map(q => {
      const correctText = q.options[q.correct];
      const shuffledOptions = [...q.options];
      for (let i = shuffledOptions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledOptions[i], shuffledOptions[j]] = [shuffledOptions[j], shuffledOptions[i]];
      }
      return {
        ...q,
        options: shuffledOptions,
        correct: shuffledOptions.indexOf(correctText)
      };
    });
  }

  renderQuestion() {
    if (this.currentIndex >= this.questions.length) {
      this.showResults();
      return;
    }

    this.hasAnswered = false;
    const currentQ = this.questions[this.currentIndex];

    // Update Progress
    const progressPercent = ((this.currentIndex + 1) / this.questions.length) * 100;
    if (this.progressBarEl) this.progressBarEl.style.width = `${progressPercent}%`;

    // Update Meta
    if (this.metaEl) {
      this.metaEl.textContent = `Question ${this.currentIndex + 1} of ${this.questions.length}`;
    }

    // Question text
    if (this.questionTextEl) {
      this.questionTextEl.textContent = currentQ.question;
    }

    // Reset Feedback & Next Button
    if (this.feedbackBoxEl) {
      this.feedbackBoxEl.className = "quiz-feedback-box";
      this.feedbackBoxEl.innerHTML = "";
    }
    if (this.nextBtnEl) {
      this.nextBtnEl.disabled = true;
      this.nextBtnEl.textContent = this.currentIndex === this.questions.length - 1 ? "View Results" : "Next Question";
    }

    // Render Options
    if (this.optionsListEl) {
      this.optionsListEl.innerHTML = "";
      currentQ.options.forEach((optText, index) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "quiz-option-btn";
        btn.innerHTML = `<strong>${String.fromCharCode(65 + index)}.</strong> <span>${optText}</span>`;
        btn.addEventListener("click", () => this.selectOption(index, btn));
        this.optionsListEl.appendChild(btn);
      });
    }
  }

  selectOption(selectedIndex, buttonEl) {
    if (this.hasAnswered) return;
    this.hasAnswered = true;

    const currentQ = this.questions[this.currentIndex];
    const isCorrect = selectedIndex === currentQ.correct;

    // Disable all options
    const allOptionBtns = this.optionsListEl.querySelectorAll(".quiz-option-btn");
    allOptionBtns.forEach((btn, idx) => {
      btn.disabled = true;
      if (idx === currentQ.correct) {
        btn.classList.add("correct");
      }
    });

    if (isCorrect) {
      this.score++;
      buttonEl.classList.add("correct");
      if (this.feedbackBoxEl) {
        this.feedbackBoxEl.className = "quiz-feedback-box show correct";
        this.feedbackBoxEl.innerHTML = `<strong>Correct!</strong> ${currentQ.explanation}`;
      }
    } else {
      buttonEl.classList.add("wrong");
      if (this.feedbackBoxEl) {
        this.feedbackBoxEl.className = "quiz-feedback-box show wrong";
        this.feedbackBoxEl.innerHTML = `<strong>Incorrect.</strong> ${currentQ.explanation}`;
      }
    }

    if (this.nextBtnEl) {
      this.nextBtnEl.disabled = false;
    }
  }

  handleNext() {
    this.currentIndex++;
    this.renderQuestion();
  }

  showResults() {
    if (this.questionScreenEl) this.questionScreenEl.style.display = "none";
    if (this.resultScreenEl) this.resultScreenEl.classList.add("show");

    const percentage = Math.round((this.score / this.questions.length) * 100);

    if (this.scoreTextEl) {
      this.scoreTextEl.textContent = `${this.score} / ${this.questions.length} (${percentage}%)`;
    }

    let gradeTitle = "";
    if (percentage === 100) {
      gradeTitle = "Master Voter - 100% Democratic Literacy!";
      this.triggerConfetti();
    } else if (percentage >= 80) {
      gradeTitle = "Certified Informed Voter - Election Ready!";
      this.triggerConfetti();
    } else if (percentage >= 60) {
      gradeTitle = "Good Awareness - Minor Refresher Recommended";
    } else {
      gradeTitle = "First-Time Learner - Check Our Step-by-Step Guide";
    }

    if (this.scoreGradeEl) {
      this.scoreGradeEl.textContent = gradeTitle;
    }
  }

  restartQuiz() {
    this.startNewQuizSession();
  }

  // Simple pure JS canvas confetti
  triggerConfetti() {
    const canvas = document.createElement("canvas");
    canvas.id = "confettiCanvas";
    canvas.style.position = "fixed";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.width = "100vw";
    canvas.style.height = "100vh";
    canvas.style.pointerEvents = "none";
    canvas.style.zIndex = "99999";
    document.body.appendChild(canvas);

    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const pieces = [];
    const colors = ["#2563eb", "#059669", "#d97706", "#dc2626", "#8b5cf6"];

    for (let i = 0; i < 70; i++) {
      pieces.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        velY: Math.random() * 3 + 2,
        velX: Math.random() * 2 - 1,
        angle: Math.random() * 360
      });
    }

    let animationFrame;
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pieces.forEach(p => {
        p.y += p.velY;
        p.x += p.velX;
        p.angle += 3;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.angle * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();
      });

      if (pieces[0].y < canvas.height * 1.5) {
        animationFrame = requestAnimationFrame(render);
      } else {
        cancelAnimationFrame(animationFrame);
        canvas.remove();
      }
    };
    render();

    setTimeout(() => {
      if (document.getElementById("confettiCanvas")) {
        canvas.remove();
      }
    }, 4500);
  }
}

// Initialize on DOM ready
document.addEventListener("DOMContentLoaded", () => {
  window.civicQuiz = new CivicQuiz();
});
