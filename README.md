# Displacement and migration crosswalk

Working draft of the EGRISS Migration-Displacement task team, for discussion.

Interactive crosswalk between the refugee and IDP recommendations (IRRS 2018, IRIS 2020) and the migration recommendations (IMTM 2025, census P&R Rev. 4). It shows where the populations nest and where they do not ("non-nested cases"), with worked examples and paragraph references.

- `index.html`: the crosswalk. Hover a route or a numbered pill for the case, click a box to isolate its routes.
- `story.html`: a scroll-through introduction that builds the same graph step by step: expected route first, then each type of non-nested case.

## Run locally

Open `index.html` in a browser. No build step and no dependencies (fonts load from Google Fonts).

## Publish with GitHub Pages

Settings → Pages → Deploy from a branch → `main` / root. The site is then at `https://<owner>.github.io/<repo>/`.

## Structure

```
index.html      crosswalk page (markup)
story.html      scrollytelling page (crosswalk markup kept hidden + story layout)
crosswalk.css
story.css
crosswalk.js    data (routes, cases, paragraph quotes) and the three graphs
story.js        step engine: column build-up, highlighting, pinned case notes
```

## Sources

IRRS 2018 (Fig. 3.1, 3.2; paras 77-97, 105); IRIS 2020 (Fig. 3.1-3.3; paras 75, 78, 82-89, 94-99, 117); IMTM 2025 (Fig. 1-3, 5, 6; paras 16-17, 25-27, 30, 33-34, 52-61); P&R Rev. 4 draft of 9 August 2024 (paras 2.50-2.51, 5.47-5.84).
