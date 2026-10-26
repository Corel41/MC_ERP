/**
 * MC ERP - Landlords Hub & Deductions Engine (MPA)
 * Handles Landlord Deductions, Other Income, Portfolios, Statements, and Remittance Payouts
 */

(function () {
  'use strict';

  // Seed default deductions if not already in localStorage
  const DEFAULT_DEDUCTIONS = [
    {
      id: 'DED-SPA-2026-10-01',
      propertyId: '00000002-0000-4000-8000-000000000001',
      propertyName: 'SUNRISE PARK APARTMENTS',
      landlordId: '00000001-0000-4000-8000-000000000001',
      landlordName: 'Sunrise Park Holdings Ltd',
      entryType: 'Deduction',
      category: 'Caretaker / Security Wages',
      amount: 12000.00,
      periodMonth: 10,
      periodYear: 2026,
      date: '2026-10-25',
      voucherRef: 'VCH-2026-1042',
      payee: 'Samuel Kiprop & Security Staff',
      notes: 'October On-Site Security & Cleaning Wages',
      status: 'Approved'
    },
    {
      id: 'DED-SPA-2026-10-02',
      propertyId: '00000002-0000-4000-8000-000000000001',
      propertyName: 'SUNRISE PARK APARTMENTS',
      landlordId: '00000001-0000-4000-8000-000000000001',
      landlordName: 'Sunrise Park Holdings Ltd',
      entryType: 'Deduction',
      category: 'Repairs & Maintenance',
      amount: 3500.00,
      periodMonth: 10,
      periodYear: 2026,
      date: '2026-10-20',
      voucherRef: 'VCH-2026-1015',
      payee: 'Nairobi Plumbing & Pipe Techs',
      notes: 'Plumbing Fixes for Main Gate Water Pipe',
      status: 'Approved'
    },
    {
      id: 'DED-001',
      propertyId: '00000002-0000-4000-8000-000000000001',
      propertyName: 'Sunrise Park Estate',
      landlordId: '00000001-0000-4000-8000-000000000001',
      landlordName: 'Sunrise Park Holdings Ltd',
      entryType: 'Deduction',
      category: 'Caretaker Wages',
      amount: 18000.00,
      periodMonth: 1,
      periodYear: 2026,
      date: '2026-01-25',
      voucherRef: 'VCH-2026-0142',
      payee: 'Samuel Kiprop (Caretaker)',
      notes: 'January 2026 Monthly caretaker allowance & wage',
      status: 'Approved'
    },
    {
      id: 'DED-002',
      propertyId: '00000002-0000-4000-8000-000000000001',
      propertyName: 'Sunrise Park Estate',
      landlordId: '00000001-0000-4000-8000-000000000001',
      landlordName: 'Sunrise Park Holdings Ltd',
      entryType: 'Deduction',
      category: 'Security Wages',
      amount: 25000.00,
      periodMonth: 1,
      periodYear: 2026,
      date: '2026-01-26',
      voucherRef: 'VCH-2026-0188',
      payee: 'G4S Security Kenya Ltd',
      notes: 'Day & night guard monthly station billing',
      status: 'Approved'
    },
    {
      id: 'DED-003',
      propertyId: '00000002-0000-4000-8000-000000000002',
      propertyName: 'Green Valley Heights',
      landlordId: '00000001-0000-4000-8000-000000000002',
      landlordName: 'Margaret Ndungu',
      entryType: 'Deduction',
      category: 'Statutory 7.5% MRI Tax',
      amount: 15300.00,
      periodMonth: 1,
      periodYear: 2026,
      date: '2026-01-28',
      voucherRef: 'KRA-MRI-2026-09',
      payee: 'Kenya Revenue Authority (KRA)',
      notes: '7.5% Monthly Rental Income withholding tax declaration',
      status: 'Approved'
    },
    {
      id: 'DED-004',
      propertyId: '00000002-0000-4000-8000-000000000003',
      propertyName: 'Royal Palms Apartment',
      landlordId: '00000001-0000-4000-8000-000000000003',
      landlordName: 'Deep & Nirah Shah Family Trust',
      entryType: 'Deduction',
      category: 'Repairs & Maintenance',
      amount: 12500.00,
      periodMonth: 1,
      periodYear: 2026,
      date: '2026-01-20',
      voucherRef: 'VCH-2026-0105',
      payee: 'Nairobi Plumbing & Pumps Co.',
      notes: 'Replacement of borehole booster pump pressure switch',
      status: 'Approved'
    },
    {
      id: 'DED-005',
      propertyId: '00000002-0000-4000-8000-000000000002',
      propertyName: 'Green Valley Heights',
      landlordId: '00000001-0000-4000-8000-000000000002',
      landlordName: 'Margaret Ndungu',
      entryType: 'Deduction',
      category: 'Conservancy & Land Rates',
      amount: 8500.00,
      periodMonth: 1,
      periodYear: 2026,
      date: '2026-01-15',
      voucherRef: 'NCCG-RATE-8821',
      payee: 'Nairobi City County Government',
      notes: 'Annual land rates & garbage conservancy fee levy',
      status: 'Approved'
    }
  ];

  // Seed default other income if not already in localStorage
  const DEFAULT_OTHER_INCOME = [
    {
      id: 'INC-SPA-2026-10-01',
      propertyId: '00000002-0000-4000-8000-000000000001',
      propertyName: 'SUNRISE PARK APARTMENTS',
      landlordId: '00000001-0000-4000-8000-000000000001',
      landlordName: 'Sunrise Park Holdings Ltd',
      entryType: 'Other Income',
      category: 'Rooftop Advertising',
      amount: 15000.00,
      periodMonth: 10,
      periodYear: 2026,
      date: '2026-10-10',
      voucherRef: 'INC-2026-1001',
      payee: 'Safaricom Telecommunications',
      payer: 'Safaricom Telecommunications',
      notes: 'Q3 Telecom Mast Lease Space - SPA',
      status: 'Approved'
    },
    {
      id: 'INC-SPA-2026-10-02',
      propertyId: '00000002-0000-4000-8000-000000000001',
      propertyName: 'SUNRISE PARK APARTMENTS',
      landlordId: '00000001-0000-4000-8000-000000000001',
      landlordName: 'Sunrise Park Holdings Ltd',
      entryType: 'Other Income',
      category: 'Commercial Parking Fees',
      amount: 4500.00,
      periodMonth: 10,
      periodYear: 2026,
      date: '2026-10-15',
      voucherRef: 'INC-2026-1002',
      payee: 'Visitor Commercial Bay',
      payer: 'Visitor Overflow Parking Collections',
      notes: 'Visitor Overflow Parking Collections',
      status: 'Approved'
    },
    {
      id: 'INC-001',
      propertyId: '00000002-0000-4000-8000-000000000001',
      propertyName: 'Sunrise Park Estate',
      landlordId: '00000001-0000-4000-8000-000000000001',
      landlordName: 'Sunrise Park Holdings Ltd',
      entryType: 'Other Income',
      category: 'Rooftop Advertising',
      amount: 15000.00,
      periodMonth: 1,
      periodYear: 2026,
      date: '2026-01-10',
      voucherRef: 'INC-2026-001',
      payee: 'Safaricom Telecommunications',
      payer: 'Safaricom Telecommunications',
      notes: 'Monthly billboard rooftop mast leasing',
      status: 'Approved'
    },
    {
      id: 'INC-002',
      propertyId: '00000002-0000-4000-8000-000000000001',
      propertyName: 'Sunrise Park Estate',
      landlordId: '00000001-0000-4000-8000-000000000001',
      landlordName: 'Sunrise Park Holdings Ltd',
      entryType: 'Other Income',
      category: 'Parking Fees',
      amount: 6000.00,
      periodMonth: 1,
      periodYear: 2026,
      date: '2026-01-15',
      voucherRef: 'INC-2026-002',
      payee: 'Visitor Commercial Reserve Bay',
      payer: 'Visitor Commercial Reserve Bay',
      notes: 'Visitor commercial monthly parking fee',
      status: 'Approved'
    }
  ];

  function getStoredDeductions() {
    try {
      const raw = localStorage.getItem('mc_erp_landlord_deductions');
      if (raw) {
        const list = JSON.parse(raw);
        DEFAULT_DEDUCTIONS.forEach(sd => {
          if (!list.some(d => d.id === sd.id)) list.unshift(sd);
        });
        return list;
      }
    } catch (e) {
      console.warn('Could not read landlord deductions from localStorage', e);
    }
    return DEFAULT_DEDUCTIONS;
  }

  function saveStoredDeductions(list) {
    try {
      localStorage.setItem('mc_erp_landlord_deductions', JSON.stringify(list));
    } catch (e) {
      console.warn('Could not save landlord deductions to localStorage', e);
    }
  }

  function getStoredOtherIncome() {
    try {
      const raw = localStorage.getItem('mc_erp_landlord_other_income');
      if (raw) {
        const list = JSON.parse(raw);
        DEFAULT_OTHER_INCOME.forEach(si => {
          if (!list.some(i => i.id === si.id)) list.unshift(si);
        });
        return list;
      }
    } catch (e) {
      console.warn('Could not read landlord other income from localStorage', e);
    }
    return DEFAULT_OTHER_INCOME;
  }

  function saveStoredOtherIncome(list) {
    try {
      localStorage.setItem('mc_erp_landlord_other_income', JSON.stringify(list));
    } catch (e) {
      console.warn('Could not save landlord other income to localStorage', e);
    }
  }

  const DEDUCTION_CATEGORIES = [
    'Caretaker Wages',
    'Security Wages',
    'Statutory 7.5% MRI Tax',
    'Repairs & Maintenance',
    'Conservancy & Land Rates',
    'Electricity / Water Common',
    'Insurance Premium',
    'Legal & Audit Fees',
    'Direct Landlord Settlement',
    'Other Sundry Expense'
  ];

  const OTHER_INCOME_CATEGORIES = [
    'Rooftop Advertising',
    'Parking Fees',
    'Commercial Parking Fees',
    'Telecommunication Mast',
    'Generator Power Sale',
    'Garbage Levy Commission',
    'Billboard / Signage',
    'Miscellaneous Other Income'
  ];

  function onDeductionTypeChange(type) {
    const catSel = document.getElementById('deduction-category-select');
    const catLabel = document.getElementById('deduction-category-label');
    const payeeLabel = document.getElementById('deduction-payee-label');
    const payeeInput = document.getElementById('deduction-payee');
    const btnSubmit = document.getElementById('btn-record-deduction');
    const vchInput = document.getElementById('deduction-voucher-ref');

    const isIncome = (type === 'Other Income');

    if (catLabel) catLabel.textContent = isIncome ? 'Income Category *' : 'Expense Category *';
    if (payeeLabel) payeeLabel.textContent = isIncome ? 'Payer / Client Name' : 'Payee / Contractor Name';
    if (payeeInput) payeeInput.placeholder = isIncome ? 'e.g. Safaricom / Tenant / Third-Party Payer' : 'e.g. Caretaker / KRA / Plumbing Tech';
    if (btnSubmit) btnSubmit.textContent = isIncome ? '+ Record Other Income' : '+ Record Deduction';

    if (catSel) {
      const cats = isIncome ? OTHER_INCOME_CATEGORIES : DEDUCTION_CATEGORIES;
      catSel.innerHTML = cats.map(c => `<option value="${c}">${c}</option>`).join('');
    }

    if (vchInput) {
      const rand = Math.floor(1000 + Math.random() * 9000);
      const year = new Date().getFullYear();
      vchInput.value = isIncome ? `INC-${year}-${rand}` : `VCH-${year}-${rand}`;
    }
  }

  function initLandlordsHub() {
    window.AppState = window.AppState || {};

    const hydrateFn = (typeof window !== 'undefined' && typeof window.hydrateAllAppState === 'function') 
      ? window.hydrateAllAppState 
      : null;

    if (hydrateFn) {
      hydrateFn(window.AppState);
    } else if (typeof window !== 'undefined' && window.MC_ERP_SEED_DATA) {
      Object.keys(window.MC_ERP_SEED_DATA).forEach(k => {
        if (!window.AppState[k]) window.AppState[k] = window.MC_ERP_SEED_DATA[k];
      });
    }

    if (!AppState.properties && window.SEED_PROPERTIES) AppState.properties = window.SEED_PROPERTIES;
    if (!AppState.landlords && window.SEED_LANDLORDS) AppState.landlords = window.SEED_LANDLORDS;
    if (!AppState.mandates && window.SEED_MANDATES) AppState.mandates = window.SEED_MANDATES;
    if (!AppState.units && window.SEED_UNITS) AppState.units = window.SEED_UNITS;
    if (!AppState.landlordStatements && window.SEED_LANDLORD_STATEMENTS) AppState.landlordStatements = window.SEED_LANDLORD_STATEMENTS;

    AppState.landlordDeductions = getStoredDeductions();
    AppState.landlordOtherIncome = getStoredOtherIncome();

    setupTabNavigation();
    populatePropertyDropdowns();
    populateDateDefaults();
    generateNewVoucherRef();

    renderLandlordPortfolioTable();
    renderLandlordDeductionsTable();
    renderLandlordPayoutQueueTable();

    // Check URL hash for direct tab navigation (e.g. #statements, #deductions, #payouts)
    const hash = window.location.hash.replace('#', '');
    if (hash === 'statements' || hash === 'deductions' || hash === 'payouts' || hash === 'portfolio') {
      switchLandlordTab(hash);
    }
  }

  function switchLandlordTab(targetTabId) {
    if (!targetTabId) return;
    AppState.activeLandlordTab = targetTabId;

    // Normalize targets
    const cleanId = targetTabId.replace('panel-landlord-', '').replace('panel-', '');

    const tabBtns = document.querySelectorAll('.landlord-tab-btn, .tab-btn, .landlord-hub-tab-btn');
    tabBtns.forEach(btn => {
      const bTarget = btn.getAttribute('data-landlord-target') || btn.getAttribute('data-tab-target');
      if (bTarget === cleanId) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    const panels = document.querySelectorAll('.landlord-panel, .tab-content, .landlord-hub-panel');
    panels.forEach(p => {
      if (p.id === `panel-landlord-${cleanId}` || p.id === `panel-${cleanId}`) {
        p.classList.add('active');
        p.style.display = 'block';
      } else {
        p.classList.remove('active');
        p.style.display = 'none';
      }
    });

    // Trigger tab-specific initialization
    if (cleanId === 'statements') {
      if (typeof window.initLandlordStatementGenerator === 'function') {
        window.initLandlordStatementGenerator();
      }
    } else if (cleanId === 'portfolio') {
      renderLandlordPortfolioTable();
    } else if (cleanId === 'deductions') {
      renderLandlordDeductionsTable();
    } else if (cleanId === 'payouts') {
      renderLandlordPayoutQueueTable();
    }
  }

  function setupTabNavigation() {
    const tabBtns = document.querySelectorAll('.landlord-tab-btn, .tab-btn, .landlord-hub-tab-btn');
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.getAttribute('data-landlord-target') || btn.getAttribute('data-tab-target');
        if (target) {
          switchLandlordTab(target);
        }
      });
    });
  }

  function populatePropertyDropdowns() {
    const propSel = document.getElementById('deduction-property-select');
    const filterPropSel = document.getElementById('filter-deduction-property');
    const props = AppState.properties || [];

    if (propSel) {
      propSel.innerHTML = '<option value="">-- Select Managed Property --</option>' +
        props.map(p => `<option value="${p.id}">${p.name} (${p.code || p.lr || 'Estate'})</option>`).join('');
      
      propSel.addEventListener('change', () => {
        handlePropertyChange(propSel.value);
      });
      if (props.length > 0) {
        propSel.value = props[0].id;
        handlePropertyChange(props[0].id);
      }
    }

    if (filterPropSel) {
      filterPropSel.innerHTML = '<option value="ALL">All Properties</option>' +
        props.map(p => `<option value="${p.id}">${p.name}</option>`).join('');
    }
  }

  function handlePropertyChange(propId) {
    const landlordNameInput = document.getElementById('deduction-landlord-name');
    const landlordIdInput = document.getElementById('deduction-landlord-id');
    if (!landlordNameInput) return;

    if (!propId) {
      landlordNameInput.value = '';
      if (landlordIdInput) landlordIdInput.value = '';
      return;
    }

    const prop = (AppState.properties || []).find(p => p.id === propId);
    if (!prop) return;

    const mandate = (AppState.mandates || []).find(m => m.propertyName === prop.name || m.propertyId === prop.id);
    let landlordName = mandate ? mandate.landlordName : '';
    let landlordId = '';

    if (!landlordName && prop.landlordId) {
      const ll = (AppState.landlords || []).find(l => l.id === prop.landlordId);
      if (ll) {
        landlordName = ll.name;
        landlordId = ll.id;
      }
    }

    if (!landlordName && (AppState.landlords || []).length > 0) {
      const ll = AppState.landlords[0];
      landlordName = ll.name;
      landlordId = ll.id;
    }

    landlordNameInput.value = landlordName || 'Principal Landlord';
    if (landlordIdInput) landlordIdInput.value = landlordId;
  }

  function populateDateDefaults() {
    const today = new Date();
    const curYear = today.getFullYear();
    const curMonth = today.getMonth() + 1;

    const monthSel = document.getElementById('deduction-month');
    const yearSel = document.getElementById('deduction-year');
    const dateInput = document.getElementById('deduction-date');

    if (monthSel) monthSel.value = String(curMonth);
    if (yearSel) yearSel.value = String(curYear);
    if (dateInput) dateInput.value = today.toISOString().split('T')[0];
  }

  function generateNewVoucherRef(isIncome) {
    const voucherInput = document.getElementById('deduction-voucher-ref');
    const typeSelect = document.getElementById('deduction-entry-type');
    const income = (isIncome !== undefined) ? isIncome : (typeSelect && typeSelect.value === 'Other Income');

    if (voucherInput) {
      const rnd = Math.floor(1000 + Math.random() * 9000);
      voucherInput.value = income ? `INC-${new Date().getFullYear()}-${rnd}` : `VCH-${new Date().getFullYear()}-${rnd}`;
    }
  }

  function recordLandlordDeduction(e) {
    if (e) e.preventDefault();

    const typeSel = document.getElementById('deduction-entry-type');
    const entryType = (typeSel && typeSel.value === 'Other Income') ? 'Other Income' : 'Deduction';

    const propSel = document.getElementById('deduction-property-select');
    const landlordNameInput = document.getElementById('deduction-landlord-name');
    const landlordIdInput = document.getElementById('deduction-landlord-id');
    const categorySel = document.getElementById('deduction-category-select');
    const amountInput = document.getElementById('deduction-amount');
    const monthSel = document.getElementById('deduction-month');
    const yearSel = document.getElementById('deduction-year');
    const dateInput = document.getElementById('deduction-date');
    const voucherInput = document.getElementById('deduction-voucher-ref');
    const payeeInput = document.getElementById('deduction-payee');
    const notesInput = document.getElementById('deduction-notes');

    if (!propSel || !propSel.value) {
      alert('Please select a managed property.');
      if (propSel) propSel.focus();
      return;
    }

    const amount = parseFloat(amountInput.value);
    if (!amount || amount <= 0) {
      alert('Please enter a valid amount greater than zero.');
      amountInput.focus();
      return;
    }

    const prop = (AppState.properties || []).find(p => p.id === propSel.value);
    const propName = prop ? prop.name : 'Estate Property';
    const pMonth = parseInt(monthSel.value, 10) || 1;
    const pYear = parseInt(yearSel.value, 10) || 2026;
    const pDate = dateInput.value || new Date().toISOString().split('T')[0];
    const notes = notesInput.value.trim() || '';

    if (entryType === 'Other Income') {
      const newIncome = {
        id: 'INC-' + Date.now(),
        propertyId: propSel.value,
        propertyName: propName,
        landlordId: landlordIdInput ? landlordIdInput.value : '',
        landlordName: landlordNameInput.value || 'Principal Landlord',
        entryType: 'Other Income',
        category: categorySel.value,
        amount: amount,
        periodMonth: pMonth,
        periodYear: pYear,
        date: pDate,
        voucherRef: voucherInput.value.trim() || `INC-${pYear}-${Math.floor(1000 + Math.random() * 9000)}`,
        payee: payeeInput.value.trim() || 'Client / Third Party Payer',
        payer: payeeInput.value.trim() || 'Client / Third Party Payer',
        notes: notes,
        status: 'Approved'
      };

      AppState.landlordOtherIncome = AppState.landlordOtherIncome || [];
      AppState.landlordOtherIncome.unshift(newIncome);
      saveStoredOtherIncome(AppState.landlordOtherIncome);

      showToast(`Other Income ${newIncome.voucherRef} (KES ${amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}) recorded successfully!`);
    } else {
      const newDeduction = {
        id: 'DED-' + Date.now(),
        propertyId: propSel.value,
        propertyName: propName,
        landlordId: landlordIdInput ? landlordIdInput.value : '',
        landlordName: landlordNameInput.value || 'Principal Landlord',
        entryType: 'Deduction',
        category: categorySel.value,
        amount: amount,
        periodMonth: pMonth,
        periodYear: pYear,
        date: pDate,
        voucherRef: voucherInput.value.trim() || `VCH-${pYear}-${Math.floor(1000 + Math.random() * 9000)}`,
        payee: payeeInput.value.trim() || 'Third-Party Contractor',
        notes: notes,
        status: 'Approved'
      };

      AppState.landlordDeductions = AppState.landlordDeductions || [];
      AppState.landlordDeductions.unshift(newDeduction);
      saveStoredDeductions(AppState.landlordDeductions);

      showToast(`Deduction ${newDeduction.voucherRef} (KES ${amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}) recorded successfully!`);
    }

    amountInput.value = '';
    payeeInput.value = '';
    notesInput.value = '';
    generateNewVoucherRef(entryType === 'Other Income');

    renderLandlordDeductionsTable();
  }

  function renderLandlordDeductionsTable() {
    const tbody = document.getElementById('table-landlord-deductions-body');
    if (!tbody) return;

    const filterProp = document.getElementById('filter-deduction-property')?.value || 'ALL';
    const filterType = document.getElementById('filter-deduction-type')?.value || 'ALL';
    const filterCat = document.getElementById('filter-deduction-category')?.value || 'ALL';
    const search = document.getElementById('filter-deduction-search')?.value.toLowerCase().trim() || '';

    const deds = (AppState.landlordDeductions || []).map(d => ({ ...d, entryType: 'Deduction' }));
    const incomes = (AppState.landlordOtherIncome || []).map(i => ({ ...i, entryType: 'Other Income' }));

    let combined = [...deds, ...incomes];

    // Calculate Summary Stats from all records
    const totalDeductions = deds.reduce((sum, d) => sum + Number(d.amount || 0), 0);
    const totalOtherIncome = incomes.reduce((sum, i) => sum + Number(i.amount || 0), 0);
    const netImpact = totalOtherIncome - totalDeductions;
    const mriTotal = deds.filter(d => d.category && d.category.includes('MRI')).reduce((sum, d) => sum + Number(d.amount || 0), 0);
    const wagesTotal = deds.filter(d => d.category && d.category.includes('Wages')).reduce((sum, d) => sum + Number(d.amount || 0), 0);
    const repairsTotal = deds.filter(d => d.category && (d.category.includes('Repairs') || d.category.includes('Maintenance'))).reduce((sum, d) => sum + Number(d.amount || 0), 0);

    const elTotal = document.getElementById('stat-deductions-total');
    const elIncomeTotal = document.getElementById('stat-other-income-total');
    const elNet = document.getElementById('stat-deductions-net');
    const elMri = document.getElementById('stat-deductions-mri');
    const elWages = document.getElementById('stat-deductions-wages');
    const elRepairs = document.getElementById('stat-deductions-repairs');

    if (elTotal) elTotal.textContent = `KES ${totalDeductions.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
    if (elIncomeTotal) elIncomeTotal.textContent = `KES ${totalOtherIncome.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
    if (elNet) elNet.textContent = `KES ${netImpact.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
    if (elMri) elMri.textContent = `KES ${mriTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
    if (elWages) elWages.textContent = `KES ${wagesTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
    if (elRepairs) elRepairs.textContent = `KES ${repairsTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;

    // Apply Filters
    if (filterType !== 'ALL') {
      combined = combined.filter(item => item.entryType === filterType);
    }
    if (filterProp !== 'ALL') {
      combined = combined.filter(d => d.propertyId === filterProp);
    }
    if (filterCat !== 'ALL') {
      combined = combined.filter(d => d.category === filterCat);
    }
    if (search) {
      combined = combined.filter(d =>
        (d.voucherRef && d.voucherRef.toLowerCase().includes(search)) ||
        (d.propertyName && d.propertyName.toLowerCase().includes(search)) ||
        (d.landlordName && d.landlordName.toLowerCase().includes(search)) ||
        (d.category && d.category.toLowerCase().includes(search)) ||
        (d.payee && d.payee.toLowerCase().includes(search)) ||
        (d.notes && d.notes.toLowerCase().includes(search))
      );
    }

    // Sort by date descending
    combined.sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));

    if (combined.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="11" style="text-align: center; padding: 32px; color: var(--text-muted); font-style: italic;">
            No landlord deductions or other income records found matching current filters.
          </td>
        </tr>
      `;
      return;
    }

    const monthNames = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    tbody.innerHTML = combined.map((item, idx) => {
      const isIncome = (item.entryType === 'Other Income');
      
      let badgeClass = 'badge-priority-low';
      if (isIncome) {
        badgeClass = 'badge-status-completed';
      } else if (item.category && item.category.includes('MRI')) {
        badgeClass = 'badge-priority-medium';
      } else if (item.category && item.category.includes('Wages')) {
        badgeClass = 'badge-priority-medium';
      } else if (item.category && (item.category.includes('Repairs') || item.category.includes('Maintenance'))) {
        badgeClass = 'badge-priority-emergency';
      }

      const periodLabel = `${monthNames[item.periodMonth] || ''} ${item.periodYear || ''}`;
      const typeBadge = isIncome
        ? `<span class="badge-status badge-status-completed" style="font-weight: 800; font-size: 0.72rem;">+ Income</span>`
        : `<span class="badge-status badge-priority-emergency" style="font-weight: 800; font-size: 0.72rem; color: #F87171;">- Expense</span>`;

      const amtColor = isIncome ? 'var(--accent-secondary)' : '#F87171';
      const amtSign = isIncome ? '+' : '-';

      return `
        <tr>
          <td style="text-align: center; width: 38px;">${idx + 1}</td>
          <td><span style="font-family: 'JetBrains Mono', monospace; font-weight: 700; color: var(--accent-primary); font-size: 0.82rem;">${item.voucherRef || 'N/A'}</span></td>
          <td style="text-align: center; white-space: nowrap; font-size: 0.8rem;">${item.date} <br><small style="color: var(--text-muted);">(${periodLabel})</small></td>
          <td style="font-weight: 600; color: var(--text-primary); font-size: 0.85rem;">${item.propertyName}</td>
          <td style="font-size: 0.82rem;">${item.landlordName}</td>
          <td style="text-align: center;">${typeBadge}</td>
          <td>
            <span class="badge-status ${badgeClass}" style="font-size: 0.75rem;">
              ${item.category}
            </span>
          </td>
          <td>
            <strong style="color: var(--text-primary); font-size: 0.83rem;">${item.payee || item.payer || 'N/A'}</strong>
            ${item.notes ? `<div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 2px;">${item.notes}</div>` : ''}
          </td>
          <td style="text-align: right; font-weight: 800; color: ${amtColor}; font-variant-numeric: tabular-nums; font-size: 0.9rem;">
            ${amtSign} KES ${Number(item.amount || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </td>
          <td style="text-align: center;">
            <span class="badge-status badge-status-completed" style="font-size: 0.72rem;">
              Approved
            </span>
          </td>
          <td style="text-align: center; white-space: nowrap;">
            <button type="button" class="btn-action-pill" onclick="deleteLandlordDeduction('${item.id}', '${item.entryType}')" title="Delete this entry" style="color: #F87171; border-color: rgba(248, 113, 113, 0.3); padding: 4px 8px; font-size: 0.74rem;">
              🗑️ Delete
            </button>
          </td>
        </tr>
      `;
    }).join('');
  }

  function deleteLandlordDeduction(id, entryType) {
    const isIncome = (entryType === 'Other Income' || (id && id.startsWith('INC-')));
    const promptMsg = isIncome
      ? 'Are you sure you want to remove this Other Income entry?'
      : 'Are you sure you want to remove this deduction voucher?';

    if (!confirm(promptMsg)) return;

    if (isIncome) {
      AppState.landlordOtherIncome = (AppState.landlordOtherIncome || []).filter(i => i.id !== id);
      saveStoredOtherIncome(AppState.landlordOtherIncome);
      showToast('Other income record removed successfully.');
    } else {
      AppState.landlordDeductions = (AppState.landlordDeductions || []).filter(d => d.id !== id);
      saveStoredDeductions(AppState.landlordDeductions);
      showToast('Deduction voucher deleted successfully.');
    }

    renderLandlordDeductionsTable();
  }

  // Portfolio & Mandates Table
  function renderLandlordPortfolioTable() {
    const tbody = document.getElementById('table-landlord-portfolio-body');
    if (!tbody) return;

    const mandates = AppState.mandates || [];
    const badge = document.getElementById('portfolio-count-badge');
    if (badge) badge.textContent = `${mandates.length} Active Mandates`;

    tbody.innerHTML = mandates.map((m) => {
      const landlord = (AppState.landlords || []).find(l => l.name === m.landlordName) || (AppState.landlords || [])[0] || { name: m.landlordName, landlordCode: 'L001', kraPin: 'P051189201A', entityType: 'Corporate' };
      const property = (AppState.properties || []).find(p => p.name === m.propertyName) || { name: m.propertyName, lr: 'RUNDA VIEW' };
      const unitsCount = (AppState.units || []).filter(u => u.propertyName === m.propertyName || u.propertyId === property.id).length;

      const remitText = landlord.remitMethod === 'BANK'
        ? `🏦 ${landlord.bank || 'Co-op Bank'} (${landlord.accNo || '011290000000'})`
        : `📱 M-Pesa B2C (${landlord.phone || '0722000000'})`;

      const commText = m.commissionType === 'FIXED'
        ? `<strong>KES ${Number(m.feeFixed || 0).toLocaleString()}</strong> <small style="display:block; color:var(--text-muted); font-size:0.72rem;">Fixed / Mo</small>`
        : `<strong>${m.feePct || 8}%</strong> <small style="display:block; color:var(--text-muted); font-size:0.72rem;">Gross Rent</small>`;

      return `
        <tr>
          <td>
            <div style="display: flex; align-items: center; gap: 6px;">
              <strong style="color: var(--text-primary);">${m.landlordName}</strong>
              <span class="badge-status" style="font-weight: 800; font-size: 0.72rem; background: var(--accent-primary); color: #FFFFFF; padding: 1px 6px;">${landlord.landlordCode || landlord.id || 'LL'}</span>
            </div>
            <div style="font-size:0.75rem; color:var(--text-muted); margin-top: 2px;">${landlord.entityType || 'Individual'} • ${landlord.kraPin || 'N/A'}</div>
          </td>
          <td>
            <strong style="color: var(--text-primary);">${m.propertyName}</strong>
            <div style="font-size:0.75rem; color:var(--text-muted); margin-top: 2px;">${property.lr || 'L.R NAIROBI'}</div>
          </td>
          <td style="text-align: center;"><span class="badge-status" style="font-size:0.75rem;">${unitsCount || 10} Units</span></td>
          <td>${commText}</td>
          <td style="text-align: center;">${m.vat ? '<span class="badge-status badge-status-completed">✓ 16% VAT</span>' : '<span style="color: var(--text-muted);">Exempt</span>'}</td>
          <td style="text-align: center;">${m.mri ? '<span class="badge-status badge-priority-medium">✓ 7.5% MRI</span>' : '<span style="color: var(--text-muted);">Exempt</span>'}</td>
          <td style="font-size:0.8rem;">${m.manager || 'Dean Enterprise'}</td>
          <td style="font-size:0.78rem;">${remitText}</td>
          <td style="text-align: center;">
            <button type="button" class="btn-action-pill" onclick="prepareQuickStatement('${landlord.id}', '${property.id || ''}')" style="color: var(--accent-primary);">
              ⚡ Statement
            </button>
          </td>
        </tr>
      `;
    }).join('');
  }

  function prepareQuickStatement(landlordId, propertyId) {
    switchLandlordTab('statements');
    if (propertyId) {
      const propSel = document.getElementById('landlord-stmt-property-rent');
      if (propSel) {
        propSel.value = propertyId;
        if (typeof window.generateLandlordRentStatement === 'function') {
          window.generateLandlordRentStatement();
        }
      }
    }
    showToast('Loaded property into Statements Engine.');
  }

  // Remittance & Payout Queue Table
  function renderLandlordPayoutQueueTable() {
    const tbody = document.getElementById('table-landlord-payouts-body');
    if (!tbody) return;

    const monthNames = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const stmts = AppState.landlordStatements || [];

    const totalGross = stmts.reduce((sum, s) => sum + (s.grossRent || 0), 0);
    const totalCommVat = stmts.reduce((sum, s) => sum + (s.commAmount || 0) + (s.vatAmount || 0), 0);
    const totalMri = stmts.reduce((sum, s) => sum + (s.mriTax || 0), 0);
    const totalNetDisbursed = stmts.filter(s => s.status === 'Paid').reduce((sum, s) => sum + (s.netPayable || 0), 0);

    const grossEl = document.getElementById('landlord-stat-gross');
    const commEl = document.getElementById('landlord-stat-commission');
    const mriEl = document.getElementById('landlord-stat-mri');
    const netEl = document.getElementById('landlord-stat-net');

    if (grossEl) grossEl.textContent = `KES ${totalGross.toLocaleString('en-KE', { minimumFractionDigits: 2 })}`;
    if (commEl) commEl.textContent = `KES ${totalCommVat.toLocaleString('en-KE', { minimumFractionDigits: 2 })}`;
    if (mriEl) mriEl.textContent = `KES ${totalMri.toLocaleString('en-KE', { minimumFractionDigits: 2 })}`;
    if (netEl) netEl.textContent = `KES ${totalNetDisbursed.toLocaleString('en-KE', { minimumFractionDigits: 2 })}`;

    tbody.innerHTML = stmts.map(s => `
      <tr>
        <td style="font-weight: 700; color: var(--accent-primary); font-family: 'JetBrains Mono', monospace;">${s.id}</td>
        <td style="text-align: center;">${monthNames[s.periodMonth]} ${s.periodYear}</td>
        <td style="font-weight: 600; color: var(--text-primary);">${s.landlordName}</td>
        <td>${s.propertyName}</td>
        <td style="font-size:0.8rem; color: var(--text-muted);">${s.remitDetails || 'Co-op Bank Direct EFT'}</td>
        <td style="text-align: right;"><strong style="color: var(--accent-secondary); font-size: 0.95rem;">KES ${Number(s.netPayable || 0).toLocaleString()}</strong></td>
        <td style="text-align: center;">
          <span class="badge-status ${s.status === 'Paid' ? 'badge-status-completed' : 'badge-priority-medium'}">
            ${s.status === 'Paid' ? 'Settled' : 'Pending Payout'}
          </span>
        </td>
        <td style="font-family: 'JetBrains Mono', monospace; font-size: 0.8rem;">
          ${s.payoutRef ? `<span style="color: var(--text-primary); font-weight:600;">${s.payoutRef}</span>` : '<span style="color: var(--text-muted);">—</span>'}
        </td>
        <td style="text-align: center;">
          ${s.status !== 'Paid'
            ? `<button type="button" class="btn-elevated-primary" style="padding: 4px 10px; font-size: 0.75rem;" onclick="openLandlordPayoutModal('${s.id}')">💳 Mark Paid</button>`
            : `<span style="font-size: 0.78rem; color: var(--text-muted);">✓ ${s.payoutDate || 'Settled'}</span>`}
        </td>
      </tr>
    `).join('');
  }

  function openLandlordPayoutModal(statementId) {
    const statement = (AppState.landlordStatements || []).find(s => s.id === statementId);
    if (!statement) return;

    const modal = document.getElementById('modal-landlord-payout');
    if (!modal) return;
    modal.style.display = 'flex';
    modal.classList.add('active');

    const nameEl = document.getElementById('payout-modal-landlord-name');
    const remitEl = document.getElementById('payout-modal-remit-info');
    const amtEl = document.getElementById('payout-modal-amount-display');
    const idInput = document.getElementById('payout-modal-statement-id');
    const amtInput = document.getElementById('payout-modal-amount');
    const dateInput = document.getElementById('payout-date-input');
    const refInput = document.getElementById('payout-ref-input');

    if (nameEl) nameEl.textContent = statement.landlordName;
    if (remitEl) remitEl.textContent = statement.remitDetails || 'Direct Bank Settlement';
    if (amtEl) amtEl.textContent = `KES ${Number(statement.netPayable || 0).toLocaleString('en-KE', { minimumFractionDigits: 2 })}`;
    if (idInput) idInput.value = statement.id;
    if (amtInput) amtInput.value = statement.netPayable;
    if (dateInput) dateInput.value = new Date().toISOString().split('T')[0];
    if (refInput) refInput.value = `EFT-KCB-${Math.floor(100000 + Math.random() * 900000)}`;
  }

  function closeLandlordPayoutModal() {
    const modal = document.getElementById('modal-landlord-payout');
    if (modal) {
      modal.style.display = 'none';
      modal.classList.remove('active');
    }
  }

  function handleLandlordPayoutSubmit(e) {
    if (e) e.preventDefault();
    const stmtId = document.getElementById('payout-modal-statement-id').value;
    const ref = document.getElementById('payout-ref-input').value.trim();
    const pDate = document.getElementById('payout-date-input').value;

    const stmt = (AppState.landlordStatements || []).find(s => s.id === stmtId);
    if (stmt) {
      stmt.status = 'Paid';
      stmt.payoutRef = ref;
      stmt.payoutDate = pDate;
      closeLandlordPayoutModal();
      renderLandlordPayoutQueueTable();
      showToast(`Payout ${ref} successfully recorded for ${stmt.landlordName}.`);
    }
  }

  function showToast(message) {
    const tray = document.getElementById('toast-tray');
    if (!tray) {
      alert(message);
      return;
    }
    const toast = document.createElement('div');
    toast.className = 'toast-bubble';
    toast.innerHTML = `<span style="color: var(--accent-secondary); font-weight: 700;">✓</span><span>${message}</span>`;
    tray.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }

  // Global Exports
  window.switchLandlordTab = switchLandlordTab;
  window.prepareQuickStatement = prepareQuickStatement;
  window.recordLandlordDeduction = recordLandlordDeduction;
  window.onDeductionTypeChange = onDeductionTypeChange;
  window.renderLandlordDeductionsTable = renderLandlordDeductionsTable;
  window.deleteLandlordDeduction = deleteLandlordDeduction;
  window.renderLandlordPortfolioTable = renderLandlordPortfolioTable;
  window.renderLandlordPayoutQueueTable = renderLandlordPayoutQueueTable;
  window.openLandlordPayoutModal = openLandlordPayoutModal;
  window.closeLandlordPayoutModal = closeLandlordPayoutModal;
  window.handleLandlordPayoutSubmit = handleLandlordPayoutSubmit;
  window.showToast = showToast;

  document.addEventListener('DOMContentLoaded', initLandlordsHub);
})();
