---
layout: note
title: "Why Cones, Not Cylinders?"
title_zh: "为什么优化研究锥，而不是柱体？"
permalink: /notes/optimization/basics/why-cone/
math: true
bilingual: true
default_lang: en
description: A short Q&A on cones, cylinders, and homogeneity in optimization.
description_zh: 关于优化里为什么是锥、而不是柱体，以及齐次性从何而来。
---

<div class="lang-block lang-en" markdown="1">

## A naive question: why don't we study cylinders?

**Q.** Why does optimization talk about cones all the time, but almost never about cylinders?

**A.** Cones show up everywhere in optimization; cylinders almost never do. The core reason is that optimization is about *directions* and *homogeneity*, and cones encode that structure. Cylinders do not. A few layers:

**1. The basic mathematical reason: cones define order.**

Optimization's core job is comparing two points — that needs an **order**. In a vector space this is usually induced by a closed convex cone. In cone programming,

$$
x \succeq_K y \iff x - y \in K.
$$

Here $K$ has to be a **convex cone**. Why a cone?

- **Reflexivity needs the origin:** $x \succeq_K x$ forces $0 \in K$.
- **Homogeneity of the order:** if $x \succeq_K y$, then for every $\alpha > 0$ we need $\alpha x \succeq_K \alpha y$, i.e. $\alpha(x-y) \in K$. So $K$ is closed under positive scaling.
- **Order-preserving addition:** if $x \succeq_K y$ and $u \succeq_K v$, then $x+u \succeq_K y+v$, so $K$ is closed under addition.

These three properties (contains $0$, closed under positive scaling, closed under addition) are exactly the definition of a convex cone.

A cylinder — e.g. a translated ball $C = \{x : \|x-c\| \le r\}$ — **does not contain the origin** and is **not closed under positive scaling**, so it cannot define a space-wide order compatible with the linear structure. If you try to build an order from a cylinder, positive scaling breaks it immediately.

**2. Local vs global minima: cones describe descent directions.**

For optimality at $x^*$, the question is along which directions $d$ the objective decreases. This produces a few standard cones:

- **feasible-direction cone:** rays from $x^*$ into the feasible set;
- **tangent cone:** all rays “tangent” to the feasible set at $x^*$ — a local conical approximation;
- **normal cone:** the polar of the tangent cone; outward “repelling” directions.

Why cones rather than cylinders? Local analysis at $x^*$ is like zooming in infinitely. A smooth boundary looks like its tangent plane/space, and the feasible sector from that point is naturally a **cone** with vertex there. A cylinder carries translation; it cannot describe directional structure attached to a single point.

**3. Behavior of convex sets at infinity: the recession cone.**

Every unbounded closed convex set has a conical shape at infinity — the **recession cone**

$$
C_\infty = \{ d \mid x + \alpha d \in C,\ \forall x \in C,\ \forall \alpha \ge 0 \}.
$$

So $C_\infty$ collects every direction along which you can walk forever inside $C$ without hitting the boundary.

Take the infinite cylinder $C = \{(x,y,z) : x^2+y^2 \le 1\}$. Its recession cone is the $z$-axis line $\{(0,0,z)\}$ — a one-dimensional subspace, already a **degenerate cone**.

To an optimizer, a cylinder is essentially **“a compact base + its recession cone.”** Theory talks about the recession cone (directions you can grow forever while staying feasible), which matters for unboundedness. We do not say “this is a cylinder constraint”; we say “the recession cone of the feasible set contains such-and-such direction,” and stay in the language of cones.

**4. Duality wants cones.**

Duality is central. Lagrange duality becomes formally clean in cone programs (SDP, SOCP, …):

- the nonnegative orthant, the second-order cone, and the PSD cone are all **self-dual** (equal to their dual cones);
- that self-duality makes primal and dual structurally symmetric.

There is no natural “dual of a cylinder.” The dual of a cone is again a cone, and the algebra closes. That is why cones sit at the foundation.

---

**Q.** Why are optimization problems homogeneous?

**A.** Three layers: directions are homogeneous; local linearization makes things homogeneous; duality and convex structure push in the same direction.

**1. Most basic: we care about directions, and directions are homogeneous.**

Given a current point: which way to move, and how far? A direction is a **ray**

$$
d \in \mathbb{R}^n,\qquad \text{all positive multiples }\alpha d,\ \alpha > 0.
$$

One kilometer northeast and ten kilometers northeast are the same direction. That is homogeneity: rays are invariant under positive scaling. So feasible-direction cones, tangent cones, descent sets are cones by definition:

$$
d \in \mathrm{Cone} \implies \alpha d \in \mathrm{Cone},\quad \forall \alpha > 0.
$$

We did not “choose” cones; the objects (sets of directions) are positively homogeneous. Cylinders are not, so they cannot describe directions.

**2. Local linearization turns everything into a homogeneous problem.**

First principle: expand a smooth $f$ (and the constraints) to first order at $x_0$.

