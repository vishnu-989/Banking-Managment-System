import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  INITIAL_CUSTOMERS, 
  INITIAL_EMPLOYEES, 
  INITIAL_TRANSACTIONS, 
  INITIAL_LOANS, 
  INITIAL_SUPPORT_TICKETS,
  INITIAL_AUDIT_LOGS,
  FX_RATES,
  ADMIN_USER 
} from '../data/initialData';

const BankContext = createContext();

const DEFAULT_BILLERS = [
  { id: "BIL-101", category: "Electricity", billerName: "City Power & Light (Electricity)", accountNo: "ELEC-99412", amountDue: 142.50, dueDate: "2026-07-28", autoPay: true },
  { id: "BIL-102", category: "Internet", billerName: "FiberX Broadband Highspeed", accountNo: "FIB-88120", amountDue: 79.99, dueDate: "2026-07-30", autoPay: false },
  { id: "BIL-103", category: "Mobile", billerName: "Verizon Wireless Mobile Postpaid", accountNo: "VER-33910", amountDue: 65.00, dueDate: "2026-08-05", autoPay: true },
  { id: "BIL-104", category: "Piped Gas", billerName: "National Piped Gas Utility", accountNo: "GAS-44109", amountDue: 42.80, dueDate: "2026-08-02", autoPay: false },
  { id: "BIL-105", category: "Credit Card EMI", billerName: "ApexBank Visa Card Monthly EMI", accountNo: "CARD-EMI-8841", amountDue: 350.00, dueDate: "2026-08-10", autoPay: true }
];

const INITIAL_FRAUD_ALERTS = [
  { id: "ALT-901", timestamp: "2026-07-21 14:10", customerName: "Alex Morgan", type: "High-Value Transaction", amount: 25000, riskLevel: "Medium", status: "Under Review", details: "Single wire transfer exceeding $10,000 threshold." },
  { id: "ALT-902", timestamp: "2026-07-20 18:30", customerName: "Robert Chen", type: "Multi-IP Login Detection", amount: 0, riskLevel: "Low", status: "Resolved", details: "Login detected from San Francisco and London within 30 minutes." }
];

