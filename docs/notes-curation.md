# Notes curation

The archive was initially curated into six PDF drafts. The current entry point instead leads with two web essays; four longer PDFs remain linked as working notes. The earlier introductory PDF is retained at its original URL but is no longer featured. The PDF sources revise the supplied Note_Algorithms.zip materials. The user archive is unchanged. Selected originals are preserved locally in `_local_preview/notes-original/`.

## Provenance
- `first-order-methods.tex`: `1_Optimization_Algorithms/12_FOM_Rate.tex`; original SHA-256 `8f7d5031fcd8a3f881ee3f353db6c45ed43fc0fd02219594ea1d38f60aebeb22`.
- `spo-two-stage.tex`: `1_Optimization_Algorithms/SPO_2SP.tex`; original SHA-256 `d006bdca7483c35eebd3fcacc351988c0c3a0e4ab65db5b5f319280cc1d7b2db`.
- `fisher-markets.tex`: `2_ECONCS/20_FisherMarket.tex`; original SHA-256 `601fe84097bf88da59ae448a53354ccbe88317a35f01301afadfcf7981f5b41c`.

- `what-is-optimization.tex`: `0_Intuition/00_What_is_Optimization.tex`; original SHA-256 `47e18db0a00ca6a7acfd34ee5c4326204bf606e462d4abdcb417891567f6db82`.
- `black-box-optimization.tex`: `1_Optimization_Algorithms/10_Glob_Black_Box.tex`; original SHA-256 `b4ec53da4346104b31cf6ba1629c8749612885228199507daab30410a265e6a6`.
- `local-methods.tex`: `1_Optimization_Algorithms/11_Local_Methods_In_Unconstr_Min.tex`; original SHA-256 `1aa84b3ca460de5f272b78275d46ff993c5a5ee4addb9138da2ff8976d005c97`.

## Changes and review scope

- What is optimization: retain the original modeling introduction and variable classifications. Remove the empty bounded/unbounded and deterministic/stochastic headings and the separate contents page. Link the existing dictionary attribution and add a short bridge to the oracle note. This is a short introductory essay, not a comprehensive taxonomy.
- Black-box optimization: retain the grid algorithm and upper-bound proof. Correct the grid argmin notation. Scope the lower bound to deterministic function-value algorithms and count an unqueried output as well as queries. Use a bump of depth 2 epsilon to obtain a strict violation of the requested error tolerance; state the conservative bound floor(L/(4 epsilon))^n - 1. Upper and lower bounds agree in epsilon order for fixed dimension, not in constants. Replace the unsupported computing-time anecdote with a query-count example and add the Nesterov reference.
- Local methods: retain the optimality-condition proofs, gradient method and Newton derivation. Label sublevel sets accurately and state differentiability for level-set orthogonality. Clarify constrained critical-cone and strong-convexity assumptions. Distinguish one-sided Armijo backtracking from the original two-sided Goldstein condition. Complete the gradient-descent telescoping argument and the local Newton proof, including stationarity, an invariant neighborhood and Hessian invertibility. Remove the empty quasi-Newton section; add primary textbook references.
- First-order methods: scope/oracle units and accuracy criteria precede the geometry and algorithm sections. Original definitions, GD statements and algorithm outlines are retained. Complexity bounds keep the initial distance/error factors; nonconvex NAG is not assigned an unconditional rate. The convex SGD theorem now states explicit steps, averaging and a distance-recursion proof. Strongly convex SGD states a stronger second-moment condition and weighted averaging, with a proof, rather than identifying full second moment with noise variance. A nonconvex descent calculation is added. SVRG has component convexity/smoothness assumptions; the general-convex regularization reduction keeps its logarithmic factor. References and separate deterministic/stochastic tables are included. This is a focused expository note, not a complete survey of optimal stochastic rates.
- SPO+: original LP derivation and portfolio equations are retained. Added optimizer-selection, compactness and integrability assumptions in the general case; distinguished the unbounded portfolio epigraph and its finite relevant LP directions; stated when parameter convexity holds; separated the learning recourse interpretation from nonanticipative multistage trading policies and from DSA convergence guarantees. Corrected the Lan–Zhou reference and added the CVaR reference. No empirical results or new algorithm claims are added.
- Fisher: original model families and program pairs are retained. Corrected extended-valued conjugacy, domains, subgradient pairing and biconjugacy assumptions; handled zero coefficients in Leontief/ratio/log expressions; clarified the omitted EG dual constant; added a Lagrangian/KKT derivation; explained Shmyrev's constant term; corrected the missing sum and variables in the quasi-linear primal; added primary references.
- Style: retain the supplied optstyle palette and theorem environments; keep theorem/definition boxes together, retain breakable remarks/interpretations, and shorten running headers.

## Directory decisions

The current directory leads with two web notes: What We Talk About When We Talk About Optimization, and Optimization under Uncertainty. The introduction preserves the original opening and modeling formula from the supplied TeX file. Its unfinished classifications are organized into variable form and dimension, feasible-set and objective structure, and uncertainty. The stochastic note develops the uncertainty classification with an inventory example. The two web notes cross-reference this connection. The stochastic page replaces its old roadmap at the same URL; the former roadmap is preserved locally at `_local_preview/notes-original/stochastic-roadmap.md`.

