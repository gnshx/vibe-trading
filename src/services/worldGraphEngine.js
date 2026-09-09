/**
 * Temporal World Graph Engine — Weighted Multi-Hop Causal Traversal with Exponential Decay
 * Mathematical Formulation:
 *   Confidence(path) = ∏ [ c_i * exp(-λ * Δt_i) ]
 *   where:
 *     c_i = base edge confidence (0.0 to 1.0)
 *     λ = temporal decay coefficient (0.005 / day)
 *     Δt_i = age of evidence in days
 */

export const INITIAL_WORLD_GRAPH = {
  nodes: [
    // Macro Events
    { id: 'ev-brazil-drought', label: 'Brazil Drought Anomaly', type: 'event', geography: 'Brazil', impactScore: 88, description: 'Severe hydrological drought impacting Minas Gerais agricultural basin.' },
    { id: 'ev-redsea-disruption', label: 'Red Sea Shipping Rerouting', type: 'event', geography: 'Red Sea / Suez', impactScore: 92, description: 'Bab-el-Mandeb Strait disruption forcing 14-day Cape of Good Hope detours.' },
    { id: 'ev-taiwan-semi', label: 'Semiconductor Lithography Export Controls', type: 'event', geography: 'Taiwan / East Asia', impactScore: 95, description: 'Export quota restrictions on sub-3nm chip packaging equipment.' },
    
    // Causes & Factors
    { id: 'c-coffee-yield', label: 'Arabica Coffee Yield Reduction', type: 'cause', geography: 'South America', impactScore: 82, description: 'Harvest volumes down 24% YoY across Minas Gerais.' },
    { id: 'c-freight-rates', label: 'Container Freight Spot Rates (+65%)', type: 'cause', geography: 'Global', impactScore: 89, description: 'Spot rates surge across major Asia-to-Europe maritime trade corridors.' },
    { id: 'c-dram-shortage', label: 'Memory & HBM Packaging Lead Time Spikes', type: 'cause', geography: 'Global', impactScore: 91, description: 'High-bandwidth memory lead times extend to 32 weeks.' },

    // Entities (Companies / Corporations)
    { id: 'ent-starbucks', label: 'Starbucks Corp (SBUX)', type: 'entity', geography: 'United States', impactScore: 78 },
    { id: 'ent-nestle', label: 'Nestlé S.A. (NESN)', type: 'entity', geography: 'Switzerland', impactScore: 75 },
    { id: 'ent-maersk', label: 'A.P. Moller - Maersk', type: 'entity', geography: 'Denmark', impactScore: 85 },
    { id: 'ent-nvda', label: 'NVIDIA Corp (NVDA)', type: 'entity', geography: 'United States', impactScore: 96 },
    { id: 'ent-tsmc', label: 'TSMC (TSM)', type: 'entity', geography: 'Taiwan', impactScore: 94 },
    { id: 'ent-apple', label: 'Apple Inc (AAPL)', type: 'entity', geography: 'United States', impactScore: 90 },

    // Industries
    { id: 'ind-agri-beverage', label: 'Coffee & Specialty Beverage Sector', type: 'industry', geography: 'Global', impactScore: 80 },
    { id: 'ind-maritime-logistics', label: 'Maritime Ocean Logistics', type: 'industry', geography: 'Global', impactScore: 88 },
    { id: 'ind-hardware-ai', label: 'AI Hardware & Datacenter Infrastructure', type: 'industry', geography: 'Global', impactScore: 95 },

    // Supply Chains
    { id: 'sc-arabica-supply', label: 'Arabica Bean Supply Corridor', type: 'supply_chain', geography: 'Latin America', impactScore: 84 },
    { id: 'sc-asia-eu-shipping', label: 'Asia-to-Europe Ocean Freight Route', type: 'supply_chain', geography: 'Global', impactScore: 90 },
    { id: 'sc-hbm-wafer', label: 'CoWoS Wafer Packaging Chain', type: 'supply_chain', geography: 'East Asia', impactScore: 93 },

    // Commercial End-Products
    { id: 'prod-packaged-coffee', label: 'Commercial Packaged Coffee & Cold Brew', type: 'product', geography: 'Global', impactScore: 79 },
    { id: 'prod-laptop-workstation', label: 'Enterprise Mobile Workstations & Laptops', type: 'product', geography: 'Global', impactScore: 86 },
    { id: 'prod-ai-accelerators', label: 'H100/H200/B200 AI Server Accelerators', type: 'product', geography: 'Global', impactScore: 96 }
  ],
  edges: [
    // Brazil Drought Causal Chain
    { source: 'ev-brazil-drought', target: 'c-coffee-yield', relationship: 'reduces_yield_by_24%', confidence: 94, timestamp: '2026-08-20', type: 'fact', evidence: 'Satellite moisture radar & CONAB Brazil Agriculture Ministry report.', weight: 0.94, ageDays: 10 },
    { source: 'c-coffee-yield', target: 'sc-arabica-supply', relationship: 'constrains_capacity', confidence: 91, timestamp: '2026-08-21', type: 'fact', evidence: 'Santos Port export manifest telemetry.', weight: 0.91, ageDays: 9 },
    { source: 'sc-arabica-supply', target: 'ind-agri-beverage', relationship: 'drives_raw_cost_spikes', confidence: 88, timestamp: '2026-08-22', type: 'inference', evidence: 'Commodity futures price trends on ICE exchange.', weight: 0.88, ageDays: 8 },
    { source: 'ind-agri-beverage', target: 'ent-starbucks', relationship: 'increases_cogs_exposure', confidence: 85, timestamp: '2026-08-24', type: 'inference', evidence: 'Q3 SEC Form 10-Q risk factor disclosures.', weight: 0.85, ageDays: 6 },
    { source: 'ind-agri-beverage', target: 'ent-nestle', relationship: 'squeezes_operating_margin', confidence: 82, timestamp: '2026-08-24', type: 'inference', evidence: 'Global retail margin sensitivity model.', weight: 0.82, ageDays: 6 },
    { source: 'ent-starbucks', target: 'prod-packaged-coffee', relationship: 'forces_retail_price_increase', confidence: 78, timestamp: '2026-08-26', type: 'prediction', evidence: 'Historical price elasticity econometric analysis.', weight: 0.78, ageDays: 4 },

    // Red Sea Ocean Transit Chain
    { source: 'ev-redsea-disruption', target: 'c-freight-rates', relationship: 'surges_spot_container_prices', confidence: 96, timestamp: '2026-08-15', type: 'fact', evidence: 'Drewry World Container Index spot rate data.', weight: 0.96, ageDays: 15 },
    { source: 'c-freight-rates', target: 'sc-asia-eu-shipping', relationship: 'reroutes_via_cape_of_good_hope', confidence: 95, timestamp: '2026-08-16', type: 'fact', evidence: 'AIS vessel positioning telemetry.', weight: 0.95, ageDays: 14 },
    { source: 'sc-asia-eu-shipping', target: 'ind-maritime-logistics', relationship: 'expands_ton_mile_demand', confidence: 90, timestamp: '2026-08-18', type: 'fact', evidence: 'A.P. Moller - Maersk investor operational update.', weight: 0.90, ageDays: 12 },
    { source: 'ind-maritime-logistics', target: 'ent-maersk', relationship: 'boosts_freight_yields', confidence: 92, timestamp: '2026-08-20', type: 'fact', evidence: 'Q2 Earnings guidance revision.', weight: 0.92, ageDays: 10 },
    { source: 'sc-asia-eu-shipping', target: 'prod-laptop-workstation', relationship: 'delays_component_deliveries', confidence: 84, timestamp: '2026-08-22', type: 'inference', evidence: 'Customs clearance transit duration metrics.', weight: 0.84, ageDays: 8 },

    // Taiwan Semiconductor Chain
    { source: 'ev-taiwan-semi', target: 'c-dram-shortage', relationship: 'restricts_advanced_packaging', confidence: 95, timestamp: '2026-08-10', type: 'fact', evidence: 'MOEA Taiwan regulatory export directive.', weight: 0.95, ageDays: 20 },
    { source: 'c-dram-shortage', target: 'sc-hbm-wafer', relationship: 'lengthens_lead_time_to_32wks', confidence: 93, timestamp: '2026-08-12', type: 'fact', evidence: 'Semiconductor supply chain survey data.', weight: 0.93, ageDays: 18 },
    { source: 'sc-hbm-wafer', target: 'ind-hardware-ai', relationship: 'throttles_datacenter_shipments', confidence: 91, timestamp: '2026-08-14', type: 'inference', evidence: 'Tier-1 hyperscaler allocation notes.', weight: 0.91, ageDays: 16 },
    { source: 'ind-hardware-ai', target: 'ent-nvda', relationship: 'impacts_b200_server_delivery', confidence: 89, timestamp: '2026-08-18', type: 'inference', evidence: 'Supply chain channel checks.', weight: 0.89, ageDays: 12 },
    { source: 'ind-hardware-ai', target: 'ent-apple', relationship: 'tightens_m4_max_die_yield', confidence: 81, timestamp: '2026-08-20', type: 'prediction', evidence: 'Wafer allocation model.', weight: 0.81, ageDays: 10 },
    { source: 'ent-nvda', target: 'prod-ai-accelerators', relationship: 'extends_order_backlog', confidence: 92, timestamp: '2026-08-25', type: 'prediction', evidence: 'Hyperscaler capex commitment disclosures.', weight: 0.92, ageDays: 5 }
  ]
};