export const BankProvider = ({ children }) => {
  const getStoredData = (key, fallback) => {
    try {
      const saved = localStorage.getItem(`apex_bank_${key}`);
      if (!saved) return fallback;
      const parsed = JSON.parse(saved);

      if (key === 'customers' && Array.isArray(parsed)) {
        return parsed.map((cust, idx) => {
          const initCust = INITIAL_CUSTOMERS[idx] || INITIAL_CUSTOMERS[0];
          return {
            ...initCust,
            ...cust,
            billers: (cust.billers && cust.billers.length > 0) ? cust.billers : DEFAULT_BILLERS,
            beneficiaries: (cust.beneficiaries && cust.beneficiaries.length > 0) ? cust.beneficiaries : (initCust.beneficiaries || []),
            chequeRequests: cust.chequeRequests || (initCust.chequeRequests || [])
          };
        });
      }

      return parsed;
    } catch (e) {
      console.error(`Error loading ${key} from localStorage`, e);
      return fallback;
    }
  };

  const [customers, setCustomers] = useState(() => getStoredData('customers', INITIAL_CUSTOMERS));
  const [employees, setEmployees] = useState(() => getStoredData('employees', INITIAL_EMPLOYEES));
  const [transactions, setTransactions] = useState(() => getStoredData('transactions', INITIAL_TRANSACTIONS));
  const [loans, setLoans] = useState(() => getStoredData('loans', INITIAL_LOANS));
  const [supportTickets, setSupportTickets] = useState(() => getStoredData('supportTickets', INITIAL_SUPPORT_TICKETS));
  const [fraudAlerts, setFraudAlerts] = useState(() => getStoredData('fraudAlerts', INITIAL_FRAUD_ALERTS));
  const [auditLogs, setAuditLogs] = useState(() => getStoredData('auditLogs', INITIAL_AUDIT_LOGS));

  // Bank Configurable Product Rates
  const [ratesConfig, setRatesConfig] = useState(() => getStoredData('ratesConfig', {
    savingsRate: 3.5,
    checkingRate: 0.5,
    fdRate: 6.2,
    homeLoanRate: 6.5,
    autoLoanRate: 7.2,
    personalLoanRate: 9.5
  }));

  const [systemLockdown, setSystemLockdown] = useState(false);

  // Current authentication & session state
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    try {
      return sessionStorage.getItem('apex_bank_auth') === 'true';
    } catch {
      return false;
    }
  });

  const [currentRole, setCurrentRole] = useState(() => {
    try {
      return sessionStorage.getItem('apex_bank_role') || "Customer";
    } catch {
      return "Customer";
    }
  }); 

  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = sessionStorage.getItem('apex_bank_user');
      if (saved) return JSON.parse(saved);
    } catch {}
    return customers[0];
  }); 

  const [isMobileView, setIsMobileView] = useState(false); 
  const [notifications, setNotifications] = useState([
    { id: 1, text: "Welcome to ApexBank Premier Banking! Your 2FA security is active.", time: "Just now", read: false }
  ]);

  // Persist state
  useEffect(() => { localStorage.setItem('apex_bank_customers', JSON.stringify(customers)); }, [customers]);
  useEffect(() => { localStorage.setItem('apex_bank_employees', JSON.stringify(employees)); }, [employees]);
  useEffect(() => { localStorage.setItem('apex_bank_transactions', JSON.stringify(transactions)); }, [transactions]);
  useEffect(() => { localStorage.setItem('apex_bank_loans', JSON.stringify(loans)); }, [loans]);
  useEffect(() => { localStorage.setItem('apex_bank_supportTickets', JSON.stringify(supportTickets)); }, [supportTickets]);
  useEffect(() => { localStorage.setItem('apex_bank_fraudAlerts', JSON.stringify(fraudAlerts)); }, [fraudAlerts]);
  useEffect(() => { localStorage.setItem('apex_bank_ratesConfig', JSON.stringify(ratesConfig)); }, [ratesConfig]);
  useEffect(() => { localStorage.setItem('apex_bank_auditLogs', JSON.stringify(auditLogs)); }, [auditLogs]);

  // Reset Demo Data
  const resetDemoData = () => {
    localStorage.removeItem('apex_bank_customers');
    localStorage.removeItem('apex_bank_employees');
    localStorage.removeItem('apex_bank_transactions');
    localStorage.removeItem('apex_bank_loans');
    localStorage.removeItem('apex_bank_supportTickets');
    localStorage.removeItem('apex_bank_fraudAlerts');
    localStorage.removeItem('apex_bank_ratesConfig');
    localStorage.removeItem('apex_bank_auditLogs');

    setCustomers(INITIAL_CUSTOMERS.map(c => ({ ...c, billers: DEFAULT_BILLERS })));
    setEmployees(INITIAL_EMPLOYEES);
    setTransactions(INITIAL_TRANSACTIONS);
    setLoans(INITIAL_LOANS);
    setSupportTickets(INITIAL_SUPPORT_TICKETS);
    setFraudAlerts(INITIAL_FRAUD_ALERTS);
    setAuditLogs(INITIAL_AUDIT_LOGS);
    setCurrentUser(INITIAL_CUSTOMERS[0]);
    addNotification("Demo data reset to factory default state.");
  };

  const logAudit = (action, details, actorOverride = null) => {
    const actorName = actorOverride || (currentRole === 'Admin' ? ADMIN_USER.name : (currentUser?.name || 'System'));
    const newLog = {
      id: `LOG-${Date.now().toString().slice(-6)}`,
      timestamp: new Date().toLocaleString(),
      actor: actorName,
      role: currentRole,
      action,
      details
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  const addNotification = (text) => {
    const newNotif = {
      id: Date.now(),
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      read: false
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const switchRole = (role, userObject = null) => {
    setCurrentRole(role);
    if (role === "Admin") {
      setCurrentUser(ADMIN_USER);
      logAudit("Role Switch", "Switched session view to System Administrator Portal", ADMIN_USER.name);
    } else if (role === "Employee") {
      const emp = userObject || employees[0];
      setCurrentUser(emp);
      logAudit("Role Switch", `Switched session view to Employee Portal as ${emp.name} (${emp.role})`, emp.name);
    } else {
      const cust = userObject || customers[0];
      setCurrentUser(cust);
      logAudit("Role Switch", `Switched session view to Customer Portal as ${cust.name}`, cust.name);
    }
  };

  // Login handler
  const login = ({ email, password, portalType }) => {
    const trimmedEmail = (email || '').trim().toLowerCase();
    const trimmedPassword = (password || '').trim();

    if (!trimmedEmail) return { success: false, message: "Please enter your email address or account number." };
    if (!trimmedPassword) return { success: false, message: "Please enter your password or PIN." };

    if (portalType === "Admin") {
      if (trimmedEmail === ADMIN_USER.email.toLowerCase() || trimmedEmail === "admin") {
        if (trimmedPassword === "Password@123" || trimmedPassword === "admin") {
          setIsAuthenticated(true);
          setCurrentRole("Admin");
          setCurrentUser(ADMIN_USER);
          sessionStorage.setItem('apex_bank_auth', 'true');
          sessionStorage.setItem('apex_bank_role', 'Admin');
          sessionStorage.setItem('apex_bank_user', JSON.stringify(ADMIN_USER));
          logAudit("User Login", `Admin ${ADMIN_USER.name} logged into Executive Admin Portal`, ADMIN_USER.name);
          addNotification(`Welcome back, ${ADMIN_USER.name}! Administrator session started.`);
          return { success: true };
        }
      }
      return { success: false, message: "Invalid Executive Admin email or password." };
    }

    if (portalType === "Employee") {
      const emp = employees.find(e => 
        e.email.toLowerCase() === trimmedEmail || 
        e.id.toLowerCase() === trimmedEmail ||
        e.name.toLowerCase() === trimmedEmail
      );

      if (emp) {
        if (emp.status === "Suspended") {
          return { success: false, message: "Employee account is suspended. Contact Administrator." };
        }
        if (trimmedPassword === "Password@123" || trimmedPassword === "1234") {
          setIsAuthenticated(true);
          setCurrentRole("Employee");
          setCurrentUser(emp);
          sessionStorage.setItem('apex_bank_auth', 'true');
          sessionStorage.setItem('apex_bank_role', 'Employee');
          sessionStorage.setItem('apex_bank_user', JSON.stringify(emp));
          logAudit("User Login", `Employee ${emp.name} (${emp.role}) logged in.`, emp.name);
          addNotification(`Welcome back, ${emp.name}! Staff desk session active.`);
          return { success: true };
        }
      }
      return { success: false, message: "Invalid Employee corporate email or password." };
    }

    // Customer Login
    const cust = customers.find(c => 
      c.email.toLowerCase() === trimmedEmail || 
      c.id.toLowerCase() === trimmedEmail ||
      (c.accounts && c.accounts.some(acc => acc.accountNumber === (email || '').trim()))
    );

    if (cust) {
      if (trimmedPassword === (cust.password || "Password@123") || trimmedPassword === (cust.pin || "4321") || trimmedPassword === "1234") {
        setIsAuthenticated(true);
        setCurrentRole("Customer");
        setCurrentUser(cust);
        sessionStorage.setItem('apex_bank_auth', 'true');
        sessionStorage.setItem('apex_bank_role', 'Customer');
        sessionStorage.setItem('apex_bank_user', JSON.stringify(cust));
        logAudit("User Login", `Customer ${cust.name} logged in successfully.`, cust.name);
        addNotification(`Welcome back, ${cust.name}!`);
        return { success: true };
      }
    }
    return { success: false, message: "Invalid email, account number, or password." };
  };

  // Logout handler
  const logout = () => {
    logAudit("User Logout", `${currentUser?.name || 'User'} logged out.`);
    setIsAuthenticated(false);
    sessionStorage.removeItem('apex_bank_auth');
    sessionStorage.removeItem('apex_bank_role');
    sessionStorage.removeItem('apex_bank_user');
  };

  // EMPLOYEE FEATURE: Create New Customer Profile at Counter
  const createCustomerAccount = ({ name, email, phone, address, accountType, initialDeposit, kycDocType, kycDocNo }) => {
    const numDeposit = parseFloat(initialDeposit) || 1000;
    const newCustId = `CUST-${Math.floor(1000 + Math.random() * 9000)}`;
    const newAccNum = `4092-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newCustomer = {
      id: newCustId,
      name,
      email,
      phone,
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200",
      kycVerified: true,
      kycDocType: kycDocType || "Passport",
      kycDocNo: kycDocNo || `ID-${Math.floor(100000 + Math.random() * 900000)}`,
      address,
      joinDate: new Date().toISOString().slice(0, 10),
      pin: "1234",
      password: "Password@123",
      accounts: [
        {
          id: `ACC-${Math.floor(1000000 + Math.random() * 9000000)}`,
          type: accountType || "Savings Premier",
          accountNumber: newAccNum,
          balance: numDeposit,
          currency: "USD",
          status: "Active",
          iban: `US94APEX${newAccNum.replace(/-/g, '')}`,
          interestRate: "3.5%"
        }
      ],
      cards: [],
      beneficiaries: [],
      billers: DEFAULT_BILLERS,
      chequeRequests: []
    };

    setCustomers(prev => [newCustomer, ...prev]);
    logAudit("New Customer Onboarded", `Staff ${currentUser.name} onboarded ${name} (${newCustId}) with account ${newAccNum}`);
    return newCustomer;
  };

  // EMPLOYEE FEATURE: Issue Debit / Credit Card for Customer
  const issueCardForCustomer = ({ customerId, cardType, limit, cardClass }) => {
    const newCardId = `CARD-${Math.floor(1000 + Math.random() * 9000)}`;
    const newCardNo = `4532 •••• •••• ${Math.floor(1000 + Math.random() * 9000)}`;
    
    let targetCust = null;
    const updated = customers.map(c => {
      if (c.id === customerId) {
        targetCust = c;
        const newCard = {
          id: newCardId,
          number: newCardNo,
          holder: c.name.toUpperCase(),
          expiry: "12/29",
          type: cardType || "Visa Platinum",
          cardClass: cardClass || "bank-card-gradient-1",
          limit: parseFloat(limit) || 10000,
          spent: 0,
          isFrozen: false,
          onlinePayments: true,
          internationalUsage: true,
          pin: "1234"
        };
        return { ...c, cards: [...(c.cards || []), newCard] };
      }
      return c;
    });

    setCustomers(updated);
    logAudit("Card Issued by Staff", `Employee ${currentUser.name} issued ${cardType} (${newCardId}) for ${targetCust?.name}`);
    return newCardId;
  };

  // ADMIN FEATURE: Update Interest Rates Config
  const updateInterestRates = (newRates) => {
    setRatesConfig(prev => ({ ...prev, ...newRates }));
    logAudit("Rates Config Updated", `Admin ${currentUser.name} updated interest rate parameters.`);
  };

  // ADMIN FEATURE: Toggle Emergency System Lockdown
  const toggleSystemLockdown = () => {
    setSystemLockdown(prev => !prev);
    logAudit("System Security State", `Admin ${currentUser.name} toggled Emergency System Lockdown.`);
  };

  const resolveFraudAlert = (alertId) => {
    setFraudAlerts(prev => prev.map(a => {
      if (a.id === alertId) return { ...a, status: "Resolved" };
      return a;
    }));
    logAudit("Fraud Alert Resolved", `Admin ${currentUser.name} resolved risk alert ${alertId}`);
  };

  // Fund Transfer
  const performTransfer = ({ fromAccNum, toAccNum, recipientName, amount, note, pin }) => {
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) return { success: false, message: "Invalid amount." };
    if (currentUser?.pin && pin !== currentUser.pin) return { success: false, message: "Invalid Security PIN." };

    let sourceAccObj = null;
    let updatedCustomers = customers.map(cust => {
      const updatedAccounts = cust.accounts.map(acc => {
        if (acc.accountNumber === fromAccNum) {
          sourceAccObj = acc;
          if (acc.balance < numAmount) return acc;
          return { ...acc, balance: acc.balance - numAmount };
        }
        if (acc.accountNumber === toAccNum) return { ...acc, balance: acc.balance + numAmount };
        return acc;
      });
      return { ...cust, accounts: updatedAccounts };
    });

    if (!sourceAccObj || sourceAccObj.balance < numAmount) return { success: false, message: "Insufficient funds in selected account." };

    setCustomers(updatedCustomers);
    const refreshed = updatedCustomers.find(c => c.id === currentUser.id);
    if (refreshed) setCurrentUser(refreshed);

    const refCode = `REF-TRF-${Math.floor(100000 + Math.random() * 900000)}`;
    const newTxn = {
      id: `TXN-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toISOString().replace('T', ' ').slice(0, 16),
      accountNumber: fromAccNum,
      customerId: currentUser.id,
      description: note || `Transfer to ${recipientName}`,
      category: "Transfer",
      amount: numAmount,
      type: "debit",
      status: "Completed",
      reference: refCode,
      counterparty: `${recipientName} (${toAccNum})`
    };

    setTransactions(prev => [newTxn, ...prev]);

    // Fraud Monitor Trigger if > $10k
    if (numAmount >= 10000) {
      setFraudAlerts(prev => [
        {
          id: `ALT-${Math.floor(100 + Math.random() * 900)}`,
          timestamp: new Date().toISOString().replace('T', ' ').slice(0, 16),
          customerName: currentUser.name,
          type: "High-Value Transfer Flag",
          amount: numAmount,
          riskLevel: "High",
          status: "Under Review",
          details: `Transfer of $${numAmount.toLocaleString()} to ${recipientName}`
        },
        ...prev
      ]);
    }

    logAudit("Fund Transfer Executed", `Transferred $${numAmount.toFixed(2)} from ${fromAccNum} to ${recipientName} (${toAccNum}). Ref: ${refCode}`);
    addNotification(`Successfully transferred $${numAmount.toFixed(2)} to ${recipientName}.`);

    return {
      success: true,
      message: "Transfer completed successfully!",
      receipt: {
        reference: refCode,
        fromAccount: fromAccNum,
        toAccount: toAccNum,
        recipient: recipientName,
        amount: numAmount,
        date: newTxn.date,
        note: note || "N/A"
      }
    };
  };

  // Pay Utility Bill
  const payBill = ({ billerId, fromAccount, amount }) => {
    const numAmount = parseFloat(amount);
    let targetBiller = null;

    let updatedCustomers = customers.map(cust => {
      if (cust.id === currentUser.id) {
        const updatedAccounts = cust.accounts.map(acc => {
          if (acc.accountNumber === fromAccount) {
            if (acc.balance < numAmount) return acc;
            return { ...acc, balance: acc.balance - numAmount };
          }
          return acc;
        });

        const updatedBillers = (cust.billers || DEFAULT_BILLERS).map(b => {
          if (b.id === billerId) {
            targetBiller = b;
            return { ...b, amountDue: 0 };
          }
          return b;
        });

        return { ...cust, accounts: updatedAccounts, billers: updatedBillers };
      }
      return cust;
    });

    setCustomers(updatedCustomers);
    const refreshed = updatedCustomers.find(c => c.id === currentUser.id);
    if (refreshed) setCurrentUser(refreshed);

    const refCode = `REF-BILL-${Math.floor(100000 + Math.random() * 900000)}`;
    const newTxn = {
      id: `TXN-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toISOString().replace('T', ' ').slice(0, 16),
      accountNumber: fromAccount,
      customerId: currentUser.id,
      description: `Bill Payment - ${targetBiller?.billerName || 'Utility Bill'}`,
      category: "Utilities",
      amount: numAmount,
      type: "debit",
      status: "Completed",
      reference: refCode,
      counterparty: targetBiller?.billerName
    };

    setTransactions(prev => [newTxn, ...prev]);
    logAudit("Bill Payment Executed", `Paid $${numAmount.toFixed(2)} for ${targetBiller?.billerName}. Ref: ${refCode}`);
    addNotification(`Bill Payment of $${numAmount.toFixed(2)} for ${targetBiller?.billerName} processed.`);
    return { success: true, refCode };
  };

  const addBiller = ({ billerName, category, accountNo, amountDue }) => {
    const newBiller = {
      id: `BIL-${Math.floor(200 + Math.random() * 800)}`,
      category,
      billerName,
      accountNo,
      amountDue: parseFloat(amountDue) || 0,
      dueDate: new Date(Date.now() + 7 * 24 * 3600 * 1000).toISOString().slice(0, 10),
      autoPay: false
    };

    const updated = customers.map(c => {
      if (c.id === currentUser.id) {
        return { ...c, billers: [...(c.billers || DEFAULT_BILLERS), newBiller] };
      }
      return c;
    });

    setCustomers(updated);
    if (currentUser) setCurrentUser(updated.find(c => c.id === currentUser.id));
    logAudit("Biller Added", `Added utility biller ${billerName} (${category})`);
    addNotification(`Added ${billerName} to your registered bill payees.`);
  };

  const openDeposit = ({ depositType, amount, tenureMonths, interestRate, fromAccount }) => {
    const numAmt = parseFloat(amount);
    const months = parseInt(tenureMonths, 10);
    const newAccNum = `4092-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`;

    let sourceOk = false;
    let updatedCustomers = customers.map(cust => {
      if (cust.id === currentUser.id) {
        const updatedAccounts = cust.accounts.map(acc => {
          if (acc.accountNumber === fromAccount && acc.balance >= numAmt) {
            sourceOk = true;
            return { ...acc, balance: acc.balance - numAmt };
          }
          return acc;
        });

        if (sourceOk) {
          const newAcc = {
            id: `ACC-${Math.floor(1000000 + Math.random() * 9000000)}`,
            type: `${depositType} ${months}M`,
            accountNumber: newAccNum,
            balance: numAmt,
            currency: "USD",
            status: "Active",
            iban: `US94APEX${newAccNum.replace(/-/g, '')}`,
            interestRate: `${interestRate}%`
          };
          return { ...cust, accounts: [...updatedAccounts, newAcc] };
        }
        return { ...cust, accounts: updatedAccounts };
      }
      return cust;
    });

    if (!sourceOk) return { success: false, message: "Insufficient balance to open deposit." };

    setCustomers(updatedCustomers);
    const refreshed = updatedCustomers.find(c => c.id === currentUser.id);
    if (refreshed) setCurrentUser(refreshed);

    logAudit("Fixed Deposit Opened", `Created ${depositType} of $${numAmt} for ${currentUser.name} (${newAccNum})`);
    addNotification(`New ${depositType} account (${newAccNum}) created successfully with $${numAmt}.`);
    return { success: true, accountNumber: newAccNum };
  };

  const addBeneficiary = ({ name, accountNumber, bankName, swiftCode, dailyLimit }) => {
    const newBen = {
      id: `BEN-${Date.now().toString().slice(-4)}`,
      name,
      accountNumber,
      bankName: bankName || "ApexBank",
      swiftCode: swiftCode || "APEXUS33",
      dailyLimit: parseFloat(dailyLimit) || 10000
    };

    const updated = customers.map(c => {
      if (c.id === currentUser.id) {
        return { ...c, beneficiaries: [...(c.beneficiaries || []), newBen] };
      }
      return c;
    });

    setCustomers(updated);
    if (currentUser) setCurrentUser(updated.find(c => c.id === currentUser.id));
    logAudit("Beneficiary Added", `Added new payee ${name} (${accountNumber})`);
    addNotification(`Added beneficiary ${name} to your payee directory.`);
  };

  const deleteBeneficiary = (benId) => {
    const updated = customers.map(c => {
      if (c.id === currentUser.id) {
        return { ...c, beneficiaries: (c.beneficiaries || []).filter(b => b.id !== benId) };
      }
      return c;
    });
    setCustomers(updated);
    if (currentUser) setCurrentUser(updated.find(c => c.id === currentUser.id));
  };

  const requestChequeBook = ({ leaves, type, accountNumber }) => {
    const newReq = {
      id: `CHQ-${Math.floor(100 + Math.random() * 900)}`,
      leaves: parseInt(leaves, 10),
      type,
      requestedDate: new Date().toISOString().slice(0, 10),
      status: "Processing",
      trackingNo: `FEDEX-${Math.floor(100000 + Math.random() * 900000)}`
    };

    const updated = customers.map(c => {
      if (c.id === currentUser.id) {
        return { ...c, chequeRequests: [...(c.chequeRequests || []), newReq] };
      }
      return c;
    });

    setCustomers(updated);
    if (currentUser) setCurrentUser(updated.find(c => c.id === currentUser.id));
    logAudit("Cheque Book Requested", `Customer ${currentUser.name} requested ${leaves}-leaf cheque book.`);
    addNotification(`Cheque Book request ${newReq.id} submitted for dispatch.`);
    return newReq;
  };

  const submitSupportTicket = ({ subject, category, priority, text }) => {
    const newTicket = {
      id: `TCK-${Math.floor(100 + Math.random() * 900)}`,
      customerId: currentUser.id,
      customerName: currentUser.name,
      subject,
      category,
      priority,
      status: "Open",
      createdDate: new Date().toISOString().replace('T', ' ').slice(0, 16),
      assignedTo: "David Miller",
      messages: [
        { sender: currentUser.name, text, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
      ]
    };

    setSupportTickets(prev => [newTicket, ...prev]);
    logAudit("Support Ticket Created", `Customer ${currentUser.name} opened ticket ${newTicket.id}: ${subject}`);
    addNotification(`Support Ticket ${newTicket.id} created. Bank team will reply shortly.`);
    return newTicket;
  };

  const replySupportTicket = (ticketId, text) => {
    const senderName = currentRole === 'Customer' ? currentUser.name : `${currentUser.name} (Staff)`;
    
    setSupportTickets(prev => prev.map(t => {
      if (t.id === ticketId) {
        const newMsg = {
          sender: senderName,
          text,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        return { ...t, messages: [...t.messages, newMsg] };
      }
      return t;
    }));
  };

  const updateTicketStatus = (ticketId, status) => {
    setSupportTickets(prev => prev.map(t => {
      if (t.id === ticketId) return { ...t, status };
      return t;
    }));
  };

  const depositWithdrawCounter = ({ accountNumber, amount, type, employeeName }) => {
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) return { success: false, message: "Invalid amount." };

    let targetCustomer = null;
    let targetAccount = null;

    const updatedCustomers = customers.map(cust => {
      let accModified = false;
      const updatedAccounts = cust.accounts.map(acc => {
        if (acc.accountNumber === accountNumber) {
          targetCustomer = cust;
          targetAccount = acc;
          accModified = true;
          if (type === 'withdraw' && acc.balance < numAmount) return acc;
          const newBal = type === 'deposit' ? acc.balance + numAmount : acc.balance - numAmount;
          return { ...acc, balance: newBal };
        }
        return acc;
      });
      return accModified ? { ...cust, accounts: updatedAccounts } : cust;
    });

    if (!targetAccount) return { success: false, message: "Account number not found." };
    if (type === 'withdraw' && targetAccount.balance < numAmount) return { success: false, message: "Insufficient balance for withdrawal." };

    setCustomers(updatedCustomers);
    const refCode = `REF-${type.toUpperCase()}-${Math.floor(100000 + Math.random() * 900000)}`;
    const newTxn = {
      id: `TXN-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toISOString().replace('T', ' ').slice(0, 16),
      accountNumber,
      customerId: targetCustomer.id,
      description: `Teller Counter Cash ${type === 'deposit' ? 'Deposit' : 'Withdrawal'} by ${employeeName}`,
      category: type === 'deposit' ? 'Deposit' : 'Withdrawal',
      amount: numAmount,
      type: type === 'deposit' ? 'credit' : 'debit',
      status: "Completed",
      reference: refCode,
      counterparty: `Teller Desk (${employeeName})`
    };

    setTransactions(prev => [newTxn, ...prev]);
    logAudit(`Counter Desk ${type.toUpperCase()}`, `Employee ${employeeName} processed ${type} of $${numAmount.toFixed(2)} for ${accountNumber}.`, employeeName);

    return { success: true, message: `Processed ${type} of $${numAmount.toFixed(2)}.`, receipt: newTxn };
  };

  const toggleAccountStatus = (accountNumber) => {
    let newStatus = "";
    const updated = customers.map(cust => {
      const updatedAccounts = cust.accounts.map(acc => {
        if (acc.accountNumber === accountNumber) {
          newStatus = acc.status === "Active" ? "Frozen" : "Active";
          return { ...acc, status: newStatus };
        }
        return acc;
      });
      return { ...cust, accounts: updatedAccounts };
    });
    setCustomers(updated);
    logAudit("Account Status Update", `Account ${accountNumber} set to ${newStatus}`);
  };

  const toggleCardFreeze = (cardId) => {
    let isFrozenNow = false;
    const updated = customers.map(cust => {
      const updatedCards = cust.cards.map(card => {
        if (card.id === cardId) {
          isFrozenNow = !card.isFrozen;
          return { ...card, isFrozen: isFrozenNow };
        }
        return card;
      });
      return { ...cust, cards: updatedCards };
    });
    setCustomers(updated);
    if (currentUser) setCurrentUser(updated.find(c => c.id === currentUser.id));
    logAudit("Card Security Action", `Card ${cardId} is now ${isFrozenNow ? 'FROZEN' : 'ACTIVE'}`);
    addNotification(`Card ${cardId} status set to ${isFrozenNow ? 'Frozen' : 'Active'}.`);
  };

  const updateCardControls = (cardId, { onlinePayments, internationalUsage, limit }) => {
    const updated = customers.map(cust => {
      const updatedCards = cust.cards.map(card => {
        if (card.id === cardId) {
          return {
            ...card,
            onlinePayments: onlinePayments !== undefined ? onlinePayments : card.onlinePayments,
            internationalUsage: internationalUsage !== undefined ? internationalUsage : card.internationalUsage,
            limit: limit ? parseFloat(limit) : card.limit
          };
        }
        return card;
      });
      return { ...cust, cards: updatedCards };
    });
    setCustomers(updated);
    if (currentUser) setCurrentUser(updated.find(c => c.id === currentUser.id));
  };

  const resetCardPin = (cardId, newPin) => {
    const updated = customers.map(cust => {
      const updatedCards = cust.cards.map(card => {
        if (card.id === cardId) return { ...card, pin: newPin };
        return card;
      });
      return { ...cust, cards: updatedCards };
    });
    setCustomers(updated);
    if (currentUser) setCurrentUser(updated.find(c => c.id === currentUser.id));
    logAudit("Card Security Action", `Reset PIN for Card ${cardId}`);
  };

  const applyLoan = ({ loanType, amount, tenureMonths, purpose }) => {
    const numAmt = parseFloat(amount);
    const months = parseInt(tenureMonths, 10);
    const rate = loanType.includes("Home") ? 6.5 : (loanType.includes("Auto") ? 7.2 : 9.5);
    const monthlyRate = rate / 12 / 100;
    const emi = (numAmt * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);

    const newLoan = {
      id: `LOAN-${Math.floor(100 + Math.random() * 900)}`,
      customerId: currentUser.id,
      customerName: currentUser.name,
      type: loanType,
      amount: numAmt,
      tenureMonths: months,
      interestRate: rate,
      monthlyEmi: emi.toFixed(2),
      purpose,
      status: "Pending",
      appliedDate: new Date().toISOString().slice(0, 10),
      creditScore: Math.floor(700 + Math.random() * 140),
      reviewedBy: null,
      reviewDate: null,
      notes: ""
    };

    setLoans(prev => [newLoan, ...prev]);
    logAudit("Loan Application Submitted", `Customer ${currentUser.name} applied for $${numAmt} ${loanType}`);
    addNotification(`Loan Application ${newLoan.id} submitted for review.`);
    return newLoan;
  };

  const processLoan = (loanId, status, notes, reviewerName) => {
    setLoans(prev => prev.map(loan => {
      if (loan.id === loanId) {
        return {
          ...loan,
          status,
          notes,
          reviewedBy: reviewerName || currentUser.name,
          reviewDate: new Date().toISOString().slice(0, 10)
        };
      }
      return loan;
    }));
    logAudit("Loan Review Decision", `Loan ${loanId} marked as ${status.toUpperCase()} by ${reviewerName || currentUser.name}`);
  };

  const addEmployee = (empData) => {
    const newEmp = {
      id: `EMP-${Math.floor(200 + Math.random() * 800)}`,
      name: empData.name,
      email: empData.email,
      role: empData.role,
      branch: empData.branch,
      status: "Active",
      avatar: empData.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200",
      joinDate: new Date().toISOString().slice(0, 10),
      transactionsHandled: 0
    };
    setEmployees(prev => [newEmp, ...prev]);
    logAudit("Employee Created", `Added staff ${newEmp.name} (${newEmp.role})`);
    return newEmp;
  };

  const updateEmployeeRole = (empId, newRole, newBranch) => {
    setEmployees(prev => prev.map(emp => {
      if (emp.id === empId) return { ...emp, role: newRole || emp.role, branch: newBranch || emp.branch };
      return emp;
    }));
  };

  const toggleEmployeeStatus = (empId) => {
    setEmployees(prev => prev.map(emp => {
      if (emp.id === empId) {
        const nextStatus = emp.status === "Active" ? "Suspended" : "Active";
        return { ...emp, status: nextStatus };
      }
      return emp;
    }));
  };

  const value = {
    customers,
    employees,
    transactions,
    loans,
    supportTickets,
    fraudAlerts,
    ratesConfig,
    systemLockdown,
    auditLogs,
    fxRates: FX_RATES,
    isAuthenticated,
    login,
    logout,
    currentRole,
    currentUser,
    isMobileView,
    setIsMobileView,
    notifications,
    DEFAULT_BILLERS,
    switchRole,
    performTransfer,
    payBill,
    addBiller,
    openDeposit,
    addBeneficiary,
    deleteBeneficiary,
    requestChequeBook,
    submitSupportTicket,
    replySupportTicket,
    updateTicketStatus,
    createCustomerAccount,
    issueCardForCustomer,
    updateInterestRates,
    toggleSystemLockdown,
    resolveFraudAlert,
    depositWithdrawCounter,
    toggleAccountStatus,
    toggleCardFreeze,
    updateCardControls,
    resetCardPin,
    applyLoan,
    processLoan,
    addEmployee,
    updateEmployeeRole,
    toggleEmployeeStatus,
    resetDemoData,
    logAudit,
    addNotification
  };

  return <BankContext.Provider value={value}>{children}</BankContext.Provider>;
};

export const useBank = () => useContext(BankContext);
