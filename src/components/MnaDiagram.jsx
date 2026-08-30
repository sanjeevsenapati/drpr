import React, { useState } from 'react';
import { 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Maximize2, 
  Table, 
  Server, 
  Layers, 
  Cpu, 
  CheckCircle2, 
  FileText,
  Info,
  ShieldCheck
} from 'lucide-react';

export default function MnaDiagram({ onSelectComponent }) {
  const [activeView, setActiveView] = useState('DIAGRAM'); // 'DIAGRAM' | 'MATRIX' | 'SPECS'
  const [zoomLevel, setZoomLevel] = useState(100);
  const [selectedMnaNode, setSelectedMnaNode] = useState(null);

  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 20, 200));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 20, 50));
  const handleResetZoom = () => setZoomLevel(100);

  // Environment node count data extracted directly from MNA.svg
  const environmentNodeCounts = [
    { env: 'PRIMARY REGION (PR)', appNodes: 12, webNodes: 4, dbNodes: 3, totalNodes: 19, status: 'ACTIVE (R/W)' },
    { env: 'DISASTER RECOVERY (DR)', appNodes: 12, webNodes: 4, dbNodes: 3, totalNodes: 19, status: 'STANDBY (R/O)' },
    { env: 'UAT1 ENVIRONMENT', appNodes: 12, webNodes: 4, dbNodes: 3, totalNodes: 19, status: 'STAGING' },
    { env: 'UAT2 ENVIRONMENT', appNodes: 12, webNodes: 4, dbNodes: 3, totalNodes: 19, status: 'STAGING' },
    { env: 'UAT3 ENVIRONMENT', appNodes: 4, webNodes: 1, dbNodes: 3, totalNodes: 8, status: 'TESTING' },
    { env: 'UAT4 ENVIRONMENT', appNodes: 4, webNodes: 1, dbNodes: 3, totalNodes: 8, status: 'TESTING' }
  ];

  // Tech stack specs extracted directly from MNA.svg
  const techStackSpecs = [
    { category: 'Operating System', technology: 'RHEL 8 (Red Hat Enterprise Linux 8)' },
    { category: 'Application Runtimes', technology: 'Java (JDK 1.8 / JDK 1.21), TypeScript' },
    { category: 'Core Frameworks', technology: 'JPOS (ISO-8583 Switch), Spring Boot 3.x' },
    { category: 'Web & App Servers', technology: 'Nginx (DMZ Proxy), Apache Tomcat (App Clusters)' },
    { category: 'Caching & Streaming', technology: 'Redis HA Cluster, Apache Kafka Event Bus' },
    { category: 'Database Engine', technology: 'Oracle DB (Real Application Clusters & Data Guard)' }
  ];

  // Abbreviations legend extracted directly from MNA.svg
  const abbreviationsLegend = [
    { code: 'PLB', name: 'PSO Load Balancer' },
    { code: 'AP', name: 'Admin Portal' },
    { code: 'ILB', name: 'Internal Load Balancer' },
    { code: 'MP', name: 'Merchant Portal' },
    { code: 'MAB', name: 'Merchant App Backend' },
    { code: 'BEC', name: 'Bank External Connector' },
    { code: 'DMS', name: 'Digital Minting Services (MinT)' },
    { code: 'BIG', name: 'Bank Interface Gateway' },
    { code: 'WAF', name: 'Web Application Firewall' },
    { code: 'LB DMZ', name: 'DMZ Load Balancer' },
    { code: 'LB MZ', name: 'Main Zone Load Balancer' },
    { code: 'PSO', name: 'Payment System Operator' },
    { code: 'DTSP', name: 'Digital Token Service Provider' },
    { code: 'MHA', name: 'Merchant Host Adapter' }
  ];

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

  return (
    <div className="mna-container" style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', background: 'var(--svg-canvas-bg)', color: 'var(--text-main)', overflow: 'hidden' }}>
      {/* Top Controls Toolbar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 20px', background: 'rgba(15, 23, 42, 0.75)', borderBottom: '1px solid var(--border-card)' }}>
        {/* Title & Badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(16, 185, 129, 0.12)', border: '1px solid var(--accent-pr)', padding: '4px 10px', borderRadius: '6px' }}>
            <Layers size={15} color="var(--accent-pr)" />
            <span style={{ fontSize: '0.8rem', fontWeight: 700, fontFamily: 'Outfit', color: 'var(--accent-pr)' }}>
              MNA ARCHITECTURE (DRAW.IO VECTOR)
            </span>
          </div>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            Official Multi-Node Architecture Reference Diagram (MNA.svg)
          </span>
        </div>

        {/* Center View Selector Tabs */}
        <div style={{ display: 'flex', background: 'var(--svg-pill-bg)', padding: '3px', borderRadius: '8px', border: '1px solid var(--border-card)', gap: '4px' }}>
          <button
            onClick={() => setActiveView('DIAGRAM')}
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
              background: activeView === 'DIAGRAM' ? 'var(--accent-pr)' : 'transparent',
              color: activeView === 'DIAGRAM' ? '#ffffff' : 'var(--text-muted)',
              transition: 'all 0.2s ease'
            }}
          >
            <Maximize2 size={13} /> Full Vector Architecture Diagram
          </button>

          <button
            onClick={() => setActiveView('MATRIX')}
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
              background: activeView === 'MATRIX' ? 'var(--accent-amber)' : 'transparent',
              color: activeView === 'MATRIX' ? '#ffffff' : 'var(--text-muted)',
              transition: 'all 0.2s ease'
            }}
          >
            <Table size={13} /> Single vs Multi-Node Matrix
          </button>

          <button
            onClick={() => setActiveView('SPECS')}
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
              background: activeView === 'SPECS' ? 'var(--accent-dr)' : 'transparent',
              color: activeView === 'SPECS' ? '#ffffff' : 'var(--text-muted)',
              transition: 'all 0.2s ease'
            }}
          >
            <Server size={13} /> Node Specs & Tech Stack
          </button>
        </div>

        {/* Zoom Controls (Active during DIAGRAM view) */}
        {activeView === 'DIAGRAM' ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--svg-pill-bg)', padding: '4px 8px', borderRadius: '8px', border: '1px solid var(--border-card)' }}>
            <button onClick={handleZoomOut} style={{ background: 'transparent', border: 'none', color: 'var(--text-main)', cursor: 'pointer', display: 'flex', alignItems: 'center' }} title="Zoom Out">
              <ZoomOut size={15} />
            </button>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, fontFamily: 'JetBrains Mono', minWidth: '42px', textAlign: 'center' }}>
              {zoomLevel}%
            </span>
            <button onClick={handleZoomIn} style={{ background: 'transparent', border: 'none', color: 'var(--text-main)', cursor: 'pointer', display: 'flex', alignItems: 'center' }} title="Zoom In">
              <ZoomIn size={15} />
            </button>
            <button onClick={handleResetZoom} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', marginLeft: '4px' }} title="Reset Zoom">
              <RotateCcw size={14} />
            </button>
          </div>
        ) : (
          <div style={{ width: '120px' }}></div>
        )}
      </div>

      {/* VIEW 1: FULL VECTOR ARCHITECTURE DIAGRAM (MNA.svg) */}
      {activeView === 'DIAGRAM' && (
        <div style={{ flex: 1, width: '100%', height: '100%', overflow: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', padding: '16px' }}>
          <div 
            style={{
              transform: `scale(${zoomLevel / 100})`,
              transformOrigin: 'top center',
              transition: 'transform 0.2s ease-out',
              background: '#ffffff',
              borderRadius: '12px',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
              padding: '16px',
              maxWidth: '100%'
            }}
          >
            <img 
              src="./MNA.svg" 
              alt="MNA Multi-Node Architecture Diagram" 
              style={{ display: 'block', maxWidth: '100%', height: 'auto' }} 
            />
          </div>
        </div>
      )}

      {/* VIEW 2: SINGLE vs MULTI-NODE COMPARISON MATRIX */}
      {activeView === 'MATRIX' && (
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

      {/* VIEW 3: ENVIRONMENT SPECS & TECH STACK */}
      {activeView === 'SPECS' && (
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

            {/* Section 2: Core Tech Stack & Abbreviations */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
              {/* Tech Stack Specs */}
              <div style={{ background: 'var(--svg-card-bg)', border: '1px solid var(--border-card)', borderRadius: '12px', padding: '20px' }}>
                <h3 style={{ fontFamily: 'Outfit', fontSize: '1.1rem', fontWeight: 700, marginBottom: '16px', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Cpu color="var(--accent-dr)" size={18} /> Technical Platform Stack
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {techStackSpecs.map((spec, idx) => (
                    <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '2px', paddingBottom: '8px', borderBottom: '1px solid var(--border-card)' }}>
                      <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--text-dim)', fontWeight: 600 }}>{spec.category}</span>
                      <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)', fontFamily: 'JetBrains Mono' }}>{spec.technology}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Abbreviations Legend */}
              <div style={{ background: 'var(--svg-card-bg)', border: '1px solid var(--border-card)', borderRadius: '12px', padding: '20px' }}>
                <h3 style={{ fontFamily: 'Outfit', fontSize: '1.1rem', fontWeight: 700, marginBottom: '16px', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <FileText color="var(--accent-amber)" size={18} /> Architecture Legend & Acronyms
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  {abbreviationsLegend.map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem' }}>
                      <span style={{ fontFamily: 'JetBrains Mono', fontWeight: 700, color: 'var(--accent-amber)', background: 'var(--svg-pill-bg)', padding: '2px 6px', borderRadius: '4px', minWidth: '40px', textAlign: 'center' }}>
                        {item.code}
                      </span>
                      <span style={{ color: 'var(--text-muted)' }}>{item.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
