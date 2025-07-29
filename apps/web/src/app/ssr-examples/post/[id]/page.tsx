import { trpcCaller } from "@/utils/trpc-server";
import { notFound } from "next/navigation";
import Link from "next/link";

// Force dynamic rendering to prevent build-time tRPC call failures
// export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function PostDetailPage({ params }: Props) {
  const { id } = await params;

  try {
    // Server-side data fetching with proper error handling
    const caller = await trpcCaller();
    const post = await caller.posts.byId({ id });

    return (
      <div className="max-w-3xl mx-auto p-8 text-gray-900">
        {/* Back Navigation */}
        <Link
          href="/ssr-examples"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
        >
          ← Back to SSR Examples
        </Link>

        {/* Post Content */}
        <article className="bg-white border border-gray-200 rounded-lg p-8">
          <header className="mb-6">
            <h1 className="text-3xl font-bold mb-4 text-black">{post.title}</h1>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span>
                By <strong className="text-gray-800">{post.author}</strong>
              </span>
              <span>•</span>
              <span>
                {post.createdAt.toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
          </header>

          <div className="prose max-w-none">
            <p className="text-gray-800 leading-relaxed text-lg">
              {post.content}
            </p>
          </div>
        </article>

        {/* SSR Info */}
        <div className="mt-8 bg-green-50 border border-green-200 rounded-lg p-4">
          <h3 className="font-semibold text-green-800 mb-2">
            🚀 SSR Information
          </h3>
          <p className="text-sm text-green-700">
            This post was fetched on the server using{" "}
            <code className="bg-green-100 px-2 py-1 rounded text-green-800">
              serverTrpcClient.posts.byId.query({`{ id: "${id}" }`})
            </code>
          </p>
          <p className="text-sm text-green-700 mt-2">
            The page was fully rendered on the server before being sent to your
            browser, which means faster loading and better SEO.
          </p>
        </div>

        {/* Additional Navigation */}
        <div className="mt-8 flex gap-4">
          <Link
            href="/ssr-examples/hybrid"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            View Hybrid Example
          </Link>
          <Link
            href="/dashboard"
            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
          >
            Client-side Example
          </Link>
        </div>
      </div>
    );
  } catch (error) {
    // Handle post not found or other errors
    console.error("Failed to fetch post:", error);
    notFound();
  }
}
