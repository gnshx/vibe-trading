/**
 * Finnhub API Client - Fetches real-time company data, news, financials, and recommendations.
 * API key is stored in localStorage only (never in code).
 * Free tier: 60 calls/minute — https://finnhub.io/register
 */

const BASE = 'https://finnhub.io/api/v1';

function getApiKey() {
  return localStorage.getItem('finnhub_api_key') || '';
}

export function hasApiKey() {
  return !!getApiKey();
}

export function setApiKey(key) {
  localStorage.setItem('finnhub_api_key', key.trim());
}

export function clearApiKey() {
  localStorage.removeItem('finnhub_api_key');
}

async function fetchFinnhub(endpoint, params = {}) {
  const token = getApiKey();
  if (!token) throw new Error('No API key configured');

  const url = new URL(`${BASE}${endpoint}`);
  url.searchParams.set('token', token);
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));

  const res = await fetch(url.toString());
  if (res.status === 401) throw new Error('Invalid API key');
  if (res.status === 429) throw new Error('Rate limit exceeded. Wait a moment.');
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

/** Search for company symbols by name or ticker */
export async function searchSymbol(query) {
  const data = await fetchFinnhub('/search', { q: query });
  // Filter to stocks only (not crypto, forex)
  return (data.result || []).filter(
    (r) => r.type === 'Common Stock' || r.type === 'ADR' || r.type === 'ETP'
  ).slice(0, 12);
}

/** Get company profile (name, country, exchange, industry, logo, market cap) */
export async function getCompanyProfile(symbol) {
  return fetchFinnhub('/stock/profile2', { symbol });
}

/** Get real-time stock quote */
export async function getQuote(symbol) {
  return fetchFinnhub('/quote', { symbol });
}

/** Get company news (last 30 days by default) */
export async function getCompanyNews(symbol, daysBack = 30) {
  const to = new Date().toISOString().split('T')[0];
  const from = new Date(Date.now() - daysBack * 86400000).toISOString().split('T')[0];
  return fetchFinnhub('/company-news', { symbol, from, to });
}

/** Get basic financial metrics (PE, 52-week range, beta, etc.) */
export async function getBasicFinancials(symbol) {
  return fetchFinnhub('/stock/metric', { symbol, metric: 'all' });
}

/** Get analyst recommendation trends (buy/hold/sell) */
export async function getRecommendations(symbol) {
  return fetchFinnhub('/stock/recommendation', { symbol });
}

/** Get peer/related companies */
export async function getPeers(symbol) {
  return fetchFinnhub('/stock/peers', { symbol });
}

/** Fetch ALL research data for a company in parallel */
export async function fetchFullCompanyResearch(symbol) {
  const [profile, quote, news, financials, recommendations, peers] = await Promise.all([
    getCompanyProfile(symbol).catch(() => null),
    getQuote(symbol).catch(() => null),
    getCompanyNews(symbol, 30).catch(() => []),
    getBasicFinancials(symbol).catch(() => null),
    getRecommendations(symbol).catch(() => []),
    getPeers(symbol).catch(() => []),
  ]);

  if (!profile || !profile.name) {
    throw new Error(`No data found for symbol: ${symbol}`);
  }

  return { symbol, profile, quote, news, financials, recommendations, peers };
}
