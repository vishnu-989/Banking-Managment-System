import React, { useState } from 'react';
import { useBank } from '../../context/BankContext';
import { MessageSquare, PlusCircle, Send, CheckCircle2, User } from 'lucide-react';

export const SupportTickets = () => {
  const { currentUser, supportTickets, submitSupportTicket, replySupportTicket } = useBank();
  
  const [selectedTicketId, setSelectedTicketId] = useState('');
  const [isNewTicketModal, setIsNewTicketModal] = useState(false);

  // New Ticket Form state
  const [subject, setSubject] = useState('');
  const [category, setCategory] = useState('General Inquiry');
  const [priority, setPriority] = useState('Medium');
  const [messageText, setMessageText] = useState('');
  
  // Reply message text
  const [replyText, setReplyText] = useState('');

  if (!currentUser) return null;

  const myTickets = supportTickets.filter(t => t.customerId === currentUser.id);
  const selectedTicket = myTickets.find(t => t.id === selectedTicketId) || myTickets[0];

  const handleCreateTicketSubmit = (e) => {
    e.preventDefault();
    if (!subject || !messageText) {
      alert("Please fill in ticket subject and details.");
      return;
    }

    const tck = submitSupportTicket({
      subject,
      category,
      priority,
      text: messageText
    });

    setSelectedTicketId(tck.id);
    setSubject('');
    setMessageText('');
    setIsNewTicketModal(false);
  };

  const handleSendReply = (e) => {
    e.preventDefault();
    if (!replyText || !selectedTicket) return;

    replySupportTicket(selectedTicket.id, replyText);
    setReplyText('');
  };

  return (
    <div className="max-w-7xl mx-auto py-4 space-y-6">
      
      {/* Banner */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
              <MessageSquare className="h-5 w-5" />
            </div>
            <h2 className="text-xl font-extrabold text-white">24/7 Customer Help Desk & Tickets</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Submit service requests, ask account queries, or report issues directly to bank support specialists.
          </p>
        </div>

        <button
          onClick={() => setIsNewTicketModal(true)}
          className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 flex items-center gap-2 transition"
        >
          <PlusCircle className="h-4 w-4" />
          <span>Open Support Ticket</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Tickets Queue List */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">My Support Tickets</h3>

          <div className="space-y-3">
            {myTickets.length === 0 ? (
              <div className="glass-panel p-6 text-center text-xs text-slate-500 rounded-2xl border border-slate-800">
                No support tickets found. Click "Open Support Ticket" above to get help.
              </div>
            ) : (
              myTickets.map((tck) => (
                <div
                  key={tck.id}
                  onClick={() => setSelectedTicketId(tck.id)}
                  className={`p-4 rounded-2xl border cursor-pointer transition ${
                    selectedTicket?.id === tck.id 
                      ? 'bg-indigo-950/40 border-indigo-500/50 shadow-lg' 
                      : 'glass-panel border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-xs font-bold text-slate-100">{tck.subject}</h4>
                      <p className="text-[10px] text-indigo-400 font-mono">{tck.id} • {tck.category}</p>
                    </div>
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                      tck.status === 'Open' ? 'bg-amber-500/10 text-amber-400' : 'bg-emerald-500/10 text-emerald-400'
                    }`}>
                      {tck.status}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-2">Opened: {tck.createdDate}</p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right 2 Columns: Live Chat Thread */}
        <div className="lg:col-span-2 space-y-4">
          {selectedTicket ? (
            <div className="glass-panel rounded-3xl border border-slate-800 overflow-hidden flex flex-col h-[520px]">
              
              {/* Thread Header */}
              <div className="p-4 bg-slate-900/80 border-b border-slate-800 flex justify-between items-center">
                <div>
                  <h3 className="text-sm font-bold text-white">{selectedTicket.subject}</h3>
                  <p className="text-[10px] text-slate-400 font-mono">Ticket #{selectedTicket.id} • Category: {selectedTicket.category}</p>
                </div>
                <span className="text-xs text-indigo-400 font-semibold bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
                  Assigned Staff: {selectedTicket.assignedTo}
                </span>
              </div>

              {/* Chat Messages Body */}
              <div className="flex-1 p-4 overflow-y-auto space-y-3">
                {selectedTicket.messages.map((m, i) => (
                  <div 
                    key={i}
                    className={`max-w-[80%] p-3.5 rounded-2xl text-xs space-y-1 ${
                      m.sender.includes(currentUser.name) 
                        ? 'ml-auto bg-indigo-600 text-white rounded-br-none shadow-md' 
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
                  placeholder="Type your message reply..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  className="flex-1 px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-1.5 transition"
                >
                  <Send className="h-3.5 w-3.5" />
                  <span>Send</span>
                </button>
              </form>

            </div>
          ) : (
            <div className="glass-panel p-12 text-center text-slate-500 rounded-3xl border border-slate-800">
              Select a support ticket to view discussion thread.
            </div>
          )}
        </div>

      </div>

      {/* New Ticket Modal */}
      {isNewTicketModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="w-full max-w-md glass-panel rounded-3xl border border-slate-700 p-6 space-y-4 shadow-2xl">
            <h3 className="text-base font-bold text-white">Create New Support Ticket</h3>

            <form onSubmit={handleCreateTicketSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Subject</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Card transaction inquiry"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Wire Transfer">Wire Transfer</option>
                    <option value="Card Services">Card Services</option>
                    <option value="Cheque Services">Cheque Services</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Priority</label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High Urgent</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Detailed Query</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Describe your inquiry or issue..."
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsNewTicketModal(false)}
                  className="w-1/2 py-2.5 rounded-xl bg-slate-800 text-slate-300 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 rounded-xl bg-indigo-600 text-white font-bold shadow-lg"
                >
                  Submit Ticket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
