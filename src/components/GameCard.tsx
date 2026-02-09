"use client";

import { statusLabels, platformLabels } from "@/lib/mockData";

interface GameCardProps {
  id: number;
  title: string;
  platform: "PC" | "PS5" | "XBOX" | "SWITCH" | "MOBILE" | "AUTRE";
  status: "A_JOUER" | "EN_COURS" | "TERMINE" | "ABANDONNE";
  rating: number | null;
  imageUrl?: string | null;
  onDelete?: (id: number) => void;
  onEdit?: (id: number) => void;
  showActions?: boolean;
}

export default function GameCard({
  id,
  title,
  platform,
  status,
  rating,
  imageUrl,
  onDelete,
  onEdit,
  showActions = true,
}: GameCardProps) {
  const statusColors = {
    A_JOUER: "from-slate-500 to-slate-700",
    EN_COURS: "from-cyan-500 to-blue-600",
    TERMINE: "from-lime-500 to-green-600",
    ABANDONNE: "from-red-500 to-rose-600",
  };

  const platformIcons = {
    PC: "💻",
    PS5: "🎮",
    XBOX: "🎮",
    SWITCH: "🕹️",
    MOBILE: "📱",
    AUTRE: "🎯",
  };

  return (
    <div className="group relative bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl overflow-hidden border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20">
      {/* Status Badge */}
      <div className={`absolute top-3 right-3 z-10 px-3 py-1 rounded-full bg-gradient-to-r ${statusColors[status]} text-xs font-bold text-white shadow-lg`}>
        {statusLabels[status]}
      </div>

      {/* Game Image or Placeholder */}
      <div className="relative h-48 bg-gradient-to-br from-slate-800 to-slate-900 overflow-hidden">
        {imageUrl ? (
          <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-6xl opacity-20">🎮</div>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-60"></div>
      </div>

      {/* Content */}
      <div className="p-5 space-y-3">
        {/* Title */}
        <h3 className="text-lg font-bold text-white line-clamp-2 min-h-[3.5rem]">
          {title}
        </h3>

        {/* Platform */}
        <div className="flex items-center space-x-2">
          <span className="text-2xl">{platformIcons[platform]}</span>
          <span className="text-sm text-slate-400">{platformLabels[platform]}</span>
        </div>

        {/* Rating */}
        <div className="flex items-center space-x-1">
          {rating ? (
            <>
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-5 h-5 ${
                    i < rating ? "text-yellow-400" : "text-slate-600"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="ml-2 text-sm text-slate-400">({rating}/5)</span>
            </>
          ) : (
            <span className="text-sm text-slate-500 italic">Non noté</span>
          )}
        </div>

        {/* Actions */}
        {showActions && (
          <div className="flex items-center space-x-2 pt-2">
            <button
              onClick={() => onEdit?.(id)}
              className="flex-1 px-4 py-2 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 rounded-lg text-sm font-medium transition-all hover:shadow-lg hover:shadow-cyan-500/20"
            >
              Modifier
            </button>
            <button
              onClick={() => {
                if (confirm(`Supprimer "${title}" ?`)) {
                  onDelete?.(id);
                }
              }}
              className="flex-1 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 rounded-lg text-sm font-medium transition-all hover:shadow-lg hover:shadow-red-500/20"
            >
              Supprimer
            </button>
          </div>
        )}
      </div>

      {/* Hover effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-lime-500/0 group-hover:from-cyan-500/5 group-hover:to-lime-500/5 pointer-events-none transition-all duration-300"></div>
    </div>
  );
}
