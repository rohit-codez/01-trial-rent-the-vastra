import React, { useState } from 'react';
import { useData } from './context/DataContext';

// Public Experience
import Navbar from './components/public/Navbar';
import Footer from './components/public/Footer';
import HomePage from './pages/public/HomePage';
import BuyPage from './pages/public/BuyPage';
import RentPage from './pages/public/RentPage';
import SellPage from './pages/public/SellPage';
import ContactPage from './pages/public/ContactPage';

// Admin Experience
import AdminLayout from './components/admin/AdminLayout';
import OverviewDashboard from './pages/admin/OverviewDashboard';
import CustomerCRM from './pages/admin/CustomerCRM';
import PropertyInventory from './pages/admin/PropertyInventory';
import PropertyMatching from './pages/admin/PropertyMatching';
import CoAgentManagement from './pages/admin/CoAgentManagement';
import DealsPipeline from './pages/admin/DealsPipeline';
import FollowupsManager from './pages/admin/FollowupsManager';
import EnquiriesInbox from './pages/admin/EnquiriesInbox';
import ReportsAnalytics from './pages/admin/ReportsAnalytics';
import SettingsPage from './pages/admin/SettingsPage';

// Admin Modals
import CustomerModal from './components/admin/CustomerModal';
import CustomerDetailDrawer from './components/admin/CustomerDetailDrawer';
import PropertyModal from './components/admin/PropertyModal';
import CoAgentModal from './components/admin/CoAgentModal';
import FollowupModal from './components/admin/FollowupModal';
import DealModal from './components/admin/DealModal';
import AdminLoginModal from './components/admin/AdminLoginModal';

