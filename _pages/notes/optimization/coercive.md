---
layout: note
title: "A Note on Coerciveness"
permalink: /notes/optimization/coercive/
math: true
description: Coercivity, asymptotic functions, and an interactive 1D explorer.
---

In optimization, one often needs to know whether a minimizer exists before designing algorithms. **Coerciveness** is the standard growth condition at infinity used for this purpose.

---

## 1. Coerciveness (Beck)

Let $\mathbb{E}$ be a finite-dimensional Euclidean space with norm $\|\cdot\|$.

**Definition 2.13 (coerciveness).** A proper function $f : \mathbb{E} \to (-\infty, +\infty]$ is **coercive** if

$$
\lim_{\|x\| \to +\infty} f(x) = +\infty.
$$

**Theorem (attainment under coerciveness).** Let $f : \mathbb{E} \to (-\infty, +\infty]$ be proper and closed, and let $S \subseteq \mathbb{E}$ be nonempty and closed with $S \cap \mathrm{dom}\, f \neq \emptyset$. If $f$ is coercive, then $f$ attains a minimizer over $S$.

*Proof.* Pick $x_0 \in S \cap \mathrm{dom}\, f$ and set $\alpha := f(x_0)$. Define

$$
L := \mathrm{Lev}_{\alpha}(f) := \{ x \in \mathbb{E} \mid f(x) \le \alpha \}.
$$

If $L$ is unbounded, there exists a sequence $(x_k) \subset L$ with $\|x_k\| \to +\infty$, so $f(x_k) \to +\infty$ by coercivity—a contradiction since $f(x_k) \le \alpha$. Hence $L$ is bounded; it is also closed because $f$ is closed.

The set $F := S \cap L$ is nonempty, closed, and bounded, hence compact. By the Weierstrass theorem, $f$ attains a minimizer on $F$, hence on $S$. $\square$

**Remark.** For closed convex $f$, Beck's coerciveness coincides with **0-coercivity** in Hiriart-Urruty–Lemaréchal. The asymptotic function below gives a directional certificate that is often easier to check.

---

## 2. Asymptotic function (Hiriart-Urruty & Lemaréchal)

Let $f : \mathbb{R}^n \to (-\infty, +\infty]$ be a closed convex function. Its **asymptotic function** is

$$
f_{\infty}^{\prime}(d) := \lim_{t \to +\infty} \frac{f(x_0 + td) - f(x_0)}{t},
\qquad d \in \mathbb{R}^n,
$$

where $x_0 \in \mathrm{dom}\, f$ (the limit exists in $(-\infty, +\infty]$ and does not depend on $x_0$).

The function $f_{\infty}^{\prime}$ is closed convex and positively homogeneous:

$$
f_{\infty}^{\prime}(\lambda d) = \lambda f_{\infty}^{\prime}(d), \qquad \lambda > 0.
$$

---

## 3. 0-coercivity

A closed convex $f$ is **0-coercive** if

$$
\lim_{\|x\| \to +\infty} f(x) = +\infty.
$$

Write the sublevel sets as

$$
S_{r}(f) := \{ x \in \mathbb{R}^n \mid f(x) \le r \}.
$$

The following are equivalent:

1. Some sublevel set $S_{r}(f)$ is nonempty and compact.
2. Every sublevel set $S_{r}(f)$ is compact.
3. $f_{\infty}^{\prime}(d) > 0$ for all $d \neq 0$.

Hence a 0-coercive closed convex $f$ has a nonempty compact minimizer set $\arg\min f$. On $\mathbb{R}$, (3) reduces to

$$
f_{\infty}^{\prime}(1) > 0
\quad \text{and} \quad
f_{\infty}^{\prime}(-1) > 0.
$$

---

## 4. 1-coercivity

A closed convex $f$ is **1-coercive** if it grows faster than any affine function at infinity. The following are equivalent:

1. $f_{\infty}^{\prime}(d) = +\infty$ for all $d \neq 0$.
2. $\displaystyle \lim_{\|x\| \to +\infty} \frac{f(x)}{\|x\|} = +\infty$.

On $\mathbb{R}$, this is equivalent to $f_{\infty}^{\prime}(1) = f_{\infty}^{\prime}(-1) = +\infty$.

---

## 5. Interactive visualization

For

$$
f(x) = ax^2 + b|x| + cx,
$$

classify as follows.

**(i)** If $a > 0$, then $f$ is **1-coercive**.

**(ii)** If $a = 0$, $b + c > 0$, and $b - c > 0$, then $f$ is **0-coercive**.

**(iii)** Otherwise, $f$ is **non-coercive**.

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

## 6. Quadratic forms

For

$$
f(x) = \tfrac{1}{2}\langle Qx, x\rangle + \langle b, x\rangle + c,
\qquad Q \in \mathbb{S}^n_+,
$$

one has

$$
f_{\infty}^{\prime}(d) =
\begin{cases}
\langle b, d\rangle & \text{if } d \in \mathrm{Ker}\, Q, \\
+\infty & \text{otherwise}.
\end{cases}
$$

Thus for quadratics, 0-coercivity and 1-coercivity coincide, and both hold iff $Q \succ 0$.

---

## References

1. A. Beck, *First-Order Methods in Optimization*, SIAM, 2017 — Definition 2.13; attainment under coerciveness.
2. J.-B. Hiriart-Urruty and C. Lemaréchal, *Convex Analysis and Minimization Algorithms I*, Springer, 1993 — asymptotic function and $\nu$-coercivity.
