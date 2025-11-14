"use client";

import { useEffect, useState } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { CreditCard, Sparkles, CheckCircle } from "lucide-react";

export default function AccountPage() {
  const [credits, setCredits] = useState(0);

  useEffect(() => {
    fetch("/api/credits/balance")
      .then((res) => res.json())
      .then((data) => setCredits(data.credits))
      .catch(console.error);
  }, []);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-heading font-bold mb-2">
          Účet a fakturace
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Spravujte svůj plán a kredity
        </p>
      </div>

      {/* Current plan */}
      <Card className="mb-6">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-xl font-heading font-semibold">
                Starter plán
              </h2>
              <Badge variant="success">Aktivní</Badge>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Bezplatný plán s 100 kredity měsíčně
            </p>
            <div className="flex items-center gap-4 text-sm">
              <span className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />3 kampaně/měsíc
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                Všechny platformy
              </span>
            </div>
          </div>
          <Button variant="primary">Upgradovat</Button>
        </div>
      </Card>

      {/* Credits */}
      <Card className="mb-6">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-heading font-semibold mb-2">
              Zbývající kredity
            </h3>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-ai-600">{credits}</span>
              <span className="text-gray-600 dark:text-gray-400">kreditů</span>
            </div>
          </div>
          <Button variant="ai">
            <Sparkles className="w-4 h-4 mr-2" />
            Koupit kredity
          </Button>
        </div>

        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
          <p className="text-sm text-blue-900 dark:text-blue-200">
            💡 <strong>Tip:</strong> Průměrná kampaň spotřebuje ~20 kreditů.
            Upgrade na Pro plán získáte 500 kreditů měsíčně.
          </p>
        </div>
      </Card>

      {/* Pricing */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="text-center">
          <h3 className="text-xl font-heading font-semibold mb-2">Starter</h3>
          <div className="text-3xl font-bold mb-4">Zdarma</div>
          <ul className="space-y-2 text-sm text-left mb-6">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
              <span>100 kreditů/měsíc</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
              <span>3 kampaně/měsíc</span>
            </li>
          </ul>
          <Badge variant="success">Aktuální plán</Badge>
        </Card>

        <Card className="text-center border-2 border-primary-600 relative">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2">
            <Badge variant="primary">Doporučeno</Badge>
          </div>
          <h3 className="text-xl font-heading font-semibold mb-2">Pro</h3>
          <div className="text-3xl font-bold mb-4">
            990 Kč<span className="text-base text-gray-500">/měsíc</span>
          </div>
          <ul className="space-y-2 text-sm text-left mb-6">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
              <span>500 kreditů/měsíc</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
              <span>15 kampaní/měsíc</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
              <span>PDF export</span>
            </li>
          </ul>
          <Button variant="primary" className="w-full">
            Upgradovat
          </Button>
        </Card>

        <Card className="text-center">
          <h3 className="text-xl font-heading font-semibold mb-2">Team</h3>
          <div className="text-3xl font-bold mb-4">
            2490 Kč<span className="text-base text-gray-500">/měsíc</span>
          </div>
          <ul className="space-y-2 text-sm text-left mb-6">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
              <span>1000+ kreditů/měsíc</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
              <span>Neomezené kampaně</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
              <span>Týmová spolupráce</span>
            </li>
          </ul>
          <Button variant="outline" className="w-full">
            Kontaktovat
          </Button>
        </Card>
      </div>
    </div>
  );
}
