"use client";

import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Users, Plus } from "lucide-react";

export default function TeamsPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-heading font-bold mb-2">Týmy</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Spolupracujte se svým týmem
          </p>
        </div>
        <Button variant="primary">
          <Plus className="w-5 h-5 mr-2" />
          Vytvořit tým
        </Button>
      </div>

      <Card className="text-center py-16">
        <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-heading font-semibold mb-2">
          Týmová spolupráce
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Funkce týmů je dostupná v plánech Pro a Team
        </p>
        <Button variant="primary">Upgradovat plán</Button>
      </Card>
    </div>
  );
}
