"use client";

import { useState } from "react";
import GameCard from "@/components/GameCard";
import { mockGames, platformLabels, statusLabels } from "@/lib/mockData";

export default function ExplorePage() {
  const [selectedPlatform, setSelectedPlatform] = useState<string>("ALL");
  const [selectedStatus, setSelectedStatus] = useState<string>("ALL");

  // Filter public games only
  const publicGames = mockGames.filter(game => game.isPublic);

  // Apply filters
  const filteredGames = publicGames.filter(game => {
    const platformMatch = selectedPlatform === "ALL" || game.platform === selectedPlatform;
    const statusMatch = selectedStatus === "ALL" || game.status === selectedStatus;
    return platformMatch && statusMatch;
  });

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-lime-400 bg-clip-text text-transparent">
            Explorer les collections
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Découvrez ce que jouent les autres membres de la communauté GameVault
          </p>
        </div>

        {/* Stats bar */}
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-6 border border-slate-700/50">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-cyan-400">{publicGames.length}</div>
              <div className="text-sm text-slate-400 mt-1">Jeux publics</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-lime-400">
                {new Set(publicGames.map(g => g.platform)).size}
              </div>
              <div className="text-sm text-slate-400 mt-1">Plateformes</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-400">
                {publicGames.filter(g => g.rating && g.rating >= 4).length}
              </div>
              <div className="text-sm text-slate-400 mt-1">Jeux 4★+</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-yellow-400">
                {(publicGames.filter(g => g.rating).reduce((acc, g) => acc + (g.rating || 0), 0) / publicGames.filter(g => g.rating).length || 0).toFixed(1)}
              </div>
              <div className="text-sm text-slate-400 mt-1">Note moyenne</div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 border border-slate-700/50">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center">
            <span className="mr-2">🔍</span>
            Filtres
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Platform filter */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Plateforme
              </label>
              <select
                value={selectedPlatform}
                onChange={(e) => setSelectedPlatform(e.target.value)}
                className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
              >
                <option value="ALL">Toutes les plateformes</option>
                {Object.entries(platformLabels).map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
            </div>

            {/* Status filter */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Statut
              </label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
              >
                <option value="ALL">Tous les statuts</option>
                {Object.entries(statusLabels).map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Active filters badge */}
          {(selectedPlatform !== "ALL" || selectedStatus !== "ALL") && (
            <div className="mt-4 flex items-center space-x-2">
              <span className="text-sm text-slate-400">Filtres actifs:</span>
              {selectedPlatform !== "ALL" && (
                <span className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs rounded-full">
                  {platformLabels[selectedPlatform as keyof typeof platformLabels]}
                </span>
              )}
              {selectedStatus !== "ALL" && (
                <span className="px-3 py-1 bg-lime-500/10 border border-lime-500/30 text-lime-400 text-xs rounded-full">
                  {statusLabels[selectedStatus as keyof typeof statusLabels]}
                </span>
              )}
              <button
                onClick={() => {
                  setSelectedPlatform("ALL");
                  setSelectedStatus("ALL");
                }}
                className="text-sm text-red-400 hover:text-red-300 underline"
              >
                Effacer
              </button>
            </div>
          )}
        </div>

        {/* Results count */}
        <div className="flex items-center justify-between">
          <p className="text-slate-400">
            {filteredGames.length} {filteredGames.length > 1 ? 'jeux trouvés' : 'jeu trouvé'}
          </p>
          
          {/* Sort dropdown - placeholder */}
          <select className="px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-slate-300 text-sm focus:outline-none focus:border-cyan-500 transition-all">
            <option>Trier par: Plus récents</option>
            <option>Trier par: Mieux notés</option>
            <option>Trier par: Titre A-Z</option>
          </select>
        </div>

        {/* Games grid */}
        {filteredGames.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGames.map((game, index) => (
              <div
                key={game.id}
                style={{
                  animation: `fadeInUp 0.5s ease-out ${index * 0.05}s both`
                }}
              >
                <GameCard {...game} showActions={false} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-white mb-2">
              Aucun jeu trouvé
            </h3>
            <p className="text-slate-400 mb-6">
              Essayez de modifier vos filtres pour voir plus de résultats
            </p>
            <button
              onClick={() => {
                setSelectedPlatform("ALL");
                setSelectedStatus("ALL");
              }}
              className="px-6 py-3 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 rounded-lg font-medium transition-all"
            >
              Réinitialiser les filtres
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
