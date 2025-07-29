import { requireServerAuth, getOptionalServerAuth } from "@/utils/auth-server";
import type { ReactNode } from "react";

interface ServerProtectedWrapperProps {
  children: ReactNode;
  fallbackUrl?: string;
  requireAuth?: boolean;
}

/**
 * Server-side protected wrapper component
 *
 * Usage:
 * ```tsx
 * export default async function MyProtectedPage() {
 *   return (
 *     <ServerProtectedWrapper requireAuth={true}>
 *       <div>This content is protected!</div>
 *     </ServerProtectedWrapper>
 *   );
 * }
 * ```
 */
export default async function ServerProtectedWrapper({
  children,
  fallbackUrl = "/login",
  requireAuth = true,
}: ServerProtectedWrapperProps) {
  if (requireAuth) {
    // This will redirect if not authenticated
    await requireServerAuth();
  }

  return <>{children}</>;
}

/**
 * Higher-order component for server-side protection
 *
 * Usage:
 * ```tsx
 * const ProtectedPage = withServerAuth(async function MyPage() {
 *   return <div>Protected content</div>;
 * });
 *
 * export default ProtectedPage;
 * ```
 */
export function withServerAuth<T extends Record<string, any>>(
  Component: (props: T) => Promise<ReactNode>,
  options: { fallbackUrl?: string } = {}
) {
  return async function ProtectedComponent(props: T) {
    // Check authentication before rendering the component
    const authData = await requireServerAuth();

    // Pass auth data as props to the component
    const enhancedProps = {
      ...props,
      authData,
    } as T & { authData: Awaited<ReturnType<typeof requireServerAuth>> };

    return await Component(enhancedProps);
  };
}

/**
 * Server-side authentication context provider
 * Use this to inject auth data into child components
 */
export async function ServerAuthProvider({
  children,
}: {
  children: (
    authData: Awaited<ReturnType<typeof getOptionalServerAuth>>
  ) => ReactNode;
}) {
  const authData = await getOptionalServerAuth();
  return <>{children(authData)}</>;
}

/**
 * Conditional rendering based on server-side authentication
 */
export async function ServerAuthGuard({
  authenticated,
  unauthenticated,
  loading,
}: {
  authenticated?: ReactNode;
  unauthenticated?: ReactNode;
  loading?: ReactNode;
}) {
  const authData = await getOptionalServerAuth();

  if (authData) {
    return <>{authenticated}</>;
  } else {
    return <>{unauthenticated}</>;
  }
}
