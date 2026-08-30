import React, { useState } from 'react';
import { Layers, ShieldCheck, Activity } from 'lucide-react';

export default function MnaDiagram({ onSelectComponent }) {
  const [hoveredNode, setHoveredNode] = useState(null);

  return (
    <div className="mna-standalone-canvas-container" style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', background: 'var(--svg-canvas-bg)', color: 'var(--text-main)', overflow: 'hidden' }}>
      {/* Streamlined Header Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 24px', background: 'rgba(15, 23, 42, 0.75)', borderBottom: '1px solid var(--border-card)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(16, 185, 129, 0.12)', border: '1px solid var(--accent-pr)', padding: '4px 10px', borderRadius: '6px' }}>
            <Layers size={15} color="var(--accent-pr)" />
            <span style={{ fontSize: '0.8rem', fontWeight: 700, fontFamily: 'Outfit', color: 'var(--accent-pr)' }}>
              MULTI-NODE ARCHITECTURE (MNA)
            </span>
          </div>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            Microservice Topology & End-to-End Cross-Zone Flow Diagram (Reference: MNA.svg)
          </span>
        </div>

        {/* Status Pill */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(59, 130, 246, 0.12)', border: '1px solid var(--accent-dr)', padding: '4px 10px', borderRadius: '6px' }}>
          <Activity size={13} color="var(--accent-dr)" />
          <span style={{ fontSize: '0.75rem', fontWeight: 700, fontFamily: 'JetBrains Mono', color: 'var(--accent-dr)' }}>
            36 ACTIVE MICROSERVICE VM NODES
          </span>
        </div>
      </div>

      {/* NATIVE SVG ARCHITECTURE CANVAS */}
      <div className="svg-canvas-container" style={{ flex: 1, width: '100%', height: '100%', overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <svg viewBox="0 0 1440 760" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" style={{ overflow: 'visible', maxHeight: 'calc(100vh - 75px)' }}>
          <defs>
            {/* Sleek Arrowhead Markers */}
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

          {/* ============================================================ */}
          {/* LAYER 1: REGIONS & SECURITY BOUNDARY CONTAINERS */}
          {/* ============================================================ */}

          {/* 1. PUBLIC CLIENT & MERCHANT ECOSYSTEM (X=20, Y=50, W=220, H=620) */}
          <g transform="translate(20, 50)">
            <rect width="220" height="620" rx="14" fill="rgba(59, 130, 246, 0.04)" stroke="var(--accent-dr)" strokeWidth="1.5" strokeDasharray="6 3" />
            <rect x="25" y="12" width="170" height="26" rx="6" fill="var(--accent-dr)" />
            <text x="110" y="29" textAnchor="middle" fill="#ffffff" fontSize="10.5" fontWeight="700" fontFamily="Inter">
              CLIENT & MERCHANT ECOSYSTEM
            </text>
          </g>

          {/* 2. DMZ SECURITY & REVERSE PROXY LAYER (X=260, Y=50, W=220, H=620) */}
          <g transform="translate(260, 50)">
            <rect width="220" height="620" rx="14" fill="rgba(245, 158, 11, 0.04)" stroke="var(--accent-amber)" strokeWidth="1.5" strokeDasharray="6 3" />
            <rect x="35" y="12" width="150" height="26" rx="6" fill="var(--accent-amber)" />
            <text x="110" y="29" textAnchor="middle" fill="#ffffff" fontSize="10.5" fontWeight="700" fontFamily="Inter">
              DMZ & EDGE SECURITY
            </text>
          </g>

          {/* 3. RTSP GW CORE MULTI-NODE CLUSTER (X=500, Y=50, W=440, H=620) */}
          <g transform="translate(500, 50)">
            <rect width="440" height="620" rx="14" fill="rgba(16, 185, 129, 0.04)" stroke="var(--accent-pr)" strokeWidth="1.5" strokeDasharray="6 3" />
            <rect x="90" y="12" width="260" height="26" rx="6" fill="var(--accent-pr)" />
            <text x="220" y="29" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="700" fontFamily="Inter">
              RTSP GW (MULTI-NODE APPLICATION CORE)
            </text>
          </g>

          {/* 4. BANK CORP ZONE SUBSYSTEMS (X=960, Y=50, W=240, H=620) */}
          <g transform="translate(960, 50)">
            <rect width="240" height="620" rx="14" fill="rgba(147, 51, 234, 0.04)" stroke="#9333ea" strokeWidth="1.5" strokeDasharray="6 3" />
            <rect x="30" y="12" width="180" height="26" rx="6" fill="#9333ea" />
            <text x="120" y="29" textAnchor="middle" fill="#ffffff" fontSize="10.5" fontWeight="700" fontFamily="Inter">
              BANK CORP ZONE SUBSYSTEMS
            </text>
          </g>

          {/* 5. NPCI & REGULATORY DLT NETWORK (X=1220, Y=50, W=200, H=620) */}
          <g transform="translate(1220, 50)">
            <rect width="200" height="620" rx="14" fill="rgba(244, 63, 94, 0.04)" stroke="var(--accent-rose)" strokeWidth="1.5" strokeDasharray="6 3" />
            <rect x="20" y="12" width="160" height="26" rx="6" fill="var(--accent-rose)" />
            <text x="100" y="29" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="700" fontFamily="Inter">
              NPCI & RBI DLT NETWORK
            </text>
          </g>


          {/* ============================================================ */}
          {/* LAYER 2: FLOW CONNECTOR LINES & ANIMATED PARTICLES */}
          {/* ============================================================ */}

          {/* Client Apps ➔ DMZ WAF */}
          <path d="M 210 121 L 275 121" fill="none" className="path-active-dr" markerEnd="url(#mna-arrow-blue)" />
          <path d="M 210 186 L 275 121" fill="none" className="path-active-dr" markerEnd="url(#mna-arrow-blue)" />
          <path d="M 210 251 L 275 121" fill="none" className="path-active-dr" markerEnd="url(#mna-arrow-blue)" />
          
          {/* DMZ WAF ➔ DMZ NGINX ➔ APP GW ➔ PLB/ILB */}
          <path d="M 370 147 L 370 175" fill="none" className="path-active-pr" markerEnd="url(#mna-arrow-green)" />
          <path d="M 370 227 L 370 255" fill="none" className="path-active-pr" markerEnd="url(#mna-arrow-green)" />
          <path d="M 370 307 L 370 335" fill="none" className="path-active-pr" markerEnd="url(#mna-arrow-green)" />

          {/* DMZ APP GW ➔ RTSP GW Core Apps */}
          <path d="M 465 281 L 515 156" fill="none" className="path-active-pr" markerEnd="url(#mna-arrow-green)" />
          <path d="M 465 281 L 515 229" fill="none" className="path-active-pr" markerEnd="url(#mna-arrow-green)" />

          {/* RTSP Core ➔ KAFKA / REDIS Middleware */}
          <path d="M 720 345 L 720 375" fill="none" className="path-active-pr" markerEnd="url(#mna-arrow-green)" />

          {/* RTSP Core ➔ Oracle DB Cluster Tier */}
          <path d="M 720 465 L 720 490" fill="none" className="path-active-amber" markerEnd="url(#mna-arrow-amber)" />

          {/* RTSP Core ➔ Bank Corp Zone Subsystems */}
          <path d="M 925 156 L 975 119" fill="none" className="path-active-pr" markerEnd="url(#mna-arrow-green)" />
          <path d="M 925 156 L 975 182" fill="none" className="path-active-pr" markerEnd="url(#mna-arrow-green)" />
          <path d="M 925 156 L 975 434" fill="none" className="path-active-pr" markerEnd="url(#mna-arrow-green)" />

          {/* RTSP Core ➔ NPCI NET & RBI DTSP */}
          <path d="M 925 156 Q 1075 70 1235 122" fill="none" className="path-active-dr" markerEnd="url(#mna-arrow-rose)" />
          <path d="M 925 156 Q 1075 130 1235 197" fill="none" className="path-active-dr" markerEnd="url(#mna-arrow-rose)" />

          {/* Glowing Animated Particles */}
          <g style={{ filter: 'drop-shadow(0 0 3px var(--accent-pr))' }}>
            <circle r="1.8" fill="var(--accent-dr)">
              <animateMotion path="M 210 121 L 275 121" dur="2.0s" repeatCount="indefinite" calcMode="linear" />
            </circle>
            <circle r="1.8" fill="var(--accent-pr)">
              <animateMotion path="M 370 147 L 370 175" dur="1.5s" repeatCount="indefinite" calcMode="linear" />
            </circle>
            <circle r="1.8" fill="var(--accent-pr)">
              <animateMotion path="M 465 281 L 515 156" dur="2.2s" repeatCount="indefinite" calcMode="linear" />
            </circle>
            <circle r="1.8" fill="var(--accent-pr)">
              <animateMotion path="M 925 156 L 975 119" dur="2.4s" repeatCount="indefinite" calcMode="linear" />
            </circle>
          </g>


          {/* ============================================================ */}
          {/* LAYER 3: INTERACTIVE NODE CARDS WITH FIXED ALIGNMENTS */}
          {/* ============================================================ */}

          {/* ZONE 1: CLIENTS & MERCHANTS (X=35, W=190, H=52) */}
          <g transform="translate(35, 95)" style={{ cursor: 'pointer' }} onClick={() => onSelectComponent({ name: 'e-Rupee Mobile App', type: 'Public Consumer App (iOS / Android)', tech: 'Flutter / Native' })}>
            <rect width="190" height="52" rx="10" fill="var(--svg-card-bg)" stroke="var(--accent-dr)" strokeWidth="1.5" />
            <text x="15" y="24" fill="var(--svg-card-title)" fontSize="11.5" fontWeight="700" fontFamily="Outfit">📱 e-Rupee Mobile App</text>
            <text x="15" y="40" fill="var(--svg-card-sub)" fontSize="8.5" fontFamily="JetBrains Mono">erupeeapp.sbi.bank.in</text>
          </g>

          <g transform="translate(35, 160)" style={{ cursor: 'pointer' }} onClick={() => onSelectComponent({ name: 'Merchant e-Rupee App', type: 'Merchant Mobile App', tech: 'Android POS / Mobile' })}>
            <rect width="190" height="52" rx="10" fill="var(--svg-card-bg)" stroke="var(--accent-dr)" strokeWidth="1.5" />
            <text x="15" y="24" fill="var(--svg-card-title)" fontSize="11.5" fontWeight="700" fontFamily="Outfit">🛍️ Merchant App</text>
            <text x="15" y="40" fill="var(--svg-card-sub)" fontSize="8.5" fontFamily="JetBrains Mono">merchant.erupee.sbi</text>
          </g>

          <g transform="translate(35, 225)" style={{ cursor: 'pointer' }} onClick={() => onSelectComponent({ name: 'Merchant Web Portal', type: 'Public Merchant Web', tech: 'React / Nginx' })}>
            <rect width="190" height="52" rx="10" fill="var(--svg-card-bg)" stroke="var(--accent-dr)" strokeWidth="1.5" />
            <text x="15" y="24" fill="var(--svg-card-title)" fontSize="11.5" fontWeight="700" fontFamily="Outfit">💻 Merchant Web Portal</text>
            <text x="15" y="40" fill="var(--svg-card-sub)" fontSize="8.5" fontFamily="JetBrains Mono">merchanterupee.sbi</text>
          </g>

          <g transform="translate(35, 290)" style={{ cursor: 'pointer' }} onClick={() => onSelectComponent({ name: 'Admin Portal (AP)', type: 'Operations & Monitoring Portal', tech: 'Angular / Springboot' })}>
            <rect width="190" height="52" rx="10" fill="var(--svg-card-bg)" stroke="var(--svg-card-stroke)" strokeWidth="1.2" />
            <text x="15" y="24" fill="var(--svg-card-title)" fontSize="11.5" fontWeight="700" fontFamily="Outfit">📊 Admin Portal (AP)</text>
            <text x="15" y="40" fill="var(--svg-card-sub)" fontSize="8.5" fontFamily="JetBrains Mono">admin.erupee.sbi</text>
          </g>

          <g transform="translate(35, 355)" style={{ cursor: 'pointer' }} onClick={() => onSelectComponent({ name: 'POS & E-Com Merchants', type: 'Acquiring Terminals & Web SDK' })}>
            <rect width="190" height="52" rx="10" fill="var(--svg-card-bg)" stroke="var(--svg-card-stroke)" strokeWidth="1.2" />
            <text x="15" y="24" fill="var(--svg-card-title)" fontSize="11.5" fontWeight="700" fontFamily="Outfit">💳 POS / E-Com / QR</text>
            <text x="15" y="40" fill="var(--svg-card-sub)" fontSize="8.5" fontFamily="JetBrains Mono">Static/Dynamic QR & POS</text>
          </g>


          {/* ZONE 2: DMZ & EDGE SECURITY (X=275, W=190, H=52) */}
          <g transform="translate(275, 95)" style={{ cursor: 'pointer' }} onClick={() => onSelectComponent({ name: 'Web Application Firewall (WAF)', type: 'DMZ Security & DDoS Shield', ip: '10.x.x.252' })}>
            <rect width="190" height="52" rx="10" fill="var(--svg-card-bg)" stroke="var(--accent-amber)" strokeWidth="1.5" />
            <text x="15" y="24" fill="var(--svg-card-title)" fontSize="12" fontWeight="700" fontFamily="Outfit">🛡️ WAF (Edge Security)</text>
            <text x="15" y="40" fill="var(--accent-amber)" fontSize="9" fontFamily="JetBrains Mono">DDoS & OWASP Protection</text>
          </g>

          <g transform="translate(275, 175)" style={{ cursor: 'pointer' }} onClick={() => onSelectComponent({ name: 'LB DMZ / NGINX Web Server', type: 'DMZ Reverse Proxy & SSL Offloader', tech: 'Nginx / F5 BigIP' })}>
            <rect width="190" height="52" rx="10" fill="var(--svg-card-bg)" stroke="var(--accent-amber)" strokeWidth="1.5" />
            <text x="15" y="24" fill="var(--svg-card-title)" fontSize="12" fontWeight="700" fontFamily="Outfit">⚡ NGINX / LB DMZ</text>
            <text x="15" y="40" fill="var(--svg-card-sub)" fontSize="9" fontFamily="JetBrains Mono">SSL Termination & Proxy</text>
          </g>

          <g transform="translate(275, 255)" style={{ cursor: 'pointer' }} onClick={() => onSelectComponent({ name: 'APP GW (API Gateway)', type: 'API Rate Limiter & Auth Gateway', tech: 'Spring Cloud Gateway' })}>
            <rect width="190" height="52" rx="10" fill="var(--svg-card-bg)" stroke="var(--accent-amber)" strokeWidth="1.5" />
            <text x="15" y="24" fill="var(--svg-card-title)" fontSize="12" fontWeight="700" fontFamily="Outfit">🌐 APP GW (Api Gateway)</text>
            <text x="15" y="40" fill="var(--svg-card-sub)" fontSize="9" fontFamily="JetBrains Mono">OAuth2 & Token Validation</text>
          </g>

          <g transform="translate(275, 335)" style={{ cursor: 'pointer' }} onClick={() => onSelectComponent({ name: 'PLB / ILB Load Balancers', type: 'Public & Internal Load Balancers' })}>
            <rect width="190" height="52" rx="10" fill="var(--svg-card-bg)" stroke="var(--svg-card-stroke)" strokeWidth="1.2" />
            <text x="15" y="24" fill="var(--svg-card-title)" fontSize="11.5" fontWeight="700" fontFamily="Outfit">⚖️ PLB & ILB Cluster</text>
            <text x="15" y="40" fill="var(--svg-card-sub)" fontSize="8.5" fontFamily="JetBrains Mono">PSO & Internal LB</text>
          </g>


          {/* ZONE 3: RTSP GW MULTI-NODE APPLICATION CORE (X=515) */}
          <g transform="translate(515, 90)" style={{ cursor: 'pointer' }} onClick={() => onSelectComponent({ name: 'RTSP Core Multi-Node Application Cluster', type: 'Horizontal Microservice Nodes', nodes: '36 Active VM Nodes' })}>
            <rect width="410" height="255" rx="12" fill="var(--svg-card-bg)" stroke="var(--accent-pr)" strokeWidth="1.5" />
            <text x="15" y="24" fill="var(--accent-pr)" fontSize="11.5" fontWeight="700" fontFamily="Inter">⚡ RTSP Core Microservice Node Clusters (Horizontal Scale)</text>

            {/* Row 1 Microservices */}
            <g transform="translate(12, 36)">
              <rect width="122" height="62" rx="6" fill="var(--svg-pill-bg)" stroke="var(--accent-pr)" strokeWidth="1.2" />
              <text x="10" y="20" fill="var(--svg-pill-text)" fontSize="10.5" fontWeight="700" fontFamily="Outfit">📱 RTSP APP</text>
              <text x="10" y="35" fill="var(--accent-pr)" fontSize="8.5" fontFamily="JetBrains Mono">12 VM Nodes</text>
              <text x="10" y="48" fill="var(--svg-card-sub)" fontSize="7.5" fontFamily="Inter">Core Payment Engine</text>
            </g>

            <g transform="translate(144, 36)">
              <rect width="122" height="62" rx="6" fill="var(--svg-pill-bg)" stroke="var(--accent-pr)" strokeWidth="1.2" />
              <text x="10" y="20" fill="var(--svg-pill-text)" fontSize="10.5" fontWeight="700" fontFamily="Outfit">🪙 MinT (DMS)</text>
              <text x="10" y="35" fill="var(--accent-pr)" fontSize="8.5" fontFamily="JetBrains Mono">6 VM Nodes</text>
              <text x="10" y="48" fill="var(--svg-card-sub)" fontSize="7.5" fontFamily="Inter">Digital Minting Svc</text>
            </g>

            <g transform="translate(276, 36)">
              <rect width="122" height="62" rx="6" fill="var(--svg-pill-bg)" stroke="var(--accent-pr)" strokeWidth="1.2" />
              <text x="10" y="20" fill="var(--svg-pill-text)" fontSize="10.5" fontWeight="700" fontFamily="Outfit">🏦 BIG Node</text>
              <text x="10" y="35" fill="var(--accent-pr)" fontSize="8.5" fontFamily="JetBrains Mono">6 VM Nodes</text>
              <text x="10" y="48" fill="var(--svg-card-sub)" fontSize="7.5" fontFamily="Inter">Bank Interface GW</text>
            </g>

            {/* Row 2 Microservices */}
            <g transform="translate(12, 108)">
              <rect width="122" height="62" rx="6" fill="var(--svg-pill-bg)" stroke="var(--svg-pill-stroke)" />
              <text x="10" y="20" fill="var(--svg-pill-text)" fontSize="10.5" fontWeight="700" fontFamily="Outfit">💻 AppBackend</text>
              <text x="10" y="35" fill="var(--text-muted)" fontSize="8.5" fontFamily="JetBrains Mono">4 VM Nodes</text>
              <text x="10" y="48" fill="var(--svg-card-sub)" fontSize="7.5" fontFamily="Inter">Gateway Handler</text>
            </g>

            <g transform="translate(144, 108)">
              <rect width="122" height="62" rx="6" fill="var(--svg-pill-bg)" stroke="var(--svg-pill-stroke)" />
              <text x="10" y="20" fill="var(--svg-pill-text)" fontSize="10.5" fontWeight="700" fontFamily="Outfit">🛡️ PRM & ABAS</text>
              <text x="10" y="35" fill="var(--text-muted)" fontSize="8.5" fontFamily="JetBrains Mono">4 VM Nodes</text>
              <text x="10" y="48" fill="var(--svg-card-sub)" fontSize="7.5" fontFamily="Inter">Risk & Security Attest</text>
            </g>

            <g transform="translate(276, 108)">
              <rect width="122" height="62" rx="6" fill="var(--svg-pill-bg)" stroke="var(--svg-pill-stroke)" />
              <text x="10" y="20" fill="var(--svg-pill-text)" fontSize="10.5" fontWeight="700" fontFamily="Outfit">⚙️ TOMAS APP</text>
              <text x="10" y="35" fill="var(--text-muted)" fontSize="8.5" fontFamily="JetBrains Mono">4 VM Nodes</text>
              <text x="10" y="48" fill="var(--svg-card-sub)" fontSize="7.5" fontFamily="Inter">Token Management</text>
            </g>

            {/* Shared Microservices Pill */}
            <g transform="translate(12, 180)">
              <rect width="386" height="60" rx="6" fill="rgba(15, 23, 42, 0.9)" stroke="var(--accent-amber)" strokeWidth="1" />
              <text x="12" y="20" fill="var(--accent-amber)" fontSize="9.5" fontWeight="700" fontFamily="Inter">🔄 Common Core Services: VMN, Validation SVC, MP/MAB, RTSP PSO</text>
              <text x="12" y="38" fill="var(--svg-card-sub)" fontSize="8.5" fontFamily="JetBrains Mono">High-Throughput Shared Services & Virtual Mobile Network</text>
            </g>
          </g>

          {/* Middleware Cluster (KAFKA, REDIS, ABAS) */}
          <g transform="translate(515, 360)" style={{ cursor: 'pointer' }} onClick={() => onSelectComponent({ name: 'KAFKA & REDIS Event Middleware Cluster', type: 'Messaging & Cache Cluster' })}>
            <rect width="410" height="90" rx="12" fill="var(--svg-card-bg)" stroke="var(--accent-amber)" strokeWidth="1.5" />
            <text x="15" y="22" fill="var(--accent-amber)" fontSize="11" fontWeight="700" fontFamily="Inter">📦 Event Streaming & Cache Cluster</text>

            <g transform="translate(15, 32)">
              <rect width="115" height="44" rx="6" fill="var(--svg-pill-bg)" stroke="var(--accent-amber)" strokeWidth="1.2" />
              <text x="57.5" y="19" textAnchor="middle" fill="var(--svg-pill-text)" fontSize="10" fontWeight="700" fontFamily="Outfit">📨 KAFKA Cluster</text>
              <text x="57.5" y="32" textAnchor="middle" fill="var(--svg-card-sub)" fontSize="8" fontFamily="JetBrains Mono">Event Queue</text>
            </g>

            <g transform="translate(147, 32)">
              <rect width="115" height="44" rx="6" fill="var(--svg-pill-bg)" stroke="var(--accent-amber)" strokeWidth="1.2" />
              <text x="57.5" y="19" textAnchor="middle" fill="var(--svg-pill-text)" fontSize="10" fontWeight="700" fontFamily="Outfit">⚡ REDIS Cache</text>
              <text x="57.5" y="32" textAnchor="middle" fill="var(--svg-card-sub)" fontSize="8" fontFamily="JetBrains Mono">In-Memory HA</text>
            </g>

            <g transform="translate(280, 32)">
              <rect width="115" height="44" rx="6" fill="var(--svg-pill-bg)" stroke="var(--accent-amber)" strokeWidth="1.2" />
              <text x="57.5" y="19" textAnchor="middle" fill="var(--svg-pill-text)" fontSize="10" fontWeight="700" fontFamily="Outfit">🔒 ABAS Service</text>
              <text x="57.5" y="32" textAnchor="middle" fill="var(--svg-card-sub)" fontSize="8" fontFamily="JetBrains Mono">Security Attest</text>
            </g>
          </g>

          {/* Multi-Node Oracle Database Cluster Tier */}
          <g transform="translate(515, 465)" style={{ cursor: 'pointer' }} onClick={() => onSelectComponent({ name: 'Multi-Node Oracle Database Cluster Tier', type: 'Oracle RAC & Data Guard Cluster' })}>
            <rect width="410" height="135" rx="12" fill="var(--svg-card-bg)" stroke="var(--accent-pr)" strokeWidth="1.5" />
            <text x="15" y="24" fill="var(--accent-pr)" fontSize="11.5" fontWeight="700" fontFamily="Inter">🗄️ Multi-Node Oracle Database Tier (RAC & Data Guard Sync)</text>

            <g transform="translate(15, 36)">
              <rect width="185" height="80" rx="8" fill="var(--svg-pill-bg)" stroke="var(--accent-pr)" strokeWidth="1.2" />
              <text x="12" y="22" fill="var(--svg-pill-text)" fontSize="11" fontWeight="700" fontFamily="Outfit">cbdc-rtsp-db</text>
              <text x="12" y="38" fill="var(--accent-pr)" fontSize="9" fontWeight="700" fontFamily="Inter">MASTER (READ / WRITE)</text>
              <text x="12" y="54" fill="var(--svg-card-sub)" fontSize="8" fontFamily="JetBrains Mono">RTSP DB-R (Replica Standby)</text>
              <text x="12" y="68" fill="var(--accent-amber)" fontSize="7.5" fontFamily="Inter">Oracle RAC Active-Active</text>
            </g>

            <g transform="translate(210, 36)">
              <rect width="185" height="80" rx="8" fill="var(--svg-pill-bg)" stroke="var(--accent-pr)" strokeWidth="1.2" />
              <text x="12" y="22" fill="var(--svg-pill-text)" fontSize="11" fontWeight="700" fontFamily="Outfit">tomas-db</text>
              <text x="12" y="38" fill="var(--accent-pr)" fontSize="9" fontWeight="700" fontFamily="Inter">MASTER (READ / WRITE)</text>
              <text x="12" y="54" fill="var(--svg-card-sub)" fontSize="8" fontFamily="JetBrains Mono">TOMAS DB-R (Replica Standby)</text>
              <text x="12" y="68" fill="var(--accent-amber)" fontSize="7.5" fontFamily="Inter">Token Ledger RAC Store</text>
            </g>
          </g>


          {/* ZONE 4: BANK CORP ZONE SUBSYSTEMS (X=975, W=210, H=48) */}
          <g transform="translate(975, 95)" style={{ cursor: 'pointer' }} onClick={() => onSelectComponent({ name: 'CBS Core Banking System', type: 'Bank Core Banking System' })}>
            <rect width="210" height="48" rx="10" fill="var(--svg-card-bg)" stroke="#9333ea" strokeWidth="1.5" />
            <text x="15" y="23" fill="var(--svg-card-title)" fontSize="11.5" fontWeight="700" fontFamily="Outfit">🏦 CBS (Core Banking)</text>
            <text x="15" y="38" fill="var(--svg-card-sub)" fontSize="8.5" fontFamily="JetBrains Mono">Account Debit / Credit API</text>
          </g>

          <g transform="translate(975, 158)" style={{ cursor: 'pointer' }} onClick={() => onSelectComponent({ name: 'Bank Middleware (ESB)', type: 'Enterprise Service Bus' })}>
            <rect width="210" height="48" rx="10" fill="var(--svg-card-bg)" stroke="#9333ea" strokeWidth="1.5" />
            <text x="15" y="23" fill="var(--svg-card-title)" fontSize="11.5" fontWeight="700" fontFamily="Outfit">🔄 Bank Middleware (ESB)</text>
            <text x="15" y="38" fill="var(--svg-card-sub)" fontSize="8.5" fontFamily="JetBrains Mono">Enterprise Integration Bus</text>
          </g>

          <g transform="translate(975, 221)" style={{ cursor: 'pointer' }} onClick={() => onSelectComponent({ name: 'Acquiring Subsystem', type: 'Merchant Acquiring System' })}>
            <rect width="210" height="48" rx="10" fill="var(--svg-card-bg)" stroke="var(--svg-card-stroke)" strokeWidth="1.2" />
            <text x="15" y="23" fill="var(--svg-card-title)" fontSize="11.5" fontWeight="700" fontFamily="Outfit">🏬 Acquiring Subsystem</text>
            <text x="15" y="38" fill="var(--svg-card-sub)" fontSize="8.5" fontFamily="JetBrains Mono">Merchant Settlement API</text>
          </g>

          <g transform="translate(975, 284)" style={{ cursor: 'pointer' }} onClick={() => onSelectComponent({ name: 'DCMS Card Management', type: 'Debit Card Subsystem' })}>
            <rect width="210" height="48" rx="10" fill="var(--svg-card-bg)" stroke="var(--svg-card-stroke)" strokeWidth="1.2" />
            <text x="15" y="23" fill="var(--svg-card-title)" fontSize="11.5" fontWeight="700" fontFamily="Outfit">💳 DCMS (Card Mgmt)</text>
            <text x="15" y="38" fill="var(--svg-card-sub)" fontSize="8.5" fontFamily="JetBrains Mono">Debit Card Auth & Mapping</text>
          </g>

          <g transform="translate(975, 347)" style={{ cursor: 'pointer' }} onClick={() => onSelectComponent({ name: 'OTP & SMS Gateway', type: '2FA Auth Service' })}>
            <rect width="210" height="48" rx="10" fill="var(--svg-card-bg)" stroke="var(--svg-card-stroke)" strokeWidth="1.2" />
            <text x="15" y="23" fill="var(--svg-card-title)" fontSize="11.5" fontWeight="700" fontFamily="Outfit">🔑 OTP / SMS G/W</text>
            <text x="15" y="38" fill="var(--svg-card-sub)" fontSize="8.5" fontFamily="JetBrains Mono">SMS OTP Delivery</text>
          </g>

          <g transform="translate(975, 410)" style={{ cursor: 'pointer' }} onClick={() => onSelectComponent({ name: 'UPI Gateway Switch', type: 'UPI Interoperability Switch' })}>
            <rect width="210" height="48" rx="10" fill="var(--svg-card-bg)" stroke="var(--svg-card-stroke)" strokeWidth="1.2" />
            <text x="15" y="23" fill="var(--svg-card-title)" fontSize="11.5" fontWeight="700" fontFamily="Outfit">⚡ UPI Gateway Switch</text>
            <text x="15" y="38" fill="var(--svg-card-sub)" fontSize="8.5" fontFamily="JetBrains Mono">UPI VPA & Callback Handler</text>
          </g>

          <g transform="translate(975, 473)" style={{ cursor: 'pointer' }} onClick={() => onSelectComponent({ name: 'SMTP & SFTP Gateways', type: 'Email & Secure File Transfer' })}>
            <rect width="210" height="48" rx="10" fill="var(--svg-card-bg)" stroke="var(--svg-card-stroke)" strokeWidth="1.2" />
            <text x="15" y="23" fill="var(--svg-card-title)" fontSize="11.5" fontWeight="700" fontFamily="Outfit">📧 SMTP / SFTP / HRMS</text>
            <text x="15" y="38" fill="var(--svg-card-sub)" fontSize="8.5" fontFamily="JetBrains Mono">Email & Batch File Transfer</text>
          </g>


          {/* ZONE 5: NPCI & RBI DLT NETWORK (X=1235, W=170, H=54) */}
          <g transform="translate(1235, 95)" style={{ cursor: 'pointer' }} onClick={() => onSelectComponent({ name: 'NPCI NET (PSO)', type: 'National Payment System Operator' })}>
            <rect width="170" height="54" rx="10" fill="var(--svg-card-bg)" stroke="var(--accent-rose)" strokeWidth="1.5" />
            <text x="12" y="24" fill="var(--svg-card-title)" fontSize="11.5" fontWeight="700" fontFamily="Outfit">🌐 NPCI NET (PSO)</text>
            <text x="12" y="40" fill="var(--accent-rose)" fontSize="9" fontFamily="JetBrains Mono">National Payment Switch</text>
          </g>

          <g transform="translate(1235, 170)" style={{ cursor: 'pointer' }} onClick={() => onSelectComponent({ name: 'RBI DTSP NODE', type: 'Central Bank Digital Currency Node' })}>
            <rect width="170" height="54" rx="10" fill="var(--svg-card-bg)" stroke="var(--accent-rose)" strokeWidth="1.5" />
            <text x="12" y="24" fill="var(--svg-card-title)" fontSize="11.5" fontWeight="700" fontFamily="Outfit">🏛️ RBI DTSP NODE</text>
            <text x="12" y="40" fill="var(--svg-card-sub)" fontSize="9" fontFamily="JetBrains Mono">Digital Token Platform</text>
          </g>

          <g transform="translate(1235, 245)" style={{ cursor: 'pointer' }} onClick={() => onSelectComponent({ name: 'DLT Blockchain Network', type: 'Distributed Ledger Technology' })}>
            <rect width="170" height="54" rx="10" fill="var(--svg-card-bg)" stroke="var(--accent-rose)" strokeWidth="1.5" />
            <text x="12" y="24" fill="var(--svg-card-title)" fontSize="11.5" fontWeight="700" fontFamily="Outfit">🔗 DLT Network</text>
            <text x="12" y="40" fill="var(--svg-card-sub)" fontSize="9" fontFamily="JetBrains Mono">Consensus Blockchain</text>
          </g>


          {/* BOTTOM ACRONYMS LEGEND BAR */}
          <g transform="translate(20, 680)">
            <rect width="1400" height="55" rx="10" fill="var(--svg-pill-bg)" stroke="var(--border-card)" strokeWidth="1" />
            <text x="15" y="20" fill="var(--accent-amber)" fontSize="10" fontWeight="700" fontFamily="Inter">
              ARCHITECTURE ACRONYMS: PLB (PSO Load Balancer) | AP (Admin Portal) | ILB (Internal Load Balancer) | MP (Merchant Portal) | MAB (Merchant App Backend) | BEC (Bank External Connector) | DMS (Digital Minting Services) | BIG (Bank Interface Gateway) | WAF (Web App Firewall) | PSO (Payment System Operator) | DTSP (Digital Token Service Provider) | MHA (Merchant Host Adapter)
            </text>
            <text x="15" y="40" fill="var(--text-muted)" fontSize="9.5" fontFamily="JetBrains Mono">
              ENVIRONMENT SPECS: PR (19 Nodes: 12 APP, 4 WEB, 3 DB) | DR (19 Nodes: 12 APP, 4 WEB, 3 DB) | TECH STACK: RHEL 8, Java 1.8/1.21, TypeScript, JPOS, Spring Boot, Nginx, Tomcat, Redis, Oracle DB RAC
            </text>
          </g>
        </svg>
      </div>
    </div>
  );
}