/**
 * Calculates weighted path confidence with exponential decay λ = 0.005 / day.
 */
function calculateDecayedEdgeConfidence(edge) {
  const baseConf = (edge.confidence || 90) / 100;
  const lambda = 0.005; // decay per day
  const ageDays = edge.ageDays || 5;
  const decayFactor = Math.exp(-lambda * ageDays);
  return baseConf * decayFactor;
}

/**
 * Traverses the temporal world graph with exponential decay, edge weights, and path directionality.
 */
export function calculate7LevelCausalImpact(rootId, graph = INITIAL_WORLD_GRAPH) {
  const rootNode = graph.nodes.find(n => n.id === rootId || n.label.toLowerCase().includes(rootId.toLowerCase()));
  if (!rootNode) return null;

  const levels = [
    { level: 1, name: 'Direct Impact', description: 'Immediate initial disruption or policy directive', items: [] },
    { level: 2, name: 'Dependency Impact', description: 'Secondary factor shifts & production yields', items: [] },
    { level: 3, name: 'Supply-Chain Impact', description: 'Corridor choke points & logistics capacity', items: [] },
    { level: 4, name: 'Market & Industry Impact', description: 'Sector-wide price movements & COGS shifts', items: [] },
    { level: 5, name: 'Corporate & Entity Exposure', description: 'Specific companies gaining or losing edge', items: [] },
    { level: 6, name: 'Product & End-Consumer Impact', description: 'Retail products, pricing, and availability', items: [] },
    { level: 7, name: 'Strategic & Future Scenarios', description: 'Multi-quarter structural shifts & alternatives', items: [] }
  ];

  const visited = new Set();
  const queue = [
    { nodeId: rootNode.id, currentDepth: 1, path: [rootNode.label], confidenceAccum: 1.0 }
  ];

  visited.add(rootNode.id);

  while (queue.length > 0) {
    const { nodeId, currentDepth, path, confidenceAccum } = queue.shift();
    const currentNode = graph.nodes.find(n => n.id === nodeId);
    if (!currentNode) continue;

    const levelIdx = Math.min(6, currentDepth - 1);
    levels[levelIdx].items.push({
      node: currentNode,
      confidenceScore: Math.max(35, Math.min(99, Math.round(confidenceAccum * 100))),
      path: [...path]
    });

    if (currentDepth >= 7) continue;

    const outgoing = graph.edges.filter(e => e.source === nodeId);
    for (const edge of outgoing) {
      if (!visited.has(edge.target)) {
        visited.add(edge.target);
        const targetNode = graph.nodes.find(n => n.id === edge.target);
        if (targetNode) {
          const edgeDecayedConf = calculateDecayedEdgeConfidence(edge);
          queue.push({
            nodeId: edge.target,
            currentDepth: currentDepth + 1,
            path: [...path, `${edge.relationship} → ${targetNode.label}`],
            confidenceAccum: confidenceAccum * edgeDecayedConf
          });
        }
      }
    }
  }

  return {
    rootNode,
    totalNodesAffected: visited.size,
    levels: levels.filter(l => l.items.length > 0)
  };
}

