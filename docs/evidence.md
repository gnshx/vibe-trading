# Evidence Provenance Chains & Consensus Verification

## Evidence Lineage Architecture

To ensure operational trust, every output produced by the system maintains a complete evidence provenance chain linking:

```
[ Downstream Claim / Prediction ]
              │
              ▼
   [ Multi-Hop Graph Path ]
              │
              ▼
  [ Extraction Methodology ]
              │
              ▼
[ Primary Data Lineage & Timestamp ]
```

---

## Data Lineage Tiers

1. **Observed Fact (98% Confidence):** Directly verified empirical telemetry (e.g. NOAA satellite soil moisture scans, AIS vessel location beacons, SEC Form 10-Q disclosures, ICE futures spot prices).
2. **Inferred Relationship (82% Confidence):** Derived dependency links computed via multi-hop causal graph traversal.
3. **Model Prediction (68% Confidence):** Multi-variable 24-month Monte Carlo scenario trajectories.
4. **Speculative Scenario (39% Confidence):** User-defined parameter shock assumptions.

---

## Multi-Source Consensus Verification

The Evidence Fusion Engine checks for source disagreement across independent data providers. If dissenting sources are detected, the claim is flagged with an explicit `INFORMATION_CONFLICT` alert rather than silently selecting one data source.
