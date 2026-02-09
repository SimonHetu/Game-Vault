"use client";

import { statusLabels } from "@/lib/mockData";

interface StatsProps {
  totalGames: number;
  byStatus: {
    A_JOUER: number;
    EN_COURS: number;
    TERMINE: number;
    ABANDONNE: number;
  };
  averageRating: number;
  topPlatform: string;
}

export default function Stats({ totalGames, byStatus, averageRating, topPlatform }: StatsProps) {
  const stats = [
    {
      label: "Jeux total",
      value: totalGames,
      icon: "🎮",
      gradient: "from-cyan-500 to-blue-600",
      glow: "shadow-cyan-500/50",
    },
    {
      label: "Terminés",
      value: byStatus.TERMINE,
      icon: "✅",
      gradient: "from-lime-500 to-green-600",
      glow: "shadow-lime-500/50",
    },
    {
      label: "Note moyenne",
      value: averageRating > 0 ? averageRating.toFixed(1) : "—",
      icon: "⭐",
      gradient: "from-yellow-500 to-orange-600",
      glow: "shadow-yellow-500/50",
    },
    {
      label: "Plateforme #1",
      value: topPlatform,
      icon: "🏆",
      gradient: "from-purple-500 to-pink-600",
      glow: "shadow-purple-500/50",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div
          key={stat.label}
          className="group relative"
          style={{
            animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
          }}
        >
          {/* Glow effect */}
          <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} blur-xl opacity-20 group-hover:opacity-40 transition-opacity rounded-2xl`}></div>
          
          {/* Card */}
          <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 border border-slate-700/50 hover:border-slate-600 transition-all duration-300 hover:transform hover:scale-105">
            {/* Icon */}
            <div className="text-4xl mb-3 transform group-hover:scale-110 transition-transform">
              {stat.icon}
            </div>
            
            {/* Value */}
            <div className={`text-3xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-1`}>
              {stat.value}
            </div>
            
            {/* Label */}
            <div className="text-sm text-slate-400 font-medium">
              {stat.label}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// Status breakdown component
export function StatusBreakdown({ byStatus }: { byStatus: StatsProps['byStatus'] }) {
  const statusData = [
    { status: "EN_COURS", count: byStatus.EN_COURS, color: "from-cyan-500 to-blue-600", icon: "🎯" },
    { status: "A_JOUER", count: byStatus.A_JOUER, color: "from-slate-500 to-slate-700", icon: "📋" },
    { status: "TERMINE", count: byStatus.TERMINE, color: "from-lime-500 to-green-600", icon: "✅" },
    { status: "ABANDONNE", count: byStatus.ABANDONNE, color: "from-red-500 to-rose-600", icon: "❌" },
  ];

  const total = Object.values(byStatus).reduce((a, b) => a + b, 0);

  return (
    <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 border border-slate-700/50">
      <h3 className="text-xl font-bold text-white mb-6 flex items-center">
        <span className="mr-2">📊</span>
        Répartition par statut
      </h3>
      
      <div className="space-y-4">
        {statusData.map((item) => {
          const percentage = total > 0 ? (item.count / total) * 100 : 0;
          
          return (
            <div key={item.status}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <span className="text-xl">{item.icon}</span>
                  <span className="text-sm text-slate-300">
                    {statusLabels[item.status as keyof typeof statusLabels]}
                  </span>
                </div>
                <span className="text-sm font-bold text-white">
                  {item.count} <span className="text-slate-500">({percentage.toFixed(0)}%)</span>
                </span>
              </div>
              
              {/* Progress bar */}
              <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-r ${item.color} transition-all duration-1000 ease-out`}
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
