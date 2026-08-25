import React from 'react';
import { COMMON_SERVICES } from '../data/diagramData';

export default function CustomDiagram({ mode, activeStep, onSelectComponent, componentsConfig }) {
  const isPRActive = mode === 'PR' || (mode === 'SIMULATION' && activeStep < 5);
  const isDRActive = mode === 'DR' || (mode === 'SIMULATION' && activeStep >= 5);

  const commonServicesList = componentsConfig?.commonServices || COMMON_SERVICES;
  const prConfig = componentsConfig?.siteArchitecture?.PR;
  const drConfig = componentsConfig?.siteArchitecture?.DR;

  // Rounded Corner Paths
  const prPathD = "M 700 112 L 700 123 Q 700 135 688 135 L 262 135 Q 250 135 250 147 L 250 195";
  const drPathD = "M 700 112 L 700 123 Q 700 135 712 135 L 1138 135 Q 1150 135 1150 147 L 1150 195";

  return (
    <div className="svg-canvas-container" style={{ overflow: 'hidden' }}>
      {/* Static Responsive SVG Canvas */}
      <div 
        className="svg-wrapper"
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <svg 
          viewBox="0 0 1400 780" 
          width="100%" 
          height="100%" 
          style={{ overflow: 'visible', maxHeight: 'calc(100vh - 80px)' }}
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            {/* Micro Compact 3px Arrowhead Markers */}
            <marker id="arrow-pr" viewBox="0 0 4 4" refX="4" refY="2" markerWidth="3" markerHeight="3" orient="auto-start-reverse">
              <path d="M 0 0 L 4 2 L 0 4 z" fill="var(--accent-pr)" />
            </marker>
            <marker id="arrow-dr" viewBox="0 0 4 4" refX="4" refY="2" markerWidth="3" markerHeight="3" orient="auto-start-reverse">
              <path d="M 0 0 L 4 2 L 0 4 z" fill="var(--accent-dr)" />
            </marker>
            <marker id="arrow-amber" viewBox="0 0 4 4" refX="4" refY="2" markerWidth="3" markerHeight="3" orient="auto-start-reverse">
              <path d="M 0 0 L 4 2 L 0 4 z" fill="var(--accent-amber)" />
            </marker>
            <marker id="arrow-static" viewBox="0 0 4 4" refX="4" refY="2" markerWidth="3" markerHeight="3" orient="auto-start-reverse">
              <path d="M 0 0 L 4 2 L 0 4 z" fill="#94a3b8" />
            </marker>

            {/* Circular Clip Paths for Custom 3D Assets */}
            <clipPath id="clip-circle">
              <circle cx="20" cy="20" r="18" />
            </clipPath>
            <clipPath id="clip-circle-lg">
              <circle cx="28" cy="28" r="24" />
            </clipPath>
          </defs>

          {/* ============================================================ */}
          {/* LAYER 1: ROUNDED CONNECTOR LINES WITH SLOW SMOOTH MOTION */}
          {/* ============================================================ */}

          {/* 1. Client DNS Router -> PR WAF Line (Rounded Corners) */}
          <path 
            d={prPathD}
            fill="none" 
            className={isPRActive ? "path-active-pr" : "path-static"}
            markerEnd={isPRActive ? "url(#arrow-pr)" : "url(#arrow-static)"}
          />
          {isPRActive && (
            <g style={{ filter: 'drop-shadow(0 0 4px var(--accent-pr))' }}>
              <circle r="3" fill="var(--accent-pr)">
                <animateMotion path={prPathD} dur="3.6s" repeatCount="indefinite" calcMode="linear" />
              </circle>
              <circle r="3" fill="var(--accent-pr)">
                <animateMotion path={prPathD} dur="3.6s" begin="1.2s" repeatCount="indefinite" calcMode="linear" />
              </circle>
              <circle r="3" fill="var(--accent-pr)">
                <animateMotion path={prPathD} dur="3.6s" begin="2.4s" repeatCount="indefinite" calcMode="linear" />
              </circle>
            </g>
          )}

          {/* 2. Client DNS Router -> DR WAF Line (Rounded Corners) */}
          <path 
            d={drPathD}
            fill="none" 
            className={isDRActive ? "path-active-dr" : "path-static"}
            markerEnd={isDRActive ? "url(#arrow-dr)" : "url(#arrow-static)"}
          />
          {isDRActive && (
            <g style={{ filter: 'drop-shadow(0 0 4px var(--accent-dr))' }}>
              <circle r="3" fill="var(--accent-dr)">
                <animateMotion path={drPathD} dur="3.6s" repeatCount="indefinite" calcMode="linear" />
              </circle>
              <circle r="3" fill="var(--accent-dr)">
                <animateMotion path={drPathD} dur="3.6s" begin="1.2s" repeatCount="indefinite" calcMode="linear" />
              </circle>
              <circle r="3" fill="var(--accent-dr)">
                <animateMotion path={drPathD} dur="3.6s" begin="2.4s" repeatCount="indefinite" calcMode="linear" />
              </circle>
            </g>
          )}

          {/* 3. PR WAF -> PR PLB Line */}
          <path 
            d="M 250 245 L 250 275" 
            fill="none" 
            className={isPRActive ? "path-active-pr" : "path-static"}
            markerEnd={isPRActive ? "url(#arrow-pr)" : "url(#arrow-static)"}
          />
          {/* 4. PR PLB -> PR ILB Line */}
          <path 
            d="M 250 325 L 250 355" 
            fill="none" 
            className={isPRActive ? "path-active-pr" : "path-static"}
            markerEnd={isPRActive ? "url(#arrow-pr)" : "url(#arrow-static)"}
          />
          {/* 5. PR ILB -> PR App VMs Cluster Line */}
          <path 
            d="M 250 405 L 250 435" 
            fill="none" 
            className={isPRActive ? "path-active-pr" : "path-static"}
            markerEnd={isPRActive ? "url(#arrow-pr)" : "url(#arrow-static)"}
          />
          {/* 6. PR App VMs -> Grouped PR Database Cluster Line */}
          <path 
            d="M 250 560 L 250 585" 
            fill="none" 
            className={isPRActive ? "path-active-pr" : "path-static"}
            markerEnd={isPRActive ? "url(#arrow-pr)" : "url(#arrow-static)"}
          />

          {/* Continuous Vertical Slow Energy Flow Particles for PR */}
          {isPRActive && (
            <g style={{ filter: 'drop-shadow(0 0 4px var(--accent-pr))' }}>
              <circle r="2.5" fill="var(--accent-pr)">
                <animateMotion path="M 250 245 L 250 275" dur="1.6s" repeatCount="indefinite" calcMode="linear" />
              </circle>
              <circle r="2.5" fill="var(--accent-pr)">
                <animateMotion path="M 250 325 L 250 355" dur="1.6s" repeatCount="indefinite" calcMode="linear" />
              </circle>
              <circle r="2.5" fill="var(--accent-pr)">
                <animateMotion path="M 250 405 L 250 435" dur="1.6s" repeatCount="indefinite" calcMode="linear" />
              </circle>
              <circle r="2.5" fill="var(--accent-pr)">
                <animateMotion path="M 250 560 L 250 585" dur="1.6s" repeatCount="indefinite" calcMode="linear" />
              </circle>
            </g>
          )}

          {/* 7. DR WAF -> DR PLB Line */}
          <path 
            d="M 1150 245 L 1150 275" 
            fill="none" 
            className={isDRActive ? "path-active-dr" : "path-static"}
            markerEnd={isDRActive ? "url(#arrow-dr)" : "url(#arrow-static)"}
          />
          {/* 8. DR PLB -> DR ILB Line */}
          <path 
            d="M 1150 325 L 1150 355" 
            fill="none" 
            className={isDRActive ? "path-active-dr" : "path-static"}
            markerEnd={isDRActive ? "url(#arrow-dr)" : "url(#arrow-static)"}
          />
          {/* 9. DR ILB -> DR App VMs Cluster Line */}
          <path 
            d="M 1150 405 L 1150 435" 
            fill="none" 
            className={isDRActive ? "path-active-dr" : "path-static"}
            markerEnd={isDRActive ? "url(#arrow-dr)" : "url(#arrow-static)"}
          />
          {/* 10. DR App VMs -> Grouped DR Database Cluster Line */}
          <path 
            d="M 1150 560 L 1150 585" 
            fill="none" 
            className={isDRActive ? "path-active-dr" : "path-static"}
            markerEnd={isDRActive ? "url(#arrow-dr)" : "url(#arrow-static)"}
          />

          {/* Continuous Vertical Slow Energy Flow Particles for DR */}
          {isDRActive && (
            <g style={{ filter: 'drop-shadow(0 0 4px var(--accent-dr))' }}>
              <circle r="2.5" fill="var(--accent-dr)">
                <animateMotion path="M 1150 245 L 1150 275" dur="1.6s" repeatCount="indefinite" calcMode="linear" />
              </circle>
              <circle r="2.5" fill="var(--accent-dr)">
                <animateMotion path="M 1150 325 L 1150 355" dur="1.6s" repeatCount="indefinite" calcMode="linear" />
              </circle>
              <circle r="2.5" fill="var(--accent-dr)">
                <animateMotion path="M 1150 405 L 1150 435" dur="1.6s" repeatCount="indefinite" calcMode="linear" />
              </circle>
              <circle r="2.5" fill="var(--accent-dr)">
                <animateMotion path="M 1150 560 L 1150 585" dur="1.6s" repeatCount="indefinite" calcMode="linear" />
              </circle>
            </g>
          )}

          {/* 11. PR App Cluster -> Common Services Column Line */}
          <path 
            d="M 400 497.5 L 540 497.5" 
            fill="none" 
            className={isPRActive ? "path-active-pr" : "path-static"}
            markerEnd={isPRActive ? "url(#arrow-pr)" : "url(#arrow-static)"}
          />
          {isPRActive && (
            <g style={{ filter: 'drop-shadow(0 0 4px var(--accent-pr))' }}>
              <circle r="3" fill="var(--accent-pr)">
                <animateMotion path="M 400 497.5 L 540 497.5" dur="2.4s" repeatCount="indefinite" calcMode="linear" />
              </circle>
              <circle r="3" fill="var(--accent-pr)">
                <animateMotion path="M 400 497.5 L 540 497.5" dur="2.4s" begin="1.2s" repeatCount="indefinite" calcMode="linear" />
              </circle>
            </g>
          )}

          {/* 12. DR App Cluster -> Common Services Column Line */}
          <path 
            d="M 1000 497.5 L 885 497.5" 
            fill="none" 
            className={isDRActive ? "path-active-dr" : "path-static"}
            markerEnd={isDRActive ? "url(#arrow-dr)" : "url(#arrow-static)"}
          />
          {isDRActive && (
            <g style={{ filter: 'drop-shadow(0 0 4px var(--accent-dr))' }}>
              <circle r="3" fill="var(--accent-dr)">
                <animateMotion path="M 1000 497.5 L 885 497.5" dur="2.4s" repeatCount="indefinite" calcMode="linear" />
              </circle>
              <circle r="3" fill="var(--accent-dr)">
                <animateMotion path="M 1000 497.5 L 885 497.5" dur="2.4s" begin="1.2s" repeatCount="indefinite" calcMode="linear" />
              </circle>
            </g>
          )}

          {/* DYNAMIC VICE-VERSA ORACLE DATA GUARD REPLICATION LINE (Between Grouped DB Clusters) */}
          {isPRActive ? (
            /* PR Active: Replication flows Left -> Right */
            <>
              <path 
                d="M 415 640 L 985 640" 
                fill="none" 
                stroke="var(--accent-amber)"
                strokeWidth="2.5"
                strokeDasharray="10 5"
                strokeLinecap="round"
                strokeLinejoin="round"
                markerEnd="url(#arrow-amber)"
                style={{ animation: 'flow-dash-pr 1.2s linear infinite', filter: 'drop-shadow(0 0 6px rgba(217, 119, 6, 0.6))' }}
              />
              <g style={{ filter: 'drop-shadow(0 0 4px var(--accent-amber))' }}>
                <circle r="3" fill="var(--accent-amber)">
                  <animateMotion path="M 415 640 L 985 640" dur="4.5s" repeatCount="indefinite" calcMode="linear" />
                </circle>
                <circle r="3" fill="var(--accent-amber)">
                  <animateMotion path="M 415 640 L 985 640" dur="4.5s" begin="2.25s" repeatCount="indefinite" calcMode="linear" />
                </circle>
              </g>
            </>
          ) : (
            /* DR Active: Replication REVERSES Right -> Left */
            <>
              <path 
                d="M 985 640 L 415 640" 
                fill="none" 
                stroke="var(--accent-amber)"
                strokeWidth="2.5"
                strokeDasharray="10 5"
                strokeLinecap="round"
                strokeLinejoin="round"
                markerEnd="url(#arrow-amber)"
                style={{ animation: 'flow-dash-pr 1.2s linear infinite', filter: 'drop-shadow(0 0 6px rgba(217, 119, 6, 0.6))' }}
              />
              <g style={{ filter: 'drop-shadow(0 0 4px var(--accent-amber))' }}>
                <circle r="3" fill="var(--accent-amber)">
                  <animateMotion path="M 985 640 L 415 640" dur="4.5s" repeatCount="indefinite" calcMode="linear" />
                </circle>
                <circle r="3" fill="var(--accent-amber)">
                  <animateMotion path="M 985 640 L 415 640" dur="4.5s" begin="2.25s" repeatCount="indefinite" calcMode="linear" />
                </circle>
              </g>
            </>
          )}

          {/* ============================================================ */}
          {/* LAYER 2: REGION BOUNDARY CONTAINERS & HEADERS */}
          {/* ============================================================ */}

          {/* PR Site Outer Container (Rawale DC) */}
          <g transform="translate(60, 175)">
            <rect 
              width="380" 
              height="540" 
              rx="16" 
              fill="var(--svg-region-pr-bg)" 
              stroke="var(--accent-pr)" 
              strokeWidth="1.5" 
              strokeDasharray="8 4"
            />
            <rect x="80" y="528" width="220" height="26" rx="6" fill="var(--accent-pr)" stroke="var(--accent-pr)" />
            <text x="190" y="545" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="700" fontFamily="Inter">
              PRIMARY REGION (RAWALE DC)
            </text>
          </g>

          {/* DR Site Outer Container (Gachibowli DC) */}
          <g transform="translate(960, 175)">
            <rect 
              width="380" 
              height="540" 
              rx="16" 
              fill="var(--svg-region-dr-bg)" 
              stroke="var(--accent-dr)" 
              strokeWidth="1.5" 
              strokeDasharray="8 4"
            />
            <rect x="70" y="528" width="240" height="26" rx="6" fill="var(--accent-dr)" stroke="var(--accent-dr)" />
            <text x="190" y="545" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="700" fontFamily="Inter">
              DISASTER RECOVERY (GACHIBOWLI DC)
            </text>
          </g>

          {/* Common Services Container (Center) */}
          <g transform="translate(515, 175)">
            <rect 
              width="370" 
              height="420" 
              rx="16" 
              fill="var(--svg-region-cs-bg)" 
              stroke="var(--accent-amber)" 
              strokeWidth="1.5" 
              strokeDasharray="8 4"
            />
            <rect x="70" y="406" width="230" height="26" rx="6" fill="var(--accent-amber)" stroke="var(--accent-amber)" />
            <text x="185" y="423" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="700" fontFamily="Inter">
              COMMON SERVICES (SHARED VMN)
            </text>
          </g>

          {/* ============================================================ */}
          {/* LAYER 3: TOP CLIENT & DNS ROUTER CARDS (WITH 3D CUSTOM ASSET) */}
          {/* ============================================================ */}

          {/* Mobile Client & Endpoints Card */}
          <g transform="translate(480, 15)" style={{ cursor: 'pointer' }} onClick={() => onSelectComponent({ name: 'e-Rupee Client Endpoints', domain: 'erupeeapp.sbi.bank.in', type: 'Public App Gateways' })}>
            <rect width="440" height="54" rx="12" fill="var(--svg-card-bg)" stroke="var(--svg-card-stroke)" strokeWidth="1.5" />
            <g transform="translate(10, 4)">
              <image href="/assets/mobile_banking_app_icon.jpg" width="45" height="45" clipPath="url(#clip-circle-lg)" />
            </g>
            <text x="68" y="24" fill="var(--svg-card-title)" fontSize="13" fontWeight="700" fontFamily="Outfit">
              e-Rupee Mobile & Merchant Portals
            </text>
            <text x="68" y="41" fill="var(--svg-card-sub)" fontSize="10" fontFamily="JetBrains Mono">
              erupeeapp.sbi.bank.in | merchanterupee.sbi.bank.in
            </text>
          </g>

          {/* DNS Router Box */}
          <g transform="translate(560, 78)">
            <rect width="280" height="34" rx="8" fill="var(--svg-pill-bg)" stroke="var(--accent-amber)" strokeWidth="1.5" />
            <text x="140" y="21" textAnchor="middle" fill="var(--accent-amber)" fontSize="11" fontWeight="600" fontFamily="Inter">
              🌐 DNS Target: {isPRActive ? (prConfig?.wafName || 'WAF-PR (10.x.x.252)') : (drConfig?.wafName || 'WAF-DR (10.x.x.230)')}
            </text>
          </g>

          {/* ============================================================ */}
          {/* LAYER 4: PRIMARY REGION NODES WITH GROUPED DB CLUSTER (PR) */}
          {/* ============================================================ */}

          {/* PR WAF-PR-252 */}
          <g transform="translate(150, 195)" style={{ cursor: 'pointer' }} onClick={() => onSelectComponent({ key: 'WAF', name: `Web Application Firewall (${prConfig?.wafName || 'WAF-PR-252'})`, ipPR: prConfig?.wafIp || '10.x.x.252', type: 'Edge Security' })}>
            <rect width="200" height="50" rx="10" fill="var(--svg-card-bg)" stroke="var(--accent-pr)" strokeWidth="2" />
            <g transform="translate(5, 5)">
              <image href="/assets/waf_security_icon.jpg" width="40" height="40" clipPath="url(#clip-circle)" />
            </g>
            <text x="52" y="24" fill="var(--svg-card-title)" fontSize="12" fontWeight="700" fontFamily="Outfit">{prConfig?.wafName || 'WAF-PR-252'}</text>
            <text x="52" y="40" fill="var(--accent-pr)" fontSize="10" fontFamily="JetBrains Mono">{prConfig?.wafIp || '10.x.x.252'}</text>
          </g>

          {/* PR Public Load Balancer (PLB) */}
          <g transform="translate(150, 275)" style={{ cursor: 'pointer' }} onClick={() => onSelectComponent({ key: 'PLB', name: 'Public Load Balancer (PR PLB)', domain: prConfig?.plbEndpoint || 'cbdc-plb.bank.sbi', type: 'Load Balancer' })}>
            <rect width="200" height="50" rx="10" fill="var(--svg-card-bg)" stroke="var(--accent-pr)" strokeWidth="1.5" />
            <g transform="translate(5, 5)">
              <image href="/assets/load_balancer_icon.jpg" width="40" height="40" clipPath="url(#clip-circle)" />
            </g>
            <text x="52" y="24" fill="var(--svg-card-title)" fontSize="12" fontWeight="700" fontFamily="Outfit">Public LB (PLB)</text>
            <text x="52" y="40" fill="var(--svg-card-sub)" fontSize="10" fontFamily="JetBrains Mono">{prConfig?.plbEndpoint || 'cbdc-plb.bank.sbi'}</text>
          </g>

          {/* PR Internal Load Balancer (ILB) */}
          <g transform="translate(150, 355)" style={{ cursor: 'pointer' }} onClick={() => onSelectComponent({ key: 'ILB', name: 'Internal Load Balancer (PR ILB)', domain: prConfig?.ilbEndpoint || 'cbdc-ilb.bank.sbi', type: 'Load Balancer' })}>
            <rect width="200" height="50" rx="10" fill="var(--svg-card-bg)" stroke="var(--accent-pr)" strokeWidth="1.5" />
            <g transform="translate(5, 5)">
              <image href="/assets/load_balancer_icon.jpg" width="40" height="40" clipPath="url(#clip-circle)" />
            </g>
            <text x="52" y="24" fill="var(--svg-card-title)" fontSize="12" fontWeight="700" fontFamily="Outfit">Internal LB (ILB)</text>
            <text x="52" y="40" fill="var(--svg-card-sub)" fontSize="10" fontFamily="JetBrains Mono">{prConfig?.ilbEndpoint || 'cbdc-ilb.bank.sbi'}</text>
          </g>

          {/* PR RTSP CORE SERVICES APPLICATION VM CLUSTER */}
          <g transform="translate(100, 435)" style={{ cursor: 'pointer' }} onClick={() => onSelectComponent({ name: 'RTSP Core Services Cluster (PR)', type: 'Microservice Cluster (7 Applications)', status: 'RUNNING' })}>
            <rect width="300" height="125" rx="12" fill="var(--svg-card-bg)" stroke="var(--accent-pr)" strokeWidth="1.5" />
            <text x="15" y="20" fill="var(--accent-pr)" fontSize="11" fontWeight="700" fontFamily="Inter">RTSP Core Services (PR)</text>
            
            <g transform="translate(255, 12)">
              <image href="/assets/server_rack_icon.jpg" width="32" height="32" clipPath="url(#clip-circle)" />
            </g>

            {/* Row 1 Applications */}
            <g transform="translate(12, 30)">
              <rect width="86" height="24" rx="5" fill="var(--svg-pill-bg)" stroke="var(--svg-pill-stroke)" />
              <text x="14" y="16" fill="var(--svg-pill-text)" fontSize="9" fontWeight="600">rtsp-app</text>
            </g>

            <g transform="translate(105, 30)">
              <rect width="86" height="24" rx="5" fill="var(--svg-pill-bg)" stroke="var(--svg-pill-stroke)" />
              <text x="14" y="16" fill="var(--svg-pill-text)" fontSize="9" fontWeight="600">rtsp-pso</text>
            </g>

            <g transform="translate(198, 30)">
              <rect width="86" height="24" rx="5" fill="var(--svg-pill-bg)" stroke="var(--svg-pill-stroke)" />
              <text x="26" y="16" fill="var(--svg-pill-text)" fontSize="9" fontWeight="600">mint</text>
            </g>

            {/* Row 2 Applications */}
            <g transform="translate(12, 60)">
              <rect width="86" height="24" rx="5" fill="var(--svg-pill-bg)" stroke="var(--svg-pill-stroke)" />
              <text x="28" y="16" fill="var(--svg-pill-text)" fontSize="9" fontWeight="600">BIG</text>
            </g>

            <g transform="translate(105, 60)">
              <rect width="86" height="24" rx="5" fill="var(--svg-pill-bg)" stroke="var(--svg-pill-stroke)" />
              <text x="12" y="16" fill="var(--svg-pill-text)" fontSize="9" fontWeight="600">AppBackend</text>
            </g>

            <g transform="translate(198, 60)">
              <rect width="86" height="24" rx="5" fill="var(--svg-pill-bg)" stroke="var(--svg-pill-stroke)" />
              <text x="10" y="16" fill="var(--svg-pill-text)" fontSize="9" fontWeight="600">Admin Portal</text>
            </g>

            {/* Row 3 Application */}
            <g transform="translate(85, 90)">
              <rect width="130" height="24" rx="5" fill="var(--svg-pill-bg)" stroke="var(--svg-pill-stroke)" />
              <text x="20" y="16" fill="var(--svg-pill-text)" fontSize="9" fontWeight="600">Merchant Portal</text>
            </g>
          </g>

          {/* GROUPED PR DATABASE CLUSTER CONTAINER */}
          <g transform="translate(85, 585)">
            <rect width="330" height="110" rx="12" fill="var(--svg-card-bg)" stroke={isPRActive ? "var(--accent-pr)" : "#94a3b8"} strokeWidth="1.5" />
            <text x="15" y="22" fill={isPRActive ? "var(--accent-pr)" : "var(--svg-card-sub)"} fontSize="11" fontWeight="700" fontFamily="Inter">
              ORACLE DB CLUSTER (PR RAWALE)
            </text>

            {/* Inside PR RTSP DB */}
            <g transform="translate(12, 30)" style={{ cursor: 'pointer' }} onClick={() => onSelectComponent({ key: 'rtsp-db', name: 'RTSP DB (PR Rawale)', domain: 'cbdc-rtsp-db.bank.sbi', type: isPRActive ? 'Primary Relational DB (READ WRITE)' : 'Standby Relational DB (READ ONLY)' })}>
              <rect width="145" height="70" rx="8" fill="var(--svg-pill-bg)" stroke={isPRActive ? "var(--accent-pr)" : "var(--svg-pill-stroke)"} strokeWidth="1.5" />
              <g transform="translate(4, 4)">
                <image href="/assets/oracle_database_icon.jpg" width="30" height="30" clipPath="url(#clip-circle)" />
              </g>
              <text x="38" y="20" fill="var(--svg-pill-text)" fontSize="10" fontWeight="700" fontFamily="Outfit">cbdc-rtsp-db</text>
              <text x="8" y="44" fill={isPRActive ? "var(--accent-pr)" : "var(--svg-card-sub)"} fontSize="9" fontWeight="600" fontFamily="Inter">
                {isPRActive ? 'READ WRITE' : 'READ-ONLY'}
              </text>
              <text x="8" y="58" fill="var(--svg-card-sub)" fontSize="8" fontFamily="JetBrains Mono">
                {isPRActive ? 'Primary DB' : 'Standby DB'}
              </text>
            </g>

            {/* Inside PR Mint DB */}
            <g transform="translate(170, 30)" style={{ cursor: 'pointer' }} onClick={() => onSelectComponent({ key: 'mint-db', name: 'Mint DB (PR Rawale)', domain: 'cbdc-mint-db.bank.sbi', type: isPRActive ? 'Primary Mint DB (READ WRITE)' : 'Standby Mint DB (READ ONLY)' })}>
              <rect width="145" height="70" rx="8" fill="var(--svg-pill-bg)" stroke={isPRActive ? "var(--accent-pr)" : "var(--svg-pill-stroke)"} strokeWidth="1.5" />
              <g transform="translate(4, 4)">
                <image href="/assets/oracle_database_icon.jpg" width="30" height="30" clipPath="url(#clip-circle)" />
              </g>
              <text x="38" y="20" fill="var(--svg-pill-text)" fontSize="10" fontWeight="700" fontFamily="Outfit">cbdc-mint-db</text>
              <text x="8" y="44" fill={isPRActive ? "var(--accent-pr)" : "var(--svg-card-sub)"} fontSize="9" fontWeight="600" fontFamily="Inter">
                {isPRActive ? 'READ WRITE' : 'READ-ONLY'}
              </text>
              <text x="8" y="58" fill="var(--svg-card-sub)" fontSize="8" fontFamily="JetBrains Mono">
                {isPRActive ? 'Mint Ledger DB' : 'Standby DB'}
              </text>
            </g>
          </g>

          {/* ============================================================ */}
          {/* LAYER 5: DISASTER RECOVERY NODES WITH GROUPED DB CLUSTER (DR) */}
          {/* ============================================================ */}

          {/* DR WAF-DR-230 */}
          <g transform="translate(1050, 195)" style={{ cursor: 'pointer' }} onClick={() => onSelectComponent({ key: 'WAF', name: `Web Application Firewall (${drConfig?.wafName || 'WAF-DR-230'})`, ipDR: drConfig?.wafIp || '10.x.x.230', type: 'Edge Security' })}>
            <rect width="200" height="50" rx="10" fill="var(--svg-card-bg)" stroke="var(--accent-dr)" strokeWidth="2" />
            <g transform="translate(5, 5)">
              <image href="/assets/waf_security_icon.jpg" width="40" height="40" clipPath="url(#clip-circle)" />
            </g>
            <text x="52" y="24" fill="var(--svg-card-title)" fontSize="12" fontWeight="700" fontFamily="Outfit">{drConfig?.wafName || 'WAF-DR-230'}</text>
            <text x="52" y="40" fill="var(--accent-dr)" fontSize="10" fontFamily="JetBrains Mono">{drConfig?.wafIp || '10.x.x.230'}</text>
          </g>

          {/* DR Public Load Balancer (PLB) */}
          <g transform="translate(1050, 275)" style={{ cursor: 'pointer' }} onClick={() => onSelectComponent({ key: 'PLB', name: 'Public Load Balancer (DR PLB)', domain: drConfig?.plbEndpoint || 'cbdc-plb.bank.sbi', type: 'Load Balancer' })}>
            <rect width="200" height="50" rx="10" fill="var(--svg-card-bg)" stroke="var(--accent-dr)" strokeWidth="1.5" />
            <g transform="translate(5, 5)">
              <image href="/assets/load_balancer_icon.jpg" width="40" height="40" clipPath="url(#clip-circle)" />
            </g>
            <text x="52" y="24" fill="var(--svg-card-title)" fontSize="12" fontWeight="700" fontFamily="Outfit">Public LB (PLB)</text>
            <text x="52" y="40" fill="var(--svg-card-sub)" fontSize="10" fontFamily="JetBrains Mono">{drConfig?.plbEndpoint || 'cbdc-plb.bank.sbi'}</text>
          </g>

          {/* DR Internal Load Balancer (ILB) */}
          <g transform="translate(1050, 355)" style={{ cursor: 'pointer' }} onClick={() => onSelectComponent({ key: 'ILB', name: 'Internal Load Balancer (DR ILB)', domain: drConfig?.ilbEndpoint || 'cbdc-ilb.bank.sbi', type: 'Load Balancer' })}>
            <rect width="200" height="50" rx="10" fill="var(--svg-card-bg)" stroke="var(--accent-dr)" strokeWidth="1.5" />
            <g transform="translate(5, 5)">
              <image href="/assets/load_balancer_icon.jpg" width="40" height="40" clipPath="url(#clip-circle)" />
            </g>
            <text x="52" y="24" fill="var(--svg-card-title)" fontSize="12" fontWeight="700" fontFamily="Outfit">Internal LB (ILB)</text>
            <text x="52" y="40" fill="var(--svg-card-sub)" fontSize="10" fontFamily="JetBrains Mono">{drConfig?.ilbEndpoint || 'cbdc-ilb.bank.sbi'}</text>
          </g>

          {/* DR RTSP CORE SERVICES APPLICATION VM CLUSTER */}
          <g transform="translate(1000, 435)" style={{ cursor: 'pointer' }} onClick={() => onSelectComponent({ name: 'RTSP Core Services Cluster (DR Gachibowli)', type: 'Microservice Cluster (7 Applications)', status: isDRActive ? 'RUNNING' : 'STANDBY' })}>
            <rect width="300" height="125" rx="12" fill="var(--svg-card-bg)" stroke="var(--accent-dr)" strokeWidth="1.5" />
            <text x="15" y="20" fill="var(--accent-dr)" fontSize="11" fontWeight="700" fontFamily="Inter">RTSP Core Services (DR)</text>
            
            <g transform="translate(255, 12)">
              <image href="/assets/server_rack_icon.jpg" width="32" height="32" clipPath="url(#clip-circle)" />
            </g>

            {/* Row 1 Applications */}
            <g transform="translate(12, 30)">
              <rect width="86" height="24" rx="5" fill="var(--svg-pill-bg)" stroke="var(--svg-pill-stroke)" />
              <text x="14" y="16" fill="var(--svg-pill-text)" fontSize="9" fontWeight="600">rtsp-app</text>
            </g>

            <g transform="translate(105, 30)">
              <rect width="86" height="24" rx="5" fill="var(--svg-pill-bg)" stroke="var(--svg-pill-stroke)" />
              <text x="14" y="16" fill="var(--svg-pill-text)" fontSize="9" fontWeight="600">rtsp-pso</text>
            </g>

            <g transform="translate(198, 30)">
              <rect width="86" height="24" rx="5" fill="var(--svg-pill-bg)" stroke="var(--svg-pill-stroke)" />
              <text x="26" y="16" fill="var(--svg-pill-text)" fontSize="9" fontWeight="600">mint</text>
            </g>

            {/* Row 2 Applications */}
            <g transform="translate(12, 60)">
              <rect width="86" height="24" rx="5" fill="var(--svg-pill-bg)" stroke="var(--svg-pill-stroke)" />
              <text x="28" y="16" fill="var(--svg-pill-text)" fontSize="9" fontWeight="600">BIG</text>
            </g>

            <g transform="translate(105, 60)">
              <rect width="86" height="24" rx="5" fill="var(--svg-pill-bg)" stroke="var(--svg-pill-stroke)" />
              <text x="12" y="16" fill="var(--svg-pill-text)" fontSize="9" fontWeight="600">AppBackend</text>
            </g>

            <g transform="translate(198, 60)">
              <rect width="86" height="24" rx="5" fill="var(--svg-pill-bg)" stroke="var(--svg-pill-stroke)" />
              <text x="10" y="16" fill="var(--svg-pill-text)" fontSize="9" fontWeight="600">Admin Portal</text>
            </g>

            {/* Row 3 Application */}
            <g transform="translate(85, 90)">
              <rect width="130" height="24" rx="5" fill="var(--svg-pill-bg)" stroke="var(--svg-pill-stroke)" />
              <text x="20" y="16" fill="var(--svg-pill-text)" fontSize="9" fontWeight="600">Merchant Portal</text>
            </g>
          </g>

          {/* GROUPED DR DATABASE CLUSTER CONTAINER */}
          <g transform="translate(985, 585)">
            <rect width="330" height="110" rx="12" fill="var(--svg-card-bg)" stroke={isDRActive ? "var(--accent-dr)" : "#94a3b8"} strokeWidth="1.5" />
            <text x="15" y="22" fill={isDRActive ? "var(--accent-dr)" : "var(--svg-card-sub)"} fontSize="11" fontWeight="700" fontFamily="Inter">
              ORACLE DB CLUSTER (DR GACHIBOWLI)
            </text>

            {/* Inside DR RTSP DB */}
            <g transform="translate(12, 30)" style={{ cursor: 'pointer' }} onClick={() => onSelectComponent({ key: 'rtsp-db', name: 'RTSP DB (DR Gachibowli)', domain: 'cbdc-rtsp-db.bank.sbi', type: isDRActive ? 'Primary Relational DB (READ WRITE)' : 'Standby Relational DB (READ ONLY)' })}>
              <rect width="145" height="70" rx="8" fill="var(--svg-pill-bg)" stroke={isDRActive ? "var(--accent-dr)" : "var(--svg-pill-stroke)"} strokeWidth="1.5" />
              <g transform="translate(4, 4)">
                <image href="/assets/oracle_database_icon.jpg" width="30" height="30" clipPath="url(#clip-circle)" />
              </g>
              <text x="38" y="20" fill="var(--svg-pill-text)" fontSize="10" fontWeight="700" fontFamily="Outfit">cbdc-rtsp-db</text>
              <text x="8" y="44" fill={isDRActive ? "var(--accent-dr)" : "var(--svg-card-sub)"} fontSize="9" fontWeight="600" fontFamily="Inter">
                {isDRActive ? 'READ WRITE' : 'READ-ONLY'}
              </text>
              <text x="8" y="58" fill="var(--svg-card-sub)" fontSize="8" fontFamily="JetBrains Mono">
                {isDRActive ? 'Promoted DB' : 'Standby DB'}
              </text>
            </g>

            {/* Inside DR Mint DB */}
            <g transform="translate(170, 30)" style={{ cursor: 'pointer' }} onClick={() => onSelectComponent({ key: 'mint-db', name: 'Mint DB (DR Gachibowli)', domain: 'cbdc-mint-db.bank.sbi', type: isDRActive ? 'Primary Mint DB (READ WRITE)' : 'Standby Mint DB (READ ONLY)' })}>
              <rect width="145" height="70" rx="8" fill="var(--svg-pill-bg)" stroke={isDRActive ? "var(--accent-dr)" : "var(--svg-pill-stroke)"} strokeWidth="1.5" />
              <g transform="translate(4, 4)">
                <image href="/assets/oracle_database_icon.jpg" width="30" height="30" clipPath="url(#clip-circle)" />
              </g>
              <text x="38" y="20" fill="var(--svg-pill-text)" fontSize="10" fontWeight="700" fontFamily="Outfit">cbdc-mint-db</text>
              <text x="8" y="44" fill={isDRActive ? "var(--accent-dr)" : "var(--svg-card-sub)"} fontSize="9" fontWeight="600" fontFamily="Inter">
                {isDRActive ? 'READ WRITE' : 'READ-ONLY'}
              </text>
              <text x="8" y="58" fill="var(--svg-card-sub)" fontSize="8" fontFamily="JetBrains Mono">
                {isDRActive ? 'Promoted DB' : 'Standby DB'}
              </text>
            </g>
          </g>

          {/* Oracle Data Guard Dynamic Direction Card (Center Bottom) */}
          <g transform="translate(560, 620)">
            <rect width="280" height="40" rx="8" fill="var(--svg-card-bg)" stroke="var(--accent-amber)" strokeWidth="1.5" />
            <text x="140" y="18" textAnchor="middle" fill="var(--accent-amber)" fontSize="11" fontWeight="700" fontFamily="Outfit">
              ⚡ ORACLE DATA GUARD: {isPRActive ? 'PR ➔ DR SYNC' : 'DR ➔ PR SYNC'}
            </text>
            <text x="140" y="32" textAnchor="middle" fill="var(--svg-card-sub)" fontSize="9" fontFamily="Inter">
              Direction: {isPRActive ? 'Rawale (R/W) ➔ Gachibowli (R/O)' : 'Gachibowli (R/W) ➔ Rawale (R/O)'}
            </text>
          </g>

          {/* ============================================================ */}
          {/* LAYER 6: COMMON SERVICES COLUMN (CENTER) */}
          {/* ============================================================ */}

          {commonServicesList.map((svc, idx) => {
            const yPos = 195 + idx * 42;
            return (
              <g 
                key={svc.id} 
                transform={`translate(540, ${yPos})`}
                style={{ cursor: 'pointer' }}
                onClick={() => onSelectComponent(svc)}
              >
                <rect 
                  width="320" 
                  height="36" 
                  rx="8" 
                  fill="var(--svg-card-bg)" 
                  stroke="var(--svg-card-stroke)" 
                  strokeWidth="1" 
                />
                <circle cx="20" cy="18" r="9" fill="var(--accent-amber)" />
                <text x="20" y="22" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">{svc.number}</text>
                <text x="38" y="22" fill="var(--svg-card-title)" fontSize="11" fontWeight="700" fontFamily="Outfit">{svc.name}</text>
                <text x="160" y="22" fill="var(--svg-card-sub)" fontSize="10" fontFamily="JetBrains Mono">{svc.endpoint}</text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
