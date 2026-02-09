import Link from "next/link";

export default function HomePage() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Animated elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-4 h-4 bg-cyan-500 rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-20 w-3 h-3 bg-lime-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute bottom-20 left-1/4 w-2 h-2 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 right-1/3 w-3 h-3 bg-yellow-500 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }}></div>
        </div>

        <div className="relative max-w-5xl mx-auto text-center space-y-8">
          {/* Badge */}
          <div 
            className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-cyan-500/10 to-lime-500/10 border border-cyan-500/20 rounded-full animate-fade-in-up"
          >
            <span className="text-2xl">🎮</span>
            <span className="text-sm text-cyan-400 font-medium">Votre collection de jeux, organisée</span>
          </div>

          {/* Main heading */}
          <h1 
            className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight animate-fade-in-up-delay-1"
          >
            Gérez votre{" "}
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-cyan-400 via-lime-400 to-cyan-400 bg-clip-text text-transparent animate-pulse">
                bibliothèque
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-lime-500 blur-2xl opacity-30"></div>
            </span>
            {" "}de jeux vidéo
          </h1>

          {/* Description */}
          <p 
            className="text-xl sm:text-2xl text-slate-400 max-w-3xl mx-auto leading-relaxed animate-fade-in-up-delay-2"
          >
            Suivez votre progression, notez vos jeux favoris et découvrez ce que jouent les autres gamers.
            Tout en un seul endroit.
          </p>

          {/* CTA Buttons */}
          <div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 animate-fade-in-up-delay-3"
          >
            <Link
              href="/sign-up"
              className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-lime-500 text-black font-bold text-lg rounded-xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300"
            >
              <span className="relative z-10">Commencer gratuitement</span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-lime-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </Link>
            
            <Link
              href="/explore"
              className="px-8 py-4 bg-white/5 backdrop-blur-sm border border-cyan-500/30 text-cyan-400 font-bold text-lg rounded-xl hover:bg-white/10 hover:border-cyan-500/50 transition-all duration-300"
            >
              Explorer les collections
            </Link>
          </div>

          {/* Stats */}
          <div 
            className="grid grid-cols-3 gap-8 max-w-2xl mx-auto pt-12 animate-fade-in-up-delay-4"
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-400">1000+</div>
              <div className="text-sm text-slate-500 mt-1">Jeux catalogués</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-lime-400">50+</div>
              <div className="text-sm text-slate-500 mt-1">Utilisateurs actifs</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400">5★</div>
              <div className="text-sm text-slate-500 mt-1">Note moyenne</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Pourquoi <span className="gradient-text">GameVault</span> ?
            </h2>
            <p className="text-slate-400 text-lg">
              Toutes les fonctionnalités dont vous avez besoin pour gérer votre passion
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon="📊"
              title="Statistiques détaillées"
              description="Visualisez votre progression, vos notes moyennes et vos plateformes favorites"
              gradient="from-cyan-500 to-blue-600"
            />
            <FeatureCard
              icon="🌐"
              title="Collections publiques"
              description="Partagez votre bibliothèque et découvrez celle des autres gamers"
              gradient="from-lime-500 to-green-600"
            />
            <FeatureCard
              icon="⭐"
              title="Système de notation"
              description="Notez vos jeux et gardez une trace de vos coups de cœur"
              gradient="from-purple-500 to-pink-600"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative p-12 bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl border border-cyan-500/20 overflow-hidden">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-lime-500/10"></div>
            
            <div className="relative z-10 space-y-6">
              <h2 className="text-4xl font-bold">
                Prêt à organiser votre collection ?
              </h2>
              <p className="text-xl text-slate-400">
                Rejoignez GameVault maintenant et ne perdez plus jamais la trace de vos jeux
              </p>
              <Link
                href="/sign-up"
                className="inline-block px-8 py-4 bg-gradient-to-r from-cyan-500 to-lime-500 text-black font-bold text-lg rounded-xl shadow-lg hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105"
              >
                Créer mon compte gratuitement
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ 
  icon, 
  title, 
  description, 
  gradient 
}: { 
  icon: string; 
  title: string; 
  description: string; 
  gradient: string;
}) {
  return (
    <div className="group relative bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 border border-slate-700/50 hover:border-slate-600 transition-all duration-300 hover:transform hover:scale-105">
      {/* Glow on hover */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} blur-xl opacity-0 group-hover:opacity-20 transition-opacity rounded-2xl`}></div>
      
      <div className="relative z-10">
        <div className="text-5xl mb-4">{icon}</div>
        <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
        <p className="text-slate-400 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
