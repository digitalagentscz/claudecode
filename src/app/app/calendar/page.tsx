"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react";

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const monthName = currentDate.toLocaleDateString("cs-CZ", {
    month: "long",
    year: "numeric",
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-heading font-bold mb-2">Kalendář</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Plánujte a spravujte své příspěvky
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <CalendarIcon className="w-4 h-4 mr-2" />
            Dnes
          </Button>
        </div>
      </div>

      <Card>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-heading font-semibold capitalize">
            {monthName}
          </h2>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setCurrentDate(
                  new Date(currentDate.setMonth(currentDate.getMonth() - 1))
                )
              }
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setCurrentDate(
                  new Date(currentDate.setMonth(currentDate.getMonth() + 1))
                )
              }
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Calendar grid placeholder */}
        <div className="grid grid-cols-7 gap-2">
          {["Po", "Út", "St", "Čt", "Pá", "So", "Ne"].map((day) => (
            <div
              key={day}
              className="text-center font-semibold text-sm text-gray-600 dark:text-gray-400 py-2"
            >
              {day}
            </div>
          ))}

          {Array.from({ length: 35 }).map((_, i) => (
            <div
              key={i}
              className="aspect-square p-2 border border-gray-200 dark:border-dark-border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
            >
              <div className="text-sm">{((i % 30) + 1).toString()}</div>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center text-gray-600 dark:text-gray-400">
          <p className="mb-2">🚧 Pokročilý kalendář s drag & drop je ve vývoji</p>
          <p className="text-sm">
            Zatím můžete plánovat příspěvky v detailu kampaně
          </p>
        </div>
      </Card>
    </div>
  );
}
