---
layout: note
title: "为什么优化研究锥，而不是柱体？"
title_en: "Why Optimization Studies Cones, Not Cylinders"
permalink: /notes/optimization/basics/why-cone/
math: true
bilingual: true
default_lang: zh
description: 从序结构、下降方向、回收锥与对偶理论，说明锥为何是优化的自然语言。
description_en: Cones encode order, descent directions, recession, and duality — cylinders do not.
---

<div class="lang-block lang-zh" markdown="1">

一个朴素却值得认真对待的问题是：优化里几乎处处是**锥（cone）**，却很少专门谈论**柱体（cylinder）**。原因并不神秘——优化问题的结构天然是方向性与齐次性的，而锥恰好刻画了这种结构；柱体则不然。

下面分两个问题展开。

## 1. 为什么研究锥，而不是柱体？

> **一句话。** 锥能定义与线性结构相容的序、局部下降方向与对偶；柱体做不到，在优化学家眼里它往往只是「紧底面 + 回收锥」。

### 1.1 最根本：锥定义了「序」

优化的核心是比较两点的好坏，这需要一个**序结构**。在向量空间里，这个序通常由一个闭凸锥给出：在锥规划中，

$$
x \succeq_K y \iff x - y \in K.
$$

这里的 \(K\) 必须是**凸锥**。原因可以直接从序公理读出来：

| 序公理 | 对 \(K\) 的要求 |
| --- | --- |
| 自反性 \(x \succeq_K x\) | \(0 \in K\) |
| 正齐次性：\(x \succeq_K y \Rightarrow \alpha x \succeq_K \alpha y\)（\(\alpha>0\)） | \(K\) 对正数乘法封闭 |
| 保序加法：\(x\succeq_K y\) 且 \(u\succeq_K v\) \(\Rightarrow\) \(x+u\succeq_K y+v\) | \(K\) 对加法封闭 |

这三条合起来，恰是**凸锥**的定义。

柱体——例如平移圆柱 \(C=\{x:\|x-c\|\le r\}\)—既不包含原点，也不对正数乘法封闭，因此无法定义贯穿整个空间、并与线性结构相容的序。一旦试图用柱体定义序，正数缩放就会立刻破坏整个结构。

### 1.2 局部极小：锥刻画下降方向

判断 \(x^\star\) 是否局部极小，关键是：从 \(x^\star\) 出发，沿哪些方向 \(d\) 目标会下降。由此自然出现

- **可行方向锥**：指向可行域内部的射线方向；
- **切锥**：可行域在 \(x^\star\) 的局部锥状近似；
- **法锥**：切锥的极锥，由「向外排斥」的方向组成。

为什么是锥而不是柱体？因为局部观察等价于把该点附近无限放大：光滑边界在极限下像切空间，可行扇区则以该点为顶点张开成**锥**。柱体携带平移信息，无法描述这种附着于一点的局部方向结构。

### 1.3 无穷远处：回收锥

任何无界闭凸集在无穷远处的「形状」都是一个锥，称为**回收锥（recession cone）**：

$$
C_\infty = \{ d \mid x + \alpha d \in C,\ \forall x\in C,\ \forall \alpha\ge 0\}.
$$

它收集了所有可以在 \(C\) 内一路走到无穷远而不碰到边界的**方向**。

以无穷长圆柱 \(C=\{(x,y,z):x^2+y^2\le 1\}\) 为例：其回收锥是 \(z\) 轴方向上的直线 \(\{(0,0,z)\}\)—一个一维子空间，本身就是**退化的锥**。

因此，柱体在优化语言里通常被读作

> **紧致底面 + 回收锥。**

理论分析关心的是那个刻画无穷延伸的回收锥（有界性、强制性、可行性等），而不是单独发明一套「柱约束」的术语。

### 1.4 对偶：锥是自对偶的温床

现代优化的核心支柱之一是对偶。在锥规划（半定规划、二阶锥规划等）中，Lagrange 对偶取得了形式上的统一：

- 非负象限、二阶锥、半正定矩阵锥，都是**自对偶锥**；
- 自对偶性使原问题与对偶问题结构对称，理论和算法都更干净。

「柱体的对偶」没有同样自然的代数对象。锥的对偶仍是锥，并形成一个封闭优美的体系——这正是优化以锥为基石的深层原因。

---

## 2. 为什么优化问题是齐次的？

> **递进答案。** 方向本身齐次；局部线性化把最优性条件变成齐次；凸结构与对偶进一步要求齐次。

### 2.1 第一层：优化关心的是方向

给定当前点，核心问题是：往哪个方向走、走多远能改善目标。「方向」的几何载体是**射线**：

