import React, { useState } from 'react';
import { BankProvider, useBank } from './context/BankContext';
import { Header } from './components/common/Header';
import { MobileNavBar } from './components/common/MobileNavBar';

// Customer Components
import { CustomerDashboard } from './components/customer/CustomerDashboard';
import { StatementView } from './components/customer/StatementView';
import { CardManagement } from './components/customer/CardManagement';
import { LoanApplication } from './components/customer/LoanApplication';
import { BillPayments } from './components/customer/BillPayments';
import { DepositOpening } from './components/customer/DepositOpening';
import { BeneficiaryManager } from './components/customer/BeneficiaryManager';
import { ChequeServices } from './components/customer/ChequeServices';
import { FxRemittance } from './components/customer/FxRemittance';
import { SupportTickets } from './components/customer/SupportTickets';
import { AtmBranchLocator } from './components/customer/AtmBranchLocator';
import { TaxCertificates } from './components/customer/TaxCertificates';

// Employee Components
import { EmployeeDashboard } from './components/employee/EmployeeDashboard';
import { CustomerOnboarding } from './components/employee/CustomerOnboarding';
import { EmployeeCardIssuance } from './components/employee/EmployeeCardIssuance';
import { LoanApprovals } from './components/employee/LoanApprovals';
import { EmployeeTickets } from './components/employee/EmployeeTickets';

// Admin Components
import { AdminDashboard } from './components/admin/AdminDashboard';
import { EmployeeManagement } from './components/admin/EmployeeManagement';
import { FraudRiskCenter } from './components/admin/FraudRiskCenter';
import { ProductRatesConfig } from './components/admin/ProductRatesConfig';
import { AuditLogs } from './components/admin/AuditLogs';

import { Building2, Lock } from 'lucide-react';

const MainContent = () => {
  const { currentRole, isMobileView } = useBank();
  const [activeTab, setActiveTab] = useState(() => {
    if (currentRole === 'Admin') return 'admin-metrics';
    if (currentRole === 'Employee') return 'desk';
    return 'overview';
  });

  return (
    <div className="min-h-screen flex flex-col justify-between">
      
      <div>
        {/* Navigation Header */}
        <Header activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Main Content Area */}
        <main className="px-4 lg:px-8 pb-12">
          
          {/* Mobile Simulator Frame Wrapper */}
          {currentRole === 'Customer' && isMobileView ? (
            <div className="py-6 flex justify-center">
              <div className="w-full max-w-sm rounded-[45px] p-4 bg-slate-900 border-[8px] border-slate-800 shadow-2xl relative overflow-hidden ring-1 ring-slate-700 flex flex-col justify-between h-[800px]">
                
                {/* Mobile Speaker / Notch */}
                <div className="w-32 h-4 bg-slate-800 rounded-full mx-auto mb-2 flex items-center justify-center shrink-0">
                  <div className="w-3 h-3 rounded-full bg-slate-900" />
                </div>

                {/* Mobile Content Screen */}
                <div className="flex-1 overflow-y-auto no-scrollbar space-y-4 pr-1">
                  {activeTab === 'overview' && <CustomerDashboard setActiveTab={setActiveTab} />}
                  {activeTab === 'statement' && <StatementView />}
                  {activeTab === 'cards' && <CardManagement />}
                  {activeTab === 'loans' && <LoanApplication />}
                  {activeTab === 'bills' && <BillPayments />}
                  {activeTab === 'deposits' && <DepositOpening />}
                  {activeTab === 'beneficiaries' && <BeneficiaryManager />}
                  {activeTab === 'cheques' && <ChequeServices />}
                  {activeTab === 'fx' && <FxRemittance />}
                  {activeTab === 'locations' && <AtmBranchLocator />}
                  {activeTab === 'tax' && <TaxCertificates />}
                  {activeTab === 'support' && <SupportTickets />}
                </div>

                {/* Bottom Navigation Bar for Mobile */}
                <div className="shrink-0 mt-2">
                  <MobileNavBar activeTab={activeTab} setActiveTab={setActiveTab} />
                  <div className="w-28 h-1 bg-slate-700 rounded-full mx-auto mt-2" />
                </div>

              </div>
            </div>
          ) : (
            <>
              {/* Customer Portal Views */}
              {currentRole === 'Customer' && (
                <>
                  {activeTab === 'overview' && <CustomerDashboard setActiveTab={setActiveTab} />}
                  {activeTab === 'statement' && <StatementView />}
                  {activeTab === 'cards' && <CardManagement />}
                  {activeTab === 'loans' && <LoanApplication />}
                  {activeTab === 'bills' && <BillPayments />}
                  {activeTab === 'deposits' && <DepositOpening />}
                  {activeTab === 'beneficiaries' && <BeneficiaryManager />}
                  {activeTab === 'cheques' && <ChequeServices />}
                  {activeTab === 'fx' && <FxRemittance />}
                  {activeTab === 'locations' && <AtmBranchLocator />}
                  {activeTab === 'tax' && <TaxCertificates />}
                  {activeTab === 'support' && <SupportTickets />}
                </>
              )}

              {/* Employee Portal Views */}
              {currentRole === 'Employee' && (
                <>
                  {(activeTab === 'desk' || activeTab === 'customer-lookup') && (
                    <EmployeeDashboard activeTab={activeTab} setActiveTab={setActiveTab} />
                  )}
                  {activeTab === 'onboarding' && <CustomerOnboarding />}
                  {activeTab === 'card-issuance' && <EmployeeCardIssuance />}
                  {activeTab === 'loan-reviews' && <LoanApprovals />}
                  {activeTab === 'customer-tickets' && <EmployeeTickets />}
                </>
              )}

              {/* Admin Portal Views */}
              {currentRole === 'Admin' && (
                <>
                  {activeTab === 'admin-metrics' && <AdminDashboard setActiveTab={setActiveTab} />}
                  {activeTab === 'employee-mgmt' && <EmployeeManagement />}
                  {activeTab === 'fraud-center' && <FraudRiskCenter />}
                  {activeTab === 'rates-config' && <ProductRatesConfig />}
                  {activeTab === 'audit-logs' && <AuditLogs />}
                </>
              )}
            </>
          )}

        </main>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 glass-panel py-6 px-4 lg:px-8 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Building2 className="h-4 w-4 text-indigo-400" />
            <span className="font-bold text-slate-300">ApexBank Premier Enterprise OS</span>
            <span>• © 2026 Apex Financial Infrastructure Inc.</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] font-semibold text-slate-400">
            <span className="flex items-center gap-1 text-emerald-400">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              System Status: 100% Operational
            </span>
            <span className="flex items-center gap-1">
              <Lock className="h-3 w-3 text-indigo-400" />
              256-Bit SSL Encrypted
            </span>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default function App() {
  return (
    <BankProvider>
      <MainContent />
    </BankProvider>
  );
}
