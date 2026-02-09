"use client";

import Link from "next/link";
import { useState } from "react";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-cyan-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-lime-500 blur-lg opacity-50 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative bg-gradient-to-r from-cyan-500 to-lime-500 p-2 rounded-lg">
                <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                </svg>
              </div>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-lime-400 bg-clip-text text-transparent">
              GameVault
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <NavLink href="/">Accueil</NavLink>
            <NavLink href="/dashboard">Dashboard</NavLink>
            <NavLink href="/explore">Explorer</NavLink>
          </div>

          {/* Auth Section */}
          <div className="hidden md:flex items-center space-x-4">
            <SignedOut>
              <div className="flex items-center space-x-3">
                <Link
                  href="/sign-in"
                  className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  Connexion
                </Link>
                <Link
                  href="/sign-up"
                  className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-lime-500 text-black font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
                >
                  S'inscrire
                </Link>
              </div>
            </SignedOut>

            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-cyan-400 hover:bg-cyan-500/10 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-2 border-t border-cyan-500/20">
            <MobileNavLink href="/">Accueil</MobileNavLink>
            <MobileNavLink href="/dashboard">Dashboard</MobileNavLink>
            <MobileNavLink href="/explore">Explorer</MobileNavLink>
            
            <SignedOut>
              <div className="pt-4 space-y-2">
                <Link
                  href="/sign-in"
                  className="block w-full text-center py-2 text-cyan-400 hover:bg-cyan-500/10 rounded-lg transition-colors"
                >
                  Connexion
                </Link>
                <Link
                  href="/sign-up"
                  className="block w-full text-center py-2 bg-gradient-to-r from-cyan-500 to-lime-500 text-black font-semibold rounded-lg"
                >
                  S'inscrire
                </Link>
              </div>
            </SignedOut>

            <SignedIn>
              <div className="pt-4 flex justify-center">
                <UserButton afterSignOutUrl="/" />
              </div>
            </SignedIn>
          </div>
        )}
      </div>
    </nav>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="px-4 py-2 text-sm text-slate-300 hover:text-cyan-400 hover:bg-cyan-500/10 rounded-lg transition-all"
    >
      {children}
    </Link>
  );
}

function MobileNavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="block px-4 py-2 text-slate-300 hover:text-cyan-400 hover:bg-cyan-500/10 rounded-lg transition-colors"
    >
      {children}
    </Link>
  );
}