(function () {
  "use strict";

  var wheel = document.getElementById("conversation-wheel");
  var spinBtn = document.getElementById("conversation-spin");
  var resultEl = document.getElementById("conversation-result");
  var copyBtn = document.getElementById("conversation-copy");
  var shareBtn = document.getElementById("conversation-share");
  var chipInputs = document.querySelectorAll("#conversation-filters input[type=checkbox]");
  if (!wheel || !spinBtn || !resultEl) return;

  var currentRotation = 0;
  var lastId = null;
  var spinning = false;

  function activeCategories() {
    var checked = Array.prototype.filter.call(chipInputs, function (c) { return c.checked; });
    if (checked.length === 0) return null;
    return checked.map(function (c) { return c.value; });
  }

  function pickPrompt() {
    var cats = activeCategories();
    var pool = window.CONVERSATION_STARTERS.filter(function (p) {
      return !cats || p.category.some(function (c) { return cats.indexOf(c) !== -1; });
    });
    if (pool.length === 0) return null;
    if (pool.length > 1) pool = pool.filter(function (p) { return p.id !== lastId; });
    var choice = pool[Math.floor(Math.random() * pool.length)];
    lastId = choice.id;
    return choice;
  }

  function spin() {
    if (spinning) return;
    var prompt = pickPrompt();
    if (!prompt) {
      resultEl.textContent = "Pick at least one category to spin!";
      return;
    }
    spinning = true;
    spinBtn.disabled = true;
    resultEl.textContent = "🎪 Spinning...";

    currentRotation += 1440 + Math.floor(Math.random() * 360);
    wheel.style.transform = "rotate(" + currentRotation + "deg)";

    var onEnd = function () {
      wheel.removeEventListener("transitionend", onEnd);
      resultEl.textContent = prompt.prompt;
      spinning = false;
      spinBtn.disabled = false;
      window.fireConfetti();
    };
    wheel.addEventListener("transitionend", onEnd);
  }

  spinBtn.addEventListener("click", spin);

  if (copyBtn) {
    copyBtn.addEventListener("click", function () {
      window.copyToClipboard(resultEl.textContent);
    });
  }
  if (shareBtn) {
    shareBtn.addEventListener("click", function () {
      window.shareOrCopy("Social Circus Conversation Starter", resultEl.textContent);
    });
  }
})();
