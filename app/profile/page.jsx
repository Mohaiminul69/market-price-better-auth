import Link from "next/link";
import { Pencil } from "lucide-react";
import { requireUser } from "@/lib/session";
import { Button } from "@/components/ui/button";
import UserAvatar from "@/components/UserAvatar";
import SignOutButton from "@/components/SignOutButton";

export const metadata = { title: "আমার প্রোফাইল | বাজার দর" };

export default async function ProfilePage() {
  const user = await requireUser("/profile");

  return (
    <div className="mx-auto flex max-w-[760px] flex-col gap-6">
      <div>
        <h1 className="text-[clamp(34px,5vw,48px)] leading-tight">আমার প্রোফাইল</h1>
        <p className="text-n-700">আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।</p>
      </div>

      <section className="relative flex flex-wrap items-center gap-5 overflow-hidden rounded-[36px] bg-g-800 p-[clamp(24px,4vw,36px)] text-g-100">
        <span className="pointer-events-none absolute -right-16 -bottom-24 size-[200px] rounded-full bg-g-700" />
        <UserAvatar user={user} className="relative size-[88px] bg-a-400 text-[40px] text-a-900" />
        <div className="relative min-w-0 flex-1">
          <p className="truncate font-heading text-[26px] text-n-100">{user.name}</p>
          <p className="truncate text-[15px]">{user.email}</p>
        </div>
        <SignOutButton />
      </section>

      <section className="flex flex-col gap-5 rounded-[36px] bg-n-100 p-[clamp(24px,4vw,36px)] shadow-sm">
        <h2 className="text-2xl">তথ্য</h2>
        <dl className="grid gap-4 sm:grid-cols-2">
          <div className="min-w-0 rounded-3xl bg-bg px-5 py-4">
            <dt className="text-sm text-n-700">নাম</dt>
            <dd className="truncate text-lg font-semibold">{user.name}</dd>
          </div>
          <div className="min-w-0 rounded-3xl bg-bg px-5 py-4">
            <dt className="text-sm text-n-700">ইমেইল</dt>
            <dd className="truncate text-lg font-semibold">{user.email}</dd>
          </div>
        </dl>
        <Button asChild size="lg" className="self-start">
          <Link href="/profile/update">
            <Pencil strokeWidth={2.75} /> আপডেট
          </Link>
        </Button>
      </section>
    </div>
  );
}
