/**
 * Simulation Engine ("What If?" Scenario Simulator)
 * Simulates supply shocks, geopolitical embargoes, climate disasters, and market disruption scenarios.
 */

export const PRESET_SCENARIOS = [
  {
    id: 'sim-redsea',
    title: 'Red Sea Shipping & Suez Transit Rerouting',
    category: 'Logistics & Maritime',
    defaultShock: 65,
    defaultDuration: 6,
    defaultSubstitution: 30,
    description: 'Simulates 40%+ reduction in Suez Canal container transit and 14-day Cape of Good Hope detours.'
  },
  {
    id: 'sim-brazil-drought',
    title: 'Brazil Agricultural Drought & Harvest Deficit',
    category: 'Climate & Commodities',
    defaultShock: 45,
    defaultDuration: 12,
    defaultSubstitution: 20,
    description: 'Simulates 25% harvest reduction across South American Arabica and Soy agricultural exports.'
  },
  {
    id: 'sim-semi-export-cap',
    title: 'East Asia Semiconductor Packaging Export Restrictions',
    category: 'Geopolitics & Tech Hardware',
    defaultShock: 80,
    defaultDuration: 18,
    defaultSubstitution: 15,
    description: 'Simulates embargo on sub-3nm lithography & CoWoS advanced wafer packaging equipment.'
  }
];

export function runSimulation(params) {
  const { shockSeverity, durationMonths, substitutionElasticity } = params;

  // Impact calculation formula
  const netImpactMultiplier = (shockSeverity / 100) * (durationMonths / 12) * (1 - (substitutionElasticity / 200));

  const affectedCategoriesCount = Math.round(18 + netImpactMultiplier * 45);
  const affectedCompaniesCount = Math.round(42 + netImpactMultiplier * 110);
  const affectedProductsCount = Math.round(120 + netImpactMultiplier * 340);
  const estimatedCostIncreasePercent = Number((netImpactMultiplier * 28.5).toFixed(1));

  const riskLevel = netImpactMultiplier > 0.8 ? 'CRITICAL' : netImpactMultiplier > 0.4 ? 'ELEVATED' : 'MODERATE';

  return {
    scenarioId: params.scenarioId,
    riskLevel,
    netImpactScore: Math.min(99, Math.round(netImpactMultiplier * 100)),
    metrics: {
      affectedCategoriesCount,
      affectedCompaniesCount,
      affectedProductsCount,
      estimatedCostIncreasePercent
    },
    downstreamProjections: [
      {
        timeline: 'Month 1 - 3',
        phase: 'Initial Inventory Buffer Depletion',
        impactDescription: `Warehouse safety stock absorbs initial ${shockSeverity}% shock. Spot prices rise ~${(estimatedCostIncreasePercent * 0.4).toFixed(1)}%.`
      },
      {
        timeline: 'Month 4 - 8',
        phase: 'Production Throttling & Lead Time Expansion',
        impactDescription: `Lead times expand by ${Math.round(durationMonths * 2.2)} weeks. Tier-1 OEMs pass ${estimatedCostIncreasePercent}% price increases to distributors.`
      },
      {
        timeline: 'Month 9+',
        phase: 'Structural Substitution & Alternative Routing',
        impactDescription: `Alternative suppliers in alternative geographies capture ${substitutionElasticity}% market share. Market rebalances at new price floor.`
      }
    ],
    recommendedMitigationActions: [
      `Lock in 12-month forward contracts for key component inputs.`,
      `Qualify secondary regional suppliers to offset ${shockSeverity}% single-source risk.`,
      `Implement dynamic pricing models to absorb projected ${estimatedCostIncreasePercent}% COGS increase.`
    ]
  };
}
