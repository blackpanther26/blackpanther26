---
title: 'Gated Recurrent Units: Architecture, Intuition, and Mathematical Analysis'
date: '2025-12-28'
---

*Co-authored with [@chalhotra](https://github.com/chalhotra)*

## 1. Introduction

Recurrent Neural Networks (RNNs) are designed to model sequential data by maintaining a hidden state that evolves over time. However, vanilla RNNs suffer from the well-known *vanishing gradient problem*, which makes learning long-term dependencies practically impossible.

Gated Recurrent Units (GRUs) are a modern variation of LSTMs, designed to solve this problem with a simpler, more efficient architecture. Think of the GRU as the **"LSTM Lite"**. It retains the LSTM's ability to capture long-term dependencies but removes some of the structural complexity, making it faster to train and easier to implement.

---

## 2. The Core Differences (GRU vs. LSTM)

While LSTMs rely on a complex system of **3 gates** and **2 separate states** (Cell State $c_t$ and Hidden State $h_t$), the GRU streamlines this significantly. It utilizes a gated mechanism not to change the activation functions, but to modify the recurrence itself.

| Feature | LSTM | GRU |
| --- | --- | --- |
| **State** | Two States ($c_t, h_t$) | **Merged State** ($h_t$) |
| **Gates** | Three (Forget, Input, Output) | **Two** (Reset, Update) |

---

## 3. Architecture: Inputs and Gates

At any time step $t$, the GRU takes two inputs:

- **$x_t$**: The new input data for the current time step.
- **$h_{t-1}$**: The hidden state (memory) from the **previous** time step.

The GRU uses two gates, implemented as Sigmoid functions ($\sigma$) outputting values between 0 and 1, to act as "valves" for information flow.

![GRU Architecture](/gru%20archi.png)

### 3.1 The Reset Gate ($r_t$)

### Intuition

The Reset Gate decides how important the **past** is for calculating the **current** candidate information. It allows the network to "temporarily forget" the previous hidden state when computing new features.

- If $r_t \approx 0$: The network treats the current input as if it is the first word in the sequence, ignoring past context. This is useful for resetting context when a topic changes.
- If $r_t \approx 1$: The full history is considered relevant for the new computation.

![The Reset Gate](/reset%20gate.png)

### Mathematical Formulation

Let’s break down the calculation. We take the input $x_t$ and the previous hidden state $h_{t-1}$ to produce a mask.

$$
r_t = \sigma(W_r x_t + U_r h_{t-1})
$$

Where:

- $r_t$: The Reset gate output vector.
- $\sigma$: Sigmoid activation (scales to $[0, 1]$).
- $W_r, U_r$: Learnable weight matrices.

### Deep Dive: A Hands-on Shape Check

Let’s get concrete with the dimensions. Given:

$$
x_t \in \mathbb{R}^{10 \times 1}
$$

$$
h_{t-1} \in \mathbb{R}^{20 \times 1}
$$

$$
W_r \in \mathbb{R}^{20 \times 10}
$$

$$
U_r \in \mathbb{R}^{20 \times 20}
$$

We compute the linear transformations:

$$

W_r x_t \rightarrow (20 \times 10) \times (10 \times 1) = (20 \times 1)

$$

$$

U_r h_{t-1} \rightarrow (20 \times 20) \times (20 \times 1) = (20 \times 1)

$$

Adding them (element-wise) results in a $(20 \times 1)$ vector. Applying the sigmoid function:

$$

r_t = \sigma(\dots) \in \mathbb{R}^{20 \times 1}

$$

This vector $r_t$ is **not memory, it is a mask**. Each entry independently decides how much of the corresponding dimension of $h_{t-1}$ should be visible to the next step.

### 3.2 The Candidate Hidden State ($\tilde{h}_t$)

Now that we’ve decided which parts of the past are relevant, we can compute the new information, or the **candidate hidden state**.

### Calculation

$$

\tilde{h}_t = \tanh(W_h x_t + U_h (r_t \odot h_{t-1}))

$$

**Conceptual Flow:**

1. **Filter:** The reset gate ($r_t$) filters the past via element-wise multiplication: $r_t \odot h_{t-1}.$
2. **Mix:** The filtered past is mixed with the current input ($x_t$) via weights $W_h$ and $U_h$.
3. **Squash:** A $\tanh$ function squashes the result to $[-1, 1]$.

> Important Intuition: This candidate is not automatically written to memory. It is merely a proposal.
> 

### 3.3 The Update Gate ($z_t$)

### Intuition

The Update Gate acts as a "sliding slider" between the past and the present. It combines the roles of the LSTM's *Forget Gate* and *Input Gate* into one. It asks, *"How much of the old memory should I keep, and how much new information should I add?"*

![The Update Gate](/update%20gate.png)

### Mathematical Formulation

$$

z_t = \sigma(W_z x_t + U_z h_{t-1})

$$

---

## 4. The Final Output: Memory Interpolation

The final hidden state $h_t$ is computed via linear interpolation controlled by the Update Gate $z_t$:

$$
h_t = (1 - z_t) \odot h_{t-1} + z_t \odot \tilde{h}_t

$$

**Interpret this dimension-by-dimension:**

- **If $z_t \approx 0$**: The model ignores the new candidate and copies the old hidden state ($h_{t-1}$) forward almost unchanged.
- **If $z_t \approx 1$**: The model ignores the past and overwrites memory with the new candidate ($\tilde{h}_t$).

### Numerical Example

Let us consider a scalar example to visualize the interpolation.
Let:

$$

h_{t-1} = 0.8, \quad \tilde{h}_t = -0.3, \quad z_t = 0.1

$$

(Here, $z_t$ is low, meaning we prefer to keep history).

Then:

$$

h_t = (1 - 0.1)(0.8) + (0.1)(-0.3) = 0.9(0.8) - 0.03 = 0.72 - 0.03 = 0.69
$$

The memory is largely preserved.

---

## 5. Dependency Graph: The Order of Operations

It helps to visualize the GRU not just as a circuit, but as a dependency tree. We can't compute everything at once; there is a strict hierarchy.

**Tree 1: Creating the Proposal (The Candidate Branch)**
Everything starts with the Reset Gate. We cannot form an opinion on the "new" content until we decide what "old" content to ignore.

$$

\text{Inputs } (h_{t-1}, x_t) \xrightarrow{\text{Compute}} r_t \xrightarrow{\text{Mask}} (r_t \odot h_{t-1}) \xrightarrow{\text{Combine with } x_t} \tilde{h}_t
$$

**Tree 2: The Final Decision (The Output Branch)**
Once the candidate is ready, the Update Gate takes over to make the final mix.

$$

\text{Inputs } (h_{t-1}, x_t) \xrightarrow{\text{Compute}} z_t \xrightarrow{\text{Interpolate } \tilde{h}_t \text{ and } h_{t-1}} h_t

$$

---

## 6. Theoretical Analysis

### Boundedness of the Hidden State

A critical property of the GRU is that the hidden state remains bounded, ensuring stability.

**Claim:** If $|h_0| \le 1$, then $|h_t| \le 1 \space \forall \space t$  .

**Proof:**
Recall that the candidate state $\tilde{h}_t$ is the output of a $\tanh$ function, so $|\tilde{h}_t| \le 1$.
The update equation is a convex combination:

$$

\begin{aligned}
|h_t| &= |(1 - z_t) h_{t-1} + z_t \tilde{h}_t| \\
&\le (1 - z_t)|h_{t-1}| + z_t|\tilde{h}_t| \quad \text{(Triangle Inequality and } z_t \in [0,1]) \\
\end{aligned}

$$

Assuming $|h_{t-1}| \le 1$:

$$
|h_t| \le (1 - z_t)(1) + z_t(1) = 1

$$

Thus, by induction, the state remains bounded.

---

## 7. Gradient Flow: Why GRUs Fix Vanishing Gradients

Here’s the quiet genius of this architecture. Notice that in the final equation, $h_{t-1}$ can flow directly into $h_t$ through the term $(1 - z_t)$, **without passing through a nonlinearity like $\tanh$**.

This creates a **near-identity path** (an "information superhighway") for gradients when $z_t$ is close to 0.

### Mathematical Derivation

To truly understand why this works, let's look at the calculus. We will compare the gradient flow of a Vanilla RNN to a GRU using scalar notation for clarity.

### 1. The Problem: Vanilla RNNs

In a scalar vanilla RNN where $h_t = \tanh(w h_{t-1} + u x_t)$, the gradient through time is calculated via the chain rule. The derivative of the step is:

$$

\frac{\partial h_i}{\partial h_{i-1}} = w (1 - \tanh^2(a_i))

$$

Since $0 < 1 - \tanh^2(a_i) \le 1$, the gradient magnitude satisfies:

$$
\left|\frac{\partial h_k}{\partial h_0}\right| = \left|\prod_{i=1}^{k} w (1 - \tanh^2(a_i))\right| \le |w|^k
$$

Even if $|w|=1$, the $\tanh$  derivative term acts as a shrinking factor. The product decays exponentially to zero as $k$ increases. The network forgets.

### 2. The Solution: GRU Gradients

Let’s look at the gradient for the GRU's update equation:

$$

h_t = (1 - z_t) h_{t-1} + z_t \tilde{h}_t

$$

When we differentiate $h_t$  with respect to $h_{t-1}$, we apply the product rule:

$$
\frac{\partial h_t}{\partial h_{t-1}} = \underbrace{(1 - z_t)}_{\text{Key Term}} - h_{t-1} \frac{\partial z_t}{\partial h_{t-1}} + z_t \frac{\partial \tilde{h}_t}{\partial h_{t-1}} + \tilde{h}_t \frac{\partial z_t}{\partial h_{t-1}}
$$

This looks messy, but analyze the first term: $(1 - z_t)$

- It contains **no weights**.
- It contains **no nonlinear derivatives**.
- It is strictly linear.

**The Linear Path:**
If the model learns that a specific memory is important, it sets the update gate $z_t \approx 0$ (meaning "keep the past"). In this case:

$$

(1 - z_t) \approx 1

$$

Across $k$ timesteps, the contribution to the gradient via this path becomes:

$$
\prod_{i=1}^{k} (1 - z_i) \approx 1
$$

**Conclusion:** The gradient doesn’t decay. It flows unchanged through time, allowing the GRU to learn dependencies over long sequences that would be impossible for a vanilla RNN.

---

## Conclusion

GRUs do not solve vanishing gradients by improving nonlinearities. They solve it by **learning when not to apply them**.

The update gate creates a learned identity path through time. If the network *wants* to remember something for 50 time steps, it simply learns to set the update gate to preserve the history, and the gradient flows back effortlessly. This single additive structure is the mathematical core of gated recurrent networks.

---

## Further Reading

Want to dive deeper? Here are the resources that helped me build this understanding:

### Deep Learning
- **[Deep Learning for Computer Vision (UMich)](https://web.eecs.umich.edu/~justincj/teaching/eecs498/)** - Comprehensive course covering CNNs, RNNs, and modern architectures
- **[CampusX Deep Learning](https://www.youtube.com/@campusx-official)** - Practical tutorials with clear explanations

### Machine Learning Fundamentals
- **[StatQuest](https://www.youtube.com/@statquest)** - Breaking down complex ML and statistics concepts
- **[3Blue1Brown](https://www.3blue1brown.com/)** - Beautiful visual explanations of mathematical concepts
- **[Andrew Ng's ML Course](https://www.coursera.org/learn/machine-learning)** - The classic introduction to machine learning