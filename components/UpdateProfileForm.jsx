"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import FormField from "@/components/auth/FormField";

export default function UpdateProfileForm({ defaultName }) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    const name = new FormData(e.currentTarget).get("name").trim();
    if (!name) {
      setError("নাম লিখুন");
      toast.error("নাম খালি রাখা যাবে না");
      return;
    }
    setError("");

    setLoading(true);
    const { error: updateError } = await authClient.updateUser({ name });
    setLoading(false);

    if (updateError) {
      toast.error(updateError.message || "তথ্য আপডেট করা যায়নি");
      return;
    }
    toast.success("তথ্য সফলভাবে আপডেট হয়েছে");
    router.push("/profile");
    router.refresh();
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="flex flex-col gap-5 rounded-[36px] bg-n-100 p-[clamp(24px,4vw,36px)] shadow-sm"
    >
      <FormField id="name" label="নাম" defaultValue={defaultName} autoComplete="name" error={error} />
      <div className="flex flex-wrap gap-3">
        <Button type="submit" size="lg" disabled={loading}>
          {loading ? "আপডেট হচ্ছে…" : "তথ্য আপডেট করুন"}
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href="/profile">বাতিল</Link>
        </Button>
      </div>
    </form>
  );
}
