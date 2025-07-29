import { protectedProcedure, publicProcedure, router } from "../lib/trpc";
import { z } from "zod";

// Mock data for demonstration
const mockPosts = [
  {
    id: "1",
    title: "Getting Started with tRPC SSR",
    content: "This post demonstrates server-side rendering with tRPC",
    createdAt: new Date("2024-01-15T10:00:00Z"),
    author: "John Doe",
  },
  {
    id: "2",
    title: "Advanced tRPC Patterns",
    content: "Learn about advanced patterns and best practices",
    createdAt: new Date("2024-01-20T14:30:00Z"),
    author: "Jane Smith",
  },
  {
    id: "3",
    title: "Building with Next.js App Router",
    content: "How to leverage the new App Router features",
    createdAt: new Date("2024-01-25T09:15:00Z"),
    author: "Mike Johnson",
  },
];

export const appRouter = router({
  healthCheck: publicProcedure.query(() => {
    return "OK";
  }),

  privateData: protectedProcedure.query(({ ctx }) => {
    return {
      message: "This is private",
      user: ctx.session.user,
    };
  }),

  // Get all posts - great for SSR on homepage
  posts: router({
    list: publicProcedure.query(() => {
      return mockPosts;
    }),

    // Get a single post by ID - great for SSR on detail pages
    byId: publicProcedure
      .input(z.object({ id: z.string() }))
      .query(({ input }) => {
        const post = mockPosts.find((p) => p.id === input.id);
        if (!post) {
          throw new Error("Post not found");
        }
        return post;
      }),

    // Get posts by author - demonstrates filtering in SSR
    byAuthor: publicProcedure
      .input(z.object({ author: z.string() }))
      .query(({ input }) => {
        return mockPosts.filter((p) =>
          p.author.toLowerCase().includes(input.author.toLowerCase())
        );
      }),

    // Create a new post - for client-side mutations
    create: publicProcedure
      .input(
        z.object({
          title: z.string().min(1),
          content: z.string().min(1),
          author: z.string().min(1),
        })
      )
      .mutation(({ input }) => {
        const newPost = {
          id: String(mockPosts.length + 1),
          ...input,
          createdAt: new Date(),
        };
        mockPosts.push(newPost);
        return newPost;
      }),
  }),

  // Get server time - demonstrates Date serialization
  serverTime: publicProcedure.query(() => {
    return {
      timestamp: new Date(),
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    };
  }),
});

export type AppRouter = typeof appRouter;
