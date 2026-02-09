import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ClerkProvider } from "@clerk/nextjs";
import { frFR } from "@clerk/localizations";

export const metadata: Metadata = {
  title: "GameVault - Gérez votre collection de jeux",
  description: "Application de gestion de collection de jeux vidéo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider localization={frFR}>
      <html lang="fr">
        <body className="antialiased">
          {/* Background */}
          <div className="fixed inset-0 bg-black">
            {/* Gradient mesh background */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-black to-slate-950"></div>
            
            {/* Animated grid */}
            <div className="absolute inset-0 opacity-20" style={{
              backgroundImage: `
                linear-gradient(to right, rgb(6 182 212 / 0.1) 1px, transparent 1px),
                linear-gradient(to bottom, rgb(6 182 212 / 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px',
            }}></div>
            
            {/* Glow orbs */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-lime-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>

          {/* Content */}
          <div className="relative z-10">
            <Navbar />
            <main className="pt-16 min-h-screen">
              {children}
            </main>
            
            {/* Footer */}
            <footer className="relative border-t border-slate-800 bg-black/50 backdrop-blur-sm">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="text-center">
                  <p className="text-slate-400 text-sm">
                    © 2026 GameVault - Projet Services Web - Collège de Maisonneuve
                  </p>
                  <p className="text-slate-600 text-xs mt-2">
                    Made with 💜 by votre équipe
                  </p>
                </div>
              </div>
            </footer>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}