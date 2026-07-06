---
layout: note
title: "A Note on Fisher Markets"
permalink: /notes/econcs/fisher-market/
math: true
description: Fisher market equilibrium, Eisenberg–Gale convex program, and links to optimization duality.
---

A **Fisher market** is a divisible-goods exchange model with $n$ buyers and $m$ goods. Each buyer $i$ has budget $e_i > 0$ and utility $u_i(x_i)$ over consumption bundle $x_i \in \mathbb{R}_+^m$. Each good $j$ is supplied in amount $s_j > 0$. A central question in EconCS is to define equilibrium prices and allocations, and to compute them via convex optimization.

---

## 1. Fisher economy

There are $n$ buyers and $m$ goods. Buyer $i$ has budget $e_i > 0$ and utility

$$
u_i(x_i) = u_i(x_{i1}, \ldots, x_{im}),
\qquad x_i \in \mathbb{R}_+^m.
$$

Good $j$ has supply $s_j > 0$. A **Fisher equilibrium** consists of prices $p \in \mathbb{R}_{++}^m$ and allocations $x_{ij} \ge 0$ such that:

**(i) Market clearing:**

$$
\sum_{i=1}^n x_{ij} = s_j, \qquad j = 1,\ldots,m.
$$

**(ii) Budget feasibility:**

$$
\sum_{j=1}^m p_j x_{ij} \le e_i, \qquad i = 1,\ldots,n,
$$

with equality if $u_i$ is strictly increasing in each consumed good.

**(iii) Utility maximization:** Given prices $p$, each buyer $i$ chooses $x_i$ to maximize $u_i(x_i)$ subject to the budget constraint.

For **separable** utilities $u_i(x_i) = \sum_j u_{ij}(x_{ij})$, equilibrium demands are obtained good-by-good from marginal utility conditions.

---

## 2. First-order conditions

Suppose $u_i$ is differentiable and strictly concave. At an interior allocation, buyer $i$ maximizes

$$
\max_{x_i \ge 0} \; u_i(x_i)
\quad \text{s.t.} \quad p^\top x_i \le e_i.
$$

Lagrangian stationarity gives, for each good $j$ with $x_{ij} > 0$,

$$
\frac{\partial u_i}{\partial x_{ij}}(x_i) = \lambda_i p_j,
$$

where $\lambda_i \ge 0$ is the budget multiplier. Hence **marginal utility is proportional to price** across goods consumed in positive amount:

$$
\frac{\partial u_i / \partial x_{ij}}{\partial u_i / \partial x_{ik}}
= \frac{p_j}{p_k}
\quad \text{whenever } x_{ij}, x_{ik} > 0.
$$

With equal budgets and identical homothetic preferences, equilibrium allocations are **proportional** to budgets; with heterogeneous utilities, prices clear the market.

---

## 3. Special utility structures

**Linear (perfect substitutes).** If $u_{ij}(x_{ij}) = a_{ij} x_{ij}$ with $a_{ij} > 0$, buyer $i$ spends only on goods with maximal $a_{ij}/p_j$. Equilibrium reduces to a linear program / weighted matching structure.

**Leontief (perfect complements).** If $u_i(x_i) = \min_j x_{ij}/\alpha_{ij}$, buyers consume in fixed proportions; prices adjust so all buyers reach the same bottleneck good.

**CES.** If

$$
u_{ij}(x_{ij}) = x_{ij}^{\rho}
\quad \text{or} \quad
u_i(x_i) = \left(\sum_j \alpha_{ij} x_{ij}^{\rho}\right)^{1/\rho},
\qquad \rho < 1,
$$

demand has a closed form in prices and budgets; Fisher equilibrium connects to Eisenberg–Gale below.

---

## 4. Eisenberg–Gale program

For continuous, concave, homogeneous utilities $u_i$, Fisher equilibrium allocations solve the **Eisenberg–Gale** convex program:

$$
\max_{x \ge 0} \;
\sum_{i=1}^n e_i \log u_i(x_i)
\quad \text{s.t.} \quad
\sum_{i=1}^n x_{ij} \le s_j, \; j = 1,\ldots,m.
$$

The objective is concave (log of concave homogeneous functions). Let $\mu \ge 0$ be multipliers for supply constraints. The Lagrangian is

$$
\mathcal{L}(x,\mu)
=
\sum_{i=1}^n e_i \log u_i(x_i)
+
\sum_{j=1}^m \mu_j \left(s_j - \sum_i x_{ij}\right).
$$

Stationarity in $x_{ij}$ links $\mu_j$ to marginal utilities; complementary slackness gives market clearing at optimum. The dual variables $\mu_j$ are (up to normalization) **equilibrium prices** $p_j$.

This is a canonical bridge between market equilibrium and [Lagrangian duality](/notes/optimization/basics/lagrangian-duality/): Fisher equilibrium prices are dual optima of a convex program.

---

## 5. Proportional allocations and dynamics (preview)

A **proportional allocation** assigns each buyer $i$ a fraction $e_i / \sum_k e_k$ of each good (or of utility). In special Fisher instances, equilibrium allocations coincide with proportional splits. **Proportional response (PR)** dynamics update allocations in response to prices or utilities and converge to equilibrium in several Fisher and Fisher-like markets; a dedicated note on PR and **tatonnement** is planned in this column.

---

## References

1. M. Eisenberg and D. Gale, "Consensus of Subjective Probabilities: The Pari-Mutuel Method," *Annals of Mathematical Statistics*, 1959 — Eisenberg–Gale formulation.
2. N. R. Devanur, C. H. Papadimitriou, A. Saberi, and V. V. Vazirani, "Market Equilibrium via a Primal–Dual-Type Algorithm," *Theoretical Computer Science*, 2008.
3. B. Codenotti, S. Pemmaraju, and K. Varadarajan, "On the Polynomial Time Computation of Equilibria for Certain Exchange Economies," *SODA* 2005.
4. A. Rubinstein, *Lecture Notes in Microeconomic Theory*, Princeton University Press — Fisher markets and welfare.
5. See also the [EconCS roadmap](/notes/econcs/).
