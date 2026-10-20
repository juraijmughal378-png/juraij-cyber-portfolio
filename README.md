# Juraij Sadaqat — Cybersecurity Portfolio

Personal portfolio website for **Juraij Sadaqat**, Junior Penetration Tester.
Built with semantic HTML, modern CSS, and vanilla JavaScript — **no build step, no framework, no dependencies to install.** It deploys to GitHub Pages as-is.

**Live site:** https://juraijmughal378-png.github.io/juraij-cyber-portfolio/
**GitHub:** https://github.com/juraijmughal378-png
**LinkedIn:** https://www.linkedin.com/in/juraij-sadaqat-b92a4939a/

## Project structure

```
juraij-cyber-portfolio/
├── index.html    # All content (semantic, accessible, SEO + Open Graph + JSON-LD)
├── style.css     # Design system: dark theme, responsive, reduced-motion support
├── script.js     # Mobile nav, reveal animations, live GitHub stats (public API)
├── .nojekyll     # Tells GitHub Pages to serve files as-is
└── README.md     # This file
```

## Run locally

No build tools needed. Either:

```bash
# Option 1: just open the file
open index.html        # macOS
xdg-open index.html    # Linux

# Option 2: local server (recommended — matches production)
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deploy to GitHub Pages (step by step)

1. Push these files to the `main` branch of this repository
   (`juraijmughal378-png/juraij-cyber-portfolio`).
2. In the repo, go to **Settings → Pages**.
3. Under **Build and deployment**, set:
   - **Source:** Deploy from a branch
   - **Branch:** `main` · Folder: `/ (root)`
4. Click **Save**. GitHub publishes within ~1 minute at:
   `https://juraijmughal378-png.github.io/juraij-cyber-portfolio/`
5. Every future push to `main` redeploys automatically.

No environment variables, secrets, or API tokens are used. The GitHub stats
section calls the **public, unauthenticated GitHub API** from the visitor's
browser and falls back to static numbers if the API rate limit is hit.

## Updating the portfolio

| What changed | Where to edit |
|---|---|
| Bio / About text | `index.html` → `#about` section |
| New project | Copy a `.project-card` block in `#projects`, update title, description, tech tags, and GitHub link |
| New job / education | Copy a `.timeline-item` block in `#experience` |
| New certification | Copy a `.cert-card` block in `#certs` |
| Skills | Edit the `.tags` lists in `#skills` |
| Colors / fonts | CSS variables at the top of `style.css` (`:root`) |
| Contact links | `#contact` section + footer in `index.html` + JSON-LD in `<head>` |

## Content policy

Every claim on this site is drawn from Juraij's public GitHub repositories
and LinkedIn profile. Do not add certifications, employers, or results that
are not verifiable there — credibility is the whole point of this site.
Security work is described accurately as isolated-lab or authorized testing.

## License

Content © Juraij Sadaqat. Code structure may be reused with attribution.
