# 🛒 বাজার দর (BazarDor)

**প্রয়োজনীয় পণ্যের দাম এক নজরে।** Today's market prices for everyday essentials in Bangladesh, all in one place.

BazarDor is a Bengali-language web app that shows the daily prices of rice, lentils, oil, vegetables, fish, meat, eggs and dairy, and spices. For every product it compares prices across 12 markets in six divisions, highlights which prices rose or fell since yesterday, and shows the minimum, maximum and average price. Signed-in users can open the full market-by-market breakdown for any product.

- **Live site:** https://grocery-price-comparator-iota.vercel.app/
- **Repository:** https://github.com/Mohaiminul69/market-price-better-auth

## Features

1. **Live price ticker.** An endlessly scrolling strip under the navbar shows every product's emoji, name, price per unit and ▲/▼ change.
2. **Today's biggest movers.** The home page lists the top 6 price rises and top 6 price drops compared with yesterday, followed by a responsive grid of all products.
3. **Market-by-market price details.** Each product page shows the category, unit, minimum, maximum and average price, plus a table of 12 markets with a visual price-range bar.
4. **Category browsing with sorting.** Every category page can sort products by price, low to high or high to low. Sorting uses the numeric price, so Bengali numerals like ১,৮৫০ sort correctly.
5. **Authentication with BetterAuth.** Sign up and sign in with email and password, Google or GitHub. Product details and the profile are protected routes that redirect to sign-in and return you afterwards.
6. **Editable profile.** Users can view their profile and update their name on a separate update page.
7. **Bengali throughout.** All text, dates (for example শুক্রবার, ৯ অক্টোবর, ২০২৬) and numbers use Bengali, with Indian-style digit grouping.
8. **Friendly feedback.** Toast notifications for sign-in, sign-up, sign-out, validation errors and protected-route redirects; skeleton loaders while data loads; and a friendly 404 page.
9. **Responsive design.** Layouts adapt from small phones to large desktops.

## Technologies

| Purpose | Technology |
|---|---|
| Framework | [Next.js 16](https://nextjs.org) (App Router), React 19 |
| Language | JavaScript |
| Styling | [Tailwind CSS v4](https://tailwindcss.com) |
| UI components | [shadcn/ui](https://ui.shadcn.com) (Radix UI) and [Lucide](https://lucide.dev) icons |
| Authentication | [BetterAuth](https://better-auth.com) (email/password, Google, GitHub) |
| Database | [MongoDB Atlas](https://www.mongodb.com/atlas) (stores users and sessions) |
| Notifications | [react-hot-toast](https://react-hot-toast.com) |
| Fonts | Caprasimo, Baloo Da 2, Figtree, Hind Siliguri (Google Fonts) |
| Deployment | [Vercel](https://vercel.com) |

Price data comes from the BazarDor API (`https://api.api-store.workers.dev/api/bazardor`), with `https://api.abcz.workers.dev/api/bazardor` as a fallback.

## Pages

| Route | Description | Login required |
|---|---|---|
| `/` | Hero, top risers, top fallers, all products | No |
| `/category/[slug]` | Products in one category, with sorting | No |
| `/product/[slug]` | Price summary and market-by-market prices | Yes |
| `/signin`, `/signup` | Sign in and registration | No |
| `/profile` | User profile | Yes |
| `/profile/update` | Update your name | Yes |

## Running locally

1. Clone the repository and install dependencies:

   ```bash
   git clone https://github.com/Mohaiminul69/market-price-better-auth.git
   cd market-price-better-auth
   npm install
   ```

2. Copy `.env.example` to `.env` and fill in the values:

   | Variable | Value |
   |---|---|
   | `BETTER_AUTH_SECRET` | A random string, for example from `openssl rand -base64 32` |
   | `BETTER_AUTH_URL` | `http://localhost:3000` locally, your deployed URL in production |
   | `MONGODB_URI` | Your MongoDB connection string |
   | `MONGODB_DB` | Database name, for example `bazar-dor` |
   | `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` | From a Google Cloud OAuth client, with redirect URI `<BETTER_AUTH_URL>/api/auth/callback/google` |
   | `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET` | From a GitHub OAuth app, with callback URL `<BETTER_AUTH_URL>/api/auth/callback/github` |

3. Start the development server and open http://localhost:3000:

   ```bash
   npm run dev
   ```

   If Turbopack has file-permission (`EPERM`) errors on Windows, use `npm run dev:webpack` instead.

## Note

All prices are indicative and change with market conditions. (সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।)
