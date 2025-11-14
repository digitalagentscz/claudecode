"use client";

import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Sparkles, FileText, TrendingUp, Users } from "lucide-react";

export default function ContentPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-heading font-bold mb-2">
          AI Obsahové studio
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Generujte dodatečný obsah nezávisle na kampaních
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="text-center">
          <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="w-8 h-8 text-primary-600" />
          </div>
          <h3 className="text-lg font-heading font-semibold mb-2">
            Obecný post
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Vytvořte post na libovolné téma
          </p>
          <Button variant="outline" className="w-full">
            Vytvořit
          </Button>
        </Card>

        <Card className="text-center">
          <div className="w-16 h-16 bg-ai-100 dark:bg-ai-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="w-8 h-8 text-ai-600" />
          </div>
          <h3 className="text-lg font-heading font-semibold mb-2">
            Tržní report
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Analýza trhu ve vaší oblasti
          </p>
          <Button variant="outline" className="w-full">
            Vytvořit
          </Button>
        </Card>

        <Card className="text-center">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-lg font-heading font-semibold mb-2">
            Edukativní obsah
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Tipy pro kupující a prodávající
          </p>
          <Button variant="outline" className="w-full">
            Vytvořit
          </Button>
        </Card>
      </div>

      <Card className="mt-6 text-center py-12">
        <Sparkles className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600 dark:text-gray-400">
          🚧 AI Studio bude k dispozici brzy
        </p>
      </Card>
    </div>
  );
}
