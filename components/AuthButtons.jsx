"use client";

import Link from "next/link";
import { ChevronDown, LogOut, User } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { useSignOut } from "@/hooks/use-sign-out";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import UserAvatar from "@/components/UserAvatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function AuthButtons() {
  const { data: session, isPending } = authClient.useSession();
  const signOut = useSignOut();

  if (isPending) {
    return <Skeleton className="h-11 w-36 shrink-0 rounded-full bg-n-200" />;
  }

  if (!session) {
    return (
      <div className="flex shrink-0 items-center gap-1 sm:gap-2">
        <Button asChild variant="ghost" className="h-9 px-3 text-sm sm:h-11 sm:px-5 sm:text-[15px]">
          <Link href="/signin">সাইন ইন</Link>
        </Button>
        <Button asChild className="h-9 px-4 text-sm sm:h-11 sm:px-5 sm:text-[15px]">
          <Link href="/signup">সাইন আপ</Link>
        </Button>
      </div>
    );
  }

  const { user } = session;

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="flex shrink-0 items-center gap-2 rounded-full border border-border bg-n-100 py-[5px] pr-3 pl-[5px] transition-colors outline-none hover:bg-a-100 data-[state=open]:bg-a-100">
        <UserAvatar user={user} className="size-[34px] text-base" />
        <span className="hidden max-w-32 truncate text-sm font-semibold sm:block">{user.name?.split(" ")[0]}</span>
        <ChevronDown className="size-4" strokeWidth={2.75} />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        sideOffset={10}
        className="w-[270px] max-w-[calc(100vw-32px)] rounded-[28px] border-0 bg-n-100 p-2.5 shadow-lg ring-0"
      >
        <div className="flex items-center gap-3 px-2 pt-1.5 pb-3">
          <UserAvatar user={user} className="size-11 text-lg" />
          <div className="min-w-0">
            <p className="truncate text-[15px] font-bold">{user.name}</p>
            <p className="truncate text-xs text-n-700">{user.email}</p>
          </div>
        </div>
        <DropdownMenuItem asChild className="cursor-pointer rounded-full px-3.5 py-2.5 text-[15px] focus:bg-g-100">
          <Link href="/profile">
            <User className="size-4 text-g-700" strokeWidth={2.75} />
            আমার প্রোফাইল
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          onSelect={signOut}
          className="cursor-pointer rounded-full px-3.5 py-2.5 text-[15px] text-a-700 focus:bg-a-100 focus:text-a-700"
        >
          <LogOut className="size-4 text-a-700" strokeWidth={2.75} />
          সাইন আউট
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
