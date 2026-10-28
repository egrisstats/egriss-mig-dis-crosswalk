# Notes for editing this repo

- Plain HTML, CSS and JavaScript. No framework, no build. Test by opening the pages in a browser.
- `crosswalk.js` holds everything for the crosswalk: `PARAS` (quoted paragraphs with highlighted parts), `R` (refugee routes: category, type of stay, resident group, case, example, rule, reference, likelihood), `NEST` (refugee cases), `FLOWA` and `FLOWB` (IDP graphs with their cases), and the drawing code.
- `story.js` reuses those graphs. Steps are built from the arrays `B` (refugees), `C` (IDPs crossing a border) and `D` (IDPs and the census), plus the "How to read" steps defined with `step({...})`. Each step can set `build` (columns shown: L, M, R, sq, links), `hide` (node ids), `focus` (spotlight targets) and `cases`.
- Case types: E expected, 1 never moved, 2 not yet or not visible, 3 migrant for a different reason, 4 counted differently, 5 misalignment.
- Writing conventions: never use en dashes; call IRRS, IRIS and IROSS "recommendations", never "standards"; examples use "a woman", "a man", "a child", not personal names.
