// Metadata for RTSP e-Rupee PR/DR Site Infrastructure & Switchover Activities

export const SITES_DATA = {
  PR: {
    id: 'PR',
    name: 'Primary Region (PR)',
    location: 'RAWALE Data Center',
    wafIp: 'WAF-PR-252 (10.x.x.252)',
    dnsTarget: '10.x.x.252',
    status: 'ACTIVE',
    badgeColor: '#10B981',
    primaryDb: 'cbdc-rtsp-db.bank.sbi (Primary R/W)',
    mintDb: 'cbdc-mint-db.bank.sbi (Primary R/W)',
    plbEndpoint: 'cbdc-plb.bank.sbi',
    ilbEndpoint: 'cbdc-ilb.bank.sbi',
    apps: ['RTSP Core Service', 'CBDC Minting Service', 'Wallet Service'],
    endpoints: [
      { name: 'e-Rupee Mobile App', url: 'erupeeapp.sbi.bank.in' },
      { name: 'Merchant e-Rupee App', url: 'merchanterupee.sbi.bank.in' },
      { name: 'CBDC Admin Portal', url: 'admin.erupee.bank.sbi' }
    ]
  },
  DR: {
    id: 'DR',
    name: 'Disaster Recovery (DR)',
    location: 'GACHIBOWLI Data Center',
    wafIp: 'WAF-DR-230 (10.x.x.230)',
    dnsTarget: '10.x.x.230',
    status: 'STANDBY',
    badgeColor: '#3B82F6',
    primaryDb: 'cbdc-rtsp-db.bank.sbi (Data Guard Standby)',
    mintDb: 'cbdc-mint-db.bank.sbi (Data Guard Standby)',
    plbEndpoint: 'cbdc-plb.bank.sbi (Standby)',
    ilbEndpoint: 'cbdc-ilb.bank.sbi (Standby)',
    apps: ['RTSP Core Service (Standby)', 'CBDC Minting Service (Standby)', 'Wallet Service (Standby)'],
    endpoints: [
      { name: 'e-Rupee Mobile App', url: 'erupeeapp.sbi.bank.in' },
      { name: 'Merchant e-Rupee App', url: 'merchanterupee.sbi.bank.in' },
      { name: 'CBDC Admin Portal', url: 'admin.erupee.bank.sbi' }
    ]
  }
};

export const COMMON_SERVICES = [
  { id: 'kafka', number: '9', name: 'KAFKA', endpoint: 'kafka.bank.sbi', type: 'Messaging & Event Stream', prStatus: 'Connected', drStatus: 'Connected' },
  { id: 'abas', number: '10', name: 'ABAS', endpoint: 'abas-attestation.bank.sbi', type: 'Attestation & Security', prStatus: 'Connected', drStatus: 'Connected' },
  { id: 'vld', number: '11', name: 'Validation SVC', endpoint: 'validation-svc.bank.sbi', type: 'Txn Validation Service', prStatus: 'Connected', drStatus: 'Connected' },
  { id: 'eis', number: '12', name: 'EIS', endpoint: 'eis.sbi.co.in', type: 'Enterprise Integration System', prStatus: 'Connected', drStatus: 'Connected' },
  { id: 'upi', number: '13', name: 'UPI', endpoint: 'upi.sbi.co.in', type: 'UPI Gateway Payment System', prStatus: 'Connected', drStatus: 'Connected' },
  { id: 'sms', number: '14', name: 'SMS', endpoint: 'bulksms.sbi.co.in', type: 'SMS Gateway Service', prStatus: 'Connected', drStatus: 'Connected' },
  { id: 'prm', number: '15', name: 'PRM', endpoint: 'prm.sbi.co.in', type: 'Risk & Fraud Monitoring', prStatus: 'Connected', drStatus: 'Connected' },
  { id: 'sfg', number: '16', name: 'SFG', endpoint: 'sfg.sbi.co.in', type: 'Secure File Gateway', prStatus: 'Connected', drStatus: 'Connected' },
  { id: 'ldap', number: '17', name: 'LDAP', endpoint: 'ad.sbi', type: 'Active Directory Identity', prStatus: 'Connected', drStatus: 'Connected' }
];