- **Descent.** Along $d$,
  $$
  f(x_0 + \alpha d) \approx f(x_0) + \alpha \nabla f(x_0)^\top d.
  $$
  If $\nabla f(x_0)^\top d < 0$, then $f$ decreases for small $\alpha > 0$. The condition depends only on the direction of $d$, not on the size of $\alpha$, and it is homogeneous: if $d$ works, so does $\alpha d$ for all $\alpha > 0$.

- **Local feasible set.** Equalities $h_i(x)=0$ linearize to $\nabla h_i(x_0)^\top d = 0$ (a tangent space). Inequalities $g_i(x)\le 0$ active at the boundary ($g_i(x_0)=0$) linearize to $\nabla g_i(x_0)^\top d \le 0$. All of these conditions are **linear-homogeneous** in $d$.

So local optimality / KKT is homogeneous: it is described by cones built from tangents and gradient halfspaces. Geometrically: $-\nabla f$ must lie in the normal cone to the linearized feasible cone. Solution sets of linear inequalities are always cones.

**3. Convexity and global structure.**

In convex optimization, homogeneity often extends beyond the local picture. If a convex set $X$ is unbounded, the directions of unboundedness form the recession cone $X_\infty$ — the object that answers “can I walk forever this way?” Cone programs make the homogeneous structure explicit:

- **LP:** $Ax = b$, $x \ge 0$. The orthant $\{x : x \ge 0\}$ is a cone. The objective is linear.
- **SDP:** $x_1 A_1 + \cdots + x_n A_n \preceq B$, with $\preceq$ from the PSD cone $S_+^n$. Positive-semidefiniteness is homogeneous: $X \succeq 0$ implies $\alpha X \succeq 0$ for $\alpha > 0$.

Dual cones and polar cones keep clean algebraic symmetry under this homogeneous setup, which is also what interior-point methods lean on.

[Back to Basics](/notes/optimization/basics/) · [All notes](/notes/)

</div>

<div class="lang-block lang-zh" markdown="1">

## 一个 naive 的问题：为什么优化不研究柱体？

**Q.** 为啥优化经常研究锥（cone），却很少提柱体？

**A.** “锥”在优化里无处不在，但很少专门提“柱体”。核心原因在于：**优化问题的结构天然是“方向性”和“齐次性”的，而锥恰好刻画了这种结构，柱体则不然。** 可以从几个层次来理解：

**1. 最根本的数学原因：锥定义了“序”。**

优化的核心是比较两个点的“好坏”，这需要一个**序结构**。在向量空间里，这个序往往由一个闭凸锥来定义。比如在锥规划里，

$$
x \succeq_K y \iff x - y \in K.
$$

这里的 $K$ 必须是一个**凸锥**。为什么是锥？

- **自反性要求零元素：** $x \succeq_K x \implies 0 \in K$。
- **齐次性要求：** 如果 $x \succeq_K y$，那么对任意 $\alpha > 0$，必须有 $\alpha x \succeq_K \alpha y$。这意味着 $\alpha(x-y) \in K$，所以 $K$ 必须对正数乘法封闭。
- **保序加法：** 如果 $x \succeq_K y$ 且 $u \succeq_K v$，则 $x+u \succeq_K y+v$，这要求 $K$ 对加法封闭。

这三个性质（包含 $0$、正数乘封闭、加法封闭）合起来，就是**凸锥**的定义。

柱体（比如一个平移的圆柱 $C = \{x \mid \|x - c\| \le r\}$）**不包含原点**，也**对正数乘法不封闭**，所以无法用来定义这种贯穿整个空间的、与线性结构相容的序。一旦你试图用柱体定义序，正数乘法这个简单操作就能破坏整个序结构。

**2. 局部极小与全局极小：锥刻画了下降方向。**

在最优性条件里，我们考虑一个点 $x^*$ 是否为局部极小点。关键要看从 $x^*$ 出发，沿哪些方向 $d$，函数值会下降。这引出了几个核心的锥：

- **可行方向锥：** 从 $x^*$ 出发，朝向可行域内部的射线方向；
- **切锥：** 在 $x^*$ 点与可行域“相切”的所有射线方向，是对可行域的局部锥状近似；
- **法锥：** 切锥的极锥，由指向可行域外部的“排斥”方向组成。

为什么这里的几何对象都是锥，而不是柱体？因为当你在一个点 $x^*$ **局部**地观察一个集合时，你是在无限放大该点附近。任何光滑（或可微）的边界，在无限放大后看起来都像它的切平面或切空间，而从这个点出发的“可行扇区”就自然表现为一个以该点为顶点的**锥**。柱体有“平移”的属性，无法描述这种附着于一点的局部方向结构。

**3. 凸集在无穷远处的行为：回收锥。**

任何无界的闭凸集，它在无穷远处的“形状”都是一个锥，叫**回收锥**：

$$
C_\infty = \{ d \mid x + \alpha d \in C,\ \forall x \in C,\ \forall \alpha \ge 0 \}.
$$

也就是说，$C_\infty$ 包含了所有你可以在 $C$ 内部“一路走到无穷远”而不会碰到边界的**方向**。

一个无穷长的圆柱 $C = \{(x,y,z) \mid x^2+y^2 \le 1\}$ 是典型的“柱体”。它的回收锥 $C_\infty$ 是什么？是 $z$ 轴方向（上下两个方向）的射线，也就是直线 $\{(0,0,z)\}$。这是一个一维子空间，本身就是一个**退化的锥**。

