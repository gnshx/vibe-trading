export const companyDatabase = [
  {
    id: "NVDA",
    symbol: "NVDA",
    name: "NVIDIA Corporation",
    sector: "Semiconductors & AI",
    country: "United States",
    hqCity: "Santa Clara, CA",
    primaryExchange: "NASDAQ",
    timezone: "PST (UTC-8)",
    marketCap: "$3.2T",
    currentPrice: 130.50,
    ceo: "Jensen Huang",
    leaders: ["Jensen Huang (CEO)", "Colette Kress (CFO)", "Ian Buck (VP High Performance Computing)"],
    reputation: {
      overallScore: 92,
      brandSentiment: "Extremely Bullish",
      mediaBuzz: 96,
      institutionalTrust: 94,
      employeeVibe: 90,
      esgRating: "A",
      controversyIndex: 18, // Low controversy
      recentNarrative: "Undisputed leader in AI infrastructure and GPU acceleration. Highly respected leadership with iconic CEO presence."
    },
    upcomingEvents: [
      {
        id: "nvda-e1",
        timeframe: "days",
        timeframeLabel: "Next 14 Days",
        date: "2025-03-12",
        title: "Q4 Earnings Release & AI Data Center Guidance",
        category: "Earnings",
        impact: "High",
        direction: "Bullish",
        probability: "85%",
        description: "Expected to report hyper-growth in Blackwell chip revenue and expanded cloud hyperscaler supply commitments."
      },
      {
        id: "nvda-e2",
        timeframe: "days",
        timeframeLabel: "Next 30 Days",
        date: "2025-03-24",
        title: "GTC AI World Conference Keynote",
        category: "Product Launch",
        impact: "Extreme",
        direction: "Bullish",
        probability: "90%",
        description: "Jensen Huang unveils next-generation Rubin GPU architecture and quantum-classical computing software suites."
      },
      {
        id: "nvda-e3",
        timeframe: "years",
        timeframeLabel: "Next 1-2 Years",
        date: "2026-Q2",
        title: "Global Sovereign AI Infrastructure Deployment",
        category: "Strategic Expansion",
        impact: "High",
        direction: "Bullish",
        probability: "80%",
        description: "Multibillion-dollar nation-state AI compute cluster rollouts across Middle East, Japan, and European Union."
      },
      {
        id: "nvda-e4",
        timeframe: "years",
        timeframeLabel: "Next 2-3 Years",
        date: "2027-Q1",
        title: "US-Asia Semiconductor Trade Regulatory Review",
        category: "Regulatory",
        impact: "Medium",
        direction: "Neutral",
        probability: "65%",
        description: "Re-evaluation of export control thresholds for custom AI silicon shipped to Asian markets."
      }
    ],
    tieUps: [
      {
        partner: "Taiwan Semiconductor Manufacturing Co. (TSMC)",
        type: "Foundry & CoWoS Packaging Exclusive Allocation",
        dealValue: "Strategic Core",
        status: "Active & Expanding",
        vibeImpact: "+25% Supply Assurance",
        details: "Deep technology co-development for 3nm and 2nm advanced node packaging."
      },
      {
        partner: "Microsoft Azure & OpenAI",
        type: "Supercomputing Enterprise Infrastructure Partnership",
        dealValue: "$10B+",
        status: "Active",
        vibeImpact: "+20% Demand Visibility",
        details: "Multi-year commitment for hundreds of thousands of GB200 NVL72 clusters."
      },
      {
        partner: "Reliance Industries (India)",
        type: "Sovereign AI Infrastructure Tie-up",
        dealValue: "$2.5B",
        status: "In Progress",
        vibeImpact: "+12% Regional Expansion",
        details: "Building India's largest localized LLM supercomputing center."
      }
    ],
    geopolitics: {
      primaryCountry: "United States",
      keyLeaderRelations: [
        { leader: "US Administration", relationship: "Strategic Ally", impact: "High CHIPS Act alignment and sovereign defense AI grants." },
        { leader: "Taiwan Executive Leadership", relationship: "Vital Partner", impact: "Crucial for TSMC fab allocation and supply chain security." },
        { leader: "EU Tech Commission", relationship: "Monitored", impact: "Antitrust scrutiny over software stack dominance (CUDA)." }
      ],
      regulatoryRisk: "Moderate (Export Controls)",
      geopoliticalStabilityScore: 82,
      timezoneEffect: {
        marketHours: "US Eastern (09:30 - 16:00 EST)",
        overlapImpact: "High price action during Asian market opening (Tokyo/Taiwan) due to foundry news updates."
      }
    },
    valuation: {
      peRatio: 48.5,
      pegRatio: 1.2,
      revenueGrowthYoY: "94%",
      analystConsensus: "Strong Buy",
      targetBasePrice: 165.00,
      targetBullPrice: 195.00,
      targetBearPrice: 110.00
    }
  },
  {
    id: "PLTR",
    symbol: "PLTR",
    name: "Palantir Technologies Inc.",
    sector: "Enterprise Software & Defense AI",
    country: "United States",
    hqCity: "Denver, CO",
    primaryExchange: "NYSE",
    timezone: "MST (UTC-7)",
    marketCap: "$140B",
    currentPrice: 62.40,
    ceo: "Alex Karp",
    leaders: ["Alex Karp (CEO)", "Peter Thiel (Co-Founder & Chairman)", "Shyam Sankar (CTO)"],
    reputation: {
      overallScore: 88,
      brandSentiment: "Strongly Bullish",
      mediaBuzz: 91,
      institutionalTrust: 86,
      employeeVibe: 85,
      esgRating: "B+",
      controversyIndex: 35, // Polarizing defense narrative
      recentNarrative: "Pioneer in defense AI (AIP platform). Strong conviction leadership with rapid enterprise commercial customer growth."
    },
    upcomingEvents: [
      {
        id: "pltr-e1",
        timeframe: "days",
        timeframeLabel: "Next 10 Days",
        date: "2025-03-08",
        title: "US Department of Defense AI Contract Award Announcement",
        category: "Government Contract",
        impact: "High",
        direction: "Bullish",
        probability: "80%",
        description: "Potential expansion of Maven Smart System and Army TITAN ground station contracts."
      },
      {
        id: "pltr-e2",
        timeframe: "days",
        timeframeLabel: "Next 25 Days",
        date: "2025-03-22",
        title: "AIP Boot Camp Enterprise Showcase",
        category: "Commercial Growth",
        impact: "Medium",
        direction: "Bullish",
        probability: "85%",
        description: "Demonstration of 100+ commercial deal conversions powered by rapid AIP onboarding."
      },
      {
        id: "pltr-e3",
        timeframe: "years",
        timeframeLabel: "Next 1-2 Years",
        date: "2026-Q3",
        title: "NATO & Allied Defense Integration Standardization",
        category: "Geopolitical Defense",
        impact: "Extreme",
        direction: "Bullish",
        probability: "75%",
        description: "Designation of Palantir Gotham/AIP as standard decision-support software for NATO member states."
      }
    ],
    tieUps: [
      {
        partner: "US Department of Defense (Pentagon)",
        type: "Prime Defense Software Vendor",
        dealValue: "$1.2B+",
        status: "Active & Scaling",
        vibeImpact: "+30% Moat Protection",
        details: "Core intelligence and battlefield telemetry processing infrastructure."
      },
      {
        partner: "Oracle Cloud Infrastructure",
        type: "Global Sovereign & Cloud Enterprise Alliance",
        dealValue: "$500M+",
        status: "Active",
        vibeImpact: "+15% Commercial Distribution",
        details: "Jointly serving defense and government agencies globally with secure sovereign hosting."
      },
      {
        partner: "BP & Airbus",
        type: "Industrial Operational AI Transformation",
        dealValue: "$300M",
        status: "Expanding",
        vibeImpact: "+10% Enterprise Credibility",
        details: "Supply chain optimization and commercial flight data management platforms."
      }
    ],
    geopolitics: {
      primaryCountry: "United States",
      keyLeaderRelations: [
        { leader: "US DoD & Pentagon Chiefs", relationship: "Mission-Critical Ally", impact: "High defense spending capture during geopolitical conflicts." },
        { leader: "NATO Allied Leaders", relationship: "Trusted Partner", impact: "Growing adoption across UK MoD and Eastern European defense ministries." },
        { leader: "Global Privacy Regulators", relationship: "Complex", impact: "Ongoing scrutiny over data aggregation and civil liberties." }
      ],
      regulatoryRisk: "Low-to-Moderate",
      geopoliticalStabilityScore: 89,
      timezoneEffect: {
        marketHours: "US Eastern (09:30 - 16:00 EST)",
        overlapImpact: "Sensitive to European news cycles and defense budget announcements from London/Brussels."
      }
    },
    valuation: {
      peRatio: 85.0,
      pegRatio: 2.1,
      revenueGrowthYoY: "44%",
      analystConsensus: "Buy / Outperform",
      targetBasePrice: 78.00,
      targetBullPrice: 95.00,
      targetBearPrice: 48.00
    }
  },
  {
    id: "TSLA",
    symbol: "TSLA",
    name: "Tesla Inc.",
    sector: "Automotive & Autonomous Robotics",
    country: "United States",
    hqCity: "Austin, TX",
    primaryExchange: "NASDAQ",
    timezone: "CST (UTC-6)",
    marketCap: "$950B",
    currentPrice: 310.00,
    ceo: "Elon Musk",
    leaders: ["Elon Musk (CEO)", "Vaibhav Taneja (CFO)", "Ashok Elluswamy (Director of Autopilot)"],
    reputation: {
      overallScore: 81,
      brandSentiment: "Highly Volatile / High Potential",
      mediaBuzz: 99,
      institutionalTrust: 76,
      employeeVibe: 79,
      esgRating: "B",
      controversyIndex: 65, // High CEO political visibility
      recentNarrative: "Transitioning from EV automaker to Autonomous AI / Humanoid Robotics energy conglomerate. Highly tied to CEO political influence."
    },
    upcomingEvents: [
      {
        id: "tsla-e1",
        timeframe: "days",
        timeframeLabel: "Next 20 Days",
        date: "2025-03-18",
        title: "FSD Unsupervised Regulatory Approval Filing (Texas/California)",
        category: "Regulatory",
        impact: "Extreme",
        direction: "Bullish",
        probability: "70%",
        description: "Official regulatory milestone application for driverless Cybercab commercial rideshare operations."
      },
      {
        id: "tsla-e2",
        timeframe: "days",
        timeframeLabel: "Next 45 Days",
        date: "2025-04-10",
        title: "Optimus Gen-3 Humanoid Production Demo",
        category: "Technology Unveil",
        impact: "High",
        direction: "Bullish",
        probability: "80%",
        description: "Demonstrating factory task automation and commercial pricing timeline."
      },
      {
        id: "tsla-e3",
        timeframe: "years",
        timeframeLabel: "Next 1-3 Years",
        date: "2026-Q4",
        title: "Cybercab Mass Commercial Fleet Rollout",
        category: "Commercial Scale",
        impact: "Extreme",
        direction: "Bullish",
        probability: "75%",
        description: "Launch of autonomous ride-hailing app across 20 major metropolitan cities globally."
      }
    ],
    tieUps: [
      {
        partner: "Panasonic & CATL",
        type: "Next-Gen 4680 & LFP Battery Cell Joint Production",
        dealValue: "$8B+",
        status: "Active",
        vibeImpact: "+18% Margin Efficiency",
        details: "Securing mega-scale battery pack supply for Megapack energy storage and vehicles."
      },
      {
        partner: "xAI (Musk Ecosystem)",
        type: "Grok AI & Synthetic Data Compute Exchange",
        dealValue: "Cross-Ecosystem Synergy",
        status: "Active",
        vibeImpact: "+22% Tech Velocity",
        details: "Shared compute training clusters and vision transformer model acceleration."
      },
      {
        partner: "US National Grid & Energy Utilities",
        type: "Megapack Storage Grid Stabilization Projects",
        dealValue: "$3B",
        status: "Expanding Rapidly",
        vibeImpact: "+15% Non-Auto Revenue",
        details: "Utility-scale energy storage deployments across US, Australia, and UK."
      }
    ],
    geopolitics: {
      primaryCountry: "United States",
      keyLeaderRelations: [
        { leader: "US Federal Administration & DOGE", relationship: "High Influence", impact: "Favorable autonomous vehicle regulatory pathway and deregulation." },
        { leader: "China National Government", relationship: "Strategic Symbiosis", impact: "Shanghai GigaFactory export hub and FSD China mapping approval." },
        { leader: "European Union Regulators", relationship: "Challenging", impact: "Tariffs on Chinese-built EVs and strict autonomous driving homologation." }
      ],
      regulatoryRisk: "High",
      geopoliticalStabilityScore: 74,
      timezoneEffect: {
        marketHours: "US Eastern (09:30 - 16:00 EST)",
        overlapImpact: "Heavy overnight volatility driven by Asian EV competitor news and European regulatory statements."
      }
    },
    valuation: {
      peRatio: 92.0,
      pegRatio: 2.8,
      revenueGrowthYoY: "18%",
      analystConsensus: "Moderate Buy / High Variance",
      targetBasePrice: 350.00,
      targetBullPrice: 480.00,
      targetBearPrice: 210.00
    }
  },
  {
    id: "AAPL",
    symbol: "AAPL",
    name: "Apple Inc.",
    sector: "Consumer Technology & AI Services",
    country: "United States",
    hqCity: "Cupertino, CA",
    primaryExchange: "NASDAQ",
    timezone: "PST (UTC-8)",
    marketCap: "$3.5T",
    currentPrice: 238.20,
    ceo: "Tim Cook",
    leaders: ["Tim Cook (CEO)", "Luca Maestri (CFO)", "Craig Federighi (SVP Software)"],
    reputation: {
      overallScore: 94,
      brandSentiment: "Pinnacle Premium",
      mediaBuzz: 88,
      institutionalTrust: 97,
      employeeVibe: 88,
      esgRating: "AA",
      controversyIndex: 22,
      recentNarrative: "Gold-standard global brand equity with massive cash flow, rolling out Apple Intelligence across 2B active devices."
    },
    upcomingEvents: [
      {
        id: "aapl-e1",
        timeframe: "days",
        timeframeLabel: "Next 18 Days",
        date: "2025-03-15",
        title: "Apple Intelligence Siri 2.0 Feature Drop (iOS 18.4)",
        category: "Software Release",
        impact: "High",
        direction: "Bullish",
        probability: "90%",
        description: "Release of deep personal context and app action control capabilities powered by on-device LLMs."
      },
      {
        id: "aapl-e2",
        timeframe: "years",
        timeframeLabel: "Next 1-2 Years",
        date: "2026-Q2",
        title: "Foldable iPhone & Vision Pro Gen-2 Launch",
        category: "Hardware Innovation",
        impact: "High",
        direction: "Bullish",
        probability: "82%",
        description: "Next major hardware form factor cycle targeting high-margin premium consumer segment."
      }
    ],
    tieUps: [
      {
        partner: "OpenAI & Google (Gemini)",
        type: "Multi-Model Cloud AI Search & Assistance Integration",
        dealValue: "Strategic Revenue Share",
        status: "Active",
        vibeImpact: "+18% Ecosystem Value",
        details: "Seamless user choice integration for complex generative queries."
      },
      {
        partner: "Foxconn & Tata Group (India)",
        type: "Supply Chain Diversification & Manufacturing Expansion",
        dealValue: "$12B+ Capex Shift",
        status: "Active",
        vibeImpact: "+20% Supply Resilience",
        details: "Scaling iPhone assembly capacity in India to 25%+ of total global volume."
      }
    ],
    geopolitics: {
      primaryCountry: "United States",
      keyLeaderRelations: [
        { leader: "US Trade Representative", relationship: "Strong Lobbying", impact: "Managing tariff exemptions for consumer electronics imports." },
        { leader: "India Prime Minister & Tech Ministry", relationship: "Strategic Growth Ally", impact: "Subsidies for local high-tech manufacturing expansion." },
        { leader: "EU Antitrust Commission", relationship: "Friction Point", impact: "DMA regulations forcing third-party app stores and browser engines." }
      ],
      regulatoryRisk: "Moderate",
      geopoliticalStabilityScore: 86,
      timezoneEffect: {
        marketHours: "US Eastern (09:30 - 16:00 EST)",
        overlapImpact: "Stable intraday profile with liquidity support across London and Tokyo sessions."
      }
    },
    valuation: {
      peRatio: 33.4,
      pegRatio: 2.2,
      revenueGrowthYoY: "7%",
      analystConsensus: "Buy",
      targetBasePrice: 260.00,
      targetBullPrice: 295.00,
      targetBearPrice: 205.00
    }
  },
  {
    id: "ASML",
    symbol: "ASML",
    name: "ASML Holding N.V.",
    sector: "Semiconductor Equipment",
    country: "Netherlands",
    hqCity: "Veldhoven",
    primaryExchange: "NASDAQ / Euronext",
    timezone: "CET (UTC+1)",
    marketCap: "$290B",
    currentPrice: 720.00,
    ceo: "Christophe Fouquet",
    leaders: ["Christophe Fouquet (CEO)", "Roger Dassen (CFO)"],
    reputation: {
      overallScore: 91,
      brandSentiment: "Technological Monopoly Status",
      mediaBuzz: 82,
      institutionalTrust: 95,
      employeeVibe: 91,
      esgRating: "AAA",
      controversyIndex: 15,
      recentNarrative: "Sole supplier of High-NA EUV lithography machines essential for manufacturing advanced AI chips worldwide."
    },
    upcomingEvents: [
      {
        id: "asml-e1",
        timeframe: "days",
        timeframeLabel: "Next 12 Days",
        date: "2025-03-10",
        title: "High-NA EUV Shipments Progress Update to TSMC & Intel",
        category: "Product Delivery",
        impact: "High",
        direction: "Bullish",
        probability: "88%",
        description: "Confirmation of $350M+ per unit EUV system acceptance by major semiconductor foundries."
      },
      {
        id: "asml-e2",
        timeframe: "years",
        timeframeLabel: "Next 1-2 Years",
        date: "2026-Q3",
        title: "Dutch-US Export License Regulatory Accord",
        category: "Geopolitical Regulatory",
        impact: "Extreme",
        direction: "Neutral",
        probability: "75%",
        description: "Clarification of maintenance service policies for legacy DUV tools in international fabs."
      }
    ],
    tieUps: [
      {
        partner: "TSMC, Samsung & Intel",
        type: "Foundry Co-Investment & Lithography Tool Roadmap",
        dealValue: "$20B+ Backlog",
        status: "Exclusive Core Partner",
        vibeImpact: "+35% Unassailable Moat",
        details: "Multi-year advance orders for extreme ultraviolet lithography scanners."
      },
      {
        partner: "Carl Zeiss SMT",
        type: "Optical System Exclusive Joint Development",
        dealValue: "Strategic Monopoly",
        status: "Active",
        vibeImpact: "+25% Technological Superiority",
        details: "World's highest precision mirror systems for sub-2nm chip fabrication."
      }
    ],
    geopolitics: {
      primaryCountry: "Netherlands",
      keyLeaderRelations: [
        { leader: "Dutch Government & Prime Minister", relationship: "Protected National Gem", impact: "Balancing sovereignty with US export restriction alignment." },
        { leader: "US Commerce Department", relationship: "High Influence", impact: "Pressures to limit advanced lithography equipment maintenance in non-allied zones." }
      ],
      regulatoryRisk: "High (Export Restrictions)",
      geopoliticalStabilityScore: 84,
      timezoneEffect: {
        marketHours: "Euronext Amsterdam (09:00 - 17:30 CET) & US (09:30 - 16:00 EST)",
        overlapImpact: "Dual-listed price action arbitrage window during 14:30 - 17:30 European time."
      }
    },
    valuation: {
      peRatio: 38.0,
      pegRatio: 1.5,
      revenueGrowthYoY: "22%",
      analystConsensus: "Strong Buy",
      targetBasePrice: 850.00,
      targetBullPrice: 1020.00,
      targetBearPrice: 610.00
    }
  }
];
