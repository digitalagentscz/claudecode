"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { User, Palette, Volume2, Bell } from "lucide-react";

export default function SettingsPage() {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState("profile");

  const tabs = [
    { id: "profile", label: "Profil", icon: User },
    { id: "branding", label: "Branding & AI", icon: Palette },
    { id: "tone", label: "Tón hlasu", icon: Volume2 },
    { id: "notifications", label: "Upozornění", icon: Bell },
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-heading font-bold mb-2">Nastavení</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Upravte svůj profil a předvolby
        </p>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Sidebar */}
        <div className="col-span-3">
          <Card className="p-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? "bg-primary-50 dark:bg-primary-950 text-primary-600"
                      : "hover:bg-gray-50 dark:hover:bg-gray-800"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              );
            })}
          </Card>
        </div>

        {/* Content */}
        <div className="col-span-9">
          {activeTab === "profile" && (
            <Card>
              <h2 className="text-xl font-heading font-semibold mb-6">
                Profil
              </h2>
              <div className="space-y-4">
                <Input
                  label="Jméno"
                  defaultValue={session?.user?.name || ""}
                />
                <Input
                  label="Email"
                  type="email"
                  defaultValue={session?.user?.email || ""}
                  disabled
                />
                <Input label="Telefon" placeholder="+420 123 456 789" />
                <Input label="Realitní kancelář" placeholder="RE/MAX Prague" />
                <div className="pt-4">
                  <Button variant="primary">Uložit změny</Button>
                </div>
              </div>
            </Card>
          )}

          {activeTab === "branding" && (
            <Card>
              <h2 className="text-xl font-heading font-semibold mb-6">
                Branding & AI
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Nastavení brandingu se načítá...
              </p>
            </Card>
          )}

          {activeTab === "tone" && (
            <Card>
              <h2 className="text-xl font-heading font-semibold mb-6">
                Tón hlasu
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Nastavení tónu se načítá...
              </p>
            </Card>
          )}

          {activeTab === "notifications" && (
            <Card>
              <h2 className="text-xl font-heading font-semibold mb-6">
                Upozornění
              </h2>
              <div className="space-y-4">
                <label className="flex items-center gap-3">
                  <input type="checkbox" className="rounded" defaultChecked />
                  <span>Emailové notifikace</span>
                </label>
                <label className="flex items-center gap-3">
                  <input type="checkbox" className="rounded" defaultChecked />
                  <span>Upozornění na nízké kredity</span>
                </label>
                <label className="flex items-center gap-3">
                  <input type="checkbox" className="rounded" defaultChecked />
                  <span>Připomínky kampaní</span>
                </label>
                <div className="pt-4">
                  <Button variant="primary">Uložit změny</Button>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
