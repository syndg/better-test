import { requireServerAuth } from "@/utils/auth-server";
import { trpcCaller } from "@/utils/trpc-server";
import Link from "next/link";

// Force dynamic rendering for this route since it uses cookies() via auth functions
export const dynamic = "force-dynamic";

export default async function Dashboard() {
  // Server-side authentication check - redirects to login if not authenticated
  const authData = await requireServerAuth();

  // Fetch protected data on the server (no loading states needed!)
  const privateData = await (await trpcCaller()).privateData();

  return (
    <div className="max-w-4xl mx-auto p-8 text-gray-900">
      {/* Success indicator */}
      <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
        <h2 className="font-semibold text-green-800 mb-2">
          🎉 Server-Side Protected Route
        </h2>
        <p className="text-sm text-green-700">
          This page uses server-side authentication! No client-side loading
          states or redirects needed.
        </p>
      </div>

      {/* Main content */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4 text-black">Dashboard</h1>
        <p className="text-gray-700 mb-6">
          Welcome back! This is your protected dashboard.
        </p>
      </div>

      {/* User info section */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-3 text-black">
          User Information
        </h2>
        <div className="space-y-2 text-gray-800">
          <p>
            <strong className="text-black">Name:</strong> {authData.user.name}
          </p>
          <p>
            <strong className="text-black">Email:</strong> {authData.user.email}
          </p>
          <p>
            <strong className="text-black">User ID:</strong> {authData.user.id}
          </p>
          <p>
            <strong className="text-black">Session ID:</strong>{" "}
            {authData.session.id}
          </p>
        </div>
      </div>

      {/* Protected data section */}
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-3 text-black">
          Protected Data (SSR)
        </h2>
        <p className="text-sm text-gray-700 mb-3">
          This data was fetched on the server using a protected tRPC procedure:
        </p>
        <div className="bg-white border border-gray-200 rounded p-4">
          <p className="text-gray-800">
            <strong className="text-black">Message:</strong>{" "}
            {privateData.message}
          </p>
          <p className="text-gray-800">
            <strong className="text-black">Fetched for:</strong>{" "}
            {privateData.user.name}
          </p>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Called via:{" "}
          <code className="bg-gray-100 px-1 py-0.5 rounded text-gray-800">
            authenticatedClient.privateData.query()
          </code>
        </p>
      </div>

      {/* Benefits section */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
        <h2 className="text-lg font-semibold mb-3 text-black">
          ✨ Server-Side Auth Benefits:
        </h2>
        <ul className="text-sm space-y-1 text-gray-700">
          <li>
            ✅ <strong className="text-black">No loading states</strong> -
            Authentication checked before page renders
          </li>
          <li>
            ✅ <strong className="text-black">Instant redirects</strong> -
            Unauthenticated users redirected immediately
          </li>
          <li>
            ✅ <strong className="text-black">Better SEO</strong> - No
            client-side redirect delays
          </li>
          <li>
            ✅ <strong className="text-black">Secure by default</strong> -
            Protected content never sent to unauthorized users
          </li>
          <li>
            ✅ <strong className="text-black">Server-side data fetching</strong>{" "}
            - Protected API calls happen on the server
          </li>
        </ul>
      </div>

      {/* Comparison with client-side approach */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="border border-green-200 rounded-lg p-4">
          <h3 className="font-semibold text-green-800 mb-2">
            Server-Side Auth (Current)
          </h3>
          <ul className="text-sm space-y-1 text-gray-700">
            <li>✅ No loading flickers</li>
            <li>✅ Instant protection</li>
            <li>✅ Better performance</li>
            <li>✅ SEO friendly</li>
            <li>✅ More secure</li>
          </ul>
        </div>
        <div className="border border-red-200 rounded-lg p-4">
          <h3 className="font-semibold text-red-800 mb-2">
            Client-Side Auth (Previous)
          </h3>
          <ul className="text-sm space-y-1 text-gray-700">
            <li>❌ Loading states required</li>
            <li>❌ Client-side redirects</li>
            <li>❌ Flash of wrong content</li>
            <li>❌ SEO challenges</li>
            <li>❌ Less secure</li>
          </ul>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex gap-4 pt-6 border-t border-gray-200">
        <Link
          href="/dashboard/profile"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          View Profile (SSR)
        </Link>
        <Link
          href="/ssr-examples"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          SSR Examples
        </Link>
        <Link
          href="/login"
          className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
        >
          Back to Login
        </Link>
      </div>
    </div>
  );
}