The black-box, local-method, first-order and Fisher PDFs are linked as working notes. The SPO+ PDF is retained locally under `_notes_sources/working-papers/` and is not published. These PDFs are supplementary derivation materials, not presented as a completed lecture series. This pass does not claim to have rewritten or completed them. No new PDFs are generated.

The original directory is preserved at `/notes/earlier/`; existing URLs remain intact. Sixteen original technical note bodies remain intact; the stochastic roadmap is replaced as described above, and the Basics page has its stale stochastic "coming soon" label updated. Other archive files remain outside the curated directory: `Example.tex` is a template; the short SPO source overlaps with the full version; PR needs its own mathematical review; LPBoost belongs with learning and optimization rather than markets; the Hessian file is a reading slide deck. No placeholder entries are added for these files.

## Rebuild

Run `powershell -ExecutionPolicy Bypass -File _notes_sources/build.ps1` from the repository root with TeX Live on PATH. Each note is compiled twice, with auxiliary files in the ignored `_local_preview/latex/` directory. The script copies the final PDFs to `assets/pdf/notes/`. Regenerate the local preview with `_local_preview/build_preview.py`.

The site is being published on GitHub Pages with `noindex, nofollow` metadata; the CV is not included.

## Files changed in this curation

- `_pages/notes.md`: web-first directory and working-note status.
- `_pages/notes/optimization/what-is-optimization.md`: modeling essay with an inventory example and an ending that connects to oracles and stochastic optimization.
- `_pages/notes/optimization/stochastic.md`: expected-cost example, quantile calculation, explicit replenishment recourse, sampling and stochastic-gradient distinctions.
- `_pages/notes/optimization/basics.md`: updated sibling-link description.
- `_pages/notes/earlier.md`: preserved former directory.
- `_notes_sources/what-is-optimization.tex`, `black-box-optimization.tex`, `local-methods.tex`, `first-order-methods.tex`, `spo-two-stage.tex`, `fisher-markets.tex`, `optstyle.sty`, and `build.ps1`: editable source projects and local build.
- `assets/pdf/notes/`: the six compiled reading versions.
- `_local_preview/build_preview.py`: copies the same note PDFs into the ignored local preview.
- `docs/notes-curation.md`: provenance, correction scope and maintenance instructions.

## Earlier PDF validation

The original three PDFs compile with two passes and were rendered and visually inspected (7, 5 and 6 pages for first-order methods, SPO+ and Fisher respectively). The three new foundational PDFs also compile with two passes, with no unresolved references or overfull-box warnings, and all pages were rendered and visually inspected (2, 4 and 7 pages for the introduction, black-box and local-method notes respectively).

All 27 local page/PDF routes checked returned HTTP 200, including six valid PDF signatures. The eighteen existing note bodies were compared to Git HEAD and remain unchanged; only their earlier layout metadata differs. The updated directory was inspected at desktop and 390px mobile width without horizontal overflow. These checks cover compilation, layout, links and the mathematical issues listed above; they are not a blanket certification of every result in the archive.

A full Jekyll build was not run: Ruby/Bundler are unavailable in the current local environment. The source content is prepared for the existing Jekyll site; preview verification used the local Python builder.


## Web revision and current validation

The two web essays state their scopes and assumptions. The continuous-demand quantile calculation includes its differentiation justification; the discrete example is solved directly. The replenishment model includes a solved feasible recourse problem and distinguishes the new initial ordering cost. The stochastic-gradient update states conditional unbiasedness, a closed convex projection set, and no unsupported convergence rate. Links to the SIAM stochastic-programming book and Stanford stochastic-method notes were verified against primary sources. This is an introductory treatment, not a survey of risk measures, SAA theory or multistage algorithms.

The local Python builder generates the new pages using the existing academic-note layout and MathJax. All 28 local routes return HTTP 200; the explicit two-stage anchor resolves. The original PDF files and their TeX sources are unchanged by this web revision. The earlier Ruby/Bundler limitation remains; this is not a full Jekyll-build confirmation.
Both web notes were inspected at desktop and 390px mobile width. MathJax reports no formula errors (18 expressions in the introduction and 56 in the final stochastic note). After mobile line breaks, no displayed formula or page has horizontal overflow. The public Pages deployment uses the custom academic layout and remains marked `noindex, nofollow`.


## Revision to preserve the original introduction

The user requested restoration of their original writing. The web introduction now retains the archive opening section, its formula, the original second-section heading and quotation, and the introductory paragraph under Decision Variables. The unfinished classification is revised without replacing that opening with the newly authored inventory narrative. Boundedness describes the feasible set; smoothness and convexity are properties of the problem; deterministic/stochastic describes uncertainty in the data and the timing of decisions. The stochastic essay retains its mathematical content, with its opening and closing cross-references updated to match.

The custom academic-note layout and the local preview builder no longer render descriptions below note titles, including bilingual titles. Descriptions in older page metadata remain available. No PDF or archive source is modified in this revision.
Validation for this revision: original opening prose checked against the supplied TeX source; all academic-note preview headers omit subtitles; updated local routes return HTTP 200. The introduction renders 16 mathematical expressions without MathJax errors, page overflow or displayed-formula overflow at 390px width. Desktop preview was visually inspected.
