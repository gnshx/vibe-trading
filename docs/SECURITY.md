# Security & Environment Architecture (`SECURITY.md`)

## 🛡️ Zero-Hardcoded-Secret Policy

The **Global Impact Intelligence Platform** enforces a strict **Zero-Hardcoded-Secret Policy**. 

1. **Zero Exposure:** No private API keys, client secrets, database credentials, or access tokens exist in the source code or git history.
2. **Client-Side Key Isolation:** Any user-supplied tokens (e.g. optional Finnhub API tokens) are retained strictly in client browser `localStorage` (`window.localStorage.getItem('finnhub_token')`).
3. **Public API Connectors:** Outbound data ingestion uses CORS-enabled public REST feeds (e.g., Yahoo Finance Search/Quote APIs) wrapped in an `AbortController` timeout circuit breaker (`1200ms`).

---

## ⚡ Threat Model & Resilience

* **CORS & Rate-Limit Shield:** Network requests execute through an `AbortController` fallback pipeline to prevent client hanging during public API throttling.
* **Input Sanitization:** User query inputs are sanitized against SQLi and XSS injection vectors before parsing.
* **Deterministic Verification:** Empirical benchmarks run locally via `npm run benchmark` with zero external remote network dependencies.
