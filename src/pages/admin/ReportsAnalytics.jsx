import React from 'react';
import { 
  BarChart3, 
  Download, 
  Users, 
  Home, 
  UserCheck, 
  ShoppingBag, 
  Upload, 
  Key, 
  IndianRupee, 
  CheckCircle2, 
  PieChart 
} from 'lucide-react';
import { useData } from '../../context/DataContext';

export default function ReportsAnalytics() {
  const { customers, properties, coAgents, deals, enquiries, exportCSV } = useData();

  // Calculations
  const totalCustomers = customers.length;
  const buyReqs = customers.filter(c => c.dealType === 'Buy').length;
  const sellReqs = customers.filter(c => c.dealType === 'Sell').length;
  const rentReqs = customers.filter(c => c.dealType === 'Rent').length;
  const investReqs = customers.filter(c => c.dealType === 'Invest').length;

  const totalProps = properties.length;
  const saleProps = properties.filter(p => p.dealType === 'Sale').length;
  const rentProps = properties.filter(p => p.dealType === 'Rent').length;
  const jadSeProps = properties.filter(p => p.constructionType === 'Jad Se' || p.title.toLowerCase().includes('jad se')).length;

  const totalClosedDeals = deals.filter(d => d.stage === 'Deal Closed').length;
  const totalRevenue = deals.filter(d => d.stage === 'Deal Closed').reduce((sum, d) => sum + (d.expectedCommission || 0), 0);

  const bhkDistribution = {
    '1 BHK': customers.filter(c => c.bhk === '1 BHK').length,
    '2 BHK': customers.filter(c => c.bhk === '2 BHK').length,
    '3 BHK': customers.filter(c => c.bhk === '3 BHK').length,
    '4 BHK': customers.filter(c => c.bhk === '4 BHK').length,
    'Unspecified': customers.filter(c => !c.bhk || c.bhk === 'Review Required').length,
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-['Outfit'] text-[#101D35]">
            Business Reports & Analytics
          </h1>
          <p className="text-xs text-slate-500">
            Real estate market metrics, buyer demand trends, and full Excel/CSV downloads
          </p>
        </div>

        {/* Quick CSV Export Suite */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => exportCSV(customers, 'pradhan_customers_report')}
            className="px-3.5 py-2 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-xs font-semibold text-slate-700 flex items-center gap-1.5 shadow-xs"
          >
            <Download className="w-3.5 h-3.5 text-[#D4A853]" />
            <span>Export Customers CSV</span>
          </button>

          <button
            onClick={() => exportCSV(properties, 'pradhan_inventory_report')}
            className="px-3.5 py-2 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-xs font-semibold text-slate-700 flex items-center gap-1.5 shadow-xs"
          >
            <Download className="w-3.5 h-3.5 text-[#D4A853]" />
            <span>Export Inventory CSV</span>
          </button>

          <button
            onClick={() => exportCSV(coAgents, 'pradhan_coagents_report')}
            className="px-3.5 py-2 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-xs font-semibold text-slate-700 flex items-center gap-1.5 shadow-xs"
          >
            <Download className="w-3.5 h-3.5 text-[#D4A853]" />
            <span>Export Co-Agents CSV</span>
          </button>
        </div>
      </div>

      {/* High Level Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs font-semibold text-slate-500 block mb-1">Total Customer Database</span>
          <span className="text-3xl font-extrabold font-['Outfit'] text-[#101D35]">{totalCustomers}</span>
          <span className="text-[11px] text-slate-400 block mt-1">
            {buyReqs} Buyers • {sellReqs} Sellers
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs font-semibold text-slate-500 block mb-1">Active Inventory Size</span>
          <span className="text-3xl font-extrabold font-['Outfit'] text-[#101D35]">{totalProps}</span>
          <span className="text-[11px] text-slate-400 block mt-1">
            {jadSeProps} Jad Se Houses • {saleProps} Sale Flats
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs font-semibold text-slate-500 block mb-1">Co-Agent Network Count</span>
          <span className="text-3xl font-extrabold font-['Outfit'] text-[#101D35]">{coAgents.length}</span>
          <span className="text-[11px] text-slate-400 block mt-1">Key West Delhi Associates</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs font-semibold text-slate-500 block mb-1">Closed Deals (Won)</span>
          <span className="text-3xl font-extrabold font-['Outfit'] text-emerald-600">{totalClosedDeals}</span>
          <span className="text-[11px] text-slate-400 block mt-1">
            Total Commission: ₹{totalRevenue.toLocaleString('en-IN')}
          </span>
        </div>
      </div>

      {/* Demand vs Inventory Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Deal Type Distribution */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
          <h3 className="text-base font-bold font-['Outfit'] text-[#101D35] flex items-center gap-2">
            <PieChart className="w-5 h-5 text-[#D4A853]" />
            <span>Customer Deal Type Breakdown</span>
          </h3>

          <div className="space-y-3 pt-2">
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-blue-700">Buy Requirements ({buyReqs})</span>
                <span className="text-slate-500">{totalCustomers ? Math.round((buyReqs/totalCustomers)*100) : 0}%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${totalCustomers ? (buyReqs/totalCustomers)*100 : 0}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-amber-700">Sell Requirements ({sellReqs})</span>
                <span className="text-slate-500">{totalCustomers ? Math.round((sellReqs/totalCustomers)*100) : 0}%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                <div className="bg-amber-500 h-2.5 rounded-full" style={{ width: `${totalCustomers ? (sellReqs/totalCustomers)*100 : 0}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-purple-700">Investment Enquiries ({investReqs})</span>
                <span className="text-slate-500">{totalCustomers ? Math.round((investReqs/totalCustomers)*100) : 0}%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: `${totalCustomers ? (investReqs/totalCustomers)*100 : 0}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-cyan-700">Rental Requirements ({rentReqs})</span>
                <span className="text-slate-500">{totalCustomers ? Math.round((rentReqs/totalCustomers)*100) : 0}%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                <div className="bg-cyan-500 h-2.5 rounded-full" style={{ width: `${totalCustomers ? (rentReqs/totalCustomers)*100 : 0}%` }} />
              </div>
            </div>
          </div>
        </div>

        {/* Configuration (BHK) Demand */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
          <h3 className="text-base font-bold font-['Outfit'] text-[#101D35] flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-[#D4A853]" />
            <span>Buyer Configuration (BHK) Demand</span>
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
            {Object.entries(bhkDistribution).map(([bhk, count]) => (
              <div key={bhk} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center">
                <span className="text-xs text-slate-500 font-semibold block mb-1">{bhk}</span>
                <span className="text-2xl font-extrabold text-[#101D35] font-['Outfit']">{count}</span>
                <span className="text-[10px] text-slate-400 block mt-1">Customers</span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
