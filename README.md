# Real Estate AI Marketing

A comprehensive web application for real estate agents and small real estate teams that automatically turns property listings into ready-to-publish, AI-generated marketing campaigns for all major social networks.

## 🚀 Features

### Core Functionality
- **Listing-to-Campaign Generation**: Paste a listing URL or manually enter details, and AI creates complete marketing campaigns
- **Multi-Platform Content**: Automatic generation for Instagram, Facebook, LinkedIn, X (Twitter), TikTok, YouTube, and Google Business Profile
- **Strategic Content Pillars**:
  - **Property Tour**: Video concept, script, and captions
  - **Mini Case Study**: Problem → Approach → Result storytelling
  - **Local Expert Post**: Market insights with soft CTAs
- **Content Calendar**: Plan, schedule, and manage posts with drag-and-drop interface
- **Credit System**: Usage-based metering with flexible plans

### AI Capabilities
- Campaign generation with GPT-4 Turbo
- Platform-specific content optimization
- Content improvement and rewriting
- Hashtag suggestions
- Schedule recommendations
- Czech language support with local market understanding

### User Experience
- **Modern SaaS Design**: Clean, card-based UI with light/dark theme
- **Customizable Dashboard**: Drag-and-drop widgets
- **Branding & Personalization**: Configure colors, tone, personas
- **Team Collaboration**: Roles, approvals, and workflow management (foundation ready)
- **PDF Export**: Campaign plans for clients and stakeholders

## 🛠️ Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Database**: Prisma ORM (SQLite for dev, PostgreSQL-ready)
- **Authentication**: NextAuth.js (Credentials + Google OAuth)
- **AI**: OpenAI API (GPT-4 Turbo)
- **UI Components**: Custom component library
- **Icons**: Lucide React

## 📦 Installation

### Prerequisites

- Node.js 18+ and npm
- OpenAI API key

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd claudecode
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```

   Edit `.env` and configure:
   ```env
   # Database
   DATABASE_URL="file:./dev.db"

   # NextAuth
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="<generate-with: openssl rand -base64 32>"

   # Google OAuth (optional)
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"

   # OpenAI (required)
   OPENAI_API_KEY="sk-your-openai-api-key"

   # App Settings
   FREE_TIER_CREDITS=100
   FREE_TIER_CAMPAIGNS_PER_MONTH=3
   ```

4. **Initialize database**
   ```bash
   npm run db:generate
   npm run db:push
   ```

5. **Run development server**
   ```bash
   npm run dev
   ```

6. **Open in browser**
   ```
   http://localhost:3000
   ```

## 🗄️ Database Schema

The application uses Prisma with a comprehensive schema including:

- **User Management**: Users, Sessions, Accounts
- **Settings & Branding**: UserSettings, BrandingProfile, DashboardLayout
- **Teams**: Team, TeamMember, TeamInvite
- **Social Networks**: SocialChannel (logical records for future OAuth)
- **Campaigns**: Listing, Campaign, Post, PostVariant
- **Credits & Billing**: CreditBalance, CreditTransaction, Subscription
- **AI**: AIAgent, AITask

## 🎨 Design System

### Typography
- **Headings**: Space Grotesk
- **Body/UI**: Inter

### Colors
- **Primary**: Indigo (#6366F1) - CTAs and active elements
- **AI Accent**: Magenta (#EC4899) - AI-related features
- **Light Theme**: Cool gray backgrounds, white cards
- **Dark Theme**: Near-black backgrounds, slate cards

### Components
- Card-based layouts with 12-16px border radius
- Consistent 8-point spacing system
- Smooth transitions and hover states
- Custom scrollbars

## 📖 Usage Guide

### First-Time Setup

1. **Sign Up**: Create account with email/password or Google
2. **Onboarding**: Complete 5-step wizard:
   - Agent profile (name, brokerage)
   - Market area (city, neighborhood)
   - Branding (colors, logo)
   - Tone of voice (formal/neutral/friendly)
   - Social platforms

### Creating a Campaign

1. Navigate to **Campaigns → New Campaign**
2. Choose input method:
   - **URL**: Paste listing URL (Sreality.cz, Bezrealitky.cz supported)
   - **Manual**: Fill property details and upload photos
3. Select campaign type:
   - Just Listed
   - Open House
   - Price Drop
   - Just Sold
4. Click **"Create Campaign with AI"**
5. AI generates:
   - Tour concept and script
   - Case study narrative
   - Expert post content
   - Platform-specific variants
6. Review and edit content
7. Schedule posts in calendar

### Managing Content

- **Dashboard**: Overview of campaigns and upcoming posts
- **Campaigns**: List and manage all campaigns
- **Calendar**: Visual planning and scheduling
- **Content**: AI studio for additional content (coming soon)

### Credits System

- Each campaign generation: ~20 credits
- Content improvements: 5-10 credits each
- Free tier: 100 credits/month, 3 campaigns
- Upgrade for more credits and features

## 🚢 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Configure environment variables
4. Set up PostgreSQL database (Vercel Postgres or external)
5. Deploy

### Other Platforms

The app is a standard Next.js application and can be deployed to:
- Netlify
- AWS Amplify
- Railway
- Self-hosted with Docker

**Production Checklist:**
- [ ] Use PostgreSQL instead of SQLite
- [ ] Set strong `NEXTAUTH_SECRET`
- [ ] Configure production `NEXTAUTH_URL`
- [ ] Set up file storage (AWS S3, Cloudinary) for uploads
- [ ] Configure email service for notifications
- [ ] Set up error tracking (Sentry)
- [ ] Enable CORS if needed
- [ ] Configure rate limiting

## 🔐 Security

- Passwords hashed with bcrypt (12 rounds)
- JWT sessions with NextAuth
- CSRF protection enabled
- SQL injection prevention via Prisma
- XSS protection via React
- Environment variables for secrets

## 🧪 Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run db:generate  # Generate Prisma client
npm run db:push      # Push schema to database
npm run db:studio    # Open Prisma Studio
```

