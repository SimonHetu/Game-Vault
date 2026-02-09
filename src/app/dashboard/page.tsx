"use client";

import { useState } from "react";
import Link from "next/link";
import GameCard from "@/components/GameCard";
import Stats, { StatusBreakdown } from "@/components/Stats";
import { mockGames, mockStats } from "@/lib/mockData";

export default function DashboardPage() {
  const [games, setGames] = useState(mockGames);

  const handleDelete = (id: number) => {
    setGames(games.filter(game => game.id !== id));
    // TODO: Call deleteGame server action
  };

  const handleEdit = (id: number) => {
    // TODO: Navigate to edit page or open modal
    console.log("Edit game:", id);
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-lime-400 bg-clip-text text-transparent">
              Mon Dashboard
            </h1>
            <p className="text-slate-400 mt-2">
              Gérez votre collection de {games.length} {games.length > 1 ? 'jeux' : 'jeu'}
            </p>
          </div>
          
          <Link
            href="/dashboard/add"
            className="group relative px-6 py-3 bg-gradient-to-r from-cyan-500 to-lime-500 text-black font-bold rounded-xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300"
          >
            <span className="relative z-10 flex items-center space-x-2">
              <span className="text-xl">➕</span>
              <span>Ajouter un jeu</span>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-lime-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white flex items-center">
            <span className="mr-2">📊</span>
            Statistiques
          </h2>
          <Stats {...mockStats} />
        </div>

        {/* Status Breakdown */}
        <StatusBreakdown byStatus={mockStats.byStatus} />

        {/* Games Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white flex items-center">
              <span className="mr-2">🎮</span>
              Ma Collection
            </h2>
            
            {/* Quick filters - placeholder */}
            <div className="flex items-center space-x-2">
              <button className="px-4 py-2 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 rounded-lg text-sm font-medium transition-all">
                Tous
              </button>
              <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-400 border border-slate-700 rounded-lg text-sm font-medium transition-all">
                En cours
              </button>
              <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-400 border border-slate-700 rounded-lg text-sm font-medium transition-all">
                Terminés
              </button>
            </div>
          </div>

          {games.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {games.map((game, index) => (
                <div 
                  key={game.id}
                  style={{ 
                    animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both` 
                  }}
                >
                  <GameCard
                    {...game}
                    onDelete={handleDelete}
                    onEdit={handleEdit}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🎮</div>
              <h3 className="text-xl font-bold text-white mb-2">
                Aucun jeu dans votre collection
              </h3>
              <p className="text-slate-400 mb-6">
                Commencez par ajouter votre premier jeu !
              </p>
              <Link
                href="/dashboard/add"
                className="inline-block px-6 py-3 bg-gradient-to-r from-cyan-500 to-lime-500 text-black font-bold rounded-xl"
              >
                Ajouter un jeu
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
