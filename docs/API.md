# Global Impact Intelligence Platform — API Reference Specifications

**Version:** 2.0.0  
**Base Path:** `/api/v2`  
**Authentication:** Optional Bearer Token or Client-Side Key Header (`X-Engine-Key`)

---

## 🛰️ 1. Events & Disruption Signals API

### `GET /api/v2/events`
Returns continuous real-time world disruption signals.

**Query Parameters:**
* `severity` *(string, optional)* — Filter by impact level (`High`, `Medium`, `Low`).
* `category` *(string, optional)* — Filter by sector (`Geopolitics`, `Logistics`, `Commodity`, `Climate`).

**Response `200 OK`:**
```json
{
  "status": "success",
  "count": 6,
  "events": [
    {
      "id": "ev-101",
      "timestamp": "2026-09-10T10:24:12Z",
      "title": "Taiwan Strait Maritime Defense Patrol Heightened",
      "category": "Geopolitics",
      "impact": "High",
      "targetNode": "TSMC Fab 18 (Tainan)"
    }
  ]
}
```

---

## 🕸️ 2. World Graph & Temporal Model API

### `GET /api/v2/graph/nodes`
Returns all machine-readable world graph entities and current state properties.

### `GET /api/v2/graph/causal-propagation?eventId={eventId}`
Executes 7-level weighted temporal decay traversal ($\lambda = 0.005 \text{ day}^{-1}$) from a seed event.

**Response `200 OK`:**
```json
{
  "eventId": "ev-101",
  "pathConfidence": 0.873,
  "decayConstant": 0.005,
  "levels": [
    {
      "level": 1,
      "layerName": "Direct Event Trigger",
      "node": "Taiwan Strait Maritime Defense Patrol Heightened"
    },
    {
      "level": 7,
      "layerName": "Strategic Response",
      "node": "Execute Long Collar Options Hedging Strategy"
    }
  ]
}
```

---

## 🎛️ 3. Monte Carlo Scenario Simulator API

### `POST /api/v2/simulate`
Runs parameterized Monte Carlo shock scenarios over target horizons.

**Request Body:**
```json
{
  "shockSeverity": 25,
  "durationMonths": 6,
  "substitutionElasticity": 30
}
```

**Response `200 OK`:**
```json
{
  "status": "completed",
  "cogsMarginImpact": "-14.2%",
  "subcontractorLeadTimeDays": 112,
  "targetPriceDeltaBase": "-18.5%",
  "targetPriceDeltaBear": "-34.0%"
}
```

---

## 🧪 4. Empirical Evaluation & Calibration API

### `GET /api/v2/evaluation/brier-score`
Returns current Brier Calibration Score and hold-out benchmark metrics.

**Response `200 OK`:**
```json
{
  "brierCalibrationScore": 0.0820,
  "evaluationStandard": "Gold Standard (< 0.150)",
  "holdoutEventsCount": 100,
  "entityExtractionPrecision": 0.972,
  "relationExtractionPrecision": 0.941,
  "impactPathPrecision": 0.873
}
```
