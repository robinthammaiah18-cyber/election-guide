/**
 * Main Application Coordinator
 * Controls navigation, roadmap timeline explorer, procedure tabs,
 * error filters, myth flippers, FAQ search accordion, and accessibility settings.
 */

document.addEventListener("DOMContentLoaded", () => {
  initAccessibility();
  initNavigation();
  initRoadmapAndTimeline();
  initProceduresTabs();
  initErrorTroubleshooter();
  initMythFlippers();
  initFaqAccordion();
});

/* ==========================================================================
   1. Accessibility Engine (Theme, Font Scaling)
   ========================================================================== */
function initAccessibility() {
  const contrastBtn = document.getElementById("a11yContrastBtn");
  const fontDecBtn = document.getElementById("a11yFontDecBtn");
  const fontResetBtn = document.getElementById("a11yFontResetBtn");
  const fontIncBtn = document.getElementById("a11yFontIncBtn");

  // Load persisted preferences
  const savedTheme = localStorage.getItem("election_guide_theme");
  const savedFontSize = localStorage.getItem("election_guide_fontsize");

  if (savedTheme === "high-contrast") {
    document.documentElement.setAttribute("data-theme", "high-contrast");
    if (contrastBtn) contrastBtn.setAttribute("aria-pressed", "true");
  }

  if (savedFontSize) {
    document.documentElement.setAttribute("data-fontsize", savedFontSize);
    updateFontBtnStates(savedFontSize);
  }

  if (contrastBtn) {
    contrastBtn.addEventListener("click", () => {
      const currentTheme = document.documentElement.getAttribute("data-theme");
      const newTheme = currentTheme === "high-contrast" ? "default" : "high-contrast";
      
      if (newTheme === "high-contrast") {
        document.documentElement.setAttribute("data-theme", "high-contrast");
        contrastBtn.setAttribute("aria-pressed", "true");
        localStorage.setItem("election_guide_theme", "high-contrast");
      } else {
        document.documentElement.removeAttribute("data-theme");
        contrastBtn.setAttribute("aria-pressed", "false");
        localStorage.setItem("election_guide_theme", "default");
      }
    });
  }

  function setFontSize(size) {
    if (size === "default") {
      document.documentElement.removeAttribute("data-fontsize");
      localStorage.setItem("election_guide_fontsize", "default");
    } else {
      document.documentElement.setAttribute("data-fontsize", size);
      localStorage.setItem("election_guide_fontsize", size);
    }
    updateFontBtnStates(size);
  }

  function updateFontBtnStates(activeSize) {
    if (fontDecBtn) fontDecBtn.classList.toggle("active", activeSize === "small");
    if (fontResetBtn) fontResetBtn.classList.toggle("active", !activeSize || activeSize === "default");
    if (fontIncBtn) fontIncBtn.classList.toggle("active", activeSize === "large");
  }

  if (fontDecBtn) fontDecBtn.addEventListener("click", () => setFontSize("small"));
  if (fontResetBtn) fontResetBtn.addEventListener("click", () => setFontSize("default"));
  if (fontIncBtn) fontIncBtn.addEventListener("click", () => setFontSize("large"));
}

/* ==========================================================================
   2. Navigation & Mobile Menu
   ========================================================================== */
function initNavigation() {
  const menuBtn = document.getElementById("mobileMenuToggle");
  const navLinksContainer = document.querySelector(".nav-links");

  if (menuBtn && navLinksContainer) {
    menuBtn.addEventListener("click", () => {
      const isExpanded = menuBtn.getAttribute("aria-expanded") === "true";
      menuBtn.setAttribute("aria-expanded", !isExpanded);
      navLinksContainer.style.display = isExpanded ? "none" : "flex";
      navLinksContainer.style.flexDirection = "column";
      navLinksContainer.style.position = "absolute";
      navLinksContainer.style.top = "100%";
      navLinksContainer.style.left = "0";
      navLinksContainer.style.width = "100%";
      navLinksContainer.style.background = "#ffffff";
      navLinksContainer.style.padding = "16px";
      navLinksContainer.style.boxShadow = "0 10px 15px -3px rgba(0,0,0,0.1)";
      navLinksContainer.style.borderBottom = "1px solid var(--surface-border)";
    });

    // Close menu when link is clicked
    navLinksContainer.querySelectorAll(".nav-link").forEach(link => {
      link.addEventListener("click", () => {
        if (window.innerWidth <= 768) {
          menuBtn.setAttribute("aria-expanded", "false");
          navLinksContainer.style.display = "none";
        }
      });
    });
  }

  // Smooth active link highlight on scroll
  const sections = document.querySelectorAll("section[id]");
  window.addEventListener("scroll", () => {
    let scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute("id");
      const matchingLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

      if (matchingLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          matchingLink.classList.add("active");
        } else {
          matchingLink.classList.remove("active");
        }
      }
    });
  });
}