export const FAILOVER_STEPS = [
  {
    step: 1,
    title: 'Enable Maintenance Mode',
    duration: '1 Min',
    action: 'Enable Maintenance Mode in Web for Both Sites',
    target: 'Web Layer (WAF-PR & WAF-DR)',
    details: 'Displays maintenance banner to end users on erupeeapp.sbi.bank.in and merchanterupee.sbi.bank.in to prevent in-flight transactions.',
    log: '[STEP 1/11] Executing Web Maintenance Mode toggle on WAF-PR-252 and WAF-DR-230... Response: HTTP 503 Maintenance Enabled.'
  },
  {
    step: 2,
    title: 'Point Public DNS',
    duration: '1 Min',
    action: 'Point DNS to target site IP',
    target: 'External DNS (Alibaba Cloud / Provider DNS)',
    details: 'Update public A-records for erupeeapp.sbi.bank.in and merchanterupee.sbi.bank.in to target site WAF IP.',
    log: '[STEP 2/11] Updating DNS A-Record target to Target Site WAF IP... TTL set to 60s. DNS Propagation initialized.'
  },
  {
    step: 3,
    title: 'Stop PLB at Source Site',
    duration: '1 Min',
    action: 'Stop PLB in Source Site',
    target: 'Source Site PLB (cbdc-plb.bank.sbi)',
    details: 'Drains existing HTTP connections on Public Load Balancer at source site to ensure zero pending requests.',
    log: '[STEP 3/11] Gracefully stopping PLB listener on Source Site... 0 active client sockets remaining.'
  },
  {
    step: 4,
    title: 'Update Internal DNS',
    duration: '1 Min',
    action: 'Update DNS of internal DNS point to target site',
    target: 'Internal DNS (ad.sbi / PrivateZone)',
    details: 'Update internal routing tables so backend services route to target site ILB (cbdc-ilb.bank.sbi).',
    log: '[STEP 4/11] Modifying Internal PrivateZone DNS mapping to Target ILB IP... Reloaded ad.sbi zones.'
  },
  {
    step: 5,
    title: 'Stop All App Services',
    duration: '1 Min',
    action: 'Stop All Services on Source Site',
    target: 'App VMs & Microservices',
    details: 'Halts RTSP application pods, minting engine worker threads, and event consumers.',
    log: '[STEP 5/11] Sending SIGTERM to RTSP Core, Minting SVC, and Kafka consumers on Source App VMs... All stopped.'
  },
  {
    step: 6,
    title: 'Switch Database (Failover/Switchover)',
    duration: '4 Mins',
    action: 'Switch Database from DR to PR / PR to DR',
    target: 'Oracle Databases (cbdc-rtsp-db & cbdc-mint-db)',
    details: 'Executes Oracle Data Guard / GoldenGate role switchover. Promotes standby database to Read-Write and demotes primary to Read-Only standby.',
    log: '[STEP 6/11] Executing Oracle Data Guard Switchover: ALTER DATABASE SWITCHOVER TO PRIMARY... Applied redo logs. Database mode: READ WRITE.'
  },
  {
    step: 7,
    title: 'Update DB Configuration',
    duration: '1 Min',
    action: 'Update Config in Database (institute_sysconfig & sysconfig)',
    target: 'DB Tables: institute_sysconfig, sysconfig',
    details: 'Updates active site flag, IP parameters, and callback endpoints in sysconfig tables.',
    log: '[STEP 7/11] SQL EXEC: UPDATE sysconfig SET active_site = :target_site WHERE status = 1; 24 rows updated.'
  },
  {
    step: 8,
    title: 'Start All App Services',
    duration: '1 Min',
    action: 'Start All Services on Target Site',
    target: 'Target Site App VMs',
    details: 'Launches application processes, initialises DB connection pools, and connects to common services (Kafka, ABAS, UPI, SMS).',
    log: '[STEP 8/11] Starting microservices on Target Site... RTSP Core: RUNNING, Mint SVC: RUNNING, Kafka Consumer: LISTENING.'
  },
  {
    step: 9,
    title: 'Start ILB & PLB Services',
    duration: '1 Min',
    action: 'Start ILB and PLB Services',
    target: 'Target Site Load Balancers',
    details: 'Enables backend target groups on Internal and Public Load Balancers.',
    log: '[STEP 9/11] Enabling health check probes on Target PLB & ILB... All targets HEALTHY (200 OK).'
  },
  {
    step: 10,
    title: 'Check Inward Transactions',
    duration: '1 Min',
    action: 'Check Inward Transactions & Health Verification',
    target: 'Synthetic Testing Engine',
    details: 'Executes automated smoke tests for UPI inbound processing, SMS gateway dispatch, and database write integrity.',
    log: '[STEP 10/11] Synthetic test execution: Test Txn #990421 PASSED. End-to-end latency: 42ms.'
  },
  {
    step: 11,
    title: 'Disable Maintenance Mode',
    duration: '1 Min',
    action: 'Disable Maintenance Mode and allow traffic',
    target: 'Public WAF & Edge Gateways',
    details: 'Clears maintenance page on WAF. Full public traffic active on target site.',
    log: '[STEP 11/11] Clearing Maintenance Mode on Target WAF... Live public traffic routing ACTIVE. Switchover Complete!'
  }
];

export const LEGEND_ITEMS = [
  { label: 'Stopped Application', color: '#EF4444', icon: 'square' },
  { label: 'Running Application', color: '#10B981', icon: 'square' },
  { label: 'Routeable Traffic', color: '#3B82F6', icon: 'line-solid' },
  { label: 'IP Based Connection', color: '#6366F1', icon: 'line-dashed' },
  { label: 'Common Components', color: '#F59E0B', icon: 'square' },
  { label: 'Read-Only Database', color: '#EC4899', icon: 'cylinder' }
];
