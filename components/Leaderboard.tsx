import React, { useMemo } from 'react';
import { Result, GroupScore, GroupColor, GROUPS } from '../types';
import { Trophy, Medal } from 'lucide-react';

interface LeaderboardProps {
  results: Result[];
}

export const Leaderboard: React.FC<LeaderboardProps> = ({ results }) => {
  const scores: GroupScore[] = useMemo(() => {
    const scoresMap: Record<GroupColor, number> = {
      Green: 0,
      Red: 0,
      Blue: 0
    };

    results.forEach(r => {
      if (scoresMap[r.group] !== undefined) {
        scoresMap[r.group] += r.points;
      }
    });

    return GROUPS.map(g => ({
      group: g,
      totalPoints: scoresMap[g]
    })).sort((a, b) => b.totalPoints - a.totalPoints);
  }, [results]);

  const getRankIcon = (index: number) => {
    if (index === 0) return <Trophy className="h-8 w-8 text-yellow-400" fill="currentColor" />;
    if (index === 1) return <Medal className="h-8 w-8 text-slate-300" />;
    if (index === 2) return <Medal className="h-8 w-8 text-amber-700" />;
    return null;
  };

  const getBgColor = (group: GroupColor) => {
    switch (group) {
      case 'Green': return 'bg-green-600';
      case 'Red': return 'bg-red-600';
      case 'Blue': return 'bg-blue-600';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
      {scores.map((score, index) => (
        <div 
          key={score.group}
          className={`relative overflow-hidden rounded-2xl shadow-xl transform transition-transform hover:scale-105 ${index === 0 ? 'md:-mt-4 ring-4 ring-yellow-400 z-10' : 'z-0'}`}
        >
          <div className={`${getBgColor(score.group)} p-6 text-white h-full flex flex-col items-center justify-center min-h-[160px]`}>
            <div className="absolute top-4 right-4 opacity-50">
              {getRankIcon(index)}
            </div>
            
            <h2 className="text-3xl font-black tracking-wider uppercase mb-2 drop-shadow-md">
              {score.group}
            </h2>
            <div className="flex items-baseline space-x-1">
              <span className="text-5xl font-extrabold">{score.totalPoints}</span>
              <span className="text-lg font-medium opacity-80">pts</span>
            </div>
            {index === 0 && (
              <div className="mt-4 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-bold tracking-wide">
                CURRENT LEADER
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};