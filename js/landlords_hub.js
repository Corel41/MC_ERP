/**
 * MC ERP - Landlords Hub & Deductions Engine (MPA)
 * Handles Landlord Deductions, Property Expenses, Portfolios, and Remittance Payouts
 */

(function () {
  'use strict';

  // Seed default deductions if not already in localStorage
  const DEFAULT_DEDUCTIONS = [
    {
      id: 'DED-001',
      propertyId: '00000002-0000-4000-8000-000000000001',
      propertyName: 'Sunrise Park Estate',
      landlordId: '00000001-0000-4000-8000-000000000001',
      landlordName: 'Sunrise Park Holdings Ltd',
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

  function getStoredDeductions() {
    try {
      const raw = localStorage.getItem('mc_erp_landlord_deductions');
      if (raw) {
        return JSON.parse(raw);
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

  function initLandlordsHub() {
    // Make sure AppState exists
    window.AppState = window.AppState || {};
    if (!AppState.properties && window.SEED_PROPERTIES) AppState.properties = window.SEED_PROPERTIES;
    if (!AppState.landlords && window.SEED_LANDLORDS) AppState.landlords = window.SEED_LANDLORDS;
    if (!AppState.mandates && window.SEED_MANDATES) AppState.mandates = window.SEED_MANDATES;
    if (!AppState.units && window.SEED_UNITS) AppState.units = window.SEED_UNITS;
    if (!AppState.landlordStatements && window.SEED_LANDLORD_STATEMENTS) AppState.landlordStatements = window.SEED_LANDLORD_STATEMENTS;

    AppState.landlordDeductions = getStoredDeductions();

    setupTabNavigation();
    populatePropertyDropdowns();
    populateDateDefaults();
    generateNewVoucherRef();

    renderLandlordDeductionsTable();
    renderLandlordPortfolioTable();
    renderLandlordPayoutQueueTable();
  }

  function setupTabNavigation() {
    const tabBtns = document.querySelectorAll('.landlord-hub-tab-btn');
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const target = btn.getAttribute('data-tab-target');
        const panels = document.querySelectorAll('.landlord-hub-panel');
        panels.forEach(p => {
          if (p.id === `panel-${target}`) {
            p.classList.add('active');
            p.style.display = 'block';
          } else {
            p.classList.remove('active');
            p.style.display = 'none';
          }
        });
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

    // Look up mandate or landlord
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
    const curMonth = today.getMonth() + 1; // 1-12

    const monthSel = document.getElementById('deduction-month');
    const yearSel = document.getElementById('deduction-year');
    const dateInput = document.getElementById('deduction-date');

    if (monthSel) monthSel.value = String(curMonth);
    if (yearSel) yearSel.value = String(curYear);
    if (dateInput) dateInput.value = today.toISOString().split('T')[0];
  }

  function generateNewVoucherRef() {
    const voucherInput = document.getElementById('deduction-voucher-ref');
    if (voucherInput) {
      const rnd = Math.floor(1000 + Math.random() * 9000);
      voucherInput.value = `VCH-${new Date().getFullYear()}-${rnd}`;
    }
  }

  function recordLandlordDeduction(e) {
    if (e) e.preventDefault();

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

    if (!propSel.value) {
      alert('Please select a managed property.');
      propSel.focus();
      return;
    }

    const amount = parseFloat(amountInput.value);
    if (!amount || amount <= 0) {
      alert('Please enter a valid deduction/expense amount greater than zero.');
      amountInput.focus();
      return;
    }

    const prop = (AppState.properties || []).find(p => p.id === propSel.value);
    const newDeduction = {
      id: 'DED-' + Date.now(),
      propertyId: propSel.value,
      propertyName: prop ? prop.name : 'Estate Property',
      landlordId: landlordIdInput ? landlordIdInput.value : '',
      landlordName: landlordNameInput.value || 'Principal Landlord',
      category: categorySel.value,
      amount: amount,
      periodMonth: parseInt(monthSel.value) || 1,
      periodYear: parseInt(yearSel.value) || 2026,
      date: dateInput.value || new Date().toISOString().split('T')[0],
      voucherRef: voucherInput.value.trim() || `VCH-${Math.floor(1000 + Math.random() * 9000)}`,
      payee: payeeInput.value.trim() || 'Third-Party Contractor',
      notes: notesInput.value.trim() || '',
      status: 'Approved'
    };

    AppState.landlordDeductions.unshift(newDeduction);
    saveStoredDeductions(AppState.landlordDeductions);

    // Reset inputs
    amountInput.value = '';
    payeeInput.value = '';
    notesInput.value = '';
    generateNewVoucherRef();

    renderLandlordDeductionsTable();
    showToast(`Deduction ${newDeduction.voucherRef} (KES ${amount.toLocaleString('en-US', {minimumFractionDigits: 2})}) recorded successfully!`);
  }

  function renderLandlordDeductionsTable() {
    const tbody = document.getElementById('table-landlord-deductions-body');
    if (!tbody) return;

    const filterProp = document.getElementById('filter-deduction-property')?.value || 'ALL';
    const filterCat = document.getElementById('filter-deduction-category')?.value || 'ALL';
    const search = document.getElementById('filter-deduction-search')?.value.toLowerCase().trim() || '';

    let list = [...(AppState.landlordDeductions || [])];

    if (filterProp !== 'ALL') {
      list = list.filter(d => d.propertyId === filterProp);
    }
    if (filterCat !== 'ALL') {
      list = list.filter(d => d.category === filterCat);
    }
    if (search) {
      list = list.filter(d =>
        (d.voucherRef && d.voucherRef.toLowerCase().includes(search)) ||
        (d.propertyName && d.propertyName.toLowerCase().includes(search)) ||
        (d.landlordName && d.landlordName.toLowerCase().includes(search)) ||
        (d.category && d.category.toLowerCase().includes(search)) ||
        (d.payee && d.payee.toLowerCase().includes(search)) ||
        (d.notes && d.notes.toLowerCase().includes(search))
      );
    }

    // Update Stat Cards
    const totalAll = list.reduce((sum, d) => sum + Number(d.amount || 0), 0);
    const mriTotal = list.filter(d => d.category.includes('MRI')).reduce((sum, d) => sum + Number(d.amount || 0), 0);
    const wagesTotal = list.filter(d => d.category.includes('Wages')).reduce((sum, d) => sum + Number(d.amount || 0), 0);
    const repairsTotal = list.filter(d => d.category.includes('Repairs') || d.category.includes('Maintenance')).reduce((sum, d) => sum + Number(d.amount || 0), 0);

    const elTotal = document.getElementById('stat-deductions-total');
    const elMri = document.getElementById('stat-deductions-mri');
    const elWages = document.getElementById('stat-deductions-wages');
    const elRepairs = document.getElementById('stat-deductions-repairs');

    if (elTotal) elTotal.textContent = `KES ${totalAll.toLocaleString('en-US', {minimumFractionDigits: 2})}`;
    if (elMri) elMri.textContent = `KES ${mriTotal.toLocaleString('en-US', {minimumFractionDigits: 2})}`;
    if (elWages) elWages.textContent = `KES ${wagesTotal.toLocaleString('en-US', {minimumFractionDigits: 2})}`;
    if (elRepairs) elRepairs.textContent = `KES ${repairsTotal.toLocaleString('en-US', {minimumFractionDigits: 2})}`;

    if (list.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="10" style="text-align: center; padding: 28px; color: #6B7280; font-style: italic;">
            No landlord deductions or property expenses found matching current filters.
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = list.map((item, idx) => {
      let catBadgeBg = '#EFF6FF';
      let catBadgeColor = '#1D4ED8';

      if (item.category.includes('MRI')) {
        catBadgeBg = '#FEF3C7';
        catBadgeColor = '#B45309';
      } else if (item.category.includes('Wages')) {
        catBadgeBg = '#ECFDF5';
        catBadgeColor = '#047857';
      } else if (item.category.includes('Repairs')) {
        catBadgeBg = '#FEE2E2';
        catBadgeColor = '#B91C1C';
      }

      const monthNames = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const periodLabel = `${monthNames[item.periodMonth] || ''} ${item.periodYear || ''}`;

      return `
        <tr class="pm-table-row">
          <td style="padding: 6px 10px; text-align: center; border-right: 1px solid #E5E7EB;">${idx + 1}</td>
          <td style="padding: 6px 12px; font-weight: 700; font-family: monospace; color: #008080; border-right: 1px solid #E5E7EB;">${item.voucherRef}</td>
          <td style="padding: 6px 10px; text-align: center; border-right: 1px solid #E5E7EB; white-space: nowrap;">${item.date} <br><small style="color:#64748B;">(${periodLabel})</small></td>
          <td style="padding: 6px 12px; font-weight: 600; border-right: 1px solid #E5E7EB;">${item.propertyName}</td>
          <td style="padding: 6px 12px; border-right: 1px solid #E5E7EB; color: #334155;">${item.landlordName}</td>
          <td style="padding: 6px 12px; border-right: 1px solid #E5E7EB;">
            <span style="background: ${catBadgeBg}; color: ${catBadgeColor}; padding: 3px 8px; border-radius: 4px; font-weight: 700; font-size: 11px;">
              ${item.category}
            </span>
          </td>
          <td style="padding: 6px 12px; border-right: 1px solid #E5E7EB;">
            <strong>${item.payee}</strong>
            ${item.notes ? `<div style="font-size: 11px; color: #64748B; margin-top: 2px;">${item.notes}</div>` : ''}
          </td>
          <td style="padding: 6px 12px; text-align: right; font-weight: 800; color: #111827; border-right: 1px solid #E5E7EB; font-variant-numeric: tabular-nums;">
            ${Number(item.amount || 0).toLocaleString('en-US', {minimumFractionDigits: 2})}
          </td>
          <td style="padding: 6px 10px; text-align: center; border-right: 1px solid #E5E7EB;">
            <span style="background: #ECFDF5; color: #047857; padding: 2px 8px; border-radius: 2px; font-weight: 700; font-size: 10.5px;">
              ● Approved
            </span>
          </td>
          <td style="padding: 4px 8px; text-align: center; white-space: nowrap;">
            <button type="button" class="btn-action-pill" onclick="deleteLandlordDeduction('${item.id}')" style="padding: 3px 8px; font-size: 11px; font-weight: 700; color: #DC2626; background: #FEF2F2; border: 1px solid #FECACA; border-radius: 3px; cursor: pointer;" title="Delete this deduction">
              🗑️ Delete
            </button>
          </td>
        </tr>
      `;
    }).join('');
  }

  function deleteLandlordDeduction(id) {
    if (!confirm('Are you sure you want to remove this deduction voucher?')) return;
    AppState.landlordDeductions = AppState.landlordDeductions.filter(d => d.id !== id);
    saveStoredDeductions(AppState.landlordDeductions);
    renderLandlordDeductionsTable();
    showToast('Deduction voucher deleted successfully.');
  }

  // 2. Portfolios & Mandates Table
  function renderLandlordPortfolioTable() {
    const tbody = document.getElementById('table-landlord-portfolio-body');
    if (!tbody) return;

    const mandates = AppState.mandates || [];
    const badge = document.getElementById('portfolio-count-badge');
    if (badge) badge.textContent = `${mandates.length} Active Mandates`;

    tbody.innerHTML = mandates.map((m, idx) => {
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
        <tr class="pm-table-row">
          <td style="padding: 8px 12px; border-right: 1px solid #E5E7EB;">
            <div style="display: flex; align-items: center; gap: 6px;">
              <strong>${m.landlordName}</strong>
              <span class="badge-status" style="font-weight: 800; font-size: 0.72rem; background: var(--accent-primary); color: #FFFFFF; padding: 1px 6px; border-radius: 3px;">${landlord.landlordCode || landlord.id || 'LL'}</span>
            </div>
            <div style="font-size:0.75rem; color:var(--text-muted); margin-top: 2px;">${landlord.entityType || 'Individual'} • ${landlord.kraPin || 'N/A'}</div>
          </td>
          <td style="padding: 8px 12px; border-right: 1px solid #E5E7EB;">
            <strong>${m.propertyName}</strong>
            <div style="font-size:0.75rem; color:var(--text-muted); margin-top: 2px;">${property.lr || 'L.R NAIROBI'}</div>
          </td>
          <td style="padding: 8px 10px; text-align: center; border-right: 1px solid #E5E7EB;"><span class="badge-status" style="font-size:0.75rem;">${unitsCount || 10} Units</span></td>
          <td style="padding: 8px 12px; border-right: 1px solid #E5E7EB;">${commText}</td>
          <td style="padding: 8px 10px; text-align: center; border-right: 1px solid #E5E7EB;">${m.vat ? '<span style="color: #047857; font-weight: 700;">✓ 16% VAT</span>' : 'Exempt'}</td>
          <td style="padding: 8px 10px; text-align: center; border-right: 1px solid #E5E7EB;">${m.mri ? '<span style="color: #B45309; font-weight: 700;">✓ 7.5% MRI</span>' : 'Exempt'}</td>
          <td style="padding: 8px 12px; border-right: 1px solid #E5E7EB; font-size:0.8rem;">${m.manager || 'Dean Enterprise'}</td>
          <td style="padding: 8px 12px; border-right: 1px solid #E5E7EB; font-size:0.78rem;">${remitText}</td>
          <td style="padding: 8px 10px; text-align: center;">
            <a href="landlord-statements.html" class="btn-action-pill" style="padding: 4px 10px; font-size: 11px; text-decoration: none; display: inline-block;">📑 View Statements</a>
          </td>
        </tr>
      `;
    }).join('');
  }

  // 3. Remittance & Payout Queue
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
      <tr class="pm-table-row">
        <td style="padding: 8px 12px; font-weight: 700; color: #008080; border-right: 1px solid #E5E7EB;">${s.id}</td>
        <td style="padding: 8px 10px; text-align: center; border-right: 1px solid #E5E7EB;">${monthNames[s.periodMonth]} ${s.periodYear}</td>
        <td style="padding: 8px 12px; font-weight: 600; border-right: 1px solid #E5E7EB;">${s.landlordName}</td>
        <td style="padding: 8px 12px; border-right: 1px solid #E5E7EB;">${s.propertyName}</td>
        <td style="padding: 8px 12px; border-right: 1px solid #E5E7EB; font-size:0.8rem; color: #475569;">${s.remitDetails || 'Co-op Bank Direct EFT'}</td>
        <td style="padding: 8px 12px; text-align: right; border-right: 1px solid #E5E7EB;"><strong style="color: #047857; font-size: 0.95rem;">KES ${Number(s.netPayable || 0).toLocaleString()}</strong></td>
        <td style="padding: 8px 10px; text-align: center; border-right: 1px solid #E5E7EB;">
          <span class="badge-status" style="background: ${s.status === 'Paid' ? '#ECFDF5' : '#FEF3C7'}; color: ${s.status === 'Paid' ? '#047857' : '#B45309'}; padding: 2px 8px; border-radius: 3px; font-weight: 700; font-size: 11px;">
            ${s.status === 'Paid' ? 'Settled' : 'Pending Payout'}
          </span>
        </td>
        <td style="padding: 8px 12px; border-right: 1px solid #E5E7EB; font-family: 'JetBrains Mono', monospace; font-size: 0.8rem;">
          ${s.payoutRef ? `<span style="color:#0F172A; font-weight:600;">${s.payoutRef}</span>` : '—'}
        </td>
        <td style="padding: 6px 10px; text-align: center;">
          ${s.status !== 'Paid'
            ? `<button class="btn-action-pill" style="padding: 4px 10px; font-size: 11px; font-weight: 700; color: #FFFFFF; background: #008080; border: none; border-radius: 3px; cursor: pointer;" onclick="openLandlordPayoutModal('${s.id}')">💳 Mark Paid</button>`
            : `<span style="font-size:0.75rem; color:#64748B;">✓ ${s.payoutDate || 'Settled'}</span>`}
        </td>
      </tr>
    `).join('');
  }

  function openLandlordPayoutModal(statementId) {
    const statement = (AppState.landlordStatements || []).find(s => s.id === statementId);
    if (!statement) return;

    const modal = document.getElementById('modal-landlord-payout');
    if (!modal) return;
    modal.classList.add('active');

    document.getElementById('payout-modal-landlord-name').textContent = statement.landlordName;
    document.getElementById('payout-modal-remit-info').textContent = statement.remitDetails || 'Direct Bank Settlement';
    document.getElementById('payout-modal-amount-display').textContent = `KES ${Number(statement.netPayable || 0).toLocaleString('en-KE', { minimumFractionDigits: 2 })}`;
    document.getElementById('payout-modal-statement-id').value = statement.id;
    document.getElementById('payout-modal-amount').value = statement.netPayable;
    document.getElementById('payout-date-input').value = new Date().toISOString().split('T')[0];
    document.getElementById('payout-ref-input').value = `EFT-KCB-${Math.floor(100000 + Math.random() * 900000)}`;
  }

  function closeLandlordPayoutModal() {
    const modal = document.getElementById('modal-landlord-payout');
    if (modal) modal.classList.remove('active');
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
    toast.className = 'glass-toast toast-success';
    toast.style.cssText = 'background: #0F172A; color: #FFFFFF; padding: 10px 16px; border-radius: 6px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); font-size: 13px; font-weight: 600; margin-top: 8px; border-left: 4px solid #10B981; display: flex; align-items: center; gap: 8px;';
    toast.innerHTML = `<span>✓</span><span>${message}</span>`;
    tray.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }

  // Global Exports
  window.recordLandlordDeduction = recordLandlordDeduction;
  window.renderLandlordDeductionsTable = renderLandlordDeductionsTable;
  window.deleteLandlordDeduction = deleteLandlordDeduction;
  window.renderLandlordPortfolioTable = renderLandlordPortfolioTable;
  window.renderLandlordPayoutQueueTable = renderLandlordPayoutQueueTable;
  window.openLandlordPayoutModal = openLandlordPayoutModal;
  window.closeLandlordPayoutModal = closeLandlordPayoutModal;
  window.handleLandlordPayoutSubmit = handleLandlordPayoutSubmit;

  document.addEventListener('DOMContentLoaded', initLandlordsHub);
})();
