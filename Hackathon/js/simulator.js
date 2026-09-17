/**
 * EVM & VVPAT Interactive Voting Booth Simulator
 * Simulates secret ballot casting, LED feedback, audio confirmation tone,
 * and 7-second VVPAT paper verification audit slip.
 */

class EVMSimulator {
  constructor() {
    this.isVotingInProgress = false;
    this.audioCtx = null;
    this.timerInterval = null;
    this.countdownSeconds = 7;
    
    this.currentFilter = "ALL";
    
    this.candidates = [
      { id: 1, name: "Narendra Modi", symbol: "🪷", party: "Bharatiya Janata Party (BJP)", alliance: "NDA" },
      { id: 2, name: "Rahul Gandhi", symbol: "✋", party: "Indian National Congress (INC)", alliance: "I.N.D.I.A." },
      { id: 3, name: "Arvind Kejriwal", symbol: "🧹", party: "Aam Aadmi Party (AAP)", alliance: "I.N.D.I.A." },
      { id: 4, name: "Mamata Banerjee", symbol: "🌿", party: "All India Trinamool Congress (TMC)", alliance: "I.N.D.I.A." },
      { id: 5, name: "Akhilesh Yadav", symbol: "🚲", party: "Samajwadi Party (SP)", alliance: "I.N.D.I.A." },
      { id: 6, name: "M. K. Stalin", symbol: "☀️", party: "Dravida Munnetra Kazhagam (DMK)", alliance: "I.N.D.I.A." },
      { id: 7, name: "NOTA (None of the Above)", symbol: "🚫", party: "Official Rejection of All Candidates", alliance: "Neutral" }
    ];

    this.initElements();
    this.bindEvents();
    this.renderCandidateRows();
  }

  initElements() {
    this.candidateListEl = document.getElementById("evmCandidateList");
    this.vvpatSlipEl = document.getElementById("vvpatSlip");
    this.vvpatTimerBarEl = document.getElementById("vvpatTimerBar");
    this.statusBoxEl = document.getElementById("simulatorStatusBox");
    this.resetBtnEl = document.getElementById("simulatorResetBtn");
    this.slipCandidateEl = document.getElementById("slipCandidateInfo");
    this.slipSerialEl = document.getElementById("slipSerial");
    this.filterBarEl = document.getElementById("ballotFilterBar");
  }

