// server-only
import "server-only";
import { cache } from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@server/lib/auth";
import type { Session } from "@server/lib/auth-types";

export const getServerSession = cache(async (): Promise<Session | null> => {
  // direct in-process call, no extra HTTP request
  return auth.api.getSession({ headers: await headers() });
});

export async function requireServerAuth(
  redirectTarget = "/login"
): Promise<Session> {
  const session = await getServerSession();
  if (!session) redirect(`${redirectTarget}?redirect=/dashboard`);
  return session;
}

export async function getOptionalServerAuth(): Promise<Session | null> {
  return getServerSession();
}
