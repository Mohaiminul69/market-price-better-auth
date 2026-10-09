import { Baloo_Da_2, Caprasimo, Figtree, Hind_Siliguri } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const caprasimo = Caprasimo({ weight: "400", subsets: ["latin"], variable: "--font-caprasimo" });
const baloo = Baloo_Da_2({ subsets: ["bengali", "latin"], variable: "--font-baloo-da" });
const figtree = Figtree({ subsets: ["latin"], variable: "--font-figtree" });
const hind = Hind_Siliguri({
  weight: ["400", "500", "600", "700"],
  subsets: ["bengali", "latin"],
  variable: "--font-hind",
});

export const metadata = {
  title: "বাজার দর | Bazar Dor",
  description: "প্রয়োজনীয় পণ্যের দাম এক নজরে — চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার আজকের বাজারদর।",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="bn"
      suppressHydrationWarning
      className={`${caprasimo.variable} ${baloo.variable} ${figtree.variable} ${hind.variable} antialiased`}
    >
      <body className="flex min-h-screen flex-col" suppressHydrationWarning>
        <Navbar />
        <main className="container-page flex-1 pt-[clamp(20px,4vw,40px)] pb-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
