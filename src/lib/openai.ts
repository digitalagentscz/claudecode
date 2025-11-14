import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export interface CampaignGenerationInput {
  listing: {
    title: string;
    address?: string;
    area?: string;
    propertyType: string;
    price?: number;
    currency?: string;
    features: string[];
    description?: string;
    images: string[];
  };
  campaignType: "just_listed" | "open_house" | "price_drop" | "just_sold";
  userProfile: {
    name: string;
    brokerage?: string;
    area: string;
    toneOfVoice: string;
    stylePreference: string;
    defaultCTA: string;
    personas: Array<{ name: string; description: string }>;
  };
}

export interface CampaignOutput {
  tour: {
    caption: string;
    script: string;
    videoIdea: string;
  };
  caseStudy: {
    problem: string;
    approach: string;
    result: string;
    copy: string;
  };
  expert: {
    insight: string;
    marketData: string;
    copy: string;
  };
  platformVariants: {
    instagram: { caption: string; hashtags: string };
    facebook: { caption: string };
    linkedin: { caption: string };
    x: { caption: string };
    tiktok: { caption: string; hooks: string[] };
    youtube: { title: string; description: string };
    google_business: { caption: string };
  };
}

export async function generateCampaign(
  input: CampaignGenerationInput
): Promise<CampaignOutput> {
  const systemPrompt = `Jsi expert na vytváření marketingového obsahu pro realitní agenty v České republice.

PROFIL AGENTA:
- Jméno: ${input.userProfile.name}
- Kancelář: ${input.userProfile.brokerage || "Nezávislý agent"}
- Oblast: ${input.userProfile.area}
- Tón hlasu: ${input.userProfile.toneOfVoice}
- Styl: ${input.userProfile.stylePreference}
- Výchozí CTA: ${input.userProfile.defaultCTA}

CÍLOVÉ PERSONY:
${input.userProfile.personas.map((p) => `- ${p.name}: ${p.description}`).join("\n")}

NEMOVITOST:
- Název: ${input.listing.title}
- Typ: ${input.listing.propertyType}
- Oblast: ${input.listing.area || ""}
- Cena: ${input.listing.price ? `${input.listing.price} ${input.listing.currency}` : ""}
- Vlastnosti: ${input.listing.features.join(", ")}
${input.listing.description ? `- Popis: ${input.listing.description}` : ""}

TYP KAMPANĚ: ${input.campaignType}

Vytvoř kompletní marketingovou kampaň v češtině, která obsahuje:

1. **TOUR (Prohlídka)**
   - Popisek pro video prohlídku (2-3 věty)
   - Skript pro mluvený komentář (30-60 sekund)
   - Nápad na video (jaké záběry, úhly, storytelling)

2. **CASE STUDY (Mini případová studie)**
   - Problém: Jakou výzvu řešil prodávající
   - Přístup: Jak jsi pomohl jako agent
   - Výsledek: Čeho bylo dosaženo
   - Finální copy pro social media (3-4 odstavce)

3. **EXPERT POST (Lokální expert)**
   - Insight: Zajímavý poznatek o místním trhu
   - Data: Relevantní statistika nebo trend
   - Copy: Příspěvek s měkkým CTA (3-4 odstavce)

4. **PLATFORMOVÉ VARIANTY**
   Přizpůsob obsah pro každou platformu:
   - Instagram: Krátký, vizuální popisek + 10-15 hashtagů
   - Facebook: Delší, komunitní příspěvek
   - LinkedIn: Profesionální, business-orientovaný
   - X (Twitter): Stručný, jednoduchý (max 280 znaků)
   - TikTok: Mladý, energický popisek + 3 možné hooks
   - YouTube: Název a popis videa
   - Google Business: Lokální, informativní

Vrať odpověď jako validní JSON objekt podle struktury níže.`;

  const response = await openai.chat.completions.create({
    model: "gpt-4-turbo-preview",
    messages: [
      { role: "system", content: systemPrompt },
      {
        role: "user",
        content: `Vygeneruj kampaň pro tento typ: ${input.campaignType}`,
      },
    ],
    temperature: 0.7,
    max_tokens: 3000,
    response_format: { type: "json_object" },
  });

  const content = response.choices[0].message.content;
  if (!content) {
    throw new Error("No content generated");
  }

  return JSON.parse(content) as CampaignOutput;
}

export async function improveContent(
  content: string,
  instruction: string,
  context?: string
): Promise<string> {
  const systemPrompt = `Jsi copywriter pro realitní marketing v České republice.
${context ? `\n\nKONTEXT: ${context}` : ""}

Tvým úkolem je upravit poskytnutý text podle instrukce uživatele.
Zachovej profesionální, ale přátelský tón. Vrať POUZE upravený text, nic jiného.`;

  const response = await openai.chat.completions.create({
    model: "gpt-4-turbo-preview",
    messages: [
      { role: "system", content: systemPrompt },
      {
        role: "user",
        content: `PŮVODNÍ TEXT:\n${content}\n\nINSTRUKCE: ${instruction}`,
      },
    ],
    temperature: 0.7,
    max_tokens: 1000,
  });

  return response.choices[0].message.content || content;
}

export async function generateHashtags(
  content: string,
  platform: string
): Promise<string[]> {
  const response = await openai.chat.completions.create({
    model: "gpt-4-turbo-preview",
    messages: [
      {
        role: "system",
        content: `Vygeneruj relevantní hashtagy pro ${platform} post v realitním marketingu (česky).
Vrať JSON pole stringů. Limit: 10-15 hashtagů.`,
      },
      { role: "user", content },
    ],
    temperature: 0.7,
    max_tokens: 200,
    response_format: { type: "json_object" },
  });

  const result = JSON.parse(response.choices[0].message.content || '{"hashtags":[]}');
  return result.hashtags || [];
}

export async function suggestSchedule(
  posts: Array<{ platform: string; pillarType: string }>,
  startDate: Date
): Promise<Array<{ postIndex: number; scheduledFor: Date; reason: string }>> {
  const systemPrompt = `Jsi expert na plánování social media obsahu.
Na základě typu příspěvků a platformy navrhni optimální rozvrh publikování.

PRAVIDLA:
- Instagram: nejlepší časy 12:00, 18:00, 20:00
- Facebook: 13:00-16:00, 19:00-21:00
- LinkedIn: pondělí-pátek 8:00-10:00, 12:00-14:00
- X (Twitter): průběžně, 9:00, 12:00, 15:00, 18:00
- TikTok: 16:00-22:00 (mladá audience)
- YouTube: 14:00-18:00
- Google Business: 10:00-14:00

FREKVENCE:
- Tour posts: hned, nebo do 24h
- Case study: 2-3 dny po tour
- Expert posts: 5-7 dní po startu

Vrať JSON pole s návrhy.`;

  const response = await openai.chat.completions.create({
    model: "gpt-4-turbo-preview",
    messages: [
      { role: "system", content: systemPrompt },
      {
        role: "user",
        content: JSON.stringify({ posts, startDate }),
      },
    ],
    temperature: 0.5,
    max_tokens: 1000,
    response_format: { type: "json_object" },
  });

  const result = JSON.parse(response.choices[0].message.content || '{"schedule":[]}');
  return result.schedule || [];
}

export { openai };
