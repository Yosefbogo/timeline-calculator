# Timeline Calculator maintenance

This repository is the master source. Read current files before changes.

- Browser-only, dependency-free app. Keep all location history on-device. No analytics, external scripts, or uploads.
- Edit core.js and index.template.html. Run `node build.js` to regenerate BOTH index.html and Timeline-Calculator.html. Never edit generated HTML alone.
- Run `node --test tests/core.test.js` after calculation changes. Tests must cover actual user-visible counting rules.
- Keep GitHub Pages buildless: main branch, repository root, .nojekyll.
- Never commit Timeline exports, attendance CSV, settings with personal coordinates, credentials, or real user history.
- Offline downloads must contain clean app source only, never runtime DOM containing private location information.
- Update version in README when releasing changes and describe any compatibility limitations honestly.
