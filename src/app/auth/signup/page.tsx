"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { Sparkles, CheckCircle } from "lucide-react";

export default function SignUpPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError("Hesla se neshodují");
      return;
    }

    if (formData.password.length < 8) {
      setError("Heslo musí mít alespoň 8 znaků");
      return;
    }

    setIsLoading(true);

    try {
      // Create account
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Došlo k chybě při vytváření účtu");
        setIsLoading(false);
        return;
      }

      // Auto sign in after successful registration
      const result = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (result?.error) {
        setError("Účet vytvořen, ale přihlášení selhalo. Zkuste se přihlásit.");
        setIsLoading(false);
      } else {
        router.push("/app/onboarding");
        router.refresh();
      }
    } catch (err) {
      setError("Došlo k chybě při vytváření účtu");
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setIsLoading(true);
    await signIn("google", { callbackUrl: "/app/onboarding" });
  };

  return (
    <div className="min-h-screen flex px-4 py-12 bg-gradient-to-br from-primary-50 to-ai-50 dark:from-dark-bg dark:to-dark-bg">
      <div className="w-full max-w-6xl mx-auto flex gap-8 items-center">
        {/* Left side - Benefits */}
        <div className="hidden lg:block flex-1">
          <div className="mb-8">
            <Link href="/" className="inline-flex items-center space-x-2">
              <Sparkles className="w-10 h-10 text-primary-600" />
              <span className="text-2xl font-heading font-bold">
                Real Estate AI Marketing
              </span>
            </Link>
          </div>

          <h2 className="text-4xl font-heading font-bold mb-6">
            Začněte během 2 minut
          </h2>

          <div className="space-y-4">
            <div className="flex items-start">
              <CheckCircle className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-lg mb-1">
                  100 kreditů zdarma
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Na první 3 kampaně - žádná kreditní karta není potřeba
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <CheckCircle className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-lg mb-1">
                  Všechny platformy
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Instagram, Facebook, LinkedIn, X, TikTok, YouTube a další
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <CheckCircle className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-lg mb-1">
                  AI v češtině
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Kompletně lokalizované pro český realitní trh
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <CheckCircle className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-lg mb-1">
                  Kalendář a plánování
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Přetahujte příspěvky a plánujte obsah na týdny dopředu
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Form */}
        <div className="flex-1 max-w-md mx-auto lg:mx-0">
          <div className="lg:hidden text-center mb-8">
            <Link href="/" className="inline-flex items-center space-x-2">
              <Sparkles className="w-10 h-10 text-primary-600" />
              <span className="text-2xl font-heading font-bold">
                Real Estate AI
              </span>
            </Link>
          </div>

          <div className="card">
            <h1 className="text-2xl font-heading font-bold text-center mb-6">
              Vytvořit účet
            </h1>

            {error && (
              <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <p className="text-sm text-red-800 dark:text-red-200">
                  {error}
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="text"
                name="name"
                label="Celé jméno"
                placeholder="Jan Novák"
                value={formData.name}
                onChange={handleChange}
                autoComplete="name"
              />

              <Input
                type="email"
                name="email"
                label="Email"
                placeholder="vas@email.cz"
                value={formData.email}
                onChange={handleChange}
                required
                autoComplete="email"
              />

              <Input
                type="password"
                name="password"
                label="Heslo"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
                autoComplete="new-password"
              />

              <Input
                type="password"
                name="confirmPassword"
                label="Potvrzení hesla"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                autoComplete="new-password"
              />

              <div className="text-xs text-gray-600 dark:text-gray-400">
                Vytvořením účtu souhlasíte s našimi{" "}
                <Link href="/terms" className="text-primary-600 hover:underline">
                  Podmínkami použití
                </Link>{" "}
                a{" "}
                <Link
                  href="/privacy"
                  className="text-primary-600 hover:underline"
                >
                  Zásadami ochrany osobních údajů
                </Link>
                .
              </div>

              <Button
                type="submit"
                variant="primary"
                className="w-full"
                isLoading={isLoading}
                disabled={isLoading}
              >
                Vytvořit účet
              </Button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white dark:bg-dark-card text-gray-500">
                    nebo
                  </span>
                </div>
              </div>

              <Button
                type="button"
                variant="outline"
                className="w-full mt-4"
                onClick={handleGoogleSignUp}
                disabled={isLoading}
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Pokračovat s Google
              </Button>
            </div>

            <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
              Již máte účet?{" "}
              <Link
                href="/auth/signin"
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                Přihlásit se
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
