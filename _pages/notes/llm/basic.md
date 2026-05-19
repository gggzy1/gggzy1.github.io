---
title: "LLM Basics"
permalink: /notes/llm/basic/
author_profile: false
---

## 1. What is an LLM 🤖? 

A language model assigns probabilities to token sequences. For a sequence

$$
x_{1:T} = (x_1, x_2, \ldots, x_T),
$$

an autoregressive language model factorizes the joint probability as

$$
p_\theta(x_{1:T}) = \prod_{t=1}^{T} p_\theta(x_t \mid x_{<t}).
$$

At inference time, the model repeatedly predicts a distribution over the next token:

$$
p_\theta(x_{t+1} \mid x_{\leq t}).
$$

Then a decoding rule selects the next token by greedy decoding, sampling, beam search, or another strategy.

One decoding step can be written as

$$
z_t = f_\theta(x_{\leq t}), \qquad
p_t = \operatorname{softmax}(z_t), \qquad
x_{t+1} \sim D(p_t),
$$

where \(z_t\) is the logit vector and \(D\) is a decoding rule such as greedy decoding, top-\(k\), nucleus sampling, or beam search.

| Object | Meaning |
| --- | --- |
| \(x_{\leq t}\) | current context tokens |
| \(f_\theta\) | transformer model |
| \(z_t\) | logits over the vocabulary |
| \(p_t\) | next-token probability distribution |
| \(D\) | decoding rule |

Core concept:

- **Token**: a discrete unit processed by the model. It may be a word, subword, character group, punctuation mark, or whitespace pattern.
- **Vocabulary**: the finite set of possible tokens.
- **Context window**: the maximum token span the model can condition on in one forward pass.
- **Logit**: an unnormalized score before softmax.
- **Embedding**: a vector representation of a token or text object.
- **Decoding**: the rule used to choose tokens from the predicted distribution.

## 2. Tokenization and Embeddings

The model does not directly read natural-language strings. It reads token ids.

| Stage | Object |
| --- | --- |
| Raw text | `"Large language models are useful"` |
| Tokenization | \((x_1,\ldots,x_n)\), token ids from a finite vocabulary |
| Embedding lookup | \(X = [e(x_1),\ldots,e(x_n)]^\top\) |
| Model input | \(X \in \mathbb{R}^{n \times d}\) |

If the input has \(n\) tokens and embedding dimension \(d\), the embedded input can be written as

$$
X \in \mathbb{R}^{n \times d}.
$$

The transformer operates on this matrix. Positional information is added because attention alone is permutation-invariant without position signals.

## 3. Attention

Self-attention is the key operation in transformers. Given hidden states \(X\), the model forms query, key, and value matrices:

$$
Q = XW_Q,\quad K = XW_K,\quad V = XW_V.
$$

The scaled dot-product attention operation is

$$
\operatorname{Attention}(Q,K,V)
= \operatorname{softmax}\left(\frac{QK^\top}{\sqrt{d_k}}\right)V.
$$

Interpretation:

- \(QK^\top\) computes pairwise compatibility scores between tokens.
- The softmax converts scores into attention weights.
- Multiplying by \(V\) forms a weighted average of value vectors.
- The factor \(\sqrt{d_k}\) stabilizes the scale of dot products.

For language generation, causal masking is used: token \(t\) can attend to previous tokens \(1,\ldots,t\), but not future tokens.

| Step | Expression | Shape |
| --- | --- | --- |
| Queries | \(Q = XW_Q\) | \(n \times d_k\) |
| Keys | \(K = XW_K\) | \(n \times d_k\) |
| Values | \(V = XW_V\) | \(n \times d_v\) |
| Scores | \(QK^\top / \sqrt{d_k}\) | \(n \times n\) |
| Weights | \(\operatorname{softmax}(\text{scores} + \text{mask})\) | \(n \times n\) |
| Output | \(\text{weights} \cdot V\) | \(n \times d_v\) |

Multi-head attention runs several attention heads in parallel:

$$
\text{head}_i = \operatorname{Attention}(XW_Q^{(i)}, XW_K^{(i)}, XW_V^{(i)}).
$$

