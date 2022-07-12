import { useTheme } from '@mui/material';
import { useState, useEffect, useCallback } from 'react';

/** Returns information about the window size */
export default function useWindowDimensions() {
  const theme = useTheme();
  const hasWindow = typeof window !== 'undefined';

  const getWindowDimensions = useCallback(() => {
    const width = hasWindow ? window.innerWidth : null;
    const height = hasWindow ? window.innerHeight : null;
    let breakpoint;

    if (width == null) {
      breakpoint = null;
    } else if (width < theme.breakpoints.values.sm) {
      breakpoint = 'xs';
    } else if (width < theme.breakpoints.values.md) {
      breakpoint = 'sm';
    } else if (width < theme.breakpoints.values.lg) {
      breakpoint = 'md';
    } else if (width < theme.breakpoints.values.xl) {
      breakpoint = 'lg';
    } else {
      breakpoint = 'xl';
    }

    return {
      width,
      height,
      breakpoint,
    };
  }, [
    hasWindow,
    theme.breakpoints.values.lg,
    theme.breakpoints.values.md,
    theme.breakpoints.values.sm,
    theme.breakpoints.values.xl,
  ]);

  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    if (hasWindow) {
      const handleResize = () => {
        setWindowDimensions(getWindowDimensions());
      };

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
    return () => {};
  }, [getWindowDimensions, hasWindow]);

  return windowDimensions;
}
