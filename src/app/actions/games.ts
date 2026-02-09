"use server";

import { prisma } from "../../lib/prisma/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import type { GameStatus, Platform } from "../../generated/prisma";


// Structure des informations envoyées par le formulaire
export interface GameFormData {
  title: string;
  platform: Platform;
  status: GameStatus;
  rating?: number | null;
  imageUrl?: string | null;
  isPublic?: boolean;
}

// Vérifie que l’utilisateur est connecté
async function requireUserId() {
  const { userId } = await auth();
  if (!userId) throw new Error("Not authenticated");
  return userId;
}


// ADD: Ajoute un jeu pour l’utilisateur courant
export async function addGame(data: GameFormData) {
  const userId = await requireUserId();

  await prisma.game.create({
    data: {
      title: data.title.trim(),
      platform: data.platform,
      status: data.status,
      rating: data.rating ?? null,
      imageUrl: data.imageUrl ?? null,
      isPublic: data.isPublic ?? true,
      userId,
    },
  });

  revalidatePath("/dashboard");
}

// GET: Récupère la collection personnelle de l’utilisateur.
export async function getUserGames() {
  const userId = await requireUserId();

  return prisma.game.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
}

// DELETE: Supprime un jeu seulement s’il appartient à l’utilisateur
export async function deleteGame(gameId: number) {
  const userId = await requireUserId();

  const game = await prisma.game.findUnique({ where: { id: gameId } });
  if (!game || game.userId !== userId) throw new Error("Forbidden");

  await prisma.game.delete({ where: { id: gameId } });
  revalidatePath("/dashboard");
}

// UPDATE: Modifie les informations d’un jeu existant
export async function updateGame(gameId: number, data: Partial<GameFormData>) {
  const userId = await requireUserId();

  const game = await prisma.game.findUnique({ where: { id: gameId } });
  if (!game || game.userId !== userId) throw new Error("Forbidden");

  await prisma.game.update({
    where: { id: gameId },
    data: {
      ...(data.title !== undefined ? { title: data.title.trim() } : {}),
      ...(data.platform !== undefined ? { platform: data.platform } : {}),
      ...(data.status !== undefined ? { status: data.status } : {}),
      ...(data.rating !== undefined ? { rating: data.rating } : {}),
      ...(data.imageUrl !== undefined ? { imageUrl: data.imageUrl } : {}),
      ...(data.isPublic !== undefined ? { isPublic: data.isPublic } : {}),
    },
  });

  revalidatePath("/dashboard");
}

// Retourne les jeux visibles par tous pour la page d’exploration
export async function getPublicGames() {
  return prisma.game.findMany({
    where: { isPublic: true },
    orderBy: { createdAt: "desc" },
    take: 200,
  });
}
