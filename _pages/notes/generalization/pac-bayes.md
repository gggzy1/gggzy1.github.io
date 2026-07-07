---
layout: note
title: "A Note on PAC-Bayes Bounds"
permalink: /notes/generalization/pac-bayes/
math: true
description: Posterior-prior KL control and high-probability risk bounds.
---

PAC-Bayes gives generalization guarantees for randomized predictors by comparing a posterior $Q$ to a prior $P$.

For bounded loss, a canonical high-probability template is:

$$
\mathrm{KL}\!\left(\widehat{L}(Q)\,\|\,L(Q)\right)
\le
\frac{\mathrm{KL}(Q\|P)+\log\frac{1}{\delta}}{n},
$$

where

$$
\widehat{L}(Q)=\mathbb{E}_{h\sim Q}\widehat{R}_n(h),\qquad
L(Q)=\mathbb{E}_{h\sim Q}R(h).
$$

After inverting the Bernoulli-KL term, one gets explicit upper bounds on $L(Q)$.

Interpretation:

- The empirical fit is $\widehat{L}(Q)$.
- Complexity is measured by $\mathrm{KL}(Q\|P)$.
- Choosing $Q$ close to $P$ while fitting data yields tighter guarantees.

PAC-Bayes is influential in modern analyses of noisy SGD and flat-minima style posteriors.

## References

1. J. Langford and J. Shawe-Taylor, “PAC-Bayes and Margins,” *NIPS*, 2002.
2. B. Guedj, “A Primer on PAC-Bayesian Learning,” *arXiv:1901.05353*, 2019.
