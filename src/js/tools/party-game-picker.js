(function () {
  "use strict";

  var form = document.getElementById("party-game-form");
  var resultsEl = document.getElementById("party-game-results");
  var template = document.getElementById("party-game-card-template");
  var shuffleBtn = document.getElementById("party-game-shuffle");
  var copyBtn = document.getElementById("party-game-copy");
  var sizeInput = document.getElementById("party-game-size");
  var vibeChips = document.querySelectorAll("#party-game-vibes input[type=checkbox]");
  var settingRadios = document.querySelectorAll("input[name=party-game-setting]");
  if (!form || !resultsEl || !template) return;

  var currentResults = [];

  function shuffle(arr) {
    for (var i = arr.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = arr[i]; arr[i] = arr[j]; arr[j] = tmp;
    }
    return arr;
  }

  function selectedVibes() {
    return Array.prototype.filter.call(vibeChips, function (c) { return c.checked; })
      .map(function (c) { return c.value; });
  }

  function selectedSetting() {
    var checked = Array.prototype.filter.call(settingRadios, function (r) { return r.checked; })[0];
    return checked ? checked.value : "any";
  }

  function matches(game) {
    var size = parseInt(sizeInput.value, 10) || 0;
    var sizeOk = size === 0 || (size >= game.groupSize[0] && size <= game.groupSize[1]);
    var vibes = selectedVibes();
    var vibeOk = vibes.length === 0 || vibes.some(function (v) { return game.vibe.indexOf(v) !== -1; });
    var setting = selectedSetting();
    var settingOk = setting === "any" || game.setting.indexOf(setting) !== -1 || game.setting.indexOf("either") !== -1;
    return sizeOk && vibeOk && settingOk;
  }

  function renderResults(list) {
    resultsEl.innerHTML = "";
    if (list.length === 0) {
      var empty = document.createElement("p");
      empty.textContent = "No games match those filters yet — try widening your search.";
      resultsEl.appendChild(empty);
      return;
    }
    list.forEach(function (game) {
      var node = template.content.cloneNode(true);
      node.querySelector(".js-game-name").textContent = game.name;
      node.querySelector(".js-game-meta").textContent =
        game.groupSize[0] + "–" + game.groupSize[1] + " players · " +
        game.setting.join("/") + " · " + game.vibe.join(", ");
      node.querySelector(".js-game-desc").textContent = game.description;
      node.querySelector(".js-game-materials").textContent = "Materials: " + game.materials;
      resultsEl.appendChild(node);
    });
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    currentResults = window.PARTY_GAMES.filter(matches);
    renderResults(currentResults);
    window.fireConfetti();
  });

  if (shuffleBtn) {
    shuffleBtn.addEventListener("click", function () {
      if (currentResults.length === 0) return;
      currentResults = shuffle(currentResults.slice());
      renderResults(currentResults);
    });
  }

  if (copyBtn) {
    copyBtn.addEventListener("click", function () {
      if (currentResults.length === 0) {
        window.showToast("Find some games first!");
        return;
      }
      var text = currentResults.map(function (g) { return g.name; }).join(", ");
      window.copyToClipboard(text);
    });
  }

  // Initial render: show everything unfiltered.
  currentResults = window.PARTY_GAMES.slice();
  renderResults(currentResults);
})();
