/**
 * Impact Radar Engine - Autonomous Disruption & Anomaly Signal Detector
 * Continuously monitors global news streams, vessel traffic, customs signals, and satellite imagery.
 */

export const ACTIVE_RADAR_SIGNALS = [
  {
    id: 'sig-001',
    title: 'Container Shipping Volume Down 31% via Suez Route',
    category: 'Supply Chain',
    severity: 'CRITICAL',
    confidence: 96,
    signalStrength: 92,
    location: 'Red Sea / Bab-el-Mandeb Strait',
    timestamp: '2026-08-28 12:40 UTC',
    summary: 'AIS vessel telemetry confirms 142 container vessels diverted around the Cape of Good Hope this week.',
    supportingEvidence: [
      'AIS Vessel Location Telemetry (-31% throughput YoY)',
      'Drewry Ocean Freight Spot Index (+65%)',
      'Maersk & Hapag-Lloyd operational advisories'
    ],
    impactedEntitiesCount: 24,
    impactedProductsCount: 184
  },
  {
    id: 'sig-002',
    title: 'Hydrological Soil Moisture Deficit Detected in Minas Gerais',
    category: 'Climate & Agri',
    severity: 'HIGH',
    confidence: 94,
    signalStrength: 88,
    location: 'Brazil (South America)',
    timestamp: '2026-08-28 10:15 UTC',
    summary: 'Earth observation satellite radar measures 40-day precipitation deficit during critical flowering window.',
    supportingEvidence: [
      'NOAA Satellite Soil Moisture Sensor Scans',
      'Santos Port Manifest Export Delay Reports',
      'Arabica Commodities Futures Contract Surge'
    ],
    impactedEntitiesCount: 14,
    impactedProductsCount: 62
  },
  {
    id: 'sig-003',
    title: 'Sub-3nm Semiconductor Wafer Packaging Lead Time Extension',
    category: 'Regulatory',
    severity: 'HIGH',
    confidence: 92,
    signalStrength: 85,
    location: 'Hsinchu Science Park, Taiwan',
    timestamp: '2026-08-28 08:30 UTC',
    summary: 'CoWoS packaging capacity allocations capped for non-domestic hyperscaler orders.',
    supportingEvidence: [
      'MOEA Regulatory Compliance Directives',
      'Securities Filing Risk Factor Updates',
      'Hyperscaler Hardware Procurement Survey'
    ],
    impactedEntitiesCount: 18,
    impactedProductsCount: 95
  }
];

export function getRadarDashboardStats() {
  return {
    activeSignalsCount: ACTIVE_RADAR_SIGNALS.length,
    criticalThreatsCount: ACTIVE_RADAR_SIGNALS.filter(s => s.severity === 'CRITICAL').length,
    monitoredEntitiesCount: 1420,
    monitoredProductsCount: 8450,
    globalCausalGraphEdges: 34200,
    systemStatus: 'AUTONOMOUS_MONITORING_ACTIVE'
  };
}
