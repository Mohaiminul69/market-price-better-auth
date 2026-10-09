import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function EmptyState({
  code = "৪০৪",
  title = "পাতাটি খুঁজে পাওয়া যায়নি",
  message = "আপনি যে পাতাটি খুঁজছেন সেটি নেই বা সরিয়ে ফেলা হয়েছে।",
}) {
  return (
    <div className="relative flex flex-col items-center gap-4 overflow-hidden rounded-[36px] bg-surface px-6 py-16 text-center">
      <span className="pointer-events-none absolute -bottom-28 -left-20 size-[220px] rounded-full bg-a-200/70" />
      <p className="relative font-heading text-[clamp(64px,12vw,120px)] leading-none font-extrabold text-brand">
        {code}
      </p>
      <h1 className="relative text-[clamp(26px,4vw,40px)]">{title}</h1>
      <p className="relative max-w-[46ch] text-n-800">{message}</p>
      <Button asChild size="lg" className="relative mt-2">
        <Link href="/">হোম পেজে ফিরে যান</Link>
      </Button>
    </div>
  );
}
