---
title: "LLM Agents"
permalink: /notes/llm/agent/
author_profile: false
---

## 1. LLM vs Agent

An LLM is a conditional text generator:

$$
p_\theta(y \mid x),
$$

where \(x\) is the input context and \(y\) is the generated output.

An LLM agent is not just the model. It is a controlled loop around the model. The model chooses actions, receives observations, and updates its context or state.

Informally:

$$
\text{agent} = \text{LLM} + \text{state} + \text{actions} + \text{tools} + \text{control loop}.
$$

## 2. State, Action, Observation

A basic agent system can be described by:

- \(s_t\): state at step \(t\)
- \(h_t\): history or context available to the model
- \(a_t\): action chosen by the agent
- \(o_{t+1}\): observation returned by the environment or tool
- \(T\): transition rule from current state and action to next state

At each step:

$$
a_t = \pi_\theta(h_t),
$$

where \(\pi_\theta\) is the policy induced by the LLM and the prompt.

Then the environment or tool returns:

$$
o_{t+1} = E(a_t),
$$

and the system updates the state:

$$
s_{t+1} = T(s_t, a_t, o_{t+1}).
$$

The important point: the LLM does not usually update its model weights during this loop. What changes is the external state, memory, and context.

## 3. Minimal Agent Loop

```text
initialize state

while not done:
    build context from state, task, memory, and observations
    ask LLM to choose next action
    execute action
    collect observation
    update state
    check stopping condition
```

This loop is the core object. Planning, reflection, memory, and multi-agent systems are extensions of this loop.

## 4. Actions and Tools

An action is something the agent can do. Common action types:

- answer directly
- call a search tool
- run code
- query a database
- read or write a file
- call an external API
- ask another agent to review something

For tool use, the action should have a structured schema. For example:

```json
{
  "tool": "search",
  "query": "ReAct language agents paper"
}
```

A good tool interface should specify:

- allowed inputs
- output format
- possible errors
- cost or latency
- whether the action changes external state

## 5. Context and Memory

The context window is temporary. Memory is external.

Useful distinction:

- **Context**: information currently passed into the LLM.
- **Short-term state**: variables needed for the current task.
- **Long-term memory**: information saved across tasks or episodes.
- **Knowledge base**: external documents or structured facts that can be retrieved.

Memory is useful only if retrieval is useful. Storing everything is not the same as remembering well.

## 6. Planning and Reflection

Planning means choosing a sequence of actions before executing all of them.

Reflection means using feedback from previous actions to modify the next action or the stored memory.

In a simple loop:

```text
plan -> act -> observe -> revise plan
```

Reflection is not automatically reliable. It needs feedback signals, such as errors, tests, scores, human comments, or tool outputs.

## 7. Evaluation

An agent should be evaluated by task performance, not by whether its reasoning text sounds plausible.

Possible evaluation targets:

- final answer correctness
- tool-call validity
- number of steps
- cost
- latency
- robustness to prompt changes
- ability to recover from errors

For scientific or engineering tasks, an agent output should be checked against external criteria whenever possible: tests, data, proofs, simulations, or reproducible calculations.

## 8. Failure Modes

Common failure modes:

- hallucinated facts
- invalid tool calls
- losing track of state
- using irrelevant memory
- over-planning without executing
- confirmation bias in self-review
- prompt sensitivity
- stopping too early or looping too long

These are system-level problems, not only model-level problems.

## 9. Basic References

- Yao et al., [ReAct: Synergizing Reasoning and Acting in Language Models](https://arxiv.org/abs/2210.03629), 2022.
- Schick et al., [Toolformer: Language Models Can Teach Themselves to Use Tools](https://arxiv.org/abs/2302.04761), 2023.
- Shinn et al., [Reflexion: Language Agents with Verbal Reinforcement Learning](https://arxiv.org/abs/2303.11366), 2023.
- Park et al., [Generative Agents: Interactive Simulacra of Human Behavior](https://arxiv.org/abs/2304.03442), 2023.
- Wu et al., [AutoGen: Enabling Next-Gen LLM Applications via Multi-Agent Conversation](https://arxiv.org/abs/2308.08155), 2023.