The outputs are concatenated and projected. Different heads can learn different relation patterns, such as local syntax, long-distance dependencies, or formatting regularities.

## 4. Transformer Block

A transformer is built by stacking transformer blocks. One common pre-norm decoder block can be summarized by two residual updates:

$$
u = x + \operatorname{MHA}(\operatorname{LN}(x)),
$$

$$
y = u + \operatorname{MLP}(\operatorname{LN}(u)).
$$

| Symbol | Meaning |
| --- | --- |
| \(x\) | input hidden states |
| \(\operatorname{LN}\) | layer normalization |
| \(\operatorname{MHA}\) | masked multi-head self-attention |
| \(\operatorname{MLP}\) | position-wise feed-forward network |
| \(y\) | block output |

Main components:

- **Masked self-attention**: mixes information across token positions while respecting causal order.
- **MLP / feed-forward network**: applies nonlinear transformations position-wise.
- **Residual connections**: help optimization and information flow.
- **Layer normalization**: stabilizes activations during training.

Most modern text LLMs are decoder-only transformers trained with next-token prediction.

## 5. Training Pipeline

The common post-2020 pipeline has several stages:

| Stage | Input | Output | Main role |
| --- | --- | --- | --- |
| Pretraining | large raw text corpus | base model | learn next-token prediction |
| Post-training | instruction, preference, safety, or domain data | assistant / specialized model | make the base model useful, controllable, and aligned |

In practice, post-training may include supervised fine-tuning, instruction tuning, preference optimization, RLHF, safety tuning, tool-use tuning, domain adaptation, and sometimes distillation.

| Post-training component | Typical data | Purpose |
| --- | --- | --- |
| Supervised fine-tuning (SFT) | prompt-response demonstrations | imitate high-quality target behavior |
| Instruction tuning | instruction-response pairs | improve task following |
| Preference tuning / RLHF | comparisons or rankings of model outputs | make outputs more helpful, harmless, or preferred |
| DPO-style preference optimization | preferred vs rejected response pairs | optimize preferences without an explicit RL reward-model loop |
| Safety / domain tuning | safety data or domain-specific examples | adapt behavior to constraints or a specific use case |

### Pretraining

Pretraining optimizes next-token prediction on large corpora:

$$
\min_\theta - \sum_{t} \log p_\theta(x_t \mid x_{<t}).
$$

This stage teaches broad statistical structure: grammar, facts, styles, code patterns, and many task formats.

### Instruction Tuning

Instruction tuning trains the model on examples of the form \( \text{instruction} + \text{optional context} \mapsto \text{desired response} \).

This makes the model better at following explicit user requests.

### Post-training

Post-training is not one single algorithm. It is the broad phase that turns a pretrained base model into a model that is easier to use as an assistant or as a task-specific system.

For a first pass, it is enough to remember:

$$
\text{base model} \xrightarrow{\text{post-training}} \text{usable assistant / specialized model}.
$$

The exact recipe differs across model families.

### RLHF / Preference Tuning

RLHF means reinforcement learning from human feedback. In the InstructGPT pipeline, humans compare model outputs, a reward model is trained from preferences, and the language model is optimized to produce preferred outputs.

## 6. In-Context Learning 📚

In-context learning means the model adapts to a task from the prompt without changing parameters.

| Prompt component | Example |
| --- | --- |
| Task | Translate English to French. |
| Example 1 | cat \(\mapsto\) chat |
| Example 2 | dog \(\mapsto\) chien |
| Query | house \(\mapsto\) ? |
| Expected output | maison |

No gradient update happens during this interaction. The examples are part of the context \(x\), and the model computes

$$
p_\theta(y \mid x).
$$

Prompting patterns:

- **Zero-shot**: no examples.
- **Few-shot**: a few input-output examples.
- **Structured prompting**: ask for a schema, table, JSON object, or checklist.
- **Decomposition prompting**: split a hard task into simpler subproblems.

## 7. Reasoning

"Reasoning" is an overloaded term. For practical reading, separate three meanings:

1. **Behavioral reasoning**: the model solves tasks that require multi-step dependencies.
2. **Textual reasoning trace**: the model emits intermediate steps in natural language.
3. **Verified reasoning**: the intermediate steps or final answer are checked by an external criterion.

These are not identical. A fluent chain of text is not automatically a valid proof or computation.

Chain-of-thought prompting asks the model to produce intermediate steps before the final answer. The useful operational idea is that extra intermediate tokens can give the model more computation space for multi-step tasks.

| Prompt style | Form | Comment |
| --- | --- | --- |
| Direct | question \(\mapsto\) answer | short, but may fail on multi-step tasks |
| Chain-of-thought style | question \(\mapsto\) intermediate steps \(\mapsto\) answer | gives the model extra intermediate tokens |

For technical work, the safest rule is to treat reasoning traces as hypotheses or scratch work, then use external checks for correctness.

External checks can include algebra, code execution, unit tests, theorem verification, data validation, or human review.

## 8. From LLM to Agent 👩‍🎓

An LLM by itself is mainly a conditional generator:

$$
p_\theta(y \mid x).
$$

An LLM agent wraps the model in an interaction system. A minimal formalization is:

$$
h_t = C(s_t, m_t, o_{\leq t}, g),
$$

$$
a_t \sim \pi_\theta(\cdot \mid h_t),
$$

$$
o_{t+1} = E(a_t),
$$

$$
s_{t+1}, m_{t+1} = U(s_t, m_t, a_t, o_{t+1}).
$$

| Symbol | Meaning |
| --- | --- |
| \(g\) | task goal |
| \(s_t\) | task state |
| \(m_t\) | memory |
| \(o_{\leq t}\) | observations so far |
| \(h_t\) | context passed into the LLM |
| \(a_t\) | action selected by the agent |
| \(E\) | environment or tool executor |
| \(U\) | state and memory update rule |

Minimal loop:

1. Observe the current state.
2. Build a context from task information, memory, and observations.
3. Ask the LLM to choose the next action.
4. Execute the action.
5. Receive feedback or observation.
6. Update state, memory, or context.


## 9. Tool Use 🔨

Tool use means the model can choose structured actions that are executed outside the model.

Examples:

- search the web
- run code
- query a database
- call an API
- read or write files
- ask another model or human for review

The main reason tool use matters: the LLM is weak at exact computation and private/local facts, but tools can provide exact operations and external observations.

A good tool interface should define:

- input schema
- output schema
- error behavior
- side effects
- cost and latency

## 10. Retrieval and Memory

Retrieval-augmented generation (RAG) inserts relevant external documents into the context before generation.

| Step | Operation |
| --- | --- |
| 1 | Use the query to retrieve relevant documents. |
| 2 | Insert retrieved documents into the prompt. |
| 3 | Generate an answer conditioned on both the query and retrieved context. |

Memory is related but not identical:

- **RAG**: retrieve external knowledge for a query.
- **Short-term memory**: state used during the current task.
- **Long-term memory**: saved information across tasks.
- **Working context**: the actual tokens passed into the model right now.

The bottleneck is not storage but retrieving the **right information** at the **right time**.


## References

- Vaswani et al., [Attention Is All You Need](https://arxiv.org/abs/1706.03762), 2017.
- Brown et al., [Language Models are Few-Shot Learners](https://arxiv.org/abs/2005.14165), 2020.
- Ouyang et al., [Training language models to follow instructions with human feedback](https://arxiv.org/abs/2203.02155), 2022.
- Wei et al., [Chain-of-Thought Prompting Elicits Reasoning in Large Language Models](https://arxiv.org/abs/2201.11903), 2022.
- Yao et al., [ReAct: Synergizing Reasoning and Acting in Language Models](https://arxiv.org/abs/2210.03629), 2022.
- Rafailov et al., [Direct Preference Optimization: Your Language Model is Secretly a Reward Model](https://arxiv.org/abs/2305.18290), 2023.
- Touvron et al., [Llama 2: Open Foundation and Fine-Tuned Chat Models](https://arxiv.org/abs/2307.09288), 2023.
