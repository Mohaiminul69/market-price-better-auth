import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { safeRedirect } from "@/lib/validation";
import AuthShell from "@/components/auth/AuthShell";
import SignInForm from "@/components/auth/SignInForm";

export const metadata = { title: "সাইন ইন | বাজার দর" };

export default async function SignInPage({ searchParams }) {
  const { redirect: target } = await searchParams;
  const redirectTo = safeRedirect(target);

  if (await getSession()) redirect(redirectTo);

  return (
    <AuthShell title="সাইন ইন" subtitle="বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।">
      <SignInForm redirectTo={redirectTo} fromProtected={Boolean(target)} />
    </AuthShell>
  );
}
