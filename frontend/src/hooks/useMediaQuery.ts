import { useState, useEffect } from "react";

type MediaQuery = string;

export const useMediaQuery = (query: MediaQuery): boolean => {
  // Initialize with false - SSR safe approach
  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
    // Create media query list
    const mediaQuery = window.matchMedia(query);

    // Set initial value
    setMatches(mediaQuery.matches);

    // Create event listener function
    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Add event listener
    mediaQuery.addEventListener("change", handleChange);

    // Cleanup
    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, [query]); // Re-run effect if query changes

  return matches;
};

// Example queries
export const mediaQueries = {
  sm: "(min-width: 640px)",
  md: "(min-width: 768px)",
  lg: "(min-width: 1024px)",
  xl: "(min-width: 1200px)",
  "2xl": "(min-width: 1536px)",
} as const;