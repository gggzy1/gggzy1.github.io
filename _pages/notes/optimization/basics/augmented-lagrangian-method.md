---
layout: note
title: "A Note on the Augmented Lagrangian Method"
permalink: /notes/optimization/basics/augmented-lagrangian-method/
math: true
description: Augmented Lagrangian for equality constraints, multiplier updates, and why ALM avoids pure penalty ill-conditioning.
---

The **augmented Lagrangian method (ALM)** is a standard approach to equality-constrained optimization. It can be read as a shifted penalty method, as a multiplier method, or — in the convex case — as proximal point on the dual. This note focuses on equalities, the update $\lambda \leftarrow \lambda + \rho\, c(x)$, and the link to KKT.

For classical Lagrange duality, see [A Note on Lagrangian Duality](/notes/optimization/basics/lagrangian-duality/).

---

## 1. Equality-constrained problem

$$
\min_{x \in \mathbb{R}^n} \; f(x)
\quad\text{s.t.}\quad
c(x)=0,
\qquad
c(x)=\bigl(c_1(x),\ldots,c_m(x)\bigr)^\top \in \mathbb{R}^m.
$$

The ordinary Lagrangian is

$$
\mathcal{L}(x,\lambda)=f(x)+\lambda^\top c(x),
\qquad \lambda\in\mathbb{R}^m.
$$

Under a constraint qualification, a local minimizer $x^*$ admits a multiplier $\lambda^*$ with KKT

$$
\nabla_x \mathcal{L}(x^*,\lambda^*)
=
\nabla f(x^*)+J_c(x^*)^\top\lambda^*=0,
\qquad
c(x^*)=0,
$$

where $J_c(x)$ is the Jacobian of $c$.

---

## 2. Pure penalty and ill-conditioning

A quadratic penalty ignores multipliers and solves

$$
\min_x
\Bigl(
f(x)+\tfrac{\rho}{2}\|c(x)\|^2
\Bigr),
\qquad \rho>0.
$$

Large $\rho$ forces $c(x)\approx 0$, but the Hessian of the penalized objective contains a term $\rho\, J_c(x)^\top J_c(x)$. For linear constraints $c(x)=Ax-b$ this is $\nabla^2 f(x)+\rho A^\top A$, which becomes severely ill-conditioned as $\rho\to\infty$.

ALM keeps a moderate $\rho$ and lets the multiplier estimate absorb most of the constraint force.

---

## 3. Augmented Lagrangian

$$
\mathcal{L}_\rho(x,\lambda)
=
f(x)+\lambda^\top c(x)+\tfrac{\rho}{2}\|c(x)\|^2.
$$

Completing the square gives the equivalent (in $x$) form

$$
\mathcal{L}_\rho(x,\lambda)
=
f(x)
+\tfrac{\rho}{2}\Bigl\|c(x)+\tfrac{\lambda}{\rho}\Bigr\|^2
-\tfrac{1}{2\rho}\|\lambda\|^2.
$$

So minimizing in $x$ is a **shifted** quadratic penalty: the target for $c(x)$ is $-\lambda/\rho$ rather than $0$. Good $\lambda$ means a smaller residual is enough, and $\rho$ need not explode.

The $x$-gradient is

$$
\nabla_x \mathcal{L}_\rho(x,\lambda)
=
\nabla f(x)+J_c(x)^\top\bigl(\lambda+\rho\, c(x)\bigr).
$$

Compare with stationarity $\nabla f+J_c^\top\lambda^*=0$: at a minimizer of $\mathcal{L}_\rho(\,\cdot\,,\lambda)$, the vector $\lambda+\rho\, c(x)$ plays the role of an updated multiplier.

---

## 4. Basic ALM iteration

Given $\lambda^0$ and $\rho_0>0$, iterate

$$
\begin{aligned}
x^{k+1}
&\in
\arg\min_x\,
\mathcal{L}_{\rho_k}(x,\lambda^k),
\\[0.35em]
\lambda^{k+1}
&=
\lambda^k+\rho_k\, c(x^{k+1}).
\end{aligned}
$$

Optionally increase $\rho_k$ if $\|c(x^{k+1})\|$ stagnates (e.g. fails to decrease by a fixed factor).

**Why the multiplier update.** If $x^{k+1}$ is an exact minimizer of $\mathcal{L}_{\rho_k}(\,\cdot\,,\lambda^k)$, then

$$
\nabla f(x^{k+1})
+
J_c(x^{k+1})^\top
\bigl(\lambda^k+\rho_k\, c(x^{k+1})\bigr)
=
0,
$$

i.e.

$$
\nabla_x \mathcal{L}\bigl(x^{k+1},\lambda^{k+1}\bigr)=0
\quad\text{with}\quad
\lambda^{k+1}=\lambda^k+\rho_k\, c(x^{k+1}).
$$

Each exact subproblem solve produces a point that is **stationary for the ordinary Lagrangian** at the new multiplier. The remaining task is to drive $c(x^k)\to 0$ (and, under standard second-order conditions, $\lambda^k\to\lambda^*$).

In practice the $x$-step is solved only approximately; the same update is kept, and $\rho$ is adjusted for progress on feasibility.

---

## 5. Dual / proximal reading (convex case)

Define the dual function $g(\lambda)=\inf_x \mathcal{L}(x,\lambda)$. For convex problems with enough structure, maximizing $g$ is equivalent to the original constrained problem (strong duality). One can show that

$$
\inf_x \mathcal{L}_\rho(x,\lambda)
=
\sup_{u}
\Bigl(
g(u)-\tfrac{1}{2\rho}\|u-\lambda\|^2
\Bigr)
=
g^\rho(\lambda),
$$

the **Moreau envelope** of $-g$ (up to sign conventions): ALM is proximal point on the dual. The multiplier update is then a proximal / dual-ascent step. This explains stability for moderate $\rho$ and global convergence results in the convex setting (Rockafellar).

---

## 6. Inequalities (brief)

For inequalities $g(x)\le 0$, one common device is to introduce a slack $s\ge 0$ with $g(x)+s=0$, or to use a projected multiplier update

$$
\lambda^{k+1}
=
\bigl[\lambda^k+\rho_k\, g(x^{k+1})\bigr]_+.
$$

The equality case above is the core; inequality variants keep the same shifted-penalty intuition with a nonnegativity projection on $\lambda$.

---

## References

1. D. P. Bertsekas, *Constrained Optimization and Lagrange Multiplier Methods*, Academic Press, 1982 (classical ALM / method of multipliers).
2. J. Nocedal and S. J. Wright, *Numerical Optimization*, 2nd ed., Springer, 2006, Ch. 17 (practical ALM and SQP context).
3. R. T. Rockafellar, “Augmented Lagrangians and applications of the proximal point algorithm in convex programming,” *Math. Oper. Res.* 1 (1976), 97–116.
4. S. Boyd and L. Vandenberghe, *Convex Optimization*, Cambridge University Press, 2004, Ch. 5 (Lagrange duality background).
