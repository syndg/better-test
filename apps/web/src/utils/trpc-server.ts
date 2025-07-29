// server-only
import "server-only";
import { cache } from "react";
import { createTRPCOptionsProxy } from "@trpc/tanstack-react-query";
import { makeQueryClient } from "./query-client";
import { appRouter } from "@server/routers";
import { getServerSession } from "./auth-server";

export const getQueryClient = cache(makeQueryClient);

export const trpc = createTRPCOptionsProxy({
  router: appRouter,
  queryClient: getQueryClient,
  ctx: async () => ({
    session: await getServerSession(),
  }),
});

// Convenience caller for plain async/await usage in RSCs
export const trpcCaller = cache(async () =>
  appRouter.createCaller({ session: await getServerSession() })
);