export default function App() {
  const { isAdminAuthenticated } = useData();

  // Top level mode: 'public' | 'admin'
  const [viewMode, setViewMode] = useState('public');

  // Public routing: 'home' | 'buy' | 'rent' | 'sell' | 'contact'
  const [publicRoute, setPublicRoute] = useState('home');

  // Admin routing: 'overview' | 'customers' | 'inventory' | 'matching' | 'coagents' | 'deals' | 'followups' | 'enquiries' | 'reports' | 'settings'
  const [adminTab, setAdminTab] = useState('overview');

  // Modal states
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [customerModalOpen, setCustomerModalOpen] = useState(false);
  const [customerToEdit, setCustomerToEdit] = useState(null);
  const [selectedCustomerDetail, setSelectedCustomerDetail] = useState(null);
  const [customerToMatch, setCustomerToMatch] = useState(null);

  const [propertyModalOpen, setPropertyModalOpen] = useState(false);
  const [propertyToEdit, setPropertyToEdit] = useState(null);

  const [coAgentModalOpen, setCoAgentModalOpen] = useState(false);
  const [agentToEdit, setAgentToEdit] = useState(null);

  const [followupModalOpen, setFollowupModalOpen] = useState(false);
  const [followupToEdit, setFollowupToEdit] = useState(null);

  const [dealModalOpen, setDealModalOpen] = useState(false);
  const [dealToEdit, setDealToEdit] = useState(null);

  // Switch to admin handler
  const handleOpenAdmin = () => {
    if (isAdminAuthenticated) {
      setViewMode('admin');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setLoginModalOpen(true);
    }
  };

  const handleLoginSuccess = () => {
    setLoginModalOpen(false);
    setViewMode('admin');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Launch property matching for a specific customer
  const handleLaunchMatching = (customer) => {
    setCustomerToMatch(customer);
    setAdminTab('matching');
    setViewMode('admin');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#F5F6F8] font-['Plus_Jakarta_Sans',sans-serif] selection:bg-[#D4A853] selection:text-[#101D35]">
      
      {/* -------------------- PUBLIC WEBSITE EXPERIENCE -------------------- */}
      {viewMode === 'public' && (
        <div className="flex flex-col min-h-screen">
          <Navbar
            currentRoute={publicRoute}
            setCurrentRoute={setPublicRoute}
            onOpenAdmin={handleOpenAdmin}
          />

          <main className="flex-1">
            {publicRoute === 'home' && (
              <HomePage setCurrentRoute={setPublicRoute} />
            )}
            {publicRoute === 'buy' && (
              <BuyPage />
            )}
            {publicRoute === 'rent' && (
              <RentPage />
            )}
            {publicRoute === 'sell' && (
              <SellPage setCurrentRoute={setPublicRoute} />
            )}
            {publicRoute === 'contact' && (
              <ContactPage />
            )}
          </main>

          <Footer
            setCurrentRoute={setPublicRoute}
            onOpenAdmin={handleOpenAdmin}
          />
        </div>
      )}

      {/* -------------------- PRIVATE ADMIN CRM EXPERIENCE -------------------- */}
      {viewMode === 'admin' && (
        <AdminLayout
          currentTab={adminTab}
          setCurrentTab={setAdminTab}
          onExitAdmin={() => setViewMode('public')}
          onOpenNewCustomer={() => {
            setCustomerToEdit(null);
            setCustomerModalOpen(true);
          }}
          onOpenNewProperty={() => {
            setPropertyToEdit(null);
            setPropertyModalOpen(true);
          }}
          onOpenNewFollowup={() => {
            setFollowupToEdit(null);
            setFollowupModalOpen(true);
          }}
        >
          {adminTab === 'overview' && (
            <OverviewDashboard
              onSelectTab={(tab) => setAdminTab(tab)}
              onOpenCustomer={() => {
                setCustomerToEdit(null);
                setCustomerModalOpen(true);
              }}
              onOpenProperty={() => {
                setPropertyToEdit(null);
                setPropertyModalOpen(true);
              }}
              onOpenFollowup={() => {
                setFollowupToEdit(null);
                setFollowupModalOpen(true);
              }}
              onOpenDeal={() => {
                setDealToEdit(null);
                setDealModalOpen(true);
              }}
              onSelectCustomerDetail={(cust) => setSelectedCustomerDetail(cust)}
            />
          )}

          {adminTab === 'customers' && (
            <CustomerCRM
              onOpenAdd={() => {
                setCustomerToEdit(null);
                setCustomerModalOpen(true);
              }}
              onEditCustomer={(cust) => {
                setCustomerToEdit(cust);
                setCustomerModalOpen(true);
              }}
              onSelectCustomerDetail={(cust) => setSelectedCustomerDetail(cust)}
              onFindMatches={(cust) => handleLaunchMatching(cust)}
            />
          )}

          {adminTab === 'inventory' && (
            <PropertyInventory
              onOpenAdd={() => {
                setPropertyToEdit(null);
                setPropertyModalOpen(true);
              }}
              onEditProperty={(prop) => {
                setPropertyToEdit(prop);
                setPropertyModalOpen(true);
              }}
              onOpenPublicPreview={() => {
                setViewMode('public');
                setPublicRoute('buy');
              }}
            />
          )}

          {adminTab === 'matching' && (
            <PropertyMatching preSelectedCustomer={customerToMatch} />
          )}

          {adminTab === 'coagents' && (
            <CoAgentManagement
              onOpenAdd={() => {
                setAgentToEdit(null);
                setCoAgentModalOpen(true);
              }}
              onEditAgent={(agent) => {
                setAgentToEdit(agent);
                setCoAgentModalOpen(true);
              }}
              onSelectProperty={(prop) => {
                setPropertyToEdit(prop);
                setPropertyModalOpen(true);
              }}
            />
          )}

          {adminTab === 'deals' && (
            <DealsPipeline
              onOpenAdd={() => {
                setDealToEdit(null);
                setDealModalOpen(true);
              }}
              onEditDeal={(deal) => {
                setDealToEdit(deal);
                setDealModalOpen(true);
              }}
            />
          )}

          {adminTab === 'followups' && (
            <FollowupsManager
              onOpenAdd={() => {
                setFollowupToEdit(null);
                setFollowupModalOpen(true);
              }}
              onEditFollowup={(fol) => {
                setFollowupToEdit(fol);
                setFollowupModalOpen(true);
              }}
            />
          )}

          {adminTab === 'enquiries' && (
            <EnquiriesInbox
              onOpenCustomerDetail={(cust) => setSelectedCustomerDetail(cust)}
            />
          )}

          {adminTab === 'reports' && (
            <ReportsAnalytics />
          )}

          {adminTab === 'settings' && (
            <SettingsPage />
          )}
        </AdminLayout>
      )}

      {/* -------------------- GLOBAL MODALS -------------------- */}
      
      {/* Admin Login Modal */}
      <AdminLoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        onSuccess={handleLoginSuccess}
      />

      {/* Customer Add/Edit Modal */}
      <CustomerModal
        isOpen={customerModalOpen}
        onClose={() => {
          setCustomerModalOpen(false);
          setCustomerToEdit(null);
        }}
        customerToEdit={customerToEdit}
      />

      {/* Customer Full Detail Drawer */}
      <CustomerDetailDrawer
        customer={selectedCustomerDetail}
        onClose={() => setSelectedCustomerDetail(null)}
        onEdit={(cust) => {
          setSelectedCustomerDetail(null);
          setCustomerToEdit(cust);
          setCustomerModalOpen(true);
        }}
        onFindMatches={(cust) => handleLaunchMatching(cust)}
      />

      {/* Property Inventory Add/Edit Modal */}
      <PropertyModal
        isOpen={propertyModalOpen}
        onClose={() => {
          setPropertyModalOpen(false);
          setPropertyToEdit(null);
        }}
        propertyToEdit={propertyToEdit}
      />

      {/* Co-Agent Add/Edit Modal */}
      <CoAgentModal
        isOpen={coAgentModalOpen}
        onClose={() => {
          setCoAgentModalOpen(false);
          setAgentToEdit(null);
        }}
        agentToEdit={agentToEdit}
      />

      {/* Follow-up Add/Edit Modal */}
      <FollowupModal
        isOpen={followupModalOpen}
        onClose={() => {
          setFollowupModalOpen(false);
          setFollowupToEdit(null);
        }}
        followupToEdit={followupToEdit}
      />

      {/* Deal Add/Edit Modal */}
      <DealModal
        isOpen={dealModalOpen}
        onClose={() => {
          setDealModalOpen(false);
          setDealToEdit(null);
        }}
        dealToEdit={dealToEdit}
      />

    </div>
  );
}
