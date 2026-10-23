const SUPABASE_CONFIG = {
  url: 'https://uwkqihhvkegiadelowft.supabase.co',
  anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV3a3FpaGh2a2VnaWFkZWxvd2Z0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTIzNjM2MTEsImV4cCI6MjEwNzkzOTYxMX0.dfhqF7xAi5_a-wDnZgRCtAimE52dNoWzb-3WuYpGtj8'
};

function getActiveOrgId() {
  const current = (typeof AppState !== 'undefined' && AppState.organizationId) || '';
  const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(current);
  return isUuid ? current : '00000000-0000-0000-0000-000000000001';
}

const AppState = {
      organizationId: "00000000-0000-0000-0000-000000000001",
      theme: 'flowly',
      sidebarCollapsed: false,
      activeView: 'estate-reg',
      activeRegTab: 'landlords',
      companyProfile: {
        companyName: 'METROCOSMO LTD - THIKA',
        slogan: '',
        address1: '40656',
        address2: 'Hughes Building, 7th Floor',
        postalCode: '00100',
        cityTown: 'Nairobi',
        phone: '020 2244218, 0723 422555',
        nhifNo: '',
        nssfNo: '',
        pinNo: '',
        email: 'info@metrocosmo.com',
        logoUrl: '',
        tempLogoBase64: null
      },
      activeAdminTab: 'tab-payment-channels',
      bankAccounts: [
        {
          id: '00000000-0000-0000-0000-000000000010',
          bank_name: 'PETTY CASH',
          branch_name: 'PETTY CASH',
          account_name: 'METRO CASH',
          account_no: 'CASH001',
          swift_code: 'PCASH',
          is_active: true
        },
        {
          id: '00000000-0000-0000-0000-000000000020',
          bank_name: 'ABSA BANK',
          branch_name: 'RUIRU',
          account_name: 'METROCOSMO LIMITED',
          account_no: '0311121448',
          swift_code: '',
          is_active: true
        }
      ],
      mpesaPaybills: [
        {
          id: '00000000-0000-0000-0000-000000000030',
          paybill_number: '522522',
          business_name: 'METROCOSMO LTD',
          account_prefix: 'TENANT CODE',
          bank_account_id: '00000000-0000-0000-0000-000000000020',
          is_active: true
        },
        {
          id: '00000000-0000-0000-0000-000000000040',
          paybill_number: '247247',
          business_name: 'METROCOSMO PROPERTIES',
          account_prefix: 'UNIT NUMBER',
          bank_account_id: '00000000-0000-0000-0000-000000000020',
          is_active: true
        }
      ],
      accountingPeriods: [
      ],
      tenantInvoices: [],
      tenantReceipts: [
      ],
      activeTenantTab: 'tab-invoices',
      activeInvoiceSubTab: 'single',
      landlords: [
      ],
      tenants: [
      ],
      properties: [
      ],
      units: [
      ],
      mandates: [
      ],
      masterPayables: [
        { code: '001', description: 'Rent', isCompulsory: true, isRefundable: false, isAgentHold: false, isCommissionable: true, isPercentage: false, isRecurring: true, isFixedAmount: true, rateOnRent: 0.00, status: true, priority: 10 },
        { code: '002', description: 'Water Bill', isCompulsory: false, isRefundable: false, isAgentHold: true, isCommissionable: false, isPercentage: false, isRecurring: false, isFixedAmount: false, rateOnRent: 0.00, status: true, priority: 20 },
        { code: '003', description: 'Electricity Bill', isCompulsory: false, isRefundable: false, isAgentHold: true, isCommissionable: false, isPercentage: false, isRecurring: false, isFixedAmount: false, rateOnRent: 0.00, status: true, priority: 20 },
        { code: '004', description: 'Rent Deposit', isCompulsory: true, isRefundable: false, isAgentHold: false, isCommissionable: false, isPercentage: false, isRecurring: false, isFixedAmount: true, rateOnRent: 0.00, status: true, priority: 30 },
        { code: '005', description: 'Water Deposit', isCompulsory: true, isRefundable: true, isAgentHold: false, isCommissionable: false, isPercentage: false, isRecurring: false, isFixedAmount: true, rateOnRent: 0.00, status: true, priority: 30 },
        { code: '006', description: 'Electricity Deposit', isCompulsory: true, isRefundable: true, isAgentHold: false, isCommissionable: false, isPercentage: false, isRecurring: false, isFixedAmount: false, rateOnRent: 0.00, status: true, priority: 30 },
        { code: '009', description: 'Service Charge', isCompulsory: true, isRefundable: false, isAgentHold: false, isCommissionable: false, isPercentage: false, isRecurring: true, isFixedAmount: true, rateOnRent: 0.00, status: true, priority: 15 },
        { code: 'VAT', description: 'VAT', isCompulsory: false, isRefundable: false, isAgentHold: false, isCommissionable: false, isPercentage: true, isRecurring: false, isFixedAmount: true, rateOnRent: 16.00, status: true, priority: 25 },
        { code: '011', description: 'Unpaid Cheque Charges', isCompulsory: false, isRefundable: false, isAgentHold: true, isCommissionable: false, isPercentage: false, isRecurring: false, isFixedAmount: false, rateOnRent: 0.00, status: true, priority: 5 },
        { code: '035', description: 'Penalty', isCompulsory: false, isRefundable: false, isAgentHold: true, isCommissionable: false, isPercentage: true, isRecurring: false, isFixedAmount: false, rateOnRent: 10.00, status: true, priority: 5 },
        { code: '008', description: 'Tenancy Agreement', isCompulsory: true, isRefundable: false, isAgentHold: true, isCommissionable: false, isPercentage: false, isRecurring: false, isFixedAmount: false, rateOnRent: 0.00, status: true, priority: 40 },
        { code: '015', description: 'Security', isCompulsory: true, isRefundable: false, isAgentHold: true, isCommissionable: false, isPercentage: false, isRecurring: true, isFixedAmount: true, rateOnRent: 0.00, status: true, priority: 18 },
        { code: '016', description: 'Recovery Charges', isCompulsory: false, isRefundable: false, isAgentHold: true, isCommissionable: false, isPercentage: false, isRecurring: false, isFixedAmount: false, rateOnRent: 0.00, status: true, priority: 5 },
        { code: '017', description: 'Garbage', isCompulsory: true, isRefundable: false, isAgentHold: true, isCommissionable: false, isPercentage: false, isRecurring: true, isFixedAmount: true, rateOnRent: 0.00, status: true, priority: 19 },
        { code: '010', description: 'Letting Fee', isCompulsory: false, isRefundable: false, isAgentHold: true, isCommissionable: false, isPercentage: false, isRecurring: false, isFixedAmount: false, rateOnRent: 0.00, status: true, priority: 45 },
        { code: '018', description: 'Auction Fees', isCompulsory: true, isRefundable: false, isAgentHold: true, isCommissionable: false, isPercentage: false, isRecurring: false, isFixedAmount: false, rateOnRent: 0.00, status: true, priority: 5 },
        { code: '013', description: 'Branch', isCompulsory: true, isRefundable: false, isAgentHold: true, isCommissionable: false, isPercentage: false, isRecurring: false, isFixedAmount: false, rateOnRent: 0.00, status: true, priority: 50 },
        { code: '019', description: 'Shifting Fee', isCompulsory: true, isRefundable: false, isAgentHold: true, isCommissionable: false, isPercentage: false, isRecurring: false, isFixedAmount: false, rateOnRent: 0.00, status: true, priority: 50 },
        { code: '021', description: 'Goodwill', isCompulsory: true, isRefundable: true, isAgentHold: false, isCommissionable: false, isPercentage: false, isRecurring: false, isFixedAmount: false, rateOnRent: 0.00, status: true, priority: 60 }
      ],
      propertyPayablesConfig: {
        'PROP-01': [
          { code: '001', description: 'Rent', isCompulsory: true, isRefundable: false, isAgentHold: false, isCommissionable: true, isPercentage: false, isRecurring: true, isFixedAmount: true, rateOnRent: 0.00, status: true, priority: 10 },
          { code: '002', description: 'Water Bill', isCompulsory: false, isRefundable: false, isAgentHold: true, isCommissionable: false, isPercentage: false, isRecurring: false, isFixedAmount: false, rateOnRent: 0.00, status: true, priority: 20 },
          { code: '003', description: 'Electricity Bill', isCompulsory: false, isRefundable: false, isAgentHold: true, isCommissionable: false, isPercentage: false, isRecurring: false, isFixedAmount: false, rateOnRent: 0.00, status: true, priority: 20 },
          { code: '004', description: 'Rent Deposit', isCompulsory: true, isRefundable: false, isAgentHold: false, isCommissionable: false, isPercentage: false, isRecurring: false, isFixedAmount: true, rateOnRent: 0.00, status: true, priority: 30 },
          { code: '005', description: 'Water Deposit', isCompulsory: true, isRefundable: true, isAgentHold: false, isCommissionable: false, isPercentage: false, isRecurring: false, isFixedAmount: true, rateOnRent: 0.00, status: true, priority: 30 },
          { code: '006', description: 'Electricity Deposit', isCompulsory: true, isRefundable: true, isAgentHold: false, isCommissionable: false, isPercentage: false, isRecurring: false, isFixedAmount: false, rateOnRent: 0.00, status: true, priority: 30 },
          { code: '009', description: 'Service Charge', isCompulsory: true, isRefundable: false, isAgentHold: false, isCommissionable: false, isPercentage: false, isRecurring: true, isFixedAmount: true, rateOnRent: 0.00, status: true, priority: 15 },
          { code: 'VAT', description: 'VAT', isCompulsory: false, isRefundable: false, isAgentHold: false, isCommissionable: false, isPercentage: true, isRecurring: false, isFixedAmount: true, rateOnRent: 16.00, status: true, priority: 25 },
          { code: '011', description: 'Unpaid Cheque Charges', isCompulsory: false, isRefundable: false, isAgentHold: true, isCommissionable: false, isPercentage: false, isRecurring: false, isFixedAmount: false, rateOnRent: 0.00, status: true, priority: 5 },
          { code: '035', description: 'Penalty', isCompulsory: false, isRefundable: false, isAgentHold: true, isCommissionable: false, isPercentage: true, isRecurring: false, isFixedAmount: false, rateOnRent: 10.00, status: true, priority: 5 },
          { code: '008', description: 'Tenancy Agreement', isCompulsory: true, isRefundable: false, isAgentHold: true, isCommissionable: false, isPercentage: false, isRecurring: false, isFixedAmount: false, rateOnRent: 0.00, status: true, priority: 40 },
          { code: '015', description: 'Security', isCompulsory: true, isRefundable: false, isAgentHold: true, isCommissionable: false, isPercentage: false, isRecurring: true, isFixedAmount: true, rateOnRent: 0.00, status: true, priority: 18 },
          { code: '016', description: 'Recovery Charges', isCompulsory: false, isRefundable: false, isAgentHold: true, isCommissionable: false, isPercentage: false, isRecurring: false, isFixedAmount: false, rateOnRent: 0.00, status: true, priority: 5 },
          { code: '017', description: 'Garbage', isCompulsory: true, isRefundable: false, isAgentHold: true, isCommissionable: false, isPercentage: false, isRecurring: true, isFixedAmount: true, rateOnRent: 0.00, status: true, priority: 19 },
          { code: '010', description: 'Letting Fee', isCompulsory: false, isRefundable: false, isAgentHold: true, isCommissionable: false, isPercentage: false, isRecurring: false, isFixedAmount: false, rateOnRent: 0.00, status: true, priority: 45 },
          { code: '018', description: 'Auction Fees', isCompulsory: true, isRefundable: false, isAgentHold: true, isCommissionable: false, isPercentage: false, isRecurring: false, isFixedAmount: false, rateOnRent: 0.00, status: true, priority: 5 },
          { code: '013', description: 'Branch', isCompulsory: true, isRefundable: false, isAgentHold: true, isCommissionable: false, isPercentage: false, isRecurring: false, isFixedAmount: false, rateOnRent: 0.00, status: true, priority: 50 },
          { code: '019', description: 'Shifting Fee', isCompulsory: true, isRefundable: false, isAgentHold: true, isCommissionable: false, isPercentage: false, isRecurring: false, isFixedAmount: false, rateOnRent: 0.00, status: true, priority: 50 },
          { code: '021', description: 'Goodwill', isCompulsory: true, isRefundable: true, isAgentHold: false, isCommissionable: false, isPercentage: false, isRecurring: false, isFixedAmount: false, rateOnRent: 0.00, status: true, priority: 60 }
        ],
        'PROP-02': [
          { code: '001', description: 'Rent', isCompulsory: true, isRefundable: false, isAgentHold: false, isCommissionable: true, isPercentage: false, isRecurring: true, isFixedAmount: true, rateOnRent: 0.00, status: true, priority: 10 },
          { code: '002', description: 'Water Bill', isCompulsory: false, isRefundable: false, isAgentHold: true, isCommissionable: false, isPercentage: false, isRecurring: false, isFixedAmount: false, rateOnRent: 0.00, status: true, priority: 20 },
          { code: '003', description: 'Electricity Bill', isCompulsory: false, isRefundable: false, isAgentHold: true, isCommissionable: false, isPercentage: false, isRecurring: false, isFixedAmount: false, rateOnRent: 0.00, status: true, priority: 20 },
          { code: '004', description: 'Rent Deposit', isCompulsory: true, isRefundable: false, isAgentHold: false, isCommissionable: false, isPercentage: false, isRecurring: false, isFixedAmount: true, rateOnRent: 0.00, status: true, priority: 30 },
          { code: '005', description: 'Water Deposit', isCompulsory: true, isRefundable: true, isAgentHold: false, isCommissionable: false, isPercentage: false, isRecurring: false, isFixedAmount: true, rateOnRent: 0.00, status: true, priority: 30 },
          { code: '006', description: 'Electricity Deposit', isCompulsory: true, isRefundable: true, isAgentHold: false, isCommissionable: false, isPercentage: false, isRecurring: false, isFixedAmount: false, rateOnRent: 0.00, status: true, priority: 30 },
          { code: '009', description: 'Service Charge', isCompulsory: true, isRefundable: false, isAgentHold: false, isCommissionable: false, isPercentage: false, isRecurring: true, isFixedAmount: true, rateOnRent: 0.00, status: true, priority: 15 },
          { code: 'VAT', description: 'VAT', isCompulsory: false, isRefundable: false, isAgentHold: false, isCommissionable: false, isPercentage: true, isRecurring: false, isFixedAmount: true, rateOnRent: 16.00, status: true, priority: 25 },
          { code: '011', description: 'Unpaid Cheque Charges', isCompulsory: false, isRefundable: false, isAgentHold: true, isCommissionable: false, isPercentage: false, isRecurring: false, isFixedAmount: false, rateOnRent: 0.00, status: true, priority: 5 },
          { code: '035', description: 'Penalty', isCompulsory: false, isRefundable: false, isAgentHold: true, isCommissionable: false, isPercentage: true, isRecurring: false, isFixedAmount: false, rateOnRent: 10.00, status: true, priority: 5 },
          { code: '008', description: 'Tenancy Agreement', isCompulsory: true, isRefundable: false, isAgentHold: true, isCommissionable: false, isPercentage: false, isRecurring: false, isFixedAmount: false, rateOnRent: 0.00, status: true, priority: 40 },
          { code: '015', description: 'Security', isCompulsory: true, isRefundable: false, isAgentHold: true, isCommissionable: false, isPercentage: false, isRecurring: true, isFixedAmount: true, rateOnRent: 0.00, status: true, priority: 18 },
          { code: '016', description: 'Recovery Charges', isCompulsory: false, isRefundable: false, isAgentHold: true, isCommissionable: false, isPercentage: false, isRecurring: false, isFixedAmount: false, rateOnRent: 0.00, status: true, priority: 5 },
          { code: '017', description: 'Garbage', isCompulsory: true, isRefundable: false, isAgentHold: true, isCommissionable: false, isPercentage: false, isRecurring: true, isFixedAmount: true, rateOnRent: 0.00, status: true, priority: 19 },
          { code: '010', description: 'Letting Fee', isCompulsory: false, isRefundable: false, isAgentHold: true, isCommissionable: false, isPercentage: false, isRecurring: false, isFixedAmount: false, rateOnRent: 0.00, status: true, priority: 45 },
          { code: '018', description: 'Auction Fees', isCompulsory: true, isRefundable: false, isAgentHold: true, isCommissionable: false, isPercentage: false, isRecurring: false, isFixedAmount: false, rateOnRent: 0.00, status: true, priority: 5 },
          { code: '013', description: 'Branch', isCompulsory: true, isRefundable: false, isAgentHold: true, isCommissionable: false, isPercentage: false, isRecurring: false, isFixedAmount: false, rateOnRent: 0.00, status: true, priority: 50 },
          { code: '019', description: 'Shifting Fee', isCompulsory: true, isRefundable: false, isAgentHold: true, isCommissionable: false, isPercentage: false, isRecurring: false, isFixedAmount: false, rateOnRent: 0.00, status: true, priority: 50 },
          { code: '021', description: 'Goodwill', isCompulsory: true, isRefundable: true, isAgentHold: false, isCommissionable: false, isPercentage: false, isRecurring: false, isFixedAmount: false, rateOnRent: 0.00, status: true, priority: 60 }
        ],
        'PROP-03': [
          { id: '30640', code: '001', description: 'Rent', defaultAmount: 0.00 },
          { id: '30641', code: '002', description: 'Water Bill', defaultAmount: 0.00 },
          { id: '30643', code: '005', description: 'Water Deposit', defaultAmount: 0.00 },
          { id: '30644', code: '006', description: 'Electricity Deposit', defaultAmount: 0.00 },
          { id: '30645', code: '008', description: 'Tenancy Agreement', defaultAmount: 0.00 },
          { id: '30646', code: '035', description: 'Penalty', defaultAmount: 1.00 },
          { id: '30647', code: '009', description: 'Service Charge', defaultAmount: 1.00 },
          { id: '60731', code: '015', description: 'Security', defaultAmount: 0.00 },
          { id: '60732', code: '017', description: 'Garbage', defaultAmount: 0.00 },
          { id: '70001', code: '004', description: 'Rent Deposit', defaultAmount: 0.00 }
        ]
      },
      propertyWaterfallRules: {
        'PROP-01': { overpaymentRouting: 'ADVANCE_RENT' },
        'PROP-02': { overpaymentRouting: 'ADVANCE_RENT' },
        'PROP-03': { overpaymentRouting: 'ADVANCE_RENT' }
      },
      activeTenantTab: 'tab-single-tenant',
      leases: [
      ],
      utilityReadings: [
      ],
      invoices: [
      ],
      ledger: [
      ],
      activeLandlordTab: 'portfolio',
      landlordStatements: [
      ],
      landlordPayouts: [
      ],
      activeRepairTab: 'tickets',
      vendors: [
      ],
      maintenanceRequests: [
      ],
      maintenanceWorkOrders: [
      ]
    };

    // Immediate synchronous hydration from 6-month showcase dataset
    if (typeof window !== 'undefined' && window.MC_ERP_SEED_DATA) {
      Object.keys(window.MC_ERP_SEED_DATA).forEach(function(k) {
        if (Array.isArray(window.MC_ERP_SEED_DATA[k])) {
          AppState[k] = window.MC_ERP_SEED_DATA[k];
        } else if (typeof window.MC_ERP_SEED_DATA[k] === 'object' && window.MC_ERP_SEED_DATA[k] !== null) {
          AppState[k] = Object.assign(AppState[k] || {}, window.MC_ERP_SEED_DATA[k]);
        }
      });
    }


    const root = document.documentElement;
    const body = document.body;
    const sidebar = document.getElementById('sidebar');
    const sidebarToggleBtn = document.getElementById('sidebar-toggle-btn');
    const brandGlyphBtn = document.getElementById('brand-glyph-btn');
    const chevronSvg = document.getElementById('chevron-svg');
    const navItems = document.querySelectorAll('.nav-item');
    const groupLabels = document.querySelectorAll('.nav-group-label');
    const currentPageTitle = document.getElementById('current-page-title');
    const headerThemeIndicator = document.getElementById('header-theme-indicator');
    const quickThemeDropdown = document.getElementById('quick-theme-dropdown');
    const quickSettingsBtn = document.getElementById('quick-settings-btn');
    const toastTray = document.getElementById('toast-tray');

    function setTheme(newTheme) {
      AppState.theme = newTheme;
      root.setAttribute('data-theme', newTheme);
      localStorage.setItem('mc_erp_theme_choice', newTheme);
      if (quickThemeDropdown) quickThemeDropdown.value = newTheme;

      const themeCards = document.querySelectorAll('.theme-card');
      themeCards.forEach(card => {
        if (card.getAttribute('data-theme-target') === newTheme) {
          card.classList.add('active-theme');
        } else {
          card.classList.remove('active-theme');
        }
      });

      const themeNames = {
        developer: 'Developer Plain',
        flowly: 'Flowly Iridescent',
        cobalt: 'Cobalt Bloom Azure',
        hireism: 'Hireism Modern SaaS',
        obsidian: 'Obsidian & Emerald'
      };
      if (headerThemeIndicator) {
        headerThemeIndicator.textContent = themeNames[newTheme] || 'Enterprise Grid';
      }
    }

    if (quickThemeDropdown) {
      quickThemeDropdown.addEventListener('change', (e) => setTheme(e.target.value));
    }

    function toggleSidebar() {
      AppState.sidebarCollapsed = !AppState.sidebarCollapsed;
      if (AppState.sidebarCollapsed) {
        sidebar.classList.add('collapsed');
        body.classList.add('sidebar-collapsed');
        chevronSvg.innerHTML = '<path d="M15 18l-6-6 6-6"/>';
        groupLabels.forEach(lbl => lbl.textContent = lbl.getAttribute('data-short'));
      } else {
        sidebar.classList.remove('collapsed');
        body.classList.remove('sidebar-collapsed');
        chevronSvg.innerHTML = '<path d="M9 18l6-6-6-6"/>';
        groupLabels.forEach(lbl => lbl.textContent = lbl.getAttribute('data-full'));
      }
    }

    if (sidebarToggleBtn) sidebarToggleBtn.addEventListener('click', toggleSidebar);
    if (brandGlyphBtn) brandGlyphBtn.addEventListener('click', () => { if (AppState.sidebarCollapsed) toggleSidebar(); });

    /* DYNAMIC MODULE LOADER (MODULAR FRONTEND ARCHITECTURE) */
    const moduleFileMap = {
      'estate-reg': '1_1_registration.html',
      'estate-tenants': '1_2_tenants.html',
      'estate-landlords': '1_3_landlords.html',
      'estate-landlords-1-4': '1_4_landlords.html',
      '1_4_landlords': '1_4_landlords.html',
      '1_3_landlords': '1_3_landlords.html',
      'estate-repairs': '1_4_repairs.html',
      'estate-admin': '1_5_admin.html',
      'mod-agency': '02_agency.html',
      'mod-valuation': '03_valuation.html',
      'mod-admin': '04_admin.html',
      'mod-finance': '05_finance.html',
      'mod-operations': '06_operations.html',
      'settings': '07_settings.html',
      'admin-setup': '08_admin.html',
      '08_admin': '08_admin.html',
      '8_admin': '08_admin.html',
      'tenant-ledger': '1_5_tenant_ledger.html',
      'estate-ledger': '1_5_tenant_ledger.html',
      '1_5_tenant_ledger': '1_5_tenant_ledger.html'
    };

    const moduleCache = {};

    async function loadModule(viewName, title) {
      AppState.activeView = viewName;
      if (title && currentPageTitle) currentPageTitle.textContent = title;

      navItems.forEach(item => {
        if (item.getAttribute('data-view') === viewName) {
          item.classList.add('active');
        } else {
          item.classList.remove('active');
        }
      });

      const moduleContainer = document.getElementById('module-content');
      if (!moduleContainer) return;

      const fileName = moduleFileMap[viewName];
      if (!fileName) {
        console.warn(`No module file mapped for view: ${viewName}`);
        return;
      }

      try {
        const response = await fetch(`modules/${fileName}?v=${Date.now()}`);
        if (!response.ok) throw new Error(`HTTP ${response.status} loading ${fileName}`);
        const freshHtml = await response.text();
        moduleCache[viewName] = freshHtml;

        moduleContainer.innerHTML = freshHtml;

        // Ensure inner view-content container has active class
        const loadedView = moduleContainer.querySelector('.view-content');
        if (loadedView) loadedView.classList.add('active');

        // Run module-specific initializers and renderers
        initializeLoadedModule(viewName);

        if (title) showToast(`Loaded: ${title}`);
      } catch (err) {
        console.error(`Failed to load module ${viewName}:`, err);
        moduleContainer.innerHTML = `
          <div class="glass-card clean-module-container" style="color: #EF4444;">
            <h3>Error Loading Module</h3>
            <p>${err.message}</p>
            <button class="btn-elevated-primary" onclick="loadModule('${viewName}', '${title || ''}')" style="margin-top: 12px;">Retry</button>
          </div>
        `;
      }
    }

    function switchView(viewName, title) {
      loadModule(viewName, title);
    }

    navItems.forEach(item => {
      item.addEventListener('click', () => {
        switchView(item.getAttribute('data-view'), item.getAttribute('data-tooltip'));
      });
    });

    if (quickSettingsBtn) {
      quickSettingsBtn.addEventListener('click', () => switchView('settings', 'Settings'));
    }

    function setupRegistrationTabs() {
      const regTabBtns = document.querySelectorAll('.reg-tab-btn');
      regTabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          regTabBtns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');

          const target = btn.getAttribute('data-reg-target');
          AppState.activeRegTab = target;
          document.querySelectorAll('.reg-panel').forEach(p => p.classList.remove('active'));
          const panel = document.getElementById(`panel-${target}`);
          if (panel) panel.classList.add('active');
        });
      });
    }

    function setupSettingsThemeCards() {
      const cards = document.querySelectorAll('.theme-card');
      cards.forEach(card => {
        const targetTheme = card.getAttribute('data-theme-target');
        if (targetTheme === AppState.theme) {
          card.classList.add('active-theme');
        } else {
          card.classList.remove('active-theme');
        }
        card.addEventListener('click', () => setTheme(targetTheme));
      });
    }

    function initializeLoadedModule(viewName) {
      switch (viewName) {
        case 'estate-reg':
          setupRegistrationTabs();
          populateDropdowns();
          updateNextLandlordCodeDisplay();
          updateNextPropertyCodeDisplay();
          renderLandlordsTable();
          renderTenantsTable();
          renderBuilderUnits();
          renderBuilderPayables();
          renderPropertiesTable();
          renderUnitsTable();
          initTenantAssignTab();
          renderTenantAssignmentsTable();
          initBulkUnitsTab();
          initPropertyPayablesTab();
          if (AppState.activeRegTab) {
            const btn = document.querySelector(`[data-reg-target="${AppState.activeRegTab}"]`);
            if (btn) btn.click();
          }
          break;

        case 'estate-tenants':
          setupTenantTabs();
          initSingleTenantBilling();
          initBulkTenantsBilling();
          renderLeasesTable();
          renderReadingsTable();
          renderInvoicesTable();
          renderLedgerTable();
          loadTenantReceipts();
          initTenantReceipting();
          switchTenantTab(AppState.activeTenantTab || 'tab-invoices');
          break;

        case 'tenant-ledger':
        case 'estate-ledger':
        case '1_5_tenant_ledger':
          initTenantStatementEngine();
          break;

        case 'estate-landlords':
        case 'estate-landlords-1-4':
        case '1_4_landlords':
        case '1_3_landlords':
          setupLandlordTabs();
          populateLandlordDropdowns();
          renderLandlordPortfolioTable();
          renderLandlordStatementsTable();
          renderLandlordPayoutQueueTable();
          initLandlordStatementGenerator();
          if (AppState.activeLandlordTab) {
            const btn = document.querySelector(`[data-landlord-target="${AppState.activeLandlordTab}"]`);
            if (btn) btn.click();
          }
          break;

        case 'estate-repairs':
          setupRepairTabs();
          populateRepairDropdowns();
          renderMaintenanceTicketsTable();
          renderWorkOrdersTable();
          renderVendorsTable();
          renderCostAllocationLedger();
          if (AppState.activeRepairTab) {
            const btn = document.querySelector(`[data-repair-target="${AppState.activeRepairTab}"]`);
            if (btn) btn.click();
          }
          break;

        case 'settings':
          setupSettingsThemeCards();
          break;

        case 'admin-setup':
        case '08_admin':
        case '8_admin':
          initAdminCompanySetup();
          break;

        default:
          break;
      }
    }

    /* ==========================================================================
       GLOBAL TRANSACTION INTERCEPTOR & CONFIRMATION WARNING MODAL
       ========================================================================== */
    let pendingGlobalConfirmCallback = null;

    function confirmAction(message, callback, title = 'Database Execution Warning', confirmBtnText = 'Confirm & Execute', isDanger = false) {
      pendingGlobalConfirmCallback = callback;
      const modal = document.getElementById('modal-global-confirm');
      if (!modal) {
        if (window.confirm(message)) {
          if (typeof callback === 'function') callback();
        }
        return;
      }

      const titleElem = document.getElementById('global-confirm-title');
      const msgElem = document.getElementById('global-confirm-msg');
      const btnElem = document.getElementById('global-confirm-execute-btn');
      const iconElem = document.getElementById('global-confirm-icon');
      const cardElem = modal.querySelector('.modal-card');

      if (titleElem) titleElem.textContent = title;
      if (msgElem) msgElem.innerHTML = message;
      if (btnElem) {
        btnElem.textContent = confirmBtnText;
        if (isDanger) {
          btnElem.style.background = '#DC2626';
          btnElem.style.borderColor = '#B91C1C';
        } else {
          btnElem.style.background = 'var(--accent-primary)';
          btnElem.style.borderColor = 'var(--accent-primary)';
        }
      }
      if (cardElem) {
        cardElem.style.borderLeft = isDanger ? '6px solid #EF4444' : '6px solid #F59E0B';
      }
      if (iconElem) {
        iconElem.textContent = isDanger ? '🚨' : '⚠️';
      }

      modal.classList.add('active');
    }

    function closeGlobalConfirmModal() {
      pendingGlobalConfirmCallback = null;
      const modal = document.getElementById('modal-global-confirm');
      if (modal) modal.classList.remove('active');
    }

    function executeGlobalConfirmedAction() {
      const cb = pendingGlobalConfirmCallback;
      closeGlobalConfirmModal();
      if (typeof cb === 'function') {
        cb();
      }
    }

    function confirmClearForm(formId) {
      confirmAction(
        'Are you sure you want to clear all entered fields in this form? Unsaved input will be reset.',
        () => {
          const form = document.getElementById(formId);
          if (form) form.reset();
          if (formId === 'form-landlord') {
            if (editingLandlordId) cancelLandlordEdit();
            updateNextLandlordCodeDisplay();
            toggleLandlordEntityFields();
            toggleLandlordRemitFields();
          } else if (formId === 'form-property') {
            if (editingPropertyId) cancelPropertyEdit();
            updateNextPropertyCodeDisplay();
          }
          showToast('Form fields cleared.');
        },
        'Clear Form Warning',
        'Clear Form',
        true
      );
    }

    /* LANDLORD CODE GENERATOR & HELPERS */
    function getNextLandlordCode() {
      const existingNums = (AppState.landlords || [])
        .map(l => {
          const match = (l.landlordCode || '').match(/^L(\d+)$/i);
          return match ? parseInt(match[1], 10) : 0;
        })
        .filter(n => !isNaN(n));
      const maxNum = existingNums.length > 0 ? Math.max(...existingNums) : 0;
      return `L${String(maxNum + 1).padStart(3, '0')}`;
    }

    function updateNextLandlordCodeDisplay() {
      const codeInput = document.getElementById('landlord-code');
      if (codeInput && !editingLandlordId) {
        codeInput.value = getNextLandlordCode();
      }
    }

    /* PROPERTY CODE GENERATOR & HELPERS */
    function getNextPropertyCode() {
      const existingNums = (AppState.properties || [])
        .map(p => {
          const match = (p.propertyIdCode || '').match(/^P(\d+)$/i);
          return match ? parseInt(match[1], 10) : 0;
        })
        .filter(n => !isNaN(n));
      const maxNum = existingNums.length > 0 ? Math.max(...existingNums) : 0;
      return `P${String(maxNum + 1).padStart(3, '0')}`;
    }

    function updateNextPropertyCodeDisplay() {
      const codeInput = document.getElementById('prop-code');
      const badgeElem = document.getElementById('prop-code-badge');
      if (!editingPropertyId) {
        const nextCode = getNextPropertyCode();
        if (codeInput) codeInput.value = nextCode;
        if (badgeElem) badgeElem.textContent = `ID: ${nextCode}`;
      }
    }

    /* FORM TOGGLES */
    function toggleLandlordEntityFields() {
      const type = document.getElementById('landlord-entity-type').value;
      const isCorp = type === 'CORPORATE';
      document.getElementById('group-ll-first-name').style.display = isCorp ? 'none' : 'flex';
      document.getElementById('group-ll-middle-name').style.display = isCorp ? 'none' : 'flex';
      document.getElementById('group-ll-last-name').style.display = isCorp ? 'none' : 'flex';
      document.getElementById('group-ll-company-name').style.display = isCorp ? 'flex' : 'none';

      document.getElementById('landlord-first-name').required = !isCorp;
      document.getElementById('landlord-last-name').required = !isCorp;
      document.getElementById('landlord-company-name').required = isCorp;
    }

    function toggleLandlordRemitFields() {
      const method = document.getElementById('landlord-remit-method').value;
      const isBank = method === 'BANK';
      document.getElementById('group-ll-bank-name').style.display = isBank ? 'flex' : 'none';
      document.getElementById('group-ll-bank-branch').style.display = isBank ? 'flex' : 'none';
      document.getElementById('group-ll-bank-acc').style.display = isBank ? 'flex' : 'none';
      document.getElementById('group-ll-mpesa-b2c').style.display = isBank ? 'none' : 'flex';
    }

    /* LANDLORD EDIT MODE & SUBMIT */
    let editingLandlordId = null;

    function editLandlord(landlordId) {
      const ll = AppState.landlords.find(l => l.id === landlordId);
      if (!ll) return;

      editingLandlordId = landlordId;

      // Ensure Landlords tab is active
      const llTabBtn = document.querySelector('[data-reg-target="landlords"]');
      if (llTabBtn) llTabBtn.click();

      // Populate form fields
      const codeElem = document.getElementById('landlord-code');
      if (codeElem) codeElem.value = ll.landlordCode || ll.id;

      const entityElem = document.getElementById('landlord-entity-type');
      if (entityElem) entityElem.value = ll.entityType;
      toggleLandlordEntityFields();

      if (ll.entityType === 'CORPORATE') {
        const compElem = document.getElementById('landlord-company-name');
        if (compElem) compElem.value = ll.name;
      } else {
        const nameParts = (ll.name || '').trim().split(' ');
        const firstElem = document.getElementById('landlord-first-name');
        const midElem = document.getElementById('landlord-middle-name');
        const lastElem = document.getElementById('landlord-last-name');
        if (firstElem) firstElem.value = nameParts[0] || '';
        if (midElem) midElem.value = nameParts.length > 2 ? nameParts.slice(1, -1).join(' ') : '';
        if (lastElem) lastElem.value = nameParts.length > 1 ? nameParts[nameParts.length - 1] : '';
      }

      const idRegElem = document.getElementById('landlord-id-reg');
      if (idRegElem) idRegElem.value = ll.idReg || '';

      const kraElem = document.getElementById('landlord-kra-pin');
      if (kraElem) kraElem.value = ll.kraPin || '';

      const postalElem = document.getElementById('landlord-postal-code');
      if (postalElem) postalElem.value = ll.postalCode || '';

      const phoneElem = document.getElementById('landlord-phone');
      if (phoneElem) phoneElem.value = ll.phone || '';

      const emailElem = document.getElementById('landlord-email');
      if (emailElem) emailElem.value = ll.email || '';

      const nokNameElem = document.getElementById('landlord-next-of-kin-name');
      if (nokNameElem) nokNameElem.value = ll.nextOfKinName || '';

      const nokPhoneElem = document.getElementById('landlord-next-of-kin-phone');
      if (nokPhoneElem) nokPhoneElem.value = ll.nextOfKinPhone || '';

      const nokRelElem = document.getElementById('landlord-next-of-kin-relationship');
      if (nokRelElem) nokRelElem.value = ll.nextOfKinRelationship || '';

      const remitElem = document.getElementById('landlord-remit-method');
      if (remitElem) remitElem.value = ll.remitMethod || 'BANK';
      toggleLandlordRemitFields();

      if (ll.remitMethod === 'BANK') {
        const bankElem = document.getElementById('landlord-bank-name');
        if (bankElem && ll.bank) bankElem.value = ll.bank;
        const branchElem = document.getElementById('landlord-bank-branch');
        if (branchElem) branchElem.value = ll.branch || '';
        const accElem = document.getElementById('landlord-bank-acc');
        if (accElem) accElem.value = ll.accNo || '';
      } else {
        const mpesaElem = document.getElementById('landlord-mpesa-phone');
        if (mpesaElem) mpesaElem.value = ll.phone || '';
      }

      // Switch button state
      const submitBtn = document.getElementById('btn-submit-landlord');
      if (submitBtn) submitBtn.innerHTML = '💾 Update Landlord Details';

      const cancelBtn = document.getElementById('btn-cancel-landlord-edit');
      if (cancelBtn) cancelBtn.style.display = 'inline-flex';

      const formElem = document.getElementById('form-landlord');
      if (formElem) formElem.scrollIntoView({ behavior: 'smooth' });

      showToast(`Loaded Landlord [${ll.landlordCode || ll.id}] into editor`);
    }

    function cancelLandlordEdit() {
      editingLandlordId = null;
      const formElem = document.getElementById('form-landlord');
      if (formElem) formElem.reset();

      const submitBtn = document.getElementById('btn-submit-landlord');
      if (submitBtn) submitBtn.innerHTML = '+ Register Landlord';

      const cancelBtn = document.getElementById('btn-cancel-landlord-edit');
      if (cancelBtn) cancelBtn.style.display = 'none';

      updateNextLandlordCodeDisplay();
      toggleLandlordEntityFields();
      toggleLandlordRemitFields();
    }

    /* 1. LANDLORD SUBMIT */
    function handleLandlordSubmit(e) {
      e.preventDefault();
      const entityType = document.getElementById('landlord-entity-type').value;
      const name = entityType === 'CORPORATE' 
        ? document.getElementById('landlord-company-name').value
        : `${document.getElementById('landlord-first-name').value} ${document.getElementById('landlord-last-name').value}`.trim();

      const codeElem = document.getElementById('landlord-code');
      const landlordCode = (codeElem && codeElem.value) ? codeElem.value : getNextLandlordCode();
      const postalCode = document.getElementById('landlord-postal-code') ? document.getElementById('landlord-postal-code').value : '';
      const phone = document.getElementById('landlord-phone').value;
      const email = document.getElementById('landlord-email').value;
      const idReg = document.getElementById('landlord-id-reg').value;
      const kraPin = document.getElementById('landlord-kra-pin').value;
      const nokName = document.getElementById('landlord-next-of-kin-name') ? document.getElementById('landlord-next-of-kin-name').value : '';
      const nokPhone = document.getElementById('landlord-next-of-kin-phone') ? document.getElementById('landlord-next-of-kin-phone').value : '';
      const nokRel = document.getElementById('landlord-next-of-kin-relationship') ? document.getElementById('landlord-next-of-kin-relationship').value : '';
      const remitMethod = document.getElementById('landlord-remit-method').value;
      const bank = document.getElementById('landlord-bank-name').value;
      const branch = document.getElementById('landlord-bank-branch').value;
      const accNo = document.getElementById('landlord-bank-acc').value;

      if (editingLandlordId) {
        confirmAction(
          `Are you sure you want to commit updates for Landlord <strong>[${landlordCode}] ${name}</strong> to the live multi-tenant database?`,
          () => {
            const ll = AppState.landlords.find(l => l.id === editingLandlordId);
            if (ll) {
              const oldName = ll.name;
              ll.landlordCode = landlordCode;
              ll.entityType = entityType;
              ll.name = name;
              ll.idReg = idReg;
              ll.kraPin = kraPin;
              ll.postalCode = postalCode;
              ll.phone = phone;
              ll.email = email;
              ll.nextOfKinName = nokName;
              ll.nextOfKinPhone = nokPhone;
              ll.nextOfKinRelationship = nokRel;
              ll.remitMethod = remitMethod;
              ll.bank = bank;
              ll.branch = branch;
              ll.accNo = accNo;

              // Propagate name change to mandates
              AppState.mandates.forEach(m => {
                if (m.landlordName === oldName) m.landlordName = name;
              });
            }
            cancelLandlordEdit();
            renderLandlordsTable();
            populateDropdowns();
            renderLandlordPortfolioTable();
            showToast(`✓ Landlord [${landlordCode}] ${name} updated successfully`);
          },
          'Database Update Confirmation',
          'Commit Landlord Update'
        );
      } else {
        confirmAction(
          `Are you sure you want to register and commit Landlord <strong>[${landlordCode}] ${name}</strong> to the live multi-tenant database?`,
          () => {
            const newLL = {
              id: `LL-${String(AppState.landlords.length + 1).padStart(2, '0')}`,
              landlordCode,
              entityType,
              name,
              idReg,
              kraPin,
              postalCode,
              phone,
              email,
              nextOfKinName: nokName,
              nextOfKinPhone: nokPhone,
              nextOfKinRelationship: nokRel,
              remitMethod,
              bank,
              branch,
              accNo,
              isActive: true
            };

            AppState.landlords.push(newLL);
            renderLandlordsTable();
            populateDropdowns();
            e.target.reset();
            updateNextLandlordCodeDisplay();
            showToast(`✓ Landlord [${landlordCode}] ${name} registered successfully`);
          },
          'Database Insert Confirmation',
          'Register Landlord'
        );
      }
    }

    function renderLandlordsTable() {
      const tbody = document.getElementById('table-landlords-body');
      if (!tbody) return;
      tbody.innerHTML = AppState.landlords.map(ll => {
        const nokHtml = ll.nextOfKinName 
          ? `<div style="font-size: 0.75rem;"><strong>${ll.nextOfKinName}</strong><br><span style="color:var(--text-muted);">${ll.nextOfKinPhone || ''} ${ll.nextOfKinRelationship ? `(${ll.nextOfKinRelationship})` : ''}</span></div>` 
          : '<span style="color:var(--text-muted);">—</span>';

        const statusBadge = ll.isActive !== false
          ? '<span class="badge-status" style="color: var(--accent-secondary); font-weight: 700;">● ACTIVE</span>'
          : '<span class="badge-status" style="color: #DC2626; background: rgba(239, 68, 68, 0.12); font-weight: 700;">○ DEACTIVATED</span>';

        const editBtn = `<button type="button" class="btn-action-pill" style="color: var(--accent-primary); border-color: var(--accent-primary);" onclick="editLandlord('${ll.id}')">Edit</button>`;

        const actionBtn = ll.isActive !== false
          ? `<button type="button" class="btn-action-pill" style="color: #DC2626; border-color: rgba(239, 68, 68, 0.4);" onclick="openDeactivationWarningModal('${ll.id}')">Deactivate</button>`
          : `<button type="button" class="btn-action-pill" style="color: var(--accent-secondary); border-color: rgba(16, 185, 129, 0.4);" onclick="reactivateLandlord('${ll.id}')">Reactivate</button>`;

        return `
          <tr>
            <td><span class="badge-status" style="font-weight: 800; background: var(--accent-primary); color: #FFFFFF;">${ll.landlordCode || ll.id}</span></td>
            <td><span class="badge-status">${ll.entityType}</span></td>
            <td><strong>${ll.name}</strong></td>
            <td><code>${ll.idReg}</code></td>
            <td><code>${ll.kraPin}</code></td>
            <td><small>${ll.postalCode || '—'}</small></td>
            <td>${ll.phone}</td>
            <td>${nokHtml}</td>
            <td>${ll.remitMethod === 'BANK' ? `${ll.bank} (${ll.accNo})` : 'M-Pesa B2C'}</td>
            <td>${statusBadge}</td>
            <td><div style="display: flex; gap: 6px;">${editBtn} ${actionBtn}</div></td>
          </tr>
        `;
      }).join('');
    }

    /* DATABASE EXECUTION WARNING & CASCADING SOFT-DELETES */
    let pendingDeactivateLandlordId = null;

    function openDeactivationWarningModal(landlordId) {
      const ll = AppState.landlords.find(l => l.id === landlordId);
      if (!ll) return;
      pendingDeactivateLandlordId = landlordId;

      const titleElem = document.getElementById('warn-landlord-title');
      if (titleElem) {
        titleElem.textContent = `[${ll.landlordCode || ll.id}] - ${ll.name}`;
      }

      // Identify linked properties
      const linkedProps = AppState.properties.filter(p => 
        p.landlordId === landlordId || 
        AppState.mandates.some(m => m.landlordName === ll.name && m.propertyName === p.name)
      );

      const listContainer = document.getElementById('warn-linked-properties-list');
      if (listContainer) {
        if (linkedProps.length === 0) {
          listContainer.innerHTML = `<span style="color: var(--text-muted); font-style: italic; font-size: 0.8rem;">No properties currently linked to this landlord.</span>`;
        } else {
          listContainer.innerHTML = linkedProps.map(p => `
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 6px 0; border-bottom: 1px dashed var(--divider-color);">
              <div>
                <strong>${p.name}</strong> 
                <span style="font-size: 0.75rem; color: var(--text-muted); margin-left: 6px;">(${p.lr || p.prefix})</span>
              </div>
              <span class="badge-status" style="color: #DC2626; background: rgba(239, 68, 68, 0.12); font-size: 0.72rem; font-weight: 700;">CASCADE TO INACTIVE</span>
            </div>
          `).join('');
        }
      }

      const modal = document.getElementById('modal-landlord-deactivate-warning');
      if (modal) modal.classList.add('active');
    }

    function closeDeactivationWarningModal() {
      pendingDeactivateLandlordId = null;
      const modal = document.getElementById('modal-landlord-deactivate-warning');
      if (modal) modal.classList.remove('active');
    }

    function confirmExecuteLandlordDeactivation() {
      if (!pendingDeactivateLandlordId) return;
      const ll = AppState.landlords.find(l => l.id === pendingDeactivateLandlordId);
      if (!ll) return;

      // Soft delete landlord
      ll.isActive = false;

      // Cascade soft delete to all linked properties
      let affectedPropsCount = 0;
      AppState.properties.forEach(p => {
        const isDirectLink = p.landlordId === ll.id;
        const isMandateLink = AppState.mandates.some(m => m.landlordName === ll.name && m.propertyName === p.name);
        if (isDirectLink || isMandateLink) {
          p.isActive = false;
          affectedPropsCount++;
        }
      });

      renderLandlordsTable();
      renderPropertiesTable();
      renderLandlordPortfolioTable();

      closeDeactivationWarningModal();
      showToast(`⚠️ Database trigger executed: [${ll.landlordCode || ll.id}] deactivated & ${affectedPropsCount} linked properties set to is_active=false.`);
    }

    function reactivateLandlord(landlordId) {
      const ll = AppState.landlords.find(l => l.id === landlordId);
      if (!ll) return;

      ll.isActive = true;
      let reactivatedPropsCount = 0;
      AppState.properties.forEach(p => {
        const isDirectLink = p.landlordId === ll.id;
        const isMandateLink = AppState.mandates.some(m => m.landlordName === ll.name && m.propertyName === p.name);
        if (isDirectLink || isMandateLink) {
          p.isActive = true;
          reactivatedPropsCount++;
        }
      });

      renderLandlordsTable();
      renderPropertiesTable();
      renderLandlordPortfolioTable();

      showToast(`✓ Landlord [${ll.landlordCode || ll.id}] and ${reactivatedPropsCount} linked properties reactivated.`);
    }

    /* 2. TENANT SUBMIT */
    function handleTenantSubmit(e) {
      e.preventDefault();
      const first = document.getElementById('tenant-first-name').value;
      const mid = document.getElementById('tenant-middle-name').value;
      const surname = document.getElementById('tenant-surname').value;
      const name = `${first} ${mid ? mid + ' ' : ''}${surname}`.trim();
      const idPassport = document.getElementById('tenant-id-passport').value;
      const phone = document.getElementById('tenant-phone-primary').value;
      const kraPin = document.getElementById('tenant-kra-pin').value || 'N/A';
      const emergency = `${document.getElementById('tenant-emergency-name').value} (${document.getElementById('tenant-emergency-phone').value})`;
      const workplace = document.getElementById('tenant-workplace').value || 'Unspecified';

      confirmAction(
        `Are you sure you want to register and commit Tenant <strong>${name}</strong> (ID: <code>${idPassport}</code>, Phone: <code>${phone}</code>) to the live multi-tenant database?`,
        () => {
          const newTenant = {
            id: `TEN-${String(AppState.tenants.length + 1).padStart(2, '0')}`,
            name,
            idPassport,
            phone,
            kraPin,
            emergency,
            workplace
          };

          AppState.tenants.push(newTenant);
          renderTenantsTable();
          populateTenantDropdowns();
          e.target.reset();
          showToast(`✓ Tenant ${name} registered successfully`);
        },
        'Database Insert Confirmation',
        'Register Tenant'
      );
    }

    function renderTenantsTable() {
      const tbody = document.getElementById('table-tenants-body');
      if (!tbody) return;
      tbody.innerHTML = AppState.tenants.map(t => `
        <tr>
          <td><strong>${t.name}</strong></td>
          <td><code>${t.idPassport}</code></td>
          <td><strong>${t.phone}</strong></td>
          <td><code>${t.kraPin}</code></td>
          <td>${t.emergency}</td>
          <td><small>${t.workplace}</small></td>
        </tr>
      `).join('');
    }

    /* 3. PROPERTY SUBMIT & BUILDERS */
    let builderUnitRows = [
      { code: 'A-01', floor: 'Ground', config: '2_BEDROOM', rent: 32000, sc: 3500, meter: 'WM-001' },
      { code: 'A-02', floor: 'Ground', config: '2_BEDROOM', rent: 32000, sc: 3500, meter: 'WM-002' }
    ];

    let builderPayableRows = [
      { name: 'KPLC Common Area Power', cat: 'UTILITIES', acc: 'KPLC-8491029', amount: 8500, freq: 'MONTHLY', alloc: 'SERVICE_CHARGE_POOL' },
      { name: 'NCWSC Bulk Water Inflow', cat: 'UTILITIES', acc: 'NCWSC-09281', amount: 14000, freq: 'MONTHLY', alloc: 'SERVICE_CHARGE_POOL' },
      { name: 'County Government Land Rates', cat: 'TAX_RATES', acc: 'KMB-LR-8491', amount: 45000, freq: 'ANNUAL', alloc: 'LANDLORD_DEDUCTIBLE' }
    ];

    function renderBuilderUnits() {
      const tbody = document.getElementById('builder-units-body');
      if (!tbody) return;
      tbody.innerHTML = builderUnitRows.map((r, i) => `
        <tr>
          <td><input type="text" class="builder-input" value="${r.code}" onchange="builderUnitRows[${i}].code=this.value"></td>
          <td><input type="text" class="builder-input" value="${r.floor}" onchange="builderUnitRows[${i}].floor=this.value"></td>
          <td>
            <select class="builder-input" onchange="builderUnitRows[${i}].config=this.value">
              <option value="1_BEDROOM" ${r.config==='1_BEDROOM'?'selected':''}>1 Bedroom</option>
              <option value="2_BEDROOM" ${r.config==='2_BEDROOM'?'selected':''}>2 Bedroom</option>
              <option value="3_BEDROOM" ${r.config==='3_BEDROOM'?'selected':''}>3 Bedroom</option>
              <option value="BEDSITTER" ${r.config==='BEDSITTER'?'selected':''}>Bedsitter / Studio</option>
              <option value="COMMERCIAL_OFFICE" ${r.config==='COMMERCIAL_OFFICE'?'selected':''}>Commercial Office</option>
            </select>
          </td>
          <td><input type="number" class="builder-input" value="${r.rent}" onchange="builderUnitRows[${i}].rent=Number(this.value)"></td>
          <td><input type="number" class="builder-input" value="${r.sc}" onchange="builderUnitRows[${i}].sc=Number(this.value)"></td>
          <td><input type="text" class="builder-input" value="${r.meter}" onchange="builderUnitRows[${i}].meter=this.value"></td>
          <td><button type="button" class="btn-action-pill" onclick="removeUnitBuilderRow(${i})">✕</button></td>
        </tr>
      `).join('');
    }

    function addUnitBuilderRow() {
      builderUnitRows.push({ code: `Unit-${builderUnitRows.length + 1}`, floor: '1st', config: '2_BEDROOM', rent: 30000, sc: 3500, meter: `WM-${builderUnitRows.length + 1}` });
      renderBuilderUnits();
    }

    function removeUnitBuilderRow(idx) {
      builderUnitRows.splice(idx, 1);
      renderBuilderUnits();
    }

    function renderBuilderPayables() {
      const tbody = document.getElementById('builder-payables-body');
      if (!tbody) return;
      tbody.innerHTML = builderPayableRows.map((r, i) => `
        <tr>
          <td><input type="text" class="builder-input" value="${r.name}" onchange="builderPayableRows[${i}].name=this.value"></td>
          <td>
            <select class="builder-input" onchange="builderPayableRows[${i}].cat=this.value">
              <option value="UTILITIES" ${r.cat==='UTILITIES'?'selected':''}>Utilities</option>
              <option value="TAX_RATES" ${r.cat==='TAX_RATES'?'selected':''}>Tax & Land Rates</option>
              <option value="SECURITY" ${r.cat==='SECURITY'?'selected':''}>Security</option>
              <option value="INSURANCE" ${r.cat==='INSURANCE'?'selected':''}>Insurance</option>
            </select>
          </td>
          <td><input type="text" class="builder-input" value="${r.acc}" onchange="builderPayableRows[${i}].acc=this.value"></td>
          <td><input type="number" class="builder-input" value="${r.amount}" onchange="builderPayableRows[${i}].amount=Number(this.value)"></td>
          <td>
            <select class="builder-input" onchange="builderPayableRows[${i}].freq=this.value">
              <option value="MONTHLY" ${r.freq==='MONTHLY'?'selected':''}>Monthly</option>
              <option value="QUARTERLY" ${r.freq==='QUARTERLY'?'selected':''}>Quarterly</option>
              <option value="ANNUAL" ${r.freq==='ANNUAL'?'selected':''}>Annual</option>
            </select>
          </td>
          <td>
            <select class="builder-input" onchange="builderPayableRows[${i}].alloc=this.value">
              <option value="SERVICE_CHARGE_POOL" ${r.alloc==='SERVICE_CHARGE_POOL'?'selected':''}>Service Charge Pool</option>
              <option value="LANDLORD_DEDUCTIBLE" ${r.alloc==='LANDLORD_DEDUCTIBLE'?'selected':''}>Landlord Deductible</option>
            </select>
          </td>
          <td><button type="button" class="btn-action-pill" onclick="removePayableBuilderRow(${i})">✕</button></td>
        </tr>
      `).join('');
    }

    function addPayableBuilderRow() {
      builderPayableRows.push({ name: 'Private Security Manned Guarding', cat: 'SECURITY', acc: 'SEC-8910', amount: 35000, freq: 'MONTHLY', alloc: 'SERVICE_CHARGE_POOL' });
      renderBuilderPayables();
    }

    function removePayableBuilderRow(idx) {
      builderPayableRows.splice(idx, 1);
      renderBuilderPayables();
    }

    /* PROPERTY EDIT MODE */
    let editingPropertyId = null;

    function editProperty(propId) {
      const prop = AppState.properties.find(p => p.id === propId);
      if (!prop) return;

      editingPropertyId = propId;

      // Switch to Properties tab
      const propTabBtn = document.querySelector('[data-reg-target="properties"]');
      if (propTabBtn) propTabBtn.click();

      // Populate form fields
      const codeElem = document.getElementById('prop-code');
      if (codeElem) codeElem.value = prop.propertyIdCode || prop.id;
      const badgeElem = document.getElementById('prop-code-badge');
      if (badgeElem) badgeElem.textContent = `ID: ${prop.propertyIdCode || prop.id} (EDIT)`;

      const nameElem = document.getElementById('prop-name');
      if (nameElem) nameElem.value = prop.name || '';

      const lrElem = document.getElementById('prop-lr');
      if (lrElem) lrElem.value = prop.lr || '';

      const branchElem = document.getElementById('prop-branch');
      if (branchElem && prop.officeBranch) branchElem.value = prop.officeBranch;

      const typeElem = document.getElementById('prop-type');
      if (typeElem && prop.type) typeElem.value = prop.type;

      const countyElem = document.getElementById('prop-county');
      if (countyElem && prop.county) countyElem.value = prop.county;

      const subCountyElem = document.getElementById('prop-subcounty');
      if (subCountyElem) subCountyElem.value = prop.subCounty || '';

      const prefixElem = document.getElementById('prop-paybill-prefix');
      if (prefixElem) prefixElem.value = prop.prefix || '';

      const sqftElem = document.getElementById('prop-total-sqft');
      if (sqftElem) sqftElem.value = prop.totalSqFt || '';

      const unitsElem = document.getElementById('prop-no-of-units');
      if (unitsElem) unitsElem.value = prop.noOfUnits !== undefined ? prop.noOfUnits : (prop.unitsCount || '');

      const remitElem = document.getElementById('prop-remittance-type');
      if (remitElem && prop.remittanceType) remitElem.value = prop.remittanceType;

      const modeElem = document.getElementById('prop-mode-of-billing');
      if (modeElem && prop.modeOfBilling) modeElem.value = prop.modeOfBilling;

      const contractElem = document.getElementById('prop-contract-date');
      if (contractElem && prop.contractDate) contractElem.value = prop.contractDate;

      const paymentElem = document.getElementById('prop-payment-date');
      if (paymentElem && prop.paymentDate) paymentElem.value = prop.paymentDate;

      const officerElem = document.getElementById('prop-officer');
      if (officerElem && prop.propertyOfficer) officerElem.value = prop.propertyOfficer;

      const parkSpacesElem = document.getElementById('prop-parking-spaces');
      if (parkSpacesElem) parkSpacesElem.value = prop.parkingSpaces !== undefined ? prop.parkingSpaces : '';

      const priceParkElem = document.getElementById('prop-price-per-parking');
      if (priceParkElem) priceParkElem.value = prop.pricePerParking !== undefined ? prop.pricePerParking : '';

      const ctNameElem = document.getElementById('prop-caretaker-name');
      if (ctNameElem) ctNameElem.value = prop.caretakerName || (prop.caretaker ? prop.caretaker.split(' (')[0] : '');

      const ctPhoneElem = document.getElementById('prop-caretaker-phone');
      if (ctPhoneElem) ctPhoneElem.value = prop.caretakerPhone || (prop.caretaker && prop.caretaker.includes('(') ? prop.caretaker.split('(')[1].replace(')', '') : '');

      const bankNameElem = document.getElementById('prop-bank-name');
      if (bankNameElem && prop.bankName) bankNameElem.value = prop.bankName;

      const bankBranchElem = document.getElementById('prop-bank-branch');
      if (bankBranchElem) bankBranchElem.value = prop.bankBranch || '';

      const bankAccElem = document.getElementById('prop-bank-account-no');
      if (bankAccElem) bankAccElem.value = prop.bankAccountNo || '';

      const bankAccNameElem = document.getElementById('prop-bank-account-name');
      if (bankAccNameElem) bankAccNameElem.value = prop.bankAccountName || '';

      const payableToLlElem = document.getElementById('prop-payable-to-ll');
      if (payableToLlElem) payableToLlElem.checked = !!prop.payableToLlAccount;

      // Switch button state
      const submitBtn = document.getElementById('btn-submit-property');
      if (submitBtn) submitBtn.innerHTML = '💾 Update Property Attributes';

      const cancelBtn = document.getElementById('btn-cancel-prop-edit');
      if (cancelBtn) cancelBtn.style.display = 'inline-flex';

      const formElem = document.getElementById('form-property');
      if (formElem) formElem.scrollIntoView({ behavior: 'smooth' });

      showToast(`Loaded Property [${prop.propertyIdCode || prop.id}] into editor`);
    }

    function cancelPropertyEdit() {
      editingPropertyId = null;
      const formElem = document.getElementById('form-property');
      if (formElem) formElem.reset();

      const submitBtn = document.getElementById('btn-submit-property');
      if (submitBtn) submitBtn.innerHTML = '+ Complete Property Onboarding';

      const cancelBtn = document.getElementById('btn-cancel-prop-edit');
      if (cancelBtn) cancelBtn.style.display = 'none';

      updateNextPropertyCodeDisplay();
    }

    function handlePropertySubmit(e) {
      e.preventDefault();
      const propCodeElem = document.getElementById('prop-code');
      const propertyIdCode = (propCodeElem && propCodeElem.value) ? propCodeElem.value : getNextPropertyCode();
      const name = document.getElementById('prop-name').value;
      const lr = document.getElementById('prop-lr').value;
      const officeBranch = document.getElementById('prop-branch').value;
      const type = document.getElementById('prop-type').value;
      const county = document.getElementById('prop-county').value;
      const subCounty = document.getElementById('prop-subcounty').value;
      const prefix = document.getElementById('prop-paybill-prefix').value;
      const totalSqFt = parseFloat(document.getElementById('prop-total-sqft').value) || 0;
      const noOfUnits = parseInt(document.getElementById('prop-no-of-units').value, 10) || builderUnitRows.length;
      const remittanceType = document.getElementById('prop-remittance-type').value;
      const modeOfBilling = document.getElementById('prop-mode-of-billing').value;
      const contractDate = document.getElementById('prop-contract-date').value;
      const paymentDate = document.getElementById('prop-payment-date').value;
      const propertyOfficer = document.getElementById('prop-officer').value;
      const parkingSpaces = parseInt(document.getElementById('prop-parking-spaces').value, 10) || 0;
      const pricePerParking = parseFloat(document.getElementById('prop-price-per-parking').value) || 0;
      const caretakerName = document.getElementById('prop-caretaker-name').value;
      const caretakerPhone = document.getElementById('prop-caretaker-phone').value;
      const caretaker = `${caretakerName} (${caretakerPhone})`;
      const bankName = document.getElementById('prop-bank-name').value;
      const bankBranch = document.getElementById('prop-bank-branch').value;
      const bankAccountNo = document.getElementById('prop-bank-account-no').value;
      const bankAccountName = document.getElementById('prop-bank-account-name').value;
      const payableToLlAccount = document.getElementById('prop-payable-to-ll').checked;

      if (editingPropertyId) {
        confirmAction(
          `Are you sure you want to commit updates for Property <strong>[${propertyIdCode}] ${name}</strong> to the live multi-tenant database?`,
          () => {
            const prop = AppState.properties.find(p => p.id === editingPropertyId);
            if (prop) {
              const oldName = prop.name;
              prop.propertyIdCode = propertyIdCode;
              prop.name = name;
              prop.lr = lr;
              prop.officeBranch = officeBranch;
              prop.type = type;
              prop.county = county;
              prop.subCounty = subCounty;
              prop.prefix = prefix;
              prop.totalSqFt = totalSqFt;
              prop.noOfUnits = noOfUnits;
              prop.remittanceType = remittanceType;
              prop.modeOfBilling = modeOfBilling;
              prop.contractDate = contractDate;
              prop.paymentDate = paymentDate;
              prop.propertyOfficer = propertyOfficer;
              prop.parkingSpaces = parkingSpaces;
              prop.pricePerParking = pricePerParking;
              prop.caretaker = caretaker;
              prop.caretakerName = caretakerName;
              prop.caretakerPhone = caretakerPhone;
              prop.bankName = bankName;
              prop.bankBranch = bankBranch;
              prop.bankAccountNo = bankAccountNo;
              prop.bankAccountName = bankAccountName;
              prop.payableToLlAccount = payableToLlAccount;

              // Propagate name change to units and mandates
              AppState.units.forEach(u => {
                if (u.propertyId === prop.id) u.propertyName = name;
              });
              AppState.mandates.forEach(m => {
                if (m.propertyId === prop.id) m.propertyName = name;
              });
            }
            cancelPropertyEdit();
            renderPropertiesTable();
            populateDropdowns();
            renderLandlordPortfolioTable();
            showToast(`✓ Property [${propertyIdCode}] ${name} updated successfully`);
          },
          'Database Update Confirmation',
          'Commit Property Update'
        );
      } else {
        confirmAction(
          `Are you sure you want to onboard Property <strong>[${propertyIdCode}] ${name}</strong> with ${builderUnitRows.length} units and ${builderPayableRows.length} payables to the live multi-tenant database?`,
          () => {
            const propId = `PROP-${String(AppState.properties.length + 1).padStart(2, '0')}`;
            const newProp = {
              id: propId,
              propertyIdCode,
              name,
              lr,
              officeBranch,
              type,
              county,
              subCounty,
              prefix,
              totalSqFt,
              noOfUnits,
              remittanceType,
              modeOfBilling,
              contractDate,
              paymentDate,
              propertyOfficer,
              parkingSpaces,
              pricePerParking,
              caretaker,
              caretakerName,
              caretakerPhone,
              bankName,
              bankBranch,
              bankAccountNo,
              bankAccountName,
              payableToLlAccount,
              unitsCount: builderUnitRows.length > 0 ? builderUnitRows.length : noOfUnits,
              payablesCount: builderPayableRows.length,
              isActive: true
            };

            AppState.properties.push(newProp);

            // Add built units to unit inventory (or auto-generate placeholder units matching database trigger)
            if (builderUnitRows.length === 0 && noOfUnits > 0) {
              for (let i = 1; i <= noOfUnits; i++) {
                AppState.units.push({
                  id: `UNIT-${AppState.units.length + 1}`,
                  propertyId: propId,
                  propertyName: name,
                  code: `${prefix ? prefix + '-' : ''}${String(i).padStart(2, '0')}`,
                  floor: 'Ground',
                  config: '2_BEDROOM',
                  plinth: totalSqFt && noOfUnits ? Math.round(totalSqFt / noOfUnits) : 80.0,
                  rent: 0,
                  sc: 0,
                  meter: `WM-${i}`,
                  status: 'VACANT'
                });
              }
            } else {
              builderUnitRows.forEach((bu, idx) => {
                AppState.units.push({
                  id: `UNIT-${AppState.units.length + 1}`,
                  propertyId: propId,
                  propertyName: name,
                  code: bu.code,
                  floor: bu.floor,
                  config: bu.config,
                  plinth: 80.0,
                  rent: bu.rent,
                  sc: bu.sc,
                  meter: bu.meter,
                  status: 'VACANT'
                });
              });
            }

            renderPropertiesTable();
            renderUnitsTable();
            populateDropdowns();
            e.target.reset();
            updateNextPropertyCodeDisplay();
            showToast(`✓ Property "${name}" onboarded with ${newProp.unitsCount} units and ${newProp.payablesCount} payables`);
          },
          'Database Insert Confirmation',
          'Onboard Property'
        );
      }
    }

    function renderPropertiesTable() {
      const tbody = document.getElementById('table-properties-body');
      if (!tbody) return;
      tbody.innerHTML = AppState.properties.map(p => `
        <tr>
          <td><span class="badge-status" style="font-weight: 800; background: var(--accent-primary); color: #FFFFFF;">${p.propertyIdCode || p.id}</span></td>
          <td><strong>${p.name}</strong><br><small style="color:var(--text-muted);">${p.subCounty || ''}, ${p.county || ''}</small></td>
          <td><code>${p.lr}</code><br><small style="color:var(--text-muted);">Prefix: <strong>${p.prefix}</strong></small></td>
          <td><span class="badge-status">${p.type}</span><br><small>${p.officeBranch || 'Thika Branch'}</small></td>
          <td><strong>${p.unitsCount || p.noOfUnits || 0} Units</strong><br><small style="color:var(--text-muted);">${p.totalSqFt ? Number(p.totalSqFt).toLocaleString() + ' sq ft' : '—'}</small></td>
          <td><span class="badge-status" style="color: ${p.remittanceType === 'Expected' ? 'var(--accent-amber)' : 'var(--accent-secondary)'}; font-weight:700;">${p.remittanceType || 'Collected'}</span><br><small style="color:var(--text-muted);">${p.paymentDate || '5th monthly'}</small></td>
          <td><small><strong>${p.modeOfBilling || 'Monthly in Advance'}</strong><br>${p.bankName ? `${p.bankName} (${p.bankAccountNo || ''})` : ''}</small></td>
          <td><strong>${p.propertyOfficer || 'Eng. Dennis Mugo'}</strong><br><small style="color:var(--text-muted);">Caretaker: ${p.caretakerName || (p.caretaker ? p.caretaker.split(' (')[0] : '—')}</small></td>
          <td>
            ${p.isActive !== false 
              ? '<span class="badge-status" style="color: var(--accent-secondary); font-weight: 700;">● ACTIVE</span>' 
              : '<span class="badge-status" style="color: #DC2626; background: rgba(239, 68, 68, 0.12); font-weight: 700;">○ DEACTIVATED</span>'}
          </td>
          <td>
            <div style="display: flex; gap: 6px;">
              <button type="button" class="btn-action-pill" style="color: var(--accent-primary); border-color: var(--accent-primary);" onclick="editProperty('${p.id}')">Edit</button>
              <button type="button" class="btn-action-pill" style="color: #008080; border-color: #008080; font-weight: 700;" onclick="openPropertyPayables('${p.id}')">⚙️ Payables</button>
              <button type="button" class="btn-action-pill" style="color: #EA580C; border-color: #EA580C; font-weight: 700;" onclick="openBulkUnitEditor('${p.id}')">⚡ Unit Details Bulk</button>
            </div>
          </td>
        </tr>
      `).join('');
    }

    function renderUnitsTable() {
      // Standalone units table removed; retained as safe no-op for backward compatibility
      const tbody = document.getElementById('table-units-body');
      if (!tbody) return;
    }


    /* 5. TENANT DETAILS & PROPERTY ASSIGNMENT (PROMATRIX LEGACY ONBOARDING) */
    function getNextTenantCode() {
      const nums = AppState.tenants
        .map(t => t.tenantCode || t.id || '')
        .filter(c => /^T\d+$/i.test(c))
        .map(c => parseInt(c.replace(/^T/i, ''), 10))
        .filter(n => !isNaN(n));
      const nextNum = nums.length > 0 ? Math.max(...nums) + 1 : (AppState.tenants.length + 1);
      return 'T' + String(nextNum).padStart(3, '0');
    }

    function initTenantAssignTab() {
      populateTenantAssignDropdowns();
      const codeInput = document.getElementById('tenant-assign-code');
      if (codeInput && (!codeInput.value || codeInput.value === 'T001')) {
        codeInput.value = getNextTenantCode();
      }
      const dateInInput = document.getElementById('tenant-assign-datein');
      if (dateInInput && !dateInInput.value) {
        dateInInput.value = new Date().toISOString().split('T')[0];
      }
      renderTenantAssignmentsTable();
    }

    function populateTenantAssignDropdowns() {
      // 1. Populate Tenant Selector
      const tSelect = document.getElementById('tenant-assign-select');
      if (tSelect) {
        const currentVal = tSelect.value || 'NEW';
        tSelect.innerHTML = `<option value="NEW">-Select Tenant / New Tenant-</option>` +
          AppState.tenants.map(t => `<option value="${t.id}">${t.tenantCode || t.id} - ${t.name}</option>`).join('');
        tSelect.value = currentVal;
      }

      // 2. Populate Property Selector
      const pSelect = document.getElementById('tenant-assign-property');
      if (pSelect) {
        const currentProp = pSelect.value;
        pSelect.innerHTML = `<option value="">-Select Property-</option>` +
          AppState.properties.map(p => `<option value="${p.id}">${p.propertyIdCode || p.id} - ${p.name}</option>`).join('');
        if (currentProp) pSelect.value = currentProp;
      }
    }

    function handleTenantAssignPropertyChange(propId) {
      const uSelect = document.getElementById('tenant-assign-unit');
      if (!uSelect) return;

      if (!propId) {
        uSelect.innerHTML = `<option value="">-Select Unit-</option>`;
        return;
      }

      const matchingUnits = AppState.units.filter(u => u.propertyId === propId);
      uSelect.innerHTML = `<option value="">-Select Unit-</option>` +
        matchingUnits.map(u => `<option value="${u.id}">${u.code} (${u.status} - KES ${Number(u.rent || 0).toLocaleString()}/mo)</option>`).join('');
    }

    function handleTenantAssignSelect(tenantId) {
      const form = document.getElementById('form-tenant-assignment');
      if (!form) return;

      if (!tenantId || tenantId === 'NEW') {
        clearTenantAssignForm(false);
        return;
      }

      const tenant = AppState.tenants.find(t => t.id === tenantId);
      if (!tenant) return;

      // Populate personal & contact details
      const codeInput = document.getElementById('tenant-assign-code');
      if (codeInput) codeInput.value = tenant.tenantCode || tenant.id;

      const nameInput = document.getElementById('tenant-assign-name');
      if (nameInput) nameInput.value = tenant.name || '';

      const idInput = document.getElementById('tenant-assign-idno');
      if (idInput) idInput.value = tenant.idPassport || tenant.idNumber || '';

      const telInput = document.getElementById('tenant-assign-tel');
      if (telInput) telInput.value = tenant.phone || tenant.telNo || '';

      const emailInput = document.getElementById('tenant-assign-email');
      if (emailInput) emailInput.value = tenant.email || '';

      const addrInput = document.getElementById('tenant-assign-address');
      if (addrInput) addrInput.value = tenant.address || '';

      const postalInput = document.getElementById('tenant-assign-postal');
      if (postalInput) postalInput.value = tenant.postalCode || '';

      const workInput = document.getElementById('tenant-assign-workplace');
      if (workInput) workInput.value = tenant.workplace || '';

      const workContactsInput = document.getElementById('tenant-assign-workcontacts');
      if (workContactsInput) workContactsInput.value = tenant.workContacts || '';

      const kinInput = document.getElementById('tenant-assign-kin');
      if (kinInput) kinInput.value = tenant.emergencyContactName || (tenant.emergency ? tenant.emergency.split(' (')[0] : '');

      const kinContactsInput = document.getElementById('tenant-assign-kin-contacts');
      if (kinContactsInput) {
        const phone = tenant.emergencyContactPhone || (tenant.emergency && tenant.emergency.includes('(') ? tenant.emergency.split('(')[1].replace(')', '') : '');
        kinContactsInput.value = phone;
      }

      const relInput = document.getElementById('tenant-assign-rel');
      if (relInput) relInput.value = tenant.emergencyRelationship || '';

      const statusInput = document.getElementById('tenant-assign-status');
      if (statusInput) statusInput.checked = tenant.isActive !== false;

      // Find if tenant has an active lease
      const activeLease = AppState.leases.find(l => l.tenantId === tenant.id && l.status === 'Active');
      if (activeLease) {
        const unit = AppState.units.find(u => u.id === activeLease.unitId);
        if (unit) {
          const pSelect = document.getElementById('tenant-assign-property');
          if (pSelect) {
            pSelect.value = unit.propertyId;
            handleTenantAssignPropertyChange(unit.propertyId);
          }
          const uSelect = document.getElementById('tenant-assign-unit');
          if (uSelect) uSelect.value = unit.id;
        }
        const dateInput = document.getElementById('tenant-assign-datein');
        if (dateInput) dateInput.value = activeLease.startDate;
      } else {
        const dateInput = document.getElementById('tenant-assign-datein');
        if (dateInput) dateInput.value = new Date().toISOString().split('T')[0];
      }

      showToast(`Loaded Tenant [${tenant.tenantCode || tenant.id}] ${tenant.name}`);
    }

    function clearTenantAssignForm(promptConfirm = true) {
      const resetAction = () => {
        const form = document.getElementById('form-tenant-assignment');
        if (form) form.reset();

        const tSelect = document.getElementById('tenant-assign-select');
        if (tSelect) tSelect.value = 'NEW';

        const pSelect = document.getElementById('tenant-assign-property');
        if (pSelect) pSelect.value = '';

        const uSelect = document.getElementById('tenant-assign-unit');
        if (uSelect) uSelect.innerHTML = `<option value="">-Select Unit-</option>`;

        const codeInput = document.getElementById('tenant-assign-code');
        if (codeInput) codeInput.value = getNextTenantCode();

        const dateInput = document.getElementById('tenant-assign-datein');
        if (dateInput) dateInput.value = new Date().toISOString().split('T')[0];

        const statusInput = document.getElementById('tenant-assign-status');
        if (statusInput) statusInput.checked = true;

        showToast('Tenant Details form cleared for new onboarding.');
      };

      if (promptConfirm) {
        confirmAction(
          'Are you sure you want to clear the Tenant Details form fields?',
          resetAction,
          'Clear Form Confirmation',
          'Clear Form'
        );
      } else {
        resetAction();
      }
    }

    function handleTenantAssignSubmit(e) {
      e.preventDefault();

      const tenantSel = document.getElementById('tenant-assign-select').value;
      const propId = document.getElementById('tenant-assign-property').value;
      const unitId = document.getElementById('tenant-assign-unit').value;
      const code = document.getElementById('tenant-assign-code').value.trim() || getNextTenantCode();
      const name = document.getElementById('tenant-assign-name').value.trim();
      const idno = document.getElementById('tenant-assign-idno').value.trim();
      const dateIn = document.getElementById('tenant-assign-datein').value;
      const tel = document.getElementById('tenant-assign-tel').value.trim();
      const email = document.getElementById('tenant-assign-email').value.trim();
      const address = document.getElementById('tenant-assign-address').value.trim();
      const postal = document.getElementById('tenant-assign-postal').value;
      const workplace = document.getElementById('tenant-assign-workplace').value.trim();
      const workcontacts = document.getElementById('tenant-assign-workcontacts').value.trim();
      const kin = document.getElementById('tenant-assign-kin').value.trim();
      const kincontacts = document.getElementById('tenant-assign-kin-contacts').value.trim();
      const rel = document.getElementById('tenant-assign-rel').value;
      const status = document.getElementById('tenant-assign-status').checked;

      if (!propId || !unitId || !name || !dateIn) {
        showToast('Please select Property, Unit, enter Tenant Name and Date In.');
        return;
      }

      const prop = AppState.properties.find(p => p.id === propId);
      const unit = AppState.units.find(u => u.id === unitId);
      const isNew = (!tenantSel || tenantSel === 'NEW');

      confirmAction(
        `Are you sure you want to ${isNew ? 'register New Tenant <strong>[' + code + '] ' + name + '</strong> and bind active lease' : 'update Tenant <strong>' + name + '</strong> and bind lease'} to Unit <strong>${unit ? unit.code : ''}</strong> at <strong>${prop ? prop.name : ''}</strong> effective <strong>${dateIn}</strong>?`,
        () => {
          let tenantId = tenantSel;

          if (isNew) {
            tenantId = `TEN-${String(AppState.tenants.length + 1).padStart(2, '0')}`;
            const newTenant = {
              id: tenantId,
              tenantCode: code,
              name: name,
              idPassport: idno,
              idNumber: idno,
              phone: tel,
              telNo: tel,
              email: email,
              address: address,
              postalCode: postal,
              kraPin: 'P0' + Math.floor(10000000 + Math.random() * 90000000) + 'K',
              workplace: workplace,
              workContacts: workcontacts,
              emergency: `${kin} (${kincontacts})`,
              emergencyContactName: kin,
              emergencyContactPhone: kincontacts,
              emergencyRelationship: rel,
              isActive: status
            };
            AppState.tenants.push(newTenant);
          } else {
            const existingTenant = AppState.tenants.find(t => t.id === tenantSel);
            if (existingTenant) {
              existingTenant.tenantCode = code || existingTenant.tenantCode;
              existingTenant.name = name;
              existingTenant.idPassport = idno;
              existingTenant.idNumber = idno;
              existingTenant.phone = tel;
              existingTenant.telNo = tel;
              existingTenant.email = email;
              existingTenant.address = address;
              existingTenant.postalCode = postal;
              existingTenant.workplace = workplace;
              existingTenant.workContacts = workcontacts;
              existingTenant.emergency = `${kin} (${kincontacts})`;
              existingTenant.emergencyContactName = kin;
              existingTenant.emergencyContactPhone = kincontacts;
              existingTenant.emergencyRelationship = rel;
              existingTenant.isActive = status;
            }
          }

          // Mark selected unit as OCCUPIED
          if (unit) {
            unit.status = 'OCCUPIED';
          }

          // Create or update active lease binding tenant to Property and Unit on dateIn
          let lease = AppState.leases.find(l => l.tenantId === tenantId && l.unitId === unitId && l.status === 'Active');
          if (!lease) {
            const newLeaseId = `LSE-${String(AppState.leases.length + 1).padStart(3, '0')}`;
            const endDateObj = new Date(dateIn);
            endDateObj.setFullYear(endDateObj.getFullYear() + 1);
            lease = {
              id: newLeaseId,
              tenantId: tenantId,
              tenantName: name,
              unitId: unitId,
              unitCode: unit ? unit.code : '—',
              propertyName: prop ? prop.name : '—',
              startDate: dateIn,
              endDate: endDateObj.toISOString().split('T')[0],
              rentAmount: unit ? (Number(unit.rent) || 30000) : 30000,
              serviceCharge: unit ? (Number(unit.sc) || 3500) : 3500,
              depositAmount: unit ? (Number(unit.rent) || 30000) : 30000,
              handoverWater: 0,
              meterSerial: unit ? (unit.meter || 'N/A') : 'N/A',
              status: 'Active'
            };
            AppState.leases.push(lease);
          } else {
            lease.startDate = dateIn;
            lease.tenantName = name;
          }

          // Re-render components across the application
          renderTenantsTable();
          renderUnitsTable();
          renderLeasesTable();
          populateTenantDropdowns();
          populateTenantAssignDropdowns();
          renderTenantAssignmentsTable();

          showToast(`✓ Tenant [${code}] ${name} successfully assigned to Unit ${unit ? unit.code : ''}!`);
          clearTenantAssignForm(false);
        },
        'Tenant Onboarding & Assignment Confirmation',
        'Save & Bind Lease'
      );
    }

    function renderTenantAssignmentsTable() {
      const tbody = document.getElementById('table-tenant-assignments-body');
      const badge = document.getElementById('assign-summary-badge');
      if (!tbody) return;

      const activeLeases = AppState.leases.filter(l => l.status === 'Active');
      if (badge) badge.textContent = `${activeLeases.length} Active Leases`;

      tbody.innerHTML = activeLeases.map(l => {
        const tenant = AppState.tenants.find(t => t.id === l.tenantId);
        const code = tenant ? (tenant.tenantCode || tenant.id) : '—';
        const phone = tenant ? (tenant.phone || tenant.telNo || '—') : '—';

        return `
          <tr>
            <td><span class="badge-status" style="font-family: monospace; font-weight: 800; background: #008080; color: #FFFFFF;">${code}</span></td>
            <td><strong>${l.tenantName}</strong></td>
            <td>${l.propertyName}</td>
            <td><span class="badge-status" style="font-weight: 700;">${l.unitCode}</span></td>
            <td>${l.startDate}</td>
            <td><strong>KES ${Number(l.rentAmount).toLocaleString()}</strong></td>
            <td>${phone}</td>
            <td><span class="badge-status" style="color: var(--accent-secondary); font-weight: 700;">● Active</span></td>
            <td>
              <button type="button" class="btn-action-pill" style="color: #008080; border-color: #008080; font-weight: 700;" onclick="editTenantAssignment('${l.tenantId}')">Edit / Reload</button>
            </td>
          </tr>
        `;
      }).join('');
    }

    function editTenantAssignment(tenantId) {
      const assignTabBtn = document.querySelector('[data-reg-target="assignments"]');
      if (assignTabBtn) assignTabBtn.click();

      const tSelect = document.getElementById('tenant-assign-select');
      if (tSelect) {
        tSelect.value = tenantId;
        handleTenantAssignSelect(tenantId);
      }

      const form = document.getElementById('form-tenant-assignment');
      if (form) form.scrollIntoView({ behavior: 'smooth' });
    }

    function populateDropdowns() {
      const mPropSelect = document.getElementById('mandate-property-select');

      const propOpts = AppState.properties.map(p => `<option value="${p.id}">${p.name} (${p.lr})</option>`).join('');
      if (mPropSelect) mPropSelect.innerHTML = propOpts;


      // Unit Details Bulk property selector (formatted e.g. 'Elgon View - Elijah Chindia')
      const bulkPropSelect = document.getElementById('bulk-prop-select');
      if (bulkPropSelect) {
        const prev = bulkPropSelect.value;
        const bulkOpts = AppState.properties.map(p => {
          const ll = AppState.landlords.find(l => l.id === p.landlordId) || 
                     (AppState.mandates.find(m => m.propertyId === p.id) ? AppState.landlords.find(l => l.id === AppState.mandates.find(m => m.propertyId === p.id).landlordId) : null);
          const label = ll ? `${p.name} - ${ll.name}` : `${p.name} (${p.lr || ''})`;
          return `<option value="${p.id}">${label}</option>`;
        }).join('');
        bulkPropSelect.innerHTML = bulkOpts;
        if (prev && AppState.properties.some(p => p.id === prev)) {
          bulkPropSelect.value = prev;
        } else if (activeBulkPropertyId && AppState.properties.some(p => p.id === activeBulkPropertyId)) {
          bulkPropSelect.value = activeBulkPropertyId;
        }
      }

      // Mandate landlord selector
      const mLlSelect = document.getElementById('mandate-landlord-select');
      if (mLlSelect) mLlSelect.innerHTML = AppState.landlords.map(l => `<option value="${l.id}">${l.name} (${l.kraPin})</option>`).join('');

      // Sub-Module 1.1 Tenant Details & Assignment Dropdowns
      populateTenantAssignDropdowns();

      // Sub-Module 1.2 Tenant Dropdowns
      populateTenantDropdowns();
    }

    /* ==========================================================================
       SUB-MODULE 1.1: SECTION 6 - UNIT DETAILS BULK (LEGACY PROMATRIX LAYOUT)
       ========================================================================== */
    let activeBulkPropertyId = null;
    let bulkGridUnits = [];

    const BULK_CATEGORIES = [
      'Shop',
      '1 Bedroom',
      '2 Bedroom',
      '3 Bedroom',
      'Stall',
      'Bedsitter',
      'Double room',
      'Business',
      '4 Bedroom',
      'Single',
      '5 Bedroom',
      'Signage',
      'Parking Bay',
      'OFFICE'
    ];

    const BULK_TYPES = ['Residential', 'Commercial'];

    const BULK_FLOORS = [
      'Basement Level 3',
      'Basement Level 2',
      'Basement Level 1',
      'Ground Floor',
      'Mezzanine Floor',
      '1st Floor',
      '2nd Floor',
      '3rd Floor',
      '4th Floor',
      '5th Floor',
      '6th Floor',
      '7th Floor',
      '8th Floor',
      '9th Floor',
      '10th Floor',
      'Rooftop / Penthouse'
    ];

    const BULK_STATUSES = ['Occupied', 'Vacant'];
    const BULK_ACTIVES = ['Active', 'InActive'];

    function mapConfigToCategory(config) {
      if (!config) return '1 Bedroom';
      const clean = config.toUpperCase();
      if (clean.includes('1_BEDROOM') || clean === '1 BEDROOM') return '1 Bedroom';
      if (clean.includes('2_BEDROOM') || clean === '2 BEDROOM') return '2 Bedroom';
      if (clean.includes('3_BEDROOM') || clean === '3 BEDROOM') return '3 Bedroom';
      if (clean.includes('4_BEDROOM') || clean === '4 BEDROOM') return '4 Bedroom';
      if (clean.includes('5_BEDROOM') || clean === '5 BEDROOM') return '5 Bedroom';
      if (clean.includes('BEDSITTER') || clean.includes('STUDIO')) return 'Bedsitter';
      if (clean.includes('COMMERCIAL') || clean.includes('OFFICE')) return 'OFFICE';
      if (clean.includes('SHOP') || clean.includes('RETAIL')) return 'Shop';
      if (clean.includes('STALL')) return 'Stall';
      if (clean.includes('PARKING')) return 'Parking Bay';
      if (clean.includes('BUSINESS')) return 'Business';
      return '1 Bedroom';
    }

    function initBulkUnitsTab() {
      const pSelect = document.getElementById('bulk-prop-select');
      if (!pSelect) return;

      if (!activeBulkPropertyId && AppState.properties.length > 0) {
        activeBulkPropertyId = AppState.properties[0].id;
      }

      if (activeBulkPropertyId) {
        pSelect.value = activeBulkPropertyId;
        loadBulkGridForProperty(activeBulkPropertyId);
      }
    }

    function openBulkUnitEditor(propId) {
      const currentView = AppState.currentView || 'estate-reg';
      if (currentView !== 'estate-reg') {
        switchView('estate-reg', 'Registration');
        setTimeout(() => openBulkUnitEditor(propId), 150);
        return;
      }

      const bulkTabBtn = document.querySelector('[data-reg-target="bulk-units"]');
      if (bulkTabBtn) bulkTabBtn.click();

      activeBulkPropertyId = propId;
      const pSelect = document.getElementById('bulk-prop-select');
      if (pSelect) pSelect.value = propId;

      loadBulkGridForProperty(propId);

      const prop = AppState.properties.find(p => p.id === propId);
      showToast(`⚡ Opened Unit Details Bulk for "${prop ? prop.name : propId}"`);
    }

    function handleBulkPropSelectChange(propId) {
      activeBulkPropertyId = propId;
      loadBulkGridForProperty(propId);
    }

    function loadBulkGridForProperty(propId) {
      const prop = AppState.properties.find(p => p.id === propId);
      if (!prop) return;

      activeBulkPropertyId = propId;

      // Load matching units from AppState
      const existing = AppState.units.filter(u => u.propertyId === propId);
      bulkGridUnits = existing.map((u, idx) => ({
        id: u.id,
        propertyId: prop.id,
        propertyName: prop.name,
        rowNumber: u.rowNumber !== undefined ? u.rowNumber : (idx + 1),
        code: u.code || '',
        category: u.category || (u.config ? mapConfigToCategory(u.config) : '1 Bedroom'),
        type: u.type || (prop.type === 'COMMERCIAL' ? 'Commercial' : 'Residential'),
        floor: u.floor || 'Ground Floor',
        status: (u.status === 'OCCUPIED' || u.status === 'Occupied') ? 'Occupied' : 'Vacant',
        waterAcct: u.waterAcct !== undefined ? u.waterAcct : (u.meter || '-'),
        elecAcct: u.elecAcct !== undefined ? u.elecAcct : '-',
        otherAcct: u.otherAcct || '',
        sqFt: parseFloat(u.sqFt !== undefined ? u.sqFt : (u.plinth || 0.00)) || 0.00,
        active: u.active || 'Active',
        rent: u.rent || 0,
        sc: u.sc || 0
      }));

      // In legacy ProMatrix, pad empty rows up to at least 15 for spreadsheet-style entry
      const totalPad = Math.max(15, bulkGridUnits.length + 3);
      while (bulkGridUnits.length < totalPad) {
        bulkGridUnits.push({
          id: `UNIT-PAD-${Date.now()}-${bulkGridUnits.length}`,
          propertyId: prop.id,
          propertyName: prop.name,
          rowNumber: 0,
          code: '',
          category: 'Shop',
          type: 'Residential',
          floor: 'Basement Level 2',
          status: 'Vacant',
          waterAcct: '',
          elecAcct: '',
          otherAcct: '',
          sqFt: 0.00,
          active: 'Active',
          rent: 0,
          sc: 0
        });
      }

      renderBulkUnitsGrid();
    }

    function renderBulkUnitsGrid() {
      const tbody = document.getElementById('bulk-units-tbody');
      if (!tbody) return;

      tbody.innerHTML = bulkGridUnits.map((u, i) => `
        <tr style="border-bottom: 1px solid #E5E7EB; background: ${i % 2 === 0 ? '#FFFFFF' : '#F9FAFB'};">
          <td style="text-align: center; color: #6B7280; font-weight: 600; padding: 4px 6px; border-right: 1px solid #E5E7EB;">
            ${u.rowNumber !== undefined ? u.rowNumber : (i + 1)}
          </td>
          <td style="padding: 3px 6px; border-right: 1px solid #E5E7EB;">
            <input type="text" class="form-input" style="height: 26px; padding: 2px 6px; font-size: 0.82rem; border: 1px solid #D1D5DB; border-radius: 3px; width: 100%; box-sizing: border-box;" value="${u.code || ''}" onchange="bulkGridUnits[${i}].code = this.value">
          </td>
          <td style="padding: 3px 6px; border-right: 1px solid #E5E7EB;">
            <select class="form-input" style="height: 26px; padding: 1px 4px; font-size: 0.82rem; border: 1px solid #D1D5DB; border-radius: 3px; width: 100%; box-sizing: border-box;" onchange="bulkGridUnits[${i}].category = this.value">
              ${BULK_CATEGORIES.map(cat => `<option value="${cat}" ${u.category === cat ? 'selected' : ''}>${cat}</option>`).join('')}
            </select>
          </td>
          <td style="padding: 3px 6px; border-right: 1px solid #E5E7EB;">
            <select class="form-input" style="height: 26px; padding: 1px 4px; font-size: 0.82rem; border: 1px solid #D1D5DB; border-radius: 3px; width: 100%; box-sizing: border-box;" onchange="bulkGridUnits[${i}].type = this.value">
              ${BULK_TYPES.map(t => `<option value="${t}" ${u.type === t ? 'selected' : ''}>${t}</option>`).join('')}
            </select>
          </td>
          <td style="padding: 3px 6px; border-right: 1px solid #E5E7EB;">
            <select class="form-input" style="height: 26px; padding: 1px 4px; font-size: 0.82rem; border: 1px solid #D1D5DB; border-radius: 3px; width: 100%; box-sizing: border-box;" onchange="bulkGridUnits[${i}].floor = this.value">
              ${BULK_FLOORS.map(fl => `<option value="${fl}" ${u.floor === fl ? 'selected' : ''}>${fl}</option>`).join('')}
            </select>
          </td>
          <td style="padding: 3px 6px; border-right: 1px solid #E5E7EB;">
            <select class="form-input" style="height: 26px; padding: 1px 4px; font-size: 0.82rem; border: 1px solid #D1D5DB; border-radius: 3px; width: 100%; box-sizing: border-box;" onchange="bulkGridUnits[${i}].status = this.value">
              ${BULK_STATUSES.map(st => `<option value="${st}" ${u.status === st ? 'selected' : ''}>${st}</option>`).join('')}
            </select>
          </td>
          <td style="padding: 3px 6px; border-right: 1px solid #E5E7EB;">
            <input type="text" class="form-input" style="height: 26px; padding: 2px 6px; font-size: 0.82rem; border: 1px solid #D1D5DB; border-radius: 3px; width: 100%; box-sizing: border-box;" value="${u.waterAcct !== undefined ? u.waterAcct : '-'}" onchange="bulkGridUnits[${i}].waterAcct = this.value">
          </td>
          <td style="padding: 3px 6px; border-right: 1px solid #E5E7EB;">
            <input type="text" class="form-input" style="height: 26px; padding: 2px 6px; font-size: 0.82rem; border: 1px solid #D1D5DB; border-radius: 3px; width: 100%; box-sizing: border-box;" value="${u.elecAcct !== undefined ? u.elecAcct : '-'}" onchange="bulkGridUnits[${i}].elecAcct = this.value">
          </td>
          <td style="padding: 3px 6px; border-right: 1px solid #E5E7EB;">
            <input type="text" class="form-input" style="height: 26px; padding: 2px 6px; font-size: 0.82rem; border: 1px solid #D1D5DB; border-radius: 3px; width: 100%; box-sizing: border-box;" value="${u.otherAcct || ''}" onchange="bulkGridUnits[${i}].otherAcct = this.value">
          </td>
          <td style="padding: 3px 6px; border-right: 1px solid #E5E7EB; text-align: right;">
            <input type="number" step="0.01" class="form-input" style="height: 26px; padding: 2px 6px; font-size: 0.82rem; border: 1px solid #D1D5DB; border-radius: 3px; width: 100%; text-align: right; box-sizing: border-box;" value="${Number(u.sqFt || 0).toFixed(2)}" onchange="bulkGridUnits[${i}].sqFt = parseFloat(this.value) || 0.00">
          </td>
          <td style="padding: 3px 6px;">
            <select class="form-input" style="height: 26px; padding: 1px 4px; font-size: 0.82rem; border: 1px solid #D1D5DB; border-radius: 3px; width: 100%; box-sizing: border-box;" onchange="bulkGridUnits[${i}].active = this.value">
              ${BULK_ACTIVES.map(act => `<option value="${act}" ${u.active === act ? 'selected' : ''}>${act}</option>`).join('')}
            </select>
          </td>
        </tr>
      `).join('');

      const validCount = bulkGridUnits.filter(u => u.code && u.code.trim() !== '').length;
      const footer = document.getElementById('bulk-grid-summary-footer');
      if (footer) {
        footer.innerHTML = `Showing <strong>${bulkGridUnits.length}</strong> entry rows (<strong>${validCount}</strong> defined door units)`;
      }
    }

    function addBulkUnitRow() {
      const prop = AppState.properties.find(p => p.id === activeBulkPropertyId) || AppState.properties[0];
      bulkGridUnits.push({
        id: `UNIT-PAD-${Date.now()}-${bulkGridUnits.length}`,
        propertyId: prop ? prop.id : '',
        propertyName: prop ? prop.name : '',
        rowNumber: 0,
        code: '',
        category: 'Shop',
        type: 'Residential',
        floor: 'Basement Level 2',
        status: 'Vacant',
        waterAcct: '',
        elecAcct: '',
        otherAcct: '',
        sqFt: 0.00,
        active: 'Active',
        rent: 0,
        sc: 0
      });

      renderBulkUnitsGrid();
      showToast('✓ Appended new entry row');
    }

    function handleBulkUnitsCommit() {
      const prop = AppState.properties.find(p => p.id === activeBulkPropertyId);
      if (!prop) {
        showToast('No target property selected.');
        return;
      }

      // Filter rows that have unit codes defined
      const unitsToSave = bulkGridUnits.filter(u => u.code && u.code.trim() !== '');

      confirmAction(
        `Are you sure you want to save and commit <strong>${unitsToSave.length} Unit Details</strong> for Property <strong>[${prop.propertyIdCode || prop.id}] ${prop.name}</strong> to the live multi-tenant database?`,
        () => {
          // Remove old units for this property from AppState.units
          AppState.units = AppState.units.filter(u => u.propertyId !== prop.id);

          // Add updated units
          unitsToSave.forEach((u, i) => {
            AppState.units.push({
              id: (u.id && !u.id.startsWith('UNIT-PAD') && !u.id.startsWith('UNIT-NEW')) ? u.id : `UNIT-${AppState.units.length + 1}`,
              propertyId: prop.id,
              propertyName: prop.name,
              rowNumber: i + 1,
              code: u.code.trim(),
              category: u.category,
              type: u.type,
              floor: u.floor,
              status: u.status,
              waterAcct: u.waterAcct,
              elecAcct: u.elecAcct,
              otherAcct: u.otherAcct,
              sqFt: parseFloat(u.sqFt) || 0.00,
              plinth: parseFloat(u.sqFt) || 0.00,
              active: u.active,
              rent: u.rent || 0,
              sc: u.sc || 0
            });
          });

          // Sync property unit count
          prop.unitsCount = unitsToSave.length;
          prop.noOfUnits = unitsToSave.length;

          // Re-render other relevant tables
          renderPropertiesTable();
          renderUnitsTable();
          renderLandlordPortfolioTable();
          loadBulkGridForProperty(prop.id);

          showToast(`✓ Successfully saved ${unitsToSave.length} unit details for "${prop.name}"!`);
        },
        'Database Execution Warning',
        'Save Details'
      );
    }

    /* SUB-MODULE 1.1 (PART 4): PROPERTY PAYABLES MATRIX & WATERFALL ENGINE */
    let activePayablePropertyId = null;

    // Switch between top-level Property Registration and Property Payables tabs
    function switchPropSubTab(target) {
      if (target === 'details') {
        const propTabBtn = document.querySelector('[data-reg-target="properties"]');
        if (propTabBtn) propTabBtn.click();
      } else {
        const payablesTabBtn = document.querySelector('[data-reg-target="property-payables"]');
        if (payablesTabBtn) payablesTabBtn.click();
      }
    }

    function initPropertyPayablesTab() {
      const pSel = document.getElementById('payable-prop-select');
      if (!pSel) return;

      pSel.innerHTML = `
        <option value="">-- Select Property --</option>
        ${AppState.properties.map(p => `<option value="${p.id}">${p.propertyIdCode || p.id} - ${p.name}</option>`).join('')}
      `;

      if (!activePayablePropertyId && AppState.properties.length > 0) {
        activePayablePropertyId = AppState.properties[0].id;
      }

      if (activePayablePropertyId) {
        pSel.value = activePayablePropertyId;
        handlePayablePropChange(activePayablePropertyId);
      } else {
        renderPropertyPayablesTable();
      }
    }

    function openPropertyPayables(propId) {
      const currentView = AppState.currentView || 'estate-reg';
      if (currentView !== 'estate-reg') {
        switchView('estate-reg', 'Registration');
        setTimeout(() => openPropertyPayables(propId), 150);
        return;
      }

      activePayablePropertyId = propId;
      const payablesTabBtn = document.querySelector('[data-reg-target="property-payables"]');
      if (payablesTabBtn) payablesTabBtn.click();

      const pSel = document.getElementById('payable-prop-select');
      if (pSel) pSel.value = propId;

      handlePayablePropChange(propId);
      const prop = AppState.properties.find(p => p.id === propId);
      showToast(`⚙️ Configured Payables Matrix for "${prop ? prop.name : propId}"`);
    }

    function handlePayablePropChange(propId) {
      activePayablePropertyId = propId;
      if (!propId) {
        renderPropertyPayablesTable();
        return;
      }

      // If this property has no matrix configured yet, seed with deep copy of masterPayables
      if (!AppState.propertyPayablesConfig[propId]) {
        AppState.propertyPayablesConfig[propId] = AppState.masterPayables.map(p => ({ ...p }));
      }
      if (!AppState.propertyWaterfallRules[propId]) {
        AppState.propertyWaterfallRules[propId] = { overpaymentRouting: 'ADVANCE_RENT' };
      }

      renderPropertyPayablesTable();
    }

    function renderPropertyPayablesTable() {
      const tbody = document.getElementById('property-payables-tbody');
      const footer = document.getElementById('payables-summary-footer');
      if (!tbody) return;

      if (!activePayablePropertyId) {
        tbody.innerHTML = `
          <tr>
            <td colspan="13" style="text-align: center; padding: 32px 16px; color: #6B7280;">
              <em>Please select a property from the dropdown above to view or configure its payables matrix.</em>
            </td>
          </tr>
        `;
        if (footer) footer.textContent = 'No property selected';
        return;
      }

      const rows = AppState.propertyPayablesConfig[activePayablePropertyId] || AppState.masterPayables;
      const activeCount = rows.filter(r => r.status).length;

      tbody.innerHTML = rows.map((r, idx) => {
        const bg = idx % 2 === 0 ? '#FFFFFF' : '#F9FAFB';
        return `
          <tr style="background: ${bg}; border-bottom: 1px solid #E5E7EB;">
            <td style="text-align: center; padding: 6px 8px; border-right: 1px solid #E5E7EB; font-weight: 700; color: #6B7280;">${idx + 1}</td>
            <td style="padding: 6px 8px; border-right: 1px solid #E5E7EB; font-weight: 800; font-family: monospace; color: #1F2937;">${r.code}</td>
            <td style="padding: 6px 8px; border-right: 1px solid #E5E7EB; font-weight: 600; color: #111827;">${r.description}</td>
            <td style="text-align: center; padding: 6px 8px; border-right: 1px solid #E5E7EB;">
              <input type="checkbox" ${r.isCompulsory ? 'checked' : ''} onchange="updatePayableRow('${r.code}', 'isCompulsory', this.checked)">
            </td>
            <td style="text-align: center; padding: 6px 8px; border-right: 1px solid #E5E7EB;">
              <input type="checkbox" ${r.isRefundable ? 'checked' : ''} onchange="updatePayableRow('${r.code}', 'isRefundable', this.checked)">
            </td>
            <td style="text-align: center; padding: 6px 8px; border-right: 1px solid #E5E7EB;">
              <input type="checkbox" ${r.isAgentHold ? 'checked' : ''} onchange="updatePayableRow('${r.code}', 'isAgentHold', this.checked)">
            </td>
            <td style="text-align: center; padding: 6px 8px; border-right: 1px solid #E5E7EB;">
              <input type="checkbox" ${r.isCommissionable ? 'checked' : ''} onchange="updatePayableRow('${r.code}', 'isCommissionable', this.checked)">
            </td>
            <td style="text-align: center; padding: 6px 8px; border-right: 1px solid #E5E7EB;">
              <input type="checkbox" ${r.isPercentage ? 'checked' : ''} onchange="updatePayableRow('${r.code}', 'isPercentage', this.checked)">
            </td>
            <td style="text-align: center; padding: 6px 8px; border-right: 1px solid #E5E7EB;">
              <input type="checkbox" ${r.isRecurring ? 'checked' : ''} onchange="updatePayableRow('${r.code}', 'isRecurring', this.checked)">
            </td>
            <td style="text-align: center; padding: 6px 8px; border-right: 1px solid #E5E7EB;">
              <input type="checkbox" ${r.isFixedAmount ? 'checked' : ''} onchange="updatePayableRow('${r.code}', 'isFixedAmount', this.checked)">
            </td>
            <td style="text-align: center; padding: 4px 6px; border-right: 1px solid #E5E7EB;">
              <input type="number" step="0.01" min="0" max="100" value="${r.rateOnRent !== undefined ? r.rateOnRent : 0}" style="width: 70px; height: 26px; font-size: 0.82rem; text-align: right; padding: 2px 4px; border: 1px solid #D1D5DB; border-radius: 3px;" onchange="updatePayableRow('${r.code}', 'rateOnRent', parseFloat(this.value)||0)">
            </td>
            <td style="text-align: center; padding: 6px 8px; border-right: 1px solid #E5E7EB;">
              <input type="checkbox" ${r.status !== false ? 'checked' : ''} onchange="updatePayableRow('${r.code}', 'status', this.checked)">
            </td>
            <td style="text-align: center; padding: 4px 6px;">
              <input type="number" min="1" max="999" value="${r.priority || 50}" style="width: 55px; height: 26px; font-size: 0.82rem; text-align: center; padding: 2px 4px; border: 1px solid #D1D5DB; border-radius: 3px; font-weight: 700; color: #008080;" onchange="updatePayableRow('${r.code}', 'priority', parseInt(this.value, 10)||50)">
            </td>
          </tr>
        `;
      }).join('');

      if (footer) {
        footer.innerHTML = `<strong>${activeCount}</strong> of <strong>${rows.length}</strong> Payables Active for Property <strong>${activePayablePropertyId}</strong>`;
      }
    }

    function updatePayableRow(code, field, value) {
      if (!activePayablePropertyId) return;
      if (!AppState.propertyPayablesConfig[activePayablePropertyId]) {
        AppState.propertyPayablesConfig[activePayablePropertyId] = AppState.masterPayables.map(p => ({ ...p }));
      }
      const item = AppState.propertyPayablesConfig[activePayablePropertyId].find(p => p.code === code);
      if (item) {
        item[field] = value;
      }
    }

    function resetPayablesToCatalogDefaults() {
      if (!activePayablePropertyId) {
        showToast('Please select a property first.');
        return;
      }
      const prop = AppState.properties.find(p => p.id === activePayablePropertyId);
      confirmAction(
        `Are you sure you want to reset all payable settings for <strong>${prop ? prop.name : activePayablePropertyId}</strong> back to the ProMatrix standard master catalog defaults?`,
        () => {
          AppState.propertyPayablesConfig[activePayablePropertyId] = AppState.masterPayables.map(p => ({ ...p }));
          renderPropertyPayablesTable();
          showToast(`✓ Reset payables matrix to ProMatrix defaults for ${prop ? prop.name : activePayablePropertyId}`);
        },
        'Reset Defaults Confirmation',
        'Reset to Defaults',
        true
      );
    }

    function handleSavePayablesMatrix() {
      if (!activePayablePropertyId) {
        showToast('Please select a property to save.');
        return;
      }

      const prop = AppState.properties.find(p => p.id === activePayablePropertyId);
      const propName = prop ? prop.name : activePayablePropertyId;
      const matrix = AppState.propertyPayablesConfig[activePayablePropertyId] || AppState.masterPayables;
      const activeCount = matrix.filter(r => r.status).length;

      confirmAction(
        `Are you sure you want to commit the Property Payables Matrix configuration (<strong>${activeCount} active charges</strong>) for <strong>[${prop ? prop.propertyIdCode || prop.id : ''}] ${propName}</strong> to the live multi-tenant database?`,
        () => {
          // Update property payables count
          if (prop) {
            prop.payablesCount = activeCount;
          }
          renderPropertiesTable();
          renderPropertyPayablesTable();
          showToast(`✓ Property Payables Matrix successfully committed for "${propName}"!`);
        },
        'Database Execution Warning',
        'Commit Matrix'
      );
    }

    // Modal Waterfall Handlers
    function openWaterfallModal() {
      const modal = document.getElementById('modal-waterfall-config');
      if (!modal) return;

      const routingSel = document.getElementById('waterfall-overpayment-routing');
      if (routingSel && activePayablePropertyId && AppState.propertyWaterfallRules[activePayablePropertyId]) {
        routingSel.value = AppState.propertyWaterfallRules[activePayablePropertyId].overpaymentRouting || 'ADVANCE_RENT';
      }

      modal.classList.add('active');
      runWaterfallSimulation();
    }

    function closeWaterfallModal() {
      const modal = document.getElementById('modal-waterfall-config');
      if (modal) modal.classList.remove('active');
    }

    function saveWaterfallSettings() {
      if (!activePayablePropertyId) {
        showToast('Please select a property first.');
        return;
      }

      const routing = document.getElementById('waterfall-overpayment-routing').value;
      const prop = AppState.properties.find(p => p.id === activePayablePropertyId);

      confirmAction(
        `Commit waterfall rules and set overpayment routing to <strong>${routing}</strong> for Property <strong>${prop ? prop.name : activePayablePropertyId}</strong>?`,
        () => {
          if (!AppState.propertyWaterfallRules[activePayablePropertyId]) {
            AppState.propertyWaterfallRules[activePayablePropertyId] = {};
          }
          AppState.propertyWaterfallRules[activePayablePropertyId].overpaymentRouting = routing;
          closeWaterfallModal();
          showToast(`✓ Waterfall rules and overpayment routing updated for "${prop ? prop.name : activePayablePropertyId}".`);
        },
        'Database Configuration Warning',
        'Save Waterfall Rules'
      );
    }

    // Interactive Waterfall Simulation
    function runWaterfallSimulation() {
      const outputEl = document.getElementById('sim-waterfall-output');
      const amountInput = document.getElementById('sim-receipt-amount');
      if (!outputEl || !amountInput) return;

      const simAmount = parseFloat(amountInput.value) || 0;
      const propId = activePayablePropertyId || (AppState.properties[0] ? AppState.properties[0].id : 'PROP-01');
      const routing = (AppState.propertyWaterfallRules[propId] && AppState.propertyWaterfallRules[propId].overpaymentRouting) || 'ADVANCE_RENT';

      // Mock pending tenant liabilities
      const pendingDebits = [
        { code: '035', description: 'Late Payment Penalty', amount: 3500 },
        { code: '011', description: 'Unpaid Cheque Charges', amount: 2000 },
        { code: '001', description: 'Rent (Current Month)', amount: 32000 },
        { code: '009', description: 'Service Charge', amount: 3500 },
        { code: '002', description: 'Water Bill Reading', amount: 2025 },
        { code: '017', description: 'Garbage Collection', amount: 500 }
      ];

      const result = allocatePaymentWaterfall(propId, simAmount, pendingDebits);

      outputEl.innerHTML = `
        <table style="width: 100%; border-collapse: collapse; font-size: 0.78rem;">
          <thead>
            <tr style="background: #F3F4F6; color: #374151; border-bottom: 1px solid #D1D5DB;">
              <th style="padding: 4px 6px; text-align: center;">Priority</th>
              <th style="padding: 4px 6px; text-align: left;">Payable</th>
              <th style="padding: 4px 6px; text-align: right;">Owed</th>
              <th style="padding: 4px 6px; text-align: right;">Allocated</th>
              <th style="padding: 4px 6px; text-align: right;">Balance</th>
              <th style="padding: 4px 6px; text-align: center;">Status</th>
            </tr>
          </thead>
          <tbody>
            ${result.allocations.map(a => `
              <tr style="border-bottom: 1px solid #F3F4F6;">
                <td style="padding: 4px 6px; text-align: center; font-weight: 700; color: #008080;">${a.priority}</td>
                <td style="padding: 4px 6px;"><strong>[${a.code}]</strong> ${a.description}</td>
                <td style="padding: 4px 6px; text-align: right;">KES ${a.owed.toLocaleString()}</td>
                <td style="padding: 4px 6px; text-align: right; color: #15803D; font-weight: 700;">+KES ${a.allocated.toLocaleString()}</td>
                <td style="padding: 4px 6px; text-align: right;">KES ${a.balance.toLocaleString()}</td>
                <td style="padding: 4px 6px; text-align: center;">
                  <span style="font-size: 0.7rem; font-weight: 700; color: ${a.status === 'FULL' ? '#15803D' : a.status === 'PARTIAL' ? '#EA580C' : '#9CA3AF'};">
                    ${a.status}
                  </span>
                </td>
              </tr>
            `).join('')}
            ${result.surplus > 0 ? `
              <tr style="background: #F0FDF4; font-weight: 700; border-top: 2px solid #86EFAC;">
                <td style="padding: 6px; text-align: center;">⚡</td>
                <td style="padding: 6px;" colspan="2">Surplus Routed to: <u>${routing}</u></td>
                <td style="padding: 6px; text-align: right; color: #15803D;">+KES ${result.surplus.toLocaleString()}</td>
                <td style="padding: 6px; text-align: right;">KES 0</td>
                <td style="padding: 6px; text-align: center; color: #15803D;">ADVANCE</td>
              </tr>
            ` : ''}
          </tbody>
        </table>
      `;
    }

    // ProMatrix Waterfall Allocation Algorithm
    function allocatePaymentWaterfall(propId, totalAmount, pendingItems) {
      const config = AppState.propertyPayablesConfig[propId] || AppState.masterPayables;
      const routing = (AppState.propertyWaterfallRules[propId] && AppState.propertyWaterfallRules[propId].overpaymentRouting) || 'ADVANCE_RENT';

      // Attach priority from config to each item
      const enriched = (pendingItems || []).map(item => {
        const cfg = config.find(c => c.code === item.code);
        return {
          ...item,
          priority: cfg ? (cfg.priority || 50) : 50
        };
      });

      // Sort ascending by priority (1 is highest priority, liquidated first)
      enriched.sort((a, b) => a.priority - b.priority);

      let unallocated = totalAmount;
      const allocations = [];

      for (const item of enriched) {
        const owed = item.amount || 0;
        let allocated = 0;
        let balance = owed;

        if (unallocated > 0) {
          if (unallocated >= owed) {
            allocated = owed;
            unallocated -= owed;
            balance = 0;
          } else {
            allocated = unallocated;
            balance = owed - unallocated;
            unallocated = 0;
          }
        }

        allocations.push({
          code: item.code,
          description: item.description,
          priority: item.priority,
          owed: owed,
          allocated: allocated,
          balance: balance,
          status: balance === 0 && owed > 0 ? 'FULL' : allocated > 0 ? 'PARTIAL' : 'UNPAID'
        });
      }

      return {
        allocations: allocations,
        surplus: Math.max(0, unallocated),
        overpaymentRouting: routing
      };
    }

    /* TENANTS LOGIC & INTERACTION ENGINES */

    function switchTenantTab(targetTabId) {
      // Legacy redirects to the grouped invoices tab
      if (targetTabId === 'tab-single-tenant' || targetTabId === 'tab-bulk-tenants') {
        const sub = targetTabId === 'tab-single-tenant' ? 'single' : 'bulk';
        switchTenantTab('tab-invoices');
        switchInvoiceSubTab(sub);
        return;
      }

      AppState.activeTenantTab = targetTabId;

      // Update button visual styles
      const tabBtns = document.querySelectorAll('.tenant-subtab-btn');
      tabBtns.forEach(btn => {
        if (btn.id === `btn-${targetTabId}` || btn.getAttribute('data-tenant-target') === targetTabId) {
          btn.classList.add('active');
        } else {
          btn.classList.remove('active');
        }
      });

      // Update panel visibility
      const panels = document.querySelectorAll('.tenant-panel');
      panels.forEach(p => {
        if (p.id === `panel-${targetTabId}` || p.id === `panel-tenant-${targetTabId}` || (targetTabId === 'tab-ledger' && (p.id === 'panel-tab-ledger' || p.id === 'panel-tenant-ledger'))) {
          p.style.display = 'block';
          p.classList.add('active');
        } else {
          p.style.display = 'none';
          p.classList.remove('active');
        }
      });

      // Trigger data binding for the active tab
      if (targetTabId === 'tab-invoices' || targetTabId === 'invoices') {
        switchInvoiceSubTab(AppState.activeInvoiceSubTab || 'single');
      } else if (targetTabId === 'tab-receipting' || targetTabId === 'receipting') {
        initTenantReceipting();
      } else if (targetTabId === 'tab-leases' || targetTabId === 'leases') {
        populateTenantDropdowns();
        renderLeasesTable();
      } else if (targetTabId === 'tab-metering' || targetTabId === 'metering') {
        populateTenantDropdowns();
        renderReadingsTable();
      } else if (targetTabId === 'tab-ledger' || targetTabId === 'ledger') {
        initTenantStatementEngine();
      }
    }

    function switchInvoiceSubTab(subTabId) {
      AppState.activeInvoiceSubTab = subTabId;

      // Update subtab button visual styles
      const subBtns = document.querySelectorAll('.inv-subtab-btn');
      subBtns.forEach(btn => {
        if (btn.id === `btn-subtab-${subTabId}`) {
          btn.classList.add('active');
        } else {
          btn.classList.remove('active');
        }
      });

      // Update subpanel visibility
      const subPanels = document.querySelectorAll('.invoice-subpanel');
      subPanels.forEach(p => {
        if (p.id === `subpanel-inv-${subTabId}`) {
          p.style.display = 'block';
          p.classList.add('active');
        } else {
          p.style.display = 'none';
          p.classList.remove('active');
        }
      });

      // Initialize specific invoice engine
      if (subTabId === 'single') {
        initSingleTenantBilling();
      } else if (subTabId === 'bulk') {
        initBulkTenantsBilling();
      }
    }

    function setupTenantTabs() {
      const tenantTabBtns = document.querySelectorAll('.tenant-subtab-btn, .tenant-tab-btn');
      tenantTabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          const target = btn.getAttribute('data-tenant-target') || btn.id.replace('btn-', '');
          if (target) {
            switchTenantTab(target);
          }
        });
      });
    }

    /* --------------------------------------------------------------------------
       1. SINGLE TENANT INVOICING ENGINE (image_731002.png)
       -------------------------------------------------------------------------- */
    function initSingleTenantBilling() {
      const propSel = document.getElementById('single-invoice-property-select');
      if (!propSel) return;

      propSel.innerHTML = AppState.properties.map(p => 
        `<option value="${p.id}" ${p.name.includes('CHIMNEY RISE') ? 'selected' : ''}>${p.name}</option>`
      ).join('');

      onSinglePropertyChange(propSel.value);
    }

    function onSinglePropertyChange(propertyId) {
      const tenantSel = document.getElementById('single-invoice-tenant-select');
      if (!tenantSel) return;

      const filteredTenants = AppState.tenants.filter(t => t.isActive && (t.propertyId === propertyId || !t.propertyId));
      tenantSel.innerHTML = '<option value="">-Select Tenant-</option>' + filteredTenants.map((t, idx) => 
        `<option value="${t.id}" ${idx === 0 ? 'selected' : ''}>${t.tenantCode ? t.tenantCode + ' - ' : ''}${t.name}</option>`
      ).join('');

      onSingleTenantChange(tenantSel.value);
    }

    function onSingleTenantChange(tenantId) {
      renderSinglePayablesTable();
    }

    function renderSinglePayablesTable() {
      const tbody = document.getElementById('single-payables-table-body');
      if (!tbody) return;

      const propSel = document.getElementById('single-invoice-property-select');
      const propertyId = propSel ? propSel.value : 'PROP-03';
      const tenantSel = document.getElementById('single-invoice-tenant-select');
      const tenantId = tenantSel ? tenantSel.value : '';
      const tenant = AppState.tenants.find(t => t.id === tenantId);

      const payablesList = (AppState.propertyPayablesConfig && AppState.propertyPayablesConfig[propertyId]) || [
        { id: '30640', code: '001', description: 'Rent', defaultAmount: 0.00 },
        { id: '30641', code: '002', description: 'Water Bill', defaultAmount: 0.00 },
        { id: '30643', code: '005', description: 'Water Deposit', defaultAmount: 0.00 },
        { id: '30644', code: '006', description: 'Electricity Deposit', defaultAmount: 0.00 },
        { id: '30645', code: '008', description: 'Tenancy Agreement', defaultAmount: 0.00 },
        { id: '30646', code: '035', description: 'Penalty', defaultAmount: 1.00 },
        { id: '30647', code: '009', description: 'Service Charge', defaultAmount: 1.00 },
        { id: '60731', code: '015', description: 'Security', defaultAmount: 0.00 },
        { id: '60732', code: '017', description: 'Garbage', defaultAmount: 0.00 },
        { id: '70001', code: '004', description: 'Rent Deposit', defaultAmount: 0.00 }
      ];

      tbody.innerHTML = payablesList.map((p, idx) => {
        const isRent = p.code === '001';
        let defaultVal = p.defaultAmount !== undefined ? p.defaultAmount : 0.00;
        if (isRent && tenant && tenant.rentAmount) {
          defaultVal = tenant.rentAmount;
        }

        return `
          <tr class="pm-table-row">
            <td style="padding: 5px 10px; width: 80px; text-align: center; border-right: 1px solid #E5E7EB; color: #4B5563;">${p.id || (30640 + idx)}</td>
            <td style="padding: 5px 12px; width: 90px; text-align: left; border-right: 1px solid #E5E7EB; font-weight: 600;">${p.code}</td>
            <td style="padding: 5px 14px; text-align: left; border-right: 1px solid #E5E7EB;">${p.description}</td>
            <td style="padding: 5px 14px; width: 110px; text-align: right; border-right: 1px solid #E5E7EB; color: #4B5563;">0.00</td>
            <td style="padding: 4px 14px; width: 150px; text-align: right; border-right: 1px solid #E5E7EB;">
              <input type="number" step="0.01" class="pm-legacy-input single-bill-amount" data-code="${p.code}" data-desc="${p.description}" value="${defaultVal.toFixed(2)}" style="width: 120px; text-align: right;">
            </td>
            <td style="padding: 5px 10px; width: 70px; text-align: center;">
              <input type="checkbox" class="single-bill-select" data-code="${p.code}" ${defaultVal > 0 ? 'checked' : ''} style="accent-color: #008080; cursor: pointer; width: 16px; height: 16px;">
            </td>
          </tr>
        `;
      }).join('');
    }

    function executeSingleTenantBilling() {
      const propSel = document.getElementById('single-invoice-property-select');
      const tenantSel = document.getElementById('single-invoice-tenant-select');
      const monthSel = document.getElementById('single-invoice-month-select');
      const yearSel = document.getElementById('single-invoice-year-select');

      const propertyId = propSel ? propSel.value : '';
      const tenantId = tenantSel ? tenantSel.value : '';
      const monthVal = monthSel ? monthSel.value : '10';
      const yearVal = yearSel ? yearSel.value : '2026';
      const monthNames = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const monthName = monthNames[parseInt(monthVal, 10)] || 'Oct';
      const periodLabel = `${monthName} ${yearVal}`;

      if (!tenantId) {
        showToast('Please select a tenant to bill.');
        return;
      }

      const tenant = AppState.tenants.find(t => t.id === tenantId);
      const prop = AppState.properties.find(p => p.id === propertyId);
      if (!tenant) {
        showToast('Selected tenant not found in registry.');
        return;
      }

      const selectedItems = [];
      const rows = document.querySelectorAll('#single-payables-table-body tr');
      rows.forEach(tr => {
        const chk = tr.querySelector('.single-bill-select');
        const input = tr.querySelector('.single-bill-amount');
        if (chk && chk.checked) {
          const code = input.getAttribute('data-code');
          const pDesc = input.getAttribute('data-desc');
          const amt = parseFloat(input.value) || 0;
          selectedItems.push({ code, description: pDesc, amount: amt });
        }
      });

      if (selectedItems.length === 0) {
        showToast('Please select at least one payable item checkbox to bill.');
        return;
      }

      const totalBilled = selectedItems.reduce((acc, item) => acc + item.amount, 0);

      confirmAction(
        `Are you sure you want to bill <strong>${tenant.name} (${tenant.tenantCode || ''})</strong> a total of <strong>KES ${totalBilled.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</strong> for <strong>${periodLabel}</strong> across ${selectedItems.length} payable(s)?`,
        async () => {
          const nowIso = new Date().toISOString();
          let postedCount = 0;

          for (const item of selectedItems) {
            const autoDesc = `${item.description} - ${periodLabel}`;
            const invoiceRecord = {
              id: (typeof crypto !== 'undefined' && crypto.randomUUID) ? crypto.randomUUID() : '00000000-0000-0000-0000-' + (Date.now() + postedCount).toString(16).padStart(12, '0'),
              organization_id: getActiveOrgId(),
              tenant_id: tenant.id,
              property_id: propertyId,
              unit_id: tenant.unitId || null,
              tenant_code: tenant.tenantCode || '',
              tenant_name: tenant.name,
              unit_code: tenant.unitCode || '',
              property_name: prop ? prop.name : '',
              payable_code: item.code,
              description: autoDesc,
              amount: item.amount,
              billing_type: 'Single',
              period_month: monthVal,
              period_year: parseInt(yearVal, 10),
              is_paid: false,
              created_at: nowIso
            };

            AppState.tenantInvoices.unshift(invoiceRecord);

            try {
              await fetch(`${SUPABASE_CONFIG.url}/rest/v1/tenant_invoices`, {
                method: 'POST',
                headers: {
                  'apikey': SUPABASE_CONFIG.anonKey,
                  'Authorization': `Bearer ${SUPABASE_CONFIG.anonKey}`,
                  'Content-Type': 'application/json',
                  'Prefer': 'return=minimal'
                },
                body: JSON.stringify(invoiceRecord)
              });
            } catch (err) {
              console.warn('Supabase tenant_invoices insert warning:', err);
            }
            postedCount++;
          }

          // Post to Tenant Ledger
          AppState.ledger.push({
            id: `LED-${String(AppState.ledger.length + 1).padStart(3, '0')}`,
            timestamp: nowIso.replace('T', ' ').substring(0, 16),
            refNo: `SIN-${Date.now().toString().slice(-6)}`,
            tenantId: tenant.id,
            tenantName: tenant.name,
            unitCode: tenant.unitCode || '',
            type: 'Invoice',
            description: selectedItems.map(i => `${i.description} - ${periodLabel}`).join(', '),
            debit: totalBilled,
            credit: 0,
            balanceAfter: totalBilled
          });

          renderLedgerTable();
          showToast(`✓ Billed KES ${totalBilled.toLocaleString()} to ${tenant.name} (${postedCount} payables for ${periodLabel}) successfully.`);
        },
        'Single Tenant Billing Confirmation',
        'Bill Tenant'
      );
    }

    /* --------------------------------------------------------------------------
       2. BULK TENANTS INVOICING ENGINE (image_7310dc.png)
       -------------------------------------------------------------------------- */
    function initBulkTenantsBilling() {
      const propSel = document.getElementById('bulk-invoice-property-select');
      const payableSel = document.getElementById('bulk-invoice-payable-select');
      if (!propSel || !payableSel) return;

      propSel.innerHTML = AppState.properties.map(p => 
        `<option value="${p.id}" ${p.name.includes('CHIMNEY RISE') ? 'selected' : ''}>${p.name}</option>`
      ).join('');

      payableSel.innerHTML = `
        <option value="001" selected>001 Rent</option>
        <option value="002">002 Water Bill</option>
        <option value="009">009 Service Charge</option>
        <option value="015">015 Security</option>
        <option value="017">017 Garbage</option>
        <option value="035">035 Penalty</option>
        <option value="008">008 Tenancy Agreement</option>
      `;

      renderBulkTenantsTable();
    }

    function onBulkPropertyChange(propertyId) {
      renderBulkTenantsTable();
    }

    function onBulkPayableChange(payableCode) {
      renderBulkTenantsTable();
    }

    function renderBulkTenantsTable() {
      const tbody = document.getElementById('bulk-tenants-table-body');
      if (!tbody) return;

      const propSel = document.getElementById('bulk-invoice-property-select');
      const payableSel = document.getElementById('bulk-invoice-payable-select');
      const propertyId = propSel ? propSel.value : 'PROP-03';
      const payableCode = payableSel ? payableSel.value : '001';
      const payableText = payableSel ? payableSel.options[payableSel.selectedIndex].text.replace(/^[0-9]+\s*/, '') : 'Rent';

      const filteredTenants = AppState.tenants.filter(t => t.isActive && (t.propertyId === propertyId || !t.propertyId));

      tbody.innerHTML = filteredTenants.map((t, idx) => {
        const isRent = payableCode === '001';
        const defaultAmt = isRent ? (t.rentAmount || 35000) : 0;
        return `
          <tr class="pm-table-row">
            <td style="padding: 5px 10px; width: 90px; text-align: left; border-right: 1px solid #E5E7EB; font-weight: 600;">${t.tenantCode || 'T' + (10000 + idx)}</td>
            <td style="padding: 5px 12px; text-align: left; border-right: 1px solid #E5E7EB;">${t.name}</td>
            <td style="padding: 5px 10px; width: 60px; text-align: center; border-right: 1px solid #E5E7EB;">${t.unitCode || (idx + 1)}</td>
            <td style="padding: 5px 12px; width: 100px; text-align: left; border-right: 1px solid #E5E7EB; color: #4B5563;">${payableText}</td>
            <td style="padding: 4px 12px; width: 130px; text-align: right; border-right: 1px solid #E5E7EB;">
              <input type="number" step="0.01" class="pm-legacy-input bulk-bill-amount" data-tenant-id="${t.id}" value="${defaultAmt.toFixed(2)}" style="width: 105px; text-align: right;">
            </td>
            <td style="padding: 5px 12px; width: 100px; text-align: right; border-right: 1px solid #E5E7EB; color: #6B7280;">0.00</td>
            <td style="padding: 5px 10px; width: 85px; text-align: center; border-right: 1px solid #E5E7EB;">
              <input type="checkbox" class="bulk-tenant-checkbox" data-tenant-id="${t.id}" ${defaultAmt > 0 ? 'checked' : ''} style="accent-color: #008080; cursor: pointer; width: 16px; height: 16px;">
            </td>
            <td style="padding: 5px 10px; width: 45px; text-align: center; color: #6B7280;">${idx + 1}</td>
          </tr>
        `;
      }).join('');
    }

    function toggleBulkSelectAll(checked) {
      const checkboxes = document.querySelectorAll('.bulk-tenant-checkbox');
      checkboxes.forEach(cb => { cb.checked = checked; });
    }

    function executeBulkTenantsBilling() {
      const propSel = document.getElementById('bulk-invoice-property-select');
      const payableSel = document.getElementById('bulk-invoice-payable-select');
      const monthSel = document.getElementById('bulk-invoice-month-select');
      const yearSel = document.getElementById('bulk-invoice-year-select');

      const propertyId = propSel ? propSel.value : '';
      const payableCode = payableSel ? payableSel.value : '001';
      const payableText = payableSel ? payableSel.options[payableSel.selectedIndex].text.replace(/^[0-9]+\s*/, '') : 'Rent';
      const monthVal = monthSel ? monthSel.value : '10';
      const yearVal = yearSel ? yearSel.value : '2026';
      const monthNames = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const monthName = monthNames[parseInt(monthVal, 10)] || 'Oct';
      const periodLabel = `${monthName} ${yearVal}`;
      const autoDesc = `${payableText} - ${periodLabel}`;
      const prop = AppState.properties.find(p => p.id === propertyId);

      const billedItems = [];
      const rows = document.querySelectorAll('#bulk-tenants-table-body tr');
      rows.forEach(tr => {
        const chk = tr.querySelector('.bulk-tenant-checkbox');
        const input = tr.querySelector('.bulk-bill-amount');
        if (chk && chk.checked) {
          const tenantId = chk.getAttribute('data-tenant-id');
          const amt = parseFloat(input.value) || 0;
          const tenant = AppState.tenants.find(t => t.id === tenantId);
          if (tenant) {
            billedItems.push({ tenant, amount: amt });
          }
        }
      });

      if (billedItems.length === 0) {
        showToast('Please select at least one tenant to bill in the bulk table.');
        return;
      }

      const totalAmount = billedItems.reduce((acc, i) => acc + i.amount, 0);

      confirmAction(
        `Are you sure you want to execute Bulk Billing for <strong>${billedItems.length} tenant(s)</strong> totaling <strong>KES ${totalAmount.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</strong> for <strong>${periodLabel}</strong> under <strong>${payableText}</strong>?`,
        async () => {
          const nowIso = new Date().toISOString();
          let count = 0;

          for (const item of billedItems) {
            const invoiceRecord = {
              id: (typeof crypto !== 'undefined' && crypto.randomUUID) ? crypto.randomUUID() : '00000000-0000-0000-0000-' + (Date.now() + count).toString(16).padStart(12, '0'),
              organization_id: getActiveOrgId(),
              tenant_id: item.tenant.id,
              property_id: propertyId,
              unit_id: item.tenant.unitId || null,
              tenant_code: item.tenant.tenantCode || '',
              tenant_name: item.tenant.name,
              unit_code: item.tenant.unitCode || '',
              property_name: prop ? prop.name : '',
              payable_code: payableCode,
              description: autoDesc,
              amount: item.amount,
              billing_type: 'Bulk',
              period_month: monthVal,
              period_year: parseInt(yearVal, 10),
              is_paid: false,
              created_at: nowIso
            };

            AppState.tenantInvoices.unshift(invoiceRecord);

            try {
              await fetch(`${SUPABASE_CONFIG.url}/rest/v1/tenant_invoices`, {
                method: 'POST',
                headers: {
                  'apikey': SUPABASE_CONFIG.anonKey,
                  'Authorization': `Bearer ${SUPABASE_CONFIG.anonKey}`,
                  'Content-Type': 'application/json',
                  'Prefer': 'return=minimal'
                },
                body: JSON.stringify(invoiceRecord)
              });
            } catch (err) {
              console.warn('Supabase bulk tenant_invoices insert warning:', err);
            }

            // Post ledger entry
            AppState.ledger.push({
              id: `LED-${String(AppState.ledger.length + 1).padStart(3, '0')}`,
              timestamp: nowIso.replace('T', ' ').substring(0, 16),
              refNo: `BLK-${Date.now().toString().slice(-6)}`,
              tenantId: item.tenant.id,
              tenantName: item.tenant.name,
              unitCode: item.tenant.unitCode || '',
              type: 'Invoice',
              description: autoDesc,
              debit: item.amount,
              credit: 0,
              balanceAfter: item.amount
            });

            count++;
          }

          renderLedgerTable();
          showToast(`✓ Bulk billing executed: ${count} tenants billed KES ${totalAmount.toLocaleString()} for ${periodLabel} successfully.`);
        },
        'Bulk Tenants Billing Confirmation',
        'Bill All Selected'
      );
    }

    /* --------------------------------------------------------------------------
       TENANT PAYMENT RECEIPTING & ALLOCATION ENGINE
       -------------------------------------------------------------------------- */

    async function loadTenantReceipts() {
      try {
        const cached = localStorage.getItem('mc_erp_tenant_receipts');
        if (cached) {
          try {
            const parsed = JSON.parse(cached);
            if (Array.isArray(parsed) && parsed.length > 0) {
              AppState.tenantReceipts = parsed;
              renderTenantReceiptsTable();
            }
          } catch (e) {}
        }

        const orgId = getActiveOrgId();
        const res = await fetch(`${SUPABASE_CONFIG.url}/rest/v1/tenant_receipts?organization_id=eq.${orgId}&order=created_at.desc`, {
          method: 'GET',
          headers: {
            'apikey': SUPABASE_CONFIG.anonKey,
            'Authorization': `Bearer ${SUPABASE_CONFIG.anonKey}`
          }
        });
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            AppState.tenantReceipts = data;
            localStorage.setItem('mc_erp_tenant_receipts', JSON.stringify(data));
            renderTenantReceiptsTable();
          }
        }
      } catch (err) {
        console.warn('loadTenantReceipts network fetch failed; using local state:', err);
      }
    }

    function initTenantReceipting() {
      // 1. Populate Property Dropdowns
      const propSel = document.getElementById('receipt-property-select');
      const filterPropSel = document.getElementById('receipt-filter-property');
            if (propSel && AppState.properties && AppState.properties.length > 0) {
        propSel.innerHTML = AppState.properties.map((p, idx) => 
          `<option value="${p.id}" ${idx === 0 ? 'selected' : ''}>${p.name}</option>`
        ).join('');
        propSel.value = AppState.properties[0].id;
      }
      if (filterPropSel) {
        filterPropSel.innerHTML = '<option value="ALL">All Properties</option>' + AppState.properties.map(p => 
          `<option value="${p.id}">${p.name}</option>`
        ).join('');
      }

      // 2. Populate Bank Accounts
      const bankSel = document.getElementById('receipt-bank-account-select');
      if (bankSel) {
        if (AppState.bankAccounts && AppState.bankAccounts.length > 0) {
          bankSel.innerHTML = AppState.bankAccounts.map(b => 
            `<option value="${b.id}">${b.bank_name || b.bankName} - ${b.branch_name || b.branchName || ''} (${b.account_no || b.accountNo})</option>`
          ).join('');
        } else {
          bankSel.innerHTML = '<option value="">No Bank Accounts Configured (Add in Admin)</option>';
        }
      }

      // 3. Populate M-Pesa Paybills
      const mpesaSel = document.getElementById('receipt-mpesa-paybill-select');
      if (mpesaSel) {
        if (AppState.mpesaPaybills && AppState.mpesaPaybills.length > 0) {
          mpesaSel.innerHTML = AppState.mpesaPaybills.map(m => 
            `<option value="${m.id}">${m.paybill_number || m.paybillNumber} - ${m.business_name || m.businessName}</option>`
          ).join('');
        } else {
          mpesaSel.innerHTML = '<option value="">No M-Pesa Paybills Configured (Add in Admin)</option>';
        }
      }

      // 4. Default Date
      const dateInput = document.getElementById('receipt-payment-date');
      if (dateInput && !dateInput.value) {
        dateInput.value = new Date().toISOString().split('T')[0];
      }

      // 5. Default Payment Method & Trigger Handlers
      const methodSel = document.getElementById('receipt-method-select');
      if (methodSel) {
        onReceiptPaymentModeChange(methodSel.value);
      }
      if (propSel && propSel.value) {
        onReceiptPropertyChange(propSel.value);
      } else if (AppState.tenants.length > 0) {
        onReceiptTenantChange(AppState.tenants[0].id);
      }

      // 6. Render Directory Table
      renderTenantReceiptsTable();
    }

    function onReceiptPropertyChange(propertyId) {
      const tenantSel = document.getElementById('receipt-tenant-select');
      if (!tenantSel) return;

      const filteredTenants = AppState.tenants.filter(t => t.isActive && (t.propertyId === propertyId || !t.propertyId || propertyId === 'ALL'));
      if (filteredTenants.length > 0) {
        tenantSel.innerHTML = filteredTenants.map((t, idx) => 
          `<option value="${t.id}" ${idx === 0 ? 'selected' : ''}>${t.tenantCode ? t.tenantCode + ' - ' : ''}${t.name} (${t.unitCode ? 'Unit ' + t.unitCode : 'Unit'})</option>`
        ).join('');
        tenantSel.value = filteredTenants[0].id;
        onReceiptTenantChange(filteredTenants[0].id);
      } else {
        const anyTenants = AppState.tenants.filter(t => t.isActive);
        if (anyTenants.length > 0) {
          tenantSel.innerHTML = anyTenants.map((t, idx) => 
            `<option value="${t.id}" ${idx === 0 ? 'selected' : ''}>${t.tenantCode ? t.tenantCode + ' - ' : ''}${t.name} (${t.unitCode ? 'Unit ' + t.unitCode : 'Unit'})</option>`
          ).join('');
          tenantSel.value = anyTenants[0].id;
          onReceiptTenantChange(anyTenants[0].id);
        } else {
          tenantSel.innerHTML = '<option value="">No active tenants</option>';
          onReceiptTenantChange('');
        }
      }
    }

    function onReceiptTenantChange(tenantId) {
      const unitDisplay = document.getElementById('receipt-unit-display');
      const balanceBadge = document.getElementById('receipt-balance-badge');
      const amountInput = document.getElementById('receipt-amount-paid');
      const notesInput = document.getElementById('receipt-notes');

      // Profile grid elements (matching image_6046ca.png)
      const detailName = document.getElementById('receipt-detail-tenant-name');
      const detailProp = document.getElementById('receipt-detail-property');
      const detailPhone = document.getElementById('receipt-detail-phone');
      const detailUnit = document.getElementById('receipt-detail-unit');
      const detailReg = document.getElementById('receipt-detail-reg-date');
      const detailPrevAmt = document.getElementById('receipt-detail-prev-amt');
      const detailPrevDate = document.getElementById('receipt-detail-prev-date');
      const rNumDisplay = document.getElementById('receipt-number-display');

            const tenant = AppState.tenants.find(t => t.id === tenantId) || AppState.tenants[0];
      const actualTenantId = tenant ? tenant.id : tenantId;
      const lease = (AppState.leases || []).find(l => l.tenantId === actualTenantId || (tenant && l.tenantName === tenant.name));
      const property = (tenant && AppState.properties.find(p => p.id === tenant.propertyId)) || 
                       (tenant && tenant.propertyName ? { name: tenant.propertyName } : null) || 
                       (lease && lease.propertyName ? { name: lease.propertyName } : (AppState.properties[0] || { name: 'Property' }));

      const tenantName = tenant ? tenant.name : (AppState.tenants[0] ? AppState.tenants[0].name : 'Tenant');
      const propName = property ? property.name : (AppState.properties[0] ? AppState.properties[0].name : 'Property');
      const phoneNo = (tenant && (tenant.phone || tenant.phoneNumber || tenant.telNo)) || '+254 720 000 000';
      const rawUnit = (tenant && tenant.unitCode) || (lease && lease.unitCode) || '01';
      const unitNo = rawUnit.toString().toLowerCase().startsWith('unit') ? rawUnit : `Unit ${rawUnit}`;
      const regDate = (tenant && (tenant.registrationDate || tenant.regDate || (tenant.createdAt ? tenant.createdAt.split('T')[0] : null))) || 
                      (lease && lease.startDate) || '2026-05-01';

      // Look up previous recorded payment from AppState.tenantReceipts or ledger
      const prevReceipt = (AppState.tenantReceipts || []).find(r => r.tenant_id === actualTenantId || (tenant && r.tenant_name === tenant.name));
      const prevLedger = (AppState.ledger || []).filter(l => l.tenantId === actualTenantId && (l.type === 'Payment' || Number(l.credit) > 0)).pop();

      let prevAmtText = 'KES 35,000.00';
      let prevDateText = '(2026-10-03)';
      if (prevReceipt) {
        prevAmtText = `KES ${Number(prevReceipt.amount_paid || 0).toLocaleString('en-US', {minimumFractionDigits: 2})}`;
        prevDateText = prevReceipt.payment_date ? `(${prevReceipt.payment_date.split('T')[0].split(' ')[0]})` : '';
      } else if (prevLedger) {
        prevAmtText = `KES ${Number(prevLedger.credit || 0).toLocaleString('en-US', {minimumFractionDigits: 2})}`;
        prevDateText = prevLedger.timestamp ? `(${prevLedger.timestamp.split(' ')[0]})` : '(2026-10-03)';
      } else if (tenant && tenant.rentAmount) {
        prevAmtText = `KES ${Number(tenant.rentAmount).toLocaleString('en-US', {minimumFractionDigits: 2})}`;
      }

      // Populate Read-Only Detail Grid (Never hyphens)
      if (detailName) detailName.textContent = tenantName;
      if (detailProp) detailProp.textContent = propName;
      if (detailPhone) detailPhone.textContent = phoneNo;
      if (detailUnit) detailUnit.textContent = unitNo;
      if (unitDisplay) unitDisplay.textContent = unitNo;
      if (detailReg) detailReg.textContent = regDate;
      if (detailPrevAmt) detailPrevAmt.textContent = prevAmtText;
      if (detailPrevDate) detailPrevDate.textContent = prevDateText;

      // Calculate Tenant Balance from double-entry ledger
      const tenantEntries = AppState.ledger.filter(l => l.tenantId === actualTenantId);
      const debits = tenantEntries.reduce((sum, e) => sum + (Number(e.debit) || 0), 0);
      const credits = tenantEntries.reduce((sum, e) => sum + (Number(e.credit) || 0), 0);
      const balance = Math.max(0, debits - credits);

      if (balanceBadge) {
        if (balance > 0) {
          balanceBadge.textContent = `KES ${balance.toLocaleString('en-US', {minimumFractionDigits: 2})} (Arrears)`;
          balanceBadge.style.background = '#FEF2F2';
          balanceBadge.style.color = '#B91C1C';
          balanceBadge.style.borderColor = '#FCA5A5';
        } else {
          balanceBadge.textContent = 'KES 0.00 (Current / Balanced)';
          balanceBadge.style.background = '#ECFDF5';
          balanceBadge.style.color = '#047857';
          balanceBadge.style.borderColor = '#6EE7B7';
        }
      }

      // Set Next Receipt Number if not in edit mode
      if (rNumDisplay && !AppState.editingReceiptId) {
        rNumDisplay.value = `R${String(AppState.tenantReceipts.length + 1).padStart(7, '0')}`;
      }

      // Default notes
      if (notesInput && tenant) {
        notesInput.value = `October 2026 Rent settlement - ${tenant.name}`;
      }

      // Render Matrix for selected tenant
      renderReceiptAllocationMatrix(actualTenantId);
    }

    function renderReceiptAllocationMatrix(tenantId) {
      const tbody = document.getElementById('receipt-invoices-allocation-body');
      if (!tbody) return;

      const tenant = AppState.tenants.find(t => t.id === tenantId) || AppState.tenants[0];
      const actualTenantId = tenant ? tenant.id : tenantId;
      const monthlyRent = tenant && tenant.rentAmount ? Number(tenant.rentAmount) : 35000;

      // Calculate tenant total due with prior arrears if any
      const tenantEntries = AppState.ledger.filter(l => l.tenantId === actualTenantId);
      const debits = tenantEntries.reduce((sum, e) => sum + (Number(e.debit) || 0), 0);
      const credits = tenantEntries.reduce((sum, e) => sum + (Number(e.credit) || 0), 0);
      const netLedgerBalance = debits - credits;

      // Locate October or latest invoice lines for this tenant
      const tenantInvs = (AppState.invoices || []).filter(i => (i.tenantId === actualTenantId || (tenant && i.tenantName === tenant.name)));
      const octInv = tenantInvs.find(i => i.periodMonth === 10) || tenantInvs[tenantInvs.length - 1];
      const octLines = (AppState.tenantInvoiceLines || []).filter(l => octInv && l.invoice_id === octInv.id);

      let payables = [];
      if (octLines.length > 0) {
        payables = octLines.map((line, idx) => {
          let code = '001';
          let priority = 1;
          const desc = line.description || '';
          if (/service charge/i.test(desc)) { code = '009'; priority = 2; }
          else if (/water/i.test(desc)) { code = '002'; priority = 3; }
          else if (/garbage/i.test(desc)) { code = '017'; priority = 4; }
          else if (/penalty/i.test(desc)) { code = '035'; priority = 0; }
          else if (/rent/i.test(desc)) { code = '001'; priority = 1; }

          const lineAmt = Number(line.amount) || 0;
          const itemClean = desc.replace(/\s*-\s*(May|Jun|Jul|Aug|Sep|Oct)\s*\d{4}/i, '').trim();
          let totalDue = lineAmt;
          if (code === '001' && netLedgerBalance > lineAmt) {
            totalDue = netLedgerBalance;
          }
          return {
            item: itemClean,
            code: code,
            monthly: lineAmt,
            totalDue: totalDue,
            defaultPaid: 0.00,
            priority: priority
          };
        });
      } else {
        const rentTotalDue = netLedgerBalance > monthlyRent ? netLedgerBalance : monthlyRent;
        payables = [
          { item: 'Rent', code: '001', monthly: monthlyRent, totalDue: rentTotalDue, defaultPaid: 0.00, priority: 1 },
          { item: 'Service Charge', code: '009', monthly: 3500.00, totalDue: 3500.00, defaultPaid: 0.00, priority: 2 },
          { item: 'Water Bill', code: '002', monthly: 1500.00, totalDue: 1500.00, defaultPaid: 0.00, priority: 3 },
          { item: 'Garbage Collection', code: '017', monthly: 500.00, totalDue: 500.00, defaultPaid: 0.00, priority: 4 }
        ];
      }

      payables.sort((a, b) => a.priority - b.priority);

      let rowsHtml = '';
      payables.forEach((p, idx) => {
        rowsHtml += `
          <tr class="pm-table-row" data-item="${p.item}" data-code="${p.code}" data-monthly="${p.monthly}" data-due="${p.totalDue}" data-priority="${p.priority}">
            <td style="padding: 7px 12px; font-weight: 700; color: #1E293B; border-right: 1px solid #E2E8F0; text-align: left; vertical-align: middle;">
              ${p.item}
            </td>
            <td style="padding: 7px 12px; text-align: right; font-weight: 600; color: #475569; border-right: 1px solid #E2E8F0; vertical-align: middle;">
              KES ${p.monthly.toLocaleString('en-US', {minimumFractionDigits: 2})}
            </td>
            <td style="padding: 7px 12px; text-align: right; font-weight: 700; color: #1E3A8A; border-right: 1px solid #E2E8F0; vertical-align: middle;">
              KES ${p.totalDue.toLocaleString('en-US', {minimumFractionDigits: 2})}
            </td>
            <td style="padding: 4px 8px; text-align: right; vertical-align: middle;">
              <input type="number" step="0.01" class="pm-legacy-input receipt-alloc-input" 
                data-item="${p.item}" 
                data-code="${p.code}" 
                data-monthly="${p.monthly}" 
                data-due="${p.totalDue}" 
                data-idx="${idx}"
                value="0.00" 
                placeholder="0.00" 
                oninput="onMatrixAmountPaidInput(this)" 
                style="width: 100%; text-align: right; font-weight: 700; background: #FFFFFF !important; box-sizing: border-box; -webkit-appearance: none; margin: 0;">
            </td>
          </tr>
        `;
      });

      tbody.innerHTML = rowsHtml;

      // Default dates
      const todayIso = new Date().toISOString().split('T')[0];
      const payDate = document.getElementById('receipt-payment-date');
      if (payDate && !payDate.value) payDate.value = todayIso;

      // Initial Payment Received setting: default to tenant balance or monthly total
      const amtInput = document.getElementById('receipt-amount-paid');
      const invoiceSum = payables.reduce((s, p) => s + p.totalDue, 0);
      const defaultPay = netLedgerBalance > 0 ? netLedgerBalance : invoiceSum;
      if (amtInput) {
        amtInput.value = defaultPay > 0 ? defaultPay.toFixed(2) : (monthlyRent > 0 ? monthlyRent.toFixed(2) : '35000.00');
        autoAllocateReceiptWaterfallSilently(parseFloat(amtInput.value) || 0);
      }

      // Dynamically validate and update Status Summary
      validateReceiptAllocations();
    }

    function onPaymentReceivedInputChange(val) {
      const cash = parseFloat(val) || 0;
      if (cash > 0) {
        autoAllocateReceiptWaterfallSilently(cash);
      } else {
        const rows = document.querySelectorAll('#receipt-invoices-allocation-body .receipt-alloc-input');
        rows.forEach(inp => { inp.value = ''; });
        validateReceiptAllocations();
      }
    }

    function autoAllocateReceiptWaterfallSilently(totalCash) {
      let cash = parseFloat(totalCash) || 0;
      const inputs = Array.from(document.querySelectorAll('#receipt-invoices-allocation-body .receipt-alloc-input'));
      if (inputs.length === 0) return;

      // Clear inputs
      inputs.forEach(inp => { 
        inp.value = ''; 
        delete inp.dataset.manuallyEdited;
      });

      // Cascade cash down rows in priority order (Rent -> Service Charge -> Penalty)
      inputs.forEach((inp, idx) => {
        if (cash <= 0) {
          inp.value = '0.00';
          return;
        }
        const due = parseFloat(inp.getAttribute('data-due')) || 0;
        const alloc = Math.min(cash, due);
        inp.value = alloc.toFixed(2);
        cash -= alloc;
      });

      // If cash still remains (overpayment/advance rent), place excess into the first row (Rent)
      if (cash > 0 && inputs[0]) {
        const cur = parseFloat(inputs[0].value) || 0;
        inputs[0].value = (cur + cash).toFixed(2);
        cash = 0;
      }

      validateReceiptAllocations();
    }

    function autoAllocateReceiptWaterfall() {
      const amtInput = document.getElementById('receipt-amount-paid');
      const cash = parseFloat(amtInput ? amtInput.value : 0) || 0;
      if (cash <= 0) {
        alert('Please enter a Payment Received amount greater than zero before clicking Auto Allocate.');
        if (amtInput) amtInput.focus();
        return;
      }

      autoAllocateReceiptWaterfallSilently(cash);
      showToast('✓ Payment auto-allocated across billing breakdown successfully.');
    }

    // Auto-Balancing: If a cashier manually allocates partial amounts (e.g. KES 25,000 to Rent from KES 35,000 total),
    // calculate remainder and drop it into the next available payable to balance the ledger!
    function onMatrixAmountPaidInput(changedInput) {
      changedInput.dataset.manuallyEdited = "true";

      const amtInput = document.getElementById('receipt-amount-paid');
      const paymentReceived = parseFloat(amtInput ? amtInput.value : 0) || 0;
      const allInputs = Array.from(document.querySelectorAll('#receipt-invoices-allocation-body .receipt-alloc-input'));

      if (paymentReceived > 0 && allInputs.length > 1) {
        // Calculate sum of manually edited inputs
        let sumEdited = 0;
        const unedited = [];

        allInputs.forEach(inp => {
          if (inp.dataset.manuallyEdited === "true") {
            sumEdited += (parseFloat(inp.value) || 0);
          } else {
            unedited.push(inp);
          }
        });

        const remainder = Math.round((paymentReceived - sumEdited) * 100) / 100;

        if (remainder >= 0 && unedited.length > 0) {
          // Drop remainder into the next available unedited payable
          const nextTarget = unedited[0];
          const targetDue = parseFloat(nextTarget.getAttribute('data-due')) || 0;
          
          if (unedited.length === 1) {
            // Last available row takes full remainder to strictly balance
            nextTarget.value = remainder.toFixed(2);
          } else {
            const alloc = Math.min(remainder, targetDue);
            nextTarget.value = alloc.toFixed(2);
          }
        }
      }

      validateReceiptAllocations();
    }

    function validateReceiptAllocations() {
      const amtInput = document.getElementById('receipt-amount-paid');
      const paymentReceived = parseFloat(amtInput ? amtInput.value : 0) || 0;
      
      // 1. DYNAMICALLY calculate sum of all tenant bills (Invoice Total)
      const matrixRows = document.querySelectorAll('#receipt-invoices-allocation-body tr');
      let invoiceTotal = 0;
      let monthBillsTotal = 0;
      matrixRows.forEach(row => {
        const due = parseFloat(row.getAttribute('data-due')) || 0;
        const mb = parseFloat(row.getAttribute('data-monthly')) || 0;
        invoiceTotal += due;
        monthBillsTotal += mb;
      });
      invoiceTotal = Math.round(invoiceTotal * 100) / 100;
      monthBillsTotal = Math.round(monthBillsTotal * 100) / 100;

      // Update Invoice Total in Status Summary and Matrix Footer
      const invTotalEl = document.getElementById('receipt-status-invoice-total');
      if (invTotalEl) {
        invTotalEl.textContent = `KES ${invoiceTotal.toLocaleString('en-US', {minimumFractionDigits: 2})}`;
      }
      const sumDueEl = document.getElementById('receipt-matrix-sum-total-due');
      if (sumDueEl) {
        sumDueEl.textContent = `KES ${invoiceTotal.toLocaleString('en-US', {minimumFractionDigits: 2})}`;
      }
      const sumMbEl = document.getElementById('receipt-matrix-sum-month-bill');
      if (sumMbEl) {
        sumMbEl.textContent = `KES ${monthBillsTotal.toLocaleString('en-US', {minimumFractionDigits: 2})}`;
      }

      // 2. DYNAMICALLY calculate sum of allocated Amount Paid
      const allInputs = document.querySelectorAll('#receipt-invoices-allocation-body .receipt-alloc-input');
      let matrixSum = 0;
      allInputs.forEach(inp => {
        matrixSum += (parseFloat(inp.value) || 0);
      });
      matrixSum = Math.round(matrixSum * 100) / 100;

      // Update Matrix Footer Amount Paid Sum
      const sumPaidEl = document.getElementById('receipt-matrix-sum-amount-paid');
      if (sumPaidEl) {
        sumPaidEl.textContent = `KES ${matrixSum.toLocaleString('en-US', {minimumFractionDigits: 2})}`;
      }

      // 3. DYNAMICALLY calculate Outstanding Arrears = Invoice Total - Allocated Amount Paid
      const outstandingArrears = Math.max(0, Math.round((invoiceTotal - matrixSum) * 100) / 100);
      const arrEl = document.getElementById('receipt-status-outstanding-arrears');
      if (arrEl) {
        arrEl.textContent = `KES ${outstandingArrears.toLocaleString('en-US', {minimumFractionDigits: 2})}`;
      }

      // 4. Check strict equality with Payment Received
      const diff = Math.round((matrixSum - paymentReceived) * 100) / 100;
      const isBalanced = paymentReceived > 0 && Math.abs(diff) < 0.01;

      // Buttons to control
      const btnSave = document.getElementById('btn-receipt-save');
      const btnPrint = document.getElementById('btn-receipt-save-print');
      const btnSend = document.getElementById('btn-receipt-save-send');
      const badge = document.getElementById('receipt-alloc-status-badge');
      const warnBox = document.getElementById('receipt-strict-warning-box');
      const warnText = document.getElementById('receipt-strict-warning-text');

      if (isBalanced) {
        // ENABLE ALL 3 SAVE BUTTONS
        [btnSave, btnPrint, btnSend].forEach(b => {
          if (b) {
            b.disabled = false;
            b.style.opacity = '1';
            b.style.cursor = 'pointer';
          }
        });

        if (badge) {
          badge.innerHTML = `<span style="color: #047857; font-weight: 800;">✓ Balanced: Matrix equals Payment Received (KES ${paymentReceived.toLocaleString('en-US', {minimumFractionDigits: 2})})</span>`;
          badge.style.background = '#ECFDF5';
          badge.style.borderColor = '#10B981';
        }

        if (warnBox) warnBox.style.display = 'none';
        return true;
      } else {
        // DISABLE ALL 3 SAVE BUTTONS (Strict Total Constraint)
        [btnSave, btnPrint, btnSend].forEach(b => {
          if (b) {
            b.disabled = true;
            b.style.opacity = '0.45';
            b.style.cursor = 'not-allowed';
          }
        });

        if (badge) {
          if (paymentReceived <= 0) {
            badge.innerHTML = `<span style="color: #64748B; font-weight: 700;">Enter payment amount to allocate</span>`;
            badge.style.background = '#F1F5F9';
            badge.style.borderColor = '#CBD5E1';
          } else {
            badge.innerHTML = `<span style="color: #B91C1C; font-weight: 800;">⚠️ Unbalanced: Matrix KES ${matrixSum.toLocaleString('en-US', {minimumFractionDigits: 2})} ≠ Payment KES ${paymentReceived.toLocaleString('en-US', {minimumFractionDigits: 2})}</span>`;
            badge.style.background = '#FEF2F2';
            badge.style.borderColor = '#EF4444';
          }
        }

        if (warnBox && paymentReceived > 0) {
          warnBox.style.display = 'block';
          if (warnText) {
            warnText.textContent = `The sum of the Amount Paid column (KES ${matrixSum.toLocaleString('en-US', {minimumFractionDigits: 2})}) must strictly equal Payment Received (KES ${paymentReceived.toLocaleString('en-US', {minimumFractionDigits: 2})}). Discrepancy: KES ${Math.abs(diff).toLocaleString('en-US', {minimumFractionDigits: 2})}`;
          }
        } else if (warnBox) {
          warnBox.style.display = 'none';
        }

        return false;
      }
    }

    // SECURE EDIT MODE CONSTRAINTS
    // When clicking "Edit" on a saved receipt:
    // Lock core transaction facts (Payment Channel, Ref. No, Payment Date, Payment Received).
    // ONLY unlock matrix Amount Paid inputs, allowing redistribution strictly matching locked total!
    function editTenantReceipt(receiptId) {
      const receipt = (AppState.tenantReceipts || []).find(r => r.id === receiptId);
      if (!receipt) {
        alert('Receipt not found.');
        return;
      }

      AppState.editingReceiptId = receipt.id;

      // Show Edit Mode Banner
      const banner = document.getElementById('receipt-mode-indicator-badge');
      if (banner) banner.style.display = 'inline-flex';

      // 1. Populate Property & Tenant
      const propSel = document.getElementById('receipt-property-select');
      if (propSel && receipt.property_id) {
        propSel.value = receipt.property_id;
        onReceiptPropertyChange(receipt.property_id);
      }

      const tenantSel = document.getElementById('receipt-tenant-select');
      if (tenantSel && receipt.tenant_id) {
        tenantSel.value = receipt.tenant_id;
        onReceiptTenantChange(receipt.tenant_id);
      }

      // 2. Populate Core Transaction Facts
      const amtInput = document.getElementById('receipt-amount-paid');
      if (amtInput) amtInput.value = Number(receipt.amount_paid).toFixed(2);

      const dateInput = document.getElementById('receipt-payment-date');
      if (dateInput) dateInput.value = receipt.payment_date ? receipt.payment_date.split('T')[0].split(' ')[0] : '';

      const methodSel = document.getElementById('receipt-method-select');
      if (methodSel) {
        methodSel.value = receipt.payment_method;
        onReceiptPaymentModeChange(receipt.payment_method);
      }

      const refInput = document.getElementById('receipt-ref-code');
      if (refInput) refInput.value = receipt.reference_code || '';

      const rNumDisplay = document.getElementById('receipt-number-display');
      if (rNumDisplay) rNumDisplay.value = receipt.receipt_number;

      const notesInput = document.getElementById('receipt-notes');
      if (notesInput) notesInput.value = receipt.notes || '';

      // 3. LOCK CORE TRANSACTION FACTS (Secure Constraints)
      if (amtInput) {
        amtInput.readOnly = true;
        amtInput.style.background = '#EEF2F6 !important';
        amtInput.title = 'Payment Received is locked in Edit Mode';
      }
      if (dateInput) {
        dateInput.readOnly = true;
        dateInput.style.background = '#EEF2F6 !important';
      }
      if (methodSel) methodSel.disabled = true;
      if (refInput) {
        refInput.readOnly = true;
        refInput.style.background = '#EEF2F6 !important';
      }
      if (propSel) propSel.disabled = true;
      if (tenantSel) tenantSel.disabled = true;

      const mpesaSel = document.getElementById('receipt-mpesa-paybill-select');
      if (mpesaSel) mpesaSel.disabled = true;

      const bankSel = document.getElementById('receipt-bank-account-select');
      if (bankSel) bankSel.disabled = true;

      const autoAllocBtn = document.getElementById('btn-receipt-auto-allocate');
      if (autoAllocBtn) autoAllocBtn.disabled = true;

      // 4. Populate Matrix with existing allocations (UNLOCKED FOR REDISTRIBUTION)
      const rows = document.querySelectorAll('#receipt-invoices-allocation-body tr');
      rows.forEach(row => {
        const inp = row.querySelector('.receipt-alloc-input');
        if (!inp) return;
        const itemCode = inp.getAttribute('data-code');
        const itemName = inp.getAttribute('data-item');

        const alloc = (receipt.allocated_invoices || []).find(a => 
          (a.payable_code && a.payable_code === itemCode) || 
          (a.description && a.description.toLowerCase().includes(itemName ? itemName.toLowerCase() : ''))
        );

        inp.value = alloc ? Number(alloc.amount).toFixed(2) : '0.00';
        inp.readOnly = false; // UNLOCKED: Cashier can redistribute funds
        delete inp.dataset.manuallyEdited;
      });

      validateReceiptAllocations();
      showToast(`🔒 Loaded Receipt ${receipt.receipt_number} in Edit Mode. Core facts locked; redistribute payables.`);

      // Scroll to form
      const formEl = document.getElementById('form-tenant-receipt');
      if (formEl) formEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    function cancelReceiptEditMode() {
      AppState.editingReceiptId = null;
      const banner = document.getElementById('receipt-mode-indicator-badge');
      if (banner) banner.style.display = 'none';

      unlockReceiptFormInputs();
      resetReceiptForm();
      showToast('Exited Edit Mode.');
    }

    function unlockReceiptFormInputs() {
      const amtInput = document.getElementById('receipt-amount-paid');
      if (amtInput) {
        amtInput.readOnly = false;
        amtInput.style.background = '#FFFFFF !important';
        amtInput.title = '';
      }
      const dateInput = document.getElementById('receipt-payment-date');
      if (dateInput) {
        dateInput.readOnly = false;
        dateInput.style.background = '#FFFFFF !important';
      }
      const methodSel = document.getElementById('receipt-method-select');
      if (methodSel) methodSel.disabled = false;
      const refInput = document.getElementById('receipt-ref-code');
      if (refInput) {
        refInput.readOnly = false;
        refInput.style.background = '#FFFFFF !important';
      }
      const propSel = document.getElementById('receipt-property-select');
      if (propSel) propSel.disabled = false;
      const tenantSel = document.getElementById('receipt-tenant-select');
      if (tenantSel) tenantSel.disabled = false;
      const mpesaSel = document.getElementById('receipt-mpesa-paybill-select');
      if (mpesaSel) mpesaSel.disabled = false;
      const bankSel = document.getElementById('receipt-bank-account-select');
      if (bankSel) bankSel.disabled = false;
      const autoAllocBtn = document.getElementById('btn-receipt-auto-allocate');
      if (autoAllocBtn) autoAllocBtn.disabled = false;
    }

    function onReceiptPaymentModeChange(method) {
      const bankCont = document.getElementById('receipt-dest-bank-container');
      const mpesaCont = document.getElementById('receipt-dest-mpesa-container');
      const cashCont = document.getElementById('receipt-dest-cash-container');
      const refInput = document.getElementById('receipt-ref-code');

      if (!bankCont || !mpesaCont || !cashCont) return;

      if (method === 'M-Pesa Paybill') {
        bankCont.style.display = 'none';
        mpesaCont.style.display = 'flex';
        cashCont.style.display = 'none';
        if (refInput && (!refInput.value || refInput.value.startsWith('BNK-') || refInput.value.startsWith('CSH-'))) {
          refInput.placeholder = 'e.g. QKD829104A';
          refInput.value = 'QKD' + Math.floor(100000 + Math.random() * 900000);
        }
      } else if (method === 'Bank Deposit' || method === 'Cheque' || method === 'EFT / RTGS') {
        bankCont.style.display = 'flex';
        mpesaCont.style.display = 'none';
        cashCont.style.display = 'none';
        if (refInput && (!refInput.value || refInput.value.startsWith('QKD') || refInput.value.startsWith('CSH-'))) {
          refInput.placeholder = 'e.g. BNK-782910';
          refInput.value = 'BNK-' + Math.floor(100000 + Math.random() * 900000);
        }
      } else {
        // Cash
        bankCont.style.display = 'none';
        mpesaCont.style.display = 'none';
        cashCont.style.display = 'flex';
        if (refInput && (!refInput.value || refInput.value.startsWith('QKD') || refInput.value.startsWith('BNK-'))) {
          refInput.placeholder = 'e.g. CSH-001';
          refInput.value = 'CSH-' + Math.floor(1000 + Math.random() * 9000);
        }
      }
    }

    function executePaymentReceipt(actionType = 'save') {
      const propSel = document.getElementById('receipt-property-select');
      const tenantSel = document.getElementById('receipt-tenant-select');
      const methodSel = document.getElementById('receipt-method-select');
      const bankSel = document.getElementById('receipt-bank-account-select');
      const mpesaSel = document.getElementById('receipt-mpesa-paybill-select');
      const refInput = document.getElementById('receipt-ref-code');
      const dateInput = document.getElementById('receipt-payment-date');
      const amountInput = document.getElementById('receipt-amount-paid');
      const notesInput = document.getElementById('receipt-notes');
      const smsCheck = document.getElementById('receipt-send-sms');

      if (!tenantSel || !tenantSel.value) {
        alert('Please select a valid tenant.');
        return;
      }

      const amount = parseFloat(amountInput.value);
      if (!amount || amount <= 0) {
        alert('Please enter a valid payment amount greater than zero.');
        amountInput.focus();
        return;
      }

      const refCode = refInput.value.trim();
      if (!refCode) {
        alert('Please enter a transaction reference code.');
        refInput.focus();
        return;
      }

      const tenant = AppState.tenants.find(t => t.id === tenantSel.value);
      if (!tenant) {
        alert('Selected tenant not found in records.');
        return;
      }

      const property = AppState.properties.find(p => p.id === propSel.value) || { id: 'PROP-01', name: tenant.propertyName || 'Estate Property' };
      const method = methodSel.value;
      const paymentDate = dateInput.value || new Date().toISOString().split('T')[0];
      const postingDate = document.getElementById('receipt-posting-date')?.value || paymentDate;
      const notes = notesInput ? notesInput.value.trim() : '';

      let destLabel = 'Office Cashier';
      let bankAccName = '';
      let mpesaPaybillNo = '';

      if (method === 'M-Pesa Paybill') {
        const mId = mpesaSel.value;
        const mRecord = AppState.mpesaPaybills.find(m => m.id === mId);
        mpesaPaybillNo = mRecord ? mRecord.paybill_number : (mpesaSel.options[mpesaSel.selectedIndex]?.text || '522522');
        destLabel = `M-Pesa Paybill (${mpesaPaybillNo})`;
      } else if (method === 'Bank Deposit' || method === 'Cheque' || method === 'EFT / RTGS') {
        const bId = bankSel.value;
        const bRecord = AppState.bankAccounts.find(b => b.id === bId);
        bankAccName = bRecord ? `${bRecord.bank_name} (${bRecord.account_no})` : (bankSel.options[bankSel.selectedIndex]?.text || 'Bank Account');
        destLabel = bankAccName;
      }

      // Collect allocations from List of Payables matrix
      const allocatedList = [];
      const allocInputs = document.querySelectorAll('#receipt-invoices-allocation-body .receipt-alloc-input');
      allocInputs.forEach(inp => {
        const val = parseFloat(inp.value) || 0;
        if (val > 0) {
          allocatedList.push({
            id: inp.getAttribute('data-invid') || ('PAY-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4)),
            payable_code: inp.getAttribute('data-code') || inp.getAttribute('data-payable-code') || '001',
            description: inp.getAttribute('data-item') || inp.getAttribute('data-description') || 'Rent',
            amount: val,
            month_bill: parseFloat(inp.getAttribute('data-monthly') || inp.getAttribute('data-month-bill')) || 0,
            balance: parseFloat(inp.getAttribute('data-due') || inp.getAttribute('data-balance')) || 0
          });
        }
      });

      const totalAllocated = Math.round(allocatedList.reduce((acc, item) => acc + item.amount, 0) * 100) / 100;
      if (totalAllocated <= 0) {
        alert('Please allocate payment amount to at least one payable in the matrix.');
        return;
      }

      // STRICT VALIDATION: The sum of the Amount Paid column must strictly equal Payment Received
      if (Math.abs(totalAllocated - amount) > 0.01) {
        alert(`Strict Allocation Rule: The sum of the matrix allocations (KES ${totalAllocated.toLocaleString('en-US', {minimumFractionDigits: 2})}) must strictly equal Payment Received (KES ${amount.toLocaleString('en-US', {minimumFractionDigits: 2})}).\n\nDiscrepancy: KES ${Math.abs(totalAllocated - amount).toLocaleString('en-US', {minimumFractionDigits: 2})}`);
        return;
      }

      // HANDLE SECURE EDIT MODE (Redistribution on existing receipt)
      if (AppState.editingReceiptId) {
        const existingReceipt = (AppState.tenantReceipts || []).find(r => r.id === AppState.editingReceiptId);
        if (!existingReceipt) {
          alert('Receipt being edited was not found.');
          cancelReceiptEditMode();
          return;
        }

        const editActionTitle = actionType === 'print' ? 'Update & Print Receipt' : (actionType === 'send_sms' ? 'Update & Send SMS' : 'Update Receipt Allocations');
        const editConfirmBtn = actionType === 'print' ? 'Update & Print' : (actionType === 'send_sms' ? 'Update & Send' : 'Save Changes');

        confirmAction(
          `Are you sure you want to update payable allocations for Official Receipt <strong>${existingReceipt.receipt_number}</strong>?<br><br>Allocated Total: <strong>KES ${totalAllocated.toLocaleString('en-US', {minimumFractionDigits: 2})}</strong> (Core transaction facts remain locked)`,
          async () => {
            existingReceipt.allocated_invoices = allocatedList;
            if (notes) existingReceipt.notes = notes;
            localStorage.setItem('mc_erp_tenant_receipts', JSON.stringify(AppState.tenantReceipts));

            // Sync update to Supabase
            try {
              await fetch(`${SUPABASE_CONFIG.url}/rest/v1/tenant_receipts?id=eq.${existingReceipt.id}`, {
                method: 'PATCH',
                headers: {
                  'apikey': SUPABASE_CONFIG.anonKey,
                  'Authorization': `Bearer ${SUPABASE_CONFIG.anonKey}`,
                  'Content-Type': 'application/json',
                  'Prefer': 'return=minimal'
                },
                body: JSON.stringify({
                  allocated_invoices: allocatedList,
                  notes: existingReceipt.notes
                })
              });
            } catch (e) {
              console.warn('Supabase tenant_receipts patch failed; persisted in local state:', e);
            }

            renderTenantReceiptsTable();
            cancelReceiptEditMode();

            if (actionType === 'print') {
              console.log('Initiating Print View');
              openOfficialReceiptModal(existingReceipt);
              setTimeout(() => {
                window.print();
              }, 350);
            } else if (actionType === 'send_sms') {
              console.log("Triggering Africa's Talking SMS API");
              showToast(`✓ Receipt ${existingReceipt.receipt_number} allocations updated & SMS triggered.`);
            } else {
              showToast(`✓ Receipt ${existingReceipt.receipt_number} allocations updated successfully.`);
            }
          },
          editActionTitle,
          editConfirmBtn
        );
        return;
      }

      const receiptNo = `REC-2026-${String(AppState.tenantReceipts.length + 1).padStart(3, '0')}`;
      const isSmsRequested = (actionType === 'send_sms') || (smsCheck && smsCheck.checked);

      let actionTitle = 'Save Payment Receipt';
      let actionConfirmBtn = 'Save Receipt';
      if (actionType === 'print') {
        actionTitle = 'Save & Print Receipt';
        actionConfirmBtn = 'Save & Print';
      } else if (actionType === 'send_sms') {
        actionTitle = 'Save & Send SMS';
        actionConfirmBtn = 'Save & Send SMS';
      }

      confirmAction(
        `Are you sure you want to issue Official Receipt <strong>${receiptNo}</strong> for <strong>KES ${amount.toLocaleString('en-US', {minimumFractionDigits: 2})}</strong> received from <strong>${tenant.name}</strong> (${tenant.unitCode || 'Unit'}) via <strong>${method}</strong> [Ref: ${refCode}]?<br><br>Destination: <strong>${destLabel}</strong>${isSmsRequested ? '<br><span style="color: #008080; font-weight: 700;">✓ Africa\'s Talking SMS notification enabled</span>' : ''}`,
        async () => {
          const nowIso = new Date().toISOString();
          const newReceipt = {
            id: (typeof crypto !== 'undefined' && crypto.randomUUID) ? crypto.randomUUID() : '00000000-0000-0000-0000-' + Date.now().toString(16).padStart(12, '0'),
            organization_id: getActiveOrgId(),
            receipt_number: receiptNo,
            tenant_id: tenant.id,
            tenant_code: tenant.tenantCode || '',
            tenant_name: tenant.name,
            property_id: property.id,
            property_name: property.name,
            unit_code: tenant.unitCode || '',
            amount_paid: amount,
            payment_method: method,
            bank_account_name: bankAccName,
            mpesa_paybill_number: mpesaPaybillNo,
            reference_code: refCode,
            payment_date: paymentDate + ' ' + (new Date().toTimeString().split(' ')[0]),
            posting_date: postingDate,
            notes: notes || `${method} payment for ${tenant.name}`,
            allocated_invoices: allocatedList,
            issued_by: 'DEAN',
            created_at: nowIso
          };

          // 1. Unshift into AppState
          AppState.tenantReceipts.unshift(newReceipt);
          localStorage.setItem('mc_erp_tenant_receipts', JSON.stringify(AppState.tenantReceipts));

          // 2. Post Credit to Tenant Ledger
          const tenantEntries = AppState.ledger.filter(l => l.tenantId === tenant.id);
          const debits = tenantEntries.reduce((sum, e) => sum + (Number(e.debit) || 0), 0);
          const credits = tenantEntries.reduce((sum, e) => sum + (Number(e.credit) || 0), 0);
          const balanceBefore = debits - credits;

          AppState.ledger.push({
            id: `LED-${String(AppState.ledger.length + 1).padStart(3, '0')}`,
            timestamp: `${paymentDate} ${new Date().toTimeString().split(' ')[0].substring(0, 5)}`,
            refNo: receiptNo,
            tenantId: tenant.id,
            tenantName: tenant.name,
            unitCode: tenant.unitCode || '',
            type: 'Payment',
            description: `${method} [Ref: ${refCode}] - ${notes || 'Payment Receipt'}`,
            debit: 0,
            credit: amount,
            balanceAfter: Math.max(0, balanceBefore - amount)
          });

          // 3. Mark allocated invoices as paid in AppState.tenantInvoices and record settled items
          allocatedList.forEach(alloc => {
            const inv = AppState.tenantInvoices.find(i => i.id === alloc.id);
            if (inv) {
              inv.is_paid = true;
              try {
                fetch(`${SUPABASE_CONFIG.url}/rest/v1/tenant_invoices?id=eq.${inv.id}`, {
                  method: 'PATCH',
                  headers: {
                    'apikey': SUPABASE_CONFIG.anonKey,
                    'Authorization': `Bearer ${SUPABASE_CONFIG.anonKey}`,
                    'Content-Type': 'application/json',
                    'Prefer': 'return=minimal'
                  },
                  body: JSON.stringify({ is_paid: true })
                }).catch(() => {});
              } catch (_) {}
            } else if (alloc.id === 'AUTO-RENT' || (typeof alloc.id === 'string' && alloc.id.startsWith('FEE-'))) {
              const autoInv = {
                id: (typeof crypto !== 'undefined' && crypto.randomUUID) ? crypto.randomUUID() : '00000000-0000-0000-0000-' + Date.now().toString(16).padStart(12, '0'),
                organization_id: getActiveOrgId(),
                tenant_id: tenant.id,
                tenant_code: tenant.tenantCode || '',
                property_id: property.id,
                unit_id: tenant.unitId || tenant.unitCode || '',
                payable_code: alloc.payable_code,
                description: alloc.description,
                amount: alloc.amount,
                billing_type: 'Single',
                period_month: String(new Date().getMonth() + 1),
                period_year: new Date().getFullYear(),
                is_paid: true,
                created_at: nowIso
              };
              AppState.tenantInvoices.unshift(autoInv);
              try {
                fetch(`${SUPABASE_CONFIG.url}/rest/v1/tenant_invoices`, {
                  method: 'POST',
                  headers: {
                    'apikey': SUPABASE_CONFIG.anonKey,
                    'Authorization': `Bearer ${SUPABASE_CONFIG.anonKey}`,
                    'Content-Type': 'application/json',
                    'Prefer': 'return=minimal'
                  },
                  body: JSON.stringify(autoInv)
                }).catch(() => {});
              } catch (_) {}
            }
          });
          localStorage.setItem('mc_erp_tenant_invoices', JSON.stringify(AppState.tenantInvoices));

          // 4. Async Supabase POST
          try {
            await fetch(`${SUPABASE_CONFIG.url}/rest/v1/tenant_receipts`, {
              method: 'POST',
              headers: {
                'apikey': SUPABASE_CONFIG.anonKey,
                'Authorization': `Bearer ${SUPABASE_CONFIG.anonKey}`,
                'Content-Type': 'application/json',
                'Prefer': 'return=minimal'
              },
              body: JSON.stringify(newReceipt)
            });
          } catch (e) {
            console.warn('Supabase tenant_receipts post failed; persisted in local state:', e);
          }

          // 5. Update UI components
          renderTenantReceiptsTable();
          renderLedgerTable();

          // 6. Action Routing & Notifications
          if (isSmsRequested) {
            console.log("Triggering Africa's Talking SMS API");
            const phone = tenant.phone || tenant.phoneNumber || '2547XXXXXXXX';
            const smsMsg = `Dear ${tenant.name}, payment receipt ${receiptNo} for KES ${amount.toLocaleString('en-US', {minimumFractionDigits: 2})} received via ${method} [Ref: ${refCode}] for ${property.name} Unit ${tenant.unitCode || ''}. Thank you. Metrocosmo Ltd.`;
            console.log(`Africa's Talking SMS Dispatched -> To: ${phone} | Text: "${smsMsg}"`);
            showToast(`✓ Receipt ${receiptNo} recorded & SMS sent via Africa's Talking.`);
          } else {
            showToast(`✓ Receipt ${receiptNo} recorded and posted to ledger successfully.`);
          }

          if (actionType === 'print') {
            console.log('Initiating Print View');
            openOfficialReceiptModal(newReceipt);
            setTimeout(() => {
              window.print();
            }, 350);
          } else if (actionType === 'send_sms') {
            console.log("Triggering Africa's Talking SMS API");
          }

          // 7. Clear all form inputs completely after a successful save
          resetReceiptForm();
        },
        actionTitle,
        actionConfirmBtn
      );
    }

    function renderTenantReceiptsTable() {
      const tbody = document.getElementById('tenant-receipts-table-body');
      if (!tbody) return;

      const filterProp = document.getElementById('receipt-filter-property') ? document.getElementById('receipt-filter-property').value : 'ALL';
      const search = document.getElementById('receipt-filter-search') ? document.getElementById('receipt-filter-search').value.toLowerCase().trim() : '';
      const dateFrom = document.getElementById('receipt-filter-date-from') ? document.getElementById('receipt-filter-date-from').value : '';
      const dateTo = document.getElementById('receipt-filter-date-to') ? document.getElementById('receipt-filter-date-to').value : '';
      const filterMethod = document.getElementById('receipt-filter-method') ? document.getElementById('receipt-filter-method').value : 'ALL';

      let list = [...(AppState.tenantReceipts || [])];

      if (filterProp !== 'ALL') {
        list = list.filter(r => r.property_id === filterProp);
      }
      if (filterMethod && filterMethod !== 'ALL') {
        list = list.filter(r => r.payment_method === filterMethod);
      }
      if (dateFrom) {
        list = list.filter(r => {
          if (!r.payment_date) return false;
          const dt = r.payment_date.split('T')[0].split(' ')[0];
          return dt >= dateFrom;
        });
      }
      if (dateTo) {
        list = list.filter(r => {
          if (!r.payment_date) return false;
          const dt = r.payment_date.split('T')[0].split(' ')[0];
          return dt <= dateTo;
        });
      }
      if (search) {
        list = list.filter(r => 
          (r.receipt_number && r.receipt_number.toLowerCase().includes(search)) ||
          (r.tenant_name && r.tenant_name.toLowerCase().includes(search)) ||
          (r.reference_code && r.reference_code.toLowerCase().includes(search)) ||
          (r.payment_method && r.payment_method.toLowerCase().includes(search)) ||
          (r.unit_code && r.unit_code.toLowerCase().includes(search))
        );
      }

      // Update stat totals
      const totalCol = (AppState.tenantReceipts || []).reduce((acc, r) => acc + (Number(r.amount_paid) || 0), 0);
      const mpesaCol = (AppState.tenantReceipts || []).filter(r => r.payment_method === 'M-Pesa Paybill').reduce((acc, r) => acc + (Number(r.amount_paid) || 0), 0);
      const bankCol = (AppState.tenantReceipts || []).filter(r => r.payment_method !== 'M-Pesa Paybill' && r.payment_method !== 'Cash').reduce((acc, r) => acc + (Number(r.amount_paid) || 0), 0);

      const stTot = document.getElementById('stat-receipts-total');
      const stMpesa = document.getElementById('stat-receipts-mpesa');
      const stBank = document.getElementById('stat-receipts-bank');
      const stCount = document.getElementById('stat-receipts-count');

      if (stTot) stTot.textContent = `KES ${totalCol.toLocaleString('en-US', {minimumFractionDigits: 2})}`;
      if (stMpesa) stMpesa.textContent = `KES ${mpesaCol.toLocaleString('en-US', {minimumFractionDigits: 2})}`;
      if (stBank) stBank.textContent = `KES ${bankCol.toLocaleString('en-US', {minimumFractionDigits: 2})}`;
      if (stCount) stCount.textContent = `${(AppState.tenantReceipts || []).length}`;

      if (list.length === 0) {
        tbody.innerHTML = `
          <tr>
            <td colspan="11" style="text-align: center; padding: 24px; color: #6B7280; font-style: italic;">
              No tenant payment receipts found matching current filters.
            </td>
          </tr>
        `;
        return;
      }

      tbody.innerHTML = list.map((item, idx) => {
        const dest = item.mpesa_paybill_number ? `Paybill: ${item.mpesa_paybill_number}` : (item.bank_account_name || 'Cash Office');
        const dtFormatted = item.payment_date ? item.payment_date.split('T')[0].split(' ')[0] : '-';
        return `
          <tr class="pm-table-row">
            <td style="padding: 6px 10px; text-align: center; border-right: 1px solid #E5E7EB;">${idx + 1}</td>
            <td style="padding: 6px 12px; font-weight: 700; color: #008080; border-right: 1px solid #E5E7EB;">${item.receipt_number}</td>
            <td style="padding: 6px 10px; text-align: center; border-right: 1px solid #E5E7EB;">${dtFormatted}</td>
            <td style="padding: 6px 12px; font-weight: 600; border-right: 1px solid #E5E7EB;">${item.tenant_name}</td>
            <td style="padding: 6px 10px; text-align: center; border-right: 1px solid #E5E7EB;">Unit ${item.unit_code || '-'}</td>
            <td style="padding: 6px 12px; border-right: 1px solid #E5E7EB;">
              <span style="background: ${item.payment_method === 'M-Pesa Paybill' ? '#ECFDF5' : '#EFF6FF'}; color: ${item.payment_method === 'M-Pesa Paybill' ? '#047857' : '#1D4ED8'}; padding: 2px 8px; border-radius: 2px; font-weight: 700; font-size: 11px;">
                ${item.payment_method}
              </span>
            </td>
            <td style="padding: 6px 12px; border-right: 1px solid #E5E7EB; font-size: 11.5px; color: #4B5563;">${dest}</td>
            <td style="padding: 6px 12px; font-family: monospace; font-weight: 600; border-right: 1px solid #E5E7EB;">${item.reference_code || '-'}</td>
            <td style="padding: 6px 12px; text-align: right; font-weight: 800; color: #111827; border-right: 1px solid #E5E7EB;">
              ${Number(item.amount_paid || 0).toLocaleString('en-US', {minimumFractionDigits: 2})}
            </td>
            <td style="padding: 6px 10px; text-align: center; border-right: 1px solid #E5E7EB; font-size: 11.5px;">${item.issued_by || 'DEAN'}</td>
            <td style="padding: 4px 8px; text-align: center; white-space: nowrap;">
              <div style="display: inline-flex; gap: 4px; justify-content: center;">
                <button type="button" class="btn-action-pill" onclick="editTenantReceipt('${item.id}')" style="padding: 3px 8px; font-size: 11px; font-weight: 700; color: #1E3A8A; background: #EEF2F6; border: 1px solid #CBD5E1; border-radius: 2px; cursor: pointer;" title="Edit Receipt Allocations">
                  ✏️ Edit
                </button>
                <button type="button" class="btn-action-pill" onclick="openOfficialReceiptModal('${item.id}')" style="padding: 3px 8px; font-size: 11px; font-weight: 700; color: #008080; background: #E6FFFA; border: 1px solid #81E6D9; border-radius: 2px; cursor: pointer;" title="Print Official Receipt">
                  🖨️ View / Print
                </button>
              </div>
            </td>
          </tr>
        `;
      }).join('');
    }

    function resetReceiptForm() {
      if (AppState.editingReceiptId) {
        cancelReceiptEditMode();
        return;
      }

      const form = document.getElementById('form-tenant-receipt');
      if (form) form.reset();

      // Clear explicit inputs
      const amtInput = document.getElementById('receipt-amount-paid');
      if (amtInput) amtInput.value = '';

      const refInput = document.getElementById('receipt-ref-code');
      if (refInput) refInput.value = '';

      const notesInput = document.getElementById('receipt-notes');
      if (notesInput) notesInput.value = '';

      const unitDisp = document.getElementById('receipt-unit-display');
      if (unitDisp) unitDisp.textContent = 'Unit: -';

      const balBadge = document.getElementById('receipt-balance-badge');
      if (balBadge) {
        balBadge.textContent = 'KES 0.00';
        balBadge.style.background = '#FEF3C7';
        balBadge.style.borderColor = '#F59E0B';
        balBadge.style.color = '#B45309';
      }

      // Restore SMS checkbox to default checked
      const smsCheck = document.getElementById('receipt-send-sms');
      if (smsCheck) smsCheck.checked = true;

      // Clear mode badge
      const banner = document.getElementById('receipt-mode-indicator-badge');
      if (banner) banner.style.display = 'none';

      // Unlock any inputs that might have been locked
      unlockReceiptFormInputs();

      // Refresh property selection & payment mode defaults
      const propSel = document.getElementById('receipt-property-select');
      if (propSel && propSel.options.length > 0) {
        propSel.selectedIndex = 0;
        onReceiptPropertyChange(propSel.value);
      } else {
        renderReceiptAllocationMatrix('');
      }

      const methodSel = document.getElementById('receipt-method-select');
      if (methodSel) {
        methodSel.value = 'M-Pesa Paybill';
        onReceiptPaymentModeChange('M-Pesa Paybill');
      }
    }

    function openOfficialReceiptModal(receiptOrId) {
      let receipt = typeof receiptOrId === 'object' ? receiptOrId : (AppState.tenantReceipts || []).find(r => r.id === receiptOrId);
      if (!receipt) {
        receipt = (AppState.tenantReceipts || [])[0];
      }
      if (!receipt) return;

      const modal = document.getElementById('modal-official-receipt');
      if (!modal) return;

      // Populate Company Profile
      const cp = AppState.companyProfile || {};
      const cName = document.getElementById('receipt-modal-company-name');
      const cSlogan = document.getElementById('receipt-modal-slogan');
      const cAddress = document.getElementById('receipt-modal-address');
      const cPin = document.getElementById('receipt-modal-pin');
      const cLogo = document.getElementById('receipt-modal-logo');

      if (cName) cName.textContent = cp.company_name || 'METROCOSMO ENTERPRISE';
      if (cSlogan) cSlogan.textContent = cp.slogan || 'Professional Property Management & Valuation Services';
      if (cAddress) cAddress.textContent = `${cp.address1 || 'P.O. Box 48190'} ${cp.postal_code || '00100'} ${cp.city_town || 'Nairobi'} | Tel: ${cp.phone || '+254 722 000 000'}`;
      if (cPin) cPin.textContent = `P.I.N: ${cp.pin_no || 'P051189201A'} | Email: ${cp.email || 'accounts@metrocosmo.com'}`;
      if (cLogo && (cp.logo_url || cp.tempLogoBase64)) {
        cLogo.src = cp.tempLogoBase64 || cp.logo_url;
      }

      // Populate Receipt Details
      const rNum = document.getElementById('receipt-modal-number');
      const rDate = document.getElementById('receipt-modal-date');
      const rTenant = document.getElementById('receipt-modal-tenant-name');
      const rCode = document.getElementById('receipt-modal-tenant-code');
      const rProp = document.getElementById('receipt-modal-property-name');
      const rUnit = document.getElementById('receipt-modal-unit-code');
      const rMethod = document.getElementById('receipt-modal-payment-method');
      const rRef = document.getElementById('receipt-modal-ref-code');
      const rDest = document.getElementById('receipt-modal-dest-account');
      const rTot = document.getElementById('receipt-modal-total-amount');
      const rWords = document.getElementById('receipt-modal-amount-words');
      const rUser = document.getElementById('receipt-modal-issued-by');

      const amountVal = Number(receipt.amount_paid || 0);
      const destText = receipt.mpesa_paybill_number ? `Paybill: ${receipt.mpesa_paybill_number}` : (receipt.bank_account_name || 'Main Cashier Safe');

      if (rNum) rNum.textContent = receipt.receipt_number;
      if (rDate) rDate.textContent = receipt.payment_date ? receipt.payment_date.split('T')[0] : new Date().toISOString().split('T')[0];
      if (rTenant) rTenant.textContent = receipt.tenant_name;
      if (rCode) rCode.textContent = receipt.tenant_code || '-';
      if (rProp) rProp.textContent = receipt.property_name || '-';
      if (rUnit) rUnit.textContent = receipt.unit_code ? `Unit ${receipt.unit_code}` : '-';
      if (rMethod) rMethod.textContent = receipt.payment_method;
      if (rRef) rRef.textContent = receipt.reference_code || '-';
      if (rDest) rDest.textContent = destText;
      if (rTot) rTot.textContent = `KES ${amountVal.toLocaleString('en-US', {minimumFractionDigits: 2})}`;
      if (rWords) rWords.textContent = numberToWords(amountVal);
      if (rUser) rUser.textContent = receipt.issued_by || 'DEAN';

      // Breakdown rows
      const tbody = document.getElementById('receipt-modal-breakdown-body');
      if (tbody) {
        if (receipt.allocated_invoices && receipt.allocated_invoices.length > 0) {
          tbody.innerHTML = receipt.allocated_invoices.map(alloc => `
            <tr>
              <td style="padding: 8px 12px; border-bottom: 1px solid #E5E7EB; font-weight: 600;">
                <span style="background: #E0F2FE; color: #0369A1; padding: 2px 6px; border-radius: 2px; font-weight: 700; font-size: 11px; margin-right: 8px;">${alloc.payable_code || '001'}</span>
                ${alloc.description || 'Settlement'}
              </td>
              <td style="padding: 8px 12px; text-align: right; border-bottom: 1px solid #E5E7EB; font-weight: 700;">
                ${Number(alloc.amount || 0).toLocaleString('en-US', {minimumFractionDigits: 2})}
              </td>
            </tr>
          `).join('');
        } else {
          tbody.innerHTML = `
            <tr>
              <td style="padding: 8px 12px; border-bottom: 1px solid #E5E7EB; font-weight: 600;">
                ${receipt.notes || `${receipt.payment_method} settlement received for ${receipt.tenant_name}`}
              </td>
              <td style="padding: 8px 12px; text-align: right; border-bottom: 1px solid #E5E7EB; font-weight: 700;">
                ${amountVal.toLocaleString('en-US', {minimumFractionDigits: 2})}
              </td>
            </tr>
          `;
        }
      }

      // Balance Summary
      const pBal = document.getElementById('receipt-modal-prev-balance');
      const pPaid = document.getElementById('receipt-modal-paid-summary');
      const pNet = document.getElementById('receipt-modal-net-balance');

      if (pBal) pBal.textContent = `KES ${amountVal.toLocaleString('en-US', {minimumFractionDigits: 2})}`;
      if (pPaid) pPaid.textContent = `KES ${amountVal.toLocaleString('en-US', {minimumFractionDigits: 2})}`;
      if (pNet) pNet.textContent = `KES 0.00`;

      modal.style.display = 'flex';
    }

    function closeOfficialReceiptModal() {
      const modal = document.getElementById('modal-official-receipt');
      if (modal) modal.style.display = 'none';
    }

    function printOfficialReceipt() {
      window.print();
    }

    function numberToWords(num) {
      if (isNaN(num) || num === null) return '';
      const integerPart = Math.floor(Math.abs(num));
      const decimalPart = Math.round((Math.abs(num) - integerPart) * 100);

      const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine',
                    'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen',
                    'Seventeen', 'Eighteen', 'Nineteen'];
      const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

      function convertGroup(n) {
        let str = '';
        if (n >= 100) {
          str += ones[Math.floor(n / 100)] + ' Hundred ';
          n %= 100;
        }
        if (n >= 20) {
          str += tens[Math.floor(n / 10)] + (n % 10 > 0 ? ' ' + ones[n % 10] : '') + ' ';
        } else if (n > 0) {
          str += ones[n] + ' ';
        }
        return str.trim();
      }

      if (integerPart === 0) {
        return decimalPart > 0 ? `Zero Shillings and ${decimalPart}/100 Cents Only` : 'Zero Kenya Shillings Only';
      }

      const millions = Math.floor(integerPart / 1000000);
      const thousands = Math.floor((integerPart % 1000000) / 1000);
      const remainder = integerPart % 1000;

      let result = '';
      if (millions > 0) {
        result += convertGroup(millions) + ' Million ';
      }
      if (thousands > 0) {
        result += convertGroup(thousands) + ' Thousand ';
      }
      if (remainder > 0) {
        result += convertGroup(remainder) + ' ';
      }

      result = result.trim() + ' Kenya Shillings';
      if (decimalPart > 0) {
        result += ` and ${decimalPart}/100 Cents`;
      }
      return result + ' Only';
    }

    // Populate dropdowns for Sub-Module 1.2
    function populateTenantDropdowns() {
      // Lease tenant selector
      const leaseTenantSel = document.getElementById('lease-tenant-select');
      if (leaseTenantSel) {
        leaseTenantSel.innerHTML = AppState.tenants.map(t => 
          `<option value="${t.id}">${t.name} (${t.phone})</option>`
        ).join('');
      }

      // Lease unit selector (with status indicators)
      const leaseUnitSel = document.getElementById('lease-unit-select');
      if (leaseUnitSel) {
        leaseUnitSel.innerHTML = '<option value="">-- Choose Unit --</option>' + AppState.units.map(u => {
          const isOccupied = AppState.leases.some(l => l.unitId === u.id && l.status === 'Active');
          return `<option value="${u.id}">${u.propertyName} - ${u.code} (${u.config}) [${isOccupied ? 'OCCUPIED' : 'VACANT'}]</option>`;
        }).join('');
      }

      // Meter unit selector
      const meterUnitSel = document.getElementById('meter-unit-select');
      if (meterUnitSel) {
        meterUnitSel.innerHTML = AppState.units.map(u => 
          `<option value="${u.id}">${u.propertyName} — Unit ${u.code}</option>`
        ).join('');
        if (AppState.units.length > 0) {
          handleMeterUnitSelect(AppState.units[0].id);
        }
      }

      // Billing target property
      const billPropSel = document.getElementById('bill-target-property');
      if (billPropSel) {
        const propOpts = AppState.properties.map(p => `<option value="${p.id}">${p.name}</option>`).join('');
        billPropSel.innerHTML = `<option value="ALL">All Properties (Consolidated Run)</option>${propOpts}`;
      }

      // Ledger tenant filter
      const ledgerTenantFilter = document.getElementById('ledger-tenant-filter');
      if (ledgerTenantFilter) {
        const tenantOpts = AppState.tenants.map(t => `<option value="${t.id}">${t.name}</option>`).join('');
        ledgerTenantFilter.innerHTML = `<option value="ALL">All Tenants (Consolidated Ledger)</option>${tenantOpts}`;
      }

      // Receipt tenant selector
      const receiptTenantSel = document.getElementById('receipt-tenant-select');
      if (receiptTenantSel) {
        receiptTenantSel.innerHTML = AppState.tenants.map(t => `<option value="${t.id}">${t.name} (${t.phone})</option>`).join('');
        if (AppState.tenants.length > 0) {
          handleReceiptTenantSelect(AppState.tenants[0].id);
        }
      }

      // Set default receipt datetime to now
      const receiptDatetime = document.getElementById('receipt-datetime');
      if (receiptDatetime && !receiptDatetime.value) {
        const now = new Date();
        const iso = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
        receiptDatetime.value = iso;
      }
    }

    // 1. LEASES ENGINE
    function handleLeaseUnitSelect(unitId) {
      if (!unitId) return;
      const unit = AppState.units.find(u => u.id === unitId);
      if (!unit) return;

      const activeLease = AppState.leases.find(l => l.unitId === unitId && l.status === 'Active');
      if (activeLease) {
        showToast(`Warning: Unit ${unit.code} is currently occupied by ${activeLease.tenantName}.`);
      }

      document.getElementById('lease-rent-amount').value = unit.rent;
      document.getElementById('lease-sc-amount').value = unit.sc;
      document.getElementById('lease-deposit-amount').value = unit.rent;
      document.getElementById('lease-electricity-meter').value = unit.meter ? `EM-${unit.code}` : '';
      
      const lastReading = AppState.utilityReadings
        .filter(r => r.unitId === unitId && r.meterType === 'Water')
        .sort((a, b) => new Date(b.readingDate) - new Date(a.readingDate))[0];
      document.getElementById('lease-handover-water').value = lastReading ? lastReading.currentReading : 0.00;
    }

    function handleLeaseSubmit(e) {
      e.preventDefault();
      const tenantId = document.getElementById('lease-tenant-select').value;
      const unitId = document.getElementById('lease-unit-select').value;
      if (!unitId) {
        showToast('Please select a valid unit.');
        return;
      }

      const tenant = AppState.tenants.find(t => t.id === tenantId);
      const unit = AppState.units.find(u => u.id === unitId);

      // Check PostgreSQL UNIQUE EXCLUSION on unit_id WHERE status = 'Active'
      const existingActiveLease = AppState.leases.find(l => l.unitId === unitId && l.status === 'Active');
      if (existingActiveLease) {
        showToast(`Exclusion Violation: Unit ${unit.code} already has an active lease (${existingActiveLease.tenantName}). Terminate the current lease first.`);
        return;
      }

      const rentAmount = Number(document.getElementById('lease-rent-amount').value);
      const serviceCharge = Number(document.getElementById('lease-sc-amount').value);
      const depositAmount = Number(document.getElementById('lease-deposit-amount').value);
      const startDate = document.getElementById('lease-start-date').value;
      const endDate = document.getElementById('lease-end-date').value || 'Open-ended';
      const handoverWater = Number(document.getElementById('lease-handover-water').value) || 0;
      const meterSerial = document.getElementById('lease-electricity-meter').value || unit.meter || 'WM-SUB-01';

      confirmAction(
        `Are you sure you want to execute and commit Lease Agreement for Tenant <strong>${tenant.name}</strong> on Unit <strong>${unit.code}</strong> (Rent: KES ${rentAmount.toLocaleString()}, Deposit: KES ${depositAmount.toLocaleString()})?`,
        () => {
          const newLease = {
            id: `LSE-${String(AppState.leases.length + 1).padStart(3, '0')}`,
            tenantId: tenant.id,
            tenantName: tenant.name,
            unitId: unit.id,
            unitCode: unit.code,
            propertyName: unit.propertyName,
            startDate: startDate,
            endDate: endDate,
            rentAmount: rentAmount,
            serviceCharge: serviceCharge,
            depositAmount: depositAmount,
            handoverWater: handoverWater,
            meterSerial: meterSerial,
            status: 'Active'
          };

          AppState.leases.push(newLease);
          unit.status = 'OCCUPIED';

          // Log initial handover reading if provided
          if (newLease.handoverWater > 0) {
            AppState.utilityReadings.push({
              id: `UTR-${String(AppState.utilityReadings.length + 1).padStart(3, '0')}`,
              unitId: unit.id,
              unitCode: unit.code,
              propertyName: unit.propertyName,
              meterType: 'Water',
              readingDate: newLease.startDate,
              previousReading: newLease.handoverWater,
              currentReading: newLease.handoverWater,
              consumption: 0.00,
              tariffRate: 150.00,
              totalAmount: 0.00,
              billedStatus: true
            });
          }

          renderLeasesTable();
          renderUnitsTable();
          populateTenantDropdowns();
          e.target.reset();
          showToast(`✓ Lease executed for ${tenant.name} at ${unit.code}`);
        },
        'Lease Execution Confirmation',
        'Execute Lease'
      );
    }

    function renderLeasesTable() {
      const tbody = document.getElementById('table-leases-body');
      if (!tbody) return;
      const counterBadge = document.getElementById('lease-counter-badge');
      const activeCount = AppState.leases.filter(l => l.status === 'Active').length;
      if (counterBadge) counterBadge.textContent = `${activeCount} Active Leases`;

      tbody.innerHTML = AppState.leases.map(l => `
        <tr>
          <td><strong>${l.tenantName}</strong></td>
          <td>${l.propertyName} • <span class="badge-status" style="font-size:0.75rem;">${l.unitCode}</span></td>
          <td><strong>KES ${l.rentAmount.toLocaleString()}</strong></td>
          <td>KES ${l.serviceCharge.toLocaleString()}</td>
          <td>KES ${l.depositAmount.toLocaleString()}</td>
          <td><span style="font-size:0.78rem;">${l.startDate} to ${l.endDate}</span></td>
          <td>${l.handoverWater} m³</td>
          <td><span class="badge-status" style="color: ${l.status === 'Active' ? 'var(--accent-secondary)' : 'var(--text-muted)'};">${l.status}</span></td>
          <td>
            ${l.status === 'Active' 
              ? `<button class="btn-action-pill" onclick="terminateLease('${l.id}')" title="Terminate Lease">Terminate</button>` 
              : `<span style="font-size:0.75rem; color:var(--text-muted);">Archived</span>`}
          </td>
        </tr>
      `).join('');
    }

    function terminateLease(leaseId) {
      const lease = AppState.leases.find(l => l.id === leaseId);
      if (!lease) return;

      confirmAction(
        `Are you sure you want to terminate Lease <strong>${lease.id}</strong> for Tenant <strong>${lease.tenantName}</strong>? Unit <strong>${lease.unitCode}</strong> will be reverted to VACANT.`,
        () => {
          lease.status = 'Expired';
          const unit = AppState.units.find(u => u.id === lease.unitId);
          if (unit) unit.status = 'VACANT';
          renderLeasesTable();
          renderUnitsTable();
          populateTenantDropdowns();
          showToast(`✓ Lease ${leaseId} terminated. Unit ${lease.unitCode} marked VACANT.`);
        },
        'Lease Termination Warning',
        'Terminate Lease',
        true
      );
    }

    // 2. METERING ENGINE
    function handleMeterUnitSelect(unitId) {
      if (!unitId) return;
      const lastReading = AppState.utilityReadings
        .filter(r => r.unitId === unitId)
        .sort((a, b) => new Date(b.readingDate) - new Date(a.readingDate))[0];

      const prevEl = document.getElementById('meter-prev-reading');
      if (prevEl) {
        prevEl.value = lastReading ? lastReading.currentReading.toFixed(2) : '0.00';
      }
      calculateMeterConsumption();
    }

    function calculateMeterConsumption() {
      const prev = parseFloat(document.getElementById('meter-prev-reading').value) || 0;
      const curr = parseFloat(document.getElementById('meter-curr-reading').value) || 0;
      const tariff = parseFloat(document.getElementById('meter-tariff-rate').value) || 150;
      const consumption = Math.max(0, curr - prev);
      const total = consumption * tariff;

      const consEl = document.getElementById('meter-consumption');
      const billEl = document.getElementById('meter-total-bill');
      if (consEl) consEl.value = consumption.toFixed(2);
      if (billEl) billEl.value = total.toFixed(2);
    }

    function handleMeterReadingSubmit(e) {
      e.preventDefault();
      const unitId = document.getElementById('meter-unit-select').value;
      const unit = AppState.units.find(u => u.id === unitId) || AppState.units[0];
      const prev = parseFloat(document.getElementById('meter-prev-reading').value) || 0;
      const curr = parseFloat(document.getElementById('meter-curr-reading').value) || 0;
      const tariff = parseFloat(document.getElementById('meter-tariff-rate').value) || 150;
      const consumption = Math.max(0, curr - prev);
      const total = consumption * tariff;
      const meterType = document.getElementById('meter-type-select').value;
      const readingDate = document.getElementById('meter-reading-date').value;

      confirmAction(
        `Are you sure you want to record this ${meterType} meter reading (${consumption.toFixed(2)} units / KES ${total.toLocaleString()}) for Unit <strong>${unit.code}</strong> (${unit.propertyName})?`,
        () => {
          const newReading = {
            id: `UTR-${String(AppState.utilityReadings.length + 1).padStart(3, '0')}`,
            unitId: unit.id,
            unitCode: unit.code,
            propertyName: unit.propertyName,
            meterType: meterType,
            readingDate: readingDate,
            previousReading: prev,
            currentReading: curr,
            consumption: consumption,
            tariffRate: tariff,
            totalAmount: total,
            billedStatus: false
          };

          AppState.utilityReadings.unshift(newReading);
          renderReadingsTable();
          e.target.reset();
          handleMeterUnitSelect(unit.id);
          showToast(`✓ Utility reading logged: ${consumption.toFixed(2)} units for Unit ${unit.code} (KES ${total.toLocaleString()})`);
        },
        'Utility Reading Confirmation',
        'Commit Reading'
      );
    }

    function renderReadingsTable() {
      const tbody = document.getElementById('table-readings-body');
      if (!tbody) return;
      tbody.innerHTML = AppState.utilityReadings.map(r => `
        <tr>
          <td><strong>${r.unitCode}</strong> • ${r.propertyName}</td>
          <td>${r.meterType === 'Water' ? '💧 Water' : '⚡ Electricity'}</td>
          <td>${r.readingDate}</td>
          <td>${r.previousReading.toFixed(2)}</td>
          <td><strong>${r.currentReading.toFixed(2)}</strong></td>
          <td><span style="font-weight:700; color:var(--accent-primary);">${r.consumption.toFixed(2)}</span></td>
          <td>KES ${r.tariffRate.toFixed(2)}</td>
          <td><strong>KES ${r.totalAmount.toLocaleString()}</strong></td>
          <td>
            ${r.billedStatus 
              ? `<span class="badge-status" style="color: var(--accent-secondary);">✓ Invoiced</span>` 
              : `<span class="badge-status" style="color: var(--accent-amber);">Pending Billing</span>`}
          </td>
          <td>
            ${!r.billedStatus ? `<button class="btn-action-pill" onclick="billSingleReading('${r.id}')">Bill Now</button>` : `<span style="font-size:0.75rem; color:var(--text-muted);">Billed</span>`}
          </td>
        </tr>
      `).join('');
    }

    function billSingleReading(readingId) {
      const reading = AppState.utilityReadings.find(r => r.id === readingId);
      if (!reading) return;
      reading.billedStatus = true;
      renderReadingsTable();
      showToast(`Reading ${readingId} queued for upcoming invoice.`);
    }

    // 3. MONTHLY BILLING RUN ENGINE
    function executeMonthlyBillingRun() {
      const month = parseInt(document.getElementById('bill-period-month').value, 10);
      const year = parseInt(document.getElementById('bill-period-year').value, 10);
      const targetProp = document.getElementById('bill-target-property').value;
      const dueDate = document.getElementById('bill-due-date').value || '2026-10-05';

      let eligibleLeases = AppState.leases.filter(l => l.status === 'Active');
      if (targetProp !== 'ALL') {
        const matchingUnits = AppState.units.filter(u => u.propertyId === targetProp).map(u => u.id);
        eligibleLeases = eligibleLeases.filter(l => matchingUnits.includes(l.unitId));
      }

      if (eligibleLeases.length === 0) {
        showToast('No active leases found for the selected property filter.');
        return;
      }

      const monthNames = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

      confirmAction(
        `Are you sure you want to execute the Monthly Billing Run for <strong>${monthNames[month]} ${year}</strong> across <strong>${eligibleLeases.length}</strong> active lease(s)? This will commit new invoice debits to the tenant ledger.`,
        () => {
          let generatedCount = 0;
          eligibleLeases.forEach(lease => {
            // Check if invoice already exists for this lease and period
            const exists = AppState.invoices.some(inv => inv.leaseId === lease.id && inv.periodMonth === month && inv.periodYear === year);
            if (exists) return;

            // Calculate unbilled utility readings
            const unbilledReadings = AppState.utilityReadings.filter(r => r.unitId === lease.unitId && !r.billedStatus);
            const utilitiesTotal = unbilledReadings.reduce((sum, r) => sum + r.totalAmount, 0);

            // Mark readings as billed
            unbilledReadings.forEach(r => r.billedStatus = true);

            // Calculate arrears from ledger
            const tenantLedger = AppState.ledger.filter(l => l.tenantId === lease.tenantId);
            const totalDebits = tenantLedger.reduce((sum, l) => sum + l.debit, 0);
            const totalCredits = tenantLedger.reduce((sum, l) => sum + l.credit, 0);
            const arrears = Math.max(0, totalDebits - totalCredits);

            const totalDue = lease.rentAmount + lease.serviceCharge + utilitiesTotal + arrears;
            const invNum = `INV-${year}-${String(month).padStart(2, '0')}-${String(AppState.invoices.length + 1).padStart(3, '0')}`;

            const invoice = {
              id: invNum,
              leaseId: lease.id,
              invoiceNumber: invNum,
              tenantId: lease.tenantId,
              tenantName: lease.tenantName,
              unitCode: lease.unitCode,
              propertyName: lease.propertyName,
              periodMonth: month,
              periodYear: year,
              rent: lease.rentAmount,
              serviceCharge: lease.serviceCharge,
              utilities: utilitiesTotal,
              arrears: arrears,
              totalAmount: totalDue,
              dueDate: dueDate,
              status: 'Unpaid'
            };

            AppState.invoices.unshift(invoice);

            // Post debit to ledger
            const runningBal = arrears + totalDue;
            AppState.ledger.push({
              id: `LED-${String(AppState.ledger.length + 1).padStart(3, '0')}`,
              timestamp: `${year}-${String(month).padStart(2, '0')}-01 08:00`,
              refNo: invNum,
              tenantId: lease.tenantId,
              tenantName: lease.tenantName,
              unitCode: lease.unitCode,
              leaseId: lease.id,
              type: 'Invoice',
              description: `${monthNames[month]} ${year} Rent (KES ${lease.rentAmount.toLocaleString()}), SC (KES ${lease.serviceCharge.toLocaleString()})${utilitiesTotal > 0 ? `, Water (KES ${utilitiesTotal.toLocaleString()})` : ''}`,
              debit: totalDue,
              credit: 0,
              balanceAfter: runningBal
            });

            generatedCount++;
          });

          renderInvoicesTable();
          renderReadingsTable();
          renderLedgerTable();
          showToast(`✓ Monthly Billing Run complete. Generated ${generatedCount} invoices.`);
        },
        'Batch Invoicing Run Warning',
        'Execute Billing Run'
      );
    }

    function renderInvoicesTable() {
      const tbody = document.getElementById('table-invoices-body');
      if (!tbody) return;

      const totalInvoiced = AppState.invoices.reduce((sum, i) => sum + i.totalAmount, 0);
      const totalPaid = AppState.invoices.filter(i => i.status === 'Paid').reduce((sum, i) => sum + i.totalAmount, 0);
      const totalArrears = totalInvoiced - totalPaid;

      document.getElementById('stat-total-invoiced').textContent = `KES ${totalInvoiced.toLocaleString()}`;
      document.getElementById('stat-total-collected').textContent = `KES ${totalPaid.toLocaleString()}`;
      document.getElementById('stat-total-arrears').textContent = `KES ${totalArrears.toLocaleString()}`;
      document.getElementById('stat-invoice-count').textContent = `${AppState.invoices.length} Invoices`;

      const monthNames = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

      tbody.innerHTML = AppState.invoices.map(inv => `
        <tr>
          <td><strong>${inv.invoiceNumber}</strong></td>
          <td>${monthNames[inv.periodMonth]} ${inv.periodYear}</td>
          <td><strong>${inv.tenantName}</strong></td>
          <td>${inv.propertyName} • ${inv.unitCode}</td>
          <td>KES ${inv.rent.toLocaleString()}</td>
          <td>KES ${inv.serviceCharge.toLocaleString()}</td>
          <td>KES ${inv.utilities.toLocaleString()}</td>
          <td><strong>KES ${inv.totalAmount.toLocaleString()}</strong></td>
          <td><span style="font-size:0.78rem;">${inv.dueDate}</span></td>
          <td>
            <span class="badge-status" style="color: ${inv.status === 'Paid' ? 'var(--accent-secondary)' : inv.status === 'Partial' ? 'var(--accent-tertiary)' : 'var(--accent-amber)'};">
              ${inv.status}
            </span>
          </td>
          <td>
            ${inv.status !== 'Paid' 
              ? `<button class="btn-action-pill" onclick="openReceiptModal('${inv.tenantId}', '${inv.id}')">💳 Pay</button>` 
              : `<span style="font-size:0.75rem; color:var(--accent-secondary);">✓ Settled</span>`}
          </td>
        </tr>
      `).join('');
    }

    /* --------------------------------------------------------------------------
       TENANT STATEMENT OF ACCOUNT & DOUBLE-ENTRY FINANCIAL LEDGER (image_f7715c.png)
       -------------------------------------------------------------------------- */

    function getStatementCurrentTimestamp() {
      const now = new Date();
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const day = String(now.getDate()).padStart(2, '0');
      const mon = months[now.getMonth()];
      const yr = now.getFullYear();
      const hh = String(now.getHours()).padStart(2, '0');
      const mm = String(now.getMinutes()).padStart(2, '0');
      const ss = String(now.getSeconds()).padStart(2, '0');
      return `${day}-${mon}-${yr} ${hh}:${mm}:${ss}`;
    }

    function formatDisplayDate(dateStr) {
      if (!dateStr) return '—';
      const clean = String(dateStr).split('T')[0].split(' ')[0];
      const parts = clean.split('-');
      if (parts.length === 3) {
        return `${parts[2]}/${parts[1]}/${parts[0]}`;
      }
      return clean;
    }

    function formatStatementNumber(val, isBalance) {
      const num = Number(val) || 0;
      if (num === 0 && !isBalance) return '0.00';
      if (num < 0) {
        return '(' + Math.abs(num).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ')';
      }
      return num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }

    function initTenantStatementEngine() {
      const propSel = document.getElementById('ledger-property-filter');
      const tenantSel = document.getElementById('ledger-tenant-filter');
      if (!propSel && !tenantSel) return;

      if (propSel) {
        const properties = AppState.properties || [];
        propSel.innerHTML = `
          <option value="ALL">All Properties (Consolidated)</option>
          ${properties.map(p => `<option value="${p.id}">${p.name}</option>`).join('')}
        `;
        if (properties.length > 0) {
          propSel.value = properties[0].id;
        }
      }

      onLedgerPropertyChange();
    }

    function onLedgerPropertyChange() {
      const propSel = document.getElementById('ledger-property-filter');
      const tenantSel = document.getElementById('ledger-tenant-filter');
      if (!tenantSel) return;

      const propId = propSel ? propSel.value : 'ALL';
      let tenants = AppState.tenants || [];
      if (propId && propId !== 'ALL') {
        tenants = tenants.filter(t => t.propertyId === propId);
      }

      tenantSel.innerHTML = tenants.map(t => {
        const u = t.unitNumber || t.unitCode || '';
        const unitPart = u ? ` (${u})` : '';
        return `<option value="${t.id}">${t.tenantCode} - ${t.name}${unitPart}</option>`;
      }).join('');

      if (tenants.length > 0) {
        tenantSel.value = tenants[0].id;
      }

      onLedgerTenantChange();
    }

    function onLedgerTenantChange() {
      const tenantSel = document.getElementById('ledger-tenant-filter');
      if (!tenantSel) return;

      const tenantId = tenantSel.value;
      const tenant = (AppState.tenants || []).find(t => t.id === tenantId || t.tenantCode === tenantId);
      const lease = (AppState.leases || []).find(l => l.tenantId === (tenant ? tenant.id : '')) || {};

      const dateFromInput = document.getElementById('ledger-date-from');
      const dateToInput = document.getElementById('ledger-date-to');

      if (dateFromInput && !dateFromInput.value) {
        const start = lease.startDate || (tenant ? tenant.registrationDate : '') || '2026-05-01';
        dateFromInput.value = start.split('T')[0].split(' ')[0];
      }

      if (dateToInput && !dateToInput.value) {
        const today = new Date().toISOString().split('T')[0];
        dateToInput.value = today;
      }

      generateTenantStatement();
    }

    function generateTenantStatement() {
      const tenantSel = document.getElementById('ledger-tenant-filter');
      const tbody = document.getElementById('statement-table-body');
      if (!tenantSel || !tbody) return;

      const tenantId = tenantSel.value;
      const tenant = (AppState.tenants || []).find(t => t.id === tenantId || t.tenantCode === tenantId);

      if (!tenant) {
        tbody.innerHTML = '<tr><td colspan="9" style="text-align: center; padding: 24px; color: #6B7280;">Please select an active tenant to view statement.</td></tr>';
        return;
      }

      const property = (AppState.properties || []).find(p => p.id === tenant.propertyId) || (tenant.propertyName ? { name: tenant.propertyName } : { name: '—' });
      const lease = (AppState.leases || []).find(l => l.tenantId === tenant.id) || {};

      const fromDate = document.getElementById('ledger-date-from')?.value || '';
      const toDate = document.getElementById('ledger-date-to')?.value || '';

      // Update Header Metadata
      const timeEl = document.getElementById('statement-gen-timestamp');
      if (timeEl) timeEl.textContent = getStatementCurrentTimestamp();

      const codeEl = document.getElementById('statement-tenant-code');
      if (codeEl) codeEl.textContent = tenant.tenantCode || '—';

      const nameEl = document.getElementById('statement-tenant-name');
      if (nameEl) nameEl.textContent = tenant.name || '—';

      const propEl = document.getElementById('statement-property-name');
      if (propEl) propEl.textContent = property.name || tenant.propertyName || '—';

      const unitEl = document.getElementById('statement-unit-code');
      if (unitEl) unitEl.textContent = tenant.unitNumber || tenant.unitCode || lease.unitCode || '—';

      const fromEl = document.getElementById('statement-date-from');
      if (fromEl) fromEl.textContent = fromDate ? formatDisplayDate(fromDate) : (lease.startDate ? formatDisplayDate(lease.startDate) : '01/05/2026');

      const toEl = document.getElementById('statement-date-to');
      if (toEl) toEl.textContent = toDate ? formatDisplayDate(toDate) : formatDisplayDate(new Date().toISOString());

      const phoneEl = document.getElementById('statement-phone-no');
      if (phoneEl) phoneEl.textContent = tenant.phone || tenant.phoneNumber || '+254 700 000000';

      // Gather Invoices & Receipts
      const tenantInvs = (AppState.invoices || []).filter(i => i.tenantId === tenant.id || i.tenantName === tenant.name);
      const tenantReceipts = (AppState.tenantReceipts || []).filter(r => r.tenant_id === tenant.id || r.tenant_name === tenant.name);
      const allLines = AppState.tenantInvoiceLines || [];
      const monthNames = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

      let transactions = [];

      // 1. Process Invoices (Debits)
      tenantInvs.forEach(inv => {
        const invLines = allLines.filter(l => l.invoice_id === inv.id);
        const mName = (monthNames[inv.periodMonth] || 'Month') + ' - ' + (inv.periodYear || '2026');
        const invDate = inv.issueDate ? inv.issueDate.substring(0, 10) : (inv.dueDate ? inv.dueDate.substring(0, 7) + '-01' : `${inv.periodYear}-${String(inv.periodMonth).padStart(2, '0')}-01`);

        if (fromDate && invDate < fromDate) return;
        if (toDate && invDate > toDate) return;

        if (invLines.length > 0) {
          invLines.forEach((line, lIdx) => {
            let pName = (line.description || 'Rent').replace(/\s*-\s*(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s*\d{4}/i, '').trim();
            if (!pName.endsWith('~')) pName += '~';
            transactions.push({
              date: invDate,
              payable: pName,
              refNo: inv.invoiceNumber,
              mode: '',
              month: mName,
              debit: Number(line.amount) || 0,
              credit: 0,
              timestamp: invDate + ' 08:00:' + String(lIdx).padStart(2, '0'),
              order: 1
            });
          });
        } else {
          if (inv.rent > 0) {
            transactions.push({ date: invDate, payable: 'Rent~', refNo: inv.invoiceNumber, mode: '', month: mName, debit: Number(inv.rent), credit: 0, timestamp: invDate + ' 08:00:01', order: 1 });
          }
          if (inv.serviceCharge > 0) {
            transactions.push({ date: invDate, payable: 'Service Charge~', refNo: inv.invoiceNumber, mode: '', month: mName, debit: Number(inv.serviceCharge), credit: 0, timestamp: invDate + ' 08:00:02', order: 1 });
          }
          if (inv.utilities > 0) {
            transactions.push({ date: invDate, payable: 'Water Bill~', refNo: inv.invoiceNumber, mode: '', month: mName, debit: Number(inv.utilities), credit: 0, timestamp: invDate + ' 08:00:03', order: 1 });
          }
          if (!inv.rent && !inv.serviceCharge && !inv.utilities) {
            transactions.push({ date: invDate, payable: 'Rent~', refNo: inv.invoiceNumber, mode: '', month: mName, debit: Number(inv.totalAmount) || 0, credit: 0, timestamp: invDate + ' 08:00:00', order: 1 });
          }
        }
      });

      // 2. Process Receipts (Credits)
      tenantReceipts.forEach(rc => {
        const rawDate = rc.payment_date || rc.paymentDate || '2026-05-03';
        const rDate = rawDate.split('T')[0].split(' ')[0];

        if (fromDate && rDate < fromDate) return;
        if (toDate && rDate > toDate) return;

        let mode = 'Paybill';
        const pMethod = (rc.payment_method || rc.paymentMethod || '').toLowerCase();
        if (pMethod.includes('bank') || pMethod.includes('slip')) mode = 'Bank Slip';
        else if (pMethod.includes('cash')) mode = 'Cash';
        else if (pMethod.includes('cheque') || pMethod.includes('check')) mode = 'Cheque';
        else if (pMethod.includes('mpesa') || pMethod.includes('paybill') || pMethod.includes('c2b')) mode = 'Paybill';

        const dObj = new Date(rDate);
        const mName = (monthNames[dObj.getMonth() + 1] || 'Month') + ' - ' + dObj.getFullYear();

        if (Array.isArray(rc.allocations) && rc.allocations.length > 0) {
          rc.allocations.forEach((al, alIdx) => {
            let pName = (al.payable_name || al.payableName || al.description || 'Rent').trim();
            if (!pName.endsWith('~')) pName += '~';
            transactions.push({
              date: rDate,
              payable: pName,
              refNo: rc.receipt_number || rc.receiptNumber,
              mode: mode,
              month: mName,
              debit: 0,
              credit: Number(al.amount || al.amount_paid) || 0,
              timestamp: rDate + ' 12:00:' + String(alIdx).padStart(2, '0'),
              order: 2
            });
          });
        } else {
          const matchedInv = tenantInvs.find(i => {
            const invD = i.dueDate ? i.dueDate.substring(0, 7) : `${i.periodYear}-${String(i.periodMonth).padStart(2, '0')}`;
            return invD === rDate.substring(0, 7);
          });

          if (matchedInv) {
            const invLines = allLines.filter(l => l.invoice_id === matchedInv.id);
            const totalAmt = Number(rc.amount_paid || rc.amountPaid || 0);
            if (invLines.length > 0 && Math.abs(matchedInv.totalAmount - totalAmt) < 1) {
              invLines.forEach((line, lIdx) => {
                let pName = (line.description || 'Rent').replace(/\s*-\s*(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s*\d{4}/i, '').trim();
                if (!pName.endsWith('~')) pName += '~';
                transactions.push({
                  date: rDate,
                  payable: pName,
                  refNo: rc.receipt_number || rc.receiptNumber,
                  mode: mode,
                  month: mName,
                  debit: 0,
                  credit: Number(line.amount) || 0,
                  timestamp: rDate + ' 12:00:' + String(lIdx).padStart(2, '0'),
                  order: 2
                });
              });
            } else if (invLines.length > 0) {
              let remaining = totalAmt;
              invLines.forEach((line, lIdx) => {
                if (remaining <= 0) return;
                const lineAmt = Number(line.amount) || 0;
                const allocAmt = Math.min(remaining, lineAmt);
                let pName = (line.description || 'Rent').replace(/\s*-\s*(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s*\d{4}/i, '').trim();
                if (!pName.endsWith('~')) pName += '~';
                transactions.push({
                  date: rDate,
                  payable: pName,
                  refNo: rc.receipt_number || rc.receiptNumber,
                  mode: mode,
                  month: mName,
                  debit: 0,
                  credit: allocAmt,
                  timestamp: rDate + ' 12:00:' + String(lIdx).padStart(2, '0'),
                  order: 2
                });
                remaining -= allocAmt;
              });
              if (remaining > 0) {
                transactions.push({
                  date: rDate,
                  payable: 'Unallocated Prepayment~',
                  refNo: rc.receipt_number || rc.receiptNumber,
                  mode: mode,
                  month: mName,
                  debit: 0,
                  credit: remaining,
                  timestamp: rDate + ' 12:00:99',
                  order: 2
                });
              }
            } else {
              transactions.push({
                date: rDate,
                payable: 'Rent~',
                refNo: rc.receipt_number || rc.receiptNumber,
                mode: mode,
                month: mName,
                debit: 0,
                credit: totalAmt,
                timestamp: rDate + ' 12:00:00',
                order: 2
              });
            }
          } else {
            transactions.push({
              date: rDate,
              payable: 'Rent~',
              refNo: rc.receipt_number || rc.receiptNumber,
              mode: mode,
              month: mName,
              debit: 0,
              credit: Number(rc.amount_paid || rc.amountPaid || 0),
              timestamp: rDate + ' 12:00:00',
              order: 2
            });
          }
        }
      });

      // 3. Chronological Sort
      transactions.sort((a, b) => {
        if (a.date !== b.date) return a.date.localeCompare(b.date);
        if (a.order !== b.order) return a.order - b.order;
        return a.timestamp.localeCompare(b.timestamp);
      });

      // 4. Compute Running Balances & Totals
      let running = 0;
      let totalDebits = 0;
      let totalCredits = 0;

      transactions.forEach((tx, idx) => {
        totalDebits += tx.debit;
        totalCredits += tx.credit;
        running += (tx.debit - tx.credit);
        tx.idx = idx + 1;
        tx.runningBalance = running;
      });

      // 5. Render Table Rows
      if (transactions.length === 0) {
        tbody.innerHTML = '<tr><td colspan="9" style="text-align: center; padding: 24px; color: #6B7280;">No transaction records found for the selected tenant within this date range.</td></tr>';
      } else {
        tbody.innerHTML = transactions.map(tx => `
          <tr>
            <td style="padding: 6px 6px; text-align: center; border-right: 1px solid #E5E7EB; border-bottom: 1px solid #F3F4F6;">${tx.idx}</td>
            <td style="padding: 6px 8px; text-align: left; border-right: 1px solid #E5E7EB; border-bottom: 1px solid #F3F4F6; white-space: nowrap;">${formatDisplayDate(tx.date)}</td>
            <td style="padding: 6px 10px; text-align: left; border-right: 1px solid #E5E7EB; border-bottom: 1px solid #F3F4F6; font-weight: 600;">${tx.payable}</td>
            <td style="padding: 6px 10px; text-align: left; border-right: 1px solid #E5E7EB; border-bottom: 1px solid #F3F4F6; font-family: monospace; font-size: 11px;">${tx.refNo}</td>
            <td style="padding: 6px 8px; text-align: left; border-right: 1px solid #E5E7EB; border-bottom: 1px solid #F3F4F6;">${tx.mode || ''}</td>
            <td style="padding: 6px 8px; text-align: left; border-right: 1px solid #E5E7EB; border-bottom: 1px solid #F3F4F6; white-space: nowrap;">${tx.month}</td>
            <td style="padding: 6px 10px; text-align: right; border-right: 1px solid #E5E7EB; border-bottom: 1px solid #F3F4F6; font-variant-numeric: tabular-nums;">${tx.debit > 0 ? formatStatementNumber(tx.debit) : '0.00'}</td>
            <td style="padding: 6px 10px; text-align: right; border-right: 1px solid #E5E7EB; border-bottom: 1px solid #F3F4F6; font-variant-numeric: tabular-nums;">${tx.credit > 0 ? formatStatementNumber(tx.credit) : '0.00'}</td>
            <td style="padding: 6px 10px; text-align: right; border-bottom: 1px solid #F3F4F6; font-weight: 700; font-variant-numeric: tabular-nums; color: ${tx.runningBalance > 0 ? '#B91C1C' : tx.runningBalance < 0 ? '#047857' : '#111827'};">${formatStatementNumber(tx.runningBalance, true)}</td>
          </tr>
        `).join('');
      }

      // 6. Update Totals in Footer
      const debEl = document.getElementById('statement-total-debit');
      if (debEl) debEl.textContent = formatStatementNumber(totalDebits);

      const credEl = document.getElementById('statement-total-credit');
      if (credEl) credEl.textContent = formatStatementNumber(totalCredits);

      const balEl = document.getElementById('statement-closing-balance');
      if (balEl) {
        balEl.textContent = formatStatementNumber(running, true);
        balEl.style.color = running > 0 ? '#B91C1C' : running < 0 ? '#047857' : '#111827';
      }

      const sumBalEl = document.getElementById('statement-summary-balance');
      if (sumBalEl) {
        sumBalEl.textContent = `KES ${formatStatementNumber(running, true)}`;
        sumBalEl.style.color = running > 0 ? '#B91C1C' : running < 0 ? '#047857' : '#111827';
      }

      // Sync legacy counters if present
      const debOld = document.getElementById('ledger-stat-debits');
      if (debOld) debOld.textContent = `KES ${totalDebits.toLocaleString()}`;
      const credOld = document.getElementById('ledger-stat-credits');
      if (credOld) credOld.textContent = `KES ${totalCredits.toLocaleString()}`;
      const balOld = document.getElementById('ledger-stat-balance');
      if (balOld) balOld.textContent = `KES ${Math.max(0, running).toLocaleString()}`;
    }

    function printTenantStatement() {
      generateTenantStatement();
      window.print();
    }

    // 4. TENANT LEDGER & RECEIPTING ENGINE
    function renderLedgerTable() {
      if (document.getElementById('statement-table-body')) {
        generateTenantStatement();
      }
      const tbody = document.getElementById('table-ledger-body');
      if (!tbody) return;

      const filterTenant = document.getElementById('ledger-tenant-filter').value;
      const query = (document.getElementById('ledger-search-query').value || '').toLowerCase().trim();

      let entries = [...AppState.ledger];
      if (filterTenant !== 'ALL') {
        entries = entries.filter(e => e.tenantId === filterTenant);
      }
      if (query) {
        entries = entries.filter(e => 
          e.refNo.toLowerCase().includes(query) || 
          e.tenantName.toLowerCase().includes(query) || 
          e.description.toLowerCase().includes(query)
        );
      }

      // Compute totals & running balances
      let totalDebits = 0;
      let totalCredits = 0;
      let running = 0;

      const computedEntries = entries.map(e => {
        totalDebits += e.debit;
        totalCredits += e.credit;
        running += (e.debit - e.credit);
        return { ...e, runningBalance: running };
      });

      document.getElementById('ledger-stat-debits').textContent = `KES ${totalDebits.toLocaleString()}`;
      document.getElementById('ledger-stat-credits').textContent = `KES ${totalCredits.toLocaleString()}`;
      document.getElementById('ledger-stat-balance').textContent = `KES ${Math.max(0, running).toLocaleString()}`;

      tbody.innerHTML = computedEntries.map(e => `
        <tr>
          <td><span style="font-size:0.78rem;">${e.timestamp}</span></td>
          <td><strong>${e.refNo}</strong></td>
          <td>${e.tenantName}</td>
          <td>${e.unitCode}</td>
          <td>
            <span class="badge-status" style="color: ${e.type === 'Payment' ? 'var(--accent-secondary)' : 'var(--accent-primary)'}; font-size: 0.72rem;">
              ${e.type}
            </span>
          </td>
          <td style="max-width: 240px; white-space: normal; font-size: 0.8rem;">${e.description}</td>
          <td style="color: var(--accent-primary); font-weight: 600;">${e.debit > 0 ? `+KES ${e.debit.toLocaleString()}` : '—'}</td>
          <td style="color: var(--accent-secondary); font-weight: 700;">${e.credit > 0 ? `-KES ${e.credit.toLocaleString()}` : '—'}</td>
          <td><strong>KES ${e.runningBalance.toLocaleString()}</strong></td>
          <td>
            <button class="btn-action-pill" onclick="showToast('Audit details for ${e.refNo}')">Inspect</button>
          </td>
        </tr>
      `).join('');
    }

    // Receipting Modal Handlers
    function openReceiptModal(tenantId, invoiceId) {
      const modal = document.getElementById('modal-receipt');
      if (!modal) return;
      modal.classList.add('active');

      const tenantSel = document.getElementById('receipt-tenant-select');
      if (tenantId && tenantSel) {
        tenantSel.value = tenantId;
        handleReceiptTenantSelect(tenantId);
      } else if (tenantSel && AppState.tenants.length > 0) {
        handleReceiptTenantSelect(tenantSel.value || AppState.tenants[0].id);
      }

      if (invoiceId) {
        const inv = AppState.invoices.find(i => i.id === invoiceId);
        if (inv) {
          document.getElementById('receipt-amount').value = inv.totalAmount;
          document.getElementById('receipt-notes').value = `Full settlement of ${inv.invoiceNumber} for ${inv.tenantName}`;
        }
      } else {
        document.getElementById('receipt-amount').value = '';
        document.getElementById('receipt-notes').value = '';
      }

      // Generate random sample M-Pesa receipt code
      const randCode = 'MPX-' + Math.random().toString(36).substring(2, 8).toUpperCase();
      document.getElementById('receipt-ref-no').value = randCode;
    }

    function closeReceiptModal() {
      const modal = document.getElementById('modal-receipt');
      if (modal) modal.classList.remove('active');
    }

    function handleReceiptTenantSelect(tenantId) {
      const leaseSel = document.getElementById('receipt-lease-select');
      const invSel = document.getElementById('receipt-invoice-select');
      if (!leaseSel) return;

      const tenantLeases = AppState.leases.filter(l => l.tenantId === tenantId);
      leaseSel.innerHTML = tenantLeases.map(l => 
        `<option value="${l.id}">${l.propertyName} • Unit ${l.unitCode} (Rent: KES ${l.rentAmount.toLocaleString()})</option>`
      ).join('');

      if (invSel) {
        const tenantInvoices = AppState.invoices.filter(i => i.tenantId === tenantId && i.status !== 'Paid');
        invSel.innerHTML = `<option value="AUTO">Auto-Reconcile Oldest Outstanding</option>` + 
          tenantInvoices.map(i => `<option value="${i.id}">${i.invoiceNumber} — KES ${i.totalAmount.toLocaleString()} (${i.status})</option>`).join('');
      }
    }

    function handleReceiptSubmit(e) {
      e.preventDefault();
      const channel = document.getElementById('receipt-channel').value;
      const refNo = document.getElementById('receipt-ref-no').value.trim();
      const tenantId = document.getElementById('receipt-tenant-select').value;
      const leaseId = document.getElementById('receipt-lease-select').value;
      const amount = parseFloat(document.getElementById('receipt-amount').value) || 0;
      const datetime = document.getElementById('receipt-datetime').value || new Date().toISOString();
      const invTarget = document.getElementById('receipt-invoice-select').value;
      const notes = document.getElementById('receipt-notes').value || 'Payment receipt posted to ledger';

      const tenant = AppState.tenants.find(t => t.id === tenantId);
      const lease = AppState.leases.find(l => l.id === leaseId);

      confirmAction(
        `Are you sure you want to post payment receipt <strong>[${refNo}]</strong> of <strong>KES ${amount.toLocaleString()}</strong> for Tenant <strong>${tenant.name}</strong> to the general ledger?`,
        () => {
          const channelLabels = {
            MPESA_C2B: 'Safaricom Daraja M-Pesa C2B Paybill',
            BANK_DEPOSIT: 'Direct Bank Deposit',
            RTGS: 'RTGS Electronic Wire',
            CHEQUE: "Banker's Cheque"
          };

          AppState.ledger.push({
            id: `LED-${String(AppState.ledger.length + 1).padStart(3, '0')}`,
            timestamp: datetime.replace('T', ' '),
            refNo: refNo,
            tenantId: tenant.id,
            tenantName: tenant.name,
            unitCode: lease ? lease.unitCode : '—',
            leaseId: lease ? lease.id : null,
            type: 'Payment',
            description: `${channelLabels[channel] || channel} — ${notes}`,
            debit: 0,
            credit: amount,
            balanceAfter: 0
          });

          // Auto-reconcile invoices
          let remainingCredit = amount;
          let targetInvoices = [];
          if (invTarget !== 'AUTO') {
            const singleInv = AppState.invoices.find(i => i.id === invTarget);
            if (singleInv) targetInvoices.push(singleInv);
          } else {
            targetInvoices = AppState.invoices.filter(i => i.tenantId === tenantId && i.status !== 'Paid');
          }

          targetInvoices.forEach(inv => {
            if (remainingCredit <= 0) return;
            if (remainingCredit >= inv.totalAmount) {
              inv.status = 'Paid';
              remainingCredit -= inv.totalAmount;
            } else {
              inv.status = 'Partial';
              remainingCredit = 0;
            }
          });

          // ProMatrix Waterfall Overpayment Routing for excess receipts
          if (remainingCredit > 0) {
            const tenantProp = lease ? AppState.properties.find(p => p.name === lease.propertyName) : null;
            const propId = tenantProp ? tenantProp.id : (AppState.properties[0] ? AppState.properties[0].id : 'PROP-01');
            const routing = (AppState.propertyWaterfallRules[propId] && AppState.propertyWaterfallRules[propId].overpaymentRouting) || 'ADVANCE_RENT';
            const routingLabels = {
              ADVANCE_RENT: 'Advance Rent Credit',
              DEPOSIT_REPLENISHMENT: 'Deposit Replenishment',
              UNALLOCATED_CREDIT: 'Unallocated Suspense Credit',
              LANDLORD_WALLET: 'Direct Landlord Surplus'
            };
            const label = routingLabels[routing] || routing;

            AppState.ledger.push({
              id: `LED-${String(AppState.ledger.length + 1).padStart(3, '0')}`,
              timestamp: datetime.replace('T', ' '),
              refNo: `${refNo}-SURPLUS`,
              tenantId: tenant.id,
              tenantName: tenant.name,
              unitCode: lease ? lease.unitCode : '—',
              leaseId: lease ? lease.id : null,
              type: 'Overpayment Credit',
              description: `Waterfall Surplus: KES ${remainingCredit.toLocaleString()} routed to ${label}`,
              debit: 0,
              credit: remainingCredit,
              balanceAfter: -remainingCredit
            });
          }

          closeReceiptModal();
          renderLedgerTable();
          renderInvoicesTable();
          showToast(`✓ Receipt ${refNo} (KES ${amount.toLocaleString()}) posted & reconciled via waterfall.`);
        },
        'Financial Receipting Confirmation',
        'Post Receipt to Ledger'
      );
    }

    /* SUB-MODULE 1.3: LANDLORDS LOGIC & INTERACTION ENGINES */


    /* --------------------------------------------------------------------------
       LANDLORD PROPERTY ACCOUNT STATEMENT ENGINE (landlord Statement - Jan.pdf)
       -------------------------------------------------------------------------- */

    function getLandlordStatementCurrentDate() {
      const now = new Date();
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const day = String(now.getDate()).padStart(2, '0');
      const mon = months[now.getMonth()];
      const yr = now.getFullYear();
      return `${day}-${mon}-${yr}`;
    }

    function getLandlordStatementCurrentTime() {
      const now = new Date();
      const hh = String(now.getHours()).padStart(2, '0');
      const mm = String(now.getMinutes()).padStart(2, '0');
      const ss = String(now.getSeconds()).padStart(2, '0');
      return `${hh}:${mm}:${ss}`;
    }

    function formatLandlordAmount(val, isTotals = false) {
      const num = Number(val) || 0;
      if (num === 0) return '0.00';
      if (num < 0) {
        if (isTotals) {
          return '(' + Math.abs(num).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ')';
        }
        return '-' + Math.abs(num).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      }
      return num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }

    function initLandlordStatementGenerator() {
      const rentPropSel = document.getElementById('landlord-stmt-property-rent');
      const utilPropSel = document.getElementById('landlord-stmt-property-util');
      if (!rentPropSel && !utilPropSel) return;

      const props = AppState.properties || [];
      const propOptions = props.map(p => `<option value="${p.id}">${p.name} (${p.lr || p.propertyIdCode || 'LR No.'})</option>`).join('');

      if (rentPropSel) {
        rentPropSel.innerHTML = propOptions;
        if (props.length > 0) rentPropSel.value = props[0].id;
      }
      if (utilPropSel) {
        utilPropSel.innerHTML = propOptions;
        if (props.length > 0) utilPropSel.value = props[0].id;
      }

      // Default to rent statement generation
      generateLandlordRentStatement();
    }

    function generateLandlordRentStatement() {
      const rentPropSel = document.getElementById('landlord-stmt-property-rent');
      const monthSel = document.getElementById('landlord-stmt-month-rent');
      const yearSel = document.getElementById('landlord-stmt-year-rent');
      if (!rentPropSel) return;

      const propId = rentPropSel.value || (AppState.properties[0] ? AppState.properties[0].id : '');
      const month = (monthSel && parseInt(monthSel.value, 10)) || 10;
      const year = (yearSel && parseInt(yearSel.value, 10)) || 2026;

      executeGenerateLandlordStatement(propId, month, year, '001');
    }

    function generateLandlordUtilityStatement() {
      const utilPropSel = document.getElementById('landlord-stmt-property-util');
      const payableSel = document.getElementById('landlord-stmt-payable-type');
      const monthSel = document.getElementById('landlord-stmt-month-util');
      const yearSel = document.getElementById('landlord-stmt-year-util');
      if (!utilPropSel) return;

      const propId = utilPropSel.value || (AppState.properties[0] ? AppState.properties[0].id : '');
      const payableCode = (payableSel && payableSel.value) || '002';
      const month = (monthSel && parseInt(monthSel.value, 10)) || 10;
      const year = (yearSel && parseInt(yearSel.value, 10)) || 2026;

      executeGenerateLandlordStatement(propId, month, year, payableCode);
    }

    function getLandlordPayableAmountFromLines(lines, payableCode) {
      let total = 0;
      lines.forEach(line => {
        const desc = (line.description || '').toLowerCase();
        if (payableCode === '001' || payableCode.toLowerCase().includes('rent')) {
          if (desc.includes('rent')) total += Number(line.amount) || 0;
        } else if (payableCode === '002' || payableCode.toLowerCase().includes('water')) {
          if (desc.includes('water')) total += Number(line.amount) || 0;
        } else if (payableCode === '009' || payableCode.toLowerCase().includes('service')) {
          if (desc.includes('service charge')) total += Number(line.amount) || 0;
        } else if (payableCode === '017' || payableCode.toLowerCase().includes('garbage')) {
          if (desc.includes('garbage')) total += Number(line.amount) || 0;
        } else if (payableCode === '015' || payableCode.toLowerCase().includes('security')) {
          if (desc.includes('security')) total += Number(line.amount) || 0;
        } else if (payableCode === '035' || payableCode.toLowerCase().includes('penalty')) {
          if (desc.includes('penalty')) total += Number(line.amount) || 0;
        }
      });
      return total;
    }

    function getLandlordReceiptPayableAmount(rc, payableCode, tenantInvs, allLines) {
      if (Array.isArray(rc.allocations) && rc.allocations.length > 0) {
        let amt = 0;
        rc.allocations.forEach(al => {
          const pName = (al.payable_name || al.payableName || al.description || '').toLowerCase();
          if ((payableCode === '001' || payableCode.toLowerCase().includes('rent')) && pName.includes('rent')) amt += Number(al.amount) || 0;
          else if ((payableCode === '002' || payableCode.toLowerCase().includes('water')) && pName.includes('water')) amt += Number(al.amount) || 0;
          else if ((payableCode === '009' || payableCode.toLowerCase().includes('service')) && pName.includes('service')) amt += Number(al.amount) || 0;
          else if ((payableCode === '017' || payableCode.toLowerCase().includes('garbage')) && pName.includes('garbage')) amt += Number(al.amount) || 0;
          else if ((payableCode === '015' || payableCode.toLowerCase().includes('security')) && pName.includes('security')) amt += Number(al.amount) || 0;
          else if ((payableCode === '035' || payableCode.toLowerCase().includes('penalty')) && pName.includes('penalty')) amt += Number(al.amount) || 0;
        });
        return amt;
      }

      const rawDate = rc.payment_date || rc.paymentDate || '2026-05-03';
      const rDate = rawDate.split('T')[0].split(' ')[0];
      const matchedInv = tenantInvs.find(i => {
        const invD = i.dueDate ? i.dueDate.substring(0, 7) : `${i.periodYear}-${String(i.periodMonth).padStart(2, '0')}`;
        return invD === rDate.substring(0, 7);
      });

      if (matchedInv) {
        const invLines = allLines.filter(l => l.invoice_id === matchedInv.id);
        const totalPaid = Number(rc.amount_paid || rc.amountPaid || 0);
        if (invLines.length > 0) {
          if (Math.abs(matchedInv.totalAmount - totalPaid) < 1) {
            return getLandlordPayableAmountFromLines(invLines, payableCode);
          }
          // Waterfall allocation
          let remaining = totalPaid;
          for (const line of invLines) {
            if (remaining <= 0) break;
            const lineAmt = Number(line.amount) || 0;
            const alloc = Math.min(remaining, lineAmt);
            const desc = (line.description || '').toLowerCase();
            let matches = false;
            if ((payableCode === '001' || payableCode.toLowerCase().includes('rent')) && desc.includes('rent')) matches = true;
            else if ((payableCode === '002' || payableCode.toLowerCase().includes('water')) && desc.includes('water')) matches = true;
            else if ((payableCode === '009' || payableCode.toLowerCase().includes('service')) && desc.includes('service charge')) matches = true;
            else if ((payableCode === '017' || payableCode.toLowerCase().includes('garbage')) && desc.includes('garbage')) matches = true;
            else if ((payableCode === '015' || payableCode.toLowerCase().includes('security')) && desc.includes('security')) matches = true;
            else if ((payableCode === '035' || payableCode.toLowerCase().includes('penalty')) && desc.includes('penalty')) matches = true;
            if (matches) return alloc;
            remaining -= alloc;
          }
          return 0;
        }
      }

      if (payableCode === '001' || payableCode.toLowerCase().includes('rent')) {
        return Number(rc.amount_paid || rc.amountPaid || 0);
      }
      return 0;
    }

    function executeGenerateLandlordStatement(propertyId, monthNum, yearNum, payableCode) {
      const tbody = document.getElementById('ll-stmt-table-body');
      if (!tbody) return;

      const prop = (AppState.properties || []).find(p => p.id === propertyId) || (AppState.properties || [])[0];
      if (!prop) {
        tbody.innerHTML = '<tr><td colspan="7" style="text-align: center; padding: 20px;">No property selected or available.</td></tr>';
        return;
      }

      const landlord = (AppState.landlords || []).find(l => l.id === prop.landlordId) || (AppState.landlords || [])[0] || {};
      const mandate = (AppState.mandates || []).find(m => m.propertyId === prop.id) || (AppState.mandates || [])[0] || {};

      const monthNames = ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      const monthLabel = monthNames[monthNum] || 'Month';
      const startOfMonth = `${yearNum}-${String(monthNum).padStart(2, '0')}-01`;
      const lastDay = new Date(yearNum, monthNum, 0).getDate();
      const endOfMonth = `${yearNum}-${String(monthNum).padStart(2, '0')}-${String(lastDay).padStart(2, '0')}`;

      // Set Metadata Headers
      const pinEl = document.getElementById('ll-stmt-header-pin');
      if (pinEl) pinEl.textContent = landlord.kraPin || 'P051112708J';

      const dateEl = document.getElementById('ll-stmt-header-date');
      if (dateEl) dateEl.textContent = getLandlordStatementCurrentDate();

      const timeEl = document.getElementById('ll-stmt-header-time');
      if (timeEl) timeEl.textContent = getLandlordStatementCurrentTime();

      const princEl = document.getElementById('ll-stmt-principal');
      if (princEl) princEl.textContent = `${landlord.landlordCode || 'L042'} - ${(landlord.name || 'COUNTY HOME DEVELOPERS LIMITED').toUpperCase()}`;

      const lrEl = document.getElementById('ll-stmt-property-lr');
      if (lrEl) lrEl.textContent = prop.lr || prop.name || 'RUNDA VIEW';

      const periodEl = document.getElementById('ll-stmt-payment-period');
      if (periodEl) periodEl.textContent = `${monthLabel} ${yearNum}`;

      // Payable Group Header Name
      let payableHeader = '001-Rent';
      if (payableCode === '002') payableHeader = '002-Water Bill';
      else if (payableCode === '009') payableHeader = '009-Service Charge';
      else if (payableCode === '017') payableHeader = '017-Garbage Collection';
      else if (payableCode === '015') payableHeader = '015-Security Levy';
      else if (payableCode === '035') payableHeader = '035-Penalty';

      // Query Units for this property
      const units = (AppState.units || []).filter(u => u.propertyId === prop.id);
      units.sort((a, b) => (a.code || '').localeCompare(b.code || '', undefined, { numeric: true }));

      let totalMonthlyBill = 0;
      let totalOpeningArrears = 0;
      let totalExpected = 0;
      let totalAmountPaid = 0;
      let totalClosingBalance = 0;
      let occupiedCount = 0;
      let vacantUnits = [];

      const rowsHtml = [];

      // Group Header Row
      rowsHtml.push(`
        <tr style="background: #FFFFFF; font-weight: 800;">
          <td colspan="7" style="padding: 5px 6px; font-weight: 800; border-top: 1px solid #000; border-bottom: 1px solid #000; border-right: none;">
            ${payableHeader}
          </td>
        </tr>
      `);

      units.forEach(u => {
        const lease = (AppState.leases || []).find(l => (l.unitCode === u.code || l.unitId === u.id) && l.startDate <= endOfMonth && (!l.endDate || l.endDate >= startOfMonth));
        const tenant = lease ? (AppState.tenants || []).find(t => t.id === lease.tenantId) : null;

        if (!lease || !tenant || u.status === 'VACANT') {
          vacantUnits.push(u.code);
          const baselineBill = (payableCode === '001' ? (Number(u.rent) || 0) : (payableCode === '009' ? (Number(u.sc) || 0) : 0));
          totalMonthlyBill += baselineBill;

          rowsHtml.push(`
            <tr style="border-bottom: 1px solid #E5E7EB;">
              <td style="padding: 4px 6px; border-right: 1px solid #000000; font-weight: 600;">${u.code}</td>
              <td style="padding: 4px 8px; border-right: 1px solid #000000; font-style: italic; color: #374151;">**Vacant**</td>
              <td style="padding: 4px 8px; text-align: right; border-right: 1px solid #000000;">${formatLandlordAmount(baselineBill)}</td>
              <td style="padding: 4px 8px; text-align: right; border-right: 1px solid #000000;">0.00</td>
              <td style="padding: 4px 8px; text-align: right; border-right: 1px solid #000000;">0.00</td>
              <td style="padding: 4px 8px; text-align: right; border-right: 1px solid #000000;">0.00</td>
              <td style="padding: 4px 8px; text-align: right;">0.00</td>
            </tr>
          `);
          return;
        }

        occupiedCount++;
        const tenantInvs = (AppState.invoices || []).filter(i => i.tenantId === tenant.id || i.tenantName === tenant.name);
        const tenantReceipts = (AppState.tenantReceipts || []).filter(r => r.tenant_id === tenant.id || r.tenant_name === tenant.name);
        const allLines = AppState.tenantInvoiceLines || [];

        // 1. Opening Arrears prior to startOfMonth
        let priorDebits = 0;
        let priorCredits = 0;

        tenantInvs.forEach(inv => {
          const invDate = inv.issueDate ? inv.issueDate.substring(0, 10) : (inv.dueDate ? inv.dueDate.substring(0, 7) + '-01' : `${inv.periodYear}-${String(inv.periodMonth).padStart(2, '0')}-01`);
          if (invDate < startOfMonth) {
            const invLines = allLines.filter(l => l.invoice_id === inv.id);
            if (invLines.length > 0) {
              priorDebits += getLandlordPayableAmountFromLines(invLines, payableCode);
            } else if (payableCode === '001') {
              priorDebits += (Number(inv.rent) || Number(inv.totalAmount) || 0);
            } else if (payableCode === '009') {
              priorDebits += (Number(inv.serviceCharge) || 0);
            } else if (payableCode === '002') {
              priorDebits += (Number(inv.utilities) || 0);
            }
          }
        });

        tenantReceipts.forEach(rc => {
          const rawDate = rc.payment_date || rc.paymentDate || '2026-05-03';
          const rDate = rawDate.split('T')[0].split(' ')[0];
          if (rDate < startOfMonth) {
            priorCredits += getLandlordReceiptPayableAmount(rc, payableCode, tenantInvs, allLines);
          }
        });

        const openingArrears = priorDebits - priorCredits;

        // 2. Current Month Bill
        let currentBill = 0;
        tenantInvs.forEach(inv => {
          const invDate = inv.issueDate ? inv.issueDate.substring(0, 10) : (inv.dueDate ? inv.dueDate.substring(0, 7) + '-01' : `${inv.periodYear}-${String(inv.periodMonth).padStart(2, '0')}-01`);
          if (invDate >= startOfMonth && invDate <= endOfMonth) {
            const invLines = allLines.filter(l => l.invoice_id === inv.id);
            if (invLines.length > 0) {
              currentBill += getLandlordPayableAmountFromLines(invLines, payableCode);
            } else if (payableCode === '001') {
              currentBill += (Number(inv.rent) || Number(inv.totalAmount) || 0);
            } else if (payableCode === '009') {
              currentBill += (Number(inv.serviceCharge) || 0);
            } else if (payableCode === '002') {
              currentBill += (Number(inv.utilities) || 0);
            }
          }
        });

        const rowExpected = openingArrears + currentBill;

        // 3. Current Month Paid
        let currentPaid = 0;
        tenantReceipts.forEach(rc => {
          const rawDate = rc.payment_date || rc.paymentDate || '2026-05-03';
          const rDate = rawDate.split('T')[0].split(' ')[0];
          if (rDate >= startOfMonth && rDate <= endOfMonth) {
            currentPaid += getLandlordReceiptPayableAmount(rc, payableCode, tenantInvs, allLines);
          }
        });

        // 4. Closing Balance
        const closingBalance = rowExpected - currentPaid;

        totalMonthlyBill += currentBill;
        totalOpeningArrears += openingArrears;
        totalExpected += rowExpected;
        totalAmountPaid += currentPaid;
        totalClosingBalance += closingBalance;

        rowsHtml.push(`
          <tr style="border-bottom: 1px solid #E5E7EB;">
            <td style="padding: 4px 6px; border-right: 1px solid #000000; font-weight: 600;">${u.code}</td>
            <td style="padding: 4px 8px; border-right: 1px solid #000000;">${tenant.name}</td>
            <td style="padding: 4px 8px; text-align: right; border-right: 1px solid #000000;">${formatLandlordAmount(currentBill)}</td>
            <td style="padding: 4px 8px; text-align: right; border-right: 1px solid #000000;">${formatLandlordAmount(openingArrears)}</td>
            <td style="padding: 4px 8px; text-align: right; border-right: 1px solid #000000;">${formatLandlordAmount(rowExpected)}</td>
            <td style="padding: 4px 8px; text-align: right; border-right: 1px solid #000000;">${formatLandlordAmount(currentPaid)}</td>
            <td style="padding: 4px 8px; text-align: right;">${formatLandlordAmount(closingBalance)}</td>
          </tr>
        `);
      });

      // Sub totals Row
      rowsHtml.push(`
        <tr style="font-weight: 800; border-top: 1px solid #000000;">
          <td colspan="2" style="padding: 4px 8px; text-align: right; font-style: italic; border-right: 1px solid #000000;">Sub totals</td>
          <td style="padding: 4px 8px; text-align: right; border-right: 1px solid #000000;">${formatLandlordAmount(totalMonthlyBill)}</td>
          <td style="padding: 4px 8px; text-align: right; border-right: 1px solid #000000;">${formatLandlordAmount(totalOpeningArrears)}</td>
          <td style="padding: 4px 8px; text-align: right; border-right: 1px solid #000000;">${formatLandlordAmount(totalExpected)}</td>
          <td style="padding: 4px 8px; text-align: right; border-right: 1px solid #000000;">${formatLandlordAmount(totalAmountPaid)}</td>
          <td style="padding: 4px 8px; text-align: right;">${formatLandlordAmount(totalClosingBalance)}</td>
        </tr>
      `);

      // Totals Row (with double underline)
      rowsHtml.push(`
        <tr style="font-weight: 800; border-top: 1px solid #000000; border-bottom: 3px double #000000;">
          <td colspan="2" style="padding: 4px 8px; text-align: right; font-style: italic; border-right: 1px solid #000000;">Totals</td>
          <td style="padding: 4px 8px; text-align: right; border-right: 1px solid #000000;">${formatLandlordAmount(totalMonthlyBill, true)}</td>
          <td style="padding: 4px 8px; text-align: right; border-right: 1px solid #000000;">${formatLandlordAmount(totalOpeningArrears, true)}</td>
          <td style="padding: 4px 8px; text-align: right; border-right: 1px solid #000000;">${formatLandlordAmount(totalExpected, true)}</td>
          <td style="padding: 4px 8px; text-align: right; border-right: 1px solid #000000;">${formatLandlordAmount(totalAmountPaid, true)}</td>
          <td style="padding: 4px 8px; text-align: right;">${formatLandlordAmount(totalClosingBalance, true)}</td>
        </tr>
      `);

      tbody.innerHTML = rowsHtml.join('');

      // Render Summary Block & Deductions
      const summaryBlock = document.getElementById('ll-stmt-rent-summary-block');
      const isRentStatement = (payableCode === '001');

      if (summaryBlock) {
        summaryBlock.style.display = 'block';

        const countEl = document.getElementById('ll-stmt-tenants-count');
        if (countEl) countEl.textContent = occupiedCount;

        const collectedEl = document.getElementById('ll-stmt-monthly-collected');
        if (collectedEl) collectedEl.textContent = formatLandlordAmount(totalAmountPaid);

        const expectedRemitEl = document.getElementById('ll-stmt-expected-remittance');
        if (expectedRemitEl) expectedRemitEl.textContent = formatLandlordAmount(totalAmountPaid);

        // Deductions
        const feePct = isRentStatement ? (Number(mandate.feePct) || 8.0) : 0;
        const mgmtFee = isRentStatement ? (totalAmountPaid * (feePct / 100)) : 0;
        const vatAmt = isRentStatement ? (mgmtFee * 0.16) : 0;
        const totalDeductions = mgmtFee + vatAmt;
        const netDue = totalAmountPaid - totalDeductions;

        const feePctEl = document.getElementById('ll-stmt-fee-pct');
        if (feePctEl) feePctEl.textContent = `${feePct.toFixed(2)} %`;

        const mgmtFeeEl = document.getElementById('ll-stmt-mgmt-fee');
        if (mgmtFeeEl) mgmtFeeEl.textContent = formatLandlordAmount(mgmtFee);

        const vatEl = document.getElementById('ll-stmt-vat-amount');
        if (vatEl) vatEl.textContent = formatLandlordAmount(vatAmt);

        const totalDedEl = document.getElementById('ll-stmt-total-deductions');
        if (totalDedEl) totalDedEl.textContent = formatLandlordAmount(totalDeductions);

        const netDueEl = document.getElementById('ll-stmt-net-due');
        if (netDueEl) netDueEl.textContent = formatLandlordAmount(netDue);

        // Hide deductions container for utility statements if not applicable
        const dedContainer = summaryBlock.querySelector('div[style*="justify-content: flex-end"]');
        if (dedContainer) {
          if (!isRentStatement) {
            dedContainer.style.display = 'none';
          } else {
            dedContainer.style.display = 'flex';
          }
        }
      }

      // Vacant units
      const vacantEl = document.getElementById('ll-stmt-vacant-units');
      if (vacantEl) vacantEl.textContent = vacantUnits.length > 0 ? vacantUnits.join(' , ') : 'None';

      // Pay to details
      const payToEl = document.getElementById('ll-stmt-pay-to');
      if (payToEl) {
        const bName = landlord.bank || prop.bankName || 'CO-OPERATIVE BANK';
        const bAcc = landlord.accNo || prop.bankAccountNo || '';
        const bBranch = landlord.branch || prop.bankBranch || '';
        const accInfo = bAcc ? ` (A/C: ${bAcc}${bBranch ? ' • ' + bBranch : ''})` : '';
        payToEl.textContent = `- - ${bName.toUpperCase()}${accInfo}`;
      }

      // Enable print button
      const printBtn = document.getElementById('btn-print-landlord-statement');
      if (printBtn) {
        printBtn.style.opacity = '1';
        printBtn.removeAttribute('disabled');
      }
    }

    function printLandlordStatement() {
      window.print();
    }

    // Tab switching for 1.3 Landlords
    function setupLandlordTabs() {
      const landlordTabBtns = document.querySelectorAll('.landlord-tab-btn');
      landlordTabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          landlordTabBtns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');

          const target = btn.getAttribute('data-landlord-target');
          AppState.activeLandlordTab = target;
          document.querySelectorAll('.landlord-panel').forEach(p => p.classList.remove('active'));
          const targetPanel = document.getElementById(`panel-landlord-${target}`);
          if (targetPanel) targetPanel.classList.add('active');

          if (target === 'statements') {
            initLandlordStatementGenerator();
          }
        });
      });
    }

    // Populate Landlord Dropdowns
    function populateLandlordDropdowns() {
      const stmtLlSel = document.getElementById('stmt-landlord-select');
      if (stmtLlSel) {
        stmtLlSel.innerHTML = AppState.landlords.map(l => 
          `<option value="${l.id}">${l.name} (${l.kraPin})</option>`
        ).join('');
        if (AppState.landlords.length > 0) {
          handleStmtLandlordChange(AppState.landlords[0].id);
        }
      }

      // Default payout date in modal to today
      const payoutDateInput = document.getElementById('payout-date-input');
      if (payoutDateInput && !payoutDateInput.value) {
        payoutDateInput.value = new Date().toISOString().slice(0, 10);
      }
    }

    function handleStmtLandlordChange(landlordId) {
      const landlord = AppState.landlords.find(l => l.id === landlordId);
      if (!landlord) return;

      const stmtPropSel = document.getElementById('stmt-property-select');
      if (!stmtPropSel) return;

      // Find mandates for this landlord
      const landlordMandates = AppState.mandates.filter(m => m.landlordName === landlord.name);
      const matchingProps = AppState.properties.filter(p => landlordMandates.some(m => m.propertyName === p.name));

      stmtPropSel.innerHTML = matchingProps.map(p => 
        `<option value="${p.id}">${p.name} (${p.lr})</option>`
      ).join('');

      if (matchingProps.length > 0) {
        handleStmtPropertyChange(matchingProps[0].id);
      } else {
        stmtPropSel.innerHTML = AppState.properties.map(p => `<option value="${p.id}">${p.name}</option>`).join('');
        if (AppState.properties.length > 0) {
          handleStmtPropertyChange(AppState.properties[0].id);
        }
      }
    }

    function handleStmtPropertyChange(propertyId) {
      const landlordId = document.getElementById('stmt-landlord-select').value;
      const landlord = AppState.landlords.find(l => l.id === landlordId);
      const property = AppState.properties.find(p => p.id === propertyId);
      if (!property || !landlord) return;

      // Find mandate
      const mandate = AppState.mandates.find(m => m.landlordName === landlord.name && m.propertyName === property.name) || AppState.mandates[0];
      if (mandate) {
        document.getElementById('stmt-fee-pct').value = mandate.feePct;
      }

      // Compute gross rent from active leases for this property
      const propUnits = AppState.units.filter(u => u.propertyId === property.id).map(u => u.id);
      const activeLeases = AppState.leases.filter(l => propUnits.includes(l.unitId) && l.status === 'Active');
      const totalRent = activeLeases.reduce((sum, l) => sum + l.rentAmount, 0);

      document.getElementById('stmt-gross-rent').value = totalRent > 0 ? totalRent.toFixed(2) : "32000.00";
      calculateStatementNet();
    }

    function calculateStatementNet() {
      const gross = parseFloat(document.getElementById('stmt-gross-rent').value) || 0;
      const maint = parseFloat(document.getElementById('stmt-maintenance-deductions').value) || 0;

      const landlordId = document.getElementById('stmt-landlord-select').value;
      const propertyId = document.getElementById('stmt-property-select').value;
      const landlord = AppState.landlords.find(l => l.id === landlordId);
      const property = AppState.properties.find(p => p.id === propertyId);

      const mandate = (landlord && property) 
        ? AppState.mandates.find(m => m.landlordName === landlord.name && m.propertyName === property.name) 
        : null;

      const applyVat = mandate ? mandate.vat : true;
      const applyMri = mandate ? mandate.mri : true;

      let comm = 0;
      if (mandate && mandate.commissionType === 'FIXED') {
        comm = Number(mandate.feeFixed || 0);
      } else {
        const feePct = parseFloat(document.getElementById('stmt-fee-pct').value) || (mandate ? mandate.feePct : 8.5);
        comm = gross * (feePct / 100);
      }

      const vat = applyVat ? (comm * 0.16) : 0;
      const mri = applyMri ? (gross * 0.075) : 0;
      const net = Math.max(0, gross - comm - vat - maint - mri);

      document.getElementById('stmt-comm-amount').value = comm.toFixed(2);
      document.getElementById('stmt-vat-amount').value = vat.toFixed(2);
      document.getElementById('stmt-mri-tax').value = mri.toFixed(2);
      document.getElementById('stmt-net-payable-display').textContent = `KES ${net.toLocaleString('en-KE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
      document.getElementById('stmt-net-payable').value = net.toFixed(2);
    }

    function handleStatementSubmit(e) {
      e.preventDefault();
      const landlordId = document.getElementById('stmt-landlord-select').value;
      const propertyId = document.getElementById('stmt-property-select').value;
      const landlord = AppState.landlords.find(l => l.id === landlordId);
      const property = AppState.properties.find(p => p.id === propertyId);

      const month = parseInt(document.getElementById('stmt-period-month').value, 10);
      const year = parseInt(document.getElementById('stmt-period-year').value, 10);
      const gross = parseFloat(document.getElementById('stmt-gross-rent').value) || 0;
      const feePct = parseFloat(document.getElementById('stmt-fee-pct').value) || 0;
      const comm = parseFloat(document.getElementById('stmt-comm-amount').value) || 0;
      const vat = parseFloat(document.getElementById('stmt-vat-amount').value) || 0;
      const maint = parseFloat(document.getElementById('stmt-maintenance-deductions').value) || 0;
      const mri = parseFloat(document.getElementById('stmt-mri-tax').value) || 0;
      const net = parseFloat(document.getElementById('stmt-net-payable').value) || 0;
      const status = document.getElementById('stmt-initial-status').value || 'Approved';

      const stmtId = `STM-${year}-${String(month).padStart(2, '0')}-${String(AppState.landlordStatements.length + 1).padStart(3, '0')}`;

      confirmAction(
        `Are you sure you want to generate Landlord Remittance Statement <strong>${stmtId}</strong> for <strong>${landlord.name}</strong> on <strong>${property.name}</strong> (Gross: KES ${gross.toLocaleString()}, Net: <strong>KES ${net.toLocaleString()}</strong>)?`,
        () => {
          const remitDetails = landlord.remitMethod === 'BANK'
            ? `${landlord.bank} • ${landlord.branch} • Acc: ${landlord.accNo}`
            : `M-Pesa B2C Mobile • ${landlord.phone}`;

          const newStatement = {
            id: stmtId,
            landlordId: landlord.id,
            landlordName: landlord.name,
            propertyId: property.id,
            propertyName: property.name,
            periodMonth: month,
            periodYear: year,
            grossRent: gross,
            commPct: feePct,
            commAmount: comm,
            vatAmount: vat,
            maintenance: maint,
            mriTax: mri,
            netPayable: net,
            status: status,
            remitMethod: landlord.remitMethod === 'BANK' ? `Bank Transfer (${landlord.bank})` : 'M-Pesa B2C',
            remitDetails: remitDetails,
            payoutRef: null,
            payoutDate: null
          };

          AppState.landlordStatements.unshift(newStatement);
          renderLandlordStatementsTable();
          renderLandlordPayoutQueueTable();
          showToast(`✓ Statement ${stmtId} generated for ${landlord.name} (Net: KES ${net.toLocaleString()})`);
        },
        'Statement Generation Confirmation',
        'Generate Statement'
      );
    }

    function renderLandlordPortfolioTable() {
      const tbody = document.getElementById('table-landlord-portfolio-body');
      if (!tbody) return;

      const badge = document.getElementById('portfolio-count-badge');
      if (badge) badge.textContent = `${AppState.mandates.length} Active Mandates`;

      tbody.innerHTML = AppState.mandates.map(m => {
        const landlord = AppState.landlords.find(l => l.name === m.landlordName) || AppState.landlords[0];
        const property = AppState.properties.find(p => p.name === m.propertyName) || AppState.properties[0];
        const unitsCount = AppState.units.filter(u => u.propertyName === m.propertyName).length;

        const remitText = landlord.remitMethod === 'BANK' 
          ? `🏦 ${landlord.bank} (${landlord.accNo})`
          : `📱 M-Pesa B2C (${landlord.phone})`;

        const commText = m.commissionType === 'FIXED'
          ? `<strong>KES ${Number(m.feeFixed || 0).toLocaleString()}</strong> <small style="display:block; color:var(--text-muted); font-size:0.72rem;">Fixed / Mo</small>`
          : `<strong>${m.feePct}%</strong> <small style="display:block; color:var(--text-muted); font-size:0.72rem;">Gross Rent</small>`;

        const propStatusBadge = property && property.isActive === false
          ? '<span class="badge-status" style="color: #DC2626; background: rgba(239, 68, 68, 0.12); font-size: 0.72rem; font-weight: 700;">○ DEACTIVATED (Cascaded)</span>'
          : '<span class="badge-status" style="color: var(--accent-secondary); font-size: 0.72rem; font-weight: 700;">● ACTIVE</span>';

        return `
          <tr>
            <td>
              <div style="display: flex; align-items: center; gap: 6px;">
                <strong>${m.landlordName}</strong>
                <span class="badge-status" style="font-weight: 800; font-size: 0.72rem; background: var(--accent-primary); color: #FFFFFF;">${landlord.landlordCode || landlord.id}</span>
              </div>
              <div style="font-size:0.75rem; color:var(--text-muted);">${landlord.entityType} • ${landlord.kraPin}</div>
            </td>
            <td>
              <strong>${m.propertyName}</strong>
              <div style="font-size:0.75rem; color:var(--text-muted);">${property ? property.lr : 'N/A'}</div>
            </td>
            <td><span class="badge-status" style="font-size:0.75rem;">${unitsCount} Units</span></td>
            <td>${commText}</td>
            <td>${m.vat ? '<span style="color: var(--accent-secondary); font-weight: 700;">✓ 16% VAT</span>' : 'Exempt'}</td>
            <td>${m.mri ? '<span style="color: var(--accent-amber); font-weight: 700;">✓ 7.5% MRI</span>' : 'Exempt'}</td>
            <td>${m.manager}</td>
            <td style="font-size:0.78rem;">${remitText}</td>
            <td>${propStatusBadge}</td>
            <td>
              <button class="btn-action-pill" onclick="prepareQuickStatement('${landlord.id}', '${property ? property.id : ''}')">Generate</button>
            </td>
          </tr>
        `;
      }).join('');
    }

    function prepareQuickStatement(landlordId, propertyId) {
      const stmtTabBtn = document.querySelector('[data-landlord-target="statements"]');
      if (stmtTabBtn) stmtTabBtn.click();

      const llSel = document.getElementById('stmt-landlord-select');
      if (llSel && landlordId) {
        llSel.value = landlordId;
        handleStmtLandlordChange(landlordId);
      }
      if (propertyId) {
        const propSel = document.getElementById('stmt-property-select');
        if (propSel) {
          propSel.value = propertyId;
          handleStmtPropertyChange(propertyId);
        }
      }
      showToast('Landlord and property terms loaded for statement calculation.');
    }

    function renderLandlordStatementsTable() {
      const tbody = document.getElementById('table-statements-body');
      if (!tbody) return;

      const monthNames = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

      tbody.innerHTML = AppState.landlordStatements.map(s => `
        <tr>
          <td><strong>${s.id}</strong></td>
          <td>${monthNames[s.periodMonth]} ${s.periodYear}</td>
          <td><strong>${s.landlordName}</strong></td>
          <td>${s.propertyName}</td>
          <td>KES ${s.grossRent.toLocaleString()}</td>
          <td style="color: var(--accent-primary);">-KES ${s.commAmount.toLocaleString()}</td>
          <td style="color: var(--text-muted);">-KES ${s.vatAmount.toLocaleString()}</td>
          <td>${s.maintenance > 0 ? `-KES ${s.maintenance.toLocaleString()}` : '0.00'}</td>
          <td style="color: var(--accent-amber);">-KES ${s.mriTax.toLocaleString()}</td>
          <td><strong style="color: var(--accent-secondary);">KES ${s.netPayable.toLocaleString()}</strong></td>
          <td>
            <span class="badge-status" style="color: ${s.status === 'Paid' ? 'var(--accent-secondary)' : s.status === 'Approved' ? 'var(--accent-tertiary)' : 'var(--text-muted)'};">
              ${s.status}
            </span>
          </td>
          <td>
            ${s.status !== 'Paid' 
              ? `<button class="btn-action-pill" onclick="openLandlordPayoutModal('${s.id}')">💳 Payout</button>` 
              : `<span style="font-size:0.75rem; color:var(--accent-secondary);">✓ Disbursed</span>`}
          </td>
        </tr>
      `).join('');
    }

    function renderLandlordPayoutQueueTable() {
      const tbody = document.getElementById('table-landlord-payouts-body');
      if (!tbody) return;

      const monthNames = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

      // Update stat pills
      const totalGross = AppState.landlordStatements.reduce((sum, s) => sum + s.grossRent, 0);
      const totalCommVat = AppState.landlordStatements.reduce((sum, s) => sum + s.commAmount + s.vatAmount, 0);
      const totalMri = AppState.landlordStatements.reduce((sum, s) => sum + s.mriTax, 0);
      const totalNetDisbursed = AppState.landlordStatements.filter(s => s.status === 'Paid').reduce((sum, s) => sum + s.netPayable, 0);

      const grossEl = document.getElementById('landlord-stat-gross');
      const commEl = document.getElementById('landlord-stat-commission');
      const mriEl = document.getElementById('landlord-stat-mri');
      const netEl = document.getElementById('landlord-stat-net');

      if (grossEl) grossEl.textContent = `KES ${totalGross.toLocaleString('en-KE', { minimumFractionDigits: 2 })}`;
      if (commEl) commEl.textContent = `KES ${totalCommVat.toLocaleString('en-KE', { minimumFractionDigits: 2 })}`;
      if (mriEl) mriEl.textContent = `KES ${totalMri.toLocaleString('en-KE', { minimumFractionDigits: 2 })}`;
      if (netEl) netEl.textContent = `KES ${totalNetDisbursed.toLocaleString('en-KE', { minimumFractionDigits: 2 })}`;

      tbody.innerHTML = AppState.landlordStatements.map(s => `
        <tr>
          <td><strong>${s.id}</strong></td>
          <td>${monthNames[s.periodMonth]} ${s.periodYear}</td>
          <td><strong>${s.landlordName}</strong></td>
          <td>${s.propertyName}</td>
          <td style="font-size:0.8rem;">${s.remitDetails}</td>
          <td><strong style="color: var(--accent-secondary); font-size: 0.95rem;">KES ${s.netPayable.toLocaleString()}</strong></td>
          <td>
            <span class="badge-status" style="color: ${s.status === 'Paid' ? 'var(--accent-secondary)' : 'var(--accent-amber)'};">
              ${s.status === 'Paid' ? 'Settled' : 'Pending Payout'}
            </span>
          </td>
          <td>
            ${s.payoutRef ? `<span style="font-family:'JetBrains Mono',monospace; font-size:0.78rem;">${s.payoutRef}</span>` : '—'}
          </td>
          <td>
            ${s.status !== 'Paid' 
              ? `<button class="btn-elevated-primary" style="padding: 6px 14px; font-size:0.75rem;" onclick="openLandlordPayoutModal('${s.id}')">💳 Mark as Paid</button>`
              : `<span style="font-size:0.75rem; color:var(--text-muted);">${s.payoutDate}</span>`}
          </td>
        </tr>
      `).join('');
    }

    // Landlord Payout Modal Handlers
    function openLandlordPayoutModal(statementId) {
      const statement = AppState.landlordStatements.find(s => s.id === statementId);
      if (!statement) return;

      const modal = document.getElementById('modal-landlord-payout');
      if (!modal) return;
      modal.classList.add('active');

      document.getElementById('payout-modal-landlord-name').textContent = statement.landlordName;
      document.getElementById('payout-modal-remit-info').textContent = statement.remitDetails;
      document.getElementById('payout-modal-amount-due').textContent = `KES ${statement.netPayable.toLocaleString('en-KE', { minimumFractionDigits: 2 })}`;
      document.getElementById('payout-modal-statement-id').value = statement.id;
      document.getElementById('payout-modal-amount').value = statement.netPayable;

      const channelSel = document.getElementById('payout-method-select');
      if (statement.remitMethod.includes('M-Pesa')) {
        channelSel.value = 'M-Pesa B2C';
        document.getElementById('payout-ref-input').value = 'B2C-S' + Math.random().toString(36).substring(2, 7).toUpperCase();
      } else {
        channelSel.value = 'Bank Transfer';
        document.getElementById('payout-ref-input').value = 'EFT-KCB-' + Math.floor(100000 + Math.random() * 900000);
      }

      document.getElementById('payout-date-input').value = new Date().toISOString().slice(0, 10);
      document.getElementById('payout-notes-input').value = `Remittance payout for statement ${statement.id} to ${statement.landlordName}`;
    }

    function closeLandlordPayoutModal() {
      const modal = document.getElementById('modal-landlord-payout');
      if (modal) modal.classList.remove('active');
    }

    function handleLandlordPayoutSubmit(e) {
      e.preventDefault();
      const statementId = document.getElementById('payout-modal-statement-id').value;
      const statement = AppState.landlordStatements.find(s => s.id === statementId);
      if (!statement) return;

      const method = document.getElementById('payout-method-select').value;
      const refNo = document.getElementById('payout-ref-input').value.trim();
      const date = document.getElementById('payout-date-input').value || new Date().toISOString().slice(0, 10);
      const notes = document.getElementById('payout-notes-input').value || 'Landlord remittance disbursed';

      confirmAction(
        `Are you sure you want to authorize and disburse <strong>KES ${statement.netPayable.toLocaleString()}</strong> to Landlord <strong>${statement.landlordName}</strong> via ${method} (Ref: <code>${refNo}</code>)?`,
        () => {
          statement.status = 'Paid';
          statement.payoutRef = refNo;
          statement.payoutDate = date;

          AppState.landlordPayouts.push({
            id: `PAY-${String(AppState.landlordPayouts.length + 1).padStart(3, '0')}`,
            statementId: statement.id,
            landlordName: statement.landlordName,
            method: method,
            refNo: refNo,
            amount: statement.netPayable,
            date: date,
            notes: notes
          });

          closeLandlordPayoutModal();
          renderLandlordStatementsTable();
          renderLandlordPayoutQueueTable();
          showToast(`✓ Payout recorded: KES ${statement.netPayable.toLocaleString()} disbursed to ${statement.landlordName} (Ref: ${refNo})`);
        },
        'Disbursement Authorization Warning',
        'Authorize & Disburse Payout',
        true
      );
    }

    /* SUB-MODULE 1.4: REPAIRS & MAINTENANCE LOGIC & ENGINES */

    // Tab switching for 1.4 Repairs
    function setupRepairTabs() {
      const repairTabBtns = document.querySelectorAll('.repair-tab-btn');
      repairTabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          repairTabBtns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');

          const target = btn.getAttribute('data-repair-target');
          AppState.activeRepairTab = target;
          document.querySelectorAll('.repair-panel').forEach(p => p.classList.remove('active'));
          const targetPanel = document.getElementById(`panel-repair-${target}`);
          if (targetPanel) targetPanel.classList.add('active');
        });
      });
    }

    function populateRepairDropdowns() {
      // Properties for Ticket Form
      const ticketPropSelect = document.getElementById('ticket-property-select');
      const woPropSelect = document.getElementById('wo-property-select');
      if (ticketPropSelect && woPropSelect) {
        const propOptions = AppState.properties.map(p => `<option value="${p.id}">${p.name} (${p.prefix})</option>`).join('');
        ticketPropSelect.innerHTML = propOptions;
        woPropSelect.innerHTML = propOptions;

        if (AppState.properties.length > 0) {
          handleTicketPropertyChange(AppState.properties[0].id);
          handleWoPropertyChange(AppState.properties[0].id);
        }
      }

      // Vendors for Work Order Form
      populateWoVendorDropdown();

      // Open Tickets for Work Order Form
      populateWoTicketDropdown();
    }

    function populateWoVendorDropdown() {
      const woVendorSelect = document.getElementById('wo-vendor-select');
      if (!woVendorSelect) return;
      woVendorSelect.innerHTML = AppState.vendors
        .filter(v => v.isActive)
        .map(v => `<option value="${v.id}">${v.name} [${v.tradeCategory}]</option>`)
        .join('');
    }

    function populateWoTicketDropdown() {
      const woTicketSelect = document.getElementById('wo-ticket-select');
      if (!woTicketSelect) return;
      const openTickets = AppState.maintenanceRequests.filter(t => t.status !== 'Completed');
      let options = `<option value="">Direct Work Order (No Ticket Reference)</option>`;
      options += openTickets.map(t => `<option value="${t.id}">${t.ticketNumber} — ${t.category} (${t.propertyName} • ${t.unitCode})</option>`).join('');
      woTicketSelect.innerHTML = options;
    }

    function handleTicketPropertyChange(propId) {
      const unitSelect = document.getElementById('ticket-unit-select');
      if (!unitSelect) return;
      const propUnits = AppState.units.filter(u => u.propertyId === propId);
      let options = `<option value="COMMON">Common Area / External Facade</option>`;
      options += propUnits.map(u => `<option value="${u.id}">${u.code} (${u.floor} • ${u.config.replace('_', ' ')})</option>`).join('');
      unitSelect.innerHTML = options;
      handleTicketUnitChange(unitSelect.value);
    }

    function handleTicketUnitChange(unitId) {
      const tenantSelect = document.getElementById('ticket-tenant-select');
      if (!tenantSelect) return;

      if (!unitId || unitId === 'COMMON') {
        tenantSelect.innerHTML = `<option value="">Estate Common Area / Not Tenancy-Specific</option>`;
        return;
      }

      const activeLease = AppState.leases.find(l => l.unitId === unitId && l.status === 'Active');
      if (activeLease) {
        tenantSelect.innerHTML = `<option value="${activeLease.tenantId}" selected>${activeLease.tenantName} (Active Lease)</option>`;
      } else {
        tenantSelect.innerHTML = `<option value="">Vacant Unit / Turnaround Inspection</option>`;
      }
    }

    function handleWoPropertyChange(propId) {
      const unitSelect = document.getElementById('wo-unit-select');
      if (!unitSelect) return;
      const propUnits = AppState.units.filter(u => u.propertyId === propId);
      let options = `<option value="COMMON">Common Area / External Grounds</option>`;
      options += propUnits.map(u => `<option value="${u.id}">${u.code} (${u.floor})</option>`).join('');
      unitSelect.innerHTML = options;
    }

    function handleWoTicketSelect(ticketId) {
      if (!ticketId) return;
      const ticket = AppState.maintenanceRequests.find(t => t.id === ticketId);
      if (!ticket) return;

      const propSelect = document.getElementById('wo-property-select');
      if (propSelect) {
        propSelect.value = ticket.propertyId;
        handleWoPropertyChange(ticket.propertyId);
      }

      const unitSelect = document.getElementById('wo-unit-select');
      if (unitSelect) {
        unitSelect.value = ticket.unitId || 'COMMON';
      }

      const scopeInput = document.getElementById('wo-scope-input');
      if (scopeInput && !scopeInput.value) {
        scopeInput.value = `Remediate ${ticket.category.toLowerCase()} defect: ${ticket.description}`;
      }

      // Recommend vendor by trade category
      const matchedVendor = AppState.vendors.find(v => v.tradeCategory.toLowerCase() === ticket.category.toLowerCase() && v.isActive);
      if (matchedVendor) {
        const vendorSelect = document.getElementById('wo-vendor-select');
        if (vendorSelect) vendorSelect.value = matchedVendor.id;
      }
    }

    function handleTicketSubmit(e) {
      e.preventDefault();
      const propSelect = document.getElementById('ticket-property-select');
      const propId = propSelect.value;
      const property = AppState.properties.find(p => p.id === propId);

      const unitSelect = document.getElementById('ticket-unit-select');
      const unitId = unitSelect.value === 'COMMON' ? null : unitSelect.value;
      const unit = unitId ? AppState.units.find(u => u.id === unitId) : null;

      const tenantSelect = document.getElementById('ticket-tenant-select');
      const tenantId = tenantSelect.value || null;
      const tenant = tenantId ? AppState.tenants.find(t => t.id === tenantId) : null;

      const category = document.getElementById('ticket-category-select').value;
      const priority = document.getElementById('ticket-priority-select').value;
      const reportedBy = document.getElementById('ticket-reported-by-select').value;
      const description = document.getElementById('ticket-desc-input').value.trim();

      confirmAction(
        `Are you sure you want to log Maintenance Incident Ticket for Property <strong>${property ? property.name : 'Unknown Property'}</strong> (${unit ? `Unit ${unit.code}` : 'Common Area'}) under <strong>${priority}</strong> priority?`,
        () => {
          const newId = `REQ-2026-${String(AppState.maintenanceRequests.length + 1).padStart(3, '0')}`;
          const ticketNum = `TKT-2026-${String(AppState.maintenanceRequests.length + 1).padStart(3, '0')}`;
          const now = new Date();
          const createdAt = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')} ${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;

          AppState.maintenanceRequests.unshift({
            id: newId,
            ticketNumber: ticketNum,
            propertyId: propId,
            propertyName: property ? property.name : 'Unknown Property',
            unitId: unitId,
            unitCode: unit ? unit.code : 'Common Area',
            tenantId: tenantId,
            tenantName: tenant ? tenant.name : (unitId ? 'Vacant Turnaround' : 'Estate Common Area'),
            category: category,
            priority: priority,
            reportedBy: reportedBy,
            description: description,
            status: 'Reported',
            createdAt: createdAt
          });

          document.getElementById('form-maintenance-ticket').reset();
          populateRepairDropdowns();
          renderMaintenanceTicketsTable();
          showToast(`✓ Incident ticket ${ticketNum} logged under priority: ${priority}`);
        },
        'Maintenance Ticket Confirmation',
        'Log Incident Ticket'
      );
    }

    function convertTicketToLpo(ticketId) {
      const ticket = AppState.maintenanceRequests.find(t => t.id === ticketId);
      if (!ticket) return;

      // Switch to Work Orders tab
      const woTabBtn = document.querySelector('[data-repair-target="work-orders"]');
      if (woTabBtn) woTabBtn.click();

      // Populate dropdowns & select this ticket
      const ticketSelect = document.getElementById('wo-ticket-select');
      if (ticketSelect) {
        ticketSelect.value = ticketId;
        handleWoTicketSelect(ticketId);
      }

      showToast(`Loaded ${ticket.ticketNumber} into Work Order generator.`);
    }

    function handleWorkOrderSubmit(e) {
      e.preventDefault();
      const ticketId = document.getElementById('wo-ticket-select').value || null;
      const ticket = ticketId ? AppState.maintenanceRequests.find(t => t.id === ticketId) : null;

      const vendorId = document.getElementById('wo-vendor-select').value;
      const vendor = AppState.vendors.find(v => v.id === vendorId);

      const propId = document.getElementById('wo-property-select').value;
      const property = AppState.properties.find(p => p.id === propId);

      const unitId = document.getElementById('wo-unit-select').value === 'COMMON' ? null : document.getElementById('wo-unit-select').value;
      const unit = unitId ? AppState.units.find(u => u.id === unitId) : null;

      const estCost = parseFloat(document.getElementById('wo-est-cost-input').value) || 0;
      const actCost = parseFloat(document.getElementById('wo-act-cost-input').value) || estCost;
      const allocation = document.getElementById('wo-allocation-select').value;
      const status = document.getElementById('wo-status-select').value;
      const approvedBy = document.getElementById('wo-approved-by-input').value;
      const scope = document.getElementById('wo-scope-input').value.trim();

      const lpoNum = `LPO-2026-${String(AppState.maintenanceWorkOrders.length + 1).padStart(3, '0')}`;

      confirmAction(
        `Are you sure you want to authorize and issue Local Purchase Order <strong>[${lpoNum}]</strong> for <strong>KES ${actCost.toLocaleString()}</strong> to Contractor <strong>${vendor ? vendor.name : 'Contractor'}</strong> (${allocation})?`,
        () => {
          // Determine Target Account & Financial Accounting Impact
          let targetAccount = 'Common Reserve Pool';
          let accountingImpact = 'Absorbed into Common Service Charge Pool';

          if (allocation === 'Landlord Deductible') {
            const mandate = AppState.mandates.find(m => m.propertyName === (property ? property.name : ''));
            targetAccount = mandate ? mandate.landlordName : 'Property Landlord';
            accountingImpact = `Deducted from ${targetAccount} Monthly Remittance Statement`;

            // Update landlord statement maintenance deduction if statement exists
            const stmt = AppState.landlordStatements.find(s => s.propertyName === (property ? property.name : ''));
            if (stmt) {
              stmt.maintenance += actCost;
              stmt.netPayable = Math.max(0, stmt.grossRent - stmt.commAmount - stmt.vatAmount - stmt.maintenance - stmt.mriTax);
              renderLandlordStatementsTable();
            }
          } else if (allocation === 'Tenant Damage Recovery') {
            const lease = unitId ? AppState.leases.find(l => l.unitId === unitId && l.status === 'Active') : null;
            targetAccount = lease ? lease.tenantName : (ticket ? ticket.tenantName : 'Occupant Tenant');
            accountingImpact = `Billed to Tenant Debit Ledger / Invoice Surcharge`;
          } else {
            targetAccount = `${property ? property.name : 'Estate'} SC Reserve Pool`;
            accountingImpact = `Absorbed into Common Area Expense Pool`;
          }

          const issuedDate = new Date().toISOString().slice(0, 10);

          // Update ticket status if linked
          if (ticket) {
            ticket.status = (status === 'Fulfilled') ? 'Completed' : 'In_Progress';
          }

          AppState.maintenanceWorkOrders.unshift({
            id: lpoNum,
            lpoNumber: lpoNum,
            ticketId: ticketId,
            ticketNumber: ticket ? ticket.ticketNumber : 'Direct Work Order',
            vendorId: vendorId,
            vendorName: vendor ? vendor.name : 'Contractor',
            propertyId: propId,
            propertyName: property ? property.name : 'Property',
            unitId: unitId,
            unitCode: unit ? unit.code : 'Common Area',
            scopeOfWork: scope,
            estimatedCost: estCost,
            actualCost: actCost,
            costAllocation: allocation,
            approvalStatus: status,
            approvedBy: approvedBy,
            issuedDate: issuedDate,
            completionDate: (status === 'Fulfilled') ? issuedDate : null,
            targetAccount: targetAccount,
            accountingImpact: accountingImpact
          });

          document.getElementById('form-work-order').reset();
          populateWoTicketDropdown();
          renderWorkOrdersTable();
          renderMaintenanceTicketsTable();
          renderCostAllocationLedger();
          showToast(`✓ Work Order & LPO ${lpoNum} authorized (KES ${actCost.toLocaleString()})`);
        },
        'LPO Issuance & Financial Commitment Warning',
        'Issue & Authorize LPO',
        true
      );
    }

    function handleVendorSubmit(e) {
      e.preventDefault();
      const name = document.getElementById('vendor-name-input').value.trim();
      const trade = document.getElementById('vendor-trade-select').value;
      const contact = document.getElementById('vendor-contact-input').value.trim();
      const phone = document.getElementById('vendor-phone-input').value.trim();
      const email = document.getElementById('vendor-email-input').value.trim() || '—';
      const pin = document.getElementById('vendor-pin-input').value.trim() || '—';
      const payment = document.getElementById('vendor-payment-input').value.trim() || 'Pending Account Verification';

      confirmAction(
        `Are you sure you want to register and approve Contractor <strong>${name}</strong> (${trade}) in the vendor directory?`,
        () => {
          const vendorId = `VND-${String(AppState.vendors.length + 1).padStart(3, '0')}`;

          AppState.vendors.push({
            id: vendorId,
            name: name,
            tradeCategory: trade,
            contactPerson: contact,
            phone: phone,
            email: email,
            kraPin: pin,
            paymentDetails: payment,
            isActive: true
          });

          document.getElementById('form-vendor-reg').reset();
          populateWoVendorDropdown();
          renderVendorsTable();
          showToast(`✓ Vendor ${name} registered in trade: ${trade}`);
        },
        'Contractor Registration Confirmation',
        'Register Contractor'
      );
    }

    function toggleVendorStatus(vendorId) {
      const vendor = AppState.vendors.find(v => v.id === vendorId);
      if (!vendor) return;
      vendor.isActive = !vendor.isActive;
      populateWoVendorDropdown();
      renderVendorsTable();
      showToast(`${vendor.name} status updated: ${vendor.isActive ? 'Active' : 'Inactive'}`);
    }

    function renderMaintenanceTicketsTable() {
      const tbody = document.getElementById('table-maintenance-tickets-body');
      const badge = document.getElementById('tickets-count-badge');
      if (!tbody) return;

      if (badge) badge.textContent = `${AppState.maintenanceRequests.length} Incident Tickets`;

      if (AppState.maintenanceRequests.length === 0) {
        tbody.innerHTML = `<tr><td colspan="8" style="text-align: center; color: var(--text-muted); padding: 24px;">No incident tickets recorded.</td></tr>`;
        return;
      }

      tbody.innerHTML = AppState.maintenanceRequests.map(t => {
        const priorityClass = {
          Low: 'badge-priority-low',
          Medium: 'badge-priority-medium',
          High: 'badge-priority-high',
          Emergency: 'badge-priority-emergency'
        }[t.priority] || 'badge-priority-medium';

        const statusClass = {
          Reported: 'badge-status-reported',
          Assigned: 'badge-status-assigned',
          In_Progress: 'badge-status-inprogress',
          Completed: 'badge-status-completed'
        }[t.status] || 'badge-status-reported';

        const isConverted = AppState.maintenanceWorkOrders.some(w => w.ticketId === t.id);

        return `
          <tr>
            <td style="font-family: 'JetBrains Mono', monospace; font-weight: 700;">${t.ticketNumber}</td>
            <td style="font-size: 0.8rem; color: var(--text-secondary);">${t.createdAt}</td>
            <td>
              <div style="font-weight: 700;">${t.propertyName}</div>
              <div style="font-size: 0.75rem; color: var(--text-muted);">${t.unitCode}</div>
            </td>
            <td>
              <div style="font-weight: 600;">${t.tenantName}</div>
              <div style="font-size: 0.72rem; color: var(--text-muted);">Reported via: ${t.reportedBy}</div>
            </td>
            <td>
              <span class="badge-status" style="font-size: 0.72rem;">${t.category}</span>
            </td>
            <td>
              <span class="badge-status ${priorityClass}">${t.priority}</span>
            </td>
            <td>
              <span class="badge-status ${statusClass}">${t.status.replace('_', ' ')}</span>
            </td>
            <td>
              <div style="display: flex; gap: 6px;">
                ${isConverted 
                  ? `<span style="font-size: 0.75rem; color: var(--accent-secondary); font-weight: 700;">✓ LPO Active</span>`
                  : `<button class="btn-action-pill" onclick="convertTicketToLpo('${t.id}')">Convert to LPO</button>`
                }
              </div>
            </td>
          </tr>
        `;
      }).join('');
    }

    function renderWorkOrdersTable() {
      const tbody = document.getElementById('table-work-orders-body');
      const badge = document.getElementById('work-orders-count-badge');
      if (!tbody) return;

      if (badge) badge.textContent = `${AppState.maintenanceWorkOrders.length} Issued LPOs`;

      if (AppState.maintenanceWorkOrders.length === 0) {
        tbody.innerHTML = `<tr><td colspan="10" style="text-align: center; color: var(--text-muted); padding: 24px;">No work orders or LPOs issued.</td></tr>`;
        return;
      }

      tbody.innerHTML = AppState.maintenanceWorkOrders.map(w => {
        const allocClass = {
          'Landlord Deductible': 'badge-alloc-landlord',
          'Tenant Damage Recovery': 'badge-alloc-tenant',
          'Common Service Charge Pool': 'badge-alloc-pool'
        }[w.costAllocation] || 'badge-alloc-pool';

        const statusClass = {
          Draft: 'badge-status-reported',
          Approved: 'badge-status-assigned',
          Fulfilled: 'badge-status-completed',
          Rejected: 'badge-priority-emergency'
        }[w.approvalStatus] || 'badge-status-assigned';

        return `
          <tr>
            <td style="font-family: 'JetBrains Mono', monospace; font-weight: 700;">${w.lpoNumber}</td>
            <td style="font-size: 0.8rem; color: var(--text-secondary);">${w.issuedDate}</td>
            <td>
              <div style="font-weight: 700;">${w.vendorName}</div>
              <div style="font-size: 0.72rem; color: var(--text-muted);">Ref: ${w.ticketNumber}</div>
            </td>
            <td>
              <div>${w.propertyName}</div>
              <div style="font-size: 0.75rem; color: var(--text-muted);">${w.unitCode}</div>
            </td>
            <td style="max-width: 200px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="${w.scopeOfWork}">${w.scopeOfWork}</td>
            <td style="font-family: 'JetBrains Mono', monospace; font-size: 0.82rem;">KES ${w.estimatedCost.toLocaleString(undefined, {minimumFractionDigits: 2})}</td>
            <td style="font-family: 'JetBrains Mono', monospace; font-weight: 700; color: var(--text-primary);">KES ${w.actualCost.toLocaleString(undefined, {minimumFractionDigits: 2})}</td>
            <td>
              <span class="badge-status ${allocClass}" style="font-size: 0.7rem;">${w.costAllocation}</span>
            </td>
            <td>
              <span class="badge-status ${statusClass}">${w.approvalStatus}</span>
            </td>
            <td>
              <button class="btn-action-pill" onclick="viewLpoDetails('${w.id}')">View LPO</button>
            </td>
          </tr>
        `;
      }).join('');
    }

    function renderVendorsTable() {
      const tbody = document.getElementById('table-vendors-body');
      const badge = document.getElementById('vendors-count-badge');
      if (!tbody) return;

      if (badge) badge.textContent = `${AppState.vendors.length} Contractors`;

      if (AppState.vendors.length === 0) {
        tbody.innerHTML = `<tr><td colspan="8" style="text-align: center; color: var(--text-muted); padding: 24px;">No contractors registered.</td></tr>`;
        return;
      }

      tbody.innerHTML = AppState.vendors.map(v => {
        const lposCount = AppState.maintenanceWorkOrders.filter(w => w.vendorId === v.id).length;
        return `
          <tr>
            <td>
              <div style="font-weight: 800; color: var(--text-primary);">${v.name}</div>
              <div style="font-size: 0.72rem; font-family: 'JetBrains Mono', monospace; color: var(--text-muted);">${v.id}</div>
            </td>
            <td>
              <span class="badge-status" style="font-size: 0.74rem;">${v.tradeCategory}</span>
            </td>
            <td>
              <div style="font-weight: 600;">${v.contactPerson}</div>
            </td>
            <td style="font-family: 'JetBrains Mono', monospace; font-size: 0.82rem;">${v.phone}</td>
            <td>
              <div style="font-size: 0.8rem;">${v.email}</div>
              <div style="font-size: 0.74rem; font-family: 'JetBrains Mono', monospace; color: var(--text-muted);">PIN: ${v.kraPin}</div>
            </td>
            <td style="font-size: 0.8rem; max-width: 180px;">${v.paymentDetails}</td>
            <td>
              <button class="btn-action-pill" onclick="toggleVendorStatus('${v.id}')" style="color: ${v.isActive ? 'var(--accent-secondary)' : '#DC2626'};">
                ${v.isActive ? '● Active' : '○ Suspended'}
              </button>
            </td>
            <td style="text-align: center; font-weight: 700; font-family: 'JetBrains Mono', monospace;">${lposCount}</td>
          </tr>
        `;
      }).join('');
    }

    function renderCostAllocationLedger() {
      const tbody = document.getElementById('table-cost-allocation-body');
      const badge = document.getElementById('allocation-count-badge');
      if (!tbody) return;

      let totalSpent = 0;
      let landlordSum = 0;
      let tenantSum = 0;
      let poolSum = 0;

      AppState.maintenanceWorkOrders.forEach(w => {
        totalSpent += w.actualCost;
        if (w.costAllocation === 'Landlord Deductible') landlordSum += w.actualCost;
        else if (w.costAllocation === 'Tenant Damage Recovery') tenantSum += w.actualCost;
        else if (w.costAllocation === 'Common Service Charge Pool') poolSum += w.actualCost;
      });

      document.getElementById('stat-total-repairs').textContent = `KES ${totalSpent.toLocaleString(undefined, {minimumFractionDigits: 2})}`;
      document.getElementById('stat-landlord-deductible').textContent = `KES ${landlordSum.toLocaleString(undefined, {minimumFractionDigits: 2})}`;
      document.getElementById('stat-tenant-damage').textContent = `KES ${tenantSum.toLocaleString(undefined, {minimumFractionDigits: 2})}`;
      document.getElementById('stat-pool-absorbed').textContent = `KES ${poolSum.toLocaleString(undefined, {minimumFractionDigits: 2})}`;

      if (badge) badge.textContent = `${AppState.maintenanceWorkOrders.length} Reconciliation Records`;

      if (AppState.maintenanceWorkOrders.length === 0) {
        tbody.innerHTML = `<tr><td colspan="8" style="text-align: center; color: var(--text-muted); padding: 24px;">No cost allocation entries available.</td></tr>`;
        return;
      }

      tbody.innerHTML = AppState.maintenanceWorkOrders.map(w => {
        const allocClass = {
          'Landlord Deductible': 'badge-alloc-landlord',
          'Tenant Damage Recovery': 'badge-alloc-tenant',
          'Common Service Charge Pool': 'badge-alloc-pool'
        }[w.costAllocation] || 'badge-alloc-pool';

        return `
          <tr>
            <td>
              <div style="font-family: 'JetBrains Mono', monospace; font-weight: 700;">${w.lpoNumber}</div>
              <div style="font-size: 0.72rem; color: var(--text-muted);">${w.issuedDate}</div>
            </td>
            <td>
              <div style="font-weight: 600;">${w.propertyName}</div>
              <div style="font-size: 0.72rem; color: var(--text-muted);">${w.unitCode}</div>
            </td>
            <td>${w.vendorName}</td>
            <td style="font-family: 'JetBrains Mono', monospace; font-weight: 700; color: var(--text-primary);">KES ${w.actualCost.toLocaleString(undefined, {minimumFractionDigits: 2})}</td>
            <td>
              <span class="badge-status ${allocClass}">${w.costAllocation}</span>
            </td>
            <td style="font-weight: 700; color: var(--accent-primary);">${w.targetAccount}</td>
            <td style="font-size: 0.8rem; color: var(--text-secondary);">${w.accountingImpact}</td>
            <td>
              <span class="badge-status badge-status-completed">${w.approvalStatus}</span>
            </td>
          </tr>
        `;
      }).join('');
    }

    function viewLpoDetails(lpoId) {
      const lpo = AppState.maintenanceWorkOrders.find(w => w.id === lpoId);
      if (!lpo) return;

      const vendor = AppState.vendors.find(v => v.id === lpo.vendorId);
      const prop = AppState.properties.find(p => p.id === lpo.propertyId);
      const wrap = document.getElementById('lpo-modal-content-wrap');
      if (!wrap) return;

      wrap.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: flex-start; padding: 14px; background: var(--nav-active-bg); border-radius: 14px; border: 1px solid var(--glass-border);">
          <div>
            <div style="font-size: 0.72rem; font-weight: 700; text-transform: uppercase; color: var(--text-muted);">Official Purchase Order</div>
            <div style="font-size: 1.35rem; font-weight: 800; font-family: 'JetBrains Mono', monospace;">${lpo.lpoNumber}</div>
            <div style="font-size: 0.78rem; color: var(--text-secondary); margin-top: 2px;">Issued: ${lpo.issuedDate} • Authorized By: ${lpo.approvedBy}</div>
          </div>
          <div style="text-align: right;">
            <span class="badge-status badge-status-completed" style="font-size: 0.8rem; padding: 6px 12px;">${lpo.approvalStatus}</span>
            <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 4px;">Ticket Ref: ${lpo.ticketNumber}</div>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px;">
          <div style="padding: 12px; background: var(--nav-active-bg); border-radius: 12px; border: 1px solid var(--glass-border);">
            <div style="font-size: 0.72rem; font-weight: 700; text-transform: uppercase; color: var(--text-muted);">Certified Contractor</div>
            <div style="font-weight: 800; font-size: 0.95rem; margin-top: 3px;">${lpo.vendorName}</div>
            <div style="font-size: 0.8rem; color: var(--text-secondary); margin-top: 2px;">Contact: ${vendor ? vendor.contactPerson : 'Contractor'} (${vendor ? vendor.phone : '—'})</div>
            <div style="font-size: 0.75rem; font-family: 'JetBrains Mono', monospace; color: var(--text-muted); margin-top: 2px;">KRA PIN: ${vendor ? vendor.kraPin : '—'}</div>
            <div style="font-size: 0.75rem; color: var(--text-secondary); margin-top: 4px;">Remit: ${vendor ? vendor.paymentDetails : 'Pending'}</div>
          </div>

          <div style="padding: 12px; background: var(--nav-active-bg); border-radius: 12px; border: 1px solid var(--glass-border);">
            <div style="font-size: 0.72rem; font-weight: 700; text-transform: uppercase; color: var(--text-muted);">Estate Asset Location</div>
            <div style="font-weight: 800; font-size: 0.95rem; margin-top: 3px;">${lpo.propertyName}</div>
            <div style="font-size: 0.8rem; color: var(--text-secondary); margin-top: 2px;">LR No: ${prop ? prop.lr : '—'}</div>
            <div style="font-size: 0.8rem; color: var(--text-secondary); margin-top: 2px;">Designated Space: <strong>${lpo.unitCode}</strong></div>
          </div>
        </div>

        <div style="padding: 14px; background: var(--nav-active-bg); border-radius: 12px; border: 1px solid var(--glass-border);">
          <div style="font-size: 0.72rem; font-weight: 700; text-transform: uppercase; color: var(--text-muted);">Authorized Scope of Work & Deliverables</div>
          <div style="font-size: 0.88rem; line-height: 1.5; margin-top: 6px; white-space: pre-wrap;">${lpo.scopeOfWork}</div>
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; padding: 14px; background: var(--nav-active-bg); border-radius: 14px; border: 1px solid var(--glass-border);">
          <div>
            <div style="font-size: 0.72rem; font-weight: 700; text-transform: uppercase; color: var(--text-muted);">3-Way Cost Allocation Route</div>
            <div style="font-weight: 800; font-size: 0.95rem; margin-top: 2px; color: var(--accent-primary);">${lpo.costAllocation}</div>
            <div style="font-size: 0.78rem; color: var(--text-secondary); margin-top: 2px;">Debited: <strong>${lpo.targetAccount}</strong> • ${lpo.accountingImpact}</div>
          </div>
          <div style="text-align: right;">
            <div style="font-size: 0.72rem; font-weight: 700; text-transform: uppercase; color: var(--text-muted);">Authorized Amount</div>
            <div style="font-size: 1.45rem; font-weight: 800; font-family: 'JetBrains Mono', monospace; color: var(--text-primary);">KES ${lpo.actualCost.toLocaleString(undefined, {minimumFractionDigits: 2})}</div>
            <div style="font-size: 0.72rem; color: var(--text-muted);">Budget Cap: KES ${lpo.estimatedCost.toLocaleString(undefined, {minimumFractionDigits: 2})}</div>
          </div>
        </div>
      `;

      const modal = document.getElementById('lpo-preview-modal');
      if (modal) modal.classList.add('active');
    }

    function closeLpoModal() {
      const modal = document.getElementById('lpo-preview-modal');
      if (modal) modal.classList.remove('active');
    }

    function printLpoVoucher() {
      showToast('Dispatching LPO Purchase Voucher to printer...');
      window.print();
    }

    function showToast(msg) {
      const bubble = document.createElement('div');
      bubble.className = 'toast-bubble';
      bubble.innerHTML = `
        <div style="width: 8px; height: 8px; border-radius: 50%; background: var(--notch-color-top);"></div>
        <span>${msg}</span>
      `;
      toastTray.appendChild(bubble);
      setTimeout(() => {
        bubble.style.opacity = '0';
        bubble.style.transform = 'translateY(10px)';
        setTimeout(() => bubble.remove(), 250);
      }, 3000);
    }

    /* ==========================================================================
       08. ADMIN — COMPANY INFORMATION PERSISTENCE & SUPABASE PROFILE
       ========================================================================== */
    async function loadAdminCompanyProfile() {
      // 1. Instant hydration from localStorage for zero latency
      try {
        const cached = localStorage.getItem('mc_erp_company_profile');
        if (cached) {
          const parsed = JSON.parse(cached);
          if (parsed && (parsed.companyName || parsed.company_name)) {
            AppState.companyProfile = {
              companyName: parsed.companyName || parsed.company_name || 'METROCOSMO LTD - THIKA',
              slogan: parsed.slogan || '',
              address1: parsed.address1 || '',
              address2: parsed.address2 || '',
              postalCode: parsed.postalCode || parsed.postal_code || '',
              cityTown: parsed.cityTown || parsed.city_town || '',
              phone: parsed.phone || '',
              nhifNo: parsed.nhifNo || parsed.nhif_no || '',
              nssfNo: parsed.nssfNo || parsed.nssf_no || '',
              pinNo: parsed.pinNo || parsed.pin_no || '',
              email: parsed.email || '',
              logoUrl: parsed.logoUrl || parsed.logo_url || '',
              tempLogoBase64: parsed.tempLogoBase64 || parsed.logoUrl || parsed.logo_url || null
            };
            populateCompanyProfileUI();
          }
        }
      } catch (err) {
        console.warn('localStorage profile hydration warning:', err);
      }

      // 2. Fetch live profile record from Supabase company_profile table
      try {
        const orgId = getActiveOrgId();
        const url = `${SUPABASE_CONFIG.url}/rest/v1/company_profile?organization_id=eq.${orgId}&select=*`;
        const res = await fetch(url, {
          method: 'GET',
          headers: {
            'apikey': SUPABASE_CONFIG.anonKey,
            'Authorization': `Bearer ${SUPABASE_CONFIG.anonKey}`
          }
        });

        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            const row = data[0];
            AppState.companyProfile = {
              companyName: row.company_name || 'METROCOSMO LTD - THIKA',
              slogan: row.slogan || '',
              address1: row.address1 || '',
              address2: row.address2 || '',
              postalCode: row.postal_code || '',
              cityTown: row.city_town || '',
              phone: row.phone || '',
              nhifNo: row.nhif_no || '',
              nssfNo: row.nssf_no || '',
              pinNo: row.pin_no || '',
              email: row.email || '',
              logoUrl: row.logo_url || '',
              tempLogoBase64: row.logo_url || null
            };

            try {
              localStorage.setItem('mc_erp_company_profile', JSON.stringify(AppState.companyProfile));
            } catch (e) {
              console.warn('Failed to cache company profile:', e);
            }

            populateCompanyProfileUI();
          }
        }
      } catch (dbErr) {
        console.warn('Supabase profile live load warning:', dbErr);
      }
    }

    function updateSidebarBranding(cp) {
      if (!cp) return;
      const brandTitle = document.getElementById('brand-title') || document.querySelector('.brand-title');
      const brandSub = document.getElementById('brand-subtitle') || document.querySelector('.brand-subtitle');
      const brandImg = document.getElementById('sidebar-brand-logo');
      const brandSvg = document.getElementById('sidebar-default-glyph');
      const brandSquircle = document.getElementById('brand-glyph-btn');

      if (brandTitle && cp.companyName) {
        brandTitle.textContent = cp.companyName;
        brandTitle.title = cp.companyName;
      }
      if (brandSub) {
        brandSub.textContent = cp.slogan || 'Metrocosmo Enterprise';
        brandSub.title = cp.slogan || '';
      }

      const logoSrc = cp.tempLogoBase64 || cp.logoUrl;
      if (logoSrc) {
        if (brandImg) {
          brandImg.src = logoSrc;
          brandImg.style.display = 'block';
          if (brandSvg) brandSvg.style.display = 'none';
        } else if (brandSquircle) {
          brandSquircle.innerHTML = `<img id="sidebar-brand-logo" src="${logoSrc}" alt="Brand Logo" style="width: 100%; height: 100%; object-fit: contain; border-radius: 12px; padding: 2px;">`;
        }
      } else {
        if (brandImg) brandImg.style.display = 'none';
        if (brandSvg) brandSvg.style.display = 'block';
      }

      const userFullname = document.querySelector('.user-fullname');
      if (userFullname && cp.companyName) {
        userFullname.textContent = cp.companyName.split(' - ')[0] || cp.companyName;
      }
    }

    function populateCompanyProfileUI() {
      const cp = AppState.companyProfile;
      if (!cp) return;

      const setVal = (id, val) => {
        const el = document.getElementById(id);
        if (el) el.value = val !== undefined && val !== null ? val : '';
      };

      setVal('company-name', cp.companyName);
      setVal('company-slogan', cp.slogan);
      setVal('company-address1', cp.address1);
      setVal('company-address2', cp.address2);
      setVal('company-postal-code', cp.postalCode);
      setVal('company-city', cp.cityTown);
      setVal('company-phone', cp.phone);
      setVal('company-nhif', cp.nhifNo);
      setVal('company-nssf', cp.nssfNo);
      setVal('company-pin', cp.pinNo);
      setVal('company-email', cp.email);

      const logoImg = document.getElementById('company-logo-preview');
      const logoHolder = document.getElementById('company-logo-placeholder');
      const currentLogo = cp.tempLogoBase64 || cp.logoUrl;

      if (currentLogo && logoImg) {
        logoImg.src = currentLogo;
        logoImg.style.display = 'block';
        if (logoHolder) logoHolder.style.display = 'none';
      } else {
        if (logoImg) logoImg.style.display = 'none';
        if (logoHolder) logoHolder.style.display = 'block';
      }

      // Update executive user badge in sidebar footer
      const userFullname = document.querySelector('.user-fullname');
      if (userFullname && cp.companyName) {
        userFullname.textContent = cp.companyName.split(' - ')[0] || cp.companyName;
      }

      // Enforce live global sidebar branding
      updateSidebarBranding(cp);
    }

    function handleCompanyLogoPreview(event) {
      const file = event.target.files && event.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = function(e) {
        const result = e.target.result;
        AppState.companyProfile.tempLogoBase64 = result;
        AppState.companyProfile.logoUrl = result;
        const logoImg = document.getElementById('company-logo-preview');
        const logoHolder = document.getElementById('company-logo-placeholder');
        if (logoImg) {
          logoImg.src = result;
          logoImg.style.display = 'block';
        }
        if (logoHolder) {
          logoHolder.style.display = 'none';
        }
        updateSidebarBranding(AppState.companyProfile);
        showToast('✓ Logo preview loaded (ready to save)');
      };
      reader.readAsDataURL(file);
    }

    function saveAdminCompanyProfile(e) {
      if (e) e.preventDefault();

      const getVal = (id) => (document.getElementById(id)?.value || '').trim();
      const cName = getVal('company-name');
      const cSlogan = getVal('company-slogan');
      const cAddr1 = getVal('company-address1');
      const cAddr2 = getVal('company-address2');
      const cPostCode = getVal('company-postal-code');
      const cCity = getVal('company-city');
      const cPhone = getVal('company-phone');
      const cNhif = getVal('company-nhif');
      const cNssf = getVal('company-nssf');
      const cPin = getVal('company-pin');
      const cEmail = getVal('company-email');
      const persistentLogo = AppState.companyProfile.tempLogoBase64 || AppState.companyProfile.logoUrl || '';

      if (!cName) {
        showToast('⚠ Company Name is required');
        return;
      }

      confirmAction(
        `Are you sure you want to commit and save the Company Profile for <strong>${cName}</strong> to the central enterprise database?`,
        async () => {
          const orgId = getActiveOrgId();
          const updatedProfile = {
            companyName: cName,
            slogan: cSlogan,
            address1: cAddr1,
            address2: cAddr2,
            postalCode: cPostCode,
            cityTown: cCity,
            phone: cPhone,
            nhifNo: cNhif,
            nssfNo: cNssf,
            pinNo: cPin,
            email: cEmail,
            logoUrl: persistentLogo,
            tempLogoBase64: persistentLogo
          };

          // 1. Update in-memory state and localStorage immediately
          AppState.companyProfile = updatedProfile;
          try {
            localStorage.setItem('mc_erp_company_profile', JSON.stringify(updatedProfile));
          } catch (storageErr) {
            console.warn('localStorage cache warning:', storageErr);
          }
          populateCompanyProfileUI();

          // 2. Perform Supabase UPSERT into company_profile table
          try {
            const payload = {
              organization_id: orgId,
              company_name: cName,
              slogan: cSlogan,
              address1: cAddr1,
              address2: cAddr2,
              postal_code: cPostCode,
              city_town: cCity,
              phone: cPhone,
              nhif_no: cNhif,
              nssf_no: cNssf,
              pin_no: cPin,
              email: cEmail,
              logo_url: persistentLogo,
              updated_at: new Date().toISOString()
            };

            const upsertUrl = `${SUPABASE_CONFIG.url}/rest/v1/company_profile?on_conflict=organization_id`;
            const res = await fetch(upsertUrl, {
              method: 'POST',
              headers: {
                'apikey': SUPABASE_CONFIG.anonKey,
                'Authorization': `Bearer ${SUPABASE_CONFIG.anonKey}`,
                'Content-Type': 'application/json',
                'Prefer': 'resolution=merge-duplicates,return=representation'
              },
              body: JSON.stringify(payload)
            });

            if (!res.ok) {
              const errBody = await res.text();
              console.error('Supabase UPSERT response status:', res.status, errBody);
              showToast(`✓ Profile saved locally (Supabase status ${res.status})`);
              return;
            }

            const resJson = await res.json();
            console.log('✓ Successfully persisted company profile to Supabase:', resJson);
            showToast(`✓ Company Profile for "${cName}" saved & persisted to database!`);
          } catch (netErr) {
            console.warn('Supabase UPSERT network warning:', netErr);
            showToast(`✓ Company Profile for "${cName}" saved locally!`);
          }
        },
        'Database Execution Warning',
        'Save Profile'
      );
    }

    /* ==========================================================================
       08. ADMIN — BANK ACCOUNTS & M-PESA PAYBILLS CONFIGURATION
       ========================================================================== */

    function switchAdminTab(targetTabId) {
      if (targetTabId === 'tab-bank-accounts' || targetTabId === 'tab-mpesa-paybills') {
        targetTabId = 'tab-payment-channels';
      }
      AppState.activeAdminTab = targetTabId;

      // Update button visual styles
      const tabBtns = document.querySelectorAll('.admin-subtab-btn');
      tabBtns.forEach(btn => {
        if (btn.id === `btn-${targetTabId}` || btn.getAttribute('data-tab') === targetTabId) {
          btn.classList.add('active');
        } else {
          btn.classList.remove('active');
        }
      });

      // Update panel visibility
      const panels = document.querySelectorAll('.admin-tab-panel');
      panels.forEach(p => {
        if (p.id === `panel-${targetTabId}`) {
          p.style.display = 'block';
        } else {
          p.style.display = 'none';
        }
      });

      // Trigger data binding for the active tab
      if (targetTabId === 'tab-payment-channels') {
        renderBankAccountsTable();
        renderMpesaPaybillsTable();
        populateLinkedBankDropdown();
      } else if (targetTabId === 'tab-transaction-periods') {
        loadAccountingPeriods();
        renderAccountingPeriodsTable();
      } else if (targetTabId === 'tab-company-info') {
        populateCompanyProfileUI();
      }
    }

    // 1. BANK ACCOUNTS CONTROLLERS
    async function loadBankAccounts() {
      // Instant cache rehydration
      try {
        const cached = localStorage.getItem('mc_erp_bank_accounts');
        if (cached) {
          const parsed = JSON.parse(cached);
          if (Array.isArray(parsed) && parsed.length > 0) {
            AppState.bankAccounts = parsed;
            renderBankAccountsTable();
            populateLinkedBankDropdown();
          }
        }
      } catch (e) {
        console.warn('localStorage bank accounts warning:', e);
      }

      // Live Supabase fetch
      try {
        const orgId = getActiveOrgId();
        const url = `${SUPABASE_CONFIG.url}/rest/v1/company_bank_accounts?organization_id=eq.${orgId}&order=created_at.asc`;
        const res = await fetch(url, {
          method: 'GET',
          headers: {
            'apikey': SUPABASE_CONFIG.anonKey,
            'Authorization': `Bearer ${SUPABASE_CONFIG.anonKey}`
          }
        });

        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            AppState.bankAccounts = data;
            try {
              localStorage.setItem('mc_erp_bank_accounts', JSON.stringify(data));
            } catch (err) {}
            renderBankAccountsTable();
            populateLinkedBankDropdown();
          }
        }
      } catch (netErr) {
        console.warn('Supabase bank accounts fetch warning:', netErr);
      }
    }

    function renderBankAccountsTable() {
      const tbody = document.getElementById('bank-accounts-table-body');
      if (!tbody) return;

      if (!AppState.bankAccounts || AppState.bankAccounts.length === 0) {
        tbody.innerHTML = `<tr><td colspan="8" style="padding: 12px; text-align: center; color: #6B7280; font-style: italic;">No bank accounts configured. Use the form above to add an account.</td></tr>`;
        return;
      }

      tbody.innerHTML = AppState.bankAccounts.map(item => `
        <tr class="pm-table-row">
          <td style="text-align: center; border-right: 1px solid #CBD5E1;">
            <button type="button" style="color: #DC2626; font-weight: 700; background: none; border: none; cursor: pointer; font-size: 11.5px; padding: 2px 4px;" onclick="deleteBankAccount('${item.id}')" title="Delete Account">-X-</button>
          </td>
          <td style="text-align: center; border-right: 1px solid #CBD5E1;">
            <button type="button" style="color: #D97706; font-weight: 700; background: none; border: none; cursor: pointer; font-size: 11.5px; padding: 2px 4px;" onclick="editBankAccount('${item.id}')" title="Edit Account">-Edit-</button>
          </td>
          <td style="padding: 4px 12px; border-right: 1px solid #CBD5E1; font-weight: 600; color: #111827;">${item.bank_name || ''}</td>
          <td style="padding: 4px 12px; border-right: 1px solid #CBD5E1; color: #374151;">${item.branch_name || ''}</td>
          <td style="padding: 4px 12px; border-right: 1px solid #CBD5E1; font-weight: 600; color: #111827;">${item.account_name || ''}</td>
          <td style="padding: 4px 12px; border-right: 1px solid #CBD5E1; font-family: monospace; font-weight: 600; color: #1F2937;">${item.account_no || ''}</td>
          <td style="padding: 4px 12px; border-right: 1px solid #CBD5E1; color: #4B5563;">${item.swift_code || ''}</td>
          <td style="text-align: center;">
            <input type="checkbox" disabled ${item.is_active ? 'checked' : ''} style="accent-color: #008080; cursor: default;">
          </td>
        </tr>
      `).join('');
    }

    function saveBankAccount(event) {
      if (event) event.preventDefault();

      const bankName = (document.getElementById('bank-name-select')?.value || '').trim();
      const accName = (document.getElementById('bank-acc-name')?.value || '').trim();
      const swiftCode = (document.getElementById('bank-swift-code')?.value || '').trim();
      const branchName = (document.getElementById('bank-branch-name')?.value || '').trim();
      const accNo = (document.getElementById('bank-acc-no')?.value || '').trim();
      const isActive = document.getElementById('bank-acc-active') ? document.getElementById('bank-acc-active').checked : true;
      const editId = (document.getElementById('bank-acc-edit-id')?.value || '').trim();

      if (!bankName) {
        showToast('⚠ Please select a Bank Name');
        return;
      }
      if (!accName) {
        showToast('⚠ Account Name is required');
        return;
      }
      if (!accNo) {
        showToast('⚠ Account Number is required');
        return;
      }

      confirmAction(
        `Are you sure you want to commit and save Bank Account <strong>${accNo} (${bankName})</strong> to the central database?`,
        async () => {
          const orgId = getActiveOrgId();
          const payload = {
            organization_id: orgId,
            bank_name: bankName,
            branch_name: branchName,
            account_name: accName,
            account_no: accNo,
            swift_code: swiftCode,
            is_active: isActive,
            updated_at: new Date().toISOString()
          };

          if (editId) {
            // Update local memory
            const idx = AppState.bankAccounts.findIndex(b => b.id === editId);
            if (idx > -1) {
              AppState.bankAccounts[idx] = { ...AppState.bankAccounts[idx], ...payload };
            }
            try {
              localStorage.setItem('mc_erp_bank_accounts', JSON.stringify(AppState.bankAccounts));
            } catch (err) {}
            renderBankAccountsTable();
            populateLinkedBankDropdown();
            resetBankAccountForm();

            // Supabase REST PATCH
            try {
              await fetch(`${SUPABASE_CONFIG.url}/rest/v1/company_bank_accounts?id=eq.${editId}`, {
                method: 'PATCH',
                headers: {
                  'apikey': SUPABASE_CONFIG.anonKey,
                  'Authorization': `Bearer ${SUPABASE_CONFIG.anonKey}`,
                  'Content-Type': 'application/json',
                  'Prefer': 'return=representation'
                },
                body: JSON.stringify(payload)
              });
            } catch (netErr) {
              console.warn('Supabase PATCH bank account warning:', netErr);
            }
            showToast(`✓ Bank Account "${accNo}" updated successfully!`);
          } else {
            // Create new record
            const newId = (typeof crypto !== 'undefined' && crypto.randomUUID) ? crypto.randomUUID() : '00000000-0000-0000-0000-' + String(Date.now()).padStart(12, '0').slice(-12);
            const record = { id: newId, ...payload, created_at: new Date().toISOString() };
            AppState.bankAccounts.push(record);

            try {
              localStorage.setItem('mc_erp_bank_accounts', JSON.stringify(AppState.bankAccounts));
            } catch (err) {}
            renderBankAccountsTable();
            populateLinkedBankDropdown();
            resetBankAccountForm();

            // Supabase REST POST
            try {
              await fetch(`${SUPABASE_CONFIG.url}/rest/v1/company_bank_accounts`, {
                method: 'POST',
                headers: {
                  'apikey': SUPABASE_CONFIG.anonKey,
                  'Authorization': `Bearer ${SUPABASE_CONFIG.anonKey}`,
                  'Content-Type': 'application/json',
                  'Prefer': 'return=representation'
                },
                body: JSON.stringify(record)
              });
            } catch (netErr) {
              console.warn('Supabase POST bank account warning:', netErr);
            }
            showToast(`✓ Bank Account "${accNo}" saved to central database!`);
          }
        },
        'Bank Account Execution Warning',
        'Save Account'
      );
    }

    function editBankAccount(id) {
      const item = AppState.bankAccounts.find(b => b.id === id);
      if (!item) return;

      const setVal = (elemId, val) => {
        const el = document.getElementById(elemId);
        if (el) el.value = val !== undefined && val !== null ? val : '';
      };

      setVal('bank-name-select', item.bank_name);
      setVal('bank-acc-name', item.account_name);
      setVal('bank-swift-code', item.swift_code);
      setVal('bank-branch-name', item.branch_name);
      setVal('bank-acc-no', item.account_no);
      setVal('bank-acc-edit-id', item.id);

      const chk = document.getElementById('bank-acc-active');
      if (chk) chk.checked = item.is_active !== false;

      const saveBtn = document.getElementById('btn-save-bank-acc');
      if (saveBtn) saveBtn.textContent = 'Update';

      document.getElementById('form-bank-account')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      showToast(`Editing Bank Account ${item.account_no}`);
    }

    function deleteBankAccount(id) {
      const item = AppState.bankAccounts.find(b => b.id === id);
      const label = item ? `${item.account_no} (${item.bank_name})` : 'this account';

      confirmAction(
        `Are you sure you want to permanently delete Bank Account <strong>${label}</strong> from the database?`,
        async () => {
          AppState.bankAccounts = AppState.bankAccounts.filter(b => b.id !== id);
          try {
            localStorage.setItem('mc_erp_bank_accounts', JSON.stringify(AppState.bankAccounts));
          } catch (err) {}
          renderBankAccountsTable();
          populateLinkedBankDropdown();
          resetBankAccountForm();

          try {
            await fetch(`${SUPABASE_CONFIG.url}/rest/v1/company_bank_accounts?id=eq.${id}`, {
              method: 'DELETE',
              headers: {
                'apikey': SUPABASE_CONFIG.anonKey,
                'Authorization': `Bearer ${SUPABASE_CONFIG.anonKey}`
              }
            });
          } catch (netErr) {
            console.warn('Supabase DELETE bank account warning:', netErr);
          }
          showToast(`✓ Bank account deleted successfully.`);
        },
        'Bank Account Deletion Warning',
        'Delete Account'
      );
    }

    function resetBankAccountForm() {
      const form = document.getElementById('form-bank-account');
      if (form) form.reset();
      const hiddenId = document.getElementById('bank-acc-edit-id');
      if (hiddenId) hiddenId.value = '';
      const chk = document.getElementById('bank-acc-active');
      if (chk) chk.checked = true;
      const saveBtn = document.getElementById('btn-save-bank-acc');
      if (saveBtn) saveBtn.textContent = 'Save';
    }

    // 2. M-PESA PAYBILLS CONTROLLERS
    async function loadMpesaPaybills() {
      try {
        const cached = localStorage.getItem('mc_erp_mpesa_paybills');
        if (cached) {
          const parsed = JSON.parse(cached);
          if (Array.isArray(parsed) && parsed.length > 0) {
            AppState.mpesaPaybills = parsed;
            renderMpesaPaybillsTable();
          }
        }
      } catch (e) {
        console.warn('localStorage mpesa paybills warning:', e);
      }

      try {
        const orgId = getActiveOrgId();
        const url = `${SUPABASE_CONFIG.url}/rest/v1/company_mpesa_paybills?organization_id=eq.${orgId}&order=created_at.asc`;
        const res = await fetch(url, {
          method: 'GET',
          headers: {
            'apikey': SUPABASE_CONFIG.anonKey,
            'Authorization': `Bearer ${SUPABASE_CONFIG.anonKey}`
          }
        });

        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            AppState.mpesaPaybills = data;
            try {
              localStorage.setItem('mc_erp_mpesa_paybills', JSON.stringify(data));
            } catch (err) {}
            renderMpesaPaybillsTable();
          }
        }
      } catch (netErr) {
        console.warn('Supabase mpesa paybills fetch warning:', netErr);
      }
    }

    function populateLinkedBankDropdown() {
      const select = document.getElementById('mpesa-linked-bank-select');
      if (!select) return;

      const currentVal = select.value;
      select.innerHTML = '<option value="">-Select Linked Bank Account-</option>' + 
        AppState.bankAccounts.map(b => `
          <option value="${b.id}">${b.bank_name} • ${b.account_no} (${b.account_name})</option>
        `).join('');

      if (currentVal) select.value = currentVal;
    }

    function renderMpesaPaybillsTable() {
      const tbody = document.getElementById('mpesa-paybills-table-body');
      if (!tbody) return;

      if (!AppState.mpesaPaybills || AppState.mpesaPaybills.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7" style="padding: 12px; text-align: center; color: #6B7280; font-style: italic;">No M-Pesa paybills configured. Use the form above to add a paybill.</td></tr>`;
        return;
      }

      tbody.innerHTML = AppState.mpesaPaybills.map(item => {
        const linkedBank = AppState.bankAccounts.find(b => b.id === item.bank_account_id);
        const linkedBankText = linkedBank ? `${linkedBank.bank_name} - ${linkedBank.account_no}` : (item.bank_account_id ? 'Linked' : '— None —');

        return `
          <tr class="pm-table-row">
            <td style="text-align: center; border-right: 1px solid #CBD5E1;">
              <button type="button" style="color: #DC2626; font-weight: 700; background: none; border: none; cursor: pointer; font-size: 11.5px; padding: 2px 4px;" onclick="deleteMpesaPaybill('${item.id}')" title="Delete Paybill">-X-</button>
            </td>
            <td style="text-align: center; border-right: 1px solid #CBD5E1;">
              <button type="button" style="color: #D97706; font-weight: 700; background: none; border: none; cursor: pointer; font-size: 11.5px; padding: 2px 4px;" onclick="editMpesaPaybill('${item.id}')" title="Edit Paybill">-Edit-</button>
            </td>
            <td style="padding: 4px 12px; border-right: 1px solid #CBD5E1; font-family: monospace; font-weight: 700; color: #008080;">${item.paybill_number || ''}</td>
            <td style="padding: 4px 12px; border-right: 1px solid #CBD5E1; font-weight: 600; color: #111827;">${item.business_name || ''}</td>
            <td style="padding: 4px 12px; border-right: 1px solid #CBD5E1; color: #374151;">${item.account_prefix || '—'}</td>
            <td style="padding: 4px 12px; border-right: 1px solid #CBD5E1; color: #4B5563;">${linkedBankText}</td>
            <td style="text-align: center;">
              <input type="checkbox" disabled ${item.is_active ? 'checked' : ''} style="accent-color: #008080; cursor: default;">
            </td>
          </tr>
        `;
      }).join('');
    }

    function saveMpesaPaybill(event) {
      if (event) event.preventDefault();

      const paybillNo = (document.getElementById('mpesa-paybill-no')?.value || '').trim();
      const bizName = (document.getElementById('mpesa-business-name')?.value || '').trim();
      const accPrefix = (document.getElementById('mpesa-acc-prefix')?.value || '').trim();
      const linkedBankId = (document.getElementById('mpesa-linked-bank-select')?.value || '').trim() || null;
      const isActive = document.getElementById('mpesa-active') ? document.getElementById('mpesa-active').checked : true;
      const editId = (document.getElementById('mpesa-paybill-edit-id')?.value || '').trim();

      if (!paybillNo) {
        showToast('⚠ Paybill Number is required');
        return;
      }
      if (!bizName) {
        showToast('⚠ Business Name is required');
        return;
      }

      confirmAction(
        `Are you sure you want to commit and save M-Pesa Paybill <strong>${paybillNo} (${bizName})</strong> to the central database?`,
        async () => {
          const orgId = getActiveOrgId();
          const payload = {
            organization_id: orgId,
            paybill_number: paybillNo,
            business_name: bizName,
            account_prefix: accPrefix,
            bank_account_id: linkedBankId,
            is_active: isActive,
            updated_at: new Date().toISOString()
          };

          if (editId) {
            const idx = AppState.mpesaPaybills.findIndex(m => m.id === editId);
            if (idx > -1) {
              AppState.mpesaPaybills[idx] = { ...AppState.mpesaPaybills[idx], ...payload };
            }
            try {
              localStorage.setItem('mc_erp_mpesa_paybills', JSON.stringify(AppState.mpesaPaybills));
            } catch (err) {}
            renderMpesaPaybillsTable();
            resetMpesaPaybillForm();

            try {
              await fetch(`${SUPABASE_CONFIG.url}/rest/v1/company_mpesa_paybills?id=eq.${editId}`, {
                method: 'PATCH',
                headers: {
                  'apikey': SUPABASE_CONFIG.anonKey,
                  'Authorization': `Bearer ${SUPABASE_CONFIG.anonKey}`,
                  'Content-Type': 'application/json',
                  'Prefer': 'return=representation'
                },
                body: JSON.stringify(payload)
              });
            } catch (netErr) {
              console.warn('Supabase PATCH paybill warning:', netErr);
            }
            showToast(`✓ M-Pesa Paybill "${paybillNo}" updated successfully!`);
          } else {
            const newId = (typeof crypto !== 'undefined' && crypto.randomUUID) ? crypto.randomUUID() : '00000000-0000-0000-0000-' + String(Date.now()).padStart(12, '0').slice(-12);
            const record = { id: newId, ...payload, created_at: new Date().toISOString() };
            AppState.mpesaPaybills.push(record);

            try {
              localStorage.setItem('mc_erp_mpesa_paybills', JSON.stringify(AppState.mpesaPaybills));
            } catch (err) {}
            renderMpesaPaybillsTable();
            resetMpesaPaybillForm();

            try {
              await fetch(`${SUPABASE_CONFIG.url}/rest/v1/company_mpesa_paybills`, {
                method: 'POST',
                headers: {
                  'apikey': SUPABASE_CONFIG.anonKey,
                  'Authorization': `Bearer ${SUPABASE_CONFIG.anonKey}`,
                  'Content-Type': 'application/json',
                  'Prefer': 'return=representation'
                },
                body: JSON.stringify(record)
              });
            } catch (netErr) {
              console.warn('Supabase POST paybill warning:', netErr);
            }
            showToast(`✓ M-Pesa Paybill "${paybillNo}" saved to central database!`);
          }
        },
        'M-Pesa Paybill Configuration Warning',
        'Save Paybill'
      );
    }

    function editMpesaPaybill(id) {
      const item = AppState.mpesaPaybills.find(m => m.id === id);
      if (!item) return;

      const setVal = (elemId, val) => {
        const el = document.getElementById(elemId);
        if (el) el.value = val !== undefined && val !== null ? val : '';
      };

      setVal('mpesa-paybill-no', item.paybill_number);
      setVal('mpesa-business-name', item.business_name);
      setVal('mpesa-acc-prefix', item.account_prefix);
      setVal('mpesa-linked-bank-select', item.bank_account_id);
      setVal('mpesa-paybill-edit-id', item.id);

      const chk = document.getElementById('mpesa-active');
      if (chk) chk.checked = item.is_active !== false;

      const saveBtn = document.getElementById('btn-save-mpesa');
      if (saveBtn) saveBtn.textContent = 'Update';

      document.getElementById('form-mpesa-paybill')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      showToast(`Editing M-Pesa Paybill ${item.paybill_number}`);
    }

    function deleteMpesaPaybill(id) {
      const item = AppState.mpesaPaybills.find(m => m.id === id);
      const label = item ? `${item.paybill_number} (${item.business_name})` : 'this paybill';

      confirmAction(
        `Are you sure you want to permanently delete M-Pesa Paybill <strong>${label}</strong> from the database?`,
        async () => {
          AppState.mpesaPaybills = AppState.mpesaPaybills.filter(m => m.id !== id);
          try {
            localStorage.setItem('mc_erp_mpesa_paybills', JSON.stringify(AppState.mpesaPaybills));
          } catch (err) {}
          renderMpesaPaybillsTable();
          resetMpesaPaybillForm();

          try {
            await fetch(`${SUPABASE_CONFIG.url}/rest/v1/company_mpesa_paybills?id=eq.${id}`, {
              method: 'DELETE',
              headers: {
                'apikey': SUPABASE_CONFIG.anonKey,
                'Authorization': `Bearer ${SUPABASE_CONFIG.anonKey}`
              }
            });
          } catch (netErr) {
            console.warn('Supabase DELETE paybill warning:', netErr);
          }
          showToast(`✓ M-Pesa Paybill deleted successfully.`);
        },
        'M-Pesa Deletion Warning',
        'Delete Paybill'
      );
    }

    function resetMpesaPaybillForm() {
      const form = document.getElementById('form-mpesa-paybill');
      if (form) form.reset();
      const hiddenId = document.getElementById('mpesa-paybill-edit-id');
      if (hiddenId) hiddenId.value = '';
      const chk = document.getElementById('mpesa-active');
      if (chk) chk.checked = true;
      const saveBtn = document.getElementById('btn-save-mpesa');
      if (saveBtn) saveBtn.textContent = 'Save';
    }

    /* --------------------------------------------------------------------------
       3. TRANSACTION PERIODS & ROLL-OVER CONTROLLER (image_7366d4.png)
       -------------------------------------------------------------------------- */
    async function loadAccountingPeriods() {
      // Rehydrate cache
      try {
        const cached = localStorage.getItem('mc_erp_accounting_periods');
        if (cached) {
          const parsed = JSON.parse(cached);
          if (Array.isArray(parsed) && parsed.length > 0) {
            AppState.accountingPeriods = parsed;
            renderAccountingPeriodsTable();
          }
        }
      } catch (e) {
        console.warn('localStorage accounting_periods warning:', e);
      }

      // Fetch from Supabase
      try {
        const orgId = getActiveOrgId();
        const res = await fetch(`${SUPABASE_CONFIG.url}/rest/v1/accounting_periods?select=*&order=period_no.desc`, {
          headers: {
            'apikey': SUPABASE_CONFIG.anonKey,
            'Authorization': `Bearer ${SUPABASE_CONFIG.anonKey}`
          }
        });
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            AppState.accountingPeriods = data;
            try {
              localStorage.setItem('mc_erp_accounting_periods', JSON.stringify(data));
            } catch(e) {}
            renderAccountingPeriodsTable();
          }
        }
      } catch (netErr) {
        console.warn('Supabase accounting_periods fetch warning:', netErr);
      }
    }

    function renderAccountingPeriodsTable() {
      const tbody = document.getElementById('accounting-periods-table-body');
      if (!tbody) return;

      const monthNames = {
        '1': 'January', '2': 'February', '3': 'March', '4': 'April',
        '5': 'May', '6': 'June', '7': 'July', '8': 'August',
        '9': 'September', '10': 'October', '11': 'November', '12': 'December'
      };

      tbody.innerHTML = AppState.accountingPeriods.map(p => {
        const isOpen = p.status === 'Open';
        const dateOpened = p.opened_at ? p.opened_at.replace('T', ' ').substring(0, 23) : '';
        const dateClosed = p.closed_at ? p.closed_at.replace('T', ' ').substring(0, 23) : '';
        const desc = p.description || monthNames[p.period_month] || `Period ${p.period_no}`;

        return `
          <tr class="pm-table-row">
            <td style="padding: 5px 8px; width: 45px; text-align: center; border-right: 1px solid #E5E7EB; font-weight: 600;">${p.period_no}</td>
            <td style="padding: 5px 12px; text-align: left; border-right: 1px solid #E5E7EB;">${dateOpened}</td>
            <td style="padding: 5px 10px; width: 60px; text-align: center; border-right: 1px solid #E5E7EB;">${p.period_month}</td>
            <td style="padding: 5px 10px; width: 65px; text-align: center; border-right: 1px solid #E5E7EB;">${p.period_year}</td>
            <td style="padding: 5px 14px; text-align: left; border-right: 1px solid #E5E7EB;">${desc}</td>
            <td style="padding: 5px 12px; text-align: left; border-right: 1px solid #E5E7EB;">${dateClosed}</td>
            <td style="padding: 5px 12px; width: 85px; text-align: center; border-right: 1px solid #E5E7EB;">
              <span style="font-weight: 700; color: ${isOpen ? '#16A34A' : '#DC2626'};">
                ${p.status}
              </span>
            </td>
            <td style="padding: 5px 12px; width: 90px; text-align: center; font-weight: 600;">${p.opened_by || 'DEAN'}</td>
          </tr>
        `;
      }).join('');
    }

    function executePeriodRollOver() {
      const monthSel = document.getElementById('period-rollover-month');
      const yearSel = document.getElementById('period-rollover-year');

      const monthVal = monthSel ? monthSel.value : '11';
      const monthName = monthSel ? monthSel.options[monthSel.selectedIndex].text : 'Nov';
      const yearVal = parseInt(yearSel ? yearSel.value : '2026', 10);

      const monthNames = {
        '1': 'January', '2': 'February', '3': 'March', '4': 'April',
        '5': 'May', '6': 'June', '7': 'July', '8': 'August',
        '9': 'September', '10': 'October', '11': 'November', '12': 'December'
      };
      const fullMonthDesc = monthNames[monthVal] || monthName;

      confirmAction(
        `Are you sure you want to execute Period Roll-Over to <strong>${fullMonthDesc} ${yearVal}</strong>?<br><br>This operation will:<br>1. Close the current open accounting period.<br>2. Open new accounting period for <strong>${fullMonthDesc} ${yearVal}</strong>.<br>3. Automatically post monthly recurring invoices for active leases into the tenant ledger.`,
        async () => {
          const nowStr = new Date().toISOString();

          // 1. Close current open period
          const currentOpen = AppState.accountingPeriods.find(p => p.status === 'Open');
          if (currentOpen) {
            currentOpen.status = 'Closed';
            currentOpen.closed_at = nowStr;

            try {
              await fetch(`${SUPABASE_CONFIG.url}/rest/v1/accounting_periods?id=eq.${currentOpen.id}`, {
                method: 'PATCH',
                headers: {
                  'apikey': SUPABASE_CONFIG.anonKey,
                  'Authorization': `Bearer ${SUPABASE_CONFIG.anonKey}`,
                  'Content-Type': 'application/json',
                  'Prefer': 'return=minimal'
                },
                body: JSON.stringify({ status: 'Closed', closed_at: nowStr })
              });
            } catch (err) {
              console.warn('Supabase close period warning:', err);
            }
          }

          // 2. Open new period
          const maxNo = AppState.accountingPeriods.reduce((m, p) => Math.max(m, parseInt(p.period_no || 0, 10)), 0);
          const newPeriodNo = maxNo > 0 ? maxNo + 1 : 47;

          const newPeriodRecord = {
            id: (typeof crypto !== 'undefined' && crypto.randomUUID) ? crypto.randomUUID() : '00000000-0000-0000-0000-' + Date.now().toString(16).padStart(12, '0'),
            organization_id: getActiveOrgId(),
            period_no: newPeriodNo,
            period_month: monthVal,
            period_year: yearVal,
            description: fullMonthDesc,
            status: 'Open',
            opened_at: nowStr,
            closed_at: null,
            opened_by: 'DEAN',
            created_at: nowStr
          };

          AppState.accountingPeriods.unshift(newPeriodRecord);
          try {
            localStorage.setItem('mc_erp_accounting_periods', JSON.stringify(AppState.accountingPeriods));
          } catch(e) {}

          try {
            await fetch(`${SUPABASE_CONFIG.url}/rest/v1/accounting_periods`, {
              method: 'POST',
              headers: {
                'apikey': SUPABASE_CONFIG.anonKey,
                'Authorization': `Bearer ${SUPABASE_CONFIG.anonKey}`,
                'Content-Type': 'application/json',
                'Prefer': 'return=minimal'
              },
              body: JSON.stringify(newPeriodRecord)
            });
          } catch (err) {
            console.warn('Supabase new period insert warning:', err);
          }

          // 3. Bill tenants for new period
          let billedCount = 0;
          let totalBilled = 0;
          for (const lse of AppState.leases) {
            if (lse.status === 'Active') {
              const inv = {
                id: (typeof crypto !== 'undefined' && crypto.randomUUID) ? crypto.randomUUID() : '00000000-0000-0000-0000-' + (Date.now() + billedCount).toString(16).padStart(12, '0'),
                organization_id: getActiveOrgId(),
                tenant_id: lse.tenantId,
                property_id: lse.propertyId || 'PROP-03',
                unit_id: lse.unitId,
                tenant_code: lse.tenantCode || '',
                tenant_name: lse.tenantName,
                unit_code: lse.unitCode,
                property_name: lse.propertyName,
                payable_code: '001',
                description: `${fullMonthDesc} ${yearVal} Rent Roll-Over`,
                amount: Number(lse.rentAmount || 0),
                billing_type: 'Bulk',
                period_month: monthVal,
                period_year: yearVal,
                is_paid: false,
                created_at: nowStr
              };
              AppState.tenantInvoices.unshift(inv);

              AppState.ledger.push({
                id: `LED-${String(AppState.ledger.length + 1).padStart(3, '0')}`,
                timestamp: nowStr.replace('T', ' ').substring(0, 16),
                refNo: `RO-${Date.now().toString().slice(-6)}`,
                tenantId: lse.tenantId,
                tenantName: lse.tenantName,
                unitCode: lse.unitCode || '',
                type: 'Invoice',
                description: `${fullMonthDesc} ${yearVal} Rent Roll-Over`,
                debit: Number(lse.rentAmount || 0),
                credit: 0,
                balanceAfter: Number(lse.rentAmount || 0)
              });

              billedCount++;
              totalBilled += Number(lse.rentAmount || 0);
            }
          }

          renderAccountingPeriodsTable();
          renderLedgerTable();
          showToast(`✓ Period ${newPeriodNo} (${fullMonthDesc} ${yearVal}) opened successfully! ${billedCount} active tenancies billed (KES ${totalBilled.toLocaleString()}).`);
        },
        'Period Roll-Over Confirmation',
        'Bill Tenants & Open Period'
      );
    }

    function initAdminCompanySetup() {
      loadAdminCompanyProfile();
      loadBankAccounts();
      loadMpesaPaybills();
      loadAccountingPeriods();
      switchAdminTab(AppState.activeAdminTab || 'tab-payment-channels');
    }

    // Expose handlers globally for dynamic module binding
    window.updateSidebarBranding = updateSidebarBranding;
    window.loadAdminCompanyProfile = loadAdminCompanyProfile;
    window.saveAdminCompanyProfile = saveAdminCompanyProfile;
    window.handleCompanyProfileSubmit = saveAdminCompanyProfile;
    window.initAdminCompanySetup = initAdminCompanySetup;
    window.handleCompanyLogoPreview = handleCompanyLogoPreview;
    window.populateCompanyProfileUI = populateCompanyProfileUI;
    window.switchAdminTab = switchAdminTab;
    window.saveBankAccount = saveBankAccount;
    window.editBankAccount = editBankAccount;
    window.deleteBankAccount = deleteBankAccount;
    window.resetBankAccountForm = resetBankAccountForm;
    window.saveMpesaPaybill = saveMpesaPaybill;
    window.editMpesaPaybill = editMpesaPaybill;
    window.deleteMpesaPaybill = deleteMpesaPaybill;
    window.resetMpesaPaybillForm = resetMpesaPaybillForm;
    window.loadBankAccounts = loadBankAccounts;
    window.loadMpesaPaybills = loadMpesaPaybills;
    window.renderBankAccountsTable = renderBankAccountsTable;
    window.renderMpesaPaybillsTable = renderMpesaPaybillsTable;
    window.populateLinkedBankDropdown = populateLinkedBankDropdown;

    // Tenant Invoicing & Period Roll-Over Handlers
    window.switchTenantTab = switchTenantTab;
    window.initSingleTenantBilling = initSingleTenantBilling;
    window.onSinglePropertyChange = onSinglePropertyChange;
    window.onSingleTenantChange = onSingleTenantChange;
    window.renderSinglePayablesTable = renderSinglePayablesTable;
    window.executeSingleTenantBilling = executeSingleTenantBilling;
    window.initBulkTenantsBilling = initBulkTenantsBilling;
    window.onBulkPropertyChange = onBulkPropertyChange;
    window.onBulkPayableChange = onBulkPayableChange;
    window.renderBulkTenantsTable = renderBulkTenantsTable;
    window.toggleBulkSelectAll = toggleBulkSelectAll;
    window.executeBulkTenantsBilling = executeBulkTenantsBilling;
    window.loadAccountingPeriods = loadAccountingPeriods;
    window.renderAccountingPeriodsTable = renderAccountingPeriodsTable;
    window.executePeriodRollOver = executePeriodRollOver;

    // Tenant Receipting & Invoicing Handlers
    window.switchInvoiceSubTab = switchInvoiceSubTab;
    window.loadTenantReceipts = loadTenantReceipts;
    window.initTenantReceipting = initTenantReceipting;
    window.onReceiptPropertyChange = onReceiptPropertyChange;
    window.onReceiptTenantChange = onReceiptTenantChange;
    window.renderReceiptAllocationMatrix = renderReceiptAllocationMatrix;
    window.onPaymentReceivedInputChange = onPaymentReceivedInputChange;
    window.autoAllocateReceiptWaterfall = autoAllocateReceiptWaterfall;
    window.autoAllocateReceiptWaterfallSilently = autoAllocateReceiptWaterfallSilently;
    window.onMatrixAmountPaidInput = onMatrixAmountPaidInput;
    window.validateReceiptAllocations = validateReceiptAllocations;
    window.editTenantReceipt = editTenantReceipt;
    window.cancelReceiptEditMode = cancelReceiptEditMode;
    window.unlockReceiptFormInputs = unlockReceiptFormInputs;
    window.onReceiptPaymentModeChange = onReceiptPaymentModeChange;
    window.executePaymentReceipt = executePaymentReceipt;
    window.renderTenantReceiptsTable = renderTenantReceiptsTable;
    window.resetReceiptForm = resetReceiptForm;
    window.openOfficialReceiptModal = openOfficialReceiptModal;
    window.closeOfficialReceiptModal = closeOfficialReceiptModal;
    window.printOfficialReceipt = printOfficialReceipt;
    window.numberToWords = numberToWords;

    // Landlord Statement Engine Handlers (landlord Statement - Jan.pdf)
    window.initLandlordStatementGenerator = initLandlordStatementGenerator;
    window.generateLandlordRentStatement = generateLandlordRentStatement;
    window.generateLandlordUtilityStatement = generateLandlordUtilityStatement;
    window.executeGenerateLandlordStatement = executeGenerateLandlordStatement;
    window.printLandlordStatement = printLandlordStatement;

    // Tenant Statement of Account Engine Handlers (image_f7715c.png)
    window.initTenantStatementEngine = initTenantStatementEngine;
    window.onLedgerPropertyChange = onLedgerPropertyChange;
    window.onLedgerTenantChange = onLedgerTenantChange;
    window.generateTenantStatement = generateTenantStatement;
    window.printTenantStatement = printTenantStatement;
    window.getStatementCurrentTimestamp = getStatementCurrentTimestamp;
    window.formatStatementNumber = formatStatementNumber;
    window.formatDisplayDate = formatDisplayDate;

    // Initialize Theme and Load Active Module
    const savedTheme = localStorage.getItem('mc_erp_theme_choice') || 'developer';
    setTheme(savedTheme);

    // Initial boot load for Company Profile, Bank Accounts, M-Pesa, Accounting Periods, Receipts & Global Sidebar Branding
    updateSidebarBranding(AppState.companyProfile);
    loadAdminCompanyProfile();
    loadBankAccounts();
    loadMpesaPaybills();
    loadAccountingPeriods();
    loadTenantReceipts();

    const initialView = AppState.activeView || 'estate-reg';
    const initialNav = document.querySelector(`.nav-item[data-view="${initialView}"]`);
    const initialTitle = initialNav ? initialNav.getAttribute('data-tooltip') : 'Registration';
    loadModule(initialView, initialTitle);