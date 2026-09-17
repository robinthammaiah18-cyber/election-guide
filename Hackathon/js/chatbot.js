/**
 * CivicBot - Interactive Voter Assistant Widget
 * Conversational guide with quick prompt chips and intelligent intent matching.
 */

class CivicBot {
  constructor() {
    this.knowledge = ELECTION_DATA.chatbotKnowledge || [];
    this.isOpen = false;

    this.initElements();
    this.bindEvents();
    this.renderDefaultChips();
  }

  initElements() {
    this.launcherEl = document.getElementById("chatbotLauncher");
    this.modalEl = document.getElementById("chatbotModal");
    this.closeBtnEl = document.getElementById("chatbotCloseBtn");
    this.messagesWrapEl = document.getElementById("chatbotMessagesWrap");
    this.chipsRowEl = document.getElementById("chatbotChipsRow");
    this.inputEl = document.getElementById("chatbotInput");
    this.sendBtnEl = document.getElementById("chatbotSendBtn");
  }

  bindEvents() {
    if (this.launcherEl) {
      this.launcherEl.addEventListener("click", () => this.toggleModal());
    }
    if (this.closeBtnEl) {
      this.closeBtnEl.addEventListener("click", () => this.toggleModal(false));
    }
    if (this.sendBtnEl) {
      this.sendBtnEl.addEventListener("click", () => this.handleUserSend());
    }
    if (this.inputEl) {
      this.inputEl.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          this.handleUserSend();
        }
      });
    }
  }

  toggleModal(forceState) {
    this.isOpen = typeof forceState === "boolean" ? forceState : !this.isOpen;
    if (this.modalEl) {
      this.modalEl.classList.toggle("open", this.isOpen);
      if (this.isOpen && this.inputEl) {
        setTimeout(() => this.inputEl.focus(), 150);
      }
    }
  }

  renderDefaultChips() {
    if (!this.chipsRowEl) return;
    const samplePrompts = [
      "Accepted Photo IDs?",
      "How to register?",
      "How does EVM work?",
      "What if name is missing?",
      "Helpline numbers"
    ];

    this.chipsRowEl.innerHTML = "";
    samplePrompts.forEach((prompt) => {
      const chip = document.createElement("button");
      chip.type = "button";
      chip.className = "chat-chip";
      chip.textContent = prompt;
      chip.addEventListener("click", () => {
        this.addMessage(prompt, "user");
        this.processQuery(prompt);
      });
      this.chipsRowEl.appendChild(chip);
    });
  }

  handleUserSend() {
    if (!this.inputEl) return;
    const query = this.inputEl.value.trim();
    if (!query) return;

    this.addMessage(query, "user");
    this.inputEl.value = "";
    this.processQuery(query);
  }

  processQuery(rawQuery) {
    const q = rawQuery.toLowerCase();

    // Show simulated typing indicator
    const typingIndicator = document.createElement("div");
    typingIndicator.className = "chat-bubble bot typing";
    typingIndicator.innerHTML = "<em>Thinking...</em>";
    this.messagesWrapEl.appendChild(typingIndicator);
    this.scrollToBottom();

    setTimeout(() => {
      typingIndicator.remove();

      let matchedItem = null;

      // Find match in knowledge base
      for (const item of this.knowledge) {
        if (item.keywords.some(kw => q.includes(kw))) {
          matchedItem = item;
          break;
        }
      }

      if (matchedItem) {
        this.addBotMessage(matchedItem.response, matchedItem.actionLink, matchedItem.actionText);
      } else if (q.includes("hi") || q.includes("hello") || q.includes("hey")) {
        this.addBotMessage(
          "Hello there! I am CivicBot. How can I help you prepare for election day? Feel free to ask about voter registration, EVMs, timelines, or accepted IDs!"
        );
      } else if (q.includes("phone") || q.includes("mobile") || q.includes("camera")) {
        this.addBotMessage(
          "Phones and electronic recording gadgets are strictly banned inside voting compartments to safeguard voter secrecy and prevent coercion.",
          "#checklist",
          "Review Booth Rules"
        );
      } else {
        this.addBotMessage(
          "I'm here to help with all election procedures! You can ask about: **Voter ID documents**, **EVM simulation**, **Registration forms**, or check our **Common Errors** guide.",
          "#procedures",
          "Explore Procedures"
        );
      }
    }, 450);
  }

  addMessage(text, sender) {
    if (!this.messagesWrapEl) return;
    const bubble = document.createElement("div");
    bubble.className = `chat-bubble ${sender}`;
    bubble.textContent = text;
    this.messagesWrapEl.appendChild(bubble);
    this.scrollToBottom();
  }

  addBotMessage(markdownText, actionLink, actionText) {
    if (!this.messagesWrapEl) return;
    const bubble = document.createElement("div");
    bubble.className = "chat-bubble bot";

    // Simple markdown bold conversion
    const formattedText = markdownText.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

    let actionHtml = "";
    if (actionLink && actionText) {
      actionHtml = `<br><a href="${actionLink}" class="chat-bubble-action">${actionText} →</a>`;
    }

    bubble.innerHTML = `${formattedText}${actionHtml}`;
    this.messagesWrapEl.appendChild(bubble);

    // If an action link was added, clicking it should close the chatbot
    const linkEl = bubble.querySelector(".chat-bubble-action");
    if (linkEl) {
      linkEl.addEventListener("click", () => {
        this.toggleModal(false);
      });
    }

    this.scrollToBottom();
  }

  scrollToBottom() {
    if (this.messagesWrapEl) {
      this.messagesWrapEl.scrollTop = this.messagesWrapEl.scrollHeight;
    }
  }
}

// Initialize on DOM ready
document.addEventListener("DOMContentLoaded", () => {
  window.civicBot = new CivicBot();
});
