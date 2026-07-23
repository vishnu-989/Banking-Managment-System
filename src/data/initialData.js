export const INITIAL_CUSTOMERS = [
  {
    id: "CUST-1001",
    name: "Alex Morgan",
    email: "alex.morgan@example.com",
    phone: "+1 (555) 234-5678",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
    kycVerified: true,
    kycDocType: "Passport / National ID",
    kycDocNo: "US-PASS-990812",
    address: "742 Evergreen Terrace, Springfield, OR",
    joinDate: "2023-01-15",
    pin: "4321",
    password: "Password@123",
    accounts: [
      {
        id: "ACC-8821049",
        type: "Savings Premier",
        accountNumber: "4092-8821-0491",
        balance: 24850.75,
        currency: "USD",
        status: "Active",
        iban: "US94APEX409288210491",
        interestRate: "3.5%"
      },
      {
        id: "ACC-3310482",
        type: "Checking Preferred",
        accountNumber: "4092-3310-4822",
        balance: 5210.30,
        currency: "USD",
        status: "Active",
        iban: "US94APEX409233104822",
        interestRate: "0.5%"
      },
      {
        id: "ACC-9901423",
        type: "Fixed Deposit 12M",
        accountNumber: "4092-9901-4233",
        balance: 50000.00,
        currency: "USD",
        status: "Active",
        iban: "US94APEX409299014233",
        interestRate: "6.2%"
      }
    ],
    cards: [
      {
        id: "CARD-7741",
        number: "4532 •••• •••• 8841",
        holder: "ALEX MORGAN",
        expiry: "09/28",
        type: "Visa Infinite",
        cardClass: "bank-card-gradient-1",
        limit: 15000,
        spent: 2340.50,
        isFrozen: false,
        onlinePayments: true,
        internationalUsage: true,
        pin: "4321"
      },
      {
        id: "CARD-9932",
        number: "5412 •••• •••• 3319",
        holder: "ALEX MORGAN",
        expiry: "11/27",
        type: "Mastercard World Elite",
        cardClass: "bank-card-gradient-2",
        limit: 25000,
        spent: 8900.00,
        isFrozen: false,
        onlinePayments: true,
        internationalUsage: false,
        pin: "1234"
      }
    ],
    beneficiaries: [
      {
        id: "BEN-01",
        name: "Samantha Reed",
        accountNumber: "4092-5542-1099",
        bankName: "ApexBank Main Branch",
        swiftCode: "APEXUS33",
        dailyLimit: 10000
      },
      {
        id: "BEN-02",
        name: "Robert Chen",
        accountNumber: "4092-2219-8044",
        bankName: "ApexBank SF Branch",
        swiftCode: "APEXUS44",
        dailyLimit: 5000
      }
    ],
    billers: [
      { id: "BIL-101", category: "Electricity", billerName: "City Power & Light", accountNo: "ELEC-99412", amountDue: 142.50, dueDate: "2026-07-28", autoPay: true },
      { id: "BIL-102", category: "Internet", billerName: "FiberX Broadband", accountNo: "FIB-88120", amountDue: 79.99, dueDate: "2026-07-30", autoPay: false }
    ],
    chequeRequests: [
      { id: "CHQ-801", leaves: 25, type: "Personal Booklet", requestedDate: "2026-07-10", status: "Delivered", trackingNo: "FEDEX-882910" }
    ]
  },
  {
    id: "CUST-1002",
    name: "Samantha Reed",
    email: "samantha.r@example.com",
    phone: "+1 (555) 987-6543",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200",
    kycVerified: true,
    kycDocType: "Driver's License",
    kycDocNo: "DL-NY-8891204",
    address: "100 Wall St, Suite 400, New York, NY",
    joinDate: "2022-08-20",
    pin: "8899",
    password: "Password@123",
    accounts: [
      {
        id: "ACC-5542109",
        type: "Savings Premier",
        accountNumber: "4092-5542-1099",
        balance: 142300.00,
        currency: "USD",
        status: "Active",
        iban: "US94APEX409255421099",
        interestRate: "3.5%"
      }
    ],
    cards: [
      {
        id: "CARD-1289",
        number: "4532 •••• •••• 1289",
        holder: "SAMANTHA REED",
        expiry: "04/29",
        type: "Visa Platinum",
        cardClass: "bank-card-gradient-3",
        limit: 30000,
        spent: 4500.00,
        isFrozen: false,
        onlinePayments: true,
        internationalUsage: true,
        pin: "8899"
      }
    ],
    beneficiaries: [],
    billers: [],
    chequeRequests: []
  },
  {
    id: "CUST-1003",
    name: "Robert Chen",
    email: "robert.chen@example.com",
    phone: "+1 (555) 456-7890",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
    kycVerified: false,
    kycDocType: "Pending Verification",
    kycDocNo: "N/A",
    address: "45 Market Street, San Francisco, CA",
    joinDate: "2024-02-10",
    pin: "5555",
    password: "Password@123",
    accounts: [
      {
        id: "ACC-2219804",
        type: "Checking Standard",
        accountNumber: "4092-2219-8044",
        balance: 8750.40,
        currency: "USD",
        status: "Active",
        iban: "US94APEX409222198044",
        interestRate: "0.2%"
      }
    ],
    cards: [],
    beneficiaries: [],
    billers: [],
    chequeRequests: []
  }
];

