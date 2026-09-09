# Threat Modeling, Failure Analysis & Red-Team Audit (`red-team.md`)

## System Failure Modes & Architectural Mitigation Handles

To ensure enterprise reliability, the Global Impact Intelligence Engine explicitly identifies and mitigates 7 primary failure modes:

| Failure Code | Failure Description | Cause / Risk | Architectural Mitigation Handle |
|---|---|---|---|
| **#001** | **Stale Telemetry Feed** | External news or vessel API becomes unresponsive or rate-limited. | `fetchWithTimeout(url, 1200ms)` AbortController wrapper automatically falls back to baseline synthesized profile. |
| **#002** | **Entity Ambiguity & Overlap** | Multiple corporate entities share similar names or tickers. | Strict ticker-to-CIK mapping and exchange jurisdiction checks (`src/services/liveResearchEngine.js`). |
| **#003** | **Conflicting Source Telemetry** | Two data providers publish opposing claims regarding a supply disruption. | Multi-source consensus verification engine triggers explicit `INFORMATION_CONFLICT` alert instead of silent selection. |
| **#004** | **False Causal Correlation** | Spurious correlation between unrelated news events and equity price moves. | Exponential temporal decay penalty $e^{-\lambda \Delta t_i}$ and minimum weight threshold filter ($w_i \ge 0.35$). |
| **#005** | **Corporate Ownership Structure Shift** | M&A activity or subsidiary spin-off alters entity node relationship. | Dynamic entity graph resolution via `Entity Agent` in specialized agent swarm. |
| **#006** | **Discontinued Product BOM Mapping** | Product category is phased out or replaced by OEM. | Product BOM dependency freshness validation and active hold-out evaluation benchmark. |
| **#007** | **Cascading False Positive Propagation** | High-confidence initial error propagates through 7 hops. | Path confidence multiplication penalty $\mathcal{C}(P) = \prod c_i \cdot e^{-\lambda \Delta t_i}$ rapidly dampens low-confidence downstream hops. |
