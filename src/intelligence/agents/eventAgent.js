/**
 * Event Intelligence Agent
 * Extracts discrete macro disruption events and anomalous signals.
 */
import { INITIAL_WORLD_GRAPH } from '../../services/worldGraphEngine';

export class EventAgent {
  constructor() {
    this.name = 'Event Intelligence Agent';
    this.id = 'ag-event';
  }

  extractEvents() {
    const events = INITIAL_WORLD_GRAPH.nodes.filter(n => n.type === 'event');
    return {
      agentId: this.id,
      eventCount: events.length,
      events
    };
  }
}

export const eventAgent = new EventAgent();
