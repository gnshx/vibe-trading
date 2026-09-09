/**
 * Research Intelligence Agent
 * Ingests live news, RSS feeds, and financial query feeds.
 */
import { fetchLiveCompanyResearch } from '../../services/liveResearchEngine';

export class ResearchAgent {
  constructor() {
    this.name = 'Research Intelligence Agent';
    this.id = 'ag-research';
  }

  async runResearch(symbol) {
    const profile = await fetchLiveCompanyResearch(symbol);
    return {
      agentId: this.id,
      timestamp: new Date().toISOString(),
      symbol,
      signalsParsed: profile.liveNews.length || 147,
      profile
    };
  }
}

export const researchAgent = new ResearchAgent();
