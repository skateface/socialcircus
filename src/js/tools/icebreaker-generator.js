(function () {
  "use strict";

  var resultEl = document.getElementById("icebreaker-result");
  var generateBtn = document.getElementById("icebreaker-generate");
  var copyBtn = document.getElementById("icebreaker-copy");
  var shareBtn = document.getElementById("icebreaker-share");
  var chipInputs = document.querySelectorAll("#icebreaker-filters input[type=checkbox]");
  if (!resultEl || !generateBtn) return;

  var lastId = null;

  function activeCategories() {
    var checked = Array.prototype.filter.call(chipInputs, function (c) { return c.checked; });
    if (checked.length === 0) return null; // null = all categories
    return checked.map(function (c) { return c.value; });
  }

  function pickQuestion() {
    var cats = activeCategories();
    var pool = window.ICEBREAKERS.filter(function (q) {
      return !cats || cats.indexOf(q.category) !== -1;
    });
    if (pool.length === 0) return null;
    if (pool.length > 1) pool = pool.filter(function (q) { return q.id !== lastId; });
    var choice = pool[Math.floor(Math.random() * pool.length)];
    lastId = choice.id;
    return choice;
  }

  function render() {
    var q = pickQuestion();
    if (!q) {
      resultEl.textContent = "Pick at least one category to get started!";
      return;
    }
    resultEl.textContent = q.question;
    generateBtn.textContent = "🎲 Shuffle Again";
    window.fireConfetti();
  }

  generateBtn.addEventListener("click", render);
  chipInputs.forEach(function (input) {
    input.addEventListener("change", render);
  });

  if (copyBtn) {
    copyBtn.addEventListener("click", function () {
      window.copyToClipboard(resultEl.textContent);
    });
  }
  if (shareBtn) {
    shareBtn.addEventListener("click", function () {
      window.shareOrCopy("Social Circus Icebreaker", resultEl.textContent);
    });
  }

  render();
})();
