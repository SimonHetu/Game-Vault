"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AddGamePage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    platform: "PC",
    status: "A_JOUER",
    rating: "",
    imageUrl: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // TODO: Call addGame server action
    console.log("Form data:", formData);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Redirect to dashboard
    router.push("/dashboard");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Back button */}
        <Link
          href="/dashboard"
          className="inline-flex items-center text-cyan-400 hover:text-cyan-300 mb-8 transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Retour au dashboard
        </Link>

        {/* Form card */}
        <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 border border-slate-700/50 shadow-2xl">
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-lime-500/5 rounded-2xl"></div>

          <div className="relative z-10">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-lime-400 bg-clip-text text-transparent mb-2">
                Ajouter un jeu
              </h1>
              <p className="text-slate-400">
                Ajoutez un nouveau jeu à votre collection
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-slate-300 mb-2">
                  Titre du jeu <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                  placeholder="Ex: The Legend of Zelda: Breath of the Wild"
                />
              </div>

              {/* Platform */}
              <div>
                <label htmlFor="platform" className="block text-sm font-medium text-slate-300 mb-2">
                  Plateforme <span className="text-red-400">*</span>
                </label>
                <select
                  id="platform"
                  name="platform"
                  required
                  value={formData.platform}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                >
                  <option value="PC">💻 PC</option>
                  <option value="PS5">🎮 PlayStation 5</option>
                  <option value="XBOX">🎮 Xbox Series</option>
                  <option value="SWITCH">🕹️ Nintendo Switch</option>
                  <option value="MOBILE">📱 Mobile</option>
                  <option value="AUTRE">🎯 Autre</option>
                </select>
              </div>

              {/* Status */}
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-slate-300 mb-2">
                  Statut <span className="text-red-400">*</span>
                </label>
                <select
                  id="status"
                  name="status"
                  required
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                >
                  <option value="A_JOUER">📋 À jouer</option>
                  <option value="EN_COURS">🎯 En cours</option>
                  <option value="TERMINE">✅ Terminé</option>
                  <option value="ABANDONNE">❌ Abandonné</option>
                </select>
              </div>

              {/* Rating */}
              <div>
                <label htmlFor="rating" className="block text-sm font-medium text-slate-300 mb-2">
                  Note (1-5) <span className="text-slate-500 text-xs">(optionnel)</span>
                </label>
                <div className="flex items-center space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setFormData({ ...formData, rating: star.toString() })}
                      className={`text-3xl transition-all hover:scale-110 ${
                        parseInt(formData.rating) >= star
                          ? "text-yellow-400"
                          : "text-slate-600 hover:text-slate-500"
                      }`}
                    >
                      ★
                    </button>
                  ))}
                  {formData.rating && (
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, rating: "" })}
                      className="ml-4 text-sm text-slate-500 hover:text-slate-400"
                    >
                      Effacer
                    </button>
                  )}
                </div>
              </div>

              {/* Image URL */}
              <div>
                <label htmlFor="imageUrl" className="block text-sm font-medium text-slate-300 mb-2">
                  URL de l'image <span className="text-slate-500 text-xs">(optionnel)</span>
                </label>
                <input
                  type="url"
                  id="imageUrl"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              {/* Submit button */}
              <div className="flex items-center space-x-4 pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 group relative px-6 py-4 bg-gradient-to-r from-cyan-500 to-lime-500 text-black font-bold rounded-xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="relative z-10 flex items-center justify-center space-x-2">
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Ajout en cours...</span>
                      </>
                    ) : (
                      <>
                        <span className="text-xl">➕</span>
                        <span>Ajouter le jeu</span>
                      </>
                    )}
                  </span>
                  {!isSubmitting && (
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-lime-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  )}
                </button>

                <Link
                  href="/dashboard"
                  className="px-6 py-4 bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium rounded-xl border border-slate-700 transition-all"
                >
                  Annuler
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
