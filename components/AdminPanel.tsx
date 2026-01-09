import React, { useState } from 'react';
import { Result, GROUPS, EVENT_TYPES, POSITIONS, POINTS_MAP, GroupColor, EventType, Position } from '../types';
import { addResult, deleteResult } from '../services/dataService';
import { Trash2, PlusCircle, AlertCircle } from 'lucide-react';

interface AdminPanelProps {
  results: Result[];
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ results }) => {
  const [formData, setFormData] = useState({
    studentName: '',
    regNo: '',
    group: 'Green' as GroupColor,
    eventName: '',
    eventType: 'Athletics' as EventType,
    position: '1st' as Position,
    points: 5
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const handlePositionChange = (pos: Position) => {
    setFormData({
      ...formData,
      position: pos,
      points: POINTS_MAP[pos]
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addResult({
        ...formData,
        timestamp: Date.now()
      });
      setSuccessMsg('Result added successfully!');
      setFormData({
        ...formData,
        studentName: '',
        regNo: '',
        eventName: ''
      });
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (error) {
      console.error(error);
      alert("Failed to add result");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this result? This cannot be undone.')) {
      await deleteResult(id);
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Add New Result Form */}
      <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6 md:p-8">
        <div className="flex items-center space-x-2 mb-6 border-b border-slate-100 pb-4">
          <PlusCircle className="h-6 w-6 text-blue-600" />
          <h2 className="text-xl font-bold text-slate-900">Add New Result</h2>
        </div>

        {successMsg && (
          <div className="mb-6 p-4 bg-green-50 text-green-700 border border-green-200 rounded-lg flex items-center">
            <span className="font-medium">{successMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1">
            <label className="block text-sm font-medium text-slate-700">Student Name</label>
            <input 
              required
              type="text" 
              className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
              placeholder="e.g. John Doe"
              value={formData.studentName}
              onChange={e => setFormData({...formData, studentName: e.target.value})}
            />
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-slate-700">Register Number</label>
            <input 
              required
              type="text" 
              className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
              placeholder="e.g. 123456"
              value={formData.regNo}
              onChange={e => setFormData({...formData, regNo: e.target.value})}
            />
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-slate-700">Group</label>
            <div className="grid grid-cols-3 gap-2">
              {GROUPS.map(g => (
                <button
                  key={g}
                  type="button"
                  onClick={() => setFormData({...formData, group: g})}
                  className={`py-2 px-3 rounded-lg text-sm font-medium border ${formData.group === g 
                    ? (g === 'Green' ? 'bg-green-600 text-white border-green-600' : g === 'Red' ? 'bg-red-600 text-white border-red-600' : 'bg-blue-600 text-white border-blue-600')
                    : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-50'}`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-slate-700">Event Type</label>
            <select 
              className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 bg-white"
              value={formData.eventType}
              onChange={e => setFormData({...formData, eventType: e.target.value as EventType})}
            >
              {EVENT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>

          <div className="space-y-1 md:col-span-2">
            <label className="block text-sm font-medium text-slate-700">Event Name</label>
            <input 
              required
              type="text" 
              className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
              placeholder="e.g. 100m Sprint, Football, Chess"
              value={formData.eventName}
              onChange={e => setFormData({...formData, eventName: e.target.value})}
            />
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-slate-700">Position</label>
            <select 
              className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 bg-white"
              value={formData.position}
              onChange={e => handlePositionChange(e.target.value as Position)}
            >
              {POSITIONS.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-slate-700">Points (Auto-filled)</label>
            <input 
              required
              type="number" 
              className="w-full px-4 py-2 rounded-lg border border-slate-300 bg-slate-50 focus:ring-2 focus:ring-blue-500"
              value={formData.points}
              onChange={e => setFormData({...formData, points: parseInt(e.target.value) || 0})}
            />
          </div>

          <div className="md:col-span-2 pt-4">
            <button 
              type="submit" 
              disabled={loading}
              className="w-full md:w-auto px-8 py-3 bg-slate-900 text-white rounded-lg hover:bg-slate-800 font-bold shadow-md transition-transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Saving...' : 'Add Result to Leaderboard'}
            </button>
          </div>
        </form>
      </div>

      {/* Existing Results Management */}
      <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center space-x-2 bg-slate-50">
          <AlertCircle className="h-5 w-5 text-slate-500" />
          <h3 className="font-semibold text-slate-700">Manage Existing Results</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Student</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Event</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Group</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Pos</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {results.map(r => (
                <tr key={r.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">{r.studentName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{r.eventName}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                     <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-slate-100 text-slate-800`}>
                      {r.group}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{r.position}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button 
                      onClick={() => handleDelete(r.id)}
                      className="text-red-600 hover:text-red-900 bg-red-50 p-2 rounded-full hover:bg-red-100 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {results.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-slate-400">
                    No results added yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};