---
layout: note
title: "A Note on Stability-Based Generalization"
permalink: /notes/generalization/stability-generalization/
math: true
description: Algorithmic stability as an alternative route to generalization guarantees.
toc:
  sidebar: left
---

Besides uniform convergence, one can control generalization by studying the algorithm itself.

Let $A(S)$ be the predictor returned by a learning algorithm on sample
$S=(z_1,\ldots,z_n)$. Uniform stability (in one standard form) requires

$$
\sup_{z}\left|
\ell(A(S),z)-\ell(A(S^{(i)}),z)
\right|
\le \beta_n
$$

for every index $i$, where $S^{(i)}$ differs from $S$ in one point.

If losses are bounded and $A$ is $\beta_n$-stable, typical bounds imply

$$
\left|\mathbb{E}[R(A(S))-\widehat{R}_n(A(S))]\right|
= O(\beta_n).
$$

This framework is particularly natural for regularized ERM and gradient-based training where perturbing one sample changes the output only slightly.

Stability complements [VC](/notes/generalization/vc-dimension/) and [Rademacher](/notes/generalization/rademacher-complexity/) analyses and often yields tighter, algorithm-specific results. Another complementary route is [PAC-Bayes](/notes/generalization/pac-bayes/).

## Series navigation

- Previous: [A Note on Covering Numbers and Entropy Bounds](/notes/generalization/covering-numbers/)
- Next: [A Note on PAC-Bayes Bounds](/notes/generalization/pac-bayes/)
- Series hub: [Generalization](/notes/generalization/)

## References

1. O. Bousquet and A. Elisseeff, “Stability and Generalization,” *JMLR*, 2002.
2. S. Shalev-Shwartz and S. Ben-David, *Understanding Machine Learning*, 2014.
