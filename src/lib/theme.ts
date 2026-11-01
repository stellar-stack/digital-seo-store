export type Theme = "blue" | "orange";

const STORAGE_KEY = "dss-theme";
const CHANGE_EVENT = "dss-themechange";

// Runs inline in <head>, before first paint, so a returning visitor never sees
// the default theme flash.
export const themeInitScript = `try{if(localStorage.getItem("${STORAGE_KEY}")==="orange")document.documentElement.dataset.theme="orange"}catch(e){}`;

export function getTheme(): Theme {
  return document.documentElement.dataset.theme === "orange" ? "orange" : "blue";
}

export function getServerTheme(): Theme {
  return "blue";
}

export function subscribeTheme(listener: () => void) {
  window.addEventListener(CHANGE_EVENT, listener);
  return () => window.removeEventListener(CHANGE_EVENT, listener);
}

export function setTheme(theme: Theme) {
  const root = document.documentElement;
  const apply = () => {
    // Components' own colour transitions would lag behind the crossfade.
    root.classList.add("theme-switching");
    if (theme === "orange") root.dataset.theme = "orange";
    else delete root.dataset.theme;
    window.dispatchEvent(new Event(CHANGE_EVENT));
  };
  const settle = () => root.classList.remove("theme-switching");

  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // Private mode or blocked storage: the theme still applies for this visit.
  }

  // A short system crossfade rather than every colour snapping at once.
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reduceMotion && document.startViewTransition) {
    document.startViewTransition(apply).finished.finally(settle);
  } else {
    apply();
    requestAnimationFrame(() => requestAnimationFrame(settle));
  }
}
