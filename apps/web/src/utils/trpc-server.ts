import { createTRPCClient, httpBatchLink } from "@trpc/client";
import type { AppRouter } from "../../../server/src/routers";
import superjson from "superjson";
import { headers, cookies } from "next/headers";

// Create a server-side tRPC client with authentication support
export async function createAuthenticatedServerTrpcClient() {
  const headersList = await headers();
  const cookieStore = await cookies();

  return createTRPCClient<AppRouter>({
    links: [
      httpBatchLink({
        url: `${process.env.NEXT_PUBLIC_SERVER_URL}/trpc`,
        transformer: superjson,
        fetch(url, options) {
          return fetch(url, {
            ...options,
            credentials: "include",
            headers: {
              ...options?.headers,
              // Forward cookies for authentication
              Cookie: cookieStore.toString(),
              // Forward other relevant headers
              "User-Agent": headersList.get("user-agent") || "",
              Accept: headersList.get("accept") || "application/json",
            },
          });
        },
      }),
    ],
  });
}

// Basic server-side tRPC client (for public routes)
export const serverTrpcClient = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/trpc`,
      transformer: superjson,
      fetch(url, options) {
        return fetch(url, {
          ...options,
          credentials: "include",
        });
      },
    }),
  ],
});

// Helper function to create a server context for tRPC calls
export async function createServerContext(headers?: Headers) {
  return {
    headers: headers || new Headers(),
  };
}

/**
 * Get an authenticated server tRPC client
 * Use this when you need to call protected procedures from server components
 */
export async function getAuthenticatedServerClient() {
  return await createAuthenticatedServerTrpcClient();
}
