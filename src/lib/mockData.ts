// Mock data for frontend development
export const mockGames = [
  {
    id: 1,
    title: "The Legend of Zelda: Breath of the Wild",
    platform: "SWITCH" as const,
    status: "TERMINE" as const,
    rating: 5,
    imageUrl: null,
    isPublic: true,
    createdAt: new Date("2024-01-15")
  },
  {
    id: 2,
    title: "Elden Ring",
    platform: "PC" as const,
    status: "EN_COURS" as const,
    rating: 5,
    imageUrl: null,
    isPublic: true,
    createdAt: new Date("2024-02-10")
  },
  {
    id: 3,
    title: "God of War Ragnarök",
    platform: "PS5" as const,
    status: "TERMINE" as const,
    rating: 4,
    imageUrl: null,
    isPublic: true,
    createdAt: new Date("2024-01-20")
  },
  {
    id: 4,
    title: "Hades",
    platform: "SWITCH" as const,
    status: "A_JOUER" as const,
    rating: null,
    imageUrl: null,
    isPublic: true,
    createdAt: new Date("2024-03-01")
  },
  {
    id: 5,
    title: "Cyberpunk 2077",
    platform: "PC" as const,
    status: "ABANDONNE" as const,
    rating: 3,
    imageUrl: null,
    isPublic: false,
    createdAt: new Date("2023-12-05")
  }
];

export const mockStats = {
  totalGames: 5,
  byStatus: {
    A_JOUER: 1,
    EN_COURS: 1,
    TERMINE: 2,
    ABANDONNE: 1
  },
  averageRating: 4.25,
  topPlatform: "SWITCH"
};

export const platformLabels = {
  PC: "PC",
  PS5: "PlayStation 5",
  XBOX: "Xbox Series",
  SWITCH: "Nintendo Switch",
  MOBILE: "Mobile",
  AUTRE: "Autre"
};

export const statusLabels = {
  A_JOUER: "À jouer",
  EN_COURS: "En cours",
  TERMINE: "Terminé",
  ABANDONNE: "Abandonné"
};

export const statusColors = {
  A_JOUER: "bg-slate-600",
  EN_COURS: "bg-cyan-500",
  TERMINE: "bg-lime-500",
  ABANDONNE: "bg-red-500"
};
