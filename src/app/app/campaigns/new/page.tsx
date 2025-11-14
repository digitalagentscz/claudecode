"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Card from "@/components/ui/Card";
import { Upload, Link as LinkIcon, Sparkles, X } from "lucide-react";

const PROPERTY_TYPES = [
  { value: "apartment", label: "Byt" },
  { value: "house", label: "Dům" },
  { value: "commercial", label: "Komerční prostor" },
  { value: "land", label: "Pozemek" },
];

const CAMPAIGN_TYPES = [
  { value: "just_listed", label: "Právě v nabídce", emoji: "🆕" },
  { value: "open_house", label: "Den otevřených dveří", emoji: "🏠" },
  { value: "price_drop", label: "Snížení ceny", emoji: "💰" },
  { value: "just_sold", label: "Právě prodáno", emoji: "✅" },
];

export default function NewCampaignPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"url" | "manual">("url");
  const [isGenerating, setIsGenerating] = useState(false);

  const [formData, setFormData] = useState({
    // URL mode
    listingUrl: "",

    // Manual mode
    title: "",
    address: "",
    area: "",
    propertyType: "apartment",
    price: "",
    currency: "CZK",
    features: "",
    description: "",

    // Campaign
    campaignType: "just_listed",
  });

  const [images, setImages] = useState<string[]>([]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    // In a real app, upload to cloud storage and get URLs
    // For now, create object URLs
    const urls = files.map((file) => URL.createObjectURL(file));
    setImages((prev) => [...prev, ...urls]);
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);

    try {
      // Step 1: Create listing
      const listingRes = await fetch("/api/listings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode,
          url: formData.listingUrl,
          title: formData.title,
          address: formData.address,
          area: formData.area,
          propertyType: formData.propertyType,
          price: formData.price ? parseFloat(formData.price) : null,
          currency: formData.currency,
          features: formData.features
            .split(",")
            .map((f) => f.trim())
            .filter(Boolean),
          description: formData.description,
          images,
        }),
      });

      if (!listingRes.ok) {
        throw new Error("Failed to create listing");
      }

      const { listing } = await listingRes.json();

      // Step 2: Generate campaign
      const campaignRes = await fetch("/api/campaigns/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          listingId: listing.id,
          campaignType: formData.campaignType,
        }),
      });

      if (!campaignRes.ok) {
        throw new Error("Failed to generate campaign");
      }

      const { campaign } = await campaignRes.json();

      // Redirect to campaign preview
      router.push(`/app/campaigns/${campaign.id}`);
    } catch (error) {
      console.error("Campaign creation error:", error);
      alert("Došlo k chybě při vytváření kampaně");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-heading font-bold mb-2">
          Nová kampaň
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Vytvořte marketingovou kampaň z nabídky nemovitosti
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Input mode selector */}
        <Card>
          <h3 className="text-lg font-heading font-semibold mb-4">
            Jak chcete zadat nemovitost?
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setMode("url")}
              className={`p-4 rounded-lg border-2 transition-all ${
                mode === "url"
                  ? "border-primary-600 bg-primary-50 dark:bg-primary-950"
                  : "border-gray-300 dark:border-gray-700 hover:border-primary-400"
              }`}
            >
              <LinkIcon className="w-8 h-8 mx-auto mb-2 text-primary-600" />
              <p className="font-medium">Vložit URL inzerátu</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Rychlé, automatické načtení
              </p>
            </button>

            <button
              type="button"
              onClick={() => setMode("manual")}
              className={`p-4 rounded-lg border-2 transition-all ${
                mode === "manual"
                  ? "border-primary-600 bg-primary-50 dark:bg-primary-950"
                  : "border-gray-300 dark:border-gray-700 hover:border-primary-400"
              }`}
            >
              <Upload className="w-8 h-8 mx-auto mb-2 text-primary-600" />
              <p className="font-medium">Zadat ručně</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Kompletní kontrola
              </p>
            </button>
          </div>
        </Card>

        {/* URL input */}
        {mode === "url" && (
          <Card>
            <h3 className="text-lg font-heading font-semibold mb-4">
              URL inzerátu
            </h3>
            <Input
              name="listingUrl"
              placeholder="https://www.sreality.cz/..."
              value={formData.listingUrl}
              onChange={handleChange}
              required
            />
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Podporujeme Sreality.cz, Bezrealitky.cz a další
            </p>
          </Card>
        )}

        {/* Manual input */}
        {mode === "manual" && (
          <Card>
            <h3 className="text-lg font-heading font-semibold mb-4">
              Detaily nemovitosti
            </h3>
            <div className="space-y-4">
              <Input
                name="title"
                label="Název nabídky"
                placeholder="Prostorný 3+kk s balkonem, Praha 2"
                value={formData.title}
                onChange={handleChange}
                required
              />

              <div className="grid grid-cols-2 gap-4">
                <Input
                  name="address"
                  label="Adresa"
                  placeholder="Vinohradská 123"
                  value={formData.address}
                  onChange={handleChange}
                />

                <Input
                  name="area"
                  label="Oblast"
                  placeholder="Praha 2, Vinohrady"
                  value={formData.area}
                  onChange={handleChange}
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Typ nemovitosti
                  </label>
                  <select
                    name="propertyType"
                    value={formData.propertyType}
                    onChange={handleChange}
                    className="input"
                    required
                  >
                    {PROPERTY_TYPES.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                <Input
                  name="price"
                  label="Cena"
                  type="number"
                  placeholder="5500000"
                  value={formData.price}
                  onChange={handleChange}
                />

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Měna
                  </label>
                  <select
                    name="currency"
                    value={formData.currency}
                    onChange={handleChange}
                    className="input"
                  >
                    <option value="CZK">CZK</option>
                    <option value="EUR">EUR</option>
                  </select>
                </div>
              </div>

              <Input
                name="features"
                label="Vlastnosti (oddělené čárkami)"
                placeholder="3 pokoje, balkon, výtah, sklep, parkování"
                value={formData.features}
                onChange={handleChange}
              />

              <Textarea
                name="description"
                label="Popis"
                placeholder="Krátký popis nemovitosti..."
                value={formData.description}
                onChange={handleChange}
                rows={4}
              />

              {/* Image upload */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Fotografie
                </label>
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-6 text-center">
                  <Upload className="w-10 h-10 mx-auto mb-3 text-gray-400" />
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Přetáhněte sem fotografie nebo klikněte pro výběr
                  </p>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label htmlFor="image-upload">
                    <span className="btn btn-outline px-3 py-1.5 text-sm cursor-pointer inline-flex items-center justify-center">
                      Vybrat soubory
                    </span>
                  </label>
                </div>

                {images.length > 0 && (
                  <div className="grid grid-cols-4 gap-4 mt-4">
                    {images.map((img, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={img}
                          alt={`Upload ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </Card>
        )}

        {/* Campaign type */}
        <Card>
          <h3 className="text-lg font-heading font-semibold mb-4">
            Typ kampaně
          </h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {CAMPAIGN_TYPES.map((type) => (
              <button
                key={type.value}
                type="button"
                onClick={() =>
                  setFormData((prev) => ({ ...prev, campaignType: type.value }))
                }
                className={`p-4 rounded-lg border-2 transition-all text-center ${
                  formData.campaignType === type.value
                    ? "border-primary-600 bg-primary-50 dark:bg-primary-950"
                    : "border-gray-300 dark:border-gray-700 hover:border-primary-400"
                }`}
              >
                <div className="text-3xl mb-2">{type.emoji}</div>
                <div className="font-medium text-sm">{type.label}</div>
              </button>
            ))}
          </div>
        </Card>

        {/* Submit */}
        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="ghost"
            onClick={() => router.back()}
          >
            Zrušit
          </Button>
          <Button
            type="submit"
            variant="ai"
            isLoading={isGenerating}
            disabled={isGenerating}
          >
            <Sparkles className="w-5 h-5 mr-2" />
            {isGenerating ? "Generuji kampaň..." : "Vytvořit kampaň s AI"}
          </Button>
        </div>
      </form>
    </div>
  );
}
