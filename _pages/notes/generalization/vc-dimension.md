---
layout: note
title: "A Note on VC Dimension"
permalink: /notes/generalization/vc-dimension/
math: true
description: Shattering, VC dimension, and finite-class style generalization bounds.
toc:
  sidebar: left
---

For binary classification, let $\mathcal{H} \subseteq \{0,1\}^{\mathcal{X}}$.

A set $\{x_1,\ldots,x_m\}$ is **shattered** by $\mathcal{H}$ if every labeling in $\{0,1\}^m$ can be realized by some $h \in \mathcal{H}$.

The **VC dimension** is

$$
\mathrm{VC}(\mathcal{H}) := \max\{m: \exists\ \text{shattered set of size }m\}.
$$

Classical theory states that finite VC dimension implies uniform convergence and PAC learnability. A representative bound (up to constants) is:

$$
\sup_{h\in\mathcal{H}} |R(h)-\widehat{R}_n(h)|
= O\!\left(\sqrt{\frac{d\log(n/d)+\log(1/\delta)}{n}}\right),
\quad d=\mathrm{VC}(\mathcal{H}).
$$

VC dimension is combinatorial and distribution-free, but can be loose for norm-constrained real-valued models. This motivates data-dependent measures such as [Rademacher complexity](/notes/generalization/rademacher-complexity/).

## Series navigation

- Previous: [Generalization Setup and Uniform Convergence](/notes/generalization/setup-uniform-convergence/)
- Next: [A Note on Rademacher Complexity](/notes/generalization/rademacher-complexity/)
- Series hub: [Generalization](/notes/generalization/)

## References

1. V. Vapnik, *Statistical Learning Theory*, 1998.
2. S. Shalev-Shwartz and S. Ben-David, *Understanding Machine Learning*, 2014.
