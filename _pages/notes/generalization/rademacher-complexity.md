---
layout: note
title: "A Note on Rademacher Complexity"
permalink: /notes/generalization/rademacher-complexity/
math: true
description: Data-dependent complexity and generalization bounds via symmetrization.
---

Rademacher complexity gives a **data-dependent** measure of function-class richness.

For sample $S=(z_1,\ldots,z_n)$ and class $\mathcal{F}$,

$$
\widehat{\mathfrak{R}}_S(\mathcal{F})
:=
\mathbb{E}_{\sigma}\!\left[
\sup_{f\in\mathcal{F}}
\frac{1}{n}\sum_{i=1}^n \sigma_i f(z_i)
\right],
$$

where $\sigma_i$ are i.i.d. Rademacher signs.

A typical bounded-loss bound is:

$$
\forall f\in\mathcal{F},\quad
R(f) \le \widehat{R}_n(f)
+ 2\,\widehat{\mathfrak{R}}_S(\mathcal{F})
+ O\!\left(\sqrt{\frac{\log(1/\delta)}{n}}\right)
$$

with probability at least $1-\delta$.

Compared with VC dimension, Rademacher complexity adapts to sample geometry and often yields sharper bounds for norm-bounded linear predictors, kernels, and neural nets.

## References

1. M. Mohri, A. Rostamizadeh, and A. Talwalkar, *Foundations of Machine Learning*, 2nd ed., 2018.
2. P. L. Bartlett and S. Mendelson, “Rademacher and Gaussian Complexities,” *JMLR*, 2002.
