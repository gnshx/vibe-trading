/**
 * Simulation Intelligence Agent
 * Executes Monte Carlo shock simulation scenarios over target horizons.
 */
import { runSimulation } from '../../services/simulationEngine';

export class SimulationAgent {
  constructor() {
    this.name = 'Simulation Agent';
    this.id = 'ag-simulation';
  }

  runScenario(shockSeverity = 25, durationMonths = 6, substitutionElasticity = 30) {
    const simulation = runSimulation({ shockSeverity, durationMonths, substitutionElasticity });
    return {
      agentId: this.id,
      simulation
    };
  }
}

export const simulationAgent = new SimulationAgent();

