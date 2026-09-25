import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Server, 
  PlayCircle, 
  Info,
  FileJson,
  Sun,
  Moon,
  Layers,
  Network
} from 'lucide-react';
import CustomDiagram from './components/CustomDiagram';
import MnaDiagram from './components/MnaDiagram';
import ComponentInspector from './components/ComponentInspector';
import SimulationStepper from './components/SimulationStepper';
import { SITES_DATA as INITIAL_SITES_DATA, LEGEND_ITEMS } from './data/diagramData';

export default function App() {
  const [mode, setMode] = useState('PR'); // 'PR' | 'DR'
  const [diagramType, setDiagramType] = useState('FAILOVER'); // 'FAILOVER' | 'MNA'
  const [theme, setTheme] = useState('light'); // 'light' (Clean Light Mode) | 'dark'
  const [isConsoleOpen, setIsConsoleOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [showLegend, setShowLegend] = useState(false);
  const [configSource, setConfigSource] = useState('active.json');
  const [componentsConfig, setComponentsConfig] = useState(null);

  // Synchronize body class for theme switching
  useEffect(() => {
    if (theme === 'light') {
      document.body.classList.add('light-theme');
    } else {
      document.body.classList.remove('light-theme');
    }
  }, [theme]);

  // Load dynamic active site configuration from active.json & components.json
  useEffect(() => {
    const fetchConfigs = () => {
      // 1. Fetch active.json (relative path for file:// and web server support)
      fetch('./active.json?t=' + Date.now())
        .then(res => res.json())
        .then(data => {
          if (data && (data.activeSite === 'PR' || data.activeSite === 'DR')) {
            if (!isConsoleOpen) {
              setMode(data.activeSite);
            }
            setConfigSource(`active.json & components.json (${data.activeSite})`);
          }
        })
        .catch(err => console.warn('Local file or network read active.json (using default PR site):', err));

      // 2. Fetch components.json (relative path)
      fetch('./components.json?t=' + Date.now())
        .then(res => res.json())
        .then(data => {
          if (data && data.siteArchitecture) {
            setComponentsConfig(data);
          }
        })
        .catch(err => console.warn('Local file or network read components.json (using fallback config):', err));
    };

    fetchConfigs();
    const interval = setInterval(fetchConfigs, 4000); // Sync with active.json & components.json every 4s
    return () => clearInterval(interval);
  }, [isConsoleOpen]);

  const activeSiteData = mode === 'DR' 
    ? (componentsConfig?.siteArchitecture?.DR || INITIAL_SITES_DATA.DR) 
    : (componentsConfig?.siteArchitecture?.PR || INITIAL_SITES_DATA.PR);

  const handleSelectSite = (site) => {
    setMode(site);
    setIsConsoleOpen(false); // Close console when switching site explicitly
  };

  // Toggle Engineer Failover Console drawer
  const handleToggleConsole = () => {
    setIsConsoleOpen(prev => {
      const nextState = !prev;
      if (nextState) {
        setActiveStep(0); // Reset step counter on opening console
      }
      return nextState;
    });
  };

  // Callback when engineer completes final switchover step 11 inside console
  const handleSwitchoverComplete = () => {
    const newActiveMode = mode === 'PR' ? 'DR' : 'PR';
    setMode(newActiveMode);
    setActiveStep(0);
  };

  const diagramMode = isConsoleOpen ? 'SIMULATION' : mode;

  return (
    <div className="app-container">
      {/* Streamlined Clean Top Navbar */}
      <header className="top-navbar">
        {/* Brand & Title */}
        <div className="brand-section">
          <div className="brand-logo">
            <ShieldCheck size={20} />
          </div>
          <div className="brand-title">
            <h1>SHABI e-Rupee Architecture Dashboard</h1>
          </div>
        </div>

        {/* Primary Diagram Type Switcher (Failover PR/DR vs MNA Architecture) */}
        <div style={{ display: 'flex', background: 'var(--svg-pill-bg)', padding: '3px', borderRadius: '8px', border: '1px solid var(--border-card)', gap: '4px' }}>
          <button
            className={`mode-btn ${diagramType === 'FAILOVER' ? 'active-pr' : ''}`}
            onClick={() => setDiagramType('FAILOVER')}
            style={{ padding: '6px 12px', fontSize: '0.78rem', fontWeight: 700 }}
          >
            <Network size={14} />
            <span>PR ➔ DR Failover</span>
          </button>

          <button
            className={`mode-btn ${diagramType === 'MNA' ? 'active-sim' : ''}`}
            onClick={() => setDiagramType('MNA')}
            style={{ padding: '6px 12px', fontSize: '0.78rem', fontWeight: 700 }}
          >
            <Layers size={14} />
            <span>MNA Architecture (MNA.svg)</span>
          </button>
        </div>

        {/* Failover Site Mode Switcher (Shown when in FAILOVER diagram type) */}
        {diagramType === 'FAILOVER' && (
          <div className="mode-switcher">
            <button 
              className={`mode-btn ${mode === 'PR' && !isConsoleOpen ? 'active-pr' : ''}`}
              onClick={() => handleSelectSite('PR')}
            >
              <Server size={14} />
              <span>PR Active (Rawale)</span>
            </button>

            <button 
              className={`mode-btn ${mode === 'DR' && !isConsoleOpen ? 'active-dr' : ''}`}
              onClick={() => handleSelectSite('DR')}
            >
              <Server size={14} />
              <span>DR Active (Gachibowli)</span>
            </button>

            {/* Togglable Engineer Failover Console Button */}
            <button 
              className={`mode-btn ${isConsoleOpen ? 'active-sim' : ''}`}
              onClick={handleToggleConsole}
            >
              <PlayCircle size={14} />
              <span>{isConsoleOpen ? 'Close Failover Console' : 'Engineer Failover Console'}</span>
            </button>
          </div>
        )}

        {/* Clean Theme & Legend Toggles */}
        <div className="status-pills">
          <button 
            className="theme-toggle-btn"
            onClick={() => setShowLegend(prev => !prev)}
            title="Toggle Architecture Legend"
            style={{ background: showLegend ? 'rgba(245, 158, 11, 0.2)' : 'transparent', borderColor: showLegend ? 'var(--accent-amber)' : 'var(--border-card)' }}
          >
            <Info size={14} color={showLegend ? 'var(--accent-amber)' : 'currentColor'} />
            <span>{showLegend ? 'Hide Legend' : 'Show Legend'}</span>
          </button>

          <button 
            className="theme-toggle-btn"
            onClick={() => setTheme(prev => (prev === 'light' ? 'dark' : 'light'))}
            title="Toggle Visual Theme"
          >
            {theme === 'light' ? <Moon size={14} /> : <Sun size={14} />}
            <span>{theme === 'light' ? 'Dark Mode' : 'Clean Light Mode'}</span>
          </button>
        </div>
      </header>

      {/* Main Workspace */}
      <main className="main-workspace">
        {diagramType === 'FAILOVER' ? (
          <CustomDiagram 
            mode={diagramMode} 
            activeStep={activeStep}
            onSelectComponent={setSelectedComponent}
            componentsConfig={componentsConfig}
          />
        ) : (
          <MnaDiagram 
            onSelectComponent={setSelectedComponent}
          />
        )}

        {/* Legend Overlay Box */}
        {showLegend && (
          <div className="legend-box glass-panel">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="legend-title">Diagram Legend</span>
              <button 
                style={{ background: 'transparent', border: 'none', color: 'var(--text-dim)', cursor: 'pointer' }}
                onClick={() => setShowLegend(false)}
              >
                ×
              </button>
            </div>
            <div className="legend-items-grid">
              {LEGEND_ITEMS.map((item, idx) => (
                <div key={idx} className="legend-item">
                  <div className="legend-color-dot" style={{ backgroundColor: item.color }} />
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {!showLegend && (
          <button 
            style={{
              position: 'absolute',
              bottom: 24,
              left: 24,
              zIndex: 30,
              padding: '6px 12px',
              borderRadius: '8px',
              border: '1px solid var(--border-card)',
              background: 'var(--bg-card)',
              color: 'var(--text-muted)',
              fontSize: '0.75rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
            onClick={() => setShowLegend(true)}
          >
            <Info size={14} /> Show Legend
          </button>
        )}

        {/* Component Inspector Drawer */}
        <ComponentInspector 
          component={selectedComponent}
          mode={mode}
          onClose={() => setSelectedComponent(null)}
        />

        {/* Manual Engineer Switchover Console Panel */}
        {isConsoleOpen && (
          <SimulationStepper 
            activeStep={activeStep}
            setActiveStep={setActiveStep}
            currentMode={mode}
            onSwitchoverComplete={handleSwitchoverComplete}
            onClose={() => setIsConsoleOpen(false)}
            failoverSteps={componentsConfig?.failoverSteps}
          />
        )}
      </main>
    </div>
  );
}
