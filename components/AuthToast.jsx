"use client";

import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

const MESSAGES = {
  social: { type: "success", text: "সফলভাবে সাইন ইন হয়েছে" },
  error: { type: "error", text: "সোশ্যাল লগইন ব্যর্থ হয়েছে, আবার চেষ্টা করুন" },
};

export default function AuthToast() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const status = searchParams.get("auth");

  useEffect(() => {
    const message = MESSAGES[status];
    if (!message) return;

    toast[message.type](message.text, { id: `auth-${status}` });

    const params = new URLSearchParams(searchParams);
    params.delete("auth");
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }, [status, searchParams, pathname, router]);

  return null;
}
