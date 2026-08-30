import React, { useState } from 'react';
import { 
  Layers, 
  Table, 
  Server, 
  Cpu, 
  CheckCircle2, 
  FileText,
  Activity,
  Shield,
  Zap,
  Globe
} from 'lucide-react';

export default function MnaDiagram({ onSelectComponent }) {
  const [activeTab, setActiveTab] = useState('CANVAS'); // 'CANVAS' | 'MATRIX' | 'SPECS'
  const [hoveredNode, setHoveredNode] = useState(null);

  // Single-Node vs Multi-Node Matrix extracted directly from MNA.svg
  const comparisonData = [
    {
      category: 'Deployment',
      singleNode: 'Everything runs on one server.',
      multiNode: 'Components distributed across multiple servers/nodes.',
      status: 'HIGH AVAILABILITY'
    },
    {
      category: 'Scalability',
      singleNode: 'Limited (vertical only).',
      multiNode: 'High (horizontal scaling supported).',
      status: 'UNLIMITED HORIZONTAL'
    },
    {
      category: 'Performance Under Load',
      singleNode: 'Slows down quickly with heavy traffic.',
      multiNode: 'Load distributed across nodes -> better performance.',
      status: 'HIGH THROUGHPUT'
    },
    {
      category: 'Fault Tolerance',
      singleNode: 'No redundancy; failure = full outage.',
      multiNode: 'High redundancy; one node failure does not impact service.',
      status: 'ZERO DOWNTIME'
    },
    {
      category: 'Availability',
      singleNode: 'Low; downtime during failures or maintenance.',
      multiNode: 'High; supports HA, failover, rolling updates.',
      status: 'ENTERPRISE 5-NINES'
    },
    {
      category: 'Maintenance',
      singleNode: 'Easier to manage but causes full downtime.',
      multiNode: 'Complex, but maintenance can be done without downtime.',
      status: 'ROLLING UPDATES'
    },
    {
      category: 'Security',
      singleNode: 'Smaller attack surface.',
      multiNode: 'Larger attack surface; requires stronger security controls.',
      status: 'MICRO-SEGMENTED'
    }
  ];

  // Node allocations specs extracted directly from MNA.svg
  const environmentNodeCounts = [
    { env: 'PRIMARY REGION (PR)', appNodes: 12, webNodes: 4, dbNodes: 3, totalNodes: 19, status: 'ACTIVE (R/W)' },
    { env: 'DISASTER RECOVERY (DR)', appNodes: 12, webNodes: 4, dbNodes: 3, totalNodes: 19, status: 'STANDBY (R/O)' },
    { env: 'UAT1 ENVIRONMENT', appNodes: 12, webNodes: 4, dbNodes: 3, totalNodes: 19, status: 'STAGING' },
    { env: 'UAT2 ENVIRONMENT', appNodes: 12, webNodes: 4, dbNodes: 3, totalNodes: 19, status: 'STAGING' },
    { env: 'UAT3 ENVIRONMENT', appNodes: 4, webNodes: 1, dbNodes: 3, totalNodes: 8, status: 'TESTING' },
    { env: 'UAT4 ENVIRONMENT', appNodes: 4, webNodes: 1, dbNodes: 3, totalNodes: 8, status: 'TESTING' }
  ];

  return (
    <div className="mna-react-container" style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', background: 'var(--svg-canvas-bg)', color: 'var(--text-main)', overflow: 'hidden' }}>
      {/* Top Navbar Toolbar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 20px', background: 'rgba(15, 23, 42, 0.75)', borderBottom: '1px solid var(--border-card)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(16, 185, 129, 0.12)', border: '1px solid var(--accent-pr)', padding: '4px 10px', borderRadius: '6px' }}>
            <Layers size={15} color="var(--accent-pr)" />
            <span style={{ fontSize: '0.8rem', fontWeight: 700, fontFamily: 'Outfit', color: 'var(--accent-pr)' }}>
              MULTI-NODE ARCHITECTURE (MNA.SVG RECREATED)
            </span>
          </div>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            High-Performance Microservice Topology & Cross-Zone Flow Diagram
          </span>
        </div>

        {/* View Selector Tabs */}
        <div style={{ display: 'flex', background: 'var(--svg-pill-bg)', padding: '3px', borderRadius: '8px', border: '1px solid var(--border-card)', gap: '4px' }}>
          <button
            onClick={() => setActiveTab('CANVAS')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              borderRadius: '6px',
              border: 'none',
              fontSize: '0.78rem',
              fontWeight: 700,
              cursor: 'pointer',
              background: activeTab === 'CANVAS' ? 'var(--accent-pr)' : 'transparent',
              color: activeTab === 'CANVAS' ? '#ffffff' : 'var(--text-muted)',
              transition: 'all 0.2s ease'
            }}
          >
            <Cpu size={13} /> Interactive Native Canvas
          </button>

          <button
            onClick={() => setActiveTab('MATRIX')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              borderRadius: '6px',
              border: 'none',
              fontSize: '0.78rem',
              fontWeight: 700,
              cursor: 'pointer',
              background: activeTab === 'MATRIX' ? 'var(--accent-amber)' : 'transparent',
              color: activeTab === 'MATRIX' ? '#ffffff' : 'var(--text-muted)',
              transition: 'all 0.2s ease'
            }}
          >
            <Table size={13} /> Single vs Multi-Node Matrix
          </button>

          <button
            onClick={() => setActiveTab('SPECS')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              borderRadius: '6px',
              border: 'none',
              fontSize: '0.78rem',
              fontWeight: 700,
              cursor: 'pointer',
              background: activeTab === 'SPECS' ? 'var(--accent-dr)' : 'transparent',
              color: activeTab === 'SPECS' ? '#ffffff' : 'var(--text-muted)',
              transition: 'all 0.2s ease'
            }}
          >
            <Server size={13} /> Environment & Node Specs
          </button>
        </div>
      </div>

      {/* TAB CONTENT 1: NATIVE INTERACTIVE SVG CANVAS */}
      {activeTab === 'CANVAS' && (
        <div className="svg-canvas-container" style={{ flex: 1, width: '100%', height: '100%', overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <svg viewBox="0 0 1400 780" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" style={{ overflow: 'visible', maxHeight: 'calc(100vh - 85px)' }}>
            <defs>
              <marker id="mna-arrow-blue" viewBox="0 0 4 4" refX="4" refY="2" markerWidth="3" markerHeight="3" orient="auto-start-reverse">
                <path d="M 0 0 L 4 2 L 0 4 z" fill="var(--accent-dr)" />
              </marker>
              <marker id="mna-arrow-green" viewBox="0 0 4 4" refX="4" refY="2" markerWidth="3" markerHeight="3" orient="auto-start-reverse">
                <path d="M 0 0 L 4 2 L 0 4 z" fill="var(--accent-pr)" />
              </marker>
              <marker id="mna-arrow-amber" viewBox="0 0 4 4" refX="4" refY="2" markerWidth="3" markerHeight="3" orient="auto-start-reverse">
                <path d="M 0 0 L 4 2 L 0 4 z" fill="var(--accent-amber)" />
              </marker>
              <marker id="mna-arrow-rose" viewBox="0 0 4 4" refX="4" refY="2" markerWidth="3" markerHeight="3" orient="auto-start-reverse">
                <path d="M 0 0 L 4 2 L 0 4 z" fill="var(--accent-rose)" />
              </marker>
            </defs>

            {/* LAYER 1: REGIONS & SECURITY BOUNDARY CONTAINERS */}
            
            {/* 1. PUBLIC CLIENT & MERCHANT ECOSYSTEM (X=20, Y=50, W=210, H=700) */}
            <g transform="translate(20, 50)">
              <rect width="210" height="700" rx="14" fill="rgba(59, 130, 246, 0.04)" stroke="var(--accent-dr)" strokeWidth="1.5" strokeDasharray="6 3" />
              <rect x="25" y="12" width="160" height="26" rx="6" fill="var(--accent-dr)" />
              <text x="105" y="29" textAnchor="middle" fill="#ffffff" fontSize="10.5" fontWeight="700" fontFamily="Inter">
                CLIENT & MERCHANT ECOSYSTEM
              </text>
            </g>

            {/* 2. DMZ SECURITY & REVERSE PROXY LAYER (X=250, Y=50, W=210, H=700) */}
            <g transform="translate(250, 50)">
              <rect width="210" height="700" rx="14" fill="rgba(245, 158, 11, 0.04)" stroke="var(--accent-amber)" strokeWidth="1.5" strokeDasharray="6 3" />
              <rect x="30" y="12" width="150" height="26" rx="6" fill="var(--accent-amber)" />
              <text x="105" y="29" textAnchor="middle" fill="#ffffff" fontSize="10.5" fontWeight="700" fontFamily="Inter">
                DMZ & EDGE SECURITY
              </text>
            </g>

            {/* 3. RTSP GW CORE MULTI-NODE CLUSTER (X=480, Y=50, W=420, H=700) */}
            <g transform="translate(480, 50)">
              <rect width="420" height="700" rx="14" fill="rgba(16, 185, 129, 0.04)" stroke="var(--accent-pr)" strokeWidth="1.5" strokeDasharray="6 3" />
              <rect x="90" y="12" width="240" height="26" rx="6" fill="var(--accent-pr)" />
              <text x="210" y="29" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="700" fontFamily="Inter">
                RTSP GW (MULTI-NODE APPLICATION CORE)
              </text>
            </g>

            {/* 4. BANK CORP ZONE & INTERNAL SUBSYSTEMS (X=920, Y=50, W=240, H=700) */}
            <g transform="translate(920, 50)">
              <rect width="240" height="700" rx="14" fill="rgba(147, 51, 234, 0.04)" stroke="#9333ea" strokeWidth="1.5" strokeDasharray="6 3" />
              <rect x="35" y="12" width="170" height="26" rx="6" fill="#9333ea" />
              <text x="120" y="29" textAnchor="middle" fill="#ffffff" fontSize="10.5" fontWeight="700" fontFamily="Inter">
                BANK CORP ZONE SUBSYSTEMS
              </text>
            </g>

            {/* 5. NPCI & REGULATORY DLT NETWORK (X=1180, Y=50, W=200, H=700) */}
            <g transform="translate(1180, 50)">
              <rect width="200" height="700" rx="14" fill="rgba(244, 63, 94, 0.04)" stroke="var(--accent-rose)" strokeWidth="1.5" strokeDasharray="6 3" />
              <rect x="20" y="12" width="160" height="26" rx="6" fill="var(--accent-rose)" />
              <text x="100" y="29" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="700" fontFamily="Inter">
                NPCI & RBI DLT NETWORK
              </text>
            </g>


            {/* LAYER 2: FLOW CONNECTOR LINES & ANIMATED PARTICLES */}

            {/* Client Apps ➔ DMZ WAF */}
            <path d="M 215 125 L 265 125" fill="none" className="path-active-dr" markerEnd="url(#mna-arrow-blue)" />
            <path d="M 215 195 L 265 195" fill="none" className="path-active-dr" markerEnd="url(#mna-arrow-blue)" />
            <path d="M 215 265 L 265 265" fill="none" className="path-active-dr" markerEnd="url(#mna-arrow-blue)" />
            
            {/* DMZ WAF ➔ DMZ NGINX ➔ APP GW */}
            <path d="M 355 155 L 355 180" fill="none" className="path-active-pr" markerEnd="url(#mna-arrow-green)" />
            <path d="M 355 240 L 355 265" fill="none" className="path-active-pr" markerEnd="url(#mna-arrow-green)" />

            {/* DMZ APP GW ➔ RTSP GW Core Apps */}
            <path d="M 445 295 L 495 295" fill="none" className="path-active-pr" markerEnd="url(#mna-arrow-green)" />

            {/* RTSP Core ➔ KAFKA / REDIS Middleware */}
            <path d="M 690 345 L 690 375" fill="none" className="path-active-pr" markerEnd="url(#mna-arrow-green)" />

            {/* RTSP Core ➔ Oracle DB Cluster */}
            <path d="M 690 515 L 690 545" fill="none" className="path-active-pr" markerEnd="url(#mna-arrow-amber)" />

            {/* RTSP Core ➔ Bank Corp Zone Subsystems */}
            <path d="M 885 240 L 935 240" fill="none" className="path-active-pr" markerEnd="url(#mna-arrow-green)" />

            {/* RTSP Core ➔ NPCI NET & RBI DTSP */}
            <path d="M 885 125 L 1195 125" fill="none" className="path-active-dr" markerEnd="url(#mna-arrow-rose)" />


            {/* LAYER 3: INTERACTIVE NODE CARDS */}

            {/* SECTION 1: CLIENTS & MERCHANTS */}
            {/* 1. e-Rupee Mobile App */}
            <g transform="translate(35, 100)" style={{ cursor: 'pointer' }} onClick={() => onSelectComponent({ name: 'e-Rupee Mobile App', type: 'Public Consumer App (iOS / Android)', tech: 'Flutter / Native' })}>
              <rect width="180" height="50" rx="10" fill="var(--svg-card-bg)" stroke="var(--accent-dr)" strokeWidth="1.5" />
              <text x="15" y="24" fill="var(--svg-card-title)" fontSize="11.5" fontWeight="700" fontFamily="Outfit">📱 e-Rupee Mobile App</text>
              <text x="15" y="40" fill="var(--svg-card-sub)" fontSize="8.5" fontFamily="JetBrains Mono">erupeeapp.sbi.bank.in</text>
            </g>

            {/* 2. Merchant App */}
            <g transform="translate(35, 170)" style={{ cursor: 'pointer' }} onClick={() => onSelectComponent({ name: 'Merchant e-Rupee App', type: 'Merchant Mobile App', tech: 'Android POS / Mobile' })}>
              <rect width="180" height="50" rx="10" fill="var(--svg-card-bg)" stroke="var(--accent-dr)" strokeWidth="1.5" />
              <text x="15" y="24" fill="var(--svg-card-title)" fontSize="11.5" fontWeight="700" fontFamily="Outfit">🛍️ Merchant App</text>
              <text x="15" y="40" fill="var(--svg-card-sub)" fontSize="8.5" fontFamily="JetBrains Mono">merchant.erupee.sbi</text>
            </g>

            {/* 3. Merchant Web Portal */}
            <g transform="translate(35, 240)" style={{ cursor: 'pointer' }} onClick={() => onSelectComponent({ name: 'Merchant Web Portal', type: 'Public Merchant Web', tech: 'React / Nginx' })}>
              <rect width="180" height="50" rx="10" fill="var(--svg-card-bg)" stroke="var(--accent-dr)" strokeWidth="1.5" />
              <text x="15" y="24" fill="var(--svg-card-title)" fontSize="11.5" fontWeight="700" fontFamily="Outfit">💻 Merchant Web Portal</text>
              <text x="15" y="40" fill="var(--svg-card-sub)" fontSize="8.5" fontFamily="JetBrains Mono">merchanterupee.sbi</text>
            </g>

            {/* 4. Admin Portal */}
            <g transform="translate(35, 310)" style={{ cursor: 'pointer' }} onClick={() => onSelectComponent({ name: 'Admin Portal (AP)', type: 'Operations & Monitoring Portal', tech: 'Angular / Springboot' })}>
              <rect width="180" height="50" rx="10" fill="var(--svg-card-bg)" stroke="var(--svg-card-stroke)" strokeWidth="1.2" />
              <text x="15" y="24" fill="var(--svg-card-title)" fontSize="11.5" fontWeight="700" fontFamily="Outfit">📊 Admin Portal (AP)</text>
              <text x="15" y="40" fill="var(--svg-card-sub)" fontSize="8.5" fontFamily="JetBrains Mono">admin.erupee.sbi</text>
            </g>

            {/* 5. POS & E-Com Merchants */}
            <g transform="translate(35, 380)" style={{ cursor: 'pointer' }} onClick={() => onSelectComponent({ name: 'POS & E-Com Merchants', type: 'Acquiring Terminals & Web SDK' })}>
              <rect width="180" height="50" rx="10" fill="var(--svg-card-bg)" stroke="var(--svg-card-stroke)" strokeWidth="1.2" />
              <text x="15" y="24" fill="var(--svg-card-title)" fontSize="11" fontWeight="700" fontFamily="Outfit">💳 POS / E-Com / QR</text>
              <text x="15" y="40" fill="var(--svg-card-sub)" fontSize="8.5" fontFamily="JetBrains Mono">Static/Dynamic QR & POS</text>
            </g>


            {/* SECTION 2: DMZ LAYER */}
            {/* WAF */}
            <g transform="translate(265, 100)" style={{ cursor: 'pointer' }} onClick={() => onSelectComponent({ name: 'Web Application Firewall (WAF)', type: 'DMZ Security & DDoS Shield', ip: '10.x.x.252' })}>
              <rect width="180" height="55" rx="10" fill="var(--svg-card-bg)" stroke="var(--accent-amber)" strokeWidth="1.5" />
              <text x="15" y="24" fill="var(--svg-card-title)" fontSize="12" fontWeight="700" fontFamily="Outfit">🛡️ WAF (Edge Security)</text>
              <text x="15" y="40" fill="var(--accent-amber)" fontSize="9" fontFamily="JetBrains Mono">DDoS & OWASP Protection</text>
            </g>

            {/* LB DMZ / NGINX */}
            <g transform="translate(265, 185)" style={{ cursor: 'pointer' }} onClick={() => onSelectComponent({ name: 'LB DMZ / NGINX Web Server', type: 'DMZ Reverse Proxy & SSL Offloader', tech: 'Nginx / F5 BigIP' })}>
              <rect width="180" height="55" rx="10" fill="var(--svg-card-bg)" stroke="var(--accent-amber)" strokeWidth="1.5" />
              <text x="15" y="24" fill="var(--svg-card-title)" fontSize="12" fontWeight="700" fontFamily="Outfit">⚡ NGINX / LB DMZ</text>
              <text x="15" y="40" fill="var(--svg-card-sub)" fontSize="9" fontFamily="JetBrains Mono">SSL Termination & Proxy</text>
            </g>

            {/* APP GW */}
            <g transform="translate(265, 270)" style={{ cursor: 'pointer' }} onClick={() => onSelectComponent({ name: 'APP GW (API Gateway)', type: 'API Rate Limiter & Auth Gateway', tech: 'Spring Cloud Gateway' })}>
              <rect width="180" height="55" rx="10" fill="var(--svg-card-bg)" stroke="var(--accent-amber)" strokeWidth="1.5" />
              <text x="15" y="24" fill="var(--svg-card-title)" fontSize="12" fontWeight="700" fontFamily="Outfit">🌐 APP GW (Api Gateway)</text>
              <text x="15" y="40" fill="var(--svg-card-sub)" fontSize="9" fontFamily="JetBrains Mono">OAuth2 & Token Validation</text>
            </g>

            {/* PLB & ILB Load Balancers */}
            <g transform="translate(265, 355)" style={{ cursor: 'pointer' }} onClick={() => onSelectComponent({ name: 'PLB / ILB Load Balancers', type: 'Public & Internal Load Balancers' })}>
              <rect width="180" height="50" rx="10" fill="var(--svg-card-bg)" stroke="var(--svg-card-stroke)" strokeWidth="1.2" />
              <text x="15" y="22" fill="var(--svg-card-title)" fontSize="11" fontWeight="700" fontFamily="Outfit">⚖️ PLB & ILB Cluster</text>
              <text x="15" y="37" fill="var(--svg-card-sub)" fontSize="8.5" fontFamily="JetBrains Mono">PSO & Internal LB</text>
            </g>


            {/* SECTION 3: RTSP GW MULTI-NODE APPLICATION CLUSTERS */}
            <g transform="translate(495, 95)" style={{ cursor: 'pointer' }} onClick={() => onSelectComponent({ name: 'RTSP Core Multi-Node Application Cluster', type: 'Horizontal Microservice Nodes', nodes: '36 Active VM Nodes' })}>
              <rect width="390" height="250" rx="12" fill="var(--svg-card-bg)" stroke="var(--accent-pr)" strokeWidth="1.5" />
              <text x="15" y="24" fill="var(--accent-pr)" fontSize="11.5" fontWeight="700" fontFamily="Inter">⚡ RTSP Core Microservice Node Clusters (Horizontal Scale)</text>

              {/* Row 1 Microservices */}
              <g transform="translate(12, 36)">
                <rect width="115" height="60" rx="6" fill="var(--svg-pill-bg)" stroke="var(--accent-pr)" strokeWidth="1.2" />
                <text x="10" y="20" fill="var(--svg-pill-text)" fontSize="10.5" fontWeight="700" fontFamily="Outfit">📱 RTSP APP</text>
                <text x="10" y="35" fill="var(--accent-pr)" fontSize="8.5" fontFamily="JetBrains Mono">12 VM Nodes</text>
                <text x="10" y="48" fill="var(--svg-card-sub)" fontSize="7.5" fontFamily="Inter">Core Payment Engine</text>
              </g>

              <g transform="translate(137, 36)">
                <rect width="115" height="60" rx="6" fill="var(--svg-pill-bg)" stroke="var(--accent-pr)" strokeWidth="1.2" />
                <text x="10" y="20" fill="var(--svg-pill-text)" fontSize="10.5" fontWeight="700" fontFamily="Outfit">🪙 MinT (DMS)</text>
                <text x="10" y="35" fill="var(--accent-pr)" fontSize="8.5" fontFamily="JetBrains Mono">6 VM Nodes</text>
                <text x="10" y="48" fill="var(--svg-card-sub)" fontSize="7.5" fontFamily="Inter">Digital Minting Svc</text>
              </g>

              <g transform="translate(262, 36)">
                <rect width="115" height="60" rx="6" fill="var(--svg-pill-bg)" stroke="var(--accent-pr)" strokeWidth="1.2" />
                <text x="10" y="20" fill="var(--svg-pill-text)" fontSize="10.5" fontWeight="700" fontFamily="Outfit">🏦 BIG Node</text>
                <text x="10" y="35" fill="var(--accent-pr)" fontSize="8.5" fontFamily="JetBrains Mono">6 VM Nodes</text>
                <text x="10" y="48" fill="var(--svg-card-sub)" fontSize="7.5" fontFamily="Inter">Bank Interface GW</text>
              </g>

              {/* Row 2 Microservices */}
              <g transform="translate(12, 110)">
                <rect width="115" height="60" rx="6" fill="var(--svg-pill-bg)" stroke="var(--svg-pill-stroke)" />
                <text x="10" y="20" fill="var(--svg-pill-text)" fontSize="10.5" fontWeight="700" fontFamily="Outfit">💻 AppBackend</text>
                <text x="10" y="35" fill="var(--text-muted)" fontSize="8.5" fontFamily="JetBrains Mono">4 VM Nodes</text>
                <text x="10" y="48" fill="var(--svg-card-sub)" fontSize="7.5" fontFamily="Inter">Gateway Handler</text>
              </g>

              <g transform="translate(137, 110)">
                <rect width="115" height="60" rx="6" fill="var(--svg-pill-bg)" stroke="var(--svg-pill-stroke)" />
                <text x="10" y="20" fill="var(--svg-pill-text)" fontSize="10.5" fontWeight="700" fontFamily="Outfit">🛡️ PRM & ABAS</text>
                <text x="10" y="35" fill="var(--text-muted)" fontSize="8.5" fontFamily="JetBrains Mono">4 VM Nodes</text>
                <text x="10" y="48" fill="var(--svg-card-sub)" fontSize="7.5" fontFamily="Inter">Risk & Security Attest</text>
              </g>

              <g transform="translate(262, 110)">
                <rect width="115" height="60" rx="6" fill="var(--svg-pill-bg)" stroke="var(--svg-pill-stroke)" />
                <text x="10" y="20" fill="var(--svg-pill-text)" fontSize="10.5" fontWeight="700" fontFamily="Outfit">⚙️ TOMAS APP</text>
                <text x="10" y="35" fill="var(--text-muted)" fontSize="8.5" fontFamily="JetBrains Mono">4 VM Nodes</text>
                <text x="10" y="48" fill="var(--svg-card-sub)" fontSize="7.5" fontFamily="Inter">Token Management</text>
              </g>

              {/* Validation & VMN Services Row */}
              <g transform="translate(12, 184)">
                <rect width="365" height="52" rx="6" fill="rgba(15, 23, 42, 0.9)" stroke="var(--accent-amber)" strokeWidth="1" />
                <text x="10" y="18" fill="var(--accent-amber)" fontSize="9.5" fontWeight="700" fontFamily="Inter">🔄 Common Core Services: VMN, Validation SVC, MP/MAB, RTSP PSO</text>
                <text x="10" y="36" fill="var(--svg-card-sub)" fontSize="8" fontFamily="JetBrains Mono">High-Throughput Shared Services & Virtual Mobile Network</text>
              </g>
            </g>


            {/* SECTION 4: MIDDLEWARE & CACHE CLUSTER (KAFKA, REDIS, ABAS) */}
            <g transform="translate(495, 365)" style={{ cursor: 'pointer' }} onClick={() => onSelectComponent({ name: 'KAFKA & REDIS Event Middleware Cluster', type: 'Messaging & Cache Cluster' })}>
              <rect width="390" height="90" rx="12" fill="var(--svg-card-bg)" stroke="var(--accent-amber)" strokeWidth="1.5" />
              <text x="15" y="22" fill="var(--accent-amber)" fontSize="11" fontWeight="700" fontFamily="Inter">📦 Event Streaming & Cache Cluster</text>

              <g transform="translate(15, 32)">
                <rect width="110" height="44" rx="6" fill="var(--svg-pill-bg)" stroke="var(--accent-amber)" strokeWidth="1.2" />
                <text x="55" y="19" textAnchor="middle" fill="var(--svg-pill-text)" fontSize="10" fontWeight="700" fontFamily="Outfit">📨 KAFKA Cluster</text>
                <text x="55" y="32" textAnchor="middle" fill="var(--svg-card-sub)" fontSize="8" fontFamily="JetBrains Mono">Event Queue</text>
              </g>

              <g transform="translate(140, 32)">
                <rect width="110" height="44" rx="6" fill="var(--svg-pill-bg)" stroke="var(--accent-amber)" strokeWidth="1.2" />
                <text x="55" y="19" textAnchor="middle" fill="var(--svg-pill-text)" fontSize="10" fontWeight="700" fontFamily="Outfit">⚡ REDIS Cache</text>
                <text x="55" y="32" textAnchor="middle" fill="var(--svg-card-sub)" fontSize="8" fontFamily="JetBrains Mono">In-Memory HA</text>
              </g>

              <g transform="translate(265, 32)">
                <rect width="110" height="44" rx="6" fill="var(--svg-pill-bg)" stroke="var(--accent-amber)" strokeWidth="1.2" />
                <text x="55" y="19" textAnchor="middle" fill="var(--svg-pill-text)" fontSize="10" fontWeight="700" fontFamily="Outfit">🔒 ABAS Service</text>
                <text x="55" y="32" textAnchor="middle" fill="var(--svg-card-sub)" fontSize="8" fontFamily="JetBrains Mono">Security Attest</text>
              </g>
            </g>


            {/* SECTION 5: MULTI-NODE ORACLE DB CLUSTER TIER */}
            <g transform="translate(495, 470)" style={{ cursor: 'pointer' }} onClick={() => onSelectComponent({ name: 'Multi-Node Oracle Database Cluster Tier', type: 'Oracle RAC & Data Guard Cluster' })}>
              <rect width="390" height="135" rx="12" fill="var(--svg-card-bg)" stroke="var(--accent-pr)" strokeWidth="1.5" />
              <text x="15" y="24" fill="var(--accent-pr)" fontSize="11.5" fontWeight="700" fontFamily="Inter">🗄️ Multi-Node Oracle Database Tier (RAC & Data Guard Sync)</text>

              {/* RTSP DB */}
              <g transform="translate(15, 36)">
                <rect width="175" height="80" rx="8" fill="var(--svg-pill-bg)" stroke="var(--accent-pr)" strokeWidth="1.2" />
                <text x="12" y="22" fill="var(--svg-pill-text)" fontSize="11" fontWeight="700" fontFamily="Outfit">cbdc-rtsp-db</text>
                <text x="12" y="38" fill="var(--accent-pr)" fontSize="9" fontWeight="700" fontFamily="Inter">MASTER (READ / WRITE)</text>
                <text x="12" y="54" fill="var(--svg-card-sub)" fontSize="8" fontFamily="JetBrains Mono">RTSP DB-R (Replica Standby)</text>
                <text x="12" y="68" fill="var(--accent-amber)" fontSize="7.5" fontFamily="Inter">Oracle RAC Active-Active</text>
              </g>

              {/* TOMAS DB */}
              <g transform="translate(200, 36)">
                <rect width="175" height="80" rx="8" fill="var(--svg-pill-bg)" stroke="var(--accent-pr)" strokeWidth="1.2" />
                <text x="12" y="22" fill="var(--svg-pill-text)" fontSize="11" fontWeight="700" fontFamily="Outfit">tomas-db</text>
                <text x="12" y="38" fill="var(--accent-pr)" fontSize="9" fontWeight="700" fontFamily="Inter">MASTER (READ / WRITE)</text>
                <text x="12" y="54" fill="var(--svg-card-sub)" fontSize="8" fontFamily="JetBrains Mono">TOMAS DB-R (Replica Standby)</text>
                <text x="12" y="68" fill="var(--accent-amber)" fontSize="7.5" fontFamily="Inter">Token Ledger RAC Store</text>
              </g>
            </g>


            {/* SECTION 6: BANK CORP ZONE SUBSYSTEMS */}
            <g transform="translate(935, 95)" style={{ cursor: 'pointer' }} onClick={() => onSelectComponent({ name: 'CBS Core Banking System', type: 'Bank Core Banking System' })}>
              <rect width="210" height="50" rx="10" fill="var(--svg-card-bg)" stroke="#9333ea" strokeWidth="1.5" />
              <text x="15" y="24" fill="var(--svg-card-title)" fontSize="11.5" fontWeight="700" fontFamily="Outfit">🏦 CBS (Core Banking)</text>
              <text x="15" y="40" fill="var(--svg-card-sub)" fontSize="8.5" fontFamily="JetBrains Mono">Account Debit / Credit API</text>
            </g>

            <g transform="translate(935, 160)" style={{ cursor: 'pointer' }} onClick={() => onSelectComponent({ name: 'Bank Middleware (ESB)', type: 'Enterprise Service Bus' })}>
              <rect width="210" height="50" rx="10" fill="var(--svg-card-bg)" stroke="#9333ea" strokeWidth="1.5" />
              <text x="15" y="24" fill="var(--svg-card-title)" fontSize="11.5" fontWeight="700" fontFamily="Outfit">🔄 Bank Middleware (ESB)</text>
              <text x="15" y="40" fill="var(--svg-card-sub)" fontSize="8.5" fontFamily="JetBrains Mono">Enterprise Integration Bus</text>
            </g>

            <g transform="translate(935, 225)" style={{ cursor: 'pointer' }} onClick={() => onSelectComponent({ name: 'Acquiring Subsystem', type: 'Merchant Acquiring System' })}>
              <rect width="210" height="50" rx="10" fill="var(--svg-card-bg)" stroke="var(--svg-card-stroke)" strokeWidth="1.2" />
              <text x="15" y="24" fill="var(--svg-card-title)" fontSize="11.5" fontWeight="700" fontFamily="Outfit">🏬 Acquiring Subsystem</text>
              <text x="15" y="40" fill="var(--svg-card-sub)" fontSize="8.5" fontFamily="JetBrains Mono">Merchant Settlement API</text>
            </g>

            <g transform="translate(935, 290)" style={{ cursor: 'pointer' }} onClick={() => onSelectComponent({ name: 'DCMS Card Management', type: 'Debit Card Subsystem' })}>
              <rect width="210" height="50" rx="10" fill="var(--svg-card-bg)" stroke="var(--svg-card-stroke)" strokeWidth="1.2" />
              <text x="15" y="24" fill="var(--svg-card-title)" fontSize="11.5" fontWeight="700" fontFamily="Outfit">💳 DCMS (Card Mgmt)</text>
              <text x="15" y="40" fill="var(--svg-card-sub)" fontSize="8.5" fontFamily="JetBrains Mono">Debit Card Auth & Mapping</text>
            </g>

            <g transform="translate(935, 355)" style={{ cursor: 'pointer' }} onClick={() => onSelectComponent({ name: 'OTP & SMS Gateway', type: '2FA Auth Service' })}>
              <rect width="210" height="50" rx="10" fill="var(--svg-card-bg)" stroke="var(--svg-card-stroke)" strokeWidth="1.2" />
              <text x="15" y="24" fill="var(--svg-card-title)" fontSize="11.5" fontWeight="700" fontFamily="Outfit">🔑 OTP / SMS G/W</text>
              <text x="15" y="40" fill="var(--svg-card-sub)" fontSize="8.5" fontFamily="JetBrains Mono">SMS OTP Delivery</text>
            </g>

            <g transform="translate(935, 420)" style={{ cursor: 'pointer' }} onClick={() => onSelectComponent({ name: 'UPI Gateway Switch', type: 'UPI Interoperability Switch' })}>
              <rect width="210" height="50" rx="10" fill="var(--svg-card-bg)" stroke="var(--svg-card-stroke)" strokeWidth="1.2" />
              <text x="15" y="24" fill="var(--svg-card-title)" fontSize="11.5" fontWeight="700" fontFamily="Outfit">⚡ UPI Gateway Switch</text>
              <text x="15" y="40" fill="var(--svg-card-sub)" fontSize="8.5" fontFamily="JetBrains Mono">UPI VPA & Callback Handler</text>
            </g>

            <g transform="translate(935, 485)" style={{ cursor: 'pointer' }} onClick={() => onSelectComponent({ name: 'SMTP & SFTP Gateways', type: 'Email & Secure File Transfer' })}>
              <rect width="210" height="50" rx="10" fill="var(--svg-card-bg)" stroke="var(--svg-card-stroke)" strokeWidth="1.2" />
              <text x="15" y="24" fill="var(--svg-card-title)" fontSize="11.5" fontWeight="700" fontFamily="Outfit">📧 SMTP / SFTP / HRMS</text>
              <text x="15" y="40" fill="var(--svg-card-sub)" fontSize="8.5" fontFamily="JetBrains Mono">Email & Batch File Transfer</text>
            </g>


            {/* SECTION 7: NPCI & RBI DLT NETWORK */}
            <g transform="translate(1195, 95)" style={{ cursor: 'pointer' }} onClick={() => onSelectComponent({ name: 'NPCI NET (PSO)', type: 'National Payment System Operator' })}>
              <rect width="170" height="55" rx="10" fill="var(--svg-card-bg)" stroke="var(--accent-rose)" strokeWidth="1.5" />
              <text x="12" y="24" fill="var(--svg-card-title)" fontSize="11.5" fontWeight="700" fontFamily="Outfit">🌐 NPCI NET (PSO)</text>
              <text x="12" y="40" fill="var(--accent-rose)" fontSize="9" fontFamily="JetBrains Mono">National Payment Switch</text>
            </g>

            <g transform="translate(1195, 170)" style={{ cursor: 'pointer' }} onClick={() => onSelectComponent({ name: 'RBI DTSP NODE', type: 'Central Bank Digital Currency Node' })}>
              <rect width="170" height="55" rx="10" fill="var(--svg-card-bg)" stroke="var(--accent-rose)" strokeWidth="1.5" />
              <text x="12" y="24" fill="var(--svg-card-title)" fontSize="11.5" fontWeight="700" fontFamily="Outfit">🏛️ RBI DTSP NODE</text>
              <text x="12" y="40" fill="var(--svg-card-sub)" fontSize="9" fontFamily="JetBrains Mono">Digital Token Platform</text>
            </g>

            <g transform="translate(1195, 245)" style={{ cursor: 'pointer' }} onClick={() => onSelectComponent({ name: 'DLT Blockchain Network', type: 'Distributed Ledger Technology' })}>
              <rect width="170" height="55" rx="10" fill="var(--svg-card-bg)" stroke="var(--accent-rose)" strokeWidth="1.5" />
              <text x="12" y="24" fill="var(--svg-card-title)" fontSize="11.5" fontWeight="700" fontFamily="Outfit">🔗 DLT Network</text>
              <text x="12" y="40" fill="var(--svg-card-sub)" fontSize="9" fontFamily="JetBrains Mono">Consensus Blockchain</text>
            </g>


            {/* BOTTOM ACRONYMS LEGEND BAR */}
            <g transform="translate(20, 680)">
              <rect width="1360" height="60" rx="10" fill="var(--svg-pill-bg)" stroke="var(--border-card)" strokeWidth="1" />
              <text x="15" y="20" fill="var(--accent-amber)" fontSize="10" fontWeight="700" fontFamily="Inter">
                ARCHITECTURE ACRONYMS: PLB (PSO Load Balancer) | AP (Admin Portal) | ILB (Internal Load Balancer) | MP (Merchant Portal) | MAB (Merchant App Backend) | BEC (Bank External Connector) | DMS (Digital Minting Services) | BIG (Bank Interface Gateway) | WAF (Web App Firewall) | PSO (Payment System Operator) | DTSP (Digital Token Service Provider) | MHA (Merchant Host Adapter)
              </text>
              <text x="15" y="42" fill="var(--text-muted)" fontSize="9.5" fontFamily="JetBrains Mono">
                ENVIRONMENT NODE SPECS: PR (19 Nodes: 12 APP, 4 WEB, 3 DB) | DR (19 Nodes: 12 APP, 4 WEB, 3 DB) | TECH STACK: RHEL 8, Java 1.8/1.21, TypeScript, JPOS, Spring Boot, Nginx, Tomcat, Redis, Oracle DB RAC
              </text>
            </g>
          </svg>
        </div>
      )}

      {/* TAB CONTENT 2: SINGLE vs MULTI-NODE COMPARISON MATRIX */}
      {activeTab === 'MATRIX' && (
        <div style={{ flex: 1, padding: '24px', overflowY: 'auto' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto', background: 'var(--svg-card-bg)', border: '1px solid var(--border-card)', borderRadius: '12px', padding: '24px' }}>
            <h2 style={{ fontFamily: 'Outfit', fontSize: '1.25rem', fontWeight: 700, marginBottom: '8px', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckCircle2 color="var(--accent-pr)" /> Single-Node vs Multi-Node Architecture Comparison Matrix
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
              Architectural decision table extracted directly from <code style={{ fontFamily: 'JetBrains Mono', background: 'var(--svg-pill-bg)', padding: '2px 6px', borderRadius: '4px' }}>MNA.svg</code> outlining the operational benefits of Multi-Node Architecture (MNA).
            </p>

            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
              <thead>
                <tr style={{ background: 'var(--svg-pill-bg)', borderBottom: '2px solid var(--border-card)' }}>
                  <th style={{ padding: '12px 16px', color: 'var(--text-main)', fontFamily: 'Outfit', fontWeight: 700 }}>Category</th>
                  <th style={{ padding: '12px 16px', color: 'var(--accent-rose)', fontFamily: 'Outfit', fontWeight: 700 }}>Single-Node Architecture</th>
                  <th style={{ padding: '12px 16px', color: 'var(--accent-pr)', fontFamily: 'Outfit', fontWeight: 700 }}>Multi-Node Architecture (MNA)</th>
                  <th style={{ padding: '12px 16px', color: 'var(--accent-amber)', fontFamily: 'Outfit', fontWeight: 700 }}>MNA Advantage</th>
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

      {/* TAB CONTENT 3: ENVIRONMENT SPECS & TECH STACK */}
      {activeTab === 'SPECS' && (
        <div style={{ flex: 1, padding: '24px', overflowY: 'auto' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Section 1: Environment Node Allocations */}
            <div style={{ background: 'var(--svg-card-bg)', border: '1px solid var(--border-card)', borderRadius: '12px', padding: '20px' }}>
              <h3 style={{ fontFamily: 'Outfit', fontSize: '1.1rem', fontWeight: 700, marginBottom: '16px', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Server color="var(--accent-pr)" size={18} /> Environment Node Allocations (APP / WEB / DB)
              </h3>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                <thead>
                  <tr style={{ background: 'var(--svg-pill-bg)', borderBottom: '1px solid var(--border-card)' }}>
                    <th style={{ padding: '10px 14px', textAlign: 'left', fontFamily: 'Outfit' }}>Environment</th>
                    <th style={{ padding: '10px 14px', textAlign: 'center', fontFamily: 'Outfit' }}>APP Nodes</th>
                    <th style={{ padding: '10px 14px', textAlign: 'center', fontFamily: 'Outfit' }}>WEB Nodes</th>
                    <th style={{ padding: '10px 14px', textAlign: 'center', fontFamily: 'Outfit' }}>DB Nodes</th>
                    <th style={{ padding: '10px 14px', textAlign: 'center', fontFamily: 'Outfit' }}>Total Nodes</th>
                    <th style={{ padding: '10px 14px', textAlign: 'right', fontFamily: 'Outfit' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {environmentNodeCounts.map((env, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid var(--border-card)' }}>
                      <td style={{ padding: '12px 14px', fontWeight: 700, color: 'var(--text-main)' }}>{env.env}</td>
                      <td style={{ padding: '12px 14px', textAlign: 'center', color: 'var(--accent-pr)', fontFamily: 'JetBrains Mono', fontWeight: 700 }}>{env.appNodes}</td>
                      <td style={{ padding: '12px 14px', textAlign: 'center', color: 'var(--accent-dr)', fontFamily: 'JetBrains Mono', fontWeight: 700 }}>{env.webNodes}</td>
                      <td style={{ padding: '12px 14px', textAlign: 'center', color: 'var(--accent-amber)', fontFamily: 'JetBrains Mono', fontWeight: 700 }}>{env.dbNodes}</td>
                      <td style={{ padding: '12px 14px', textAlign: 'center', fontWeight: 800, fontFamily: 'JetBrains Mono' }}>{env.totalNodes} Nodes</td>
                      <td style={{ padding: '12px 14px', textAlign: 'right', fontSize: '0.75rem', fontWeight: 700, color: env.status.includes('ACTIVE') ? 'var(--accent-pr)' : 'var(--text-muted)' }}>{env.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
