# Multi-Hop Causal Propagation & Mathematical Decay Formulation

## Mathematical Traversal Model

The Causal Reasoning Core calculates downstream impact propagation using a Breadth-First Search (BFS) graph traversal augmented with **exponential temporal decay** and **path confidence multiplication**.

### Path Confidence Equation

For any causal path $P = (v_0, e_1, v_1, e_2, v_2, \dots, e_k, v_k)$ of length $k$, the aggregate path confidence $\mathcal{C}(P)$ is defined as:

$$\mathcal{C}(P) = \prod_{i=1}^{k} \left( c_i \cdot e^{-\lambda \cdot \Delta t_i} \right)$$

Where:
* $c_i \in [0.0, 1.0]$ represents the base confidence score of edge $e_i$.
* $\lambda = 0.005 \text{ day}^{-1}$ is the empirical temporal decay coefficient.
* $\Delta t_i \ge 0$ is the age of edge evidence in calendar days.
* $e^{-\lambda \cdot \Delta t_i}$ ensures that stale evidence exponentially decreases path confidence over time.

---

## 7-Level Downstream Impact Algorithm

```
Level 1: Direct Event -> Level 2: Secondary Yields -> Level 3: Supply Chain -> Level 4: Industry Price -> Level 5: Corporate COGS -> Level 6: Product BOM -> Level 7: Future Strategy
```

```javascript
// Algorithmic Implementation (src/services/worldGraphEngine.js)
export function calculate7LevelCausalImpact(rootId, graph) {
  const visited = new Set();
  const queue = [{ nodeId: rootId, currentDepth: 1, path: [rootLabel], confidenceAccum: 1.0 }];

  while (queue.length > 0) {
    const { nodeId, currentDepth, path, confidenceAccum } = queue.shift();
    // Decay accumulated confidence along edge path
    const edgeDecayedConf = (edge.confidence / 100) * Math.exp(-0.005 * edge.ageDays);
    // Push next hop...
  }
}
```