所以，一个柱体在优化学家眼里，本质上是 **“一个底面（紧致集） + 它的回收锥”**。优化理论直接去研究那个刻画其无穷延伸方向的回收锥，因为它代表了决策变量可以无限增大而不影响可行性的方向，这在无界优化问题的理论分析（如有界性条件）中至关重要。我们不会说“这是一个柱约束”，而是说“这个可行域的回收锥包含某个方向”，从而用锥的语言统一处理。

**4. 对偶理论的要求：锥适合做对偶。**

现代优化的一个核心是对偶理论。Lagrange 对偶在锥规划（如半定规划、二阶锥规划）中形式上很干净：

- 非负象限、二阶锥、半正定矩阵锥，都是**自对偶锥**（等于自己的对偶锥）；
- 这种自对偶性使得原问题和对偶问题在结构上对称。

你无法自然地定义“柱体”的对偶。锥的对偶还是锥，并能形成一个封闭的代数体系。优化理论选择以锥为基石，因为这正是通往对偶理论的自然语言。

---

**Q.** 为什么优化问题是齐次性的？

**A.** 三个递进的层次：**本质上是因为“方向”是齐次的；进而，局部线性化带来了齐次性；最后，对偶性等深层结构也要求齐次性。**

**1. 最根本的——优化关心的是“方向”，而方向天然是齐次的。**

优化的核心任务是：给定一个当前点，判断往哪个方向走、走多远能改善目标函数。“方向”的几何载体是一条**射线**：

$$
d \in \mathbb{R}^n,\qquad \text{考虑所有正数倍 }\alpha d,\ \alpha > 0.
$$

你往东北方向走 1 公里，和走 10 公里，**方向本身没有变**。这就是齐次性：射线在正数乘法下保持不变。所以，一切用来刻画局部最优性的对象——可行方向锥、切锥、下降方向集合——从定义上就是锥：

$$
d \in \mathrm{Cone} \implies \alpha d \in \mathrm{Cone},\quad \forall \alpha > 0.
$$

这不是我们“选择”锥，而是我们研究的对象（方向的集合）天然满足正齐次性。柱体不满足这个性质，所以它无法描述“方向”。

**2. 局部线性化把一切问题变成了齐次问题。**

做优化的第一性原理是：对光滑函数在一点附近做一阶泰勒展开。设目标 $f(x)$ 在 $x_0$ 附近可微，约束也可微。那么：

- **目标下降条件：** 往方向 $d$ 走一小步，
  $$
  f(x_0 + \alpha d) \approx f(x_0) + \alpha \nabla f(x_0)^\top d.
  $$
  若 $\nabla f(x_0)^\top d < 0$，则 $f$ 会下降。注意：这个条件只依赖 $d$ 的方向，不依赖 $\alpha$ 的大小（只要 $\alpha>0$ 足够小）。而且这个条件是**齐次的**：若 $d$ 满足 $\nabla f^\top d < 0$，则 $\alpha d$ 也满足，对所有 $\alpha>0$。

- **可行域局部逼近：** 等式约束 $h_i(x)=0$ 局部线性化为 $\nabla h_i(x_0)^\top d = 0$，这定义了切空间。不等式约束 $g_i(x)\le 0$ 在边界上（$g_i(x_0)=0$）局部线性化为 $\nabla g_i(x_0)^\top d \le 0$。所有这些条件都是关于 $d$ **线性齐次**的。

因此，局部最优性条件（KKT）本身就是齐次的：它们完全由在 $x_0$ 点各种切线和梯度半空间所构成的**锥**来描述。几何含义是：目标函数的负梯度必须落在可行域的线性化锥的法锥里。这一切都是锥，因为它们是线性不等式组的解，线性不等式组的解集永远是锥。

**3. 凸优化和全局结构的齐次性。**

在凸优化中，齐次性不仅局部成立，往往还能延展到全局结构。考虑一个凸集（比如可行域 $X$）。如果 $X$ 无界，那么当点趋于无穷远时，所有可能的“无穷延伸方向”构成一个锥——**回收锥** $X_\infty$。只有这个锥能回答“在这个集合里，我能永远朝某个方向走下去吗？”这种全局可行性问题。在锥规划中，我们更是显式地要求约束的齐次结构：

- **线性规划：** $Ax = b,\ x \ge 0$。非负象限 $\{x \mid x \ge 0\}$ 是一个锥。目标函数是线性的。
- **半定规划：** $x_1 A_1 + \dots + x_n A_n \preceq B$，其中 $\preceq$ 由半正定锥 $S_+^n$ 定义。半正定性是齐次的：若 $X \succeq 0$ 则 $\alpha X \succeq 0$ 对所有 $\alpha>0$。

为什么偏爱这些锥结构？因为对偶锥、极锥这些概念，只有在齐次结构下才能保持干净的代数对称性，这也支撑了内点法等算法。

[返回 Basics](/notes/optimization/basics/) · [全部笔记](/notes/)

</div>