### Project Structure

```
claudecode/
├── prisma/
│   └── schema.prisma        # Database schema
├── src/
│   ├── app/                 # Next.js app router
│   │   ├── api/            # API routes
│   │   ├── app/            # Main application
│   │   ├── auth/           # Authentication pages
│   │   ├── globals.css     # Global styles
│   │   ├── layout.tsx      # Root layout
│   │   └── page.tsx        # Landing page
│   ├── components/
│   │   ├── layout/         # Layout components
│   │   ├── providers/      # Context providers
│   │   └── ui/             # Reusable UI components
│   ├── lib/
│   │   ├── auth.ts         # NextAuth configuration
│   │   ├── openai.ts       # OpenAI integration
│   │   ├── prisma.ts       # Prisma client
│   │   └── utils.ts        # Utility functions
│   └── types/
│       └── next-auth.d.ts  # TypeScript definitions
├── .env.example            # Environment variables template
├── next.config.js          # Next.js configuration
├── tailwind.config.ts      # Tailwind configuration
└── tsconfig.json           # TypeScript configuration
```

## 🌐 Localization

The application is built with **Czech language** as the primary language, optimized for the Czech real estate market. The codebase is designed to be extensible for additional languages in the future.

## 🎯 Roadmap

### Current Version (MVP)
- ✅ Complete authentication flow
- ✅ Onboarding wizard
- ✅ Campaign generation from listings
- ✅ Multi-platform content creation
- ✅ Basic calendar view
- ✅ Credits system
- ✅ Dashboard and navigation

### Upcoming Features
- [ ] Advanced calendar with drag-and-drop scheduling
- [ ] Real social media OAuth integration and publishing
- [ ] AI Content Studio (standalone post generation)
- [ ] PDF export for campaign plans
- [ ] Team collaboration with approval workflows
- [ ] Analytics and engagement tracking
- [ ] Video editing and scheduling
- [ ] Mobile responsive improvements
- [ ] Multi-language support

## 📄 License

This project is proprietary software. All rights reserved.

## 🤝 Support

For questions, issues, or feature requests:
- Email: support@example.com
- GitHub Issues: Create an issue in this repository

## 🙏 Acknowledgments

- Built with Next.js, React, and Tailwind CSS
- AI powered by OpenAI GPT-4 Turbo
- Icons by Lucide
- Fonts: Space Grotesk & Inter by Google Fonts

---

**Made with ❤️ for real estate agents who want to dominate social media**
