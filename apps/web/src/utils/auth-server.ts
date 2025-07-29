import "server-only";
import { cache } from "react";
import { headers, cookies } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@server/lib/auth";
import type { Session } from "@server/lib/auth-types";

export const getServerSession = cache(async (): Promise<Session | null> => {
  const [hdrsRaw, cookieStore] = await Promise.all([headers(), cookies()]);
  const hdrs = new Headers(hdrsRaw);
  const rawCookie = cookieStore.toString();
  if (rawCookie) hdrs.set("cookie", rawCookie);

  return auth.api.getSession({ headers: hdrs });
});

export async function requireServerAuth(
  redirectTarget = "/login"
): Promise<Session> {
  const session = await getServerSession();
  if (!session) redirect(`${redirectTarget}?redirect=/dashboard`);
  return session;
}

export const getOptionalServerAuth = getServerSession;
