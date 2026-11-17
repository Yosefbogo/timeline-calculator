# Timeline Calculator

[Source repository](https://github.com/Yosefbogo/timeline-calculator) · [Download the single-file app](https://github.com/Yosefbogo/timeline-calculator/raw/refs/heads/main/Timeline-Calculator.html)

Version 1.1.0 — local processing, custom time blocks, CSV exports, optional offline app.


A standalone browser app that turns Google Timeline JSON into location hours CSV files. No AI, backend, API keys, account, npm install, or paid service required. Choose any location, radius, timezone, weekdays, and 1–12 named time blocks. A kollel preset is included.

## Run it now

1. Unzip this folder.
2. Open `index.html` in Chrome, Edge, Firefox, or Safari. Desktop Chrome is recommended for large exports. If your browser blocks local background workers, serve the folder with `python3 -m http.server 8765` and open `http://localhost:8765`.
3. Click **Try with demo data**, then **Calculate hours** to see fictional examples.
4. Choose your own Timeline JSON file. Choose a detected place or enter latitude/longitude from a Google Maps dropped pin.
5. Set radius, seder hours, weekdays, timezone, and optional date range. Calculate hours.
6. Review each day, correct credited intervals if necessary, and download CSV.

The file is read locally. The app does not send location history anywhere. The original JSON file is unchanged. There are no network dependencies or analytics. Settings, including kollel coordinates, are saved in your browser when you calculate with real data. History and review edits live only in the open tab: export your results before reloading or closing it. Clear loaded history terminates the worker and removes loaded history/results from the UI. Reset saved settings removes the saved settings.

## Publish on GitHub Pages later

1. Create a repository, e.g. `kollel-hours`.
2. Upload this folder's **contents** to the repository root. `index.html` must be at the root, rather than inside a second folder. Never upload your personal Timeline JSON, settings export, or attendance CSV.
3. Open the repository's **Settings → Pages**.
4. Under Build and deployment, select **Deploy from a branch**, choose your main branch and **/(root)**, then save.
5. GitHub shows the published URL after deployment. Share that URL with friends. Each person's file is processed on their own device; each has separate settings.

Official setup reference: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

Only `index.html` is required to host the app. `Timeline-Calculator.html` is the identical standalone file with a friendly download name. The website also has a Download offline app button; it saves a clean copy of the app, excluding settings, history, results, and edits. Downloaded copies do not update themselves; download again for updates. Other files support development, tests, and licensing. No ChatGPT hosting dependency is required. The master source repository is https://github.com/Yosefbogo/timeline-calculator. Enable Pages from main / root to publish the web app. Changes committed to that publishing branch are automatically republished by GitHub.

## Kollel preset (optional)

- Chassidus: 08:00–09:00
- Nigla Aleph: 11:00–14:00
- Nigla Beis: 15:00–19:00 **(provisional default; confirm your actual start time)**
- Sunday–Friday; Friday counts Chassidus only
- America/New_York timezone, including DST
- 80 meter matching radius; 5 minute maximum gap for GPS interpolation; 100 meter maximum reported GPS uncertainty

The general default names are Morning, Midday, and Afternoon; the Friday exception is off until selected. All names and times are editable. Schedules must be non-overlapping and within one calendar day. This version supports 1–12 named time blocks, shared across enabled weekdays, with an optional Friday first-block-only exception. It does not yet support separate schedules for every weekday or overnight blocks. Holidays and other exceptions can be corrected during daily review.

## How counting works

1. A Timeline visit matches if its coordinates are within the chosen radius.
2. Raw timed GPS/path points can establish additional stays, including segments mislabeled as travel. Consecutive in-radius points count the time between them only if their gap is within your maximum; poor-accuracy or offsite points interrupt the chain. An isolated point earns no time. Unknown reported accuracy is accepted as an estimate.
3. Overlapping evidence is merged so a minute is counted only once. A matching Timeline visit can cover a raw GPS gap, but this is explicitly flagged for review. The app does not automatically override a visit label with every conflicting GPS point, interpolate arbitrarily long GPS gaps, or infer arrival from an isolated point.
4. Each stay is intersected with each scheduled seder. Davening/lunch outside seder windows are excluded. Separate stays remain separate; gaps between them are deducted.
5. Actual arrival/departure describe source stay boundaries. A continuous morning stay may therefore appear under both morning sedarim, matching the reference sheet.
6. Every day starts unreviewed. No evidence is marked as **no matching location evidence**, not proven absence. Daily review allows manual credited intervals and notes; it preserves original actual boundaries where available.

This is an attendance estimation tool. Being within a radius does not prove that someone was in a particular building or learning. Check uncertain days before submitting attendance.

## Exports

**Sheet CSV:** dynamic columns based on your named time blocks. With the three-block kollel preset, these match the original 14 columns: Day; each seder's credited Start/End; each seder's Actual Arrive/Leave; Notes. A split seder is represented by its first/last credited boundary with a note about gaps. Therefore subtracting its Start from End in a spreadsheet will overcount breaks.

**Detailed intervals CSV:** one row per uninterrupted credited interval, with date, seder, credited start/end, minutes, and notes. Use this file for accurate sums after breaks. Dashboard totals also deduct breaks. Missing/zero days appear in the sheet CSV; they have no credited interval rows in the detailed export. Times in CSV use the chosen timezone. Minute values retain two decimals; the dashboard rounds hours to two decimals.

CSV quotes and formula-leading cells are escaped. Names/notes from imported history are inserted as text, not HTML.

## Supported JSON layouts

- `semanticSegments`: `visit.topCandidate.placeLocation`, segment start/end, and `timelinePath` timed points
- Legacy `timelineObjects`: `placeVisit.location` with `duration` and activity `simplifiedRawPath.points`
- `locations`: timed latitudeE7/longitudeE7 points (old Takeout Records)
- `rawSignals`: positions containing LatLng/latLng and timestamps
- Top-level record arrays with supported visits or paths
- Multiple recognized arrays in one object are processed together

Coordinate readers support geo strings, latitude/longitude objects, latitudeE7/longitudeE7 and latE7/lngE7. Path times may be explicit timestamps or minute offsets from segment start. Untimed waypoints are ignored rather than assigned invented times. This is deliberately not a universal parser for every JSON file: unsupported or empty layouts produce a visible error.

The user's original export was not supplied. Compatibility is based on implemented formats and synthetic fixtures, not validation against that specific file.

## Large files and verification

JSON parsing, normalization, and calculations run in a background Web Worker so the main UI stays responsive. The full JSON is parsed in memory, not streamed. Large files require more memory than their on-disk size; on memory-constrained phones, use a computer. The normalized history stays in the worker so changing a radius or schedule does not reread the file.

Validated with 16 automated tests and the demo import → calculate → review workflow in Chrome. A synthetic 76.9 MiB file containing 240,000 timed points parsed and calculated in approximately 0.42 seconds on the development machine. This is not a phone benchmark or a guarantee for real exports; file layout and hardware affect time and memory.

## Develop

Requirements for development checks only: Node.js 18+.

```sh
node --test tests/core.test.js
node tests/benchmark.js
node build.js
```

Edit `core.js` for the parsing/calculation engine and `index.template.html` for the interface. Run `node build.js` after changes to regenerate the standalone `index.html`, then commit the source files and both generated HTML files. `build.js` regenerates both names from the same source. The template alone is not the runnable app.

## License

MIT. You may share, modify, and publish this app. No personal location history is included.
