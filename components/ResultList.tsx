import React, { useState, useMemo } from 'react';
import { Result, GroupColor, EventType, GROUPS, EVENT_TYPES } from '../types';
import { Search, Filter } from 'lucide-react';

interface ResultListProps {
  results: Result[];
}

export const ResultList: React.FC<ResultListProps> = ({ results }) => {
  const [groupFilter, setGroupFilter] = useState<GroupColor | 'All'>('All');
  const [eventFilter, setEventFilter] = useState<EventType | 'All'>('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredResults = useMemo(() => {
    return results.filter(r => {
      const matchesGroup = groupFilter === 'All' || r.group === groupFilter;
      const matchesEvent = eventFilter === 'All' || r.eventType === eventFilter;
      const matchesSearch = 
        r.studentName.toLowerCase().includes(searchTerm.toLowerCase()) || 
        r.eventName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.regNo.toLowerCase().includes(searchTerm.toLowerCase());
      
      return matchesGroup && matchesEvent && matchesSearch;
    });
  }, [results, groupFilter, eventFilter, searchTerm]);

  const getBadgeColor = (group: GroupColor) => {
    switch(group) {
      case 'Green': return 'bg-green-100 text-green-800 border-green-200';
      case 'Red': return 'bg-red-100 text-red-800 border-red-200';
      case 'Blue': return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  const getPositionStyle = (pos: string) => {
    switch(pos) {
      case '1st': return 'text-yellow-600 font-bold';
      case '2nd': return 'text-slate-500 font-bold';
      case '3rd': return 'text-amber-700 font-bold';
      default: return 'text-slate-400';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden">
      {/* Filters Header */}
      <div className="p-4 border-b border-slate-100 bg-slate-50 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0">
          
          {/* Search */}
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search student, reg no, or event..." 
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Group Filter */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-1 md:pb-0">
            <Filter className="h-4 w-4 text-slate-400 flex-shrink-0" />
            <button 
              onClick={() => setGroupFilter('All')}
              className={`px-3 py-1.5 text-xs font-medium rounded-full whitespace-nowrap transition-colors ${groupFilter === 'All' ? 'bg-slate-800 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'}`}
            >
              All Groups
            </button>
            {GROUPS.map(g => (
              <button 
                key={g}
                onClick={() => setGroupFilter(g)}
                className={`px-3 py-1.5 text-xs font-medium rounded-full whitespace-nowrap transition-colors ${groupFilter === g ? getBadgeColor(g).replace('text', 'bg').replace('bg', 'text-white bg') : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'}`}
              >
                {g}
              </button>
            ))}
          </div>

          {/* Event Filter */}
          <div className="flex items-center space-x-2">
            <select 
              className="px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              value={eventFilter}
              onChange={(e) => setEventFilter(e.target.value as EventType | 'All')}
            >
              <option value="All">All Events</option>
              {EVENT_TYPES.map(e => <option key={e} value={e}>{e}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Results Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Rank</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Student</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Group</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Event</th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Points</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {filteredResults.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-slate-400">
                  <p className="text-base">No results found matching your criteria.</p>
                </td>
              </tr>
            ) : (
              filteredResults.map((result) => (
                <tr key={result.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`text-sm ${getPositionStyle(result.position)}`}>
                      {result.position}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-slate-900">{result.studentName}</span>
                      <span className="text-xs text-slate-500">#{result.regNo}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full border ${getBadgeColor(result.group)}`}>
                      {result.group}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col">
                      <span className="text-sm text-slate-900">{result.eventName}</span>
                      <span className="text-xs text-slate-400 uppercase tracking-wide">{result.eventType}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-bold text-slate-900">
                    {result.points}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};