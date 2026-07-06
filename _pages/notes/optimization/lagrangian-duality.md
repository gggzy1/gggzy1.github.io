---
layout: note
title: "A Note on Lagrangian Duality"
permalink: /notes/optimization/lagrangian-duality/
math: true
description: Lagrangian duality, weak and strong duality, and Slater-type constraint qualifications.
---

Consider the **convex optimization problem**

$$
\begin{aligned}
\min_{x} \quad & f(x) \\
\text{s.t.} \quad & f_i(x) \le 0, \quad i = 1,\ldots,m, \\
& h_j(x) = 0, \quad j = 1,\ldots,p,
\end{aligned}
$$

where $f, f_1,\ldots,f_m$ are convex functions and $h_1,\ldots,h_p$ are affine. Write the inequality constraints in vector form as $f(x) \le 0$ and the equalities as $h(x)=0$.

The **Lagrangian** is

$$
\mathcal{L}(x,\lambda,\nu)
=
f(x) + \sum_{i=1}^m \lambda_i f_i(x) + \sum_{j=1}^p \nu_j h_j(x)
=
f(x) + \lambda^\top f(x) + \nu^\top h(x),
$$

with multipliers $\lambda \in \mathbb{R}^m$, $\nu \in \mathbb{R}^p$. The dual variables for inequalities are constrained by $\lambda \ge 0$.

---

## 1. Dual function and dual problem

For fixed $(\lambda,\nu)$, minimize $\mathcal{L}$ over $x$. The **Lagrange dual function** is

$$
g(\lambda,\nu)
=
\inf_{x \in \mathcal{D}} \mathcal{L}(x,\lambda,\nu),
$$

where $\mathcal{D} = \bigcap_i \mathrm{dom}\, f_i \cap \mathrm{dom}\, f \cap \{x : h(x)=0\}$ (or simply $\mathrm{dom}\, f$ when $h$ is affine and included in the domain convention). The function $g$ is always **concave**, even when the primal problem is not convex.

The **dual problem** is

$$
\begin{aligned}
\max_{\lambda,\nu} \quad & g(\lambda,\nu) \\
\text{s.t.} \quad & \lambda \ge 0.
\end{aligned}
$$

Let $p^\star$ and $d^\star$ denote optimal values of the primal and dual problems (with the usual convention $p^\star = +\infty$ if infeasible, $d^\star = -\infty$ if dual unbounded below).

---

## 2. Weak duality

> **Weak duality.** For any feasible primal point $x$ and any dual-feasible $(\lambda,\nu)$ with $\lambda \ge 0$,
> $$
> g(\lambda,\nu) \le f(x).
> $$
> Consequently, $d^\star \le p^\star$.

*Proof sketch.* Feasibility gives $f_i(x)\le 0$ and $h(x)=0$, hence $\lambda^\top f(x) \le 0$ and $\nu^\top h(x)=0$. By definition of $g$,
$$
g(\lambda,\nu) \le \mathcal{L}(x,\lambda,\nu) = f(x) + \lambda^\top f(x) + \nu^\top h(x) \le f(x).
$$
$\square$

Weak duality is unconditional. **Strong duality** ($p^\star = d^\star$) requires extra structure.

---

## 3. Slater's condition (strict feasibility)

Slater's condition is the standard **constraint qualification** guaranteeing strong duality in convex problems.

> **Slater's condition.** There exists a point $\tilde{x} \in \mathrm{relint}(\mathrm{dom}\, f)$ such that
> $$
> f_i(\tilde{x}) < 0, \quad i = 1,\ldots,m,
\qquad
> h_j(\tilde{x}) = 0, \quad j = 1,\ldots,p.
> $$

> **Theorem (Slater).** If the primal problem is convex and Slater's condition holds, then strong duality holds: $p^\star = d^\star$. Moreover, if $p^\star$ is finite, the dual optimum is attained at some $(\lambda^\star,\nu^\star)$.

In words: a strictly interior feasible point (relative to $\mathrm{dom}\, f$) with **strict** inequality satisfaction implies no duality gap and existence of dual optimizers. This is the form used in Boyd & Vandenberghe and Bertsekas for convex nonlinear inequalities.

---

## 4. Weakened Slater (affine inequalities may be tight)

When some inequality constraints are **affine**, the strict-inequality requirement can be relaxed on those components only.

Partition the inequalities into non-affine and affine parts:

$$
f_i(x) \le 0,\quad i \in \mathcal{I}_{\mathrm{nl}},
\qquad
a_k^\top x + b_k \le 0,\quad k \in \mathcal{I}_{\mathrm{aff}}.
$$

> **Weakened Slater condition.** There exists $\tilde{x} \in \mathrm{relint}(\mathrm{dom}\, f)$ such that
> $$
> f_i(\tilde{x}) < 0 \quad \forall i \in \mathcal{I}_{\mathrm{nl}},
\qquad
> a_k^\top \tilde{x} + b_k \le 0 \quad \forall k \in \mathcal{I}_{\mathrm{aff}},
\qquad
> h_j(\tilde{x}) = 0 \quad \forall j.
> $$

Affine inequalities need only be satisfied (including **tight** constraints $a_k^\top \tilde{x} + b_k = 0$); non-affine inequalities still require strict slack $f_i(\tilde{x}) < 0$.

> **Theorem.** Under convexity, weakened Slater implies strong duality and attainment of a dual optimum (when $p^\star$ is finite), exactly as in the classical Slater theorem.

**Example.** For $\min f(x)$ s.t. $g(x) \le 0$ and $Cx \le d$ with convex $g$, it suffices to find $\tilde{x}$ with $g(\tilde{x}) < 0$ and $C\tilde{x} \le d$; rows of $Cx \le d$ may hold with equality. If **all** inequalities are affine and the feasible set has nonempty relative interior, Slater reduces to mere feasibility—no strict slack is required anywhere.

---

## 5. Complementary slackness and KKT

When strong duality holds and both primal and dual optima are attained, optimality is characterized by the **Karush–Kuhn–Tucker (KKT)** conditions (necessary and sufficient for convex problems with a suitable constraint qualification):

$$
\begin{aligned}
\nabla f(x^\star) + J_f(x^\star)^\top \lambda^\star + J_h^\top \nu^\star &= 0, \\
f(x^\star) &\le 0, \quad h(x^\star) = 0, \quad \lambda^\star \ge 0, \\
\lambda_i^\star f_i(x^\star) &= 0, \quad i = 1,\ldots,m.
\end{aligned}
$$

The last line is **complementary slackness**: a positive multiplier forces the corresponding inequality active at optimum.

---

## References

1. S. Boyd and L. Vandenberghe, *Convex Optimization*, Cambridge University Press, 2004, Ch. 5 (Lagrange duality, Slater's condition, strong duality).
2. D. P. Bertsekas, *Convex Optimization Theory*, Athena Scientific, 2009, Ch. 5 (constraint qualifications and duality).
3. D. P. Bertsekas, A. Nedić, and A. E. Ozdaglar, *Convex Analysis and Optimization*, Athena Scientific, 2003, §5.4–5.5.
4. R. T. Rockafellar, *Convex Analysis*, Princeton University Press, 1970, §28–30 (conjugate functions and duality).
