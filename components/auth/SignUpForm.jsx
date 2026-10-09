"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { authErrorMessage, validateAuth } from "@/lib/validation";
import { Button } from "@/components/ui/button";
import FormField from "@/components/auth/FormField";
import SocialButtons from "@/components/auth/SocialButtons";

export default function SignUpForm() {
  const router = useRouter();
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    const values = Object.fromEntries(new FormData(e.currentTarget));
    const found = validateAuth(values, { signup: true });
    setErrors(found);
    if (Object.keys(found).length) {
      toast.error("ফর্মের তথ্যগুলো ঠিক করুন");
      return;
    }

    setLoading(true);
    const { error } = await authClient.signUp.email({
      name: values.name.trim(),
      email: values.email,
      password: values.password,
    });

    if (error) {
      setLoading(false);
      toast.error(authErrorMessage(error));
      return;
    }
    await authClient.signOut();
    setLoading(false);
    toast.success("অ্যাকাউন্ট তৈরি হয়েছে! এবার সাইন ইন করুন");
    router.push("/signin");
  }

  return (
    <>
      <h2 className="text-[28px]">নতুন অ্যাকাউন্ট</h2>
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
        <FormField id="name" label="নাম" placeholder="যেমন: রহিম উদ্দিন" autoComplete="name" error={errors.name} />
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
          autoComplete="new-password"
          error={errors.password}
        />
        <FormField
          id="confirmPassword"
          type="password"
          label="পাসওয়ার্ড নিশ্চিত করুন"
          placeholder="আবার লিখুন"
          autoComplete="new-password"
          error={errors.confirmPassword}
        />
        <Button type="submit" size="lg" disabled={loading} className="mt-1 w-full">
          {loading ? "অ্যাকাউন্ট তৈরি হচ্ছে…" : "সাইন আপ"}
        </Button>
      </form>
      <SocialButtons />
      <p className="text-center text-[15px]">
        অ্যাকাউন্ট আছে?{" "}
        <Link href="/signin" className="font-bold text-a-700 hover:underline">
          সাইন ইন করুন
        </Link>
      </p>
    </>
  );
}
