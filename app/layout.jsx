import { Baloo_Da_2, Caprasimo, Figtree, Hind_Siliguri } from "next/font/google";
import { Toaster } from "react-hot-toast";
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
      data-scroll-behavior="smooth"
      className={`${caprasimo.variable} ${baloo.variable} ${figtree.variable} ${hind.variable} antialiased`}
    >
      <body className="flex min-h-screen flex-col" suppressHydrationWarning>
        <Navbar />
        <main className="container-page flex-1 pt-[clamp(20px,4vw,40px)] pb-16">{children}</main>
        <Footer />
        <Toaster
          position="top-center"
          toastOptions={{ style: { borderRadius: 999, background: "#f9f4ed", color: "#201e1d", fontWeight: 600 } }}
        />
      </body>
    </html>
  );
}
