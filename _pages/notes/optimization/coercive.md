---
layout: note
title: "A Note on Coerciveness"
permalink: /notes/optimization/coercive/
math: true
description: Coercivity.
---


In mathematical optimization, establishing whether an objective function actually achieves its minimum is a foundational step before deploying any descent algorithm. The concept of **coerciveness** provides the rigorous framework to answer this by analyzing the **function's behavior at infinity**.

---

### 1. Classical Definition of Coerciveness

Let $\mathbb{E}$ denote a finite-dimensional Euclidean space equipped with the Euclidean norm $\|\cdot\|$.

> **Definition 2.13 (coerciveness).** A proper function $f : \mathbb{E} \to (-\infty, +\infty]$ is called **coercive** if
> $$\lim_{\|x\| \to +\infty} f(x) = +\infty.$$

In words: $f$ must grow without bound along every sequence whose norm diverges. This is the notion most often assumed—implicitly or explicitly—when proving that a descent method has bounded iterates or that a minimizer exists.

#### Existence of Minimizers on Closed Sets

A basic but indispensable consequence of coercivity is that well-posedness is inherited on any closed feasible set that intersects the domain.

> **Theorem.** Let $f : \mathbb{E} \to (-\infty, +\infty]$ be a **closed** coercive function, and let $C \subseteq \mathbb{E}$ be closed with $C \cap \mathrm{dom}\, f \neq \emptyset$. Then the constrained problem
> $$\min_{x \in C} f(x)$$
> admits at least one minimizer.

*Proof.* Fix $x_0 \in C \cap \mathrm{dom}\, f$ and set $\alpha := f(x_0)$. For the sublevel set
$$S_\alpha(f) := \{ x \in \mathbb{E} \mid f(x) \le \alpha \},$$
coercivity gives boundedness: a sequence in $S_\alpha(f)$ with $\|x_k\| \to \infty$ would contradict $\lim_{\|x\| \to \infty} f(x) = +\infty$.

Let $F := C \cap S_\alpha(f)$. Then $F \neq \emptyset$, $F$ is closed and bounded, hence compact. Since $f$ is closed, Weierstrass yields $x^\star \in \arg\min_{F} f$. If $x \in C$ and $f(x) > \alpha$, then $f(x) > f(x_0) \ge f(x^\star)$, so $x^\star \in \arg\min_{C} f$. $\square$

> **Remark.** In the convex setting below, coercivity in Beck's sense coincides with **0-coercivity** in the Hiriart-Urruty–Lemaréchal terminology. The asymptotic function then supplies a directional certificate that is often easier to verify than the raw limit $\lim_{\|x\| \to +\infty} f(x)$.

---

### 2. The Asymptotic Function (Slope at Infinity)

To formalize the behavior of a convex function $f \in \text{Conv } \mathbb{R}^n$ at infinity, we rely on its **asymptotic function**, denoted by $f_{\infty}'$. This function measures the limiting maximal slope of $f$ along any specific direction $d$. 

$$\begin{equation}
f_{\infty}'(d) := \lim_{t \to +\infty} \frac{f(x_0 + td) - f(x_0)}{t}
\end{equation}$$

#### Key Theorem (Independence of Base Point)
> **Theorem (Hiriart-Urruty & Lemaréchal):** Let $f: \mathbb{R}^n \to (-\infty, +\infty]$ be a closed convex function. The limit in (1) exists for every $d \in \mathbb{R}^n$ (allowing $+\infty$ or $-\infty$). Furthermore, this limit is independent of the choice of $x_0 \in \text{dom } f$.

The asymptotic function $f_{\infty}'$ is itself a closed convex function, and it is positively homogeneous of degree 1 (i.e., $f_{\infty}'(\lambda d) = \lambda f_{\infty}'(d)$ for $\lambda > 0$). It dictates whether a function "escapes" to infinity or successfully bounds its sublevel sets.

---

### 3. 0-Coercive Functions

A function is **0-coercive** if it strictly increases toward $+\infty$ as one moves infinitely far in any direction. Formally, $f \in \text{Conv } \mathbb{R}^n$ is 0-coercive if:

$$\begin{equation}
\lim_{\|x\| \to +\infty} f(x) = +\infty
\end{equation}$$

The property provides a highly useful characterization of a function's sublevel sets, denoted as $S_r(f) = \{x \in \mathbb{R}^n \mid f(x) \le r\}$.

#### Theorem (Characterization of 0-Coercivity)
> For a closed convex function $f: \mathbb{R}^n \to (-\infty, +\infty]$, the following conditions are entirely equivalent:
> 1. There exists some $r \in \mathbb{R}$ for which the sublevel set $S_r(f)$ is nonempty and compact.
> 2. All sublevel sets $S_r(f)$ (for $r \in \mathbb{R}$) are compact.
> 3. The asymptotic function is strictly positive in all nonzero directions:
>    $$f_{\infty}'(d) > 0 \quad \forall d \neq 0$$

