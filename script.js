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

/* ============================================================
   V2 — VIBE ENGINES (all guarded by prefers-reduced-motion)
   ============================================================ */
(function () {
  "use strict";
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- Scroll progress bar ---- */
  var bar = document.getElementById("scrollBar");
  if (bar) {
    var onScroll = function () {
      var h = document.documentElement;
      var max = h.scrollHeight - h.clientHeight;
      bar.style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0) + "%";
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---- Card spotlight (mouse-follow glow) ---- */
  document.querySelectorAll(
    ".card, .project-card, .cert-card, .timeline-item, .contact-card, .skill-group, .gh-stat, .fact-card"
  ).forEach(function (el) {
    el.addEventListener("pointermove", function (e) {
      var r = el.getBoundingClientRect();
      el.style.setProperty("--mx", ((e.clientX - r.left) / r.width) * 100 + "%");
      el.style.setProperty("--my", ((e.clientY - r.top) / r.height) * 100 + "%");
    });
  });

  /* ---- Animated counters ---- */
  var counters = document.querySelectorAll(".count-up");
  if (counters.length && "IntersectionObserver" in window && !reduced) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target, target = parseInt(el.getAttribute("data-count"), 10) || 0;
        var start = null;
        var step = function (ts) {
          if (!start) start = ts;
          var p = Math.min((ts - start) / 1100, 1);
          el.textContent = String(Math.round(target * (1 - Math.pow(1 - p, 3))));
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
        cio.unobserve(el);
      });
    }, { threshold: 0.4 });
    counters.forEach(function (el) { cio.observe(el); });
  }

  if (reduced) return; /* everything below is motion — respect the setting */

  /* ---- Role typer ---- */
  var typed = document.getElementById("typedRole");
  if (typed) {
    var roles = [
      "Junior Penetration Tester",
      "Web Security & OSINT Specialist",
      "Digital Forensics Investigator",
      "Bug Bounty & CTF Player",
      "Red Team Intern @ Cyberster"
    ];
    var ri = 0, ci = roles[0].length, deleting = true, timer = null;
    var tick = function () {
      var word = roles[ri];
      if (deleting) {
        ci--;
        if (ci <= 0) { deleting = false; ri = (ri + 1) % roles.length; word = roles[ri]; ci = 0; }
      } else {
        ci++;
        if (ci >= word.length) { deleting = true; timer = setTimeout(tick, 1800); typed.textContent = word; return; }
      }
      typed.textContent = roles[ri].slice(0, ci);
      timer = setTimeout(tick, deleting ? 34 : 62);
    };
    timer = setTimeout(tick, 1600);
  }

  /* ---- Particle network (hero) ---- */
  var canvas = document.getElementById("particles");
  if (!canvas || !canvas.getContext) return;
  var ctx = canvas.getContext("2d");
  var hero = canvas.parentElement;
  var W = 0, H = 0, pts = [], raf = null, DPR = Math.min(window.devicePixelRatio || 1, 2);
  function resize() {
    var rect = hero.getBoundingClientRect();
    W = rect.width; H = rect.height;
    canvas.width = W * DPR; canvas.height = H * DPR;
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    var n = Math.min(115, Math.floor((W * H) / 12000));
    pts = [];
    for (var i = 0; i < n; i++) {
      pts.push({
        x: Math.random() * W, y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 2.1 + 1
      });
    }
  }
  function draw() {
    ctx.clearRect(0, 0, W, H);
    var i, j, p, q, dx, dy, d;
    for (i = 0; i < pts.length; i++) {
      p = pts[i];
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(125,249,224,0.95)";
      ctx.fill();
      for (j = i + 1; j < pts.length; j++) {
        q = pts[j]; dx = p.x - q.x; dy = p.y - q.y; d = dx * dx + dy * dy;
        if (d < 12100) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y);
          ctx.strokeStyle = "rgba(56,189,248," + (0.32 * (1 - d / 12100)) + ")";
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }
    raf = requestAnimationFrame(draw);
  }
  resize();
  draw();
  window.addEventListener("resize", resize);
  document.addEventListener("visibilitychange", function () {
    if (document.hidden) { if (raf) cancelAnimationFrame(raf); raf = null; }
    else if (!raf) draw();
  });
})();
