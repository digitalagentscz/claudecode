"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Textarea from "@/components/ui/Textarea";
import Badge from "@/components/ui/Badge";
import { Sparkles, Calendar, Save, ArrowLeft } from "lucide-react";
import { safeJSONParse, formatCurrency, getSocialIconClass } from "@/lib/utils";

interface Campaign {
  id: string;
  type: string;
  status: string;
  tourContent: string;
  caseStudyContent: string;
  expertContent: string;
  listing: any;
  posts: any[];
}

export default function CampaignDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [editableTour, setEditableTour] = useState("");
  const [editableCaseStudy, setEditableCaseStudy] = useState("");
  const [editableExpert, setEditableExpert] = useState("");

  useEffect(() => {
    fetchCampaign();
  }, [params.id]);

  const fetchCampaign = async () => {
    try {
      const res = await fetch(`/api/campaigns/${params.id}`);
      if (res.ok) {
        const data = await res.json();
        setCampaign(data.campaign);

        // Parse content
        const tour = safeJSONParse(data.campaign.tourContent, {});
        const caseStudy = safeJSONParse(data.campaign.caseStudyContent, {});
        const expert = safeJSONParse(data.campaign.expertContent, {});

        setEditableTour(tour.caption || "");
        setEditableCaseStudy(caseStudy.copy || "");
        setEditableExpert(expert.copy || "");
      }
    } catch (error) {
      console.error("Failed to fetch campaign:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const tour = safeJSONParse(campaign?.tourContent || "{}", {});
      const caseStudy = safeJSONParse(campaign?.caseStudyContent || "{}", {});
      const expert = safeJSONParse(campaign?.expertContent || "{}", {});

      await fetch(`/api/campaigns/${params.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tourContent: JSON.stringify({ ...tour, caption: editableTour }),
          caseStudyContent: JSON.stringify({
            ...caseStudy,
            copy: editableCaseStudy,
          }),
          expertContent: JSON.stringify({ ...expert, copy: editableExpert }),
          status: "approved",
        }),
      });

      alert("Kampaň byla uložena");
      fetchCampaign();
    } catch (error) {
      console.error("Save error:", error);
      alert("Došlo k chybě při ukládání");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="spinner w-8 h-8 text-primary-600" />
      </div>
    );
  }

  if (!campaign) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 dark:text-gray-400">Kampaň nenalezena</p>
      </div>
    );
  }

  const listing = campaign.listing;

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <Button
          variant="ghost"
          onClick={() => router.push("/app/campaigns")}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Zpět na kampaně
        </Button>

        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-heading font-bold mb-2">
              {listing.title}
            </h1>
            <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
              <span>{listing.area}</span>
              <span>•</span>
              <span>{formatCurrency(listing.price, listing.currency)}</span>
              <span>•</span>
              <Badge variant="primary">{campaign.type}</Badge>
              <Badge
                variant={
                  campaign.status === "approved"
                    ? "success"
                    : campaign.status === "draft"
                    ? "warning"
                    : "neutral"
                }
              >
                {campaign.status}
              </Badge>
            </div>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" onClick={handleSave} isLoading={saving}>
              <Save className="w-4 h-4 mr-2" />
              Uložit změny
            </Button>
            <Button
              variant="primary"
              onClick={() => router.push("/app/calendar")}
            >
              <Calendar className="w-4 h-4 mr-2" />
              Naplánovat
            </Button>
          </div>
        </div>
      </div>

      {/* Content pillars */}
      <div className="space-y-6">
        {/* Tour */}
        <Card>
          <h3 className="text-xl font-heading font-semibold mb-4 flex items-center">
            🏠 Prohlídka (Tour)
          </h3>
          <Textarea
            value={editableTour}
            onChange={(e) => setEditableTour(e.target.value)}
            rows={6}
            label="Popisek pro video tour"
          />
          <Button variant="ai" size="sm" className="mt-3">
            <Sparkles className="w-4 h-4 mr-2" />
            Vylepšit s AI
          </Button>
        </Card>

        {/* Case Study */}
        <Card>
          <h3 className="text-xl font-heading font-semibold mb-4 flex items-center">
            📊 Case Study
          </h3>
          <Textarea
            value={editableCaseStudy}
            onChange={(e) => setEditableCaseStudy(e.target.value)}
            rows={8}
            label="Případová studie"
          />
          <Button variant="ai" size="sm" className="mt-3">
            <Sparkles className="w-4 h-4 mr-2" />
            Vylepšit s AI
          </Button>
        </Card>

        {/* Expert Post */}
        <Card>
          <h3 className="text-xl font-heading font-semibold mb-4 flex items-center">
            🎯 Lokální expert
          </h3>
          <Textarea
            value={editableExpert}
            onChange={(e) => setEditableExpert(e.target.value)}
            rows={8}
            label="Expert post"
          />
          <Button variant="ai" size="sm" className="mt-3">
            <Sparkles className="w-4 h-4 mr-2" />
            Vylepšit s AI
          </Button>
        </Card>

        {/* Platform posts */}
        <Card>
          <h3 className="text-xl font-heading font-semibold mb-4">
            Příspěvky podle platformy
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {campaign.posts.map((post) => (
              <div
                key={post.id}
                className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Badge className={getSocialIconClass(post.channel.platform)}>
                    {post.channel.name}
                  </Badge>
                  <Badge variant="neutral" className="text-xs">
                    {post.status}
                  </Badge>
                </div>
                <p className="text-sm line-clamp-4">{post.content}</p>
                {post.hashtags && (
                  <p className="text-xs text-primary-600 mt-2">
                    {post.hashtags}
                  </p>
                )}
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Actions */}
      <div className="mt-8 flex justify-end gap-4">
        <Button variant="outline" onClick={() => router.push("/app/campaigns")}>
          Zavřít
        </Button>
        <Button variant="primary" onClick={handleSave} isLoading={saving}>
          <Save className="w-4 h-4 mr-2" />
          Uložit a pokračovat
        </Button>
      </div>
    </div>
  );
}
