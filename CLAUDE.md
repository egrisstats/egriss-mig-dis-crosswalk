# Notes for editing this repo

- Plain HTML, CSS and JavaScript. No framework, no build. Test by opening the pages in a browser.
- `crosswalk.js` holds everything for the crosswalk: `PARAS` (quoted paragraphs with highlighted parts), `R` (refugee routes: category, type of stay, resident group, case, example, rule, reference, likelihood), `NEST` (refugee cases), `FLOWA` and `FLOWB` (IDP graphs with their cases), and the drawing code.
- `story.js` is the walk-through: one step per screen with snap scrolling, a caption above the graph, and the graph built from HTML cards with the routes drawn between them after layout. It reads the data in `crosswalk.js` (`CATS`, `LINKS`, `MID`, `MIDLAB`, `CELLS`, `NEST`, `GFULL`, `FLOWA`, `FLOWB`); the hidden crosswalk markup in `story.html` is there so `crosswalk.js` can run. Steps live in the `STEPS` array: each can set `build` (columns shown: L, M, R, sq, links), `hide` (node ids), `focus` (`col:L|M|R`, `node:<id>`, `gate`, `frame`), `exp` (expected-route case) and `cases`.
- Case types: E expected, 1 never moved, 2 not yet or not visible, 3 migrant for a different reason, 4 counted differently, 5 misalignment.
- Writing conventions: never use en dashes; call IRRS, IRIS and IROSS "recommendations", never "standards"; examples use "a woman", "a man", "a child", not personal names.
