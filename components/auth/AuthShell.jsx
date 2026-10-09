import Image from "next/image";
import Link from "next/link";

export default function AuthShell({ title, subtitle, children }) {
  return (
    <div className="flex flex-wrap gap-5">
      <section className="relative flex min-h-[320px] flex-[1_1_360px] flex-col gap-3 overflow-hidden rounded-[36px] bg-g-800 p-[clamp(24px,4vw,44px)]">
        <span className="pointer-events-none absolute -right-24 -bottom-28 size-80 rounded-full bg-g-700" />
        <span className="pointer-events-none absolute -bottom-8 -left-6 size-[90px] rounded-full bg-a-400" />
        <h1 className="relative text-[clamp(34px,4.6vw,50px)] leading-tight text-n-100">{title}</h1>
        <p className="relative max-w-[36ch] text-[17px] text-g-100">{subtitle}</p>
        <Image
          src="/bazar-hero.png"
          alt=""
          width={315}
          height={263}
          loading="eager"
          className="relative mt-auto h-auto w-[min(300px,70%)] self-end"
        />
      </section>

      <section className="flex flex-[1_1_380px] flex-col gap-4 rounded-[36px] bg-n-100 p-[clamp(24px,4vw,44px)] shadow-sm">
        {children}
        <Link href="/" className="text-center text-sm text-n-700 hover:text-brand">
          ← হোম পেজে ফিরে যান
        </Link>
      </section>
    </div>
  );
}
