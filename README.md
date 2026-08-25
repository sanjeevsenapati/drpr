# SBI e-Rupee (CBDC) RTSP PR/DR Architecture & Switchover Dashboard

An interactive, real-time enterprise architecture dashboard visualizing the **Primary Region (PR - Rawale DC)** and **Disaster Recovery Region (DR - Gachibowli DC)** infrastructure for the **SBI e-Rupee (Central Bank Digital Currency - CBDC)** system.

---

## 🌟 Key Features

- **Dual-Region Live Traffic Visualization**: Real-time animated traffic flow between Public Gateways, Web Application Firewalls (WAF), Public & Internal Load Balancers (PLB/ILB), Microservices, and Oracle Database Clusters.
- **Bi-Directional Oracle Data Guard Sync**: Visualizes active replication from Rawale (PR) ➔ Gachibowli (DR) or vice-versa upon failover.
- **Dynamic Microservice Cluster**: Displays all 7 core RTSP applications (`rtsp-app`, `rtsp-pso`, `mint`, `BIG`, `AppBackend`, `Admin Portal`, `Merchant Portal`).
- **Interactive Component Inspector**: Click any node on the SVG canvas to view IP addresses, domains, ports, SSL configurations, health checks, and role statuses in a slide-out drawer.
- **Togglable Engineer Failover Console**: Integrated 2-column failover console drawer featuring an 11-step manual switchover timeline, step execution spotlight, live timestamped audit log terminal, and auto-run / step-advance controls.
- **Dynamic JSON Configuration Syncing**: Fully driven by [`active.json`](file:///Users/sanjeev/workspace/rtsp-dr-pr/active.json) and [`components.json`](file:///Users/sanjeev/workspace/rtsp-dr-pr/components.json) with automated 4-second background polling—modify JSON files to update the dashboard live without code rebuilds!
- **Dual Visual Theme Support**: Seamless toggle between **Clean Light Mode** (Enterprise White, Slate, Steel Blue) and **Dark Mode** (Slate Navy).

---

## 🚀 Quick Start & Installation

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### Installation Commands

1. **Clone or Navigate to the Workspace Directory**:
   ```bash
   cd /Users/sanjeev/workspace/rtsp-dr-pr
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start the Development Server**:
   ```bash
   npm run dev
   ```
   Open your browser and navigate to [`http://localhost:3001`](http://localhost:3001).

4. **Build for Production**:
   ```bash
   npm run build
   ```

5. **Preview Production Build**:
   ```bash
   npm run preview
   ```

---

## 💻 How to Use the Dashboard

### 1. Switching Active Site
Use the segmented buttons in the top navbar:
- Click **`PR Active (Rawale)`**: Routes DNS target to `WAF-PR (10.x.x.252)`, animates green traffic flow down Rawale DC, and sets Data Guard replication `PR ➔ DR`.
- Click **`DR Active (Gachibowli)`**: Routes DNS target to `WAF-DR (10.x.x.230)`, animates royal blue traffic flow down Gachibowli DC, and reverses Data Guard replication `DR ➔ PR`.

### 2. Running Manual Engineer Switchover
1. Click **`Engineer Failover Console`** in the top navbar to open the console drawer.
2. Click **`Complete Step & Advance`** to manually execute step-by-step failover procedures (Steps 1 through 11).
3. Alternatively, click **`Auto Run`** to let the system automatically execute steps every 3 seconds.
4. Watch live timestamped audit logs record engineer execution in the right terminal panel.
5. Upon completing Step 11, the active infrastructure site automatically flips (`PR ➔ DR` or `DR ➔ PR`).
6. Click **`Close Console ×`** or the top button to hide the drawer at any time.

### 3. Inspecting Component Specs
Click any component card on the canvas (e.g. WAF, PLB, ILB, RTSP Core Services, Oracle DBs, or Common Services) to open the **Component Inspector** drawer on the right.

### 4. Toggling Visual Themes
Click the **`Dark Mode / Clean Light Mode`** button (`Sun`/`Moon` icon) in the top navbar to toggle between Light Mode and Dark Mode.

---

## 🛠️ How to Modify & Customize Component Details (Zero Code Rebuilds)

All infrastructure details, microservice names, IP addresses, endpoints, common services, and failover steps are controlled by two JSON files located in the root and public directories:

1. [`active.json`](file:///Users/sanjeev/workspace/rtsp-dr-pr/active.json) (Root) & [`public/active.json`](file:///Users/sanjeev/workspace/rtsp-dr-pr/public/active.json)
2. [`components.json`](file:///Users/sanjeev/workspace/rtsp-dr-pr/components.json) (Root) & [`public/components.json`](file:///Users/sanjeev/workspace/rtsp-dr-pr/public/components.json)

> **Note**: `App.jsx` polls these files every **4 seconds**. Editing and saving these files automatically re-renders the live application instantly!

---

### A. Changing Active Infrastructure Site (`active.json`)

To change which site is active manually, edit `"activeSite"` in [`active.json`](file:///Users/sanjeev/workspace/rtsp-dr-pr/active.json):

```json
{
  "activeSite": "PR",
  "lastUpdated": "2026-08-26T00:00:00Z",
  "updatedBy": "System Administrator"
}
```

- Set `"activeSite": "PR"` for Rawale Primary DC.
- Set `"activeSite": "DR"` for Gachibowli Disaster Recovery DC.

---

### B. Updating Infrastructure & Microservice Specs (`components.json`)

To edit site architecture, IP addresses, microservices, databases, or common services, edit [`components.json`](file:///Users/sanjeev/workspace/rtsp-dr-pr/components.json):

#### 1. WAF & Load Balancer Specs:
```json
"siteArchitecture": {
  "PR": {
    "siteName": "Primary Region (RAWALE DC)",
    "wafName": "WAF-PR-252",
    "wafIp": "10.x.x.252",
    "plbEndpoint": "cbdc-plb.bank.sbi",
    "ilbEndpoint": "cbdc-ilb.bank.sbi"
  },
  "DR": {
    "siteName": "Disaster Recovery Region (GACHIBOWLI DC)",
    "wafName": "WAF-DR-230",
    "wafIp": "10.x.x.230",
    "plbEndpoint": "cbdc-plb.bank.sbi",
    "ilbEndpoint": "cbdc-ilb.bank.sbi"
  }
}
```

#### 2. Core Microservices (7 Applications):
```json
"rtspCoreServices": [
  { "id": "rtsp-app", "name": "RTSP App Core Engine", "port": 8080 },
  { "id": "rtsp-pso", "name": "Payment Settlement Officer", "port": 8081 },
  { "id": "mint", "name": "CBDC Token Minting Service", "port": 8082 },
  { "id": "BIG", "name": "Bank Interface Gateway", "port": 8083 },
  { "id": "AppBackend", "name": "Mobile App API Backend", "port": 8084 },
  { "id": "Admin Portal", "name": "Operations Admin Portal", "port": 8085 },
  { "id": "Merchant Portal", "name": "Merchant Payment Gateway", "port": 8086 }
]
```

#### 3. Common Services (9 Shared VMs):
```json
"commonServices": [
  { "id": "kafka", "number": 1, "name": "KAFKA Cluster", "endpoint": "10.x.x.100:9092" },
  { "id": "abas", "number": 2, "name": "ABAS Service", "endpoint": "10.x.x.101:8443" },
  { "id": "validation", "number": 3, "name": "Validation SVC", "endpoint": "10.x.x.102:8080" },
  { "id": "eis", "number": 4, "name": "EIS Gateway", "endpoint": "10.x.x.103:9443" },
  { "id": "upi", "number": 5, "name": "UPI Switch Link", "endpoint": "10.x.x.104:8000" },
  { "id": "sms", "number": 6, "name": "SMS Gateway", "endpoint": "10.x.x.105:8080" },
  { "id": "prm", "number": 7, "name": "PRM Engine", "endpoint": "10.x.x.106:9000" },
  { "id": "sfg", "number": 8, "name": "SFG File Gateway", "endpoint": "10.x.x.107:22" },
  { "id": "ldap", "number": 9, "name": "LDAP Directory", "endpoint": "10.x.x.108:636" }
]
```

#### 4. Engineer Switchover Steps (11 Steps):
```json
"failoverSteps": [
  { "step": 1, "title": "Declare Incident & Initiate Switchover", "duration": "1 Min", "details": "Convene emergency response team and log failover ticket." },
  { "step": 2, "title": "Lock PR Ingress Traffic at WAF", "duration": "1 Min", "details": "Drop external incoming HTTP/S connections to Rawale DC WAF." },
  ...
  { "step": 11, "title": "Cutover DNS Target to DR WAF (10.x.x.230)", "duration": "1 Min", "details": "Update global DNS A-Record to point to Gachibowli DC WAF." }
]
```

---

## 📁 Project File Structure

```
rtsp-dr-pr/
├── active.json                   # Active site configuration file ("PR" or "DR")
├── components.json               # Central component JSON specs & failover steps
├── public/
│   ├── active.json               # Web server active site config sync
│   ├── components.json           # Web server components JSON sync
│   └── assets/                   # Custom 3D icons & SVG assets
├── src/
│   ├── App.jsx                   # Main container with 4s polling & theme state
│   ├── index.css                 # Global CSS variables, Light/Dark themes & keyframes
│   ├── main.jsx                  # React application entry point
│   ├── components/
│   │   ├── CustomDiagram.jsx     # Native SVG architecture canvas component
│   │   ├── ComponentInspector.jsx# Right slide-out spec inspector drawer
│   │   └── SimulationStepper.jsx # 2-column engineer failover console drawer
│   └── data/
│       └── diagramData.js        # Fallback default static diagram datasets
├── package.json                  # Project dependencies & scripts
└── README.md                     # Comprehensive documentation
```

---

## 🎯 Verification & Build Validation

To verify the dashboard before deployment:

```bash
npm run build
```

This compiles Vite production bundles into `dist/` with zero errors.

---

## 📄 License & Maintainer
Maintained for **SBI e-Rupee (CBDC) Enterprise Operations Team**.
