"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import { Sparkles, Check } from "lucide-react";

const STEPS = [
  { id: 1, title: "Profil", description: "Základní informace" },
  { id: 2, title: "Oblast", description: "Vaše působiště" },
  { id: 3, title: "Branding", description: "Vizuální identita" },
  { id: 4, title: "Tón hlasu", description: "Jak komunikujete" },
  { id: 5, title: "Platformy", description: "Sociální sítě" },
];

const PLATFORMS = [
  { id: "instagram", name: "Instagram", icon: "📷" },
  { id: "facebook", name: "Facebook", icon: "👍" },
  { id: "linkedin", name: "LinkedIn", icon: "💼" },
  { id: "x", name: "X (Twitter)", icon: "🐦" },
  { id: "tiktok", name: "TikTok", icon: "🎵" },
  { id: "youtube", name: "YouTube", icon: "▶️" },
  { id: "google_business", name: "Google Business", icon: "🏢" },
];

export default function OnboardingPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    // Step 1: Profile
    name: session?.user?.name || "",
    brokerage: "",
    phoneNumber: "",

    // Step 2: Area
    primaryCity: "",
    primaryArea: "",

    // Step 3: Branding
    primaryColor: "#6366F1",
    secondaryColor: "#EC4899",

    // Step 4: Tone
    toneOfVoice: "neutral" as "formal" | "neutral" | "friendly",
    stylePreference: "balanced" as "professional" | "balanced" | "bold",
    defaultCTA: "Zavolejte pro bezplatné ocenění",
    personas: "",

    // Step 5: Platforms
    selectedPlatforms: ["instagram", "facebook", "linkedin"],
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const togglePlatform = (platformId: string) => {
    setFormData((prev) => ({
      ...prev,
      selectedPlatforms: prev.selectedPlatforms.includes(platformId)
        ? prev.selectedPlatforms.filter((p) => p !== platformId)
        : [...prev.selectedPlatforms, platformId],
    }));
  };

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = async () => {
    setIsLoading(true);

    try {
      // Save settings
      await fetch("/api/settings/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      // Create social channels
      await fetch("/api/social-channels", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          platforms: formData.selectedPlatforms,
        }),
      });

      router.push("/app/dashboard");
    } catch (error) {
      console.error("Onboarding error:", error);
      alert("Došlo k chybě při dokončování nastavení");
    } finally {
      setIsLoading(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-heading font-bold mb-2">
              Váš profil
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Řekněte nám něco o sobě
            </p>
            <Input
              name="name"
              label="Celé jméno"
              placeholder="Jan Novák"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <Input
              name="brokerage"
              label="Realitní kancelář (nepovinné)"
              placeholder="RE/MAX Prague"
              value={formData.brokerage}
              onChange={handleChange}
            />
            <Input
              name="phoneNumber"
              label="Telefon (nepovinné)"
              placeholder="+420 123 456 789"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-heading font-bold mb-2">
              Vaše oblast
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Kde primárně působíte? Pomůže nám to generovat lokální obsah.
            </p>
            <Input
              name="primaryCity"
              label="Město"
              placeholder="Praha"
              value={formData.primaryCity}
              onChange={handleChange}
              required
            />
            <Input
              name="primaryArea"
              label="Oblast/čtvrť"
              placeholder="Praha 2, Vinohrady"
              value={formData.primaryArea}
              onChange={handleChange}
            />
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-heading font-bold mb-2">
              Váš branding
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Zvolte barvy, které reprezentují vaši značku
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Primární barva
                </label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    name="primaryColor"
                    value={formData.primaryColor}
                    onChange={handleChange}
                    className="w-16 h-16 rounded-lg border-2 border-gray-300 cursor-pointer"
                  />
                  <Input
                    type="text"
                    value={formData.primaryColor}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        primaryColor: e.target.value,
                      }))
                    }
                    placeholder="#6366F1"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Sekundární barva (pro AI funkce)
                </label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    name="secondaryColor"
                    value={formData.secondaryColor}
                    onChange={handleChange}
                    className="w-16 h-16 rounded-lg border-2 border-gray-300 cursor-pointer"
                  />
                  <Input
                    type="text"
                    value={formData.secondaryColor}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        secondaryColor: e.target.value,
                      }))
                    }
                    placeholder="#EC4899"
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 card">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Náhled barev:
              </p>
              <div className="flex gap-3">
                <div
                  className="w-20 h-20 rounded-lg"
                  style={{ backgroundColor: formData.primaryColor }}
                />
                <div
                  className="w-20 h-20 rounded-lg"
                  style={{ backgroundColor: formData.secondaryColor }}
                />
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-heading font-bold mb-2">
              Tón hlasu
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Jak chcete komunikovat se svými klienty?
            </p>

            <div>
              <label className="block text-sm font-medium mb-3">
                Tón komunikace
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: "formal", label: "Formální", emoji: "🎩" },
                  { value: "neutral", label: "Neutrální", emoji: "😊" },
                  { value: "friendly", label: "Přátelský", emoji: "🤗" },
                ].map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        toneOfVoice: option.value as any,
                      }))
                    }
                    className={`p-4 rounded-lg border-2 transition-all ${
                      formData.toneOfVoice === option.value
                        ? "border-primary-600 bg-primary-50 dark:bg-primary-950"
                        : "border-gray-300 dark:border-gray-700 hover:border-primary-400"
                    }`}
                  >
                    <div className="text-3xl mb-2">{option.emoji}</div>
                    <div className="font-medium">{option.label}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-3">
                Styl obsahu
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: "professional", label: "Profesionální", emoji: "💼" },
                  { value: "balanced", label: "Vyvážený", emoji: "⚖️" },
                  { value: "bold", label: "Odvážný", emoji: "🚀" },
                ].map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        stylePreference: option.value as any,
                      }))
                    }
                    className={`p-4 rounded-lg border-2 transition-all ${
                      formData.stylePreference === option.value
                        ? "border-primary-600 bg-primary-50 dark:bg-primary-950"
                        : "border-gray-300 dark:border-gray-700 hover:border-primary-400"
                    }`}
                  >
                    <div className="text-3xl mb-2">{option.emoji}</div>
                    <div className="font-medium">{option.label}</div>
                  </button>
                ))}
              </div>
            </div>

            <Input
              name="defaultCTA"
              label="Výchozí výzva k akci (CTA)"
              placeholder="Zavolejte pro bezplatné ocenění"
              value={formData.defaultCTA}
              onChange={handleChange}
            />

            <Textarea
              name="personas"
              label="Cílové persony (nepovinné)"
              placeholder="Například: Prodávající bytů v Praze, mladé rodiny, investoři..."
              value={formData.personas}
              onChange={handleChange}
              rows={3}
            />
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-heading font-bold mb-2">
              Sociální platformy
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Na kterých platformách chcete publikovat?
            </p>

            <div className="grid grid-cols-2 gap-4">
              {PLATFORMS.map((platform) => (
                <button
                  key={platform.id}
                  type="button"
                  onClick={() => togglePlatform(platform.id)}
                  className={`p-4 rounded-lg border-2 transition-all text-left ${
                    formData.selectedPlatforms.includes(platform.id)
                      ? "border-primary-600 bg-primary-50 dark:bg-primary-950"
                      : "border-gray-300 dark:border-gray-700 hover:border-primary-400"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{platform.icon}</span>
                      <span className="font-medium">{platform.name}</span>
                    </div>
                    {formData.selectedPlatforms.includes(platform.id) && (
                      <Check className="w-5 h-5 text-primary-600" />
                    )}
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-6 p-4 card bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800">
              <p className="text-sm text-blue-900 dark:text-blue-200">
                💡 Později můžete vždy přidat nebo odebrat platformy v
                nastavení.
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-ai-50 dark:from-dark-bg dark:to-dark-bg py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-2">
            <Sparkles className="w-10 h-10 text-primary-600" />
            <span className="text-2xl font-heading font-bold">
              Real Estate AI Marketing
            </span>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            {STEPS.map((step, index) => (
              <div
                key={step.id}
                className="flex-1 flex items-center"
              >
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold ${
                    currentStep >= step.id
                      ? "bg-primary-600 text-white"
                      : "bg-gray-300 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                  }`}
                >
                  {currentStep > step.id ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    step.id
                  )}
                </div>
                {index < STEPS.length - 1 && (
                  <div
                    className={`flex-1 h-1 mx-2 ${
                      currentStep > step.id
                        ? "bg-primary-600"
                        : "bg-gray-300 dark:bg-gray-700"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="flex justify-between mt-3">
            {STEPS.map((step) => (
              <div
                key={step.id}
                className={`flex-1 text-center ${
                  currentStep === step.id ? "font-semibold" : "text-sm"
                }`}
              >
                <div
                  className={
                    currentStep === step.id
                      ? "text-primary-600"
                      : "text-gray-500 dark:text-gray-400"
                  }
                >
                  {step.title}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <div className="card">
          {renderStep()}

          {/* Navigation */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-200 dark:border-dark-border">
            <Button
              variant="ghost"
              onClick={handleBack}
              disabled={currentStep === 1}
            >
              Zpět
            </Button>
            <Button
              variant="primary"
              onClick={handleNext}
              isLoading={isLoading}
            >
              {currentStep === 5 ? "Dokončit" : "Pokračovat"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
