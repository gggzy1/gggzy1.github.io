---
layout: note
title: "Optimization — Stochastic Methods"
permalink: /notes/optimization/stochastic/
description: Stochastic programming and stochastic approximation (roadmap).
---

Notes on optimization under uncertainty: **stochastic programming** (modeling and finite-scenario methods) and **stochastic approximation** (online / sample-based first-order algorithms). Content in progress.

---

## A. Stochastic programming

1. Decision under uncertainty — scenarios, recourse, expected value
2. Sample average approximation (SAA) — consistency, sample complexity, solution quality
3. Two-stage stochastic programming — here-and-now vs wait-and-see; L-shaped / Benders (brief)
4. Multi-stage stochastic programming — scenario trees, nested decomposition (brief)
5. Risk measures — variance, CVaR / expected shortfall; coherent risk; chance constraints (brief)
6. Distributionally robust optimization (DRO) — ambiguity sets, connections to risk (optional)

---

## B. Stochastic approximation (SA)

7. Stochastic approximation framework — Robbins–Monro, noisy oracles
8. SGD and mini-batch methods
9. Variance reduction (SVRG, SAGA)
10. Stochastic proximal and composite problems
11. Convergence rates and sample complexity (brief)

---

## Links

- Foundational duality and constrained structure: [Basics](/notes/optimization/basics/)
- Deterministic first-order algorithms: [First-order methods](/notes/optimization/first-order/)

[Back to all notes](/notes/)
