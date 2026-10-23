/**
 * js/landlords.js — Standalone Landlord Management & Statement Generation Engine
 * Decoupled MPA architecture for Metrocosmo ERP
 */

(function () {
  'use strict';

  // 1. STATE INITIALIZATION & SEED HYDRATION
  const AppState = window.AppState || {};

  if (window.MC_ERP_SEED_DATA) {
    Object.keys(window.MC_ERP_SEED_DATA).forEach(k => {
      if (!AppState[k] || AppState[k].length === 0) {
        AppState[k] = window.MC_ERP_SEED_DATA[k];
      }
    });
  }

  AppState.properties = AppState.properties || [];
  AppState.landlords = AppState.landlords || [];
  AppState.mandates = AppState.mandates || [];
  AppState.units = AppState.units || [];
  AppState.leases = AppState.leases || [];
  AppState.tenants = AppState.tenants || [];
  AppState.invoices = AppState.invoices || [];
  AppState.tenantInvoiceLines = AppState.tenantInvoiceLines || [];
  AppState.tenantReceipts = AppState.tenantReceipts || [];
  AppState.landlordStatements = AppState.landlordStatements || [];
  AppState.landlordPayouts = AppState.landlordPayouts || [];
  AppState.activeLandlordTab = AppState.activeLandlordTab || 'statements';
  AppState.theme = AppState.theme || 'developer';
  AppState.sidebarCollapsed = false;

  window.AppState = AppState;

  // 2. TOAST NOTIFICATIONS & CONFIRMATION INTERCEPTOR
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

  function confirmAction(message, callback, title = 'Database Execution Warning', confirmBtnText = 'Confirm & Execute', isDanger = false) {
    pendingGlobalConfirmCallback = callback;
    const modal = document.getElementById('modal-global-confirm');
    if (!modal) {
      if (window.confirm(message.replace(/<[^>]*>?/gm, ''))) {
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

  // 3. THEME & SIDEBAR MANAGEMENT
  function setTheme(newTheme) {
    AppState.theme = newTheme;
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('mc_erp_theme', newTheme);

    const quickThemeDropdown = document.getElementById('quick-theme-dropdown');
    if (quickThemeDropdown) quickThemeDropdown.value = newTheme;

    const themeIndicator = document.getElementById('header-theme-indicator');
    if (themeIndicator && quickThemeDropdown) {
      const selectedOption = quickThemeDropdown.querySelector(`option[value="${newTheme}"]`);
      if (selectedOption) themeIndicator.textContent = selectedOption.textContent.split(' ')[1] || newTheme;
    }
  }

  function toggleSidebar() {
    AppState.sidebarCollapsed = !AppState.sidebarCollapsed;
    const sidebar = document.getElementById('sidebar');
    const chevronSvg = document.getElementById('chevron-svg');
    const groupLabels = document.querySelectorAll('.nav-group-label');

    if (AppState.sidebarCollapsed) {
      if (sidebar) sidebar.classList.add('rail-mode');
      if (chevronSvg) chevronSvg.style.transform = 'rotate(180deg)';
      groupLabels.forEach(label => label.textContent = label.getAttribute('data-short') || '');
    } else {
      if (sidebar) sidebar.classList.remove('rail-mode');
      if (chevronSvg) chevronSvg.style.transform = 'rotate(0deg)';
      groupLabels.forEach(label => label.textContent = label.getAttribute('data-full') || '');
    }
  }

  // 4. LANDLORD STATEMENT GENERATOR ENGINE (landlord Statement - Jan.pdf standard)
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

    // Identify branch based on property, default to NAIROBI
    const selectedProperty = prop || {};
    const branchName = selectedProperty.branch_name || selectedProperty.branch || (selectedProperty.officeBranch ? selectedProperty.officeBranch.replace(/\s*(Head\s*)?Office/i, '').trim() : '') || 'NAIROBI';
    const currentDateTime = `${getLandlordStatementCurrentDate()} ${getLandlordStatementCurrentTime()}`;

    // Update Header Container with dynamic branch name and centered layout
    const headerContainer = document.getElementById('ll-stmt-header-container');
    if (headerContainer) {
      headerContainer.outerHTML = `
<div id="ll-stmt-header-container" style="position: relative; text-align: center; border-bottom: 2px solid #000; padding-bottom: 10px; margin-bottom: 15px; min-height: 80px;">
    <img src="assets/logo.png" alt="Company Logo" style="position: absolute; left: 0; top: 0; max-width: 120px; max-height: 80px; object-fit: contain;">
    <div style="display: inline-block; text-align: center;">
        <h2 style="margin: 0; font-size: 18px; font-weight: bold;">METROCOSMO LTD - ${branchName.toUpperCase()}</h2>
        <p style="margin: 2px 0; font-size: 11px; font-style: italic; font-weight: bold;">REAL ESTATE MANAGERS, PROPERTY CONSULTANTS & VALUERS</p>
        <p style="margin: 2px 0; font-size: 11px;">P.O. BOX 40656 - 00100 Nairobi | Hughes Building, 7th Floor</p>
        <p style="margin: 2px 0; font-size: 11px;">Cell: 020 2244218, 0721 737093 | E-Mail: info@metrocosmo.com</p>
        <p style="margin: 2px 0; font-size: 11px; font-weight: bold;">PIN: P051189201A | Date: ${currentDateTime}</p>
    </div>
</div>
`;
    }

    // Set Metadata Details
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

  // Native Print function without modal/popup hacks
  function printLandlordStatement() {
    window.print();
  }

  // 5. TAB SWITCHING FOR LANDLORD MODULE
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
        } else if (target === 'portfolio') {
          renderLandlordPortfolioTable();
        } else if (target === 'payouts') {
          renderLandlordPayoutQueueTable();
        }
      });
    });
  }

  // 6. PORTFOLIO & MANDATES TABLE RENDERER
  function renderLandlordPortfolioTable() {
    const tbody = document.getElementById('table-landlord-portfolio-body');
    if (!tbody) return;

    const badge = document.getElementById('portfolio-count-badge');
    if (badge) badge.textContent = `${AppState.mandates.length} Active Mandates`;

    tbody.innerHTML = AppState.mandates.map(m => {
      const landlord = AppState.landlords.find(l => l.name === m.landlordName) || AppState.landlords[0] || {};
      const property = AppState.properties.find(p => p.name === m.propertyName) || AppState.properties[0] || {};
      const unitsCount = AppState.units.filter(u => u.propertyName === m.propertyName || u.propertyId === property.id).length;

      const remitText = landlord.remitMethod === 'BANK' 
        ? `🏦 ${landlord.bank || 'Bank'} (${landlord.accNo || 'Acc'})`
        : `📱 M-Pesa B2C (${landlord.phone || ''})`;

      const commText = m.commissionType === 'FIXED'
        ? `<strong>KES ${Number(m.feeFixed || 0).toLocaleString()}</strong> <small style="display:block; color:var(--text-muted); font-size:0.72rem;">Fixed / Mo</small>`
        : `<strong>${m.feePct}%</strong> <small style="display:block; color:var(--text-muted); font-size:0.72rem;">Gross Rent</small>`;

      const propStatusBadge = property && property.isActive === false
        ? '<span class="badge-status" style="color: #DC2626; background: rgba(239, 68, 68, 0.12); font-size: 0.72rem; font-weight: 700;">○ DEACTIVATED</span>'
        : '<span class="badge-status" style="color: var(--accent-secondary); font-size: 0.72rem; font-weight: 700;">● ACTIVE</span>';

      return `
        <tr>
          <td>
            <div style="display: flex; align-items: center; gap: 6px;">
              <strong>${m.landlordName}</strong>
              <span class="badge-status" style="font-weight: 800; font-size: 0.72rem; background: var(--accent-primary); color: #FFFFFF;">${landlord.landlordCode || landlord.id || 'L001'}</span>
            </div>
            <div style="font-size:0.75rem; color:var(--text-muted);">${landlord.entityType || 'CORPORATE'} • ${landlord.kraPin || ''}</div>
          </td>
          <td>
            <strong>${m.propertyName}</strong>
            <div style="font-size:0.75rem; color:var(--text-muted);">${property ? property.lr : 'N/A'}</div>
          </td>
          <td><span class="badge-status" style="font-size:0.75rem;">${unitsCount} Units</span></td>
          <td>${commText}</td>
          <td>${m.vat ? '<span style="color: var(--accent-secondary); font-weight: 700;">✓ 16% VAT</span>' : 'Exempt'}</td>
          <td>${m.mri ? '<span style="color: var(--accent-amber); font-weight: 700;">✓ 7.5% MRI</span>' : 'Exempt'}</td>
          <td>${m.manager || 'Metrocosmo HQ'}</td>
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

    const rentPropSel = document.getElementById('landlord-stmt-property-rent');
    if (rentPropSel && propertyId) {
      rentPropSel.value = propertyId;
      generateLandlordRentStatement();
    }
    showToast('Landlord and property loaded into statement generator.');
  }

  // 7. STATEMENTS HISTORY TABLE RENDERER
  function renderLandlordStatementsTable() {
    const tbody = document.getElementById('table-statements-body');
    if (!tbody) return;

    const monthNames = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    tbody.innerHTML = AppState.landlordStatements.map(s => `
      <tr>
        <td><strong>${s.id}</strong></td>
        <td>${monthNames[s.periodMonth] || s.periodMonth} ${s.periodYear}</td>
        <td><strong>${s.landlordName}</strong></td>
        <td>${s.propertyName}</td>
        <td>KES ${Number(s.grossRent || 0).toLocaleString()}</td>
        <td style="color: var(--accent-primary);">-KES ${Number(s.commAmount || 0).toLocaleString()}</td>
        <td style="color: var(--text-muted);">-KES ${Number(s.vatAmount || 0).toLocaleString()}</td>
        <td>${Number(s.maintenance || 0) > 0 ? `-KES ${Number(s.maintenance).toLocaleString()}` : '0.00'}</td>
        <td style="color: var(--accent-amber);">-KES ${Number(s.mriTax || 0).toLocaleString()}</td>
        <td><strong style="color: var(--accent-secondary);">KES ${Number(s.netPayable || 0).toLocaleString()}</strong></td>
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

  // 8. REMITTANCE & PAYOUT QUEUE TABLE RENDERER
  function renderLandlordPayoutQueueTable() {
    const tbody = document.getElementById('table-landlord-payouts-body');
    if (!tbody) return;

    const monthNames = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    // Update stat pills
    const totalGross = AppState.landlordStatements.reduce((sum, s) => sum + Number(s.grossRent || 0), 0);
    const totalCommVat = AppState.landlordStatements.reduce((sum, s) => sum + Number(s.commAmount || 0) + Number(s.vatAmount || 0), 0);
    const totalMri = AppState.landlordStatements.reduce((sum, s) => sum + Number(s.mriTax || 0), 0);
    const totalNetDisbursed = AppState.landlordStatements.filter(s => s.status === 'Paid').reduce((sum, s) => sum + Number(s.netPayable || 0), 0);

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
        <td>${monthNames[s.periodMonth] || s.periodMonth} ${s.periodYear}</td>
        <td><strong>${s.landlordName}</strong></td>
        <td>${s.propertyName}</td>
        <td style="font-size:0.8rem;">${s.remitDetails || 'Bank Transfer'}</td>
        <td><strong style="color: var(--accent-secondary); font-size: 0.95rem;">KES ${Number(s.netPayable || 0).toLocaleString()}</strong></td>
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
            : `<span style="font-size:0.75rem; color:var(--text-muted);">${s.payoutDate || 'Completed'}</span>`}
        </td>
      </tr>
    `).join('');
  }

  // 9. LANDLORD PAYOUT MODAL HANDLERS
  function openLandlordPayoutModal(statementId) {
    const statement = AppState.landlordStatements.find(s => s.id === statementId);
    if (!statement) return;

    const modal = document.getElementById('modal-landlord-payout');
    if (!modal) return;
    modal.classList.add('active');

    const nameEl = document.getElementById('payout-modal-landlord-name');
    const infoEl = document.getElementById('payout-modal-remit-info');
    const dueEl = document.getElementById('payout-modal-amount-due');
    const idInput = document.getElementById('payout-modal-statement-id');
    const amtInput = document.getElementById('payout-modal-amount');

    if (nameEl) nameEl.textContent = statement.landlordName;
    if (infoEl) infoEl.textContent = statement.remitDetails || 'Electronic Payment';
    if (dueEl) dueEl.textContent = `KES ${Number(statement.netPayable || 0).toLocaleString('en-KE', { minimumFractionDigits: 2 })}`;
    if (idInput) idInput.value = statement.id;
    if (amtInput) amtInput.value = statement.netPayable;

    const channelSel = document.getElementById('payout-method-select');
    const refInput = document.getElementById('payout-ref-input');

    if (channelSel && refInput) {
      if ((statement.remitMethod || '').includes('M-Pesa')) {
        channelSel.value = 'M-Pesa B2C';
        refInput.value = 'B2C-S' + Math.random().toString(36).substring(2, 7).toUpperCase();
      } else {
        channelSel.value = 'Bank Transfer';
        refInput.value = 'EFT-KCB-' + Math.floor(100000 + Math.random() * 900000);
      }
    }

    const dateInput = document.getElementById('payout-date-input');
    if (dateInput) dateInput.value = new Date().toISOString().slice(0, 10);

    const notesInput = document.getElementById('payout-notes-input');
    if (notesInput) notesInput.value = `Remittance payout for statement ${statement.id} to ${statement.landlordName}`;
  }

  function closeLandlordPayoutModal() {
    const modal = document.getElementById('modal-landlord-payout');
    if (modal) modal.classList.remove('active');
  }

  function handleLandlordPayoutSubmit(e) {
    if (e && e.preventDefault) e.preventDefault();
    const statementId = document.getElementById('payout-modal-statement-id').value;
    const statement = AppState.landlordStatements.find(s => s.id === statementId);
    if (!statement) return;

    const method = document.getElementById('payout-method-select').value;
    const refNo = document.getElementById('payout-ref-input').value.trim();
    const date = document.getElementById('payout-date-input').value || new Date().toISOString().slice(0, 10);
    const notes = document.getElementById('payout-notes-input').value || 'Landlord remittance disbursed';

    confirmAction(
      `Are you sure you want to authorize and disburse <strong>KES ${Number(statement.netPayable).toLocaleString()}</strong> to Landlord <strong>${statement.landlordName}</strong> via ${method} (Ref: <code>${refNo}</code>)?`,
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
        showToast(`✓ Payout recorded: KES ${Number(statement.netPayable).toLocaleString()} disbursed to ${statement.landlordName} (Ref: ${refNo})`);
      },
      'Disbursement Authorization Warning',
      'Authorize & Disburse Payout',
      true
    );
  }

  // 10. ATTACH GLOBAL EXPORTS
  window.getLandlordStatementCurrentDate = getLandlordStatementCurrentDate;
  window.getLandlordStatementCurrentTime = getLandlordStatementCurrentTime;
  window.formatLandlordAmount = formatLandlordAmount;
  window.initLandlordStatementGenerator = initLandlordStatementGenerator;
  window.generateLandlordRentStatement = generateLandlordRentStatement;
  window.generateLandlordUtilityStatement = generateLandlordUtilityStatement;
  window.getLandlordPayableAmountFromLines = getLandlordPayableAmountFromLines;
  window.getLandlordReceiptPayableAmount = getLandlordReceiptPayableAmount;
  window.executeGenerateLandlordStatement = executeGenerateLandlordStatement;
  window.printLandlordStatement = printLandlordStatement;
  window.setupLandlordTabs = setupLandlordTabs;
  window.renderLandlordPortfolioTable = renderLandlordPortfolioTable;
  window.prepareQuickStatement = prepareQuickStatement;
  window.renderLandlordStatementsTable = renderLandlordStatementsTable;
  window.renderLandlordPayoutQueueTable = renderLandlordPayoutQueueTable;
  window.openLandlordPayoutModal = openLandlordPayoutModal;
  window.closeLandlordPayoutModal = closeLandlordPayoutModal;
  window.handleLandlordPayoutSubmit = handleLandlordPayoutSubmit;
  window.confirmAction = confirmAction;
  window.closeGlobalConfirmModal = closeGlobalConfirmModal;
  window.executeGlobalConfirmedAction = executeGlobalConfirmedAction;
  window.showToast = showToast;
  window.setTheme = setTheme;
  window.toggleSidebar = toggleSidebar;

  // 11. AUTOMATIC DOMContentLoaded INITIALIZATION
  function initLandlordPage() {
    // 1. Sidebar toggles
    const sidebarToggleBtn = document.getElementById('sidebar-toggle-btn');
    const brandGlyphBtn = document.getElementById('brand-glyph-btn');
    if (sidebarToggleBtn) sidebarToggleBtn.addEventListener('click', toggleSidebar);
    if (brandGlyphBtn) brandGlyphBtn.addEventListener('click', () => { if (AppState.sidebarCollapsed) toggleSidebar(); });

    // 2. Quick Theme Selector
    const quickThemeDropdown = document.getElementById('quick-theme-dropdown');
    if (quickThemeDropdown) {
      const savedTheme = localStorage.getItem('mc_erp_theme') || 'developer';
      setTheme(savedTheme);
      quickThemeDropdown.addEventListener('change', (e) => setTheme(e.target.value));
    }

    // 3. Tab switching & renderers
    setupLandlordTabs();
    initLandlordStatementGenerator();
    renderLandlordPortfolioTable();
    renderLandlordStatementsTable();
    renderLandlordPayoutQueueTable();

    // 4. Activate initial panel according to AppState.activeLandlordTab
    const activeTab = AppState.activeLandlordTab || 'statements';
    const tabBtn = document.querySelector(`[data-landlord-target="${activeTab}"]`);
    if (tabBtn) tabBtn.click();

    console.log('✓ Landlord Statements module initialized in standalone MPA mode.');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLandlordPage);
  } else {
    initLandlordPage();
  }
})();
