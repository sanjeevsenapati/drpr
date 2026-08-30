import React, { useState } from 'react';
import { Server, Shield, Database, Cpu, ArrowRight, Table, Maximize2, Layers, CheckCircle2 } from 'lucide-react';

export default function MnaDiagram({ onSelectComponent }) {
  const [activeTab, setActiveTab] = useState('INTERACTIVE'); // 'INTERACTIVE' | 'COMPARISON' | 'ORIGINAL_SVG'
  const [hoveredZone, setHoveredZone] = useState(null);

  // Single-Node vs Multi-Node Comparison Data extracted from MNA.svg
  const comparisonData = [
    {
      category: 'Deployment',
      singleNode: 'Everything runs on one server (Monolithic single point of failure).',
      multiNode: 'Components distributed across multiple independent servers/nodes.',
      status: 'HIGH AVAILABILITY'
    },
    {
      category: 'Scalability',
      singleNode: 'Limited (Vertical CPU/RAM scale-up only).',
      multiNode: 'High (Horizontal scale-out with dynamic auto-scaling nodes).',
      status: 'UNLIMITED HORIZONTAL'
    },
    {
      category: 'Performance Under Load',
      singleNode: 'Slows down quickly under high transaction volumes.',
      multiNode: 'Load distributed across node clusters -> optimal low latency.',
      status: 'HIGH THROUGHPUT'
    },
    {
      category: 'Fault Tolerance',
      singleNode: 'No redundancy; any single failure causes full outage.',
      multiNode: 'High redundancy; one node failure does not impact overall service.',
      status: 'ZERO DOWNTIME'
    },
    {
      category: 'Availability',
      singleNode: 'Low; downtime required during patches or server failures.',
      multiNode: 'High; supports 99.999% HA, instant failover, rolling updates.',
      status: 'ENTERPRISE 5-NINES'
    },
    {
      category: 'Maintenance',
      singleNode: 'Simple setup but requires scheduled complete maintenance downtime.',
      multiNode: 'Rolling node upgrades without taking down the payment gateway.',
      status: 'ZERO MAINTENANCE WINDOW'
    },
    {
      category: 'Security',
      singleNode: 'Single security boundary.',
      multiNode: 'Isolated micro-segmented zones (DMZ, Corp Zone, DLT, NPCI).',
      status: 'MICRO-SEGMENTED'
    }
  ];

  return (
    <div className="mna-diagram-container" style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', background: 'var(--svg-canvas-bg)', color: 'var(--text-main)' }}>
      {/* Sub-Header Toolbar for MNA Views */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 24px', background: 'rgba(15, 23, 42, 0.6)', borderBottom: '1px solid var(--border-card)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(16, 185, 129, 0.12)', border: '1px solid var(--accent-pr)', padding: '4px 10px', borderRadius: '6px' }}>
            <Layers size={15} color="var(--accent-pr)" />
            <span style={{ fontSize: '0.8rem', fontWeight: 700, fontFamily: 'Outfit', color: 'var(--accent-pr)' }}>
              MULTI-NODE ARCHITECTURE (MNA)
            </span>
          </div>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            High-Performance Distributed RTSP Architecture (RTSP GW ➔ DMZ ➔ Corp Zone ➔ NPCI/RBI DLT)
          </span>
        </div>

        {/* View Switcher Tabs */}
        <div style={{ display: 'flex', background: 'var(--svg-pill-bg)', padding: '3px', borderRadius: '8px', border: '1px solid var(--border-card)' }}>
          <button
            onClick={() => setActiveTab('INTERACTIVE')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '5px 12px',
              borderRadius: '6px',
              border: 'none',
              fontSize: '0.75rem',
              fontWeight: 600,
              cursor: 'pointer',
              background: activeTab === 'INTERACTIVE' ? 'var(--accent-dr)' : 'transparent',
              color: activeTab === 'INTERACTIVE' ? '#ffffff' : 'var(--text-muted)',
              transition: 'all 0.2s ease'
            }}
          >
            <Cpu size={13} /> Interactive Architecture
          </button>

          <button
            onClick={() => setActiveTab('COMPARISON')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '5px 12px',
              borderRadius: '6px',
              border: 'none',
              fontSize: '0.75rem',
              fontWeight: 600,
              cursor: 'pointer',
              background: activeTab === 'COMPARISON' ? 'var(--accent-amber)' : 'transparent',
              color: activeTab === 'COMPARISON' ? '#ffffff' : 'var(--text-muted)',
              transition: 'all 0.2s ease'
            }}
          >
            <Table size={13} /> Single vs Multi-Node Matrix
          </button>

          <button
            onClick={() => setActiveTab('ORIGINAL_SVG')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '5px 12px',
              borderRadius: '6px',
              border: 'none',
              fontSize: '0.75rem',
              fontWeight: 600,
              cursor: 'pointer',
              background: activeTab === 'ORIGINAL_SVG' ? 'var(--accent-pr)' : 'transparent',
              color: activeTab === 'ORIGINAL_SVG' ? '#ffffff' : 'var(--text-muted)',
              transition: 'all 0.2s ease'
            }}
          >
            <Maximize2 size={13} /> Original MNA.svg Diagram
          </button>
        </div>
      </div>

      {/* TAB CONTENT 1: INTERACTIVE MNA CANVAS */}
      {activeTab === 'INTERACTIVE' && (
        <div className="svg-canvas-container" style={{ flex: 1, padding: '16px', overflow: 'auto', display: 'flex', justifyContent: 'center' }}>
          <svg viewBox="0 0 1400 760" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" style={{ overflow: 'visible', maxHeight: 'calc(100vh - 140px)' }}>
            <defs>
              <marker id="arrow-mna-green" viewBox="0 0 4 4" refX="4" refY="2" markerWidth="3" markerHeight="3" orient="auto-start-reverse">
                <path d="M 0 0 L 4 2 L 0 4 z" fill="var(--accent-pr)" />
              </marker>
              <marker id="arrow-mna-blue" viewBox="0 0 4 4" refX="4" refY="2" markerWidth="3" markerHeight="3" orient="auto-start-reverse">
                <path d="M 0 0 L 4 2 L 0 4 z" fill="var(--accent-dr)" />
              </marker>
              <marker id="arrow-mna-amber" viewBox="0 0 4 4" refX="4" refY="2" markerWidth="3" markerHeight="3" orient="auto-start-reverse">
                <path d="M 0 0 L 4 2 L 0 4 z" fill="var(--accent-amber)" />
              </marker>
            </defs>

            {/* ZONE 1: PUBLIC / MERCHANT ECOSYSTEM (LEFT, X=20..220) */}
            <g transform="translate(20, 40)" onMouseEnter={() => setHoveredZone('MERCHANT')}>
              <rect width="200" height="680" rx="14" fill="rgba(59, 130, 246, 0.04)" stroke="var(--accent-dr)" strokeWidth="1.5" strokeDasharray="6 3" />
              <rect x="25" y="10" width="150" height="24" rx="6" fill="var(--accent-dr)" />
              <text x="100" y="26" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="700" fontFamily="Inter">
                MERCHANT & APP ZONE
              </text>

              {/* Mobile App */}
              <g transform="translate(15, 55)" style={{ cursor: 'pointer' }} onClick={() => onSelectComponent({ name: 'e-Rupee Mobile App', type: 'Public Consumer App' })}>
                <rect width="170" height="48" rx="8" fill="var(--svg-card-bg)" stroke="var(--accent-dr)" strokeWidth="1.2" />
                <text x="15" y="22" fill="var(--svg-card-title)" fontSize="11" fontWeight="700" fontFamily="Outfit">📱 e-Rupee App</text>
                <text x="15" y="36" fill="var(--svg-card-sub)" fontSize="8.5" fontFamily="JetBrains Mono">iOS & Android Clients</text>
              </g>

              {/* Merchant Portal */}
              <g transform="translate(15, 115)" style={{ cursor: 'pointer' }} onClick={() => onSelectComponent({ name: 'Merchant Web Portal', type: 'Public Merchant Web' })}>
                <rect width="170" height="48" rx="8" fill="var(--svg-card-bg)" stroke="var(--accent-dr)" strokeWidth="1.2" />
                <text x="15" y="22" fill="var(--svg-card-title)" fontSize="11" fontWeight="700" fontFamily="Outfit">🛍️ Merchant Web</text>
                <text x="15" y="36" fill="var(--svg-card-sub)" fontSize="8.5" fontFamily="JetBrains Mono">merchanterupee.sbi</text>
              </g>

              {/* POS Terminals */}
              <g transform="translate(15, 175)" style={{ cursor: 'pointer' }} onClick={() => onSelectComponent({ name: 'POS Terminals', type: 'Point of Sale Terminals' })}>
                <rect width="170" height="45" rx="8" fill="var(--svg-card-bg)" stroke="var(--svg-card-stroke)" strokeWidth="1" />
                <text x="15" y="22" fill="var(--svg-card-title)" fontSize="10.5" fontWeight="700" fontFamily="Outfit">💳 POS Terminals</text>
                <text x="15" y="35" fill="var(--svg-card-sub)" fontSize="8" fontFamily="JetBrains Mono">Acquiring Merchant POS</text>
              </g>

              {/* Online Merchants */}
              <g transform="translate(15, 230)" style={{ cursor: 'pointer' }} onClick={() => onSelectComponent({ name: 'Online E-Commerce Merchants', type: 'Web SDK Gateway' })}>
                <rect width="170" height="45" rx="8" fill="var(--svg-card-bg)" stroke="var(--svg-card-stroke)" strokeWidth="1" />
                <text x="15" y="22" fill="var(--svg-card-title)" fontSize="10.5" fontWeight="700" fontFamily="Outfit">🛒 E-Com Merchants</text>
                <text x="15" y="35" fill="var(--svg-card-sub)" fontSize="8" fontFamily="JetBrains Mono">E-Rupee Payment SDK</text>
              </g>

              {/* Individual Merchants */}
              <g transform="translate(15, 285)" style={{ cursor: 'pointer' }} onClick={() => onSelectComponent({ name: 'Individual Merchant QR', type: 'Merchant QR Payments' })}>
                <rect width="170" height="45" rx="8" fill="var(--svg-card-bg)" stroke="var(--svg-card-stroke)" strokeWidth="1" />
                <text x="15" y="22" fill="var(--svg-card-title)" fontSize="10.5" fontWeight="700" fontFamily="Outfit">🏪 Individual Merchants</text>
                <text x="15" y="35" fill="var(--svg-card-sub)" fontSize="8" fontFamily="JetBrains Mono">Static & Dynamic QR</text>
              </g>
            </g>

            {/* ZONE 2: DMZ & EDGE SECURITY (X=250..470) */}
            <g transform="translate(250, 40)" onMouseEnter={() => setHoveredZone('DMZ')}>
              <rect width="220" height="680" rx="14" fill="rgba(245, 158, 11, 0.04)" stroke="var(--accent-amber)" strokeWidth="1.5" strokeDasharray="6 3" />
              <rect x="45" y="10" width="130" height="24" rx="6" fill="var(--accent-amber)" />
              <text x="110" y="26" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="700" fontFamily="Inter">
                DMZ & EDGE LAYER
              </text>

              {/* Edge WAF */}
              <g transform="translate(15, 55)" style={{ cursor: 'pointer' }} onClick={() => onSelectComponent({ name: 'Web Application Firewall (WAF)', type: 'Edge Security & DDoS Shield' })}>
                <rect width="190" height="50" rx="8" fill="var(--svg-card-bg)" stroke="var(--accent-amber)" strokeWidth="1.5" />
                <text x="15" y="22" fill="var(--svg-card-title)" fontSize="11" fontWeight="700" fontFamily="Outfit">🛡️ Edge WAF Cluster</text>
                <text x="15" y="37" fill="var(--accent-amber)" fontSize="8.5" fontFamily="JetBrains Mono">DDoS Shield & Bot Filter</text>
              </g>

              {/* NGINX Web Server / LB DMZ */}
              <g transform="translate(15, 125)" style={{ cursor: 'pointer' }} onClick={() => onSelectComponent({ name: 'NGINX Reverse Proxy / LB DMZ', type: 'DMZ Reverse Proxy & SSL Offloader' })}>
                <rect width="190" height="55" rx="8" fill="var(--svg-card-bg)" stroke="var(--accent-amber)" strokeWidth="1.5" />
                <text x="15" y="22" fill="var(--svg-card-title)" fontSize="11" fontWeight="700" fontFamily="Outfit">⚡ NGINX / LB DMZ</text>
                <text x="15" y="36" fill="var(--svg-card-sub)" fontSize="8.5" fontFamily="JetBrains Mono">SSL Termination & Proxy</text>
                <text x="15" y="48" fill="var(--accent-pr)" fontSize="7.5" fontWeight="700" fontFamily="Inter">Multi-Node Round Robin</text>
              </g>

              {/* APP GW */}
              <g transform="translate(15, 200)" style={{ cursor: 'pointer' }} onClick={() => onSelectComponent({ name: 'App Gateway (APP GW)', type: 'API Rate Limiting & Auth Proxy' })}>
                <rect width="190" height="50" rx="8" fill="var(--svg-card-bg)" stroke="var(--accent-amber)" strokeWidth="1.5" />
                <text x="15" y="22" fill="var(--svg-card-title)" fontSize="11" fontWeight="700" fontFamily="Outfit">🌐 APP GW (Api Gateway)</text>
                <text x="15" y="37" fill="var(--svg-card-sub)" fontSize="8.5" fontFamily="JetBrains Mono">OAuth2 & Token Validation</text>
              </g>
            </g>

            {/* ZONE 3: RTSP CORE MULTI-NODE GW (X=500..880) */}
            <g transform="translate(500, 40)" onMouseEnter={() => setHoveredZone('RTSP_GW')}>
              <rect width="380" height="680" rx="14" fill="rgba(16, 185, 129, 0.04)" stroke="var(--accent-pr)" strokeWidth="1.5" strokeDasharray="6 3" />
              <rect x="80" y="10" width="220" height="24" rx="6" fill="var(--accent-pr)" />
              <text x="190" y="26" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="700" fontFamily="Inter">
                RTSP GW (MULTI-NODE CLUSTER)
              </text>

              {/* Multi-Node Microservices Sub-Box */}
              <g transform="translate(15, 50)">
                <rect width="350" height="260" rx="10" fill="var(--svg-card-bg)" stroke="var(--accent-pr)" strokeWidth="1.5" />
                <text x="15" y="22" fill="var(--accent-pr)" fontSize="11" fontWeight="700" fontFamily="Inter">⚡ Microservice Node Clusters (Horizontal Scale)</text>

                {/* Node Row 1 */}
                <g transform="translate(12, 34)">
                  <rect width="102" height="60" rx="6" fill="var(--svg-pill-bg)" stroke="var(--accent-pr)" strokeWidth="1" />
                  <text x="10" y="20" fill="var(--svg-pill-text)" fontSize="10" fontWeight="700" fontFamily="Outfit">📱 RTSP APP</text>
                  <text x="10" y="34" fill="var(--accent-pr)" fontSize="8" fontFamily="JetBrains Mono">Nodes: 8 (Active)</text>
                  <text x="10" y="48" fill="var(--svg-card-sub)" fontSize="7.5" fontFamily="Inter">Java / Springboot</text>
                </g>

                <g transform="translate(124, 34)">
                  <rect width="102" height="60" rx="6" fill="var(--svg-pill-bg)" stroke="var(--accent-pr)" strokeWidth="1" />
                  <text x="10" y="20" fill="var(--svg-pill-text)" fontSize="10" fontWeight="700" fontFamily="Outfit">🪙 MinT Node</text>
                  <text x="10" y="34" fill="var(--accent-pr)" fontSize="8" fontFamily="JetBrains Mono">Nodes: 6 (Active)</text>
                  <text x="10" y="48" fill="var(--svg-card-sub)" fontSize="7.5" fontFamily="Inter">Digital Minting</text>
                </g>

                <g transform="translate(236, 34)">
                  <rect width="102" height="60" rx="6" fill="var(--svg-pill-bg)" stroke="var(--accent-pr)" strokeWidth="1" />
                  <text x="10" y="20" fill="var(--svg-pill-text)" fontSize="10" fontWeight="700" fontFamily="Outfit">🏦 BIG Node</text>
                  <text x="10" y="34" fill="var(--accent-pr)" fontSize="8" fontFamily="JetBrains Mono">Nodes: 6 (Active)</text>
                  <text x="10" y="48" fill="var(--svg-card-sub)" fontSize="7.5" fontFamily="Inter">Bank Interface</text>
                </g>

                {/* Node Row 2 */}
                <g transform="translate(12, 106)">
                  <rect width="102" height="60" rx="6" fill="var(--svg-pill-bg)" stroke="var(--svg-pill-stroke)" />
                  <text x="10" y="20" fill="var(--svg-pill-text)" fontSize="10" fontWeight="700" fontFamily="Outfit">💻 AppBackend</text>
                  <text x="10" y="34" fill="var(--text-muted)" fontSize="8" fontFamily="JetBrains Mono">Nodes: 4 (Active)</text>
                  <text x="10" y="48" fill="var(--svg-card-sub)" fontSize="7.5" fontFamily="Inter">Core Logic</text>
                </g>

                <g transform="translate(124, 106)">
                  <rect width="102" height="60" rx="6" fill="var(--svg-pill-bg)" stroke="var(--svg-pill-stroke)" />
                  <text x="10" y="20" fill="var(--svg-pill-text)" fontSize="10" fontWeight="700" fontFamily="Outfit">📊 Admin Portal</text>
                  <text x="10" y="34" fill="var(--text-muted)" fontSize="8" fontFamily="JetBrains Mono">Nodes: 2 (Active)</text>
                  <text x="10" y="48" fill="var(--svg-card-sub)" fontSize="7.5" fontFamily="Inter">Operations</text>
                </g>

                <g transform="translate(236, 106)">
                  <rect width="102" height="60" rx="6" fill="var(--svg-pill-bg)" stroke="var(--svg-pill-stroke)" />
                  <text x="10" y="20" fill="var(--svg-pill-text)" fontSize="10" fontWeight="700" fontFamily="Outfit">⚙️ TOMAS APP</text>
                  <text x="10" y="34" fill="var(--text-muted)" fontSize="8" fontFamily="JetBrains Mono">Nodes: 4 (Active)</text>
                  <text x="10" y="48" fill="var(--svg-card-sub)" fontSize="7.5" fontFamily="Inter">Token Mgmt</text>
                </g>

                {/* Middleware Cluster inside RTSP GW */}
                <g transform="translate(12, 178)">
                  <rect width="326" height="70" rx="8" fill="rgba(15, 23, 42, 0.9)" stroke="var(--accent-amber)" strokeWidth="1" />
                  <text x="12" y="18" fill="var(--accent-amber)" fontSize="9.5" fontWeight="700" fontFamily="Inter">📦 Shared Event Stream & In-Memory Cache</text>
                  
                  <g transform="translate(10, 26)">
                    <rect width="95" height="34" rx="4" fill="var(--svg-pill-bg)" stroke="var(--accent-amber)" strokeWidth="1" />
                    <text x="47.5" y="16" textAnchor="middle" fill="var(--svg-pill-text)" fontSize="9" fontWeight="700" fontFamily="Outfit">📨 KAFKA Cluster</text>
                    <text x="47.5" y="27" textAnchor="middle" fill="var(--svg-card-sub)" fontSize="7.5" fontFamily="JetBrains Mono">3-Node Queue</text>
                  </g>

                  <g transform="translate(115, 26)">
                    <rect width="95" height="34" rx="4" fill="var(--svg-pill-bg)" stroke="var(--accent-amber)" strokeWidth="1" />
                    <text x="47.5" y="16" textAnchor="middle" fill="var(--svg-pill-text)" fontSize="9" fontWeight="700" fontFamily="Outfit">⚡ REDIS Cache</text>
                    <text x="47.5" y="27" textAnchor="middle" fill="var(--svg-card-sub)" fontSize="7.5" fontFamily="JetBrains Mono">In-Memory HA</text>
                  </g>

                  <g transform="translate(220, 26)">
                    <rect width="95" height="34" rx="4" fill="var(--svg-pill-bg)" stroke="var(--accent-amber)" strokeWidth="1" />
                    <text x="47.5" y="16" textAnchor="middle" fill="var(--svg-pill-text)" fontSize="9" fontWeight="700" fontFamily="Outfit">🔒 ABAS Attest</text>
                    <text x="47.5" y="27" textAnchor="middle" fill="var(--svg-card-sub)" fontSize="7.5" fontFamily="JetBrains Mono">Security Attest</text>
                  </g>
                </g>
              </g>

              {/* Database Cluster Sub-Box */}
              <g transform="translate(15, 325)">
                <rect width="350" height="110" rx="10" fill="var(--svg-card-bg)" stroke="var(--accent-amber)" strokeWidth="1.5" />
                <text x="15" y="22" fill="var(--accent-amber)" fontSize="11" fontWeight="700" fontFamily="Inter">🗄️ Multi-Node Oracle Database Tier</text>

                {/* RTSP Master DB */}
                <g transform="translate(12, 32)">
                  <rect width="158" height="66" rx="6" fill="var(--svg-pill-bg)" stroke="var(--accent-pr)" strokeWidth="1.2" />
                  <text x="12" y="20" fill="var(--svg-pill-text)" fontSize="10" fontWeight="700" fontFamily="Outfit">cbdc-rtsp-db (Master)</text>
                  <text x="12" y="34" fill="var(--accent-pr)" fontSize="8.5" fontWeight="700" fontFamily="Inter">READ / WRITE CLUSTER</text>
                  <text x="12" y="48" fill="var(--svg-card-sub)" fontSize="7.5" fontFamily="JetBrains Mono">Oracle Real Application Cluster</text>
                </g>

                {/* TOMAS Master DB */}
                <g transform="translate(180, 32)">
                  <rect width="158" height="66" rx="6" fill="var(--svg-pill-bg)" stroke="var(--accent-pr)" strokeWidth="1.2" />
                  <text x="12" y="20" fill="var(--svg-pill-text)" fontSize="10" fontWeight="700" fontFamily="Outfit">tomas-db (Master)</text>
                  <text x="12" y="34" fill="var(--accent-pr)" fontSize="8.5" fontWeight="700" fontFamily="Inter">READ / WRITE CLUSTER</text>
                  <text x="12" y="48" fill="var(--svg-card-sub)" fontSize="7.5" fontFamily="JetBrains Mono">Token Ledger Store</text>
                </g>
              </g>
            </g>

            {/* ZONE 4: BANK CORP ZONE & INTERNAL SUBSYSTEMS (X=910..1160) */}
            <g transform="translate(910, 40)" onMouseEnter={() => setHoveredZone('CORP_ZONE')}>
              <rect width="240" height="680" rx="14" fill="rgba(147, 51, 234, 0.04)" stroke="#9333ea" strokeWidth="1.5" strokeDasharray="6 3" />
              <rect x="40" y="10" width="160" height="24" rx="6" fill="#9333ea" />
              <text x="120" y="26" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="700" fontFamily="Inter">
                BANK CORP ZONE & SUBSYSTEMS
              </text>

              {/* Subsystem Cards */}
              <g transform="translate(15, 50)" style={{ cursor: 'pointer' }} onClick={() => onSelectComponent({ name: 'CBS (Core Banking System)', type: 'Bank Core Banking System' })}>
                <rect width="210" height="42" rx="6" fill="var(--svg-card-bg)" stroke="#9333ea" strokeWidth="1.2" />
                <text x="12" y="20" fill="var(--svg-card-title)" fontSize="10.5" fontWeight="700" fontFamily="Outfit">🏦 CBS (Core Banking)</text>
                <text x="12" y="33" fill="var(--svg-card-sub)" fontSize="8" fontFamily="JetBrains Mono">Account Debit / Credit API</text>
              </g>

              <g transform="translate(15, 100)" style={{ cursor: 'pointer' }} onClick={() => onSelectComponent({ name: 'Bank Middleware', type: 'ESB / Enterprise Service Bus' })}>
                <rect width="210" height="42" rx="6" fill="var(--svg-card-bg)" stroke="#9333ea" strokeWidth="1.2" />
                <text x="12" y="20" fill="var(--svg-card-title)" fontSize="10.5" fontWeight="700" fontFamily="Outfit">🔄 Bank Middleware (ESB)</text>
                <text x="12" y="33" fill="var(--svg-card-sub)" fontSize="8" fontFamily="JetBrains Mono">Enterprise Integration Bus</text>
              </g>

              <g transform="translate(15, 150)" style={{ cursor: 'pointer' }} onClick={() => onSelectComponent({ name: 'Acquiring Subsystem', type: 'Merchant Acquiring System' })}>
                <rect width="210" height="42" rx="6" fill="var(--svg-card-bg)" stroke="var(--svg-card-stroke)" strokeWidth="1" />
                <text x="12" y="20" fill="var(--svg-card-title)" fontSize="10.5" fontWeight="700" fontFamily="Outfit">🏬 Acquiring Subsystem</text>
                <text x="12" y="33" fill="var(--svg-card-sub)" fontSize="8" fontFamily="JetBrains Mono">Merchant Settlement API</text>
              </g>

              <g transform="translate(15, 200)" style={{ cursor: 'pointer' }} onClick={() => onSelectComponent({ name: 'DCMS (Debit Card Management)', type: 'Card Management System' })}>
                <rect width="210" height="42" rx="6" fill="var(--svg-card-bg)" stroke="var(--svg-card-stroke)" strokeWidth="1" />
                <text x="12" y="20" fill="var(--svg-card-title)" fontSize="10.5" fontWeight="700" fontFamily="Outfit">💳 DCMS (Card Mgmt)</text>
                <text x="12" y="33" fill="var(--svg-card-sub)" fontSize="8" fontFamily="JetBrains Mono">Debit Card Auth & Mapping</text>
              </g>

              <g transform="translate(15, 250)" style={{ cursor: 'pointer' }} onClick={() => onSelectComponent({ name: 'OTP & SMS Gateway', type: '2FA Auth Service' })}>
                <rect width="210" height="42" rx="6" fill="var(--svg-card-bg)" stroke="var(--svg-card-stroke)" strokeWidth="1" />
                <text x="12" y="20" fill="var(--svg-card-title)" fontSize="10.5" fontWeight="700" fontFamily="Outfit">🔑 OTP / SMS G/W</text>
                <text x="12" y="33" fill="var(--svg-card-sub)" fontSize="8" fontFamily="JetBrains Mono">SMS OTP Delivery</text>
              </g>

              <g transform="translate(15, 300)" style={{ cursor: 'pointer' }} onClick={() => onSelectComponent({ name: 'UPI Gateway', type: 'UPI Payment Switch' })}>
                <rect width="210" height="42" rx="6" fill="var(--svg-card-bg)" stroke="var(--svg-card-stroke)" strokeWidth="1" />
                <text x="12" y="20" fill="var(--svg-card-title)" fontSize="10.5" fontWeight="700" fontFamily="Outfit">⚡ UPI Gateway Switch</text>
                <text x="12" y="33" fill="var(--svg-card-sub)" fontSize="8" fontFamily="JetBrains Mono">Interoperable UPI VPA</text>
              </g>
            </g>

            {/* ZONE 5: NPCI & EXTERNAL REGULATORY NETWORK (X=1180..1380) */}
            <g transform="translate(1180, 40)" onMouseEnter={() => setHoveredZone('EXTERNAL_NET')}>
              <rect width="200" height="680" rx="14" fill="rgba(239, 68, 68, 0.04)" stroke="var(--accent-rose)" strokeWidth="1.5" strokeDasharray="6 3" />
              <rect x="25" y="10" width="150" height="24" rx="6" fill="var(--accent-rose)" />
              <text x="100" y="26" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="700" fontFamily="Inter">
                NPCI & RBI DLT NETWORK
              </text>

              {/* NPCI NET / PSO */}
              <g transform="translate(15, 55)" style={{ cursor: 'pointer' }} onClick={() => onSelectComponent({ name: 'NPCI NET / PSO', type: 'Payment System Operator Network' })}>
                <rect width="170" height="50" rx="8" fill="var(--svg-card-bg)" stroke="var(--accent-rose)" strokeWidth="1.5" />
                <text x="12" y="22" fill="var(--svg-card-title)" fontSize="11" fontWeight="700" fontFamily="Outfit">🌐 NPCI NET (PSO)</text>
                <text x="12" y="37" fill="var(--accent-rose)" fontSize="8.5" fontFamily="JetBrains Mono">National Payment Switch</text>
              </g>

              {/* RBI DTSP NODE */}
              <g transform="translate(15, 125)" style={{ cursor: 'pointer' }} onClick={() => onSelectComponent({ name: 'RBI DTSP Node', type: 'RBI Central Bank Digital Currency Node' })}>
                <rect width="170" height="50" rx="8" fill="var(--svg-card-bg)" stroke="var(--accent-rose)" strokeWidth="1.5" />
                <text x="12" y="22" fill="var(--svg-card-title)" fontSize="11" fontWeight="700" fontFamily="Outfit">🏛️ RBI DTSP NODE</text>
                <text x="12" y="37" fill="var(--svg-card-sub)" fontSize="8.5" fontFamily="JetBrains Mono">Central Bank Token Engine</text>
              </g>

              {/* DLT BLOCKCHAIN NETWORK */}
              <g transform="translate(15, 195)" style={{ cursor: 'pointer' }} onClick={() => onSelectComponent({ name: 'DLT Blockchain Network', type: 'Distributed Ledger Technology' })}>
                <rect width="170" height="50" rx="8" fill="var(--svg-card-bg)" stroke="var(--accent-rose)" strokeWidth="1.5" />
                <text x="12" y="22" fill="var(--svg-card-title)" fontSize="11" fontWeight="700" fontFamily="Outfit">🔗 DLT Network</text>
                <text x="12" y="37" fill="var(--svg-card-sub)" fontSize="8.5" fontFamily="JetBrains Mono">CBDC Consensus Nodes</text>
              </g>
            </g>

            {/* FLOW LINES BETWEEN MNA ZONES */}
            {/* Merchant -> DMZ WAF */}
            <path d="M 220 100 L 250 100" fill="none" stroke="var(--accent-dr)" strokeWidth="1.5" strokeDasharray="4 2" markerEnd="url(#arrow-mna-blue)" />
            {/* DMZ NGINX -> RTSP GW */}
            <path d="M 470 152 L 500 152" fill="none" stroke="var(--accent-amber)" strokeWidth="1.5" strokeDasharray="4 2" markerEnd="url(#arrow-mna-amber)" />
            {/* RTSP GW -> Corp Zone */}
            <path d="M 880 180 L 910 180" fill="none" stroke="var(--accent-pr)" strokeWidth="1.5" strokeDasharray="4 2" markerEnd="url(#arrow-mna-green)" />
            {/* RTSP GW -> NPCI NET */}
            <path d="M 880 100 L 1180 100" fill="none" stroke="var(--accent-rose)" strokeWidth="1.5" strokeDasharray="4 2" markerEnd="url(#arrow-mna-amber)" />
          </svg>
        </div>
      )}

      {/* TAB CONTENT 2: SINGLE vs MULTI-NODE COMPARISON MATRIX */}
      {activeTab === 'COMPARISON' && (
        <div style={{ flex: 1, padding: '24px', overflowY: 'auto' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto', background: 'var(--svg-card-bg)', border: '1px solid var(--border-card)', borderRadius: '12px', padding: '24px' }}>
            <h2 style={{ fontFamily: 'Outfit', fontSize: '1.25rem', fontWeight: 700, marginBottom: '8px', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckCircle2 color="var(--accent-pr)" /> Single-Node vs Multi-Node Architecture Matrix
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
              Comprehensive engineering analysis extracted from <code style={{ fontFamily: 'JetBrains Mono', background: 'var(--svg-pill-bg)', padding: '2px 6px', borderRadius: '4px' }}>MNA.svg</code> detailing why Multi-Node Architecture (MNA) is mandated for mission-critical e-Rupee transactions.
            </p>

            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
              <thead>
                <tr style={{ background: 'var(--svg-pill-bg)', borderBottom: '2px solid var(--border-card)' }}>
                  <th style={{ padding: '12px 16px', color: 'var(--text-main)', fontFamily: 'Outfit', fontWeight: 700 }}>Category</th>
                  <th style={{ padding: '12px 16px', color: 'var(--accent-rose)', fontFamily: 'Outfit', fontWeight: 700 }}>Single-Node Architecture</th>
                  <th style={{ padding: '12px 16px', color: 'var(--accent-pr)', fontFamily: 'Outfit', fontWeight: 700 }}>Multi-Node Architecture (MNA)</th>
                  <th style={{ padding: '12px 16px', color: 'var(--accent-amber)', fontFamily: 'Outfit', fontWeight: 700 }}>MNA Status</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid var(--border-card)', background: idx % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)' }}>
                    <td style={{ padding: '14px 16px', fontWeight: 600, color: 'var(--text-main)' }}>{row.category}</td>
                    <td style={{ padding: '14px 16px', color: 'var(--text-muted)' }}>{row.singleNode}</td>
                    <td style={{ padding: '14px 16px', color: 'var(--text-main)', fontWeight: 500 }}>{row.multiNode}</td>
                    <td style={{ padding: '14px 16px' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, padding: '4px 8px', borderRadius: '4px', background: 'rgba(16, 185, 129, 0.12)', color: 'var(--accent-pr)', border: '1px solid var(--accent-pr)' }}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB CONTENT 3: ORIGINAL DRAW.IO MNA.SVG VECTOR RENDER */}
      {activeTab === 'ORIGINAL_SVG' && (
        <div style={{ flex: 1, padding: '16px', overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ width: '100%', height: '100%', background: '#ffffff', borderRadius: '12px', border: '1px solid var(--border-card)', overflow: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
            <img 
              src="./MNA.svg" 
              alt="Original Draw.io MNA Architecture Diagram" 
              style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} 
            />
          </div>
        </div>
      )}
    </div>
  );
}
