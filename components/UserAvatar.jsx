import Image from "next/image";
import { cn } from "@/lib/utils";

export default function UserAvatar({ user, className }) {
  const initial = (user?.name || user?.email || "?").trim().charAt(0).toUpperCase();

  return (
    <span
      className={cn(
        "grid shrink-0 place-items-center overflow-hidden rounded-full bg-g-500 font-heading text-n-100",
        className
      )}
    >
      {user?.image ? (
        <Image src={user.image} alt="" width={88} height={88} unoptimized className="size-full object-cover" />
      ) : (
        initial
      )}
    </span>
  );
}
