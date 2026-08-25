import React, { useState } from 'react';
import { 
  Play, 
  Pause, 
  SkipForward, 
  RefreshCw, 
  Clock, 
  UserCheck,
  X
} from 'lucide-react';
import { FAILOVER_STEPS as INITIAL_FAILOVER_STEPS } from '../data/diagramData';

export default function SimulationStepper({ activeStep, setActiveStep, currentMode, onSwitchoverComplete, onClose, failoverSteps }) {
  const steps = failoverSteps || INITIAL_FAILOVER_STEPS;
  const [isPlaying, setIsPlaying] = useState(false);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [auditLogs, setAuditLogs] = useState([
    `[${new Date().toLocaleTimeString()}] ENGINEER CONSOLE INITIALIZED: Prepared for ${currentMode === 'PR' ? 'PR ➔ DR Failover' : 'DR ➔ PR Switchback'}`
  ]);

  const targetSite = currentMode === 'PR' ? 'DR (GACHIBOWLI DC)' : 'PR (RAWALE DC)';
  const currentStepData = steps[activeStep] || steps[0];
  const progressPercent = (completedSteps.length / steps.length) * 100;

  // Auto Play interval timer effect
  React.useEffect(() => {
    let timer;
    if (isPlaying) {
      timer = setInterval(() => {
        handleCompleteStep();
      }, 3000);
    }
    return () => clearInterval(timer);
  }, [isPlaying, activeStep, completedSteps]);

  // Handle engineer completing current step
  const handleCompleteStep = () => {
    const timeStr = new Date().toLocaleTimeString();
    const stepNum = activeStep + 1;

    // Add to completed steps if not present
    if (!completedSteps.includes(activeStep)) {
      setCompletedSteps(prev => [...prev, activeStep]);
    }

    // Append engineer execution audit log
    const logEntry = `[${timeStr}] ENGINEER EXEC: Step ${stepNum}/${steps.length} (${currentStepData.title}) - COMPLETED OK.`;
    setAuditLogs(prev => [logEntry, ...prev]);

    // Check if this was the final step (Step 11)
    if (activeStep >= steps.length - 1) {
      setIsPlaying(false);
      const finishLog = `[${timeStr}] SWITCHOVER SUCCESSFUL! Changing Active Infrastructure Site from ${currentMode} to ${currentMode === 'PR' ? 'DR' : 'PR'}...`;
      setAuditLogs(prev => [finishLog, ...prev]);
      
      // Trigger active site flip upon completion!
      if (onSwitchoverComplete) {
        setTimeout(() => {
          onSwitchoverComplete();
        }, 1200);
      }
    } else {
      setActiveStep(prev => prev + 1);
    }
  };

  const handleReset = () => {
    setIsPlaying(false);
    setActiveStep(0);
    setCompletedSteps([]);
    setAuditLogs([`[${new Date().toLocaleTimeString()}] CONSOLE RESET: Checklist cleared for engineer procedure.`]);
  };

  return (
    <div className="engineer-console-panel glass-panel">
      {/* Top Header & Direction Indicator */}
      <div className="sim-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <UserCheck size={22} style={{ color: '#f59e0b' }} />
          <div>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>Manual Engineer Switchover History Console</span>
              <span className="status-badge common" style={{ fontSize: '0.7rem' }}>
                <Clock size={10} /> RTO: 15 Mins
              </span>
            </h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              SWITCHOVER TARGET: <strong style={{ color: '#fbbf24' }}>{currentMode === 'PR' ? 'PR (RAWALE)' : 'DR (GACHIBOWLI)'}</strong> ➔ <strong style={{ color: '#60a5fa' }}>{targetSite}</strong>
            </span>
          </div>
        </div>

        {/* Engineer Control Buttons */}
        <div className="sim-controls">
          <button 
            className="sim-btn primary" 
            onClick={handleCompleteStep}
            disabled={completedSteps.length === steps.length}
          >
            <SkipForward size={14} />
            <span>{completedSteps.length === steps.length ? 'Completed' : 'Complete Step & Advance'}</span>
          </button>

          <button 
            className={`sim-btn ${isPlaying ? 'warning' : 'secondary'}`} 
            onClick={() => setIsPlaying(!isPlaying)}
            disabled={completedSteps.length === steps.length}
          >
            {isPlaying ? <Pause size={14} /> : <Play size={14} />}
            <span>{isPlaying ? 'Pause Auto Run' : 'Auto Run'}</span>
          </button>

          <button className="sim-btn secondary" onClick={handleReset} title="Reset Progress">
            <RefreshCw size={14} />
            <span>Reset</span>
          </button>

          {/* Toggle Close Console Button */}
          {onClose && (
            <button 
              className="sim-btn secondary" 
              onClick={onClose} 
              title="Close Console Drawer"
              style={{ color: '#ef4444', borderColor: 'rgba(239, 68, 68, 0.4)', padding: '6px 10px' }}
            >
              <X size={14} />
              <span>Close Console</span>
            </button>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="sim-progress-bar-container">
        <div className="sim-progress-bar" style={{ width: `${progressPercent}%` }} />
      </div>

      {/* Main Stepper & History Grid */}
      <div className="sim-body">
        {/* Left: Step Checklist Timeline */}
        <div className="sim-steps-timeline">
          {steps.map((step, idx) => {
            const isDone = completedSteps.includes(idx);
            const isCurrent = activeStep === idx && !isDone;
            return (
              <div 
                key={step.step}
                className={`sim-step-card ${isDone ? 'done' : ''} ${isCurrent ? 'current' : ''}`}
                onClick={() => setActiveStep(idx)}
              >
                <div className="step-num-badge">
                  {isDone ? '✓' : step.step}
                </div>
                <div className="step-card-content">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className="step-card-title">{step.title}</span>
                    <span className="step-duration">{step.duration}</span>
                  </div>
                  <p className="step-card-desc">{step.description || step.details}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Active Step Details & Timestamped Execution Audit Logs */}
        <div className="sim-audit-panel">
          <div className="active-step-spotlight">
            <h4 style={{ fontSize: '0.85rem', color: '#fbbf24', marginBottom: 4 }}>
              Active Activity #{currentStepData.step}: {currentStepData.title}
            </h4>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              {currentStepData.details || currentStepData.description}
            </p>
          </div>

          <div className="audit-log-container">
            <div className="audit-log-header">
              <span>Engineer Audit Log & Execution History</span>
            </div>
            <div className="audit-log-terminal">
              {auditLogs.map((log, i) => (
                <div key={i} className="audit-log-line">
                  {log}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
