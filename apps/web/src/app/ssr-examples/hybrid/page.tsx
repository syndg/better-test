import { serverTrpcClient } from "@/utils/trpc-server";
import Link from "next/link";
import ClientSideComponent from "./ClientSideComponent";

// Force dynamic rendering to prevent build-time tRPC call failures
export const dynamic = "force-dynamic";

export default async function HybridPage() {
  // SSR: Fetch initial data on the server
  const initialPosts = await serverTrpcClient.posts.list.query();
  const serverTime = await serverTrpcClient.serverTime.query();

  return (
    <div className="max-w-4xl mx-auto p-8 text-gray-900">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4 text-black">
          Hybrid SSR + Client Example
        </h1>
        <p className="text-gray-700 mb-4">
          This page demonstrates both Server-Side Rendering (SSR) and
          Client-Side data fetching with tRPC.
        </p>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-yellow-800 mb-2">
            🔄 Hybrid Approach Benefits:
          </h3>
          <ul className="text-sm text-yellow-700 space-y-1">
            <li>• Initial page loads fast with SSR data</li>
            <li>• Interactive features use client-side fetching</li>
            <li>• Best of both worlds: performance + interactivity</li>
            <li>• Progressive enhancement</li>
          </ul>
        </div>
      </div>

      {/* SSR Section */}
      <div className="mb-8 bg-green-50 border border-green-200 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-3 text-black">
          🚀 Server-Side Rendered Content
        </h2>
        <p className="text-sm text-gray-700 mb-4">
          This content was fetched and rendered on the server. No loading state
          needed!
        </p>

        <div className="mb-4">
          <h3 className="font-medium mb-2 text-gray-800">Server Time (SSR)</h3>
          <p className="text-sm text-gray-700">
            <strong className="text-black">Timestamp:</strong>{" "}
            {serverTime.timestamp.toLocaleString()}
          </p>
          <p className="text-sm text-gray-700">
            <strong className="text-black">Timezone:</strong>{" "}
            {serverTime.timezone}
          </p>
        </div>

        <div>
          <h3 className="font-medium mb-2 text-gray-800">Posts Count (SSR)</h3>
          <p className="text-sm text-gray-700">
            Total posts loaded on server:{" "}
            <strong className="text-black">{initialPosts.length}</strong>
          </p>
        </div>
      </div>

      {/* Client-Side Section */}
      <div className="mb-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-3 text-black">
          💻 Client-Side Interactive Content
        </h2>
        <p className="text-sm text-gray-700 mb-4">
          This section uses client-side tRPC calls for interactive features like
          filtering and real-time updates.
        </p>

        {/* This component will handle client-side interactions */}
        <ClientSideComponent initialPosts={initialPosts} />
      </div>

      {/* Comparison Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-black">
          ⚖️ SSR vs Client-Side Comparison
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="border border-green-200 rounded-lg p-4">
            <h3 className="font-semibold text-green-800 mb-2">
              SSR (Server-Side)
            </h3>
            <ul className="text-sm space-y-1 text-gray-700">
              <li>✅ Immediate content visibility</li>
              <li>✅ Better SEO</li>
              <li>✅ Faster perceived load time</li>
              <li>❌ No real-time updates</li>
              <li>❌ Less interactive</li>
            </ul>
          </div>
          <div className="border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-800 mb-2">Client-Side</h3>
            <ul className="text-sm space-y-1 text-gray-700">
              <li>✅ Real-time updates</li>
              <li>✅ Interactive features</li>
              <li>✅ Optimistic updates</li>
              <li>❌ Loading states required</li>
              <li>❌ Slower initial render</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex gap-4 pt-6 border-t border-gray-200">
        <Link
          href="/ssr-examples"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          ← Back to SSR Examples
        </Link>
        <Link
          href="/dashboard"
          className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
        >
          Client-Only Example
        </Link>
      </div>
    </div>
  );
}
