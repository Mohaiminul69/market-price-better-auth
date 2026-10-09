import Hero from "@/components/Hero";

export default function HomePage() {
  return (
    <div className="flex flex-col gap-[clamp(32px,5vw,56px)]">
      <Hero />
      <section id="সব-পণ্য" className="scroll-mt-48" />
    </div>
  );
}
