"use client";

import Card from "@/components/ui/Card";
import { HelpCircle, Book, Mail } from "lucide-react";

const faqs = [
  {
    question: "Jak vytvořím svou první kampaň?",
    answer:
      'Klikněte na "Nová kampaň" v sekci Kampaně, vložte URL inzerátu nebo zadejte detaily ručně, a AI vygeneruje kompletní obsah.',
  },
  {
    question: "Kolik kreditů spotřebuje jedna kampaň?",
    answer:
      "Průměrná kampaň spotřebuje ~20 kreditů. Vytváření obsahu a úpravy pomocí AI spotřebují další kredity (5-10 za operaci).",
  },
  {
    question: "Můžu upravit AI vygenerovaný obsah?",
    answer:
      "Ano! Veškerý obsah můžete libovolně upravovat přímo v editoru. Můžete také požádat AI o vylepšení nebo přepsání částí textu.",
  },
  {
    question: "Jak funguje plánování příspěvků?",
    answer:
      "V kalendáři můžete přetahovat příspěvky na konkrétní dny a časy. AI vám může navrhnout optimální rozvrh podle platforem.",
  },
];

export default function HelpPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-heading font-bold mb-2">Nápověda</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Často kladené otázky a podpora
        </p>
      </div>

      {/* Quick links */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card className="text-center">
          <Book className="w-12 h-12 text-primary-600 mx-auto mb-3" />
          <h3 className="font-heading font-semibold mb-2">Dokumentace</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Kompletní návod k použití
          </p>
        </Card>

        <Card className="text-center">
          <HelpCircle className="w-12 h-12 text-ai-600 mx-auto mb-3" />
          <h3 className="font-heading font-semibold mb-2">FAQ</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Odpovědi na časté otázky
          </p>
        </Card>

        <Card className="text-center">
          <Mail className="w-12 h-12 text-green-600 mx-auto mb-3" />
          <h3 className="font-heading font-semibold mb-2">Kontakt</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Napište nám na support@example.com
          </p>
        </Card>
      </div>

      {/* FAQ */}
      <Card>
        <h2 className="text-xl font-heading font-semibold mb-6">
          Často kladené otázky
        </h2>
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index}>
              <h3 className="font-semibold mb-2">{faq.question}</h3>
              <p className="text-gray-600 dark:text-gray-400">{faq.answer}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
