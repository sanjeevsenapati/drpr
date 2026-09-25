import React, { useEffect, useRef, useState } from 'react';
import { ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

export default function SvgViewer({ mode, activeStep, onSelectComponent, searchQuery }) {
  const containerRef = useRef(null);
  const [svgContent, setSvgContent] = useState('');
  const [zoom, setZoom] = useState(0.85);
  const [pan, setPan] = useState({ x: 40, y: 20 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const isPRActive = mode === 'PR' || (mode === 'SIMULATION' && activeStep < 5);
  const isDRActive = mode === 'DR' || (mode === 'SIMULATION' && activeStep >= 5);

  // Load exact original SVG file from workspace
  useEffect(() => {
    fetch('/pr-dr.drawio.svg')
      .then(res => res.text())
      .then(text => {
        setSvgContent(text);
      })
      .catch(err => console.error('Error loading SVG:', err));
  }, []);

  // Handle Zoom & Pan events
  const handleWheel = (e) => {
    e.preventDefault();
    const zoomFactor = e.deltaY < 0 ? 1.08 : 0.92;
    setZoom(prev => Math.min(Math.max(prev * zoomFactor, 0.3), 3.0));
  };

  const handleMouseDown = (e) => {
    if (e.target.closest('button')) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setPan({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
  };

  const handleMouseUp = () => setIsDragging(false);

  const resetView = () => {
    setZoom(0.85);
    setPan({ x: 40, y: 20 });
  };

  // Enhance exact original SVG paths dynamically
  useEffect(() => {
    if (!containerRef.current) return;
    const svgElement = containerRef.current.querySelector('svg');
    if (!svgElement) return;

    // Target ONLY connector joint line paths (paths with stroke attribute/style)
    const allPaths = svgElement.querySelectorAll('path');
    allPaths.forEach((path) => {
      const style = path.getAttribute('style') || '';
      const d = path.getAttribute('d') || '';

      const isConnectorLine = (style.includes('stroke') || path.hasAttribute('stroke')) && 
                              !style.includes('stroke: none') && 
                              !style.includes('stroke:none');

      if (!isConnectorLine) return; // Leave icons, shapes, rects, text 100% untouched

      // Extract X coordinates from path d attribute to classify line location
      const nums = (d.match(/[-+]?\d*\.\d+|\d+/g) || []).map(Number);
      if (nums.length >= 2) {
        const xCoords = nums.filter((_, idx) => idx % 2 === 0);
        const minX = Math.min(...xCoords);
        const maxX = Math.max(...xCoords);

        // Classify joint line path location
        const isPRJointLine = maxX <= 520 || (minX <= 570 && maxX < 600);
        const isDRJointLine = minX >= 650 || (minX > 570 && maxX >= 750);

        // Clear all previous mode classes first
        path.classList.remove('path-active-pr', 'path-active-dr', 'path-static');

        if (isPRActive) {
          if (isPRJointLine) {
            path.classList.add('path-active-pr');
          } else if (isDRJointLine) {
            path.classList.add('path-static');
          } else {
            path.classList.add('path-active-pr');
          }
        } else if (isDRActive) {
          if (isDRJointLine) {
            path.classList.add('path-active-dr');
          } else if (isPRJointLine) {
            path.classList.add('path-static');
          } else {
            path.classList.add('path-active-dr');
          }
        }
      }
    });

    // Handle interactive click metadata & search highlights without modifying node opacity/icons
    const clickableNodes = svgElement.querySelectorAll('g, rect, text');
    const clickableKeywords = [
      { key: 'WAF', name: 'Web Application Firewall (WAF)', type: 'Security & Edge', ipPR: 'WAF-PR-252', ipDR: 'WAF-DR-230' },
      { key: 'PLB', name: 'Public Load Balancer (PLB)', type: 'Network Load Balancer', domain: 'cbdc-plb.bank.shabi' },
      { key: 'ILB', name: 'Internal Load Balancer (ILB)', type: 'Private Network Load Balancer', domain: 'cbdc-ilb.bank.shabi' },
      { key: 'KAFKA', name: 'Apache Kafka Cluster', type: 'Message Broker & Event Hub', domain: 'kafka.bank.shabi' },
      { key: 'ABAS', name: 'ABAS Attestation Service', type: 'Security & Attestation', domain: 'abas-attestation.bank.shabi' },
      { key: 'Validation', name: 'Transaction Validation SVC', type: 'Core Microservice', domain: 'validation-svc.bank.shabi' },
      { key: 'EIS', name: 'Enterprise Integration System (EIS)', type: 'Core Banking Gateway', domain: 'eis.shabi.co.in' },
      { key: 'UPI', name: 'UPI Payment Gateway', type: 'Payment Processing Service', domain: 'upi.shabi.co.in' },
      { key: 'SMS', name: 'Bulk SMS Gateway', type: 'Notification System', domain: 'bulksms.shabi.co.in' },
      { key: 'PRM', name: 'Risk Management (PRM)', type: 'Fraud Detection Engine', domain: 'prm.shabi.co.in' },
      { key: 'LDAP', name: 'Active Directory (LDAP)', type: 'Identity & Authentication', domain: 'ad.shabi' },
      { key: 'RAWALE', name: 'Primary Region (PR) Rawale', type: 'Data Center Site' },
      { key: 'GACHIBAWLI', name: 'Disaster Recovery (DR) Gachibowli', type: 'Data Center Site' },
      { key: 'rtsp-db', name: 'RTSP Oracle Database', type: 'Core Relational DB', domain: 'cbdc-rtsp-db.bank.shabi' },
      { key: 'mint-db', name: 'Minting Oracle Database', type: 'CBDC Ledger DB', domain: 'cbdc-mint-db.bank.shabi' }
    ];

    const handleClick = (e) => {
      const targetText = e.currentTarget.textContent || '';
      for (const item of clickableKeywords) {
        if (targetText.toLowerCase().includes(item.key.toLowerCase())) {
          onSelectComponent(item);
          break;
        }
      }
    };

    clickableNodes.forEach(node => {
      const text = node.textContent || '';
      if (clickableKeywords.some(k => text.toLowerCase().includes(k.key.toLowerCase()))) {
        node.setAttribute('data-interactive', 'true');
        node.style.cursor = 'pointer';
        node.addEventListener('click', handleClick);
      }

      // Search query highlight filter
      if (searchQuery && text.toLowerCase().includes(searchQuery.toLowerCase())) {
        node.style.outline = '3px solid #f59e0b';
        node.style.outlineOffset = '2px';
      } else {
        node.style.outline = 'none';
      }
    });

    return () => {
      clickableNodes.forEach(node => node.removeEventListener('click', handleClick));
    };
  }, [svgContent, mode, activeStep, isPRActive, isDRActive, onSelectComponent, searchQuery]);

  return (
    <div 
      className="svg-canvas-container"
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Zoom / Navigation Toolbar */}
      <div className="sidebar-toolbar glass-panel">
        <div className="zoom-controls">
          <button className="tool-btn" onClick={() => setZoom(z => Math.min(z * 1.15, 3.0))} title="Zoom In">
            <ZoomIn size={18} />
          </button>
          <button className="tool-btn" onClick={() => setZoom(z => Math.max(z * 0.85, 0.3))} title="Zoom Out">
            <ZoomOut size={18} />
          </button>
          <button className="tool-btn" onClick={resetView} title="Reset View">
            <RotateCcw size={18} />
          </button>
        </div>
      </div>

      {/* Mode Overlay Indicator Banner */}
      <div style={{
        position: 'absolute',
        top: 16,
        left: 70,
        zIndex: 20,
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '8px 16px',
        borderRadius: '10px',
        background: isPRActive 
          ? 'rgba(16, 185, 129, 0.18)' 
          : isDRActive 
            ? 'rgba(59, 130, 246, 0.18)' 
            : 'rgba(245, 158, 11, 0.18)',
        border: `1px solid ${isPRActive ? '#10b981' : isDRActive ? '#3b82f6' : '#f59e0b'}`,
        backdropFilter: 'blur(8px)',
        boxShadow: isPRActive 
          ? '0 0 16px rgba(16, 185, 129, 0.3)' 
          : '0 0 16px rgba(59, 130, 246, 0.3)'
      }}>
        <div className={`pulse-dot ${isPRActive ? 'pr-active' : 'dr-active'}`} />
        <span style={{ fontSize: '0.85rem', fontWeight: 600, color: isPRActive ? '#34d399' : '#60a5fa' }}>
          {isPRActive && 'ACTIVE TRAFFIC FLOW: PR SITE (RAWALE DC) | DR SITE STANDBY'}
          {isDRActive && 'ACTIVE TRAFFIC FLOW: DR SITE (GACHIBOWLI DC) | PR SITE STANDBY'}
        </span>
      </div>

      {/* Exact Original SVG Container */}
      <div 
        className="svg-wrapper"
        style={{
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
          transition: isDragging ? 'none' : 'transform 0.1s ease-out'
        }}
        dangerouslySetInnerHTML={{ __html: svgContent }}
        ref={containerRef}
      />
    </div>
  );
}
