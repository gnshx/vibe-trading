# ⚡ Vibe Trading Engine (Live Search & Synthesis)

**Deep Corporate & Geopolitical Research Platform powered by Real-Time Live Market Data & News**

Vibe Trading is an AI-synthesized research dashboard that performs real-time live analysis of **any company in the world**. Search any ticker or company name to fetch live stock prices, news headlines, catalyst events, corporate tie-ups, geopolitical risk, and dynamic 24-month value predictions.

---

## 🎯 Features

| Module | Description |
|---|---|
| **Live Global Search** | Search ANY stock ticker or company worldwide (e.g. `AAPL`, `NVDA`, `TSLA`, `RELIANCE`, `TCS`, `AMD`, `AIRBUS`, `SONY`) |
| **Real-Time Market Data** | Fetches live market quotes, P/E ratios, market caps, and exchange time zones in real time |
| **Live News Sentiment Analysis** | Analyzes live news headlines & publishers to calculate the Net Vibe Score (0–100) and Media Buzz index |
| **Catalyst Events & Timeline** | Dynamically extracts earnings call dates and recent market news into short-term (Days) and long-term (Years) event horizons |
| **Corporate Tie-Ups & Geopolitics** | Maps strategic operational alliances, regulatory compliance risk, and country leadership alignment |
| **Dynamic Value Prediction Engine** | Synthesizes live market sentiment, catalyst impact, and geopolitical stability into projected price targets with scenario controls |

---

## 🏗️ Tech Stack

- **Frontend**: React 18 + Vite 6
- **Live Data Engines**: Yahoo Finance Public API + Finnhub API Client (`src/services/liveResearchEngine.js`)
- **Styling**: Tailwind CSS 3.4 (Dark mode, glassmorphism)
- **Charts**: Recharts (Interactive area charts)
- **Icons**: Lucide React
- **Testing**: Vitest

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/VIBE-TRADING.git
cd VIBE-TRADING

# Install dependencies
npm install

# Start development server
npm run dev
```

---

## 📂 Project Structure

```
VIBE-TRADING/
├── public/
│   └── favicon.svg              # Vibe Trading logo mark
├── src/
│   ├── components/
│   │   ├── CompanySearch.jsx     # Live search input & real-time autocomplete
│   │   ├── EventsTimeline.jsx   # Catalyst events timeline
│   │   ├── Header.jsx           # Nav header with live symbol dropdown
│   │   ├── Logo.jsx             # SVG logo component
│   │   ├── TieUpGeopoliticsMap.jsx  # Tie-ups & country leader analysis
│   │   ├── ValuationPredictionChart.jsx  # Recharts prediction engine
│   │   └── VibeScoreCard.jsx    # Reputation & vibe index card
│   ├── data/
│   │   └── companyDatabase.js   # Dynamic ticker registry
│   ├── services/
│   │   ├── finnhubApi.js        # Core Finnhub API client
│   │   ├── liveResearchEngine.js# Live real-time market search & news synthesizer
│   │   ├── eventTracker.js      # Catalyst impact scoring
│   │   ├── geopoliticalService.js  # Geo-stability & leader alignment
│   │   ├── reputationService.js # Live news sentiment & vibe score calculation
│   │   └── valuationPredictor.js  # Dynamic price target prediction engine
│   ├── tests/
│   │   ├── eventTracker.test.js
│   │   ├── reputationService.test.js
│   │   └── valuationPredictor.test.js
│   ├── App.jsx                  # Live research application shell
│   ├── index.css                # Global styles
│   └── main.jsx                 # React entry point
├── index.html
├── tailwind.config.js
├── vite.config.js
└── package.json
```

---

## 🔒 Security & Data

- **100% Real-Time & Dynamic** — Zero hardcoded static company database.
- **Zero Secret Key Leaks** — All API calls are client-side public queries or user-configured localStorage keys.
- `.env` files are gitignored as a precaution.

---

## 📝 License

This project is for educational and research purposes only. The Vibe Score model is proprietary and not intended for actual financial trading decisions.

---

**Built with ❤️ using React, Vite & Tailwind CSS**