$$
d\in\mathbb{R}^n,\qquad \text{考虑所有正倍数 }\alpha d\ (\alpha>0).
$$

往东北走 1 公里与走 10 公里，方向本身不变——这就是齐次性。于是可行方向锥、切锥、下降方向集从定义上就是锥：

$$
d\in\mathrm{Cone}\ \Longrightarrow\ \alpha d\in\mathrm{Cone},\quad\forall\alpha>0.
$$

不是我们「选择」了锥，而是研究对象（方向的集合）天然正齐次。柱体不满足这一点，因而无法描述方向。

### 2.2 第二层：局部线性化把问题变成齐次问题

对光滑目标 \(f\) 与约束在 \(x_0\) 做一阶展开：

- **下降条件。** \(f(x_0+\alpha d)\approx f(x_0)+\alpha\nabla f(x_0)^\top d\)。若 \(\nabla f(x_0)^\top d<0\)，则充分小的 \(\alpha>0\) 使目标下降。该条件只依赖方向，且对 \(\alpha>0\) 齐次。
- **可行域局部逼近。** 等式 \(h_i(x)=0\) 线性化为 \(\nabla h_i(x_0)^\top d=0\)；边界上的不等式 \(g_i(x)\le 0\) 线性化为 \(\nabla g_i(x_0)^\top d\le 0\)。这些都是关于 \(d\) 的线性齐次条件。

因此 KKT 条件本身是齐次的：它们由切线与梯度半空间所成的**锥**描述。几何上，负梯度必须落在可行域线性化锥的法锥中——线性不等式组的解集永远是锥。

### 2.3 第三层：凸结构与对偶中的齐次性

在凸优化中，齐次性常从局部延展到全局。凸集 \(X\) 若无界，其无穷延伸方向构成回收锥 \(X_\infty\)；它回答的是「能否永远朝某方向走下去」这类全局问题。锥规划更显式地依赖齐次结构：

- **线性规划**：\(Ax=b,\ x\ge 0\)，非负象限是锥；
- **半定规划**：\(x_1A_1+\cdots+x_nA_n\preceq B\)，半正定锥 \(S_+^n\) 在正缩放下封闭。

偏爱这些结构，是因为对偶锥、极锥等概念只在齐次设定下保持代数对称，并支撑内点法等通用算法。

---

## 小结

| 视角 | 锥能做什么 | 柱体缺什么 |
| --- | --- | --- |
| 序 | 定义 \(\succeq_K\) | 不含原点、不正齐次 |
| 局部最优性 | 可行/切/法锥 | 无法附着于一点的方向扇区 |
| 无界性 | 回收锥 | 本身可分解为底面 + 回收锥 |
| 对偶 | 自对偶锥与对称对偶 | 无自然对偶对象 |

优化研究锥，不是审美偏好，而是因为**方向、齐次性与对偶**共同指向同一种几何对象。

[返回 Basics](/notes/optimization/basics/) · [全部笔记](/notes/)

</div>

<div class="lang-block lang-en" markdown="1">

A naive but serious question: optimization talks about **cones** everywhere, yet almost never about **cylinders**. The reason is structural. Optimization is fundamentally about *directions* and *homogeneity*; cones encode that structure, cylinders do not.

We unpack this in two parts.

## 1. Why cones, not cylinders?

> **In one line.** Cones define order compatible with linear structure, local descent geometry, and duality. Cylinders do not — to an optimizer they are usually just “a compact base plus a recession cone.”

### 1.1 Fundamentally: cones define order

Optimization compares points, which requires an **order**. In a vector space this order is typically induced by a closed convex cone. In cone programming,

$$
x \succeq_K y \iff x - y \in K.
$$

The set \(K\) must be a **convex cone**, as the order axioms force:

| Order axiom | Requirement on \(K\) |
| --- | --- |
| Reflexivity \(x \succeq_K x\) | \(0 \in K\) |
| Positive homogeneity: \(x \succeq_K y \Rightarrow \alpha x \succeq_K \alpha y\) (\(\alpha>0\)) | closed under positive scaling |
| Order-preserving addition | closed under addition |

These three properties are exactly the definition of a convex cone.

A cylinder — e.g. a translated ball \(C=\{x:\|x-c\|\le r\}\)— neither contains the origin nor is closed under positive scaling, so it cannot define a space-wide order compatible with the linear structure. Positive scaling immediately breaks any order built from a cylinder.

### 1.2 Local minima: cones describe descent directions

To decide whether \(x^\star\) is a local minimizer, ask which directions \(d\) decrease the objective. This produces

