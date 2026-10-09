"use client";

import { LogOut } from "lucide-react";
import { useSignOut } from "@/hooks/use-sign-out";
import { Button } from "@/components/ui/button";

export default function SignOutButton() {
  const signOut = useSignOut();

  return (
    <Button
      variant="outline"
      onClick={signOut}
      className="relative border-a-300 bg-transparent text-a-200 hover:bg-a-300/20"
    >
      <LogOut strokeWidth={2.75} /> সাইন আউট
    </Button>
  );
}
