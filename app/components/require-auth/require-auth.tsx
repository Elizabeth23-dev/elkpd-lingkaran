import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { useAuth } from '~/hooks/use-auth';

const PUBLIC_PATHS = ['/login'];

interface RequireAuthProps {
  children: React.ReactNode;
}

/**
 * Wraps protected content. Redirects to /login if the user is not authenticated.
 * Public paths (e.g. /login) are always rendered without a redirect.
 */
export function RequireAuth({ children }: RequireAuthProps) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isPublic = PUBLIC_PATHS.some(
    (path) => location.pathname === path || location.pathname.startsWith(path + '/')
  );

  useEffect(() => {
    if (!isPublic && !user) {
      navigate('/login', { replace: true });
    }
  }, [user, isPublic, navigate]);

  // Always render public pages immediately
  if (isPublic) return <>{children}</>;

  // Block protected content until user is confirmed
  if (!user) return null;

  return <>{children}</>;
}