/* ==========================================================================
   3. Interactive Roadmap & Detailed Timeline Explorer
   ========================================================================== */
function initRoadmapAndTimeline() {
  const roadmapNodesContainer = document.getElementById("roadmapTrack");
  const stageExplorerWrap = document.getElementById("stageExplorerWrap");
  if (!roadmapNodesContainer || !stageExplorerWrap || !ELECTION_DATA.stages) return;

  let currentStageIndex = 0;

  // Render clickable roadmap nodes
  roadmapNodesContainer.innerHTML = "";
  ELECTION_DATA.stages.forEach((st, idx) => {
    const node = document.createElement("div");
    node.className = `roadmap-node ${idx === 0 ? "active" : ""}`;
    node.setAttribute("data-index", idx);
    node.setAttribute("role", "button");
    node.setAttribute("tabindex", "0");
    node.innerHTML = `
      <div class="node-icon-circle">${st.number}</div>
      <span class="node-step-label">Stage ${st.number}</span>
      <span class="node-step-title">${st.shortTitle}</span>
    `;

    node.addEventListener("click", () => {
      currentStageIndex = idx;
      updateStageView();
    });

    node.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        currentStageIndex = idx;
        updateStageView();
      }
    });

    roadmapNodesContainer.appendChild(node);
  });

  function updateStageView() {
    // 1. Update node active states
    const nodes = roadmapNodesContainer.querySelectorAll(".roadmap-node");
    nodes.forEach((n, i) => n.classList.toggle("active", i === currentStageIndex));

    // 2. Render Stage Explorer Details
    const stage = ELECTION_DATA.stages[currentStageIndex];

    const deadlinesHtml = stage.keyDeadlines.map(d => `
      <div class="deadline-item">
        <span class="deadline-time-tag">${d.time}</span>
        <div class="deadline-info">
          <h5>${d.label}</h5>
          <p>${d.desc}</p>
        </div>
      </div>
    `).join("");

    stageExplorerWrap.innerHTML = `
      <div class="stage-explorer-card">
        <div class="stage-card-header">
          <div>
            <div class="stage-badge-group">
              <span class="stage-number-pill">Stage ${stage.number} of ${ELECTION_DATA.stages.length}</span>
              <span class="stage-timespan">⏱ ${stage.timelineSpan}</span>
            </div>
            <h3 class="stage-main-title">${stage.title}</h3>
          </div>
        </div>

        <div class="stage-card-body">
          <div class="stage-main-info">
            <p class="stage-overview-text">${stage.overview}</p>
            
            <div class="key-deadlines-section">
              <h4>📅 Important Deadlines & Timelines</h4>
              <div class="deadlines-list">
                ${deadlinesHtml}
              </div>
            </div>
          </div>

          <div class="stage-sidebar">
            <div class="sidebar-box action-box">
              <div class="sidebar-box-title">
                <span>🎯 What Citizens Should Do:</span>
              </div>
              <p>${stage.citizenAction}</p>
            </div>

            <div class="sidebar-box behind-scenes-box">
              <div class="sidebar-box-title">
                <span>⚙️ Behind the Scenes:</span>
              </div>
              <p>${stage.behindTheScenes}</p>
            </div>
          </div>
        </div>

        <div class="stage-nav-controls">
          <button type="button" class="btn-secondary" id="stagePrevBtn" ${currentStageIndex === 0 ? "disabled" : ""}>
            ← Previous Stage
          </button>
          <span>Step ${stage.number} of ${ELECTION_DATA.stages.length}</span>
          <button type="button" class="btn-primary" id="stageNextBtn" ${currentStageIndex === ELECTION_DATA.stages.length - 1 ? "disabled" : ""}>
            Next Stage →
          </button>
        </div>
      </div>
    `;

    // Bind prev / next buttons
    const prevBtn = document.getElementById("stagePrevBtn");
    const nextBtn = document.getElementById("stageNextBtn");

    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        if (currentStageIndex > 0) {
          currentStageIndex--;
          updateStageView();
        }
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        if (currentStageIndex < ELECTION_DATA.stages.length - 1) {
          currentStageIndex++;
          updateStageView();
        }
      });
    }
  }

  // Initial render
  updateStageView();
}