  bindEvents() {
    if (this.resetBtnEl) {
      this.resetBtnEl.addEventListener("click", () => this.resetMachine());
    }
    if (this.filterBarEl) {
      this.filterBarEl.querySelectorAll(".ballot-filter-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          this.filterBarEl.querySelectorAll(".ballot-filter-btn").forEach(b => b.classList.remove("active"));
          btn.classList.add("active");
          this.currentFilter = btn.getAttribute("data-filter") || "ALL";
          this.renderCandidateRows();
        });
      });
    }
  }

  // Generate Web Audio API beep for EVM confirmation
  playConfirmationBeep() {
    try {
      if (!this.audioCtx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        this.audioCtx = new AudioContext();
      }
      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }

      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(880, this.audioCtx.currentTime); // 880Hz beep
      osc.frequency.setValueAtTime(1174.66, this.audioCtx.currentTime + 0.15); // Ascending tone

      gain.gain.setValueAtTime(0.2, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.6);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start();
      osc.stop(this.audioCtx.currentTime + 0.6);
    } catch (e) {
      console.warn("Web Audio not supported or blocked by browser policy:", e);
    }
  }

  renderCandidateRows() {
    if (!this.candidateListEl) return;
    this.candidateListEl.innerHTML = "";

    const displayedCandidates = this.currentFilter === "ALL"
      ? this.candidates
      : this.candidates.filter(c => c.alliance === this.currentFilter || c.alliance === "Neutral");

    displayedCandidates.forEach((cand) => {
      const row = document.createElement("div");
      row.className = "candidate-row";
      const allianceClass = cand.alliance ? cand.alliance.toLowerCase().replace(/[^a-z]/g, '') : '';
      const allianceBadge = cand.alliance && cand.alliance !== "Neutral" 
        ? `<span class="alliance-badge ${allianceClass}">${cand.alliance}</span>` 
        : '';

      row.innerHTML = `
        <div class="candidate-meta">
          <span class="candidate-serial">${cand.id}.</span>
          <span class="candidate-symbol">${cand.symbol}</span>
          <div class="candidate-details">
            <h5>${cand.name} ${allianceBadge}</h5>
            <span>${cand.party}</span>
          </div>
        </div>
        <div class="vote-control">
          <div class="candidate-led" id="cand-led-${cand.id}" aria-hidden="true"></div>
          <button type="button" class="btn-vote-key" data-id="${cand.id}" aria-label="Vote for ${cand.name}">
            VOTE
          </button>
        </div>
      `;

      const voteBtn = row.querySelector(".btn-vote-key");
      voteBtn.addEventListener("click", () => this.castVote(cand));
      this.candidateListEl.appendChild(row);
    });
  }

  castVote(candidate) {
    if (this.isVotingInProgress) return;
    this.isVotingInProgress = true;

    // 1. Disable all vote keys
    const allVoteButtons = document.querySelectorAll(".btn-vote-key");
    allVoteButtons.forEach(btn => btn.disabled = true);

    // 2. Illuminate candidate red LED
    const activeLed = document.getElementById(`cand-led-${candidate.id}`);
    if (activeLed) activeLed.classList.add("active");

    // 3. Play auditory confirmation tone
    this.playConfirmationBeep();

    // 4. Update status display
    if (this.statusBoxEl) {
      this.statusBoxEl.innerHTML = `
        <strong>Vote Registered!</strong>
        Look at the VVPAT window. Your verification slip is displaying for 7 seconds.
      `;
    }

    // 5. Update VVPAT slip details
    if (this.slipCandidateEl) {
      this.slipCandidateEl.innerHTML = `
        <span>${candidate.symbol} ${candidate.name}</span>
      `;
    }
    if (this.slipSerialEl) {
      this.slipSerialEl.textContent = `SL #${candidate.id} | ${candidate.party}`;
    }

    // 6. Animate slip into view
    if (this.vvpatSlipEl) {
      this.vvpatSlipEl.classList.remove("drop");
      this.vvpatSlipEl.classList.add("printed");
    }

    // 7. Start 7-second countdown bar
    if (this.vvpatTimerBarEl) {
      this.vvpatTimerBarEl.style.width = "0%";
      setTimeout(() => {
        if (this.vvpatTimerBarEl) this.vvpatTimerBarEl.style.width = "100%";
      }, 50);
    }

    // 8. Wait 7 seconds then drop slip into sealed ballot box
    setTimeout(() => {
      this.finalizeVote(activeLed, candidate);
    }, 7000);
  }

  finalizeVote(activeLed, candidate) {
    // Slip drops into secure bottom bin
    if (this.vvpatSlipEl) {
      this.vvpatSlipEl.classList.remove("printed");
      this.vvpatSlipEl.classList.add("drop");
    }

    // Turn off red candidate LED
    if (activeLed) {
      activeLed.classList.remove("active");
    }

    // Reset timer bar
    if (this.vvpatTimerBarEl) {
      this.vvpatTimerBarEl.style.width = "0%";
    }

    if (this.statusBoxEl) {
      this.statusBoxEl.innerHTML = `
        <strong style="color: #059669;">✓ Verified & Sealed!</strong>
        VVPAT paper slip has dropped into the tamper-proof ballot container. Secrecy preserved.
      `;
    }

    this.isVotingInProgress = false;
  }

  resetMachine() {
    if (this.isVotingInProgress) return;

    // Reset status box
    if (this.statusBoxEl) {
      this.statusBoxEl.innerHTML = `
        <strong>Unit Ready for Voter</strong>
        Select any candidate to test the ballot process and audit slip.
      `;
    }

    // Re-enable vote keys
    const allVoteButtons = document.querySelectorAll(".btn-vote-key");
    allVoteButtons.forEach(btn => btn.disabled = false);

    // Reset slip
    if (this.vvpatSlipEl) {
      this.vvpatSlipEl.classList.remove("printed", "drop");
    }

    // Reset all LEDs
    document.querySelectorAll(".candidate-led").forEach(led => led.classList.remove("active"));
  }
}

// Initialize on DOM ready
document.addEventListener("DOMContentLoaded", () => {
  window.evmSimulator = new EVMSimulator();
});
