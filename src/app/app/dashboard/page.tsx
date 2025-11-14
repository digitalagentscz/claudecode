"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import {
  Sparkles,
  TrendingUp,
  Calendar,
  Megaphone,
  Plus,
  ArrowRight,
} from "lucide-react";
import { formatDate } from "@/lib/utils";

interface DashboardStats {
  campaignsThisMonth: number;
  scheduledPosts: number;
  publishedPosts: number;
  creditsRemaining: number;
}

interface UpcomingPost {
  id: string;
  content: string;
  platform: string;
  scheduledFor: string;
}

export default function DashboardPage() {
  const { data: session } = useSession();
  const [stats, setStats] = useState<DashboardStats>({
    campaignsThisMonth: 0,
    scheduledPosts: 0,
    publishedPosts: 0,
    creditsRemaining: 0,
  });
  const [upcomingPosts, setUpcomingPosts] = useState<UpcomingPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [statsRes, postsRes] = await Promise.all([
        fetch("/api/dashboard/stats"),
        fetch("/api/dashboard/upcoming-posts"),
      ]);

      if (statsRes.ok) {
        const statsData = await statsRes.json();
        setStats(statsData);
      }

      if (postsRes.ok) {
        const postsData = await postsRes.json();
        setUpcomingPosts(postsData.posts || []);
      }
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Dobré ráno";
    if (hour < 18) return "Dobré odpoledne";
    return "Dobrý večer";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="spinner w-8 h-8 text-primary-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div>
        <h1 className="text-3xl font-heading font-bold mb-2">
          {greeting()}, {session?.user?.name?.split(" ")[0] || "vítejte"}! 👋
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Přehled vašich kampaní a nadcházejících příspěvků
        </p>
      </div>

      {/* Quick action */}
      <Card className="bg-gradient-to-r from-primary-600 to-ai-600 border-none">
        <div className="flex items-center justify-between">
          <div className="text-white">
            <h3 className="text-xl font-heading font-bold mb-2">
              Vytvo řte novou kampaň
            </h3>
            <p className="text-white/90 mb-4">
              Vložte odkaz na nemovitost nebo zadejte detaily ručně
            </p>
            <Link href="/app/campaigns/new">
              <Button variant="secondary">
                <Plus className="w-5 h-5 mr-2" />
                Nová kampaň
              </Button>
            </Link>
          </div>
          <Sparkles className="w-24 h-24 text-white/20" />
        </div>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                Kampaně tento měsíc
              </p>
              <p className="text-3xl font-heading font-bold">
                {stats.campaignsThisMonth}
              </p>
            </div>
            <div className="p-3 bg-primary-100 dark:bg-primary-900 rounded-lg">
              <Megaphone className="w-6 h-6 text-primary-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-green-600">
            <TrendingUp className="w-4 h-4 mr-1" />
            <span>Aktivní</span>
          </div>
        </Card>

        <Card>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                Naplánované příspěvky
              </p>
              <p className="text-3xl font-heading font-bold">
                {stats.scheduledPosts}
              </p>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4">
            <Link
              href="/app/calendar"
              className="text-sm text-primary-600 hover:text-primary-700 flex items-center"
            >
              Zobrazit kalendář
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
        </Card>

        <Card>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                Publikováno
              </p>
              <p className="text-3xl font-heading font-bold">
                {stats.publishedPosts}
              </p>
            </div>
            <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            Tento měsíc
          </div>
        </Card>

        <Card>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                Zbývající kredity
              </p>
              <p className="text-3xl font-heading font-bold">
                {stats.creditsRemaining}
              </p>
            </div>
            <div className="p-3 bg-ai-100 dark:bg-ai-900 rounded-lg">
              <Sparkles className="w-6 h-6 text-ai-600" />
            </div>
          </div>
          <div className="mt-4">
            <Link
              href="/app/account"
              className="text-sm text-primary-600 hover:text-primary-700 flex items-center"
            >
              Doplnit kredity
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
        </Card>
      </div>

      {/* Upcoming posts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-heading font-semibold">
              Nadcházející příspěvky
            </h3>
            <Link
              href="/app/calendar"
              className="text-sm text-primary-600 hover:text-primary-700"
            >
              Zobrazit vše
            </Link>
          </div>

          {upcomingPosts.length === 0 ? (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <Calendar className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>Zatím nemáte naplánované žádné příspěvky</p>
              <Link href="/app/campaigns/new">
                <Button variant="outline" size="sm" className="mt-4">
                  Vytvořit první kampaň
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {upcomingPosts.slice(0, 5).map((post) => (
                <div
                  key={post.id}
                  className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                >
                  <div
                    className={`w-2 h-2 mt-2 rounded-full bg-${post.platform}`}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      {post.content}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      {formatDate(post.scheduledFor)} • {post.platform}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        <Card>
          <h3 className="text-lg font-heading font-semibold mb-4">
            Rychlé akce
          </h3>

          <div className="space-y-3">
            <Link href="/app/campaigns/new">
              <button className="w-full flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors text-left">
                <div className="p-2 bg-primary-100 dark:bg-primary-900 rounded-lg">
                  <Plus className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <p className="font-medium">Vytvořit kampaň</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Z nové nabídky nemovitosti
                  </p>
                </div>
              </button>
            </Link>

            <Link href="/app/content">
              <button className="w-full flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors text-left">
                <div className="p-2 bg-ai-100 dark:bg-ai-900 rounded-lg">
                  <Sparkles className="w-5 h-5 text-ai-600" />
                </div>
                <div>
                  <p className="font-medium">AI studio</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Generovat obsah bez kampaně
                  </p>
                </div>
              </button>
            </Link>

            <Link href="/app/calendar">
              <button className="w-full flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors text-left">
                <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                  <Calendar className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium">Otevřít kalendář</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Plánovat a spravovat příspěvky
                  </p>
                </div>
              </button>
            </Link>
          </div>
        </Card>
      </div>

      {/* Tips */}
      <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg flex-shrink-0">
            <Sparkles className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="font-heading font-semibold mb-2">
              💡 Tip: Konzistentní publikování
            </h3>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Pro nejlepší výsledky publikujte alespoň 3-4× týdně. Využijte AI
              studio k vytváření dodatečného edukativního obsahu mezi
              kampaněmi z nemovitostí.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
