/**
 * Voter Readiness Checklist Generator
 * Personalized interactive checklist to ensure voters arrive fully prepared on election day.
 */

class VoterChecklist {
  constructor() {
    this.defaultItems = [
      {
        id: "chk-id",
        title: "Valid Photo ID Document",
        desc: "Physical Voter ID (EPIC) or approved alternative: Aadhaar, Passport, Driving License, PAN card, or Bank passbook with photo.",
        checked: false
      },
      {
        id: "chk-slip",
        title: "Voter Information Slip / Part & Serial #",
        desc: "Save or print your official voter slip showing your exact polling booth room, part number, and serial number.",
        checked: false
      },
      {
        id: "chk-station",
        title: "Verified Polling Station Location",
        desc: "Confirm the exact address of your designated voting booth. Some schools have multiple wings and parts.",
        checked: false
      },
      {
        id: "chk-rules",
        title: "Booth Etiquette & Phone Rule",
        desc: "Remember that mobile phones, cameras, and smartwatches are strictly prohibited inside the voting booth compartment.",
        checked: false
      },
      {
        id: "chk-candidates",
        title: "Review Candidate Affidavits",
        desc: "Inspect contesting candidates' background, educational credentials, and criminal record disclosures.",
        checked: false
      },
      {
        id: "chk-accessibility",
        title: "Accessibility Assistance (If Needed)",
        desc: "If accompanying an elderly or disabled relative, confirm wheelchair ramp access or companion authorization.",
        checked: false
      }
    ];

    this.initElements();
    this.bindEvents();
    this.renderItems();
  }

  initElements() {
    this.containerEl = document.getElementById("checklistItemsGrid");
    this.progressStatEl = document.getElementById("checklistProgressStat");
    this.printBtnEl = document.getElementById("checklistPrintBtn");
    this.resetBtnEl = document.getElementById("checklistResetBtn");
  }

  bindEvents() {
    if (this.printBtnEl) {
      this.printBtnEl.addEventListener("click", () => window.print());
    }
    if (this.resetBtnEl) {
      this.resetBtnEl.addEventListener("click", () => this.resetChecklist());
    }
  }

  renderItems() {
    if (!this.containerEl) return;
    this.containerEl.innerHTML = "";

    this.defaultItems.forEach((item, index) => {
      const card = document.createElement("label");
      card.className = `checklist-item ${item.checked ? "checked" : ""}`;
      card.htmlFor = `chk-input-${index}`;
      card.innerHTML = `
        <input type="checkbox" id="chk-input-${index}" class="checklist-checkbox" ${item.checked ? "checked" : ""}>
        <div class="checklist-text">
          <h5>${item.title}</h5>
          <p>${item.desc}</p>
        </div>
      `;

      const input = card.querySelector("input");
      input.addEventListener("change", (e) => {
        item.checked = e.target.checked;
        card.classList.toggle("checked", item.checked);
        this.updateProgress();
      });

      this.containerEl.appendChild(card);
    });

    this.updateProgress();
  }

  updateProgress() {
    const total = this.defaultItems.length;
    const completed = this.defaultItems.filter(i => i.checked).length;
    const percent = Math.round((completed / total) * 100);

    if (this.progressStatEl) {
      this.progressStatEl.innerHTML = `
        <span><strong>${completed}/${total}</strong> Ready (${percent}%)</span>
      `;
    }
  }

  resetChecklist() {
    this.defaultItems.forEach(i => i.checked = false);
    this.renderItems();
  }
}

// Initialize on DOM ready
document.addEventListener("DOMContentLoaded", () => {
  window.voterChecklist = new VoterChecklist();
});
