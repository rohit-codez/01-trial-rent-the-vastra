import React, { useState } from 'react';
import { 
  GitPullRequest, 
  Plus, 
  IndianRupee, 
  User, 
  Calendar, 
  ArrowRight, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Edit,
  LayoutGrid,
  List
} from 'lucide-react';
import { useData } from '../../context/DataContext';

const STAGES = [
  'New Lead',
  'Contacted',
  'Interested',
  'Site Visit',
  'Negotiation',
  'Deal Closed',
  'Lost',
];

export default function DealsPipeline({ onOpenAdd, onEditDeal }) {
  const { deals, updateDeal } = useData();
  const [viewMode, setViewMode] = useState('kanban'); // 'kanban' | 'list'

  const totalPipelineValue = deals
    .filter(d => d.stage !== 'Lost')
    .reduce((sum, d) => sum + (d.dealValue || 0), 0);

  const totalEstCommission = deals
    .filter(d => d.stage !== 'Lost')
    .reduce((sum, d) => sum + (d.expectedCommission || 0), 0);

  const closedDealsValue = deals
    .filter(d => d.stage === 'Deal Closed')
    .reduce((sum, d) => sum + (d.dealValue || 0), 0);

  const handleAdvanceStage = (deal, nextStage) => {
    updateDeal(deal.id, { stage: nextStage });
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-['Outfit'] text-[#101D35]">
            Deals & Sales Pipeline
          </h1>
          <p className="text-xs text-slate-500">
            Track transactions from New Lead to Final Token & Sub-Registrar Registry
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          {/* View Mode Toggle */}
          <div className="flex rounded-xl bg-white border border-slate-300 p-1">
            <button
              onClick={() => setViewMode('kanban')}
              className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 ${
                viewMode === 'kanban' ? 'bg-[#101D35] text-[#D4A853]' : 'text-slate-600 hover:text-[#101D35]'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Kanban</span>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 ${
                viewMode === 'list' ? 'bg-[#101D35] text-[#D4A853]' : 'text-slate-600 hover:text-[#101D35]'
              }`}
            >
              <List className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">List</span>
            </button>
          </div>

          <button
            onClick={onOpenAdd}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#D4A853] to-[#B88D3B] text-[#101D35] text-xs font-bold flex items-center gap-1.5 shadow-sm hover:brightness-105 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>New Deal</span>
          </button>
        </div>
      </div>

      {/* Pipeline Summary Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs font-semibold text-slate-500 block mb-1">Total Pipeline Value</span>
          <span className="text-2xl font-extrabold font-['Outfit'] text-[#101D35]">
            ₹{(totalPipelineValue / 100000).toFixed(1)} Lakhs
          </span>
          <span className="text-[11px] text-slate-400 block mt-1">Across all active negotiation stages</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs font-semibold text-slate-500 block mb-1">Estimated Commission Revenue</span>
          <span className="text-2xl font-extrabold font-['Outfit'] text-emerald-600">
            ₹{totalEstCommission.toLocaleString('en-IN')}
          </span>
          <span className="text-[11px] text-slate-400 block mt-1">Standard 1-2% brokerage estimate</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs font-semibold text-slate-500 block mb-1">Closed Deals (Won)</span>
          <span className="text-2xl font-extrabold font-['Outfit'] text-indigo-600">
            ₹{(closedDealsValue / 100000).toFixed(1)} Lakhs
          </span>
          <span className="text-[11px] text-slate-400 block mt-1">
            {deals.filter(d => d.stage === 'Deal Closed').length} successfully registered
          </span>
        </div>
      </div>

      {/* KANBAN BOARD VIEW */}
      {viewMode === 'kanban' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4 overflow-x-auto pb-6">
          {STAGES.map(stage => {
            const stageDeals = deals.filter(d => d.stage === stage);
            const stageTotal = stageDeals.reduce((sum, d) => sum + (d.dealValue || 0), 0);
            return (
              <div
                key={stage}
                className="bg-slate-100/80 rounded-2xl p-3 border border-slate-200 flex flex-col justify-between min-w-[200px]"
              >
                <div>
                  {/* Column Header */}
                  <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-200">
                    <span className="text-xs font-bold text-[#101D35] truncate">{stage}</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-white text-slate-700 shadow-xs">
                      {stageDeals.length}
                    </span>
                  </div>

                  {/* Deals Cards */}
                  <div className="space-y-3">
                    {stageDeals.map(deal => (
                      <div
                        key={deal.id}
                        className="bg-white p-3.5 rounded-xl border border-slate-200/90 shadow-xs hover:shadow-md transition-all space-y-2 group"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono text-slate-400">{deal.id}</span>
                          <button
                            onClick={() => onEditDeal(deal)}
                            className="text-slate-400 hover:text-[#101D35]"
                          >
                            <Edit className="w-3 h-3" />
                          </button>
                        </div>

                        <h4 className="text-xs font-bold text-[#101D35] line-clamp-2">
                          {deal.title}
                        </h4>

                        <div className="text-xs font-extrabold text-[#D4A853]">
                          ₹{(deal.dealValue / 100000).toFixed(1)} Lakhs
                        </div>

                        {deal.propertyTitle && (
                          <p className="text-[10px] text-slate-500 truncate">
                            🏠 {deal.propertyTitle}
                          </p>
                        )}

                        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px]">
                          <span className="text-slate-500 font-medium">Comm: ₹{(deal.expectedCommission / 1000).toFixed(0)}k</span>
                          <span className="text-indigo-600 font-bold">{deal.closeProbability}%</span>
                        </div>

                        {/* Quick Advance Button */}
                        {stage !== 'Deal Closed' && stage !== 'Lost' && (
                          <div className="pt-1">
                            <button
                              onClick={() => {
                                const currentIndex = STAGES.indexOf(stage);
                                if (currentIndex < STAGES.length - 2) {
                                  handleAdvanceStage(deal, STAGES[currentIndex + 1]);
                                }
                              }}
                              className="w-full py-1 rounded-lg bg-slate-50 hover:bg-[#101D35] text-slate-600 hover:text-[#D4A853] text-[10px] font-bold flex items-center justify-center gap-1 transition-colors"
                            >
                              <span>Advance Stage</span>
                              <ArrowRight className="w-3 h-3" />
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-200 text-[10px] text-slate-400 font-mono text-center">
                  ₹{(stageTotal / 100000).toFixed(1)} L Total
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* LIST VIEW */
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#101D35] text-white uppercase text-[10px] tracking-wider font-semibold">
              <tr>
                <th className="px-4 py-3.5">Deal Title & ID</th>
                <th className="px-4 py-3.5">Customer</th>
                <th className="px-4 py-3.5">Property</th>
                <th className="px-4 py-3.5">Stage</th>
                <th className="px-4 py-3.5">Deal Value</th>
                <th className="px-4 py-3.5">Est. Commission</th>
                <th className="px-4 py-3.5">Target Close</th>
                <th className="px-4 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {deals.map(deal => (
                <tr key={deal.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3.5 font-bold text-[#101D35]">
                    <div>{deal.title}</div>
                    <span className="text-[10px] font-mono text-slate-400">{deal.id}</span>
                  </td>
                  <td className="px-4 py-3.5 font-medium">{deal.customerName}</td>
                  <td className="px-4 py-3.5 text-slate-600 max-w-[150px] truncate">{deal.propertyTitle || '—'}</td>
                  <td className="px-4 py-3.5">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                      {deal.stage}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 font-bold text-[#101D35]">
                    ₹{(deal.dealValue / 100000).toFixed(1)} Lakhs
                  </td>
                  <td className="px-4 py-3.5 font-bold text-emerald-600">
                    ₹{deal.expectedCommission.toLocaleString('en-IN')}
                  </td>
                  <td className="px-4 py-3.5 font-mono text-slate-500">{deal.targetCloseDate || '—'}</td>
                  <td className="px-4 py-3.5 text-right">
                    <button
                      onClick={() => onEditDeal(deal)}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-[#101D35] hover:bg-slate-100"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

    </div>
  );
}
