---
layout: note
title: "A Note on Covering Numbers and Entropy Bounds"
permalink: /notes/generalization/covering-numbers/
math: true
description: Metric entropy, Dudley integral, and chaining-style generalization control.
toc:
  sidebar: left
---

Covering numbers provide a geometric way to quantify function-class richness.

For a metric space $(\mathcal{F}, d)$, the $\varepsilon$-covering number is

$$
\mathcal{N}(\varepsilon,\mathcal{F},d)
:=
\min\left\{m:\exists f_1,\dots,f_m,\ \mathcal{F}\subseteq \bigcup_{k=1}^m B_d(f_k,\varepsilon)\right\}.
$$

The logarithm

$$
\log \mathcal{N}(\varepsilon,\mathcal{F},d)
$$

is called the metric entropy.

In empirical-process bounds, entropy controls complexity through integrals such as Dudley's bound (schematic form):

$$
\widehat{\mathfrak{R}}_S(\mathcal{F})
\lesssim
\inf_{\alpha>0}
\left(
\alpha + \int_{\alpha}^{\mathrm{diam}(\mathcal{F})}
\sqrt{\frac{\log \mathcal{N}(\varepsilon,\mathcal{F},L_2(S))}{n}}
\ d\varepsilon
\right).
$$

So covering numbers connect geometric approximation of $\mathcal{F}$ to statistical generalization. For algorithm-dependent guarantees, see [stability-based generalization](/notes/generalization/stability-generalization/).

## Series navigation

- Previous: [A Note on Rademacher Complexity](/notes/generalization/rademacher-complexity/)
- Next: [A Note on Stability-Based Generalization](/notes/generalization/stability-generalization/)
- Series hub: [Generalization](/notes/generalization/)

## References

1. M. Mohri, A. Rostamizadeh, and A. Talwalkar, *Foundations of Machine Learning*, 2nd ed., 2018.
2. R. M. Dudley, “The Sizes of Compact Subsets of Hilbert Space and Continuity of Gaussian Processes,” *J. Functional Analysis*, 1967.
