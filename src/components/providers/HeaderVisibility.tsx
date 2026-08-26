"use client";

import { createContext, useContext, useState, type Dispatch, type SetStateAction } from "react";

type HeaderVisibilityValue = {
  hidden: boolean;
  setHidden: Dispatch<SetStateAction<boolean>>;
};

const HeaderVisibilityContext = createContext<HeaderVisibilityValue | null>(null);

export function HeaderVisibilityProvider({ children }: { children: React.ReactNode }) {
  const [hidden, setHidden] = useState(false);
  return (
    <HeaderVisibilityContext.Provider value={{ hidden, setHidden }}>
      {children}
    </HeaderVisibilityContext.Provider>
  );
}

function useHeaderVisibilityContext() {
  const ctx = useContext(HeaderVisibilityContext);
  if (!ctx) {
    throw new Error("useHeaderVisibilityContext must be used within HeaderVisibilityProvider");
  }
  return ctx;
}

/**
 * Whether the fixed site header is currently slid out of view (see
 * Header.tsx's hide-on-scroll-down behavior). Any sticky element that
 * positions itself relative to the header (`sticky top-20` etc.) should
 * read this rather than hardcoding the header's height, or it'll show a
 * dead gap when the header hides and the element doesn't follow it up.
 */
export function useHeaderHidden() {
  return useHeaderVisibilityContext().hidden;
}

export function useSetHeaderHidden() {
  return useHeaderVisibilityContext().setHidden;
}
