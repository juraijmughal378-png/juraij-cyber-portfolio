/* Juraij Sadaqat — Portfolio interactions
   Vanilla JS only. No tokens, no tracking.
   GitHub data comes from the public, unauthenticated GitHub API
   with graceful fallback to the static values in the HTML. */
(function () {
  "use strict";

  /* ---- Footer year ---- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ---- Mobile navigation ---- */
  var toggle = document.getElementById("navToggle");
  var nav = document.getElementById("nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---- Reveal-on-scroll (respects reduced motion) ---- */
  var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var targets = document.querySelectorAll(
    ".card, .project-card, .timeline-item, .cert-card, .skill-group"
  );
  if (!prefersReduced && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    targets.forEach(function (el) {
      el.classList.add("reveal");
      io.observe(el);
    });
  }

  /* ---- Live GitHub stats (public API, unauthenticated) ---- */
  var USERNAME = "juraijmughal378-png";
  function setText(id, value) {
    var el = document.getElementById(id);
    if (el && value !== null && value !== undefined) el.textContent = String(value);
  }
  if ("fetch" in window) {
    fetch("https://api.github.com/users/" + USERNAME, {
      headers: { "Accept": "application/vnd.github+json" }
    })
      .then(function (r) { if (!r.ok) throw new Error("profile " + r.status); return r.json(); })
      .then(function (u) {
        setText("ghRepos", u.public_repos);
        setText("ghFollowers", u.followers);
      })
      .catch(function () { /* keep static fallbacks */ });

    fetch("https://api.github.com/users/" + USERNAME + "/repos?per_page=100&type=public", {
      headers: { "Accept": "application/vnd.github+json" }
    })
      .then(function (r) { if (!r.ok) throw new Error("repos " + r.status); return r.json(); })
      .then(function (repos) {
        var stars = repos.reduce(function (sum, repo) {
          return sum + (repo.stargazers_count || 0);
        }, 0);
        setText("ghStars", stars);
      })
      .catch(function () {
        setText("ghStars", "—");
      });
  }
})();