#### Fundamental Application
If a closed convex function $f$ is 0-coercive, its minimizer set $\arg\min_{x \in \mathbb{R}^n} f(x)$ is a **nonempty compact set**. Thus, a minimum is guaranteed to exist. (This recovers Section 1 with $C = \mathbb{R}^n$.)

In a one-dimensional space ($\mathbb{R}$), an equivalent condition for 0-coercivity is simply that the slopes in both directions are strictly positive:
$$f_{\infty}'(1) > 0 \quad \text{and} \quad f_{\infty}'(-1) > 0$$

---

### 4. 1-Coercive (Strongly Coercive) Functions

A stricter condition is **1-coercivity** (often referred to simply as *strongly coercive* in some modern optimization contexts). A function $f$ is 1-coercive if it grows at infinity faster than any affine function.

#### Theorem (Characterization of 1-Coercivity)
> For a closed convex function $f$, the following conditions are equivalent:
> 1. The asymptotic function explodes in every nonzero direction:
>    $$f_{\infty}'(d) = +\infty \quad \forall d \neq 0$$
> 2. The growth rate outpaces the norm:
>    $$\lim_{\|x\| \to +\infty} \frac{f(x)}{\|x\|} = +\infty$$

For univariate functions on $\mathbb{R}$, 1-coercivity translates to:
$$f_{\infty}'(1) = +\infty \quad \text{and} \quad f_{\infty}'(-1) = +\infty$$

---

### 5. Interactive Visualization

For the test function

$$f(x) = ax^2 + b|x| + cx,$$

the cases are:

1. $a > 0$: **1-coercive**.
2. $a = 0$ and $b > |c|$: **0-coercive**, with $f_{\infty}^{\prime}(1) = b+c$ and $f_{\infty}^{\prime}(-1) = b-c$ both positive.
3. Otherwise: **non-coercive**.

<div id="coercivity-app" style="max-width: 650px; margin: 30px auto; padding: 20px; border: 1px solid #e1e4e8; border-radius: 8px; background-color: #f6f8fa; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;">
    <h4 style="margin-top: 0; margin-bottom: 15px; color: #24292e; text-align: center;">Interactive Coercivity Explorer</h4>
    
    <div style="display: flex; flex-direction: column; gap: 12px; margin-bottom: 20px; background: #fff; padding: 15px; border-radius: 6px; border: 1px solid #d1d5da;">
        <div style="display: flex; align-items: center; justify-content: space-between;">
            <label style="width: 140px; font-weight: 600; color: #24292e;">Quadratic (a): <span id="val-a" style="font-weight: normal; color: #0366d6;">1.0</span></label>
            <input type="range" id="slider-a" min="-0.5" max="2.0" step="0.1" value="1.0" style="flex-grow: 1; margin-left: 10px;">
        </div>
        <div style="display: flex; align-items: center; justify-content: space-between;">
            <label style="width: 140px; font-weight: 600; color: #24292e;">Absolute (b): <span id="val-b" style="font-weight: normal; color: #0366d6;">0.0</span></label>
            <input type="range" id="slider-b" min="0.0" max="5.0" step="0.2" value="0.0" style="flex-grow: 1; margin-left: 10px;">
        </div>
        <div style="display: flex; align-items: center; justify-content: space-between;">
            <label style="width: 140px; font-weight: 600; color: #24292e;">Linear (c): <span id="val-c" style="font-weight: normal; color: #0366d6;">0.0</span></label>
            <input type="range" id="slider-c" min="-4.0" max="4.0" step="0.2" value="0.0" style="flex-grow: 1; margin-left: 10px;">
        </div>
    </div>

    <div style="text-align: center; margin-bottom: 15px;">
        <span id="badge" style="padding: 6px 16px; font-weight: bold; border-radius: 20px; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;"></span>
    </div>

    <canvas id="plotCanvas" width="610" height="320" style="background: white; border: 1px solid #d1d5da; border-radius: 6px; display: block; width: 100%; height: auto;"></canvas>
</div>

<script src="{{ '/assets/js/coercivity-explorer.js' | relative_url }}" defer></script>

---

### 6. Summary Matrix for Quadratic Forms

To tie this back to multi-dimensional settings, consider the classical quadratic form often found in machine learning and optimization algorithms:

$$f(x) = \frac{1}{2}\langle Qx, x\rangle + \langle b, x\rangle + c$$

where $Q \in \mathbb{S}^n_+$ is a symmetric positive semi-definite matrix. Evaluating the asymptotic function yields:

$$f_{\infty}'(d) = \begin{cases} 
\langle b, d\rangle & \text{if } d \in \text{Ker } Q \\
+\infty & \text{otherwise}
\end{cases}$$

This structure forces an interesting collapse of the definitions: for quadratic forms, $f$ is 0-coercive if and only if it is 1-coercive, which occurs if and only if $Q \succ 0$ (strictly positive definite).

### References
* Beck, A. (2017). *First-Order Methods in Optimization*. SIAM. (Definition 2.13)
* Hiriart-Urruty, J.-B., Lemaréchal, C. (1993). *Convex Analysis and Minimization Algorithms I: Fundamentals*. Springer-Verlag.
