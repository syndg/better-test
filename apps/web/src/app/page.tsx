import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24 text-gray-900">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-8 text-black">
          Better Test tRPC App
        </h1>
        <p className="text-lg text-gray-700 mb-12">
          Explore different tRPC patterns with Next.js App Router
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Server-Side Protected Routes */}
          <Link
            href="/dashboard"
            className="block p-6 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors"
          >
            <h2 className="text-xl font-semibold mb-2 text-green-800">
              🔒 Server-Side Protected
            </h2>
            <p className="text-sm text-green-600 mb-3">
              Server-side authentication with instant redirects and zero loading
              states
            </p>
            <ul className="text-xs text-green-700 space-y-1 text-left">
              <li>• Instant auth checks (no loading flickers)</li>
              <li>• Secure by default</li>
              <li>• Better performance & SEO</li>
              <li>• Server-side data fetching</li>
            </ul>
          </Link>

          {/* Client-Side Example */}
          <Link
            href="/ssr-examples"
            className="block p-6 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <h2 className="text-xl font-semibold mb-2 text-blue-800">
              🚀 Server-Side Rendering
            </h2>
            <p className="text-sm text-blue-600 mb-3">
              Server-side data fetching with immediate content availability
            </p>
            <ul className="text-xs text-blue-700 space-y-1 text-left">
              <li>• No loading states needed</li>
              <li>• Better SEO</li>
              <li>• Faster perceived performance</li>
              <li>• Direct server function calls</li>
            </ul>
          </Link>

          {/* Hybrid Example */}
          <Link
            href="/ssr-examples/hybrid"
            className="block p-6 bg-yellow-50 border border-yellow-200 rounded-lg hover:bg-yellow-100 transition-colors"
          >
            <h2 className="text-xl font-semibold mb-2 text-yellow-800">
              🔄 Hybrid Approach
            </h2>
            <p className="text-sm text-yellow-600 mb-3">
              Combines SSR for initial load with client-side for interactivity
            </p>
            <ul className="text-xs text-yellow-700 space-y-1 text-left">
              <li>• Fast initial page load</li>
              <li>• Interactive client features</li>
              <li>• Best of both worlds</li>
              <li>• Progressive enhancement</li>
            </ul>
          </Link>

          {/* Authentication Demo */}
          <Link
            href="/login"
            className="block p-6 bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100 transition-colors"
          >
            <h2 className="text-xl font-semibold mb-2 text-purple-800">
              🔐 Authentication Demo
            </h2>
            <p className="text-sm text-purple-600 mb-3">
              Experience server-side vs client-side authentication patterns
            </p>
            <ul className="text-xs text-purple-700 space-y-1 text-left">
              <li>• Server-side auth guards</li>
              <li>• Protected tRPC procedures</li>
              <li>• Session management</li>
              <li>• Instant redirects</li>
            </ul>
          </Link>
        </div>

        {/* Feature comparison */}
        <div className="mt-12 p-6 bg-gray-50 border border-gray-200 rounded-lg">
          <h2 className="text-lg font-semibold mb-6 text-black">
            ⚡ Authentication Patterns Comparison
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-semibold text-green-800 mb-3">
                🔒 Server-Side Protected Routes
              </h3>
              <ul className="text-sm text-green-700 space-y-1">
                <li>✅ Zero loading states</li>
                <li>✅ Instant redirects</li>
                <li>✅ Better security</li>
                <li>✅ SEO friendly</li>
                <li>✅ Better Core Web Vitals</li>
                <li>✅ No flash of wrong content</li>
              </ul>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h3 className="font-semibold text-red-800 mb-3">
                📱 Client-Side Auth (Traditional)
              </h3>
              <ul className="text-sm text-red-700 space-y-1">
                <li>❌ Loading states required</li>
                <li>❌ Client-side redirects</li>
                <li>❌ Flash of content</li>
                <li>❌ SEO challenges</li>
                <li>❌ Security concerns</li>
                <li>✅ More interactive</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Key Benefits */}
        <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
          <h2 className="text-lg font-semibold mb-3 text-black">
            🚀 Key tRPC Benefits
          </h2>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-left">
            <div>
              <h3 className="font-medium mb-2 text-gray-800">Type Safety</h3>
              <ul className="text-gray-700 space-y-1">
                <li>• End-to-end TypeScript</li>
                <li>• No code generation needed</li>
                <li>• Compile-time error checking</li>
                <li>• Automatic inference</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-2 text-gray-800">
                Developer Experience
              </h3>
              <ul className="text-gray-700 space-y-1">
                <li>• Auto-completion everywhere</li>
                <li>• Seamless refactoring</li>
                <li>• Built-in React Query integration</li>
                <li>• Server and client patterns</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
