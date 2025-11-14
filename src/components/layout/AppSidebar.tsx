"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Sparkles,
  LayoutDashboard,
  Megaphone,
  Calendar,
  FileText,
  Users,
  Settings,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface AppSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const navigation = [
  { name: "Dashboard", href: "/app/dashboard", icon: LayoutDashboard },
  { name: "Kampaně", href: "/app/campaigns", icon: Megaphone },
  { name: "Kalendář", href: "/app/calendar", icon: Calendar },
  { name: "Obsah", href: "/app/content", icon: FileText },
  { name: "Týmy", href: "/app/teams", icon: Users },
  { name: "Nastavení", href: "/app/settings", icon: Settings },
  { name: "Nápověda", href: "/app/help", icon: HelpCircle },
];

export default function AppSidebar({ isOpen, onToggle }: AppSidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 h-full bg-light-sidebar dark:bg-dark-sidebar text-white transition-all duration-300",
          isOpen ? "w-64" : "w-20",
          "flex flex-col"
        )}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-white/10">
          <Link href="/app/dashboard" className="flex items-center space-x-2">
            <Sparkles className="w-8 h-8 text-primary-400 flex-shrink-0" />
            {isOpen && (
              <span className="font-heading font-bold text-lg">
                Real Estate AI
              </span>
            )}
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto custom-scrollbar">
          {navigation.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors",
                  isActive
                    ? "bg-white/10 text-white"
                    : "text-white/70 hover:bg-white/5 hover:text-white"
                )}
                title={!isOpen ? item.name : undefined}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {isOpen && <span className="font-medium">{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Toggle button */}
        <div className="p-3 border-t border-white/10">
          <button
            onClick={onToggle}
            className="w-full flex items-center justify-center px-3 py-2 rounded-lg text-white/70 hover:bg-white/5 hover:text-white transition-colors"
            title={isOpen ? "Skrýt sidebar" : "Zobrazit sidebar"}
          >
            {isOpen ? (
              <>
                <ChevronLeft className="w-5 h-5 mr-2" />
                <span className="text-sm">Skrýt</span>
              </>
            ) : (
              <ChevronRight className="w-5 h-5" />
            )}
          </button>
        </div>
      </aside>
    </>
  );
}