/* ==========================================================================
   4. Procedures Walkthrough Tabs
   ========================================================================== */
function initProceduresTabs() {
  const tabsWrap = document.getElementById("procedureTabs");
  const stepsContainer = document.getElementById("procedureStepsContainer");
  if (!tabsWrap || !stepsContainer || !ELECTION_DATA.procedures) return;

  let activeProcIndex = 0;

  tabsWrap.innerHTML = "";
  ELECTION_DATA.procedures.forEach((proc, idx) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = `proc-tab-btn ${idx === 0 ? "active" : ""}`;
    btn.textContent = proc.title.split("(")[0].trim();
    btn.addEventListener("click", () => {
      activeProcIndex = idx;
      tabsWrap.querySelectorAll(".proc-tab-btn").forEach((b, i) => b.classList.toggle("active", i === idx));
      renderSteps();
    });
    tabsWrap.appendChild(btn);
  });

  function renderSteps() {
    const proc = ELECTION_DATA.procedures[activeProcIndex];
    stepsContainer.innerHTML = "";

    proc.steps.forEach(st => {
      const card = document.createElement("div");
      card.className = "step-card";
      card.innerHTML = `
        <div class="step-number-tag">${st.step}</div>
        <h4>${st.title}</h4>
        <p>${st.desc}</p>
      `;
      stepsContainer.appendChild(card);
    });
  }

  renderSteps();
}

/* ==========================================================================
   5. Common Errors & Challenges Troubleshooter
   ========================================================================== */
function initErrorTroubleshooter() {
  const filterBar = document.getElementById("troubleshooterFilterBar");
  const gridContainer = document.getElementById("errorsGrid");
  if (!filterBar || !gridContainer || !ELECTION_DATA.errorsAndChallenges) return;

  const categories = ["All", "Registration", "Identification", "Ballot Issues", "Information", "Accessibility", "Integrity"];
  let activeCat = "All";

  filterBar.innerHTML = "";
  categories.forEach(cat => {
    const chip = document.createElement("button");
    chip.type = "button";
    chip.className = `filter-chip ${cat === "All" ? "active" : ""}`;
    chip.textContent = cat;
    chip.addEventListener("click", () => {
      activeCat = cat;
      filterBar.querySelectorAll(".filter-chip").forEach(c => c.classList.toggle("active", c.textContent === cat));
      renderErrors();
    });
    filterBar.appendChild(chip);
  });

  function renderErrors() {
    const filtered = activeCat === "All" 
      ? ELECTION_DATA.errorsAndChallenges 
      : ELECTION_DATA.errorsAndChallenges.filter(e => e.category === activeCat);

    gridContainer.innerHTML = "";
    filtered.forEach(err => {
      const card = document.createElement("div");
      card.className = "error-card";
      card.innerHTML = `
        <div class="error-card-top">
          <span class="error-category-badge">${err.category}</span>
          <span class="error-severity-badge ${err.severity}">${err.severity} Priority</span>
        </div>
        <h4 class="error-title">${err.title}</h4>
        
        <div class="error-block">
          <div class="error-label">⚠️ The Issue</div>
          <p class="error-text">${err.symptom}</p>
        </div>

        <div class="error-block">
          <div class="error-label">🔍 Why It Happens</div>
          <p class="error-text">${err.rootCause}</p>
        </div>

        <div class="error-solution-box">
          <h5>✅ Practical Solution</h5>
          <p>${err.solution}</p>
        </div>
      `;
      gridContainer.appendChild(card);
    });
  }

  renderErrors();
}