- the **cone of feasible directions**;
- the **tangent cone** (local conical approximation of the feasible set);
- the **normal cone** (polar of the tangent cone).

Why cones rather than cylinders? Local analysis zooms in at \(x^\star\): a smooth boundary looks like its tangent space, and the feasible sector opens as a **cone** with vertex at that point. A cylinder carries translational bulk and cannot describe directional structure attached to a single point.

### 1.3 Behavior at infinity: the recession cone

Every unbounded closed convex set has a conical “shape at infinity,” the **recession cone**

$$
C_\infty = \{ d \mid x + \alpha d \in C,\ \forall x\in C,\ \forall \alpha\ge 0\}.
$$

It collects directions along which one can travel forever inside \(C\).

For the infinite cylinder \(C=\{(x,y,z):x^2+y^2\le 1\}\), the recession cone is the \(z\)-axis line \(\{(0,0,z)\}\)—a one-dimensional subspace, already a **degenerate cone**.

So a cylinder is read in optimization language as

> **a compact base + a recession cone.**

Theory tracks the recession cone (boundedness, coercivity, feasibility), rather than inventing a separate vocabulary of “cylinder constraints.”

### 1.4 Duality: cones are the natural dual objects

Duality is a pillar of modern optimization. In cone programs (SDP, SOCP, …), Lagrange duality is formally unified:

- the nonnegative orthant, the second-order cone, and the PSD cone are **self-dual**;
- self-duality makes primal and dual structurally symmetric.

There is no equally natural “dual of a cylinder.” The dual of a cone is again a cone, closing a clean algebraic circle — which is why cones, not cylinders, sit at the foundation.

---

## 2. Why are optimization problems homogeneous?

> **Progressive answer.** Directions are homogeneous; local linearization makes optimality conditions homogeneous; convexity and duality reinforce homogeneity.

### 2.1 Layer one: optimization cares about directions

Given a current point, the question is which way to move and how far. A direction is a **ray**:

$$
d\in\mathbb{R}^n,\qquad \text{all positive multiples }\alpha d\ (\alpha>0).
$$

Walking one kilometer northeast or ten kilometers northeast is the same direction — that is homogeneity. Feasible-direction cones, tangent cones, and descent sets are cones by definition:

$$
d\in\mathrm{Cone}\ \Longrightarrow\ \alpha d\in\mathrm{Cone},\quad\forall\alpha>0.
$$

We did not “choose” cones; the objects we study (sets of directions) are positively homogeneous. Cylinders fail this test and cannot describe directions.

### 2.2 Layer two: local linearization yields homogeneous problems

First-order expand a smooth objective \(f\) and constraints at \(x_0\):

- **Descent.** \(f(x_0+\alpha d)\approx f(x_0)+\alpha\nabla f(x_0)^\top d\). If \(\nabla f(x_0)^\top d<0\), small \(\alpha>0\) decreases \(f\). The condition depends only on direction and is homogeneous in \(\alpha>0\).
- **Local feasible set.** Equalities \(h_i(x)=0\) linearize to \(\nabla h_i(x_0)^\top d=0\); active inequalities \(g_i(x)\le 0\) to \(\nabla g_i(x_0)^\top d\le 0\). All are linear-homogeneous in \(d\).

Hence KKT conditions are homogeneous: they are described by cones built from tangent and gradient halfspaces. Geometrically, \(-\nabla f\) must lie in the normal cone to the linearized feasible cone — and solution sets of linear inequalities are always cones.

### 2.3 Layer three: convexity and duality

In convex optimization, homogeneity often extends from local to global. If a convex set \(X\) is unbounded, its directions of unboundedness form the recession cone \(X_\infty\), answering global feasibility questions. Cone programming makes the structure explicit:

- **LP**: \(Ax=b,\ x\ge 0\) — the orthant is a cone;
- **SDP**: \(x_1A_1+\cdots+x_nA_n\preceq B\) — the PSD cone is closed under positive scaling.

Dual cones and polar cones keep their algebraic symmetry only under homogeneous structure, which in turn supports general-purpose algorithms such as interior-point methods.

---

## Takeaway

| Viewpoint | What cones give | What cylinders lack |
| --- | --- | --- |
| Order | \(\succeq_K\) | no origin, no positive homogeneity |
| Local optimality | feasible / tangent / normal cones | no point-attached directional sector |
| Unboundedness | recession cone | already “base + recession cone” |
| Duality | self-dual cones | no natural dual object |

Optimization studies cones not as aesthetic preference, but because **direction, homogeneity, and duality** point to the same geometric object.

[Back to Basics](/notes/optimization/basics/) · [All notes](/notes/)

</div>
