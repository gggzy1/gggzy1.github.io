---
layout: note
title: "A Note on the Augmented Lagrangian Method"
permalink: /notes/optimization/basics/augmented-lagrangian-method/
math: true
description: Augmented Lagrangian for equality constraints, multiplier updates, and the proximal dual interpretation.
---

Equality-constrained ALM as a shifted penalty / multiplier method. Duality background: [Lagrangian Duality](/notes/optimization/basics/lagrangian-duality/).

---

## 1. Problem and KKT

$$
\min_{x\in\mathbb{R}^n} f(x)
\quad\text{s.t.}\quad
c(x)=0,
\qquad
c:\mathbb{R}^n\to\mathbb{R}^m.
$$

Lagrangian and Jacobian:

$$
\mathcal{L}(x,\lambda)=f(x)+\lambda^\top c(x),
\qquad
J_c(x)=\nabla c(x)^\top\in\mathbb{R}^{m\times n}.
$$

KKT (under a CQ): $\exists\,\lambda^\star$ such that

$$
\nabla_x\mathcal{L}(x^\star,\lambda^\star)
=\nabla f(x^\star)+J_c(x^\star)^\top\lambda^\star=0,
\qquad
c(x^\star)=0.
$$

---

## 2. Quadratic penalty

$$
P_\rho(x)=f(x)+\tfrac{\rho}{2}\|c(x)\|^2,
\qquad\rho>0.
$$

$$
\nabla P_\rho(x)=\nabla f(x)+\rho\, J_c(x)^\top c(x),
$$

$$
\nabla^2 P_\rho(x)
=\nabla^2 f(x)
+\rho\, J_c(x)^\top J_c(x)
+\rho\sum_{i=1}^m c_i(x)\,\nabla^2 c_i(x).
$$

For $c(x)=Ax-b$: $\nabla^2 P_\rho=\nabla^2 f+\rho A^\top A$. As $\rho\to\infty$, this is ill-conditioned.

---

## 3. Augmented Lagrangian

$$
\mathcal{L}_\rho(x,\lambda)
=f(x)+\lambda^\top c(x)+\tfrac{\rho}{2}\|c(x)\|^2
=f(x)+\tfrac{\rho}{2}\Bigl\|c(x)+\tfrac{\lambda}{\rho}\Bigr\|^2-\tfrac{1}{2\rho}\|\lambda\|^2.
$$

Gradients in $x$:

$$
\nabla_x\mathcal{L}_\rho(x,\lambda)
=\nabla f(x)+J_c(x)^\top\bigl(\lambda+\rho\, c(x)\bigr)
=\nabla_x\mathcal{L}\bigl(x,\,\lambda+\rho\, c(x)\bigr).
$$

Hessian (schematic): same $\rho\, J_c^\top J_c$ term as the penalty, but with a **shifted** residual $c(x)+\lambda/\rho$; accurate $\lambda$ keeps $\|c\|$ smaller for moderate $\rho$.

---

## 4. ALM iteration

$$
\begin{aligned}
x^{k+1}
&\in
\arg\min_x\,
\mathcal{L}_{\rho_k}(x,\lambda^k),
\\
\lambda^{k+1}
&=
\lambda^k+\rho_k\, c(x^{k+1}).
\end{aligned}
$$

If the $x$-step is exact,

$$
\nabla_x\mathcal{L}_\rho(x^{k+1},\lambda^k)=0
\;\Longleftrightarrow\;
\nabla_x\mathcal{L}(x^{k+1},\lambda^{k+1})=0.
$$

Thus each exact subproblem yields **Lagrangian stationarity** at $\lambda^{k+1}$. Feasibility $c(x^{k+1})\to 0$ (and $\lambda^k\to\lambda^\star$ under standard SOSC/CQ) is driven by the update and optional $\rho$-increase when $\|c(x^{k+1})\|$ does not decrease sufficiently.

---

## 5. Dual / proximal form (convex case)

Dual function: $g(\lambda)=\inf_x\mathcal{L}(x,\lambda)$. Then

$$
\inf_x\mathcal{L}_\rho(x,\lambda)
=\sup_{u\in\mathbb{R}^m}
\Bigl(g(u)-\tfrac{1}{2\rho}\|u-\lambda\|^2\Bigr).
$$

So the outer ALM loop is **proximal point** on maximizing $g$ (Rockafellar): a dual ascent with Moreau smoothing of parameter $\rho$.

---

## 6. Inequalities

For $g(x)\le 0$, a standard multiplier step is

$$
\lambda^{k+1}=\bigl[\lambda^k+\rho_k\, g(x^{k+1})\bigr]_+.
$$

(Equivalently: slack $s\ge 0$, $g(x)+s=0$, then apply the equality ALM.)

---

## References

1. D. P. Bertsekas, *Constrained Optimization and Lagrange Multiplier Methods*, Academic Press, 1982.
2. J. Nocedal and S. J. Wright, *Numerical Optimization*, 2nd ed., Springer, 2006, Ch. 17.
3. R. T. Rockafellar, “Augmented Lagrangians and applications of the proximal point algorithm in convex programming,” *Math. Oper. Res.* 1 (1976), 97–116.
4. S. Boyd and L. Vandenberghe, *Convex Optimization*, Cambridge University Press, 2004, Ch. 5.
