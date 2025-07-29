"use client";

import { useState } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createTRPCClient, httpBatchLink } from "@trpc/client";
import { createTRPCContext } from "@trpc/tanstack-react-query";
import { makeQueryClient } from "./query-client";
import type { AppRouter } from "@server/routers";
import superjson from "superjson";

export const { TRPCProvider, useTRPC } = createTRPCContext<AppRouter>();

let browserQC: ReturnType<typeof makeQueryClient>;
function getQC() {
  if (typeof window === "undefined") return makeQueryClient();
  return (browserQC ??= makeQueryClient());
}

export function TRPCReactProvider({ children }: { children: React.ReactNode }) {
  const qc = getQC();
  const [client] = useState(() =>
    createTRPCClient<AppRouter>({
      links: [
        httpBatchLink({
          url: `${process.env.NEXT_PUBLIC_SERVER_URL}/trpc`,
          transformer: superjson,
          fetch(url, opts) {
            return fetch(url, { ...opts, credentials: "include" });
          },
        }),
      ],
    })
  );

  return (
    <QueryClientProvider client={qc}>
      <TRPCProvider trpcClient={client} queryClient={qc}>
        {children}
      </TRPCProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
