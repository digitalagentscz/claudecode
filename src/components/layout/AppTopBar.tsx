"use client";

import { useSession, signOut } from "next-auth/react";
import { useTheme } from "@/components/providers/ThemeProvider";
import { useState, useEffect } from "react";
import {
  Search,
  Sun,
  Moon,
  Bell,
  User,
  Settings,
  LogOut,
  CreditCard,
} from "lucide-react";
import { getInitials } from "@/lib/utils";
import Link from "next/link";

export default function AppTopBar() {
  const { data: session } = useSession();
  const { theme, toggleTheme } = useTheme();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [credits, setCredits] = useState<number | null>(null);

  useEffect(() => {
    // Fetch credit balance
    fetch("/api/credits/balance")
      .then((res) => res.json())
      .then((data) => setCredits(data.credits))
      .catch(console.error);
  }, []);

  return (
    <header className="h-16 bg-white dark:bg-dark-card border-b border-gray-200 dark:border-dark-border sticky top-0 z-30">
      <div className="h-full px-6 flex items-center justify-between">
        {/* Search */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="search"
              placeholder="Hledat kampaně, nemovitosti..."
              className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-800 border border-transparent focus:border-primary-500 rounded-lg transition-colors"
            />
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4 ml-4">
          {/* Credits */}
          {credits !== null && (
            <Link href="/app/account">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-ai-500 to-ai-600 rounded-lg cursor-pointer hover:from-ai-600 hover:to-ai-700 transition-colors">
                <CreditCard className="w-4 h-4 text-white" />
                <span className="text-sm font-semibold text-white">
                  {credits} kreditů
                </span>
              </div>
            </Link>
          )}

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            title={theme === "light" ? "Tmavý režim" : "Světlý režim"}
          >
            {theme === "light" ? (
              <Moon className="w-5 h-5" />
            ) : (
              <Sun className="w-5 h-5" />
            )}
          </button>

          {/* Notifications */}
          <button
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors relative"
            title="Upozornění"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* User menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-semibold text-sm">
                {session?.user?.image ? (
                  <img
                    src={session.user.image}
                    alt={session.user.name || "User"}
                    className="w-8 h-8 rounded-full"
                  />
                ) : (
                  getInitials(session?.user?.name || session?.user?.email || "U")
                )}
              </div>
            </button>

            {/* Dropdown */}
            {showUserMenu && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowUserMenu(false)}
                />
                <div className="absolute right-0 top-full mt-2 w-64 card p-2 z-50 fade-in">
                  <div className="px-3 py-2 border-b border-gray-200 dark:border-dark-border">
                    <p className="font-semibold">{session?.user?.name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {session?.user?.email}
                    </p>
                  </div>

                  <div className="py-2">
                    <Link
                      href="/app/settings"
                      className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <User className="w-4 h-4" />
                      <span>Profil</span>
                    </Link>

                    <Link
                      href="/app/settings"
                      className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <Settings className="w-4 h-4" />
                      <span>Nastavení</span>
                    </Link>

                    <Link
                      href="/app/account"
                      className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <CreditCard className="w-4 h-4" />
                      <span>Účet a fakturace</span>
                    </Link>
                  </div>

                  <div className="pt-2 border-t border-gray-200 dark:border-dark-border">
                    <button
                      onClick={() => signOut({ callbackUrl: "/" })}
                      className="w-full flex items-center gap-3 px-3 py-2 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Odhlásit se</span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
