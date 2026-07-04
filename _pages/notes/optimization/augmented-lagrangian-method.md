---
layout: page
title: "A Note on the Augmented Lagrangian Method"
permalink: /notes/optimization/augmented-lagrangian-method/
math: true
description: Mathematical structure of the augmented Lagrangian method.
---

The augmented Lagrangian method (ALM) is one of the central algorithms for constrained optimization. It can be viewed from several complementary perspectives: as a stabilized penalty method, as a multiplier method, as dual ascent on a smoothed dual function, and, in the convex case, as the proximal point method applied to the dual problem.

This note summarizes the mathematical structure of ALM, with emphasis on equality-constrained problems, the multiplier update, and its connection to the KKT conditions.

---

## 1. Equality-constrained problem

Consider the equality-constrained optimization problem

$$
\min_{x \in \mathbb{R}^n} f(x)
\quad \text{s.t.} \quad c(x)=0,
$$

where

$$
c(x)=
\begin{bmatrix}
c_1(x) \\
\vdots \\
c_m(x)
\end{bmatrix}
\in \mathbb{R}^m.
$$

The classical Lagrangian is

$$
\mathcal{L}(x,\lambda)
=
f(x)+\lambda^\top c(x),
$$

where $\lambda \in \mathbb{R}^m$ is the vector of Lagrange multipliers.

If $x^*$ is a local solution and a suitable constraint qualification holds, then there exists a multiplier $\lambda^*$ such that the KKT conditions hold:

$$
\nabla f(x^*) + J_c(x^*)^\top \lambda^* = 0,
\qquad
c(x^*)=0,
$$

where $J_c(x)$ is the Jacobian matrix of $c(x)$.

The first condition is stationarity. The second condition is primal feasibility.

---

## 2. Penalty method and its limitation

A simple way to handle the constraint $c(x)=0$ is to penalize violation:

$$
\min_x
\left[
f(x)+\frac{\rho}{2}\|c(x)\|^2
\right],
$$

where $\rho>0$ is a penalty parameter.

As $\rho \to \infty$, violating the constraint becomes increasingly expensive, so minimizers of the penalized problem tend to satisfy $c(x)\approx 0$.

However, the penalty method has a serious numerical drawback: to obtain high feasibility, $\rho$ often needs to be very large. The Hessian of the penalized objective contains terms of the form

$$
\nabla^2 f(x)
+
\rho J_c(x)^\top J_c(x)
+
\rho \sum_{i=1}^m c_i(x)\nabla^2 c_i(x).
$$

For linear constraints, this reduces to

$$
\nabla^2 f(x) + \rho A^\top A.
$$

Thus, when $\rho$ becomes large, the subproblem can become ill-conditioned.

The augmented Lagrangian method improves this by introducing multiplier estimates, so that the quadratic penalty does not need to do all the work.

---

## 3. Augmented Lagrangian

The augmented Lagrangian is defined as

$$
\mathcal{L}_\rho(x,\lambda)
=
f(x)
+
\lambda^\top c(x)
+
\frac{\rho}{2}\|c(x)\|^2,
$$

where $\rho>0$.

It combines two ideas:

1. the multiplier term $\lambda^\top c(x)$, which estimates the correct shadow price of the constraint;
2. the quadratic penalty term $\frac{\rho}{2}\|c(x)\|^2$, which stabilizes the subproblem and penalizes infeasibility.

By completing the square,

$$
\mathcal{L}_\rho(x,\lambda)
=
f(x)
+
\frac{\rho}{2}
\left\|
c(x)+\frac{\lambda}{\rho}
\right\|^2
-
\frac{1}{2\rho}\|\lambda\|^2.
$$

Since the last term does not depend on $x$, minimizing $\mathcal{L}_\rho(x,\lambda)$ over $x$ is equivalent to minimizing

$$
f(x)
+
\frac{\rho}{2}
\left\|
c(x)+\frac{\lambda}{\rho}
\right\|^2.
$$

Therefore, ALM behaves like a penalty method whose penalty center is shifted by the current multiplier estimate.

---

## 4. Basic ALM algorithm

The basic ALM iteration is

$$
x^{k+1}
\in
\arg\min_x
\mathcal{L}_{\rho_k}(x,\lambda^k),
$$

followed by the multiplier update

$$
\lambda^{k+1}
=
\lambda^k
+
\rho_k c(x^{k+1}).
$$

In pseudocode:

```text
Given λ⁰ and ρ₀ > 0

for k = 0, 1, 2, ...
    approximately solve
        x^{k+1} ≈ argmin_x L_{ρ_k}(x, λ^k)

    update multiplier
        λ^{k+1} = λ^k + ρ_k c(x^{k+1})

    optionally update ρ_k
end
