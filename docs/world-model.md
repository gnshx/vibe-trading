# Temporal World Graph & Entity Primitive Schema

## Graph Schema Definition

The Temporal World Graph models real-world causality using directed, typed nodes and weighted, time-stamped edges.

### Node Schema (`WorldNode`)

```typescript
interface WorldNode {
  id: string;             // Unique node identifier (e.g. 'ev-brazil-drought')
  label: string;          // Human-readable node name
  type: NodeType;         // Node classification category
  geography?: string;     // Geographical jurisdiction (e.g. 'Brazil', 'East Asia')
  impactScore?: number;   // Calculated baseline impact score (0 - 100)
  description?: string;   // Technical operational summary
}

type NodeType = 'event' | 'cause' | 'entity' | 'industry' | 'supply_chain' | 'product' | 'region' | 'market';
```

### Edge Schema (`WorldEdge`)

```typescript
interface WorldEdge {
  source: string;         // Origin node ID
  target: string;         // Destination node ID
  relationship: string;   // Causal link description (e.g. 'reduces_yield_by_24%')
  confidence: number;     // Base confidence percentage (0 - 100)
  timestamp: string;      // Source observation timestamp (YYYY-MM-DD)
  type: EvidenceType;     // Data lineage classification
  evidence: string;       // Empirical proof citation
  weight: number;         // Base edge weight (0.0 - 1.0)
  ageDays: number;        // Evidence age in days for decay calculation
}

type EvidenceType = 'fact' | 'inference' | 'prediction' | 'speculation';
```

---

## Temporal State Representation

The world graph supports three concurrent temporal states:

1. **Past Horizon (`2024-25`):** Historical baseline state containing validated facts and historical outcomes.
2. **Present Horizon (`2026 Live`):** Real-time telemetry state updated continuously via active signal streams.
3. **Future Horizon (`2027 Scenarios`):** Projected state containing multi-horizon Monte Carlo simulations and scenario assumptions.
