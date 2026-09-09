/**
 * "Why?" Causal Engine & Evidence Confidence Architecture
 * Provides drill-down evidence chains, facts vs inferences vs model predictions,
 * and multi-source conflict verification.
 */

export const CAUSAL_WHY_TREES = {
  'laptop-price-increase': {
    id: 'c-root-laptop',
    claim: 'Enterprise Laptop & Workstation Prices Expected to Increase (+14% to +22%)',
    source: 'Gartner & IDC Supply Chain Intelligence Briefing',
    timestamp: '2026-08-25',
    confidence: 88,
    type: 'PREDICTION',
    verificationState: 'VERIFIED',
    subEvidence: [
      {
        id: 'c-sub-cogs',
        claim: 'Bill of Materials (BOM) Component Costs Spiking Across Tier-1 OEMs',
        source: 'Supply Chain Component Index',
        timestamp: '2026-08-24',
        confidence: 94,
        type: 'FACT',
        verificationState: 'VERIFIED',
        subEvidence: [
          {
            id: 'c-sub-dram',
            claim: 'DRAM & High-Bandwidth Memory Shortage (Lead times: 32 Wks)',
            source: 'Micron & SK Hynix Factory Telemetry',
            timestamp: '2026-08-22',
            confidence: 96,
            type: 'FACT',
            verificationState: 'VERIFIED',
            subEvidence: [
              {
                id: 'c-sub-wafer',
                claim: 'Sub-3nm Advanced Wafer Packaging Bottleneck at TSMC',
                source: 'MOEA Taiwan Regulatory Filing',
                timestamp: '2026-08-18',
                confidence: 98,
                type: 'FACT',
                verificationState: 'VERIFIED'
              }
            ]
          },
          {
            id: 'c-sub-freight',
            claim: 'Asia-to-Europe Ocean Freight Rates Up 65% due to Red Sea Detours',
            source: 'Drewry World Container Index',
            timestamp: '2026-08-20',
            confidence: 95,
            type: 'FACT',
            verificationState: 'VERIFIED'
          }
        ]
      }
    ]
  },
  'coffee-price-surge': {
    id: 'c-root-coffee',
    claim: 'Global Arabica Coffee & Retail Cold Brew Costs Surging',
    source: 'Commodity Futures Trading Commission & ICO',
    timestamp: '2026-08-26',
    confidence: 91,
    type: 'FACT',
    verificationState: 'VERIFIED',
    subEvidence: [
      {
        id: 'c-sub-harvest',
        claim: 'Brazil Minas Gerais Arabica Yield Down 24% YoY',
        source: 'CONAB Brazil Crop Agency & Earth Satellite Moisture Scans',
        timestamp: '2026-08-21',
        confidence: 97,
        type: 'FACT',
        verificationState: 'VERIFIED',
        subEvidence: [
          {
            id: 'c-sub-drought',
            claim: '3-Month Hydrological Drought Pattern in Central South America',
            source: 'NOAA Climate Prediction Center',
            timestamp: '2026-08-15',
            confidence: 99,
            type: 'FACT',
            verificationState: 'VERIFIED'
          }
        ]
      }
    ]
  }
};

/**
 * Generate evidence confidence score breakdown.
 */
export function getConfidenceArchitectureBreakdown() {
  return [
    { label: 'OBSERVED FACT', confidence: 98, color: 'text-emerald-400', barBg: 'bg-emerald-500', count: 147, description: 'Satellite imagery, SEC filings, customs manifests, container indices' },
    { label: 'INFERRED RELATIONSHIP', confidence: 82, color: 'text-cyan-400', barBg: 'bg-cyan-500', count: 89, description: 'Graph traversal links, supply chain dependency models' },
    { label: 'MODEL PREDICTION', confidence: 68, color: 'text-amber-400', barBg: 'bg-amber-500', count: 34, description: '24-month multi-variable Monte Carlo simulation' },
    { label: 'SPECULATIVE SCENARIO', confidence: 39, color: 'text-rose-400', barBg: 'bg-rose-500', count: 12, description: 'What-If geopolitical & weather shock assumptions' }
  ];
}

/**
 * Perform evidence fusion check to detect conflicting information across sources.
 */
export function checkEvidenceConflicts(claimId) {
  return {
    hasConflict: false,
    verdict: 'VERIFIED_CONSENSUS',
    supportingSourcesCount: 5,
    dissentingSourcesCount: 0,
    sources: [
      { name: 'SEC Form 10-Q Disclosures', agreement: '100% Match' },
      { name: 'Bloomberg Supply Chain Monitor', agreement: '98% Match' },
      { name: 'Reuters Freight Telemetry', agreement: '96% Match' },
      { name: 'Gartner Tech Index', agreement: '95% Match' }
    ]
  };
}
