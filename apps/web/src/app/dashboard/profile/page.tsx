import { requireServerAuth } from "@/utils/auth-server";
import { getAuthenticatedServerClient } from "@/utils/trpc-server";
import Link from "next/link";

// Force dynamic rendering for this route since it uses cookies() via auth functions
export const dynamic = "force-dynamic";

export default async function ProfilePage() {
  // Server-side authentication - redirects if not authenticated
  const authData = await requireServerAuth();

  // Get authenticated tRPC client
  const authenticatedClient = await getAuthenticatedServerClient();

  // Fetch additional protected data
  const privateData = await authenticatedClient.privateData.query();

  return (
    <div className="max-w-3xl mx-auto p-8 text-gray-900">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/dashboard"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4"
        >
          ← Back to Dashboard
        </Link>
        <h1 className="text-3xl font-bold mb-2 text-black">User Profile</h1>
        <p className="text-gray-700">
          Another server-side protected page with instant authentication.
        </p>
      </div>

      {/* Profile Card */}
      <div className="bg-white border border-gray-200 rounded-lg p-8 mb-6">
        <div className="flex items-start gap-6">
          {/* Avatar placeholder */}
          <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
            {authData.user.name?.charAt(0)?.toUpperCase() || "U"}
          </div>

          {/* Profile info */}
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-2 text-black">
              {authData.user.name}
            </h2>
            <p className="text-gray-700 mb-4">{authData.user.email}</p>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-600">User ID:</span>
                <p className="font-mono text-xs bg-gray-100 p-1 rounded mt-1 text-gray-800">
                  {authData.user.id}
                </p>
              </div>
              <div>
                <span className="font-medium text-gray-600">Member Since:</span>
                <p className="mt-1 text-gray-700">
                  {new Date(authData.user.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Session Information */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
        <h3 className="text-lg font-semibold mb-3 text-black">
          Session Information
        </h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium text-gray-700">Session ID:</span>
            <p className="font-mono text-xs bg-white p-2 rounded mt-1 break-all text-gray-800">
              {authData.session.id}
            </p>
          </div>
          <div>
            <span className="font-medium text-gray-700">Expires At:</span>
            <p className="mt-1 text-gray-800">
              {new Date(authData.session.expiresAt).toLocaleString()}
            </p>
          </div>
          <div>
            <span className="font-medium text-gray-700">Created:</span>
            <p className="mt-1 text-gray-800">
              {new Date(authData.session.createdAt).toLocaleString()}
            </p>
          </div>
          <div>
            <span className="font-medium text-gray-700">Last Updated:</span>
            <p className="mt-1 text-gray-800">
              {new Date(authData.session.updatedAt).toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* Server-side data */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
        <h3 className="text-lg font-semibold mb-3 text-black">
          Protected Server Data
        </h3>
        <p className="text-sm text-gray-700 mb-3">
          This data was fetched on the server using your authenticated session:
        </p>
        <div className="bg-white border border-gray-200 rounded p-4">
          <p className="mb-2 text-gray-800">
            <strong className="text-black">Message:</strong>{" "}
            {privateData.message}
          </p>
          <p className="text-gray-800">
            <strong className="text-black">Data for:</strong>{" "}
            {privateData.user.name} ({privateData.user.email})
          </p>
        </div>
      </div>

      {/* Implementation notes */}
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 mb-6">
        <h3 className="text-lg font-semibold mb-3 text-purple-800">
          🔒 Implementation Notes
        </h3>
        <ul className="text-sm text-purple-700 space-y-2">
          <li>
            <strong>Authentication:</strong> Uses{" "}
            <code className="bg-purple-100 px-1 py-0.5 rounded text-purple-800">
              requireServerAuth()
            </code>{" "}
            to check auth before rendering
          </li>
          <li>
            <strong>Data Fetching:</strong> Uses{" "}
            <code className="bg-purple-100 px-1 py-0.5 rounded text-purple-800">
              getAuthenticatedServerClient()
            </code>{" "}
            for protected tRPC calls
          </li>
          <li>
            <strong>Redirects:</strong> Automatic redirect to login if
            unauthenticated (no client-side JavaScript needed)
          </li>
          <li>
            <strong>Security:</strong> Protected content never reaches the
            browser for unauthorized users
          </li>
          <li>
            <strong>Performance:</strong> Zero loading states, instant
            protection, better Core Web Vitals
          </li>
        </ul>
      </div>

      {/* Actions */}
      <div className="flex gap-4">
        <Link
          href="/dashboard"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Back to Dashboard
        </Link>
        <Link
          href="/login"
          className="bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-700"
        >
          Logout & Login
        </Link>
      </div>
    </div>
  );
}
