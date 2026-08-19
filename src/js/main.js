(function () {
  "use strict";

  var navToggle = document.querySelector(".nav-toggle");
  var siteNav = document.querySelector(".site-nav");
  if (navToggle && siteNav) {
    navToggle.addEventListener("click", function () {
      var isOpen = siteNav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });
  }

  var toastTimer = null;
  window.showToast = function (message) {
    var toast = document.querySelector(".toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.className = "toast";
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toast.classList.remove("is-visible");
    }, 2200);
  };

  var CONFETTI_COLORS = ["#D7263D", "#F4B400", "#0A8F84", "#6C3BAA"];
  window.fireConfetti = function () {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    var burst = document.createElement("div");
    burst.className = "confetti-burst";
    for (var i = 0; i < 24; i++) {
      var piece = document.createElement("span");
      piece.style.left = Math.random() * 100 + "%";
      piece.style.background = CONFETTI_COLORS[i % CONFETTI_COLORS.length];
      piece.style.animationDelay = Math.random() * 0.3 + "s";
      piece.style.animationDuration = 1 + Math.random() * 0.8 + "s";
      burst.appendChild(piece);
    }
    document.body.appendChild(burst);
    setTimeout(function () {
      burst.remove();
    }, 2200);
  };

  window.copyToClipboard = function (text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () {
        showToast("Copied to clipboard!");
      }, function () {
        showToast("Couldn't copy — try selecting the text.");
      });
    } else {
      showToast("Copy not supported in this browser.");
    }
  };

  window.shareOrCopy = function (title, text) {
    if (navigator.share) {
      navigator.share({ title: title, text: text }).catch(function () {});
    } else {
      window.copyToClipboard(text);
    }
  };
})();
