# SBI e-Rupee PR/DR Architecture & Switchover Dashboard - Project State & Resume Guide

This file documents the complete state of the project, all completed user requirements, configuration schemas, and step-by-step instructions for future AI assistants or engineers to resume and extend the codebase.

---

## 1. Project Overview & Operational Status

- **Project Name**: `rtsp-dr-pr-dashboard`
- **Primary Objective**: Interactive visual dashboard representing SBI e-Rupee (CBDC) PR/DR Site Architecture (Rawale DC vs. Gachibowli DC), failover flows, component specifications, and manual engineer switchover.
- **Tech Stack**: React 18, Vite 5, Custom SVG rendering engine, Lucide React icons, Vanilla CSS3 with variables.
- **Build Status**: Verified with `npm run build` (0 errors).
- **Local Dev Server**: Running on `http://localhost:3001`.
- **Git Repository**: Initialized locally (`main` branch committed).

---

## 2. Completed User Requirements Checklist

- [x] **Draw.io SVG Migration & Custom Engine**: Native responsive React SVG rendering engine (`CustomDiagram.jsx`) replacing original static Draw.io SVG.
- [x] **PR & DR Active Traffic Flow Motion**: Silky smooth 60fps hardware-accelerated SVG dash animation (`1.2s` flow keyframes) with glowing phased energy spheres.
- [x] **Rounded Corner Traffic Paths**: Smooth bezier arcs (`Q` SVG paths + `strokeLinejoin="round"` + `strokeLinecap="round"`) with micro compact 3px arrow markers.
- [x] **7 Core Microservices in RTSP Cluster**: Displaying `rtsp-app`, `rtsp-pso`, `mint`, `BIG`, `AppBackend`, `Admin Portal`, and `Merchant Portal` inside RTSP Core Services in both PR and DR regions.
- [x] **Grouped Database Clusters**: Grouping `cbdc-rtsp-db` and `cbdc-mint-db` into unified `ORACLE DB CLUSTER` containers for both PR and DR.
- [x] **Bi-Directional Data Guard Replication**: Reverses replication direction (`PR ➔ DR` when PR is active, `DR ➔ PR` when DR is active).
- [x] **9 Common Services Column**: 9 shared service VMs (`KAFKA`, `ABAS`, `Validation SVC`, `EIS`, `UPI`, `SMS`, `PRM`, `SFG`, `LDAP`) centered between PR and DR.
- [x] **Togglable Engineer Failover Console**: Integrated 2-column drawer with 11-step manual switchover stepper, active activity spotlight, live audit log terminal, and auto-run / step-advance controls.
- [x] **Central JSON Configurations**: Fully driven by [`components.json`](file:///Users/sanjeev/workspace/rtsp-dr-pr/components.json) and [`active.json`](file:///Users/sanjeev/workspace/rtsp-dr-pr/active.json) with 4-second background polling for zero-rebuild live updates.
- [x] **Dual Visual Theme Support**: Seamless toggle between **Clean Light Mode** (Enterprise White, Slate, Steel Blue) and **Dark Mode** (Slate Navy).
- [x] **Clean Header Navbar**: Removed search bar and overlay status banners for an uncluttered header.
- [x] **Documentation**: Clean [`README.md`](file:///Users/sanjeev/workspace/rtsp-dr-pr/README.md) and [`project.md`](file:///Users/sanjeev/workspace/rtsp-dr-pr/project.md) state files.

---

## 3. Configuration Schemas & How to Edit

### A. Active Infrastructure Site (`active.json` & `public/active.json`)
```json
{
  "activeSite": "PR",
  "prSetting": {
    "siteName": "Primary Region (RAWALE DC)",
    "wafIp": "WAF-PR-252 (10.x.x.252)",
    "status": "HEALTHY",
    "dbRole": "READ WRITE (Primary)"
  },
  "drSetting": {
    "siteName": "Disaster Recovery Region (GACHIBOWLI DC)",
    "wafIp": "WAF-DR-230 (10.x.x.230)",
    "status": "HEALTHY",
    "dbRole": "READ ONLY (Data Guard Standby)"
  }
}
```
*To flip active site manually, change `"activeSite"` to `"PR"` or `"DR"`. State syncs live every 4 seconds.*

### B. Component Specs & Switchover Steps (`components.json` & `public/components.json`)
Contains specifications for:
1. **`siteArchitecture`**: WAF names/IPs, PLB/ILB endpoints.
2. **`publicGateways`**: Client app & merchant portal URLs.
3. **`rtspCoreServices`**: 7 microservices (`rtsp-app`, `rtsp-pso`, `mint`, `BIG`, `AppBackend`, `Admin Portal`, `Merchant Portal`).
4. **`oracleDatabases`**: DB cluster specs.
5. **`commonServices`**: 9 shared service VMs.
6. **`failoverSteps`**: 11 manual switchover steps with durations and details.

---

## 4. How to Resume Work or Add Future Features

### Key Source Files Map:
- **`src/App.jsx`**: Main application container, 4-second JSON polling interval, theme state, navbar.
- **`src/components/CustomDiagram.jsx`**: Native React SVG diagram canvas component.
- **`src/components/ComponentInspector.jsx`**: Slide-out drawer displaying component details when clicked.
- **`src/components/SimulationStepper.jsx`**: 2-column engineer failover console drawer.
- **`src/index.css`**: CSS variables for Light Mode and Dark Mode, keyframe animations, glassmorphism utilities.
- **`components.json`**: Central JSON file for all component specs and failover steps.
- **`active.json`**: Active site state file.

### Steps to Resume Development:
1. Pull the codebase and run `npm install`.
2. Start dev server: `npm run dev` (`http://localhost:3001`).
3. To add a new microservice or common service:
   - Edit `components.json` (and `public/components.json`).
   - If adding SVG layout nodes, update `CustomDiagram.jsx`.
4. To test production build: `npm run build`.

---

## 5. Development Command Reference

```bash
# Start local development server
npm run dev

# Build production bundle into dist/
npm run build

# Preview production build locally
npm run preview

# Commit changes locally
git add .
git commit -m "your commit message"
```
