import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center bg-gradient-to-br from-gray-50 to-white overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-5">
          <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-6 py-20 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left content */}
            <div className="space-y-8">
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
                Ton <span className="text-primary relative">
                  avenir
                  <div className="absolute bottom-2 left-0 w-full h-4 bg-secondary opacity-30 -z-10"></div>
                </span> commence ici
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed">
                La plateforme d'orientation qui aide les lycéens sénégalais à choisir 
                la bonne filière universitaire et construire leur projet professionnel.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/test" 
                  className="bg-primary text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-primary/90 transition-all hover:scale-105 text-center shadow-lg"
                >
                  Découvre ton orientation →
                </Link>
                <Link 
                  to="/careers" 
                  className="bg-white text-primary border-2 border-primary px-8 py-4 rounded-full font-semibold text-lg hover:bg-primary hover:text-white transition-all text-center"
                >
                  Explorer les métiers
                </Link>
              </div>

              {/* Stats */}
              <div className="flex gap-8 pt-8">
                <div>
                  <div className="text-4xl font-bold text-primary">500+</div>
                  <div className="text-gray-600 text-sm mt-1">Lycéens aidés</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-primary">100+</div>
                  <div className="text-gray-600 text-sm mt-1">Métiers référencés</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-primary">15+</div>
                  <div className="text-gray-600 text-sm mt-1">Universités</div>
                </div>
              </div>
            </div>

            {/* Right content - Mockup */}
            <div className="hidden md:block">
              <div className="bg-white rounded-2xl shadow-2xl p-8 transform hover:scale-105 transition-transform">
                <div className="flex gap-2 mb-6">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <h3 className="text-2xl font-bold mb-6 text-gray-800">Quel est ton profil ?</h3>
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-xl hover:bg-primary hover:text-white transition-colors cursor-pointer">
                    <div className="text-3xl mb-2">🎓</div>
                    <div className="font-semibold">Série S</div>
                    <div className="text-sm opacity-75">Sciences et Mathématiques</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-xl hover:bg-primary hover:text-white transition-colors cursor-pointer">
                    <div className="text-3xl mb-2">📚</div>
                    <div className="font-semibold">Série L</div>
                    <div className="text-sm opacity-75">Lettres et Langues</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-xl hover:bg-primary hover:text-white transition-colors cursor-pointer">
                    <div className="text-3xl mb-2">💼</div>
                    <div className="font-semibold">Série G</div>
                    <div className="text-sm opacity-75">Gestion et Commerce</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="bg-primary/10 text-primary px-6 py-2 rounded-full text-sm font-semibold uppercase tracking-wider">
              Nos Fonctionnalités
            </span>
            <h2 className="text-4xl font-bold mt-6 mb-4 text-gray-900">
              Tout ce dont tu as besoin pour réussir
            </h2>
            <p className="text-xl text-gray-600">
              Une plateforme complète qui t'accompagne de l'orientation à l'inscription universitaire
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-gradient-to-br from-primary to-primary/90 text-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="bg-white/20 text-white px-6 py-2 rounded-full text-sm font-semibold uppercase tracking-wider">
              Comment ça marche
            </span>
            <h2 className="text-4xl font-bold mt-6 mb-4">
              4 étapes simples vers ton avenir
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-6 backdrop-blur-sm">
                  {index + 1}
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-white/90 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Prêt à découvrir ton avenir ?
          </h2>
          <p className="text-xl mb-10 text-gray-300 max-w-2xl mx-auto">
            Rejoins les centaines de lycéens qui ont déjà trouvé leur voie grâce à TAKKU AVENIR
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/register" 
              className="bg-primary text-white px-10 py-4 rounded-full font-semibold text-lg hover:bg-primary/90 transition-all hover:scale-105"
            >
              Commencer maintenant
            </Link>
            <Link 
              to="/careers" 
              className="bg-white text-gray-900 px-10 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all"
            >
              En savoir plus
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

// Data
const features = [
  {
    icon: "🎯",
    title: "Test d'Orientation",
    description: "Un questionnaire personnalisé qui analyse tes compétences, intérêts et résultats pour te recommander les meilleures filières."
  },
  {
    icon: "🏫",
    title: "Base de Données Universités",
    description: "Toutes les infos sur UCAD, UGB, UADB, UASZ et les écoles privées : filières, conditions, frais, bourses disponibles."
  },
  {
    icon: "💼",
    title: "Guide des Métiers",
    description: "Découvre plus de 100 métiers avec témoignages vidéo, salaires moyens et perspectives d'emploi au Sénégal."
  },
  {
    icon: "👥",
    title: "Réseau d'Anciens",
    description: "Connecte-toi avec des anciens élèves de Galandou Diouf pour des conseils et mentorat personnalisé."
  },
  {
    icon: "📅",
    title: "Calendrier des Inscriptions",
    description: "Ne rate aucune date importante ! Tutoriels étape par étape et alertes SMS pour chaque inscription."
  },
  {
    icon: "💬",
    title: "Forum Communautaire",
    description: "Pose tes questions, partage ton expérience et trouve du soutien auprès d'autres lycéens dans la même situation."
  }
];

const steps = [
  {
    title: "Crée ton profil",
    description: "Inscris-toi gratuitement et renseigne tes informations : série, matières fortes, centres d'intérêt."
  },
  {
    title: "Passe le test",
    description: "Réponds à notre questionnaire personnalisé (15-20 minutes) pour obtenir tes recommandations."
  },
  {
    title: "Explore les options",
    description: "Découvre les filières adaptées, les métiers correspondants et les universités qui les proposent."
  },
  {
    title: "Prends ta décision",
    description: "Connecte-toi avec des anciens, pose tes questions et valide ton choix avec nos conseillers."
  }
];
