import { useState, useEffect } from 'react';

/**
 * ClientOnly Component - Only renders children on client side
 * Prevents hydration mismatch for components that use browser-only APIs
 */
export default function ClientOnly({ children, fallback = null }) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return fallback;
  }

  return children;
}
