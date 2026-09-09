/**
 * Specialized Multi-Agent Intelligence Layer
 * Coordinates 8 specialized autonomous reasoning agents.
 */

export const SPECIALIZED_AGENTS = [
  { id: 'ag-research', name: 'Research Agent', role: 'Data Ingestion & Multilingual Source Crawling', status: 'ACTIVE', confidence: 98, lastAction: 'Parsed 1,420 global RSS feeds & government gazettes.' },
  { id: 'ag-event', name: 'Event Agent', role: 'Macro Disruption & Anomaly Extraction', status: 'ACTIVE', confidence: 96, lastAction: 'Extracted Red Sea transit reduction anomaly signal.' },
  { id: 'ag-entity', name: 'Entity Agent', role: 'Corporate Entity & Subsidiary Graph Builder', status: 'ACTIVE', confidence: 94, lastAction: 'Resolved 18 TSMC subsidiary & packaging partner nodes.' },
  { id: 'ag-supply', name: 'Supply Chain Agent', role: 'Bottleneck & Logistics Route Mapper', status: 'ACTIVE', confidence: 92, lastAction: 'Mapped Cape of Good Hope 14-day ocean detour impact.' },
  { id: 'ag-market', name: 'Market Agent', role: 'Commodity & Equities Price Sensitivity Modeler', status: 'ACTIVE', confidence: 91, lastAction: 'Calculated Arabica spot price sensitivity coefficient.' },
  { id: 'ag-product', name: 'Product Agent', role: 'End-Product Component BOM Dependencies', status: 'ACTIVE', confidence: 95, lastAction: 'Linked CoWoS packaging capacity to H100/H200 server racks.' },
  { id: 'ag-impact', name: 'Impact Agent', role: '7-Level Downstream Causal Propagation Engine', status: 'ACTIVE', confidence: 89, lastAction: 'Synthesized Brazil drought downstream product exposure matrix.' },
  { id: 'ag-simulation', name: 'Simulation Agent', role: 'What-If Monte Carlo Scenario Engine', status: 'ACTIVE', confidence: 88, lastAction: 'Simulated 18-month semiconductor embargo shock parameters.' }
];

export function getAgentSwarmStatus() {
  return {
    agents: SPECIALIZED_AGENTS,
    totalAgents: SPECIALIZED_AGENTS.length,
    activeCount: SPECIALIZED_AGENTS.filter(a => a.status === 'ACTIVE').length,
    averageConfidence: Math.round(SPECIALIZED_AGENTS.reduce((acc, a) => acc + a.confidence, 0) / SPECIALIZED_AGENTS.length)
  };
}
