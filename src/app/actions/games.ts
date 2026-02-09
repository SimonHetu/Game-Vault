"use server";
import { prisma } from "../../lib/prisma/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import type { GameStatus, Platform } from "../../generated/prisma";

// Forme attendue pour créer/modifier un jeu
export interface GameFormData {
  title: string;
  platform: Platform;
  status: GameStatus;
  rating?: number | null;
  imageUrl?: string | null;
  isPublic?: boolean;
}


// Vérifie la session Clerk et retourne l’ID utilisateur
async function requireUserId() {
  const { userId } = await auth();
  if (!userId) throw new Error("Not authenticated");
  return userId;
}


// CREATE: Ajoute un jeu lié à l’utilisateur courant puis revalide le dashboard
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


// GET : Récupère tous les jeux de l’utilisateur connecté
export async function getUserGames() {
  const userId = await requireUserId();

  return prisma.game.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
}


// DELETE : Supprime un jeu seulement s’il appartient à l’utilisateur
export async function deleteGame(gameId: number) {
  const userId = await requireUserId();

  const game = await prisma.game.findUnique({ where: { id: gameId } });
  if (!game || game.userId !== userId) throw new Error("Forbidden");

  await prisma.game.delete({ where: { id: gameId } });
  revalidatePath("/dashboard");
}


// UPDATE : met à jour un jeu de l’utilisateur 
export async function updateGame(gameId: number, data: Partial<GameFormData>) {
  const userId = await requireUserId();

  const game = await prisma.game.findUnique({ where: { id: gameId } });
  if (!game || game.userId !== userId) throw new Error("Forbidden");

  await prisma.game.update({
    where: { id: gameId },
    data,
  });

  revalidatePath("/dashboard");
}


// GET: Récupère les jeux publics pour la page Explore
export async function getPublicGames() {
  return prisma.game.findMany({
    where: { isPublic: true },
    orderBy: { createdAt: "desc" },
    take: 200,
  });
}
