import Link from "next/link";
import Button from "@/components/ui/Button";
import {
  Sparkles,
  Calendar,
  Zap,
  Instagram,
  Facebook,
  Linkedin,
  MessageSquare,
  CheckCircle,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-dark-border bg-white/80 dark:bg-dark-card/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-8 h-8 text-primary-600" />
              <span className="text-xl font-heading font-bold">
                Real Estate AI Marketing
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/auth/signin">
                <Button variant="ghost">Přihlásit se</Button>
              </Link>
              <Link href="/auth/signup">
                <Button variant="primary">Zkusit zdarma</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl font-heading font-bold mb-6 bg-gradient-to-r from-primary-600 to-ai-600 bg-clip-text text-transparent">
            Každá nabídka = měsíc obsahu
            <br />
            na sociální sítě
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto">
            AI nástroj, který z vaší nabídky nemovitosti vytvoří kompletní
            marketingovou kampaň pro všechny hlavní sociální sítě. Během pár
            minut.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/auth/signup">
              <Button variant="ai" size="lg">
                <Sparkles className="w-5 h-5 mr-2" />
                Začít zdarma
              </Button>
            </Link>
            <Button variant="outline" size="lg">
              Sledovat demo
            </Button>
          </div>

          {/* Social Platform Icons */}
          <div className="mt-12 flex justify-center items-center gap-6 text-gray-400">
            <Instagram className="w-8 h-8" />
            <Facebook className="w-8 h-8" />
            <Linkedin className="w-8 h-8" />
            <MessageSquare className="w-8 h-8" />
            <span className="text-sm">+ další</span>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-dark-bg">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading font-bold mb-4">
              Jak to funguje
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              3 kroky k měsíci kvalitního obsahu
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="card text-center">
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-heading font-semibold mb-3">
                1. Zadejte nabídku
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Vložte URL na inzerát nebo vyplňte detaily nemovitosti ručně.
                Nahrajte fotky a je to.
              </p>
            </div>

            <div className="card text-center">
              <div className="w-12 h-12 bg-ai-100 dark:bg-ai-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-6 h-6 text-ai-600" />
              </div>
              <h3 className="text-xl font-heading font-semibold mb-3">
                2. AI vytvoří kampaň
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Během pár sekund dostanete tour, case study, expert post a
                varianty pro všechny platformy.
              </p>
            </div>

            <div className="card text-center">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-heading font-semibold mb-3">
                3. Naplánujte a publikujte
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Přetáhněte příspěvky do kalendáře, upravte text podle potřeby a
                naplánujte publikování.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Content Pillars */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading font-bold mb-4">
              3 obsahové pilíře pro každou nabídku
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="card">
              <h3 className="text-2xl font-heading font-semibold mb-3">
                🏠 Prohlídka
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Nápad na video tour, skript a popisky pro Instagram Reels,
                TikTok a YouTube.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Vizuální koncept videa</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Mluvený skript</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Popisky a hashtagy</span>
                </li>
              </ul>
            </div>

            <div className="card">
              <h3 className="text-2xl font-heading font-semibold mb-3">
                📊 Case Study
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Mini případová studie: problém → řešení → výsledek. Ideální
                pro prodávající.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Strukturovaný storytelling</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Důkaz vaší expertízy</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Měkké CTA</span>
                </li>
              </ul>
            </div>

            <div className="card">
              <h3 className="text-2xl font-heading font-semibold mb-3">
                🎯 Lokální Expert
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Tržní insight a lokální kontext. Budujte autoritu ve vaší
                oblasti.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Tržní data a trendy</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Edukativní obsah</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Pozicování jako lídr</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-dark-bg">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading font-bold mb-4">Ceník</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Systém kreditů - platíte jen za to, co použijete
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="card text-center">
              <h3 className="text-2xl font-heading font-semibold mb-2">
                Starter
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">Zdarma</p>
              <div className="text-4xl font-bold mb-6">100 kreditů</div>
              <ul className="space-y-3 mb-6 text-left">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5" />
                  <span>3 kampaně za měsíc</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5" />
                  <span>Všechny platformy</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5" />
                  <span>Kalendář a plánování</span>
                </li>
              </ul>
              <Link href="/auth/signup">
                <Button variant="outline" className="w-full">
                  Začít zdarma
                </Button>
              </Link>
            </div>

            <div className="card text-center border-2 border-primary-600 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="badge badge-primary px-4 py-1">
                  Nejpopulárnější
                </span>
              </div>
              <h3 className="text-2xl font-heading font-semibold mb-2">Pro</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Pro aktivní agenty
              </p>
              <div className="text-4xl font-bold mb-6">
                500 kreditů
                <span className="text-lg text-gray-500">/měsíc</span>
              </div>
              <ul className="space-y-3 mb-6 text-left">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5" />
                  <span>15 kampaní za měsíc</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5" />
                  <span>PDF export</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5" />
                  <span>Prioritní podpora</span>
                </li>
              </ul>
              <Button variant="primary" className="w-full">
                Upgradovat
              </Button>
            </div>

            <div className="card text-center">
              <h3 className="text-2xl font-heading font-semibold mb-2">Tým</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Pro kanceláře
              </p>
              <div className="text-4xl font-bold mb-6">
                1000+ kreditů
                <span className="text-lg text-gray-500">/měsíc</span>
              </div>
              <ul className="space-y-3 mb-6 text-left">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5" />
                  <span>Neomezené kampaně</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5" />
                  <span>Týmová spolupráce</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5" />
                  <span>Workflow schvalování</span>
                </li>
              </ul>
              <Button variant="secondary" className="w-full">
                Kontaktovat
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-heading font-bold mb-6">
            Připraveni být vidět online každý den?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            Vyzkoušejte zdarma. Žádná kreditní karta není potřeba.
          </p>
          <Link href="/auth/signup">
            <Button variant="ai" size="lg">
              <Sparkles className="w-5 h-5 mr-2" />
              Vytvořit první kampaň
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-dark-border py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center text-gray-600 dark:text-gray-400">
          <p>&copy; 2024 Real Estate AI Marketing. Všechna práva vyhrazena.</p>
        </div>
      </footer>
    </div>
  );
}
