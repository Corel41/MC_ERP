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
          tenantCode: 'T001',
          name: 'Grace Wanjiru Ndungu',
          idPassport: '31984210',
          idNumber: '31984210',
          phone: '0712345678',
          telNo: '0712345678',
          email: 'grace.ndungu@pwc.com',
          address: 'P.O. Box 45012-00100 Nairobi',
          postalCode: '00100 - GPO Nairobi',
          kraPin: 'A010948192K',
          workplace: 'PwC Kenya, Delta Corner Westlands',
          workContacts: '+254202855000',
          emergency: 'John Ndungu (0722998877)',
          emergencyContactName: 'John Ndungu',
          emergencyContactPhone: '0722998877',
          emergencyRelationship: 'Spouse',
          isActive: true
        },
        {
          id: 'TEN-02',
          tenantCode: 'T002',
          name: 'Kevin Kiprop Patel',
          idPassport: '28491022',
          idNumber: '28491022',
          phone: '0720112233',
          telNo: '0720112233',
          email: 'kevin.patel@kpmg.co.ke',
          address: 'P.O. Box 40612-00100 Nairobi',
          postalCode: '00100 - GPO Nairobi',
          kraPin: 'A009182910M',
          workplace: 'KPMG Kenya, ABC Place Waiyaki Way',
          workContacts: '+254202806000',
          emergency: 'Mary Patel (0722334455)',
          emergencyContactName: 'Mary Patel',
          emergencyContactPhone: '0722334455',
          emergencyRelationship: 'Parent',
          isActive: true
        }
      ],
      properties: [
        {
          id: 'PROP-01',
          propertyIdCode: 'P001',
          landlordId: 'LL-01',
          name: 'Chania Falls View Courts',
          lr: 'THIKA/MUNICIPALITY/BLOCK 4/182',
          type: 'RESIDENTIAL',
          county: 'Kiambu',
          subCounty: 'Section 9, Thika',
          prefix: 'CFV',
          officeBranch: 'Thika Branch',
          totalSqFt: 28500,
          noOfUnits: 4,
          remittanceType: 'Collected',
          bankName: 'KCB Bank Kenya',
          bankBranch: 'Thika Section 9',
          bankAccountNo: '1120948192',
          bankAccountName: 'Chania Falls View Courts Collection',
          paymentDate: '5th of every month',
          parkingSpaces: 12,
          pricePerParking: 3500,
          contractDate: '2026-01-01',
          modeOfBilling: 'Monthly in Advance',
          propertyOfficer: 'Eng. Dennis Mugo',
          payableToLlAccount: false,
          caretaker: 'Samuel Mwangi (0722445566)',
          caretakerName: 'Samuel Mwangi',
          caretakerPhone: '0722445566',
          unitsCount: 4,
          payablesCount: 3,
          isActive: true
        },
        {
          id: 'PROP-02',
          propertyIdCode: 'P002',
          landlordId: 'LL-02',
          name: 'Kilimani Crest Executive Apartments',
          lr: 'NAIROBI/BLOCK 33/502',
          type: 'RESIDENTIAL',
          county: 'Nairobi',
          subCounty: 'Kilimani, Nairobi',
          prefix: 'KIL',
          officeBranch: 'Nairobi Head Office',
          totalSqFt: 18000,
          noOfUnits: 2,
          remittanceType: 'Expected',
          bankName: 'Standard Chartered',
          bankBranch: 'Kenyatta Ave',
          bankAccountNo: '01002938102',
          bankAccountName: 'Kilimani Crest Escrow',
          paymentDate: '10th of every month',
          parkingSpaces: 8,
          pricePerParking: 5000,
          contractDate: '2026-03-01',
          modeOfBilling: 'Monthly in Advance',
          propertyOfficer: 'Alex Kamau',
          payableToLlAccount: false,
          caretaker: 'Joseph Mutua (0721887766)',
          caretakerName: 'Joseph Mutua',
          caretakerPhone: '0721887766',
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
        ]
      },
      propertyWaterfallRules: {
        'PROP-01': { overpaymentRouting: 'ADVANCE_RENT' },
        'PROP-02': { overpaymentRouting: 'ADVANCE_RENT' }
      },
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
        switchView('estate-reg', '01. Estate Management - 1.1 Registration');
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
        switchView('estate-reg', '01. Estate Management - 1.1 Registration');
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

    // Initialize Theme and Load Active Module
    const savedTheme = localStorage.getItem('mc_erp_theme_choice') || 'developer';
    setTheme(savedTheme);

    const initialView = AppState.activeView || 'estate-reg';
    const initialNav = document.querySelector(`.nav-item[data-view="${initialView}"]`);
    const initialTitle = initialNav ? initialNav.getAttribute('data-tooltip') : '1.1 Registration';
    loadModule(initialView, initialTitle);