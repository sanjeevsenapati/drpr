import React from 'react';
import { X, Server, Globe, Database, ShieldCheck, Activity, Cpu, ArrowRightLeft } from 'lucide-react';

export default function ComponentInspector({ component, mode, onClose }) {
  if (!component) return null;

  return (
    <div className="inspector-drawer glass-panel open">
      <div className="drawer-header">
        <h2>
          <Server size={20} style={{ color: '#3b82f6' }} />
          <span>Component Details</span>
        </h2>
        <button className="close-btn" onClick={onClose}>
          <X size={18} />
        </button>
      </div>

      <div className="drawer-content">
        {/* Component Title Card */}
        <div className="glass-card" style={{ padding: '16px' }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '6px' }}>{component.name}</h3>
          <span className="status-badge active">
            <Activity size={12} />
            {component.type || 'Infrastructure Component'}
          </span>
        </div>

        {/* Domain & Network Info */}
        <div className="info-group">
          <span className="info-label">Endpoint / Domain URL</span>
          <div className="info-code" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Globe size={14} />
            <span>{component.domain || component.url || 'Internal VMN / IP Target'}</span>
          </div>
        </div>

        {/* Site Location & Active Status */}
        <div className="info-group">
          <span className="info-label">Current Site Mapping</span>
          <div className="glass-card" style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Primary (PR) Site:</span>
              <span style={{ fontSize: '0.85rem', fontWeight: 600, color: mode === 'PR' ? '#10b981' : '#94a3b8' }}>
                RAWALE {mode === 'PR' ? '(ACTIVE)' : '(STANDBY)'}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>DR Site:</span>
              <span style={{ fontSize: '0.85rem', fontWeight: 600, color: mode === 'DR' ? '#3b82f6' : '#94a3b8' }}>
                GACHIBOWLI {mode === 'DR' ? '(ACTIVE)' : '(STANDBY)'}
              </span>
            </div>
          </div>
        </div>

        {/* Database & Data Guard Replication */}
        {(component.key?.includes('db') || component.name?.includes('Database')) && (
          <div className="info-group">
            <span className="info-label">Replication Engine</span>
            <div className="glass-card" style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#f59e0b', fontSize: '0.85rem', fontWeight: 600 }}>
                <ArrowRightLeft size={16} />
                <span>Oracle Data Guard (Real-Time Sync)</span>
              </div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Continuous redo log shipping between Rawale and Gachibowli databases. Sub-second RPO.
              </p>
            </div>
          </div>
        )}

        {/* Failover Policy & RTO */}
        <div className="info-group">
          <span className="info-label">Failover & High Availability</span>
          <div className="glass-card" style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
              <span style={{ color: 'var(--text-muted)' }}>Target RTO:</span>
              <span style={{ fontWeight: 600, color: '#f59e0b' }}>15 Minutes</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
              <span style={{ color: 'var(--text-muted)' }}>Health Check:</span>
              <span style={{ fontWeight: 600, color: '#10b981' }}>HEALTHY (HTTP 200 OK)</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
              <span style={{ color: 'var(--text-muted)' }}>Latency (p99):</span>
              <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>8.4 ms</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
