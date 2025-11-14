"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { Plus, Search, Filter, Eye } from "lucide-react";
import { formatDate, formatCurrency, safeJSONParse } from "@/lib/utils";

interface Campaign {
  id: string;
  type: string;
  status: string;
  createdAt: string;
  listing: {
    title: string;
    area: string;
    price: number;
    currency: string;
    propertyType: string;
  };
  posts: any[];
}

export default function CampaignsPage() {
  const router = useRouter();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    try {
      const res = await fetch("/api/campaigns");
      if (res.ok) {
        const data = await res.json();
        setCampaigns(data.campaigns || []);
      }
    } catch (error) {
      console.error("Failed to fetch campaigns:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredCampaigns = campaigns.filter((c) => {
    if (filter === "all") return true;
    return c.status === filter;
  });

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "draft":
        return "warning";
      case "approved":
        return "success";
      case "scheduled":
        return "primary";
      default:
        return "neutral";
    }
  };

  const getTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      just_listed: "Právě v nabídce",
      open_house: "Den otevřených dveří",
      price_drop: "Snížení ceny",
      just_sold: "Právě prodáno",
    };
    return labels[type] || type;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="spinner w-8 h-8 text-primary-600" />
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-heading font-bold mb-2">Kampaně</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Spravujte své marketingové kampaně
          </p>
        </div>
        <Link href="/app/campaigns/new">
          <Button variant="primary">
            <Plus className="w-5 h-5 mr-2" />
            Nová kampaň
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="search"
                placeholder="Hledat kampaně..."
                className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-800 border border-transparent focus:border-primary-500 rounded-lg transition-colors"
              />
            </div>

            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-3 py-2 bg-gray-100 dark:bg-gray-800 border border-transparent focus:border-primary-500 rounded-lg"
              >
                <option value="all">Všechny</option>
                <option value="draft">Koncept</option>
                <option value="approved">Schválené</option>
                <option value="scheduled">Naplánované</option>
              </select>
            </div>
          </div>

          <div className="text-sm text-gray-600 dark:text-gray-400">
            {filteredCampaigns.length} kampaní
          </div>
        </div>
      </Card>

      {/* Campaigns list */}
      {filteredCampaigns.length === 0 ? (
        <Card className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Zatím nemáte žádné kampaně
          </p>
          <Link href="/app/campaigns/new">
            <Button variant="primary">
              <Plus className="w-5 h-5 mr-2" />
              Vytvořit první kampaň
            </Button>
          </Link>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredCampaigns.map((campaign) => (
            <Card
              key={campaign.id}
              className="hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => router.push(`/app/campaigns/${campaign.id}`)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-heading font-semibold">
                      {campaign.listing.title}
                    </h3>
                    <Badge variant={getStatusVariant(campaign.status)}>
                      {campaign.status}
                    </Badge>
                    <Badge variant="neutral">{getTypeLabel(campaign.type)}</Badge>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
                    <span>{campaign.listing.area}</span>
                    <span>•</span>
                    <span>
                      {formatCurrency(
                        campaign.listing.price,
                        campaign.listing.currency
                      )}
                    </span>
                    <span>•</span>
                    <span>{campaign.posts.length} příspěvků</span>
                    <span>•</span>
                    <span>{formatDate(campaign.createdAt)}</span>
                  </div>

                  <div className="flex gap-2">
                    {campaign.posts.slice(0, 5).map((post, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs"
                      >
                        {post.channel?.name}
                      </span>
                    ))}
                    {campaign.posts.length > 5 && (
                      <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs">
                        +{campaign.posts.length - 5}
                      </span>
                    )}
                  </div>
                </div>

                <Button variant="outline" size="sm">
                  <Eye className="w-4 h-4 mr-2" />
                  Zobrazit
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
