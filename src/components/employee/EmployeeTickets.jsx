import React, { useState } from 'react';
import { useBank } from '../../context/BankContext';
import { MessageSquare, Send, CheckCircle2, User, Clock } from 'lucide-react';

export const EmployeeTickets = () => {
  const { currentUser, supportTickets, replySupportTicket, updateTicketStatus } = useBank();
  
  const [selectedTicketId, setSelectedTicketId] = useState('');
  const [replyText, setReplyText] = useState('');

  const selectedTicket = supportTickets.find(t => t.id === selectedTicketId) || supportTickets[0];

  const handleSendReply = (e) => {
    e.preventDefault();
    if (!replyText || !selectedTicket) return;

    replySupportTicket(selectedTicket.id, replyText);
    setReplyText('');
  };

  return (
    <div className="max-w-7xl mx-auto py-4 space-y-6">
      
      {/* Banner */}
      <div className="glass-panel p-6 rounded-3xl border border-teal-500/20 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-teal-600/20 text-teal-400 border border-teal-500/30">
              <MessageSquare className="h-5 w-5" />
            </div>
            <h2 className="text-xl font-extrabold text-white">Staff Support Tickets Console</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Answer customer inquiries, provide account assistance, and resolve tickets.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Tickets Queue List */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">All Customer Support Tickets ({supportTickets.length})</h3>

          <div className="space-y-3">
            {supportTickets.map((tck) => (
              <div
                key={tck.id}
                onClick={() => setSelectedTicketId(tck.id)}
                className={`p-4 rounded-2xl border cursor-pointer transition ${
                  selectedTicket?.id === tck.id 
                    ? 'bg-teal-950/40 border-teal-500/50 shadow-lg' 
                    : 'glass-panel border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-xs font-bold text-slate-100">{tck.customerName}</h4>
                    <p className="text-[10px] text-teal-400 font-mono">{tck.id} • {tck.subject}</p>
                  </div>
                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                    tck.status === 'Open' ? 'bg-amber-500/10 text-amber-400' : 'bg-emerald-500/10 text-emerald-400'
                  }`}>
                    {tck.status}
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 mt-2">Opened: {tck.createdDate}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right 2 Columns: Live Chat Thread & Status Controls */}
        <div className="lg:col-span-2 space-y-4">
          {selectedTicket ? (
            <div className="glass-panel rounded-3xl border border-slate-800 overflow-hidden flex flex-col h-[550px]">
              
              {/* Thread Header */}
              <div className="p-4 bg-slate-900/80 border-b border-slate-800 flex justify-between items-center">
                <div>
                  <h3 className="text-sm font-bold text-white">{selectedTicket.subject}</h3>
                  <p className="text-[10px] text-slate-400 font-mono">Ticket #{selectedTicket.id} • Customer: {selectedTicket.customerName}</p>
                </div>

                <button
                  onClick={() => updateTicketStatus(selectedTicket.id, selectedTicket.status === 'Open' ? 'Resolved' : 'Open')}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition ${
                    selectedTicket.status === 'Open'
                      ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                      : 'bg-amber-600 hover:bg-amber-500 text-white'
                  }`}
                >
                  {selectedTicket.status === 'Open' ? 'Mark Resolved' : 'Re-Open Ticket'}
                </button>
              </div>

              {/* Chat Messages Body */}
              <div className="flex-1 p-4 overflow-y-auto space-y-3">
                {selectedTicket.messages.map((m, i) => (
                  <div 
                    key={i}
                    className={`max-w-[80%] p-3.5 rounded-2xl text-xs space-y-1 ${
                      m.sender.includes(currentUser.name) || m.sender.includes('Staff')
                        ? 'ml-auto bg-teal-600 text-white rounded-br-none shadow-md' 
                        : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-bl-none'
                    }`}
                  >
                    <div className="flex justify-between items-center text-[10px] opacity-80 font-bold mb-1">
                      <span>{m.sender}</span>
                      <span>{m.time}</span>
                    </div>
                    <p className="leading-relaxed font-medium">{m.text}</p>
                  </div>
                ))}
              </div>

              {/* Reply Box */}
              <form onSubmit={handleSendReply} className="p-3 bg-slate-900/80 border-t border-slate-800 flex gap-2">
                <input
                  type="text"
                  placeholder="Type staff response..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  className="flex-1 px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-teal-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs flex items-center gap-1.5 transition"
                >
                  <Send className="h-3.5 w-3.5" />
                  <span>Reply</span>
                </button>
              </form>

            </div>
          ) : (
            <div className="glass-panel p-12 text-center text-slate-500 rounded-3xl border border-slate-800">
              Select a customer ticket to inspect and reply.
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