export const INITIAL_EMPLOYEES = [
  {
    id: "EMP-201",
    name: "David Miller",
    email: "d.miller@apexbank.com",
    role: "Senior Teller",
    branch: "Springfield Main Branch",
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200",
    joinDate: "2021-03-12",
    transactionsHandled: 1420
  },
  {
    id: "EMP-202",
    name: "Elena Rostova",
    email: "e.rostova@apexbank.com",
    role: "Loan & Risk Officer",
    branch: "New York Corporate Branch",
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200",
    joinDate: "2020-09-01",
    transactionsHandled: 890
  },
  {
    id: "EMP-203",
    name: "Marcus Vance",
    email: "m.vance@apexbank.com",
    role: "Branch Manager",
    branch: "San Francisco Financial District",
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200",
    joinDate: "2018-05-19",
    transactionsHandled: 3410
  }
];

export const INITIAL_TRANSACTIONS = [
  {
    id: "TXN-908123",
    date: "2026-07-21 14:32",
    accountNumber: "4092-8821-0491",
    customerId: "CUST-1001",
    description: "Salary Deposit - Acme Corp Inc.",
    category: "Salary",
    amount: 5400.00,
    type: "credit",
    status: "Completed",
    reference: "REF-ACME-882910",
    counterparty: "Acme Corp Payroll"
  },
  {
    id: "TXN-908122",
    date: "2026-07-20 18:15",
    accountNumber: "4092-8821-0491",
    customerId: "CUST-1001",
    description: "Apple Store - iPhone 16 Pro Purchase",
    category: "Shopping",
    amount: 1199.00,
    type: "debit",
    status: "Completed",
    reference: "REF-APL-992014",
    counterparty: "Apple Inc Store #412"
  },
  {
    id: "TXN-908121",
    date: "2026-07-19 11:05",
    accountNumber: "4092-8821-0491",
    customerId: "CUST-1001",
    description: "Internal Transfer to Samantha Reed",
    category: "Transfer",
    amount: 450.00,
    type: "debit",
    status: "Completed",
    reference: "REF-TRF-001928",
    counterparty: "Samantha Reed (ACC-5542109)"
  },
  {
    id: "TXN-908120",
    date: "2026-07-18 09:40",
    accountNumber: "4092-3310-4822",
    customerId: "CUST-1001",
    description: "Electric & Water Bill Auto-Pay",
    category: "Utilities",
    amount: 184.50,
    type: "debit",
    status: "Completed",
    reference: "REF-UTIL-44321",
    counterparty: "City Power & Water"
  },
  {
    id: "TXN-908119",
    date: "2026-07-15 16:20",
    accountNumber: "4092-8821-0491",
    customerId: "CUST-1001",
    description: "Dividend Yield Distribution",
    category: "Investment",
    amount: 320.40,
    type: "credit",
    status: "Completed",
    reference: "REF-DIV-77412",
    counterparty: "Vanguard Total Market ETF"
  }
];

