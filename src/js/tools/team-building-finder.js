(function () {
  "use strict";

  var form = document.getElementById("team-activity-form");
  var resultsEl = document.getElementById("team-activity-results");
  var template = document.getElementById("team-activity-card-template");
  var loadMoreBtn = document.getElementById("team-activity-load-more");
  var teamSizeInput = document.getElementById("team-activity-size");
  var timeSelect = document.getElementById("team-activity-time");
  var locationRadios = document.querySelectorAll("input[name=team-activity-location]");
  var budgetRadios = document.querySelectorAll("input[name=team-activity-budget]");
  if (!form || !resultsEl || !template) return;

  var PAGE_SIZE = 4;
  var filtered = [];
  var shown = 0;

  function radioValue(radios, fallback) {
    var checked = Array.prototype.filter.call(radios, function (r) { return r.checked; })[0];
    return checked ? checked.value : fallback;
  }

  function matches(activity) {
    var size = parseInt(teamSizeInput.value, 10) || 0;
    var sizeOk = size === 0 || (size >= activity.teamSize[0] && size <= activity.teamSize[1]);
    var maxTime = parseInt(timeSelect.value, 10) || 0;
    var timeOk = maxTime === 0 || activity.timeMinutes <= maxTime;
    var location = radioValue(locationRadios, "any");
    var locationOk = location === "any" || activity.location.indexOf(location) !== -1;
    var budget = radioValue(budgetRadios, "any");
    var budgetOk = budget === "any" || activity.budget.indexOf(budget) !== -1;
    return sizeOk && timeOk && locationOk && budgetOk;
  }

  function appendCards(list) {
    list.forEach(function (activity) {
      var node = template.content.cloneNode(true);
      node.querySelector(".js-activity-name").textContent = activity.name;
      node.querySelector(".js-activity-meta").textContent =
        activity.teamSize[0] + "–" + activity.teamSize[1] + " people · ~" + activity.timeMinutes + " min · " +
        activity.location.join("/") + " · " + activity.budget.join("/") + " budget";
      node.querySelector(".js-activity-desc").textContent = activity.description;
      var stepsList = node.querySelector(".js-activity-steps");
      activity.steps.forEach(function (step) {
        var li = document.createElement("li");
        li.textContent = step;
        stepsList.appendChild(li);
      });
      resultsEl.appendChild(node);
    });
  }

  function renderFirstPage() {
    resultsEl.innerHTML = "";
    shown = 0;
    if (filtered.length === 0) {
      var empty = document.createElement("p");
      empty.textContent = "No activities match yet — try loosening a filter.";
      resultsEl.appendChild(empty);
      if (loadMoreBtn) loadMoreBtn.hidden = true;
      return;
    }
    var slice = filtered.slice(0, PAGE_SIZE);
    appendCards(slice);
    shown = slice.length;
    updateLoadMore();
  }

  function updateLoadMore() {
    if (!loadMoreBtn) return;
    loadMoreBtn.hidden = shown >= filtered.length;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    filtered = window.TEAM_ACTIVITIES.filter(matches);
    renderFirstPage();
    window.fireConfetti();
  });

  if (loadMoreBtn) {
    loadMoreBtn.addEventListener("click", function () {
      var slice = filtered.slice(shown, shown + 3);
      appendCards(slice);
      shown += slice.length;
      updateLoadMore();
    });
  }

  // Initial render: show everything unfiltered.
  filtered = window.TEAM_ACTIVITIES.slice();
  renderFirstPage();
})();