export function getProductExposureMatrix(query, graph = INITIAL_WORLD_GRAPH) {
  return [
    {
      product: 'Enterprise Workstations & AI Laptops',
      exposure: 'High Exposure',
      reason: 'Key DRAM & CoWoS component lead time extensions up to 32 weeks.',
      confidence: 91,
      sourceType: 'Observed Fact & Channel Verification'
    },
    {
      product: 'Commercial Packaged Coffee & Cold Brew',
      exposure: 'High Exposure',
      reason: 'Arabica harvest decline in Minas Gerais driving 24% spot cost spike.',
      confidence: 88,
      sourceType: 'Satellite Moisture Telemetry & Port Manifests'
    },
    {
      product: 'H100/H200/B200 AI Server Accelerators',
      exposure: 'Extreme Exposure',
      reason: 'Taiwan sub-3nm packaging quota restrictions throttling shipment velocity.',
      confidence: 95,
      sourceType: 'Government Export Controls & SEC Disclosures'
    },
    {
      product: 'Consumer Electronics Transit Freight',
      exposure: 'Medium Exposure',
      reason: 'Cape of Good Hope rerouting adding 14-21 days ocean transit time.',
      confidence: 84,
      sourceType: 'AIS Vessel Positioning & Freight Index'
    }
  ];
}
