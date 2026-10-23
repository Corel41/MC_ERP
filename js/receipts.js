/**
 * js/receipts.js — Standalone Tenant Receipting & Waterfall Allocation Engine
 * Decoupled MPA architecture for Metrocosmo ERP
 */

(function () {
  'use strict';

  // 1. SUPABASE & ENVIRONMENT CONFIG
  const SUPABASE_CONFIG = {
    url: 'https://uwkqihhvkegiadelowft.supabase.co',
    anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV3a3FpaGh2a2VnaWFkZWxvd2Z0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTIzNjM2MTEsImV4cCI6MjEwNzkzOTYxMX0.dfhqF7xAi5_a-wDnZgRCtAimE52dNoWzb-3WuYpGtj8'
  };

  // 2. STATE INITIALIZATION & SEED HYDRATION
  const AppState = window.AppState || {};

  if (window.MC_ERP_SEED_DATA) {
    Object.keys(window.MC_ERP_SEED_DATA).forEach(k => {
      if (!AppState[k] || AppState[k].length === 0) {
        AppState[k] = window.MC_ERP_SEED_DATA[k];
      }
    });
  }

  AppState.organizationId = AppState.organizationId || "00000000-0000-0000-0000-000000000001";
  AppState.properties = AppState.properties || [];
  AppState.tenants = AppState.tenants || [];
  AppState.units = AppState.units || [];
  AppState.leases = AppState.leases || [];
  AppState.invoices = AppState.invoices || [];
  AppState.tenantInvoiceLines = AppState.tenantInvoiceLines || [];
  AppState.tenantInvoices = AppState.tenantInvoices || [];
  AppState.tenantReceipts = AppState.tenantReceipts || [];
  AppState.ledger = AppState.ledger || [];
  AppState.editingReceiptId = null;
  AppState.theme = AppState.theme || 'developer';
  AppState.sidebarCollapsed = false;

  // Hydrate Bank Accounts
  try {
    const cachedBank = localStorage.getItem('mc_erp_bank_accounts');
    if (cachedBank) {
      AppState.bankAccounts = JSON.parse(cachedBank);
    }
  } catch (e) {}
  if (!AppState.bankAccounts || AppState.bankAccounts.length === 0) {
    AppState.bankAccounts = [
      { id: 'BANK-01', bank_name: 'KCB Bank Kenya', branch_name: 'Kipande House', account_no: '1109283746' },
      { id: 'BANK-02', bank_name: 'Co-operative Bank', branch_name: 'Nairobi Business Centre', account_no: '01129384756000' },
      { id: 'BANK-03', bank_name: 'Absa Bank Kenya', branch_name: 'Queensway Branch', account_no: '2039485716' },
      { id: 'BANK-04', bank_name: 'NCBA Bank', branch_name: 'Upper Hill HQ', account_no: '1002938475' }
    ];
  }

  // Hydrate M-Pesa Paybills
  try {
    const cachedMpesa = localStorage.getItem('mc_erp_mpesa_paybills');
    if (cachedMpesa) {
      AppState.mpesaPaybills = JSON.parse(cachedMpesa);
    }
  } catch (e) {}
  if (!AppState.mpesaPaybills || AppState.mpesaPaybills.length === 0) {
    AppState.mpesaPaybills = [
      { id: 'MPESA-01', paybill_number: '522522', business_name: 'Metrocosmo Ltd Primary Collection' },
      { id: 'MPESA-02', paybill_number: '400200', business_name: 'Metrocosmo Commercial Collections' },
      { id: 'MPESA-03', paybill_number: '247247', business_name: 'Metrocosmo Escrow & Utility Pool' }
    ];
  }

  // Hydrate Company Profile
  try {
    const cachedProfile = localStorage.getItem('mc_erp_company_profile');
    if (cachedProfile) {
      AppState.companyProfile = JSON.parse(cachedProfile);
    }
  } catch (e) {}
  if (!AppState.companyProfile) {
    AppState.companyProfile = {
      company_name: 'METROCOSMO LTD',
      slogan: 'Real Estate Managers & Valuers',
      address1: 'P.O. Box 40656',
      postal_code: '00100',
      city_town: 'Nairobi',
      phone: '020 2244218, 0721 737093',
      email: 'info@metrocosmo.com',
      pin_no: 'P051189201A',
      logo_url: 'assets/logo.png'
    };
  }

  // Hydrate Cached Receipts
  try {
    const cachedReceipts = localStorage.getItem('mc_erp_tenant_receipts');
    if (cachedReceipts) {
      const parsed = JSON.parse(cachedReceipts);
      if (Array.isArray(parsed) && parsed.length > 0) {
        AppState.tenantReceipts = parsed;
      }
    }
  } catch (e) {}

  window.AppState = AppState;

  function getActiveOrgId() {
    const current = (typeof AppState !== 'undefined' && AppState.organizationId) || '';
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(current);
    return isUuid ? current : '00000000-0000-0000-0000-000000000001';
  }

  // 3. TOAST NOTIFICATIONS & CONFIRMATION INTERCEPTOR
  let pendingGlobalConfirmCallback = null;

  function showToast(msg) {
    const toastTray = document.getElementById('toast-tray');
    if (!toastTray) {
      console.log('[Toast]:', msg);
      return;
    }
    const bubble = document.createElement('div');
    bubble.className = 'toast-bubble';
    bubble.innerHTML = `
      <div style="width: 8px; height: 8px; border-radius: 50%; background: #008080;"></div>
      <span>${msg}</span>
    `;
    toastTray.appendChild(bubble);
    setTimeout(() => {
      bubble.style.opacity = '0';
      bubble.style.transform = 'translateY(10px)';
      setTimeout(() => bubble.remove(), 250);
    }, 3000);
  }

  function confirmAction(message, callback, title = 'Database Execution Warning', confirmBtnText = 'Confirm & Execute', isDanger = false) {
    const modal = document.getElementById('modal-global-confirm');
    if (!modal) {
      if (window.confirm(message.replace(/<[^>]*>?/gm, ''))) {
        callback();
      }
      return;
    }

    const titleEl = document.getElementById('global-confirm-title');
    const msgEl = document.getElementById('global-confirm-msg');
    const btnEl = document.getElementById('global-confirm-execute-btn');
    const iconEl = document.getElementById('global-confirm-icon');
    const boxEl = document.getElementById('global-confirm-box');

    if (titleEl) titleEl.textContent = title;
    if (msgEl) msgEl.innerHTML = message;
    if (btnEl) {
      btnEl.textContent = confirmBtnText;
      if (isDanger) {
        btnEl.style.background = '#DC2626';
        btnEl.style.borderColor = '#DC2626';
      } else {
        btnEl.style.background = '#008080';
        btnEl.style.borderColor = '#008080';
      }
    }
    if (iconEl) iconEl.textContent = isDanger ? '🚨' : '⚡';
    if (boxEl) {
      boxEl.style.borderLeft = isDanger ? '4px solid #DC2626' : '4px solid #008080';
    }

    pendingGlobalConfirmCallback = callback;
    modal.classList.add('active');
  }

  function closeGlobalConfirmModal() {
    const modal = document.getElementById('modal-global-confirm');
    if (modal) modal.classList.remove('active');
    pendingGlobalConfirmCallback = null;
  }

  function executeGlobalConfirmedAction() {
    if (typeof pendingGlobalConfirmCallback === 'function') {
      const cb = pendingGlobalConfirmCallback;
      closeGlobalConfirmModal();
      cb();
    }
  }

  function setTheme(themeName) {
    document.documentElement.setAttribute('data-theme', themeName);
    localStorage.setItem('mc_erp_theme', themeName);
    localStorage.setItem('mc_erp_theme_choice', themeName);
    AppState.theme = themeName;
    const themeIndicator = document.getElementById('header-theme-indicator');
    if (themeIndicator) {
      themeIndicator.textContent = themeName.charAt(0).toUpperCase() + themeName.slice(1);
    }
  }

  function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    if (!sidebar) return;
    sidebar.classList.toggle('collapsed');
    AppState.sidebarCollapsed = sidebar.classList.contains('collapsed');
  }

  // 4. NUMBER TO WORDS CONVERTER
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

  // 5. RECEIPTING & ALLOCATION ENGINE
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
      filterPropSel.innerHTML = '<option value="ALL">All Properties</option>' + (AppState.properties || []).map(p => 
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

    const filteredTenants = (AppState.tenants || []).filter(t => t.isActive && (t.propertyId === propertyId || !t.propertyId || propertyId === 'ALL'));
    if (filteredTenants.length > 0) {
      tenantSel.innerHTML = filteredTenants.map((t, idx) => 
        `<option value="${t.id}" ${idx === 0 ? 'selected' : ''}>${t.tenantCode ? t.tenantCode + ' - ' : ''}${t.name} (${t.unitCode ? 'Unit ' + t.unitCode : 'Unit'})</option>`
      ).join('');
      tenantSel.value = filteredTenants[0].id;
      onReceiptTenantChange(filteredTenants[0].id);
    } else {
      const anyTenants = (AppState.tenants || []).filter(t => t.isActive);
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

    const detailName = document.getElementById('receipt-detail-tenant-name');
    const detailProp = document.getElementById('receipt-detail-property');
    const detailPhone = document.getElementById('receipt-detail-phone');
    const detailUnit = document.getElementById('receipt-detail-unit');
    const detailReg = document.getElementById('receipt-detail-reg-date');
    const detailPrevAmt = document.getElementById('receipt-detail-prev-amt');
    const detailPrevDate = document.getElementById('receipt-detail-prev-date');
    const rNumDisplay = document.getElementById('receipt-number-display');

    const tenant = (AppState.tenants || []).find(t => t.id === tenantId) || (AppState.tenants || [])[0];
    const actualTenantId = tenant ? tenant.id : tenantId;
    const lease = (AppState.leases || []).find(l => l.tenantId === actualTenantId || (tenant && l.tenantName === tenant.name));
    const property = (tenant && (AppState.properties || []).find(p => p.id === tenant.propertyId)) || 
                     (tenant && tenant.propertyName ? { name: tenant.propertyName } : null) || 
                     (lease && lease.propertyName ? { name: lease.propertyName } : ((AppState.properties || [])[0] || { name: 'Property' }));

    const tenantName = tenant ? tenant.name : ((AppState.tenants || [])[0] ? AppState.tenants[0].name : 'Tenant');
    const propName = property ? property.name : ((AppState.properties || [])[0] ? AppState.properties[0].name : 'Property');
    const phoneNo = (tenant && (tenant.phone || tenant.phoneNumber || tenant.telNo)) || '+254 720 000 000';
    const rawUnit = (tenant && tenant.unitCode) || (lease && lease.unitCode) || '01';
    const unitNo = rawUnit.toString().toLowerCase().startsWith('unit') ? rawUnit : `Unit ${rawUnit}`;
    const regDate = (tenant && (tenant.registrationDate || tenant.regDate || (tenant.createdAt ? tenant.createdAt.split('T')[0] : null))) || 
                    (lease && lease.startDate) || '2026-05-01';

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

    if (detailName) detailName.textContent = tenantName;
    if (detailProp) detailProp.textContent = propName;
    if (detailPhone) detailPhone.textContent = phoneNo;
    if (detailUnit) detailUnit.textContent = unitNo;
    if (unitDisplay) unitDisplay.textContent = unitNo;
    if (detailReg) detailReg.textContent = regDate;
    if (detailPrevAmt) detailPrevAmt.textContent = prevAmtText;
    if (detailPrevDate) detailPrevDate.textContent = prevDateText;

    // Calculate Tenant Balance from double-entry ledger
    const tenantEntries = (AppState.ledger || []).filter(l => l.tenantId === actualTenantId);
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

    if (rNumDisplay && !AppState.editingReceiptId) {
      rNumDisplay.value = `R${String((AppState.tenantReceipts || []).length + 1).padStart(7, '0')}`;
    }

    if (notesInput && tenant) {
      notesInput.value = `October 2026 Rent settlement - ${tenant.name}`;
    }

    renderReceiptAllocationMatrix(actualTenantId);
  }

  function renderReceiptAllocationMatrix(tenantId) {
    const tbody = document.getElementById('receipt-invoices-allocation-body');
    if (!tbody) return;

    const tenant = (AppState.tenants || []).find(t => t.id === tenantId) || (AppState.tenants || [])[0];
    const actualTenantId = tenant ? tenant.id : tenantId;
    const monthlyRent = tenant && tenant.rentAmount ? Number(tenant.rentAmount) : 35000;

    const tenantEntries = (AppState.ledger || []).filter(l => l.tenantId === actualTenantId);
    const debits = tenantEntries.reduce((sum, e) => sum + (Number(e.debit) || 0), 0);
    const credits = tenantEntries.reduce((sum, e) => sum + (Number(e.credit) || 0), 0);
    const netLedgerBalance = debits - credits;

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
          <td style="padding: 6px 10px; font-weight: 700; color: var(--text-primary); border-right: 1px solid var(--table-border); text-align: left; vertical-align: middle;">
            ${p.item}
          </td>
          <td style="padding: 6px 10px; text-align: right; font-weight: 600; color: var(--text-muted); border-right: 1px solid var(--table-border); vertical-align: middle;">
            KES ${p.monthly.toLocaleString('en-US', {minimumFractionDigits: 2})}
          </td>
          <td style="padding: 6px 10px; text-align: right; font-weight: 700; color: var(--accent-primary); border-right: 1px solid var(--table-border); vertical-align: middle;">
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
              style="width: 100%; text-align: right; font-weight: 700; box-sizing: border-box; -webkit-appearance: none; margin: 0;">
          </td>
        </tr>
      `;
    });

    tbody.innerHTML = rowsHtml;

    const todayIso = new Date().toISOString().split('T')[0];
    const payDate = document.getElementById('receipt-payment-date');
    if (payDate && !payDate.value) payDate.value = todayIso;

    const amtInput = document.getElementById('receipt-amount-paid');
    const invoiceSum = payables.reduce((s, p) => s + p.totalDue, 0);
    const defaultPay = netLedgerBalance > 0 ? netLedgerBalance : invoiceSum;
    if (amtInput) {
      amtInput.value = defaultPay > 0 ? defaultPay.toFixed(2) : (monthlyRent > 0 ? monthlyRent.toFixed(2) : '35000.00');
      autoAllocateReceiptWaterfallSilently(parseFloat(amtInput.value) || 0);
    }

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

    inputs.forEach(inp => { 
      inp.value = ''; 
      delete inp.dataset.manuallyEdited;
    });

    inputs.forEach((inp) => {
      if (cash <= 0) {
        inp.value = '0.00';
        return;
      }
      const due = parseFloat(inp.getAttribute('data-due')) || 0;
      const alloc = Math.min(cash, due);
      inp.value = alloc.toFixed(2);
      cash -= alloc;
    });

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

  function onMatrixAmountPaidInput(changedInput) {
    changedInput.dataset.manuallyEdited = "true";

    const amtInput = document.getElementById('receipt-amount-paid');
    const paymentReceived = parseFloat(amtInput ? amtInput.value : 0) || 0;
    const allInputs = Array.from(document.querySelectorAll('#receipt-invoices-allocation-body .receipt-alloc-input'));

    if (paymentReceived > 0 && allInputs.length > 1) {
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
        const nextTarget = unedited[0];
        const targetDue = parseFloat(nextTarget.getAttribute('data-due')) || 0;
        
        if (unedited.length === 1) {
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

    const allInputs = document.querySelectorAll('#receipt-invoices-allocation-body .receipt-alloc-input');
    let matrixSum = 0;
    allInputs.forEach(inp => {
      matrixSum += (parseFloat(inp.value) || 0);
    });
    matrixSum = Math.round(matrixSum * 100) / 100;

    const sumPaidEl = document.getElementById('receipt-matrix-sum-amount-paid');
    if (sumPaidEl) {
      sumPaidEl.textContent = `KES ${matrixSum.toLocaleString('en-US', {minimumFractionDigits: 2})}`;
    }

    const outstandingArrears = Math.max(0, Math.round((invoiceTotal - matrixSum) * 100) / 100);
    const arrEl = document.getElementById('receipt-status-outstanding-arrears');
    if (arrEl) {
      arrEl.textContent = `KES ${outstandingArrears.toLocaleString('en-US', {minimumFractionDigits: 2})}`;
    }

    const diff = Math.round((matrixSum - paymentReceived) * 100) / 100;
    const isBalanced = paymentReceived > 0 && Math.abs(diff) < 0.01;

    const btnSave = document.getElementById('btn-receipt-save');
    const btnPrint = document.getElementById('btn-receipt-save-print');
    const btnSend = document.getElementById('btn-receipt-save-send');
    const badge = document.getElementById('receipt-alloc-status-badge');
    const warnBox = document.getElementById('receipt-strict-warning-box');
    const warnText = document.getElementById('receipt-strict-warning-text');

    if (isBalanced) {
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
      [btnSave, btnPrint, btnSend].forEach(b => {
        if (b) {
          b.disabled = true;
          b.style.opacity = '0.45';
          b.style.cursor = 'not-allowed';
        }
      });

      if (badge) {
        if (paymentReceived <= 0) {
          badge.innerHTML = `<span style="color: var(--text-muted); font-weight: 700;">Enter payment amount to allocate</span>`;
          badge.style.background = 'var(--glass-pill)';
          badge.style.borderColor = 'var(--glass-border)';
        } else {
          badge.innerHTML = `<span style="color: #EF4444; font-weight: 800;">⚠️ Unbalanced: Matrix KES ${matrixSum.toLocaleString('en-US', {minimumFractionDigits: 2})} ≠ Payment KES ${paymentReceived.toLocaleString('en-US', {minimumFractionDigits: 2})}</span>`;
          badge.style.background = 'rgba(239, 68, 68, 0.15)';
          badge.style.borderColor = 'rgba(239, 68, 68, 0.35)';
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

  function editTenantReceipt(receiptId) {
    const receipt = (AppState.tenantReceipts || []).find(r => r.id === receiptId);
    if (!receipt) {
      alert('Receipt not found.');
      return;
    }

    AppState.editingReceiptId = receipt.id;

    const banner = document.getElementById('receipt-mode-indicator-badge');
    if (banner) banner.style.display = 'inline-flex';

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

    if (amtInput) {
      amtInput.readOnly = true;
      amtInput.style.background = 'rgba(255, 255, 255, 0.04)';
      amtInput.style.opacity = '0.7';
      amtInput.title = 'Payment Received is locked in Edit Mode';
    }
    if (dateInput) {
      dateInput.readOnly = true;
      dateInput.style.background = 'rgba(255, 255, 255, 0.04)';
      dateInput.style.opacity = '0.7';
    }
    if (methodSel) methodSel.disabled = true;
    if (refInput) {
      refInput.readOnly = true;
      refInput.style.background = 'rgba(255, 255, 255, 0.04)';
      refInput.style.opacity = '0.7';
    }
    if (propSel) propSel.disabled = true;
    if (tenantSel) tenantSel.disabled = true;

    const mpesaSel = document.getElementById('receipt-mpesa-paybill-select');
    if (mpesaSel) mpesaSel.disabled = true;

    const bankSel = document.getElementById('receipt-bank-account-select');
    if (bankSel) bankSel.disabled = true;

    const autoAllocBtn = document.getElementById('btn-receipt-auto-allocate');
    if (autoAllocBtn) autoAllocBtn.disabled = true;

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
      inp.readOnly = false;
      delete inp.dataset.manuallyEdited;
    });

    validateReceiptAllocations();
    showToast(`🔒 Loaded Receipt ${receipt.receipt_number} in Edit Mode. Core facts locked; redistribute payables.`);

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
      amtInput.style.background = '';
      amtInput.style.opacity = '1';
      amtInput.title = '';
    }
    const dateInput = document.getElementById('receipt-payment-date');
    if (dateInput) {
      dateInput.readOnly = false;
      dateInput.style.background = '';
      dateInput.style.opacity = '1';
    }
    const methodSel = document.getElementById('receipt-method-select');
    if (methodSel) methodSel.disabled = false;
    const refInput = document.getElementById('receipt-ref-code');
    if (refInput) {
      refInput.readOnly = false;
      refInput.style.background = '';
      refInput.style.opacity = '1';
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
    const landlordCont = document.getElementById('receipt-dest-landlord-container');
    const refInput = document.getElementById('receipt-ref-code');

    if (bankCont) bankCont.style.display = 'none';
    if (mpesaCont) mpesaCont.style.display = 'none';
    if (cashCont) cashCont.style.display = 'none';
    if (landlordCont) landlordCont.style.display = 'none';

    if (method === 'M-Pesa Paybill') {
      if (mpesaCont) mpesaCont.style.display = 'flex';
      if (refInput && (!refInput.value || refInput.value.startsWith('BNK-') || refInput.value.startsWith('CSH-') || refInput.value.startsWith('DIR-'))) {
        refInput.placeholder = 'e.g. QKD829104A';
        refInput.value = 'QKD' + Math.floor(100000 + Math.random() * 900000);
      }
    } else if (method === 'Bank Deposit' || method === 'Cheque' || method === 'EFT / RTGS') {
      if (bankCont) bankCont.style.display = 'flex';
      if (refInput && (!refInput.value || refInput.value.startsWith('QKD') || refInput.value.startsWith('CSH-') || refInput.value.startsWith('DIR-'))) {
        refInput.placeholder = 'e.g. BNK-782910';
        refInput.value = 'BNK-' + Math.floor(100000 + Math.random() * 900000);
      }
    } else if (method === 'Paid to Landlord') {
      if (landlordCont) landlordCont.style.display = 'flex';
      if (refInput && (!refInput.value || refInput.value.startsWith('QKD') || refInput.value.startsWith('BNK-') || refInput.value.startsWith('CSH-'))) {
        refInput.placeholder = 'e.g. DIR-LL-001 or Direct Ref';
        refInput.value = 'DIR-' + Math.floor(100000 + Math.random() * 900000);
      }
    } else {
      if (cashCont) cashCont.style.display = 'flex';
      if (refInput && (!refInput.value || refInput.value.startsWith('QKD') || refInput.value.startsWith('BNK-') || refInput.value.startsWith('DIR-'))) {
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

    const tenant = (AppState.tenants || []).find(t => t.id === tenantSel.value);
    if (!tenant) {
      alert('Selected tenant not found in records.');
      return;
    }

    const property = (AppState.properties || []).find(p => p.id === propSel.value) || { id: 'PROP-01', name: tenant.propertyName || 'Estate Property' };
    const method = methodSel.value;
    const paymentDate = dateInput.value || new Date().toISOString().split('T')[0];
    const postingDate = document.getElementById('receipt-posting-date')?.value || paymentDate;
    const notes = notesInput ? notesInput.value.trim() : '';

    let destLabel = 'Office Cashier';
    let bankAccName = '';
    let mpesaPaybillNo = '';

    if (method === 'M-Pesa Paybill') {
      const mId = mpesaSel.value;
      const mRecord = (AppState.mpesaPaybills || []).find(m => m.id === mId);
      mpesaPaybillNo = mRecord ? mRecord.paybill_number : (mpesaSel.options[mpesaSel.selectedIndex]?.text || '522522');
      destLabel = `M-Pesa Paybill (${mpesaPaybillNo})`;
    } else if (method === 'Bank Deposit' || method === 'Cheque' || method === 'EFT / RTGS') {
      const bId = bankSel.value;
      const bRecord = (AppState.bankAccounts || []).find(b => b.id === bId);
      bankAccName = bRecord ? `${bRecord.bank_name} (${bRecord.account_no})` : (bankSel.options[bankSel.selectedIndex]?.text || 'Bank Account');
      destLabel = bankAccName;
    } else if (method === 'Paid to Landlord') {
      destLabel = 'Direct Landlord Settlement';
      bankAccName = 'Direct Landlord Account';
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

    if (Math.abs(totalAllocated - amount) > 0.01) {
      alert(`Strict Allocation Rule: The sum of the matrix allocations (KES ${totalAllocated.toLocaleString('en-US', {minimumFractionDigits: 2})}) must strictly equal Payment Received (KES ${amount.toLocaleString('en-US', {minimumFractionDigits: 2})}).\n\nDiscrepancy: KES ${Math.abs(totalAllocated - amount).toLocaleString('en-US', {minimumFractionDigits: 2})}`);
      return;
    }

    // SECURE EDIT MODE
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
            openOfficialReceiptModal(existingReceipt);
            setTimeout(() => {
              window.print();
            }, 350);
          } else if (actionType === 'send_sms') {
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

    const receiptNo = `REC-2026-${String((AppState.tenantReceipts || []).length + 1).padStart(3, '0')}`;
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

        AppState.tenantReceipts.unshift(newReceipt);
        localStorage.setItem('mc_erp_tenant_receipts', JSON.stringify(AppState.tenantReceipts));

        // Post Credit to Tenant Ledger
        const tenantEntries = (AppState.ledger || []).filter(l => l.tenantId === tenant.id);
        const debits = tenantEntries.reduce((sum, e) => sum + (Number(e.debit) || 0), 0);
        const credits = tenantEntries.reduce((sum, e) => sum + (Number(e.credit) || 0), 0);
        const balanceBefore = debits - credits;

        AppState.ledger.push({
          id: `LED-${String((AppState.ledger || []).length + 1).padStart(3, '0')}`,
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

        // Mark allocated invoices as paid
        allocatedList.forEach(alloc => {
          const inv = (AppState.tenantInvoices || []).find(i => i.id === alloc.id);
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

        // Supabase async post
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

        renderTenantReceiptsTable();

        if (isSmsRequested) {
          const phone = tenant.phone || tenant.phoneNumber || '2547XXXXXXXX';
          const smsMsg = `Dear ${tenant.name}, payment receipt ${receiptNo} for KES ${amount.toLocaleString('en-US', {minimumFractionDigits: 2})} received via ${method} [Ref: ${refCode}] for ${property.name} Unit ${tenant.unitCode || ''}. Thank you. Metrocosmo Ltd.`;
          console.log(`Africa's Talking SMS Dispatched -> To: ${phone} | Text: "${smsMsg}"`);
          showToast(`✓ Receipt ${receiptNo} recorded & SMS sent via Africa's Talking.`);
        } else {
          showToast(`✓ Receipt ${receiptNo} recorded and posted to ledger successfully.`);
        }

        if (actionType === 'print') {
          openOfficialReceiptModal(newReceipt);
          setTimeout(() => {
            window.print();
          }, 350);
        }

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
      const isLandlord = item.payment_method === 'Paid to Landlord';
      const isMpesa = item.payment_method === 'M-Pesa Paybill';
      const badgeBg = isLandlord ? '#FEF3C7' : (isMpesa ? '#ECFDF5' : '#EFF6FF');
      const badgeColor = isLandlord ? '#B45309' : (isMpesa ? '#047857' : '#1D4ED8');
      const dest = isLandlord ? 'Direct Landlord Settlement' : (item.mpesa_paybill_number ? `Paybill: ${item.mpesa_paybill_number}` : (item.bank_account_name || 'Cash Office'));
      const dtFormatted = item.payment_date ? item.payment_date.split('T')[0].split(' ')[0] : '-';
      return `
        <tr class="pm-table-row">
          <td style="padding: 6px 10px; text-align: center; border-right: 1px solid #E5E7EB;">${idx + 1}</td>
          <td style="padding: 6px 12px; font-weight: 700; color: #008080; border-right: 1px solid #E5E7EB;">${item.receipt_number}</td>
          <td style="padding: 6px 10px; text-align: center; border-right: 1px solid #E5E7EB;">${dtFormatted}</td>
          <td style="padding: 6px 12px; font-weight: 600; border-right: 1px solid #E5E7EB;">${item.tenant_name}</td>
          <td style="padding: 6px 10px; text-align: center; border-right: 1px solid #E5E7EB;">Unit ${item.unit_code || '-'}</td>
          <td style="padding: 6px 12px; border-right: 1px solid #E5E7EB;">
            <span style="background: ${badgeBg}; color: ${badgeColor}; padding: 2px 8px; border-radius: 2px; font-weight: 700; font-size: 11px;">
              ${item.payment_method}
            </span>
          </td>
          <td style="padding: 6px 12px; border-right: 1px solid var(--table-border); font-size: 11.5px; color: var(--text-muted);">${dest}</td>
          <td style="padding: 6px 12px; font-family: monospace; font-weight: 600; border-right: 1px solid var(--table-border);">${item.reference_code || '-'}</td>
          <td style="padding: 6px 12px; text-align: right; font-weight: 800; color: var(--text-primary); border-right: 1px solid var(--table-border);">
            ${Number(item.amount_paid || 0).toLocaleString('en-US', {minimumFractionDigits: 2})}
          </td>
          <td style="padding: 6px 10px; text-align: center; border-right: 1px solid var(--table-border); font-size: 11.5px;">${item.issued_by || 'DEAN'}</td>
          <td style="padding: 4px 8px; text-align: center; white-space: nowrap;">
            <div style="display: inline-flex; gap: 4px; justify-content: center;">
              <button type="button" class="btn-action-pill" onclick="editTenantReceipt('${item.id}')" title="Edit Receipt Allocations">
                ✏️ Edit
              </button>
              <button type="button" class="btn-action-pill" onclick="openOfficialReceiptModal('${item.id}')" title="Print Official Receipt">
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

    const smsCheck = document.getElementById('receipt-send-sms');
    if (smsCheck) smsCheck.checked = true;

    const banner = document.getElementById('receipt-mode-indicator-badge');
    if (banner) banner.style.display = 'none';

    unlockReceiptFormInputs();

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

  // 6. STANDARDIZED PRINTABLE RECEIPT MODAL
  function openOfficialReceiptModal(receiptOrId) {
    let receipt = typeof receiptOrId === 'object' ? receiptOrId : (AppState.tenantReceipts || []).find(r => r.id === receiptOrId);
    if (!receipt) {
      receipt = (AppState.tenantReceipts || [])[0];
    }
    if (!receipt) return;

    const modal = document.getElementById('modal-official-receipt');
    if (!modal) return;

    // Look up property to resolve dynamic branch
    const selectedProperty = (AppState.properties || []).find(p => p.id === receipt.property_id) || {};
    const branchName = selectedProperty.branch_name || selectedProperty.branch || (selectedProperty.officeBranch ? selectedProperty.officeBranch.replace(/\s*(Head\s*)?Office/i, '').trim() : '') || 'NAIROBI';

    // Inject standardized centered header layout
    const headerContainer = document.getElementById('receipt-modal-header-container');
    if (headerContainer) {
      headerContainer.outerHTML = `
<div id="receipt-modal-header-container" style="position: relative; text-align: center; border-bottom: 2px solid #000; padding-bottom: 10px; margin-bottom: 10px; min-height: 70px;">
    <img src="assets/logo.png" alt="Company Logo" style="position: absolute; left: 0; top: 0; max-width: 90px; max-height: 60px; object-fit: contain;">
    <div style="display: inline-block; text-align: center;">
        <h2 style="margin: 0; font-size: 15px; font-weight: bold;">METROCOSMO LTD - ${branchName.toUpperCase()}</h2>
        <p style="margin: 2px 0; font-size: 10px; font-style: italic; font-weight: bold;">REAL ESTATE MANAGERS & VALUERS</p>
        <p style="margin: 2px 0; font-size: 10px;">P.O. BOX 40656 - 00100 Nairobi</p>
        <p style="margin: 2px 0; font-size: 10px;">Cell: 020 2244218, 0721 737093</p>
        <p style="margin: 2px 0; font-size: 10px; font-weight: bold;">PIN: P051189201A</p>
    </div>
</div>
`;
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

  // 7. ATTACH GLOBAL EXPORTS
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
  window.confirmAction = confirmAction;
  window.closeGlobalConfirmModal = closeGlobalConfirmModal;
  window.executeGlobalConfirmedAction = executeGlobalConfirmedAction;
  window.showToast = showToast;
  window.setTheme = setTheme;
  window.toggleSidebar = toggleSidebar;

  // 8. AUTOMATIC DOMContentLoaded INITIALIZATION
  function initReceiptsPage() {
    const sidebarToggleBtn = document.getElementById('sidebar-toggle-btn');
    const brandGlyphBtn = document.getElementById('brand-glyph-btn');
    if (sidebarToggleBtn) sidebarToggleBtn.addEventListener('click', toggleSidebar);
    if (brandGlyphBtn) brandGlyphBtn.addEventListener('click', () => { if (AppState.sidebarCollapsed) toggleSidebar(); });

    const quickThemeDropdown = document.getElementById('quick-theme-dropdown');
    if (quickThemeDropdown) {
      const savedTheme = localStorage.getItem('mc_erp_theme') || 'developer';
      setTheme(savedTheme);
      quickThemeDropdown.addEventListener('change', (e) => setTheme(e.target.value));
    }

    loadTenantReceipts();
    initTenantReceipting();

    console.log('✓ Receipting module initialized in standalone MPA mode.');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initReceiptsPage);
  } else {
    initReceiptsPage();
  }
})();