export const INITIAL_LOANS = [
  {
    id: "LOAN-501",
    customerId: "CUST-1001",
    customerName: "Alex Morgan",
    type: "Home Renovation Loan",
    amount: 25000,
    tenureMonths: 36,
    interestRate: 7.5,
    monthlyEmi: 777.62,
    purpose: "Kitchen upgrade and roof solar installation",
    status: "Pending",
    appliedDate: "2026-07-19",
    creditScore: 785,
    reviewedBy: null,
    reviewDate: null,
    notes: ""
  },
  {
    id: "LOAN-502",
    customerId: "CUST-1003",
    customerName: "Robert Chen",
    type: "Auto Financing",
    amount: 38000,
    tenureMonths: 48,
    interestRate: 6.8,
    monthlyEmi: 906.12,
    purpose: "Electric Vehicle Purchase (Tesla Model Y)",
    status: "Approved",
    appliedDate: "2026-07-10",
    creditScore: 810,
    reviewedBy: "Elena Rostova",
    reviewDate: "2026-07-12",
    notes: "Verified income proof and high credit score. Recommended approval."
  }
];

export const INITIAL_SUPPORT_TICKETS = [
  {
    id: "TCK-401",
    customerId: "CUST-1001",
    customerName: "Alex Morgan",
    subject: "International Wire Inquiry to UK Account",
    category: "Wire Transfer",
    priority: "High",
    status: "Open",
    createdDate: "2026-07-21 10:15",
    assignedTo: "David Miller",
    messages: [
      { sender: "Alex Morgan", text: "I need to transfer £2,500 to a vendor in London. Are there any daily forex limits?", time: "2026-07-21 10:15" },
      { sender: "David Miller (Staff)", text: "Hello Alex, your account daily forex transfer limit is set to $25,000 equivalent. You can execute this directly via our FX Remittance section.", time: "2026-07-21 11:30" }
    ]
  }
];

export const INITIAL_AUDIT_LOGS = [
  {
    id: "LOG-9901",
    timestamp: "2026-07-21 14:35:10",
    actor: "Admin (Sarah Connor)",
    role: "Admin",
    action: "System Startup & Liquidity Audit",
    details: "Verified total bank reserves of $25,000,000 across 3 primary branches."
  },
  {
    id: "LOG-9902",
    timestamp: "2026-07-21 12:20:45",
    actor: "David Miller",
    role: "Senior Teller",
    action: "Over-the-Counter Deposit",
    details: "Processed cash deposit of $1,200.00 into account 4092-8821-0491."
  }
];

export const FX_RATES = [
  { pair: "EUR/USD", buy: 1.0850, sell: 1.0890, change: "+0.25%" },
  { pair: "GBP/USD", buy: 1.2940, sell: 1.2980, change: "+0.15%" },
  { pair: "USD/JPY", buy: 156.40, sell: 156.80, change: "-0.40%" },
  { pair: "USD/CAD", buy: 1.3650, sell: 1.3680, change: "+0.10%" },
  { pair: "USD/CHF", buy: 0.8920, sell: 0.8950, change: "0.00%" }
];

export const BRANCH_LOCATIONS = [
  { id: "BR-1", name: "Springfield Main Branch & Vault", address: "700 Main St, Springfield, OR", phone: "+1 (555) 111-2222", hours: "8:00 AM - 5:00 PM", status: "Open", atmCash: "$250,000 Available" },
  { id: "BR-2", name: "New York Wall Street HQ Branch", address: "100 Wall Street, New York, NY", phone: "+1 (555) 333-4444", hours: "8:30 AM - 6:00 PM", status: "Open", atmCash: "$500,000 Available" },
  { id: "BR-3", name: "San Francisco Financial District Branch", address: "45 Market St, San Francisco, CA", phone: "+1 (555) 555-6666", hours: "9:00 AM - 5:00 PM", status: "Open", atmCash: "$320,000 Available" }
];

export const ADMIN_USER = {
  id: "ADM-001",
  name: "Sarah Connor",
  email: "s.connor@apexbank.com",
  role: "System Director / Executive Admin",
  avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200",
  branch: "Global HQ"
};
