const AppState = {
      organizationId: "org-metrocosmo-001",
      theme: 'flowly',
      sidebarCollapsed: false,
      activeView: 'estate-reg',
      activeRegTab: 'landlords',
      landlords: [
        {
          id: 'LL-01',
          landlordCode: 'L001',
          entityType: 'CORPORATE',
          name: 'Mugo Investments Ltd',
          idReg: 'CPR/2012/84910',
          kraPin: 'P051189201A',
          postalCode: 'P.O. Box 48190-00100 Nairobi',
          phone: '+254722100200',
          email: 'finance@mugoinvestments.co.ke',
          nextOfKinName: 'David Mugo',
          nextOfKinPhone: '+254722998811',
          nextOfKinRelationship: 'Director / Co-Owner',
          remitMethod: 'BANK',
          bank: 'KCB Bank Kenya',
          branch: 'Thika Section 9',
          accNo: '1120948192',
          isActive: true
        },
        {
          id: 'LL-02',
          landlordCode: 'L002',
          entityType: 'INDIVIDUAL',
          name: 'Dr. Sarah Simba',
          idReg: '24189012',
          kraPin: 'P051482910K',
          postalCode: 'P.O. Box 29102-00200 Nairobi',
          phone: '+254721900800',
          email: 'sarah.simba@premier.co.ke',
          nextOfKinName: 'Daniel Simba',
          nextOfKinPhone: '+254722554433',
          nextOfKinRelationship: 'Spouse',
          remitMethod: 'BANK',
          bank: 'Standard Chartered',
          branch: 'Kenyatta Ave',
          accNo: '01002938102',
          isActive: true
        }
      ],
      tenants: [
        {
          id: 'TEN-01',
          name: 'Grace Wanjiru Ndungu',
          idPassport: '31984210',
          phone: '0712345678',
          kraPin: 'A010948192K',
          emergency: 'John Ndungu (0722998877)',
          workplace: 'PwC Kenya, Delta Corner Westlands'
        },
        {
          id: 'TEN-02',
          name: 'Kevin Kiprop Patel',
          idPassport: '28491022',
          phone: '0720112233',
          kraPin: 'A009182910M',
          emergency: 'Mary Patel (0722334455)',
          workplace: 'KPMG Kenya, ABC Place Waiyaki Way'
        }
      ],
      properties: [
        {
          id: 'PROP-01',
          landlordId: 'LL-01',
          name: 'Chania Falls View Courts',
          lr: 'THIKA/MUNICIPALITY/BLOCK 4/182',
          type: 'RESIDENTIAL',
          county: 'Kiambu',
          subCounty: 'Section 9, Thika',
          prefix: 'CFV',
          caretaker: 'Samuel Mwangi (0722445566)',
          unitsCount: 4,
          payablesCount: 3,
          isActive: true
        },
        {
          id: 'PROP-02',
          landlordId: 'LL-02',
          name: 'Kilimani Crest Executive Apartments',
          lr: 'NAIROBI/BLOCK 33/502',
          type: 'RESIDENTIAL',
          county: 'Nairobi',
          subCounty: 'Kilimani, Nairobi',
          prefix: 'KIL',
          caretaker: 'Joseph Mutua (0721887766)',
          unitsCount: 2,
          payablesCount: 2,
          isActive: true
        }
      ],
      units: [
        {
          id: 'UNIT-01',
          propertyId: 'PROP-01',
          propertyName: 'Chania Falls View Courts',
          code: 'A-01',
          floor: 'Ground Floor',
          config: '2_BEDROOM',
          plinth: 85.0,
          rent: 32000,
          sc: 3500,
          meter: 'WM-CFV-001',
          status: 'OCCUPIED'
        },
        {
          id: 'UNIT-02',
          propertyId: 'PROP-01',
          propertyName: 'Chania Falls View Courts',
          code: 'A-02',
          floor: 'Ground Floor',
          config: '2_BEDROOM',
          plinth: 85.0,
          rent: 32000,
          sc: 3500,
          meter: 'WM-CFV-002',
          status: 'VACANT'
        },
        {
          id: 'UNIT-03',
          propertyId: 'PROP-02',
          propertyName: 'Kilimani Crest Executive Apartments',
          code: 'K-101',
          floor: '1st Floor',
          config: '3_BEDROOM',
          plinth: 140.0,
          rent: 75000,
          sc: 7500,
          meter: 'WM-KIL-101',
          status: 'OCCUPIED'
        }
      ],
      mandates: [
        {
          id: 'MND-01',
          landlordId: 'LL-01',
          landlordName: 'Mugo Investments Ltd',
          propertyId: 'PROP-01',
          propertyName: 'Chania Falls View Courts',
          effective: '2026-01-01',
          expiry: '2028-12-31',
          commissionType: 'PERCENTAGE',
          feePct: 8.5,
          feeFixed: 0,
          vat: true,
          mri: true,
          manager: 'Eng. Dennis Mugo',
          status: 'ACTIVE'
        },
        {
          id: 'MND-02',
          landlordId: 'LL-02',
          landlordName: 'Dr. Sarah Simba',
          propertyId: 'PROP-02',
          propertyName: 'Kilimani Crest Executive Apartments',
          effective: '2026-03-01',
          expiry: '2029-02-28',
          commissionType: 'PERCENTAGE',
          feePct: 8.0,
          feeFixed: 0,
          vat: true,
          mri: true,
          manager: 'Alex Kamau',
          status: 'ACTIVE'
        }
      ],
      activeTenantTab: 'leases',
      leases: [
        {
          id: 'LSE-001',
          tenantId: 'TEN-01',
          tenantName: 'Grace Wanjiru Ndungu',
          unitId: 'UNIT-01',
          unitCode: 'A-01',
          propertyName: 'Chania Falls View Courts',
          startDate: '2026-02-01',
          endDate: '2027-01-31',
          rentAmount: 32000,
          serviceCharge: 3500,
          depositAmount: 32000,
          handoverWater: 142.50,
          meterSerial: 'WM-CFV-001',
          status: 'Active'
        },
        {
          id: 'LSE-002',
          tenantId: 'TEN-02',
          tenantName: 'Kevin Kiprop Patel',
          unitId: 'UNIT-03',
          unitCode: 'K-101',
          propertyName: 'Kilimani Crest Executive Apartments',
          startDate: '2026-04-01',
          endDate: '2027-03-31',
          rentAmount: 75000,
          serviceCharge: 7500,
          depositAmount: 75000,
          handoverWater: 88.00,
          meterSerial: 'WM-KIL-101',
          status: 'Active'
        }
      ],
      utilityReadings: [
        {
          id: 'UTR-001',
          unitId: 'UNIT-01',
          unitCode: 'A-01',
          propertyName: 'Chania Falls View Courts',
          meterType: 'Water',
          readingDate: '2026-10-01',
          previousReading: 142.50,
          currentReading: 156.00,
          consumption: 13.50,
          tariffRate: 150.00,
          totalAmount: 2025.00,
          billedStatus: true
        },
        {
          id: 'UTR-002',
          unitId: 'UNIT-03',
          unitCode: 'K-101',
          propertyName: 'Kilimani Crest Executive Apartments',
          meterType: 'Water',
          readingDate: '2026-10-01',
          previousReading: 88.00,
          currentReading: 104.00,
          consumption: 16.00,
          tariffRate: 150.00,
          totalAmount: 2400.00,
          billedStatus: false
        }
      ],
      invoices: [
        {
          id: 'INV-2026-10-001',
          leaseId: 'LSE-001',
          invoiceNumber: 'INV-2026-10-001',
          tenantId: 'TEN-01',
          tenantName: 'Grace Wanjiru Ndungu',
          unitCode: 'A-01',
          propertyName: 'Chania Falls View Courts',
          periodMonth: 10,
          periodYear: 2026,
          rent: 32000,
          serviceCharge: 3500,
          utilities: 2025,
          arrears: 0,
          totalAmount: 37525,
          dueDate: '2026-10-05',
          status: 'Paid'
        },
        {
          id: 'INV-2026-10-002',
          leaseId: 'LSE-002',
          invoiceNumber: 'INV-2026-10-002',
          tenantId: 'TEN-02',
          tenantName: 'Kevin Kiprop Patel',
          unitCode: 'K-101',
          propertyName: 'Kilimani Crest Executive Apartments',
          periodMonth: 10,
          periodYear: 2026,
          rent: 75000,
          serviceCharge: 7500,
          utilities: 0,
          arrears: 0,
          totalAmount: 82500,
          dueDate: '2026-10-05',
          status: 'Unpaid'
        }
      ],
      ledger: [
        {
          id: 'LED-001',
          timestamp: '2026-10-01 08:00',
          refNo: 'INV-2026-10-001',
          tenantId: 'TEN-01',
          tenantName: 'Grace Wanjiru Ndungu',
          unitCode: 'A-01',
          leaseId: 'LSE-001',
          type: 'Invoice',
          description: 'October 2026 Rent (KES 32k), Service Charge (KES 3.5k), Water (KES 2,025)',
          debit: 37525,
          credit: 0,
          balanceAfter: 37525
        },
        {
          id: 'LED-002',
          timestamp: '2026-10-03 14:22',
          refNo: 'MPX-SK981240',
          tenantId: 'TEN-01',
          tenantName: 'Grace Wanjiru Ndungu',
          unitCode: 'A-01',
          leaseId: 'LSE-001',
          type: 'Payment',
          description: 'Safaricom Daraja M-Pesa C2B Paybill Receipt — Ref: Grace Wanjiru',
          debit: 0,
          credit: 37525,
          balanceAfter: 0
        },
        {
          id: 'LED-003',
          timestamp: '2026-10-01 08:00',
          refNo: 'INV-2026-10-002',
          tenantId: 'TEN-02',
          tenantName: 'Kevin Kiprop Patel',
          unitCode: 'K-101',
          leaseId: 'LSE-002',
          type: 'Invoice',
          description: 'October 2026 Rent (KES 75k), Service Charge (KES 7.5k)',
          debit: 82500,
          credit: 0,
          balanceAfter: 82500
        }
      ],
      activeLandlordTab: 'portfolio',
      landlordStatements: [
        {
          id: 'STM-2026-10-001',
          landlordId: 'LL-01',
          landlordName: 'Mugo Investments Ltd',
          propertyId: 'PROP-01',
          propertyName: 'Chania Falls View Courts',
          periodMonth: 10,
          periodYear: 2026,
          grossRent: 32000.00,
          commPct: 8.5,
          commAmount: 2720.00,
          vatAmount: 435.20,
          maintenance: 0.00,
          mriTax: 2400.00,
          netPayable: 26444.80,
          status: 'Paid',
          remitMethod: 'Bank Transfer (KCB)',
          remitDetails: 'KCB Bank Kenya • Thika Section 9 • Acc: 1120948192',
          payoutRef: 'EFT-KCB-982012',
          payoutDate: '2026-10-06'
        },
        {
          id: 'STM-2026-10-002',
          landlordId: 'LL-02',
          landlordName: 'Dr. Sarah Simba',
          propertyId: 'PROP-02',
          propertyName: 'Kilimani Crest Executive Apartments',
          periodMonth: 10,
          periodYear: 2026,
          grossRent: 75000.00,
          commPct: 8.0,
          commAmount: 6000.00,
          vatAmount: 960.00,
          maintenance: 0.00,
          mriTax: 5625.00,
          netPayable: 62415.00,
          status: 'Approved',
          remitMethod: 'Bank Transfer (Stanchart)',
          remitDetails: 'Standard Chartered • Kenyatta Ave • Acc: 01002938102',
          payoutRef: null,
          payoutDate: null
        }
      ],
      landlordPayouts: [
        {
          id: 'PAY-001',
          statementId: 'STM-2026-10-001',
          landlordName: 'Mugo Investments Ltd',
          method: 'Bank Transfer',
          refNo: 'EFT-KCB-982012',
          amount: 26444.80,
          date: '2026-10-06',
          notes: 'October 2026 Net Rental Proceeds Disbursed via KCB EFT'
        }
      ],
      activeRepairTab: 'tickets',
      vendors: [
        {
          id: 'VND-001',
          name: 'Aquaflow Plumbing Specialists',
          tradeCategory: 'Plumbing',
          contactPerson: 'Dennis Gitau',
          phone: '+254722550011',
          email: 'info@aquaflow.co.ke',
          kraPin: 'P051928371M',
          paymentDetails: 'M-Pesa Till: 892019 / Equity Bank Acc: 0140291829',
          isActive: true
        },
        {
          id: 'VND-002',
          name: 'Voltcraft Electrical Engineering Ltd',
          tradeCategory: 'Electrical',
          contactPerson: 'Erick Otieno',
          phone: '+254733440022',
          email: 'repairs@voltcraft.co.ke',
          kraPin: 'P051283940L',
          paymentDetails: 'Co-op Bank • Westlands • Acc: 01129384758',
          isActive: true
        },
        {
          id: 'VND-003',
          name: 'PrimeWood Carpentry & Joinery',
          tradeCategory: 'Carpentry',
          contactPerson: 'Simon Njoroge',
          phone: '+254721334455',
          email: 'primewood@gmail.com',
          kraPin: 'A009384729P',
          paymentDetails: 'M-Pesa Paybill: 247247, Acc: 721334455',
          isActive: true
        },
        {
          id: 'VND-004',
          name: 'CrownShield Painting & Finishes',
          tradeCategory: 'Painting',
          contactPerson: 'Grace Muthoni',
          phone: '+254728990011',
          email: 'sales@crownshield.co.ke',
          kraPin: 'P051829401N',
          paymentDetails: 'Absa Bank Kenya • Acc: 0309182910',
          isActive: true
        }
      ],
      maintenanceRequests: [
        {
          id: 'REQ-2026-001',
          ticketNumber: 'TKT-2026-001',
          propertyId: 'PROP-01',
          propertyName: 'Chania Falls View Courts',
          unitId: 'UNIT-01',
          unitCode: 'A-01',
          tenantId: 'TEN-01',
          tenantName: 'Grace Wanjiru Ndungu',
          category: 'Plumbing',
          priority: 'High',
          reportedBy: 'Tenant',
          description: 'Master bathroom shower mixer valve leaking heavily into floor trap causing water pooling.',
          status: 'In_Progress',
          createdAt: '2026-10-08 09:15'
        },
        {
          id: 'REQ-2026-002',
          ticketNumber: 'TKT-2026-002',
          propertyId: 'PROP-01',
          propertyName: 'Chania Falls View Courts',
          unitId: 'UNIT-02',
          unitCode: 'A-02',
          tenantId: null,
          tenantName: 'Vacant / Caretaker Turnaround',
          category: 'Painting',
          priority: 'Medium',
          reportedBy: 'Caretaker',
          description: 'Repaint living room and hallway walls ahead of prospective tenant handover.',
          status: 'Reported',
          createdAt: '2026-10-10 11:30'
        },
        {
          id: 'REQ-2026-003',
          ticketNumber: 'TKT-2026-003',
          propertyId: 'PROP-02',
          propertyName: 'Kilimani Crest Executive Apartments',
          unitId: null,
          unitCode: 'Common Area',
          tenantId: null,
          tenantName: 'Estate Common Area',
          category: 'Electrical',
          priority: 'Medium',
          reportedBy: 'Caretaker',
          description: 'Parking lot floodlight LED driver burned out; requires replacement.',
          status: 'Completed',
          createdAt: '2026-10-05 14:00'
        }
      ],
      maintenanceWorkOrders: [
        {
          id: 'LPO-2026-001',
          lpoNumber: 'LPO-2026-001',
          ticketId: 'REQ-2026-001',
          ticketNumber: 'TKT-2026-001',
          vendorId: 'VND-001',
          vendorName: 'Aquaflow Plumbing Specialists',
          propertyId: 'PROP-01',
          propertyName: 'Chania Falls View Courts',
          unitId: 'UNIT-01',
          unitCode: 'A-01',
          scopeOfWork: 'Replace master bath concealed shower mixer valve and pressure test pipework.',
          estimatedCost: 8500.00,
          actualCost: 8500.00,
          costAllocation: 'Landlord Deductible',
          approvalStatus: 'Approved',
          approvedBy: 'Eng. Dennis Mugo',
          issuedDate: '2026-10-09',
          completionDate: '2026-10-12',
          targetAccount: 'Mugo Investments Ltd',
          accountingImpact: 'Deducted from Landlord Monthly Remittance'
        },
        {
          id: 'LPO-2026-002',
          lpoNumber: 'LPO-2026-002',
          ticketId: 'REQ-2026-003',
          ticketNumber: 'TKT-2026-003',
          vendorId: 'VND-002',
          vendorName: 'Voltcraft Electrical Engineering Ltd',
          propertyId: 'PROP-02',
          propertyName: 'Kilimani Crest Executive Apartments',
          unitId: null,
          unitCode: 'Common Area',
          scopeOfWork: 'Supply and fit 150W waterproof outdoor LED floodlight and photocell sensor.',
          estimatedCost: 12000.00,
          actualCost: 11500.00,
          costAllocation: 'Common Service Charge Pool',
          approvalStatus: 'Fulfilled',
          approvedBy: 'Alex Kamau',
          issuedDate: '2026-10-05',
          completionDate: '2026-10-06',
          targetAccount: 'Kilimani SC Reserve Pool',
          accountingImpact: 'Absorbed into Common Service Charge Pool'
        },
        {
          id: 'LPO-2026-003',
          lpoNumber: 'LPO-2026-003',
          ticketId: null,
          ticketNumber: 'Direct / Tenant Surcharge',
          vendorId: 'VND-003',
          vendorName: 'PrimeWood Carpentry & Joinery',
          propertyId: 'PROP-01',
          propertyName: 'Chania Falls View Courts',
          unitId: 'UNIT-01',
          unitCode: 'A-01',
          scopeOfWork: 'Repair fractured mahogany main entrance lockset & architrave (tenant damage).',
          estimatedCost: 4500.00,
          actualCost: 4500.00,
          costAllocation: 'Tenant Damage Recovery',
          approvalStatus: 'Approved',
          approvedBy: 'Samuel Mwangi',
          issuedDate: '2026-10-14',
          completionDate: '2026-10-15',
          targetAccount: 'Grace Wanjiru Ndungu',
          accountingImpact: 'Billed to Tenant Debit Ledger / Invoice Surcharge'
        }
      ]
    };

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
      'estate-repairs': '1_4_repairs.html',
      'estate-admin': '1_5_admin.html',
      'mod-agency': '02_agency.html',
      'mod-valuation': '03_valuation.html',
      'mod-admin': '04_admin.html',
      'mod-finance': '05_finance.html',
      'mod-operations': '06_operations.html',
      'settings': '07_settings.html'
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
        if (!moduleCache[viewName]) {
          const response = await fetch(`modules/${fileName}`);
          if (!response.ok) throw new Error(`HTTP ${response.status} loading ${fileName}`);
          moduleCache[viewName] = await response.text();
        }

        moduleContainer.innerHTML = moduleCache[viewName];

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
      quickSettingsBtn.addEventListener('click', () => switchView('settings', '07. Settings'));
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
          renderLandlordsTable();
          renderTenantsTable();
          renderBuilderUnits();
          renderBuilderPayables();
          renderPropertiesTable();
          renderUnitsTable();
          renderMandatesTable();
          if (AppState.activeRegTab) {
            const btn = document.querySelector(`[data-reg-target="${AppState.activeRegTab}"]`);
            if (btn) btn.click();
          }
          break;

        case 'estate-tenants':
          setupTenantTabs();
          renderLeasesTable();
          renderReadingsTable();
          renderInvoicesTable();
          renderLedgerTable();
          if (AppState.activeTenantTab) {
            const btn = document.querySelector(`[data-tenant-target="${AppState.activeTenantTab}"]`);
            if (btn) btn.click();
          }
          break;

        case 'estate-landlords':
          setupLandlordTabs();
          populateLandlordDropdowns();
          renderLandlordPortfolioTable();
          renderLandlordStatementsTable();
          renderLandlordPayoutQueueTable();
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

        default:
          break;
      }
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
      if (codeInput) {
        codeInput.value = getNextLandlordCode();
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

    /* 1. LANDLORD SUBMIT */
    function handleLandlordSubmit(e) {
      e.preventDefault();
      const entityType = document.getElementById('landlord-entity-type').value;
      const name = entityType === 'CORPORATE' 
        ? document.getElementById('landlord-company-name').value
        : `${document.getElementById('landlord-first-name').value} ${document.getElementById('landlord-last-name').value}`;

      const codeElem = document.getElementById('landlord-code');
      const landlordCode = (codeElem && codeElem.value) ? codeElem.value : getNextLandlordCode();

      const newLL = {
        id: `LL-${String(AppState.landlords.length + 1).padStart(2, '0')}`,
        landlordCode,
        entityType,
        name,
        idReg: document.getElementById('landlord-id-reg').value,
        kraPin: document.getElementById('landlord-kra-pin').value,
        postalCode: document.getElementById('landlord-postal-code') ? document.getElementById('landlord-postal-code').value : '',
        phone: document.getElementById('landlord-phone').value,
        email: document.getElementById('landlord-email').value,
        nextOfKinName: document.getElementById('landlord-next-of-kin-name') ? document.getElementById('landlord-next-of-kin-name').value : '',
        nextOfKinPhone: document.getElementById('landlord-next-of-kin-phone') ? document.getElementById('landlord-next-of-kin-phone').value : '',
        nextOfKinRelationship: document.getElementById('landlord-next-of-kin-relationship') ? document.getElementById('landlord-next-of-kin-relationship').value : '',
        remitMethod: document.getElementById('landlord-remit-method').value,
        bank: document.getElementById('landlord-bank-name').value,
        branch: document.getElementById('landlord-bank-branch').value,
        accNo: document.getElementById('landlord-bank-acc').value,
        isActive: true
      };

      AppState.landlords.push(newLL);
      renderLandlordsTable();
      populateDropdowns();
      e.target.reset();
      updateNextLandlordCodeDisplay();
      showToast(`Landlord [${landlordCode}] ${name} registered successfully`);
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
            <td>${actionBtn}</td>
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
      const name = `${first} ${mid ? mid + ' ' : ''}${surname}`;

      const newTenant = {
        id: `TEN-${String(AppState.tenants.length + 1).padStart(2, '0')}`,
        name,
        idPassport: document.getElementById('tenant-id-passport').value,
        phone: document.getElementById('tenant-phone-primary').value,
        kraPin: document.getElementById('tenant-kra-pin').value || 'N/A',
        emergency: `${document.getElementById('tenant-emergency-name').value} (${document.getElementById('tenant-emergency-phone').value})`,
        workplace: document.getElementById('tenant-workplace').value || 'Unspecified'
      };

      AppState.tenants.push(newTenant);
      renderTenantsTable();
      e.target.reset();
      showToast(`Tenant ${name} registered with C2B phone ${newTenant.phone}`);
    }

    function renderTenantsTable() {
      const tbody = document.getElementById('table-tenants-body');
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

    function handlePropertySubmit(e) {
      e.preventDefault();
      const propId = `PROP-${String(AppState.properties.length + 1).padStart(2, '0')}`;
      const name = document.getElementById('prop-name').value;

      const newProp = {
        id: propId,
        name,
        lr: document.getElementById('prop-lr').value,
        type: document.getElementById('prop-type').value,
        county: document.getElementById('prop-county').value,
        subCounty: document.getElementById('prop-subcounty').value,
        prefix: document.getElementById('prop-paybill-prefix').value,
        caretaker: `${document.getElementById('prop-caretaker-name').value} (${document.getElementById('prop-caretaker-phone').value})`,
        unitsCount: builderUnitRows.length,
        payablesCount: builderPayableRows.length,
        isActive: true
      };

      AppState.properties.push(newProp);

      // Add built units to unit inventory
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

      renderPropertiesTable();
      renderUnitsTable();
      populateDropdowns();
      e.target.reset();
      showToast(`Property "${name}" onboarded with ${newProp.unitsCount} units and ${newProp.payablesCount} payables`);
    }

    function renderPropertiesTable() {
      const tbody = document.getElementById('table-properties-body');
      if (!tbody) return;
      tbody.innerHTML = AppState.properties.map(p => `
        <tr>
          <td><strong>${p.name}</strong></td>
          <td><code>${p.lr}</code></td>
          <td><span class="badge-status">${p.type}</span></td>
          <td>${p.subCounty}, ${p.county}</td>
          <td><code>${p.prefix}</code></td>
          <td><strong>${p.unitsCount} Units</strong></td>
          <td>${p.payablesCount} Payables</td>
          <td>
            ${p.isActive !== false 
              ? '<span class="badge-status" style="color: var(--accent-secondary); font-weight: 700;">● ACTIVE</span>' 
              : '<span class="badge-status" style="color: #DC2626; background: rgba(239, 68, 68, 0.12); font-weight: 700;">○ DEACTIVATED</span>'}
          </td>
        </tr>
      `).join('');
    }

    /* 4. STANDALONE UNIT SUBMIT */
    function handleStandaloneUnitSubmit(e) {
      e.preventDefault();
      const propId = document.getElementById('standalone-prop-select').value;
      const prop = AppState.properties.find(p => p.id === propId) || AppState.properties[0];

      const newUnit = {
        id: `UNIT-${AppState.units.length + 1}`,
        propertyId: prop.id,
        propertyName: prop.name,
        code: document.getElementById('unit-code').value,
        floor: document.getElementById('unit-floor').value || 'Ground',
        config: document.getElementById('unit-room-config').value,
        plinth: Number(document.getElementById('unit-plinth').value) || 0,
        rent: Number(document.getElementById('unit-baseline-rent').value) || 0,
        sc: Number(document.getElementById('unit-service-charge').value) || 0,
        meter: document.getElementById('unit-water-meter').value || 'N/A',
        status: 'VACANT'
      };

      AppState.units.push(newUnit);
      prop.unitsCount = (prop.unitsCount || 0) + 1;
      renderUnitsTable();
      renderPropertiesTable();
      e.target.reset();
      showToast(`Unit ${newUnit.code} added to ${prop.name}`);
    }

    function renderUnitsTable() {
      const filterProp = document.getElementById('filter-units-by-property').value;
      const filtered = filterProp === 'ALL' || !filterProp
        ? AppState.units
        : AppState.units.filter(u => u.propertyId === filterProp);

      const tbody = document.getElementById('table-units-body');
      tbody.innerHTML = filtered.map(u => `
        <tr>
          <td><strong>${u.code}</strong></td>
          <td>${u.propertyName}</td>
          <td>${u.floor}</td>
          <td>${u.config}</td>
          <td>${u.plinth ? u.plinth + ' m²' : '—'}</td>
          <td><strong>KES ${Number(u.rent).toLocaleString()}</strong></td>
          <td>KES ${Number(u.sc).toLocaleString()}</td>
          <td><code>${u.meter}</code></td>
          <td><span class="badge-status" style="color: ${u.status==='OCCUPIED'?'var(--accent-secondary)':'var(--accent-amber)'};">${u.status}</span></td>
        </tr>
      `).join('');
    }

    /* 5. PROPERTY ASSIGNMENT (MANDATE) SUBMIT */
    function toggleMandateCommissionType() {
      const typeElem = document.getElementById('mandate-commission-type');
      if (!typeElem) return;
      const isPct = typeElem.value === 'PERCENTAGE';
      const grpPct = document.getElementById('group-mandate-pct');
      const grpFixed = document.getElementById('group-mandate-fixed');
      if (grpPct) grpPct.style.display = isPct ? 'flex' : 'none';
      if (grpFixed) grpFixed.style.display = isPct ? 'none' : 'flex';
    }

    function handleMandateSubmit(e) {
      e.preventDefault();
      const llId = document.getElementById('mandate-landlord-select').value;
      const propId = document.getElementById('mandate-property-select').value;
      const landlord = AppState.landlords.find(l => l.id === llId) || AppState.landlords[0];
      const property = AppState.properties.find(p => p.id === propId) || AppState.properties[0];

      const commTypeElem = document.getElementById('mandate-commission-type');
      const commissionType = commTypeElem ? commTypeElem.value : 'PERCENTAGE';
      const feePct = commissionType === 'PERCENTAGE' ? Number(document.getElementById('mandate-fee-pct').value || 0) : 0;
      const feeFixed = commissionType === 'FIXED' ? Number(document.getElementById('mandate-fee-fixed').value || 0) : 0;

      const newMandate = {
        id: `MND-${String(AppState.mandates.length + 1).padStart(2, '0')}`,
        landlordId: landlord.id,
        landlordName: landlord.name,
        propertyId: property.id,
        propertyName: property.name,
        effective: document.getElementById('mandate-effective-date').value,
        expiry: document.getElementById('mandate-expiry-date').value || 'Open-ended',
        commissionType,
        feePct,
        feeFixed,
        vat: document.getElementById('mandate-vat-applicable').checked,
        mri: document.getElementById('mandate-mri-applicable').checked,
        manager: document.getElementById('mandate-manager').value,
        status: 'ACTIVE'
      };

      // Link property to landlord directly
      property.landlordId = landlord.id;

      AppState.mandates.push(newMandate);
      renderMandatesTable();
      renderLandlordPortfolioTable();
      e.target.reset();
      toggleMandateCommissionType();
      showToast(`Management Mandate executed for ${property.name} (${commissionType === 'FIXED' ? `KES ${feeFixed.toLocaleString()} Fixed` : `${feePct}%`})`);
    }

    function renderMandatesTable() {
      const tbody = document.getElementById('table-mandates-body');
      if (!tbody) return;
      tbody.innerHTML = AppState.mandates.map(m => {
        const commText = m.commissionType === 'FIXED'
          ? `<strong>KES ${Number(m.feeFixed || 0).toLocaleString()}</strong> <small>(Fixed/Mo)</small>`
          : `<strong>${m.feePct}%</strong> <small>(Gross Rent)</small>`;

        return `
          <tr>
            <td><strong>${m.landlordName}</strong></td>
            <td>${m.propertyName}</td>
            <td>${m.effective} to ${m.expiry}</td>
            <td>${commText}</td>
            <td>${m.vat ? '<span style="color: var(--accent-secondary);">✓ 16% VAT</span>' : 'Exempt'}</td>
            <td>${m.mri ? '<span style="color: var(--accent-secondary);">✓ 7.5% MRI</span>' : 'Exempt'}</td>
            <td>${m.manager}</td>
            <td><span class="badge-status" style="color: var(--accent-secondary);">${m.status}</span></td>
          </tr>
        `;
      }).join('');
    }

    function populateDropdowns() {
      // Standalone units property selector
      const pSelect = document.getElementById('standalone-prop-select');
      const pFilter = document.getElementById('filter-units-by-property');
      const mPropSelect = document.getElementById('mandate-property-select');

      const propOpts = AppState.properties.map(p => `<option value="${p.id}">${p.name} (${p.lr})</option>`).join('');
      pSelect.innerHTML = propOpts;
      mPropSelect.innerHTML = propOpts;
      pFilter.innerHTML = `<option value="ALL">All Properties</option>${propOpts}`;

      // Mandate landlord selector
      const mLlSelect = document.getElementById('mandate-landlord-select');
      mLlSelect.innerHTML = AppState.landlords.map(l => `<option value="${l.id}">${l.name} (${l.kraPin})</option>`).join('');

      // Sub-Module 1.2 Tenant Dropdowns
      populateTenantDropdowns();
    }

    /* SUB-MODULE 1.2: TENANTS LOGIC & INTERACTION ENGINES */

    // Tab switching for 1.2 Tenants
    function setupTenantTabs() {
      const tenantTabBtns = document.querySelectorAll('.tenant-tab-btn');
      tenantTabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          tenantTabBtns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');

          const target = btn.getAttribute('data-tenant-target');
          AppState.activeTenantTab = target;
          document.querySelectorAll('.tenant-panel').forEach(p => p.classList.remove('active'));
          const targetPanel = document.getElementById(`panel-tenant-${target}`);
          if (targetPanel) targetPanel.classList.add('active');
        });
      });
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

      const newLease = {
        id: `LSE-${String(AppState.leases.length + 1).padStart(3, '0')}`,
        tenantId: tenant.id,
        tenantName: tenant.name,
        unitId: unit.id,
        unitCode: unit.code,
        propertyName: unit.propertyName,
        startDate: document.getElementById('lease-start-date').value,
        endDate: document.getElementById('lease-end-date').value || 'Open-ended',
        rentAmount: Number(document.getElementById('lease-rent-amount').value),
        serviceCharge: Number(document.getElementById('lease-sc-amount').value),
        depositAmount: Number(document.getElementById('lease-deposit-amount').value),
        handoverWater: Number(document.getElementById('lease-handover-water').value) || 0,
        meterSerial: document.getElementById('lease-electricity-meter').value || unit.meter || 'WM-SUB-01',
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
      showToast(`Lease executed for ${tenant.name} at ${unit.code}`);
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
      lease.status = 'Expired';
      const unit = AppState.units.find(u => u.id === lease.unitId);
      if (unit) unit.status = 'VACANT';
      renderLeasesTable();
      renderUnitsTable();
      populateTenantDropdowns();
      showToast(`Lease ${leaseId} terminated. Unit ${lease.unitCode} marked VACANT.`);
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

      const newReading = {
        id: `UTR-${String(AppState.utilityReadings.length + 1).padStart(3, '0')}`,
        unitId: unit.id,
        unitCode: unit.code,
        propertyName: unit.propertyName,
        meterType: document.getElementById('meter-type-select').value,
        readingDate: document.getElementById('meter-reading-date').value,
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
      showToast(`Utility reading logged: ${consumption} m³ for Unit ${unit.code} (KES ${total.toLocaleString()})`);
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
        const monthNames = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
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
      showToast(`Monthly Billing Run complete. Generated ${generatedCount} invoices.`);
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

    // 4. TENANT LEDGER & RECEIPTING ENGINE
    function renderLedgerTable() {
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

      // Add Credit entry to ledger
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

      closeReceiptModal();
      renderLedgerTable();
      renderInvoicesTable();
      showToast(`Receipt ${refNo} (KES ${amount.toLocaleString()}) posted & reconciled.`);
    }

    /* SUB-MODULE 1.3: LANDLORDS LOGIC & INTERACTION ENGINES */

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

      const remitDetails = landlord.remitMethod === 'BANK'
        ? `${landlord.bank} • ${landlord.branch} • Acc: ${landlord.accNo}`
        : `M-Pesa B2C Mobile • ${landlord.phone}`;

      const stmtId = `STM-${year}-${String(month).padStart(2, '0')}-${String(AppState.landlordStatements.length + 1).padStart(3, '0')}`;

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
      showToast(`Statement ${stmtId} generated for ${landlord.name} (Net: KES ${net.toLocaleString()})`);
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
      showToast(`Payout recorded: KES ${statement.netPayable.toLocaleString()} disbursed to ${statement.landlordName} (Ref: ${refNo})`);
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
      showToast(`Incident ticket ${ticketNum} logged under priority: ${priority}`);
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

      const lpoNum = `LPO-2026-${String(AppState.maintenanceWorkOrders.length + 1).padStart(3, '0')}`;
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
      showToast(`Work Order & LPO ${lpoNum} authorized (KES ${actCost.toLocaleString()})`);
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
      showToast(`Vendor ${name} registered in trade: ${trade}`);
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

    // Initialize Theme and Load Active Module
    const savedTheme = localStorage.getItem('mc_erp_theme_choice') || 'developer';
    setTheme(savedTheme);

    const initialView = AppState.activeView || 'estate-reg';
    const initialNav = document.querySelector(`.nav-item[data-view="${initialView}"]`);
    const initialTitle = initialNav ? initialNav.getAttribute('data-tooltip') : '1.1 Registration';
    loadModule(initialView, initialTitle);