import { headers, cookies } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "../../../server/src/lib/auth";

// Use Better Auth's official type inference
type Session = typeof auth.$Infer.Session;

/**
 * Server-side authentication helper
 * Checks authentication status by calling the better-auth API during SSR
 */
export async function getServerSession(): Promise<Session | null> {
  try {
    const cookieStore = await cookies();

    // Forward cookies to the auth server
    const cookieHeader = cookieStore.toString();

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/get-session`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          Cookie: cookieHeader,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      return null;
    }

    const result = await response.json();

    // better-auth returns { session, user } or null
    if (result && result.session && result.user) {
      return result as Session;
    }

    return null;
  } catch (error) {
    console.error("Server-side auth check failed:", error);
    return null;
  }
}

/**
 * Server-side authentication guard
 * Redirects to login if not authenticated
 */
export async function requireServerAuth(): Promise<Session> {
  const session = await getServerSession();

  if (!session) {
    redirect("/login?redirect=" + encodeURIComponent("/dashboard"));
  }

  return session;
}

/**
 * Server-side optional authentication
 * Returns session if authenticated, null otherwise (no redirect)
 */
export async function getOptionalServerAuth(): Promise<Session | null> {
  return await getServerSession();
}

/**
 * Create server-side tRPC context with authentication
 * This ensures the server-side tRPC client has the same session context
 */
export async function createServerAuthContext() {
  const session = await getServerSession();
  const cookieStore = await cookies();
  const headersList = await headers();

  return {
    session,
    cookies: cookieStore.toString(),
    headers: Object.fromEntries(headersList.entries()),
  };
}
