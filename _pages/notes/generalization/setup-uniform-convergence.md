---
layout: note
title: "Generalization Setup and Uniform Convergence"
permalink: /notes/generalization/setup-uniform-convergence/
math: true
description: Learning setup, generalization gap, and the uniform convergence template.
---

Let $\mathcal{H}$ be a hypothesis class and $\ell(h,z)$ a bounded loss on sample $z$.

Define the population and empirical risks:

$$
R(h) := \mathbb{E}_{z \sim \mathcal{D}}[\ell(h,z)],
\qquad
\widehat{R}_n(h) := \frac{1}{n}\sum_{i=1}^n \ell(h,z_i).
$$

The core quantity is the **generalization gap**:

$$
R(h) - \widehat{R}_n(h).
$$

A standard learning-theory route is to prove a high-probability **uniform convergence** bound:

$$
\sup_{h \in \mathcal{H}} |R(h)-\widehat{R}_n(h)| \le \varepsilon_n(\mathcal{H},\delta),
$$

which then yields excess-risk guarantees for ERM.

This note serves as the entry point for complexity measures such as VC dimension and Rademacher complexity.

## References

1. S. Shalev-Shwartz and S. Ben-David, *Understanding Machine Learning*, 2014.
2. M. Mohri, A. Rostamizadeh, and A. Talwalkar, *Foundations of Machine Learning*, 2nd ed., 2018.
