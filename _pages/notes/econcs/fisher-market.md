---
layout: note
title: "A Note on Fisher Markets"
permalink: /notes/econcs/fisher-market/
math: true
description: Fisher market equilibrium and the Eisenberg–Gale convex program under standard assumptions.
---

A **Fisher market** has divisible goods, buyers with fixed budgets, and a fixed supply of each good. A central question in economics and computation is how to define an equilibrium and compute it through optimization.

## 1. Market model and equilibrium

There are $n$ buyers and $m$ goods. Buyer $i$ has budget $e_i > 0$ and utility $u_i(x_i)$ for bundle $x_i \in \mathbb{R}_+^m$. Good $j$ has supply $s_j > 0$. At prices $p \in \mathbb{R}_+^m$, buyer $i$ chooses a utility-maximizing affordable bundle:

$$
\max_{x_i \ge 0} u_i(x_i)
\quad \text{subject to} \quad p^\top x_i \le e_i.
$$

An equilibrium consists of prices and buyer allocations that satisfy this demand condition and market feasibility. With free disposal,

$$
\sum_{i=1}^n x_{ij} \le s_j,
\qquad
p_j\left(s_j - \sum_{i=1}^n x_{ij}\right) = 0
\quad (j=1,\ldots,m).
$$

Thus a good with a positive price is fully allocated. A buyer spends the full budget when preferences are locally nonsatiated and the budget set is well-defined; without such assumptions, budget exhaustion should not be presumed.

If utilities are separable across goods, the objective separates by coordinate, but the budget constraint still couples the buyer's choices. At an interior optimum with differentiable utility, the first-order condition is

$$
\nabla u_i(x_i) = \lambda_i p,
$$

where $\lambda_i \ge 0$ is the multiplier on the budget constraint. At boundary allocations, the corresponding coordinate-wise KKT inequalities replace equality.

## 2. Common utility classes

**Linear utilities.** If $u_i(x_i) = \sum_j a_{ij}x_{ij}$ with $a_{ij} > 0$, buyer $i$ spends only on goods maximizing the bang-per-buck ratio $a_{ij}/p_j$. When several goods tie, an optimal bundle may divide spending among them.

**Leontief utilities.** If $u_i(x_i) = \min_j x_{ij}/\alpha_{ij}$ for $\alpha_{ij} > 0$, a buyer's utility-maximizing bundles use goods in fixed proportions. Equilibrium prices and supplies determine each buyer's attainable scale; buyers need not share a common bottleneck good.

**CES utilities.** Constant-elasticity-of-substitution utilities form a family of concave, homogeneous utilities for standard parameter ranges. With positive prices, their demand has a closed form under the usual parameterization. The Cobb–Douglas form is obtained as a limiting case.

## 3. Eisenberg–Gale convex program

For continuous, concave, nonnegative utilities that are homogeneous of degree one, the Eisenberg–Gale program characterizes Fisher market equilibrium under the usual feasibility conditions. In particular, assume there is a feasible allocation giving every buyer positive utility, so the logarithms below are finite:

$$
\begin{aligned}
\max_{x \ge 0} \quad & \sum_{i=1}^n e_i \log u_i(x_i) \\
\text{subject to} \quad & \sum_{i=1}^n x_{ij} \le s_j, \quad j=1,\ldots,m.
\end{aligned}
$$

The objective is concave: $\log$ is increasing and concave on the positive reals, and each $u_i$ is concave. Let $p_j \ge 0$ be the multiplier for good $j$'s supply constraint. The KKT conditions connect these multipliers to buyers' optimal demands; complementary slackness says that any good left unsold has zero price. Under the stated market assumptions, an optimal allocation together with these dual prices forms a competitive equilibrium.

This is a canonical link between market equilibrium and [Lagrangian duality](/notes/optimization/basics/lagrangian-duality/). The formulation also clarifies why its assumptions matter: the equilibrium interpretation relies on concavity, degree-one homogeneity, feasibility, and the market's price and disposal conditions.

## References

1. E. Eisenberg and D. Gale, “Consensus of Subjective Probabilities: The Pari-Mutuel Method,” *Annals of Mathematical Statistics*, 1959.
2. E. Eisenberg, “Aggregation of Utility Functions,” *Management Science*, 1961.
3. N. R. Devanur, C. H. Papadimitriou, A. Saberi, and V. V. Vazirani, “Market Equilibrium via a Primal–Dual-Type Algorithm,” *Theoretical Computer Science*, 2008.
