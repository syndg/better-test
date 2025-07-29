import { serverTrpcClient } from "@/utils/trpc-server";
import Link from "next/link";

// Force dynamic rendering to prevent build-time tRPC call failures
export const dynamic = "force-dynamic";

export default async function SSRExamplesPage() {
  // This runs on the server during render time
  // The data will be available immediately when the page loads
  const [posts, serverTime] = await Promise.all([
    serverTrpcClient.posts.list.query(),
    serverTrpcClient.serverTime.query(),
  ]);

  return (
    <div className="max-w-4xl mx-auto p-8 text-gray-900">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4 text-black">
          tRPC SSR Examples
        </h1>
        <p className="text-gray-700 mb-4">
          This page demonstrates Server-Side Rendering (SSR) with tRPC. All data
          below was fetched on the server before the page was sent to your
          browser.
        </p>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-green-800 mb-2">
            ✅ Benefits of SSR with tRPC:
          </h3>
          <ul className="text-sm text-green-700 space-y-1">
            <li>
              • Data is available immediately when the page loads (no loading
              states)
            </li>
            <li>• Better SEO as search engines can see the rendered content</li>
            <li>• Faster perceived load times</li>
            <li>• Full type safety between server and client</li>
          </ul>
        </div>
      </div>

      {/* Server Time Section */}
      <div className="mb-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-3 text-black">
          Server Information
        </h2>
        <p className="text-sm text-gray-700 mb-2">
          Fetched via:{" "}
          <code className="bg-blue-100 px-2 py-1 rounded text-blue-800">
            serverTrpcClient.serverTime.query()
          </code>
        </p>
        <div className="space-y-2 text-gray-800">
          <p>
            <strong className="text-black">Server Time:</strong>{" "}
            {serverTime.timestamp.toLocaleString()}
          </p>
          <p>
            <strong className="text-black">Server Timezone:</strong>{" "}
            {serverTime.timezone}
          </p>
        </div>
      </div>

      {/* Posts Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-black">
          Latest Posts (SSR)
        </h2>
        <p className="text-sm text-gray-700 mb-4">
          Fetched via:{" "}
          <code className="bg-gray-100 px-2 py-1 rounded text-gray-800">
            serverTrpcClient.posts.list.query()
          </code>
        </p>
        <div className="grid gap-4">
          {posts.map((post) => (
            <div
              key={post.id}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow bg-white"
            >
              <h3 className="text-lg font-semibold mb-2 text-black">
                {post.title}
              </h3>
              <p className="text-gray-700 mb-3">{post.content}</p>
              <div className="flex justify-between text-sm text-gray-600">
                <span>By {post.author}</span>
                <span>{post.createdAt.toLocaleDateString()}</span>
              </div>
              <Link
                href={`/ssr-examples/post/${post.id}`}
                className="inline-block mt-3 text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                Read more →
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex gap-4 pt-6 border-t border-gray-200">
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
          Back to Client Example
        </Link>
      </div>
    </div>
  );
}
