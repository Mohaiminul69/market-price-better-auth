import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export async function getSession() {
  return auth.api.getSession({ headers: await headers() });
}

export async function requireUser(returnTo) {
  const session = await getSession();
  if (!session) redirect(`/signin?redirect=${encodeURIComponent(returnTo)}`);
  return session.user;
}