/* ==========================================================================
   6. Interactive Myth vs. Fact Flipper Cards
   ========================================================================== */
function initMythFlippers() {
  const mythsContainer = document.getElementById("mythsGrid");
  if (!mythsContainer || !ELECTION_DATA.myths) return;

  mythsContainer.innerHTML = "";
  ELECTION_DATA.myths.forEach(item => {
    const flipper = document.createElement("div");
    flipper.className = "myth-flipper-container";
    flipper.setAttribute("role", "button");
    flipper.setAttribute("tabindex", "0");
    flipper.setAttribute("aria-label", "Click to flip and reveal the truth about: " + item.myth);

    flipper.innerHTML = `
      <div class="myth-card-inner">
        <div class="myth-front">
          <div>
            <span class="myth-tag">❌ MYTH (${item.tag})</span>
            <p class="myth-statement">"${item.myth}"</p>
          </div>
          <div class="myth-flip-hint">
            <span>🔄 Click or tap to reveal the FACT</span>
          </div>
        </div>
        <div class="myth-back">
          <div>
            <span class="myth-tag">✅ THE TRUTH</span>
            <p class="fact-statement">${item.reality}</p>
          </div>
          <div class="myth-flip-hint">
            <span>🔄 Click to flip back</span>
          </div>
        </div>
      </div>
    `;

    const toggleFlip = () => flipper.classList.toggle("flipped");
    flipper.addEventListener("click", toggleFlip);
    flipper.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggleFlip();
      }
    });

    mythsContainer.appendChild(flipper);
  });
}

/* ==========================================================================
   7. FAQs Searchable Accordion
   ========================================================================== */
function initFaqAccordion() {
  const searchInput = document.getElementById("faqSearchInput");
  const accordionContainer = document.getElementById("faqAccordion");
  if (!accordionContainer || !ELECTION_DATA.faqs) return;

  function renderFaqs(filterText = "") {
    accordionContainer.innerHTML = "";
    const term = filterText.toLowerCase();

    const filtered = ELECTION_DATA.faqs.filter(item => {
      return item.q.toLowerCase().includes(term) || item.a.toLowerCase().includes(term) || item.category.toLowerCase().includes(term);
    });

    if (filtered.length === 0) {
      accordionContainer.innerHTML = `
        <div style="text-align: center; padding: 30px; color: var(--text-subtle);">
          <p>No questions matched your search. Try asking <strong>CivicBot</strong> using the floating button below!</p>
        </div>
      `;
      return;
    }

    filtered.forEach((item, index) => {
      const faqItem = document.createElement("div");
      faqItem.className = "faq-item";
      faqItem.innerHTML = `
        <button type="button" class="faq-question-btn" aria-expanded="false" id="faq-btn-${index}">
          <span>${item.q}</span>
          <span class="faq-chevron" aria-hidden="true">▼</span>
        </button>
        <div class="faq-answer-panel" id="faq-panel-${index}">
          <p class="faq-answer-text">${item.a}</p>
        </div>
      `;

      const btn = faqItem.querySelector(".faq-question-btn");
      btn.addEventListener("click", () => {
        const isActive = faqItem.classList.contains("active");
        
        // Close other items
        accordionContainer.querySelectorAll(".faq-item").forEach(other => {
          other.classList.remove("active");
          const otherBtn = other.querySelector(".faq-question-btn");
          if (otherBtn) otherBtn.setAttribute("aria-expanded", "false");
        });

        if (!isActive) {
          faqItem.classList.add("active");
          btn.setAttribute("aria-expanded", "true");
        }
      });

      accordionContainer.appendChild(faqItem);
    });
  }

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      renderFaqs(e.target.value.trim());
    });
  }

  renderFaqs();
}
