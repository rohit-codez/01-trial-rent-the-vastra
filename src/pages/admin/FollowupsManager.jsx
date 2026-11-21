import React, { useState } from 'react';
import { 
  CalendarClock, 
  Plus, 
  Phone, 
  MessageSquare, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Edit, 
  Trash2, 
  RotateCcw 
} from 'lucide-react';
import { useData } from '../../context/DataContext';

export default function FollowupsManager({ onOpenAdd, onEditFollowup }) {
  const { followups, updateFollowup, deleteFollowup } = useData();
  const [activeTab, setActiveTab] = useState('today'); // 'today' | 'upcoming' | 'overdue' | 'completed'

  const todayStr = new Date().toISOString().split('T')[0];

  const todaysFollowups = followups.filter(f => f.status === 'Pending' && f.dueDate === todayStr);
  const overdueFollowups = followups.filter(f => f.status === 'Pending' && f.dueDate < todayStr);
  const upcomingFollowups = followups.filter(f => f.status === 'Pending' && f.dueDate > todayStr);
  const completedFollowups = followups.filter(f => f.status === 'Completed');

  const getListByTab = () => {
    switch (activeTab) {
      case 'today': return todaysFollowups;
      case 'overdue': return overdueFollowups;
      case 'upcoming': return upcomingFollowups;
      case 'completed': return completedFollowups;
      default: return todaysFollowups;
    }
  };

  const handleToggleComplete = (followup) => {
    const newStatus = followup.status === 'Completed' ? 'Pending' : 'Completed';
    updateFollowup(followup.id, { status: newStatus });
  };

  const currentList = getListByTab();

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-['Outfit'] text-[#101D35]">
            Customer Follow-up Manager
          </h1>
          <p className="text-xs text-slate-500">
            Keep buyer relationships active with scheduled calls, site visits, and token discussions
          </p>
        </div>

        <button
          onClick={onOpenAdd}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#D4A853] to-[#B88D3B] text-[#101D35] text-xs font-bold flex items-center gap-1.5 shadow-sm hover:brightness-105 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Schedule Follow-up</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3">
        <button
          onClick={() => setActiveTab('today')}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
            activeTab === 'today'
              ? 'bg-[#101D35] text-[#D4A853] shadow-xs'
              : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
          }`}
        >
          <Clock className="w-3.5 h-3.5" />
          <span>Today's Follow-ups ({todaysFollowups.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('upcoming')}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
            activeTab === 'upcoming'
              ? 'bg-[#101D35] text-[#D4A853] shadow-xs'
              : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
          }`}
        >
          <CalendarClock className="w-3.5 h-3.5" />
          <span>Upcoming ({upcomingFollowups.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('overdue')}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
            activeTab === 'overdue'
              ? 'bg-rose-600 text-white shadow-xs'
              : 'bg-white hover:bg-rose-50 text-rose-600 border border-rose-200'
          }`}
        >
          <AlertCircle className="w-3.5 h-3.5" />
          <span>Overdue ({overdueFollowups.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('completed')}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
            activeTab === 'completed'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'bg-white hover:bg-emerald-50 text-emerald-700 border border-slate-200'
          }`}
        >
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Completed History ({completedFollowups.length})</span>
        </button>
      </div>

      {/* Follow-ups List */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        {currentList.length === 0 ? (
          <div className="p-12 text-center text-xs text-slate-400">
            No follow-ups in this category. You are on track!
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {currentList.map(fol => (
              <div
                key={fol.id}
                className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50 transition-colors"
              >
                {/* Left details */}
                <div className="flex items-start gap-4">
                  <button
                    onClick={() => handleToggleComplete(fol)}
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 mt-1 transition-colors ${
                      fol.status === 'Completed'
                        ? 'bg-emerald-600 border-emerald-600 text-white'
                        : 'border-slate-300 hover:border-emerald-600 text-transparent'
                    }`}
                    title="Mark Complete"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                  </button>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <h4 className="text-sm font-bold text-[#101D35]">{fol.customerName}</h4>
                      <span className="text-xs font-mono text-slate-500 font-semibold">{fol.phone}</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-500">
                        Due: {fol.dueDate}
                      </span>
                    </div>

                    <p className="text-xs font-semibold text-[#D4A853]">
                      🎯 {fol.requirement}
                    </p>

                    {fol.lastConversation && (
                      <p className="text-xs text-slate-500">
                        <strong className="text-slate-700">Last Talk:</strong> {fol.lastConversation}
                      </p>
                    )}

                    {fol.notes && (
                      <p className="text-xs text-slate-700 bg-slate-50 p-2 rounded-lg border border-slate-200/80 mt-1">
                        👉 <strong>Action Plan:</strong> {fol.notes}
                      </p>
                    )}
                  </div>
                </div>

                {/* Right Action buttons */}
                <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                  <a
                    href={`tel:${fol.phone}`}
                    className="p-2.5 rounded-xl bg-[#101D35] hover:bg-[#182B4D] text-[#D4A853] transition-colors"
                    title="Call Customer"
                  >
                    <Phone className="w-4 h-4" />
                  </a>

                  <a
                    href={`https://wa.me/91${fol.phone}?text=Namaste%20${fol.customerName}%20ji%2C%20following%20up%20from%20Pradhan%20Properties.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white transition-colors"
                    title="WhatsApp Chat"
                  >
                    <MessageSquare className="w-4 h-4" />
                  </a>

                  <button
                    onClick={() => onEditFollowup(fol)}
                    className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-600"
                    title="Edit Followup"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
