import { describe, it, expect } from 'vitest';
import { researchAgent, eventAgent, entityResolutionAgent, supplyChainAgent, marketImpactAgent, productExposureAgent, causalPropagationAgent, simulationAgent } from '../intelligence/index';

describe('Specialized Intelligence Layer Unit Tests', () => {
  it('ResearchAgent initializes and parses signals', async () => {
    const result = await researchAgent.runResearch('NVDA');
    expect(result.symbol).toBe('NVDA');
    expect(result.signalsParsed).toBeGreaterThan(0);
  });

  it('EventAgent extracts discrete world events', () => {
    const result = eventAgent.extractEvents();
    expect(result.eventCount).toBeGreaterThan(0);
  });

  it('EntityResolutionAgent resolves corporate entities', () => {
    const result = entityResolutionAgent.resolveEntities();
    expect(result.entityCount).toBeGreaterThan(0);
  });

  it('SupplyChainAgent maps logistics choke points', () => {
    const result = supplyChainAgent.mapSupplyChain();
    expect(result.supplyNodesCount).toBeGreaterThan(0);
  });

  it('MarketImpactAgent calculates price elasticity coefficients', () => {
    const result = marketImpactAgent.calculateSensitivity('node-1', 0.2);
    expect(result.sensitivityCoefficient).toBe(0.29);
  });

  it('ProductExposureAgent links components to SKUs', () => {
    const result = productExposureAgent.getExposedProducts();
    expect(result.productCount).toBeGreaterThan(0);
  });

  it('CausalPropagationAgent executes 7-level temporal decay traversal', () => {
    const result = causalPropagationAgent.propagateImpact('ev-brazil-drought');
    expect(result.propagation).toBeDefined();
  });

  it('SimulationAgent runs Monte Carlo scenarios', () => {
    const result = simulationAgent.runScenario(25, 6, 30);
    expect(result.simulation).toBeDefined();
  });
});
