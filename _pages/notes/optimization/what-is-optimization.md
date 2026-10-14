---
layout: academic-note
title: "What We Talk About When We Talk About Optimization"
permalink: /notes/optimization/what-is-optimization/
math: true
---

## Optimization: What First Comes to Mind

According to the [Cambridge Business English Dictionary](https://dictionary.cambridge.org/us/dictionary/english/optimization), *optimization* is defined as *“the process of making something as good or effective as possible.”*
In real-world decision-making, we are almost always confronted with limited resources and a goal we seek to achieve.
Such situations naturally give rise to optimization problems. Mathematically, these problems are often formulated as:

$$
\begin{aligned}
&\min_{\mathbf{x}}\;/\;\max_{\mathbf{x}}\quad f(\mathbf{x})\\
&\text{s.t.}\quad g(\mathbf{x})\leq\; (\text{or }\geq\text{ or }=)\;b.
\end{aligned}
$$

This formulation reflects the standard way optimization is introduced in textbooks and classrooms.
An optimization problem, in its most basic form, consists of:

1. $\mathbf{x}$: the decision variable,
2. $f(\cdot)$: the objective function,
3. $g(\cdot)$: the constraint(s).

This classical representation serves as a natural starting point for understanding optimization.
However, as we move beyond introductory examples, it quickly becomes clear that optimization encompasses a much richer set of ideas.
This is where the story truly begins.

## Optimized Target: What Is Being Optimized

### Decision Variables

At the most elementary level, optimization seeks a best decision variable.
Depending on the modeling context, decision variables can take various forms, which leads to different classes of optimization problems.
Some common distinctions include:

#### Scalar, Vector, Matrix, and Tensor Variables

These describe the form of the decision variable. We might choose a single quantity, a vector of resource allocations, or a matrix of assignments. Matrices and tensors organize several indices; the number of entries determines the dimension when we view them as vectors.

#### Continuous, Discrete, and Mixed Variables

Continuous variables range over a continuum of values. Discrete variables may represent integer quantities or choices from a finite set. A problem with both types is a mixed-variable problem; mixed-integer programming is an important example.

This distinction tells us what choices are admissible. It does not by itself tell us whether the objective is smooth or convex. Those are properties of the functions and feasible set, discussed separately below.

#### Finite- and Infinite-Dimensional Variables

This distinction often appears when optimization problems are posed over function spaces rather than finite-dimensional vectors. For example, we may seek an entire trajectory or a decision rule, rather than a fixed list of numbers. A finite discretization or parameterization can turn such a problem into a finite-dimensional approximation.

### Feasible Set and Objective Structure

Other distinctions concern the problem surrounding the variable.

#### Bounded and Unbounded Feasible Sets

A bound such as $0\le x_i\le u_i$ restricts the admissible choices. We can collect all constraints in a feasible set $X$ and write $\min_{x\in X}f(x)$.

Boundedness of $X$ and boundedness of the objective value are different properties. An unbounded feasible set can still have a finite, attained minimum, as in $\min_{x\in\mathbb R}x^2$. Conversely, a bounded feasible set need not contain its boundary, so boundedness alone does not guarantee attainment. The [coerciveness note](/notes/optimization/basics/coercive/) discusses one useful condition for existence.

#### Smoothness and Convexity

Smoothness describes how regularly the objective changes and supports derivative-based methods when the required derivatives exist. Lipschitz continuity, differentiability, and a Lipschitz gradient are different assumptions.

Convexity describes another aspect of the problem. In convex minimization, the feasible set is convex and the objective is convex on that set; local minimizers are then global minimizers. Convexity and smoothness need not come together: $\lvert x\rvert$ is convex but not differentiable at zero, while $\sin x$ is smooth but not convex on $\mathbb R$.

### Deterministic and Stochastic Problems

Here the distinction concerns uncertainty in the model. A stochastic optimization problem need not be choosing a “stochastic variable.” We may choose one fixed decision before uncertain data are observed.

For example, if $\xi$ describes uncertain demand or returns, one possible objective is

$$
\min_{x\in X} f(x),
\qquad f(x)=\mathbb E[F(x,\xi)],
$$

assuming the expectation is well defined. For each fixed $x$, $f(x)$ is a deterministic value obtained by averaging its random cost. Other criteria may account for risk or impose probabilistic constraints.

If a decision can be adjusted after an observation, the optimization variable may instead describe a policy: what to do for each available observation. Such a policy can use information already revealed, but cannot depend on future observations. This connects the earlier distinction between vectors and functions to the timing of decisions.

### Putting the Distinctions Together

These classifications describe different aspects of the same problem. An optimization problem can be finite-dimensional, continuous, constrained, convex, and stochastic at the same time. Identifying one of these properties does not settle the others.

Once the formulation is clear, we can ask what information an algorithm can obtain and how much computation it needs. This is the starting point of [Black-Box Optimization](/assets/pdf/notes/black-box-optimization.pdf?v=20261013).

## Reading

- Boyd and Vandenberghe, [*Convex Optimization*](https://web.stanford.edu/~boyd/cvxbook/), for problem structure and convexity.
- [*Lectures on Stochastic Programming: Modeling and Theory*](https://epubs.siam.org/doi/10.1137/1.9781611976595), for uncertainty and the timing of decisions.

[Back to Notes](/notes/)
