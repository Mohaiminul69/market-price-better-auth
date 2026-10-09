"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { authErrorMessage, validateAuth } from "@/lib/validation";
import { Button } from "@/components/ui/button";
import FormField from "@/components/auth/FormField";
import SocialButtons from "@/components/auth/SocialButtons";

export default function SignInForm({ redirectTo, fromProtected }) {
  const router = useRouter();
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (fromProtected) {
      toast.error("এই পেজটি দেখতে আগে সাইন ইন করুন", { id: "auth-required" });
    }
  }, [fromProtected]);

  async function handleSubmit(e) {
    e.preventDefault();
    const values = Object.fromEntries(new FormData(e.currentTarget));
    const found = validateAuth(values);
    setErrors(found);
    if (Object.keys(found).length) {
      toast.error("ফর্মের তথ্যগুলো ঠিক করুন");
      return;
    }

    setLoading(true);
    const { error } = await authClient.signIn.email({ email: values.email, password: values.password });
    setLoading(false);

    if (error) {
      toast.error(authErrorMessage(error));
      return;
    }
    toast.success("সফলভাবে সাইন ইন হয়েছে");
    router.push(redirectTo);
    router.refresh();
  }

  return (
    <>
      <h2 className="text-[28px]">আপনার অ্যাকাউন্টে ঢুকুন</h2>
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
        <FormField
          id="email"
          type="email"
          label="ইমেইল"
          placeholder="you@example.com"
          autoComplete="email"
          error={errors.email}
        />
        <FormField
          id="password"
          type="password"
          label="পাসওয়ার্ড"
          placeholder="কমপক্ষে ৮ অক্ষর"
          autoComplete="current-password"
          error={errors.password}
        />
        <Button type="submit" size="lg" disabled={loading} className="mt-1 w-full">
          {loading ? "সাইন ইন হচ্ছে…" : "সাইন ইন"}
        </Button>
      </form>
      <SocialButtons callbackURL={redirectTo} />
      <p className="text-center text-[15px]">
        অ্যাকাউন্ট নেই?{" "}
        <Link href="/signup" className="font-bold text-a-700 hover:underline">
          সাইন আপ করুন
        </Link>
      </p>
    </>
  );
}
