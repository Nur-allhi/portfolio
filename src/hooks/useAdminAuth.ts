import { useCallback, useSyncExternalStore } from "react";

const KEY = "admin_auth";
const USER = { email: "admin@nureallhi.dev", pass: "admin123" };

function subscribe(cb: () => void) {
  window.addEventListener("storage", cb);
  return () => window.removeEventListener("storage", cb);
}

export function useAdminAuth() {
  const isLoggedIn = useSyncExternalStore(subscribe, () => localStorage.getItem(KEY) === "1", () => false);

  const login = useCallback((email: string, pass: string) => {
    if (email === USER.email && pass === USER.pass) {
      localStorage.setItem(KEY, "1");
      window.dispatchEvent(new Event("storage"));
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(KEY);
    window.dispatchEvent(new Event("storage"));
  }, []);

  return { isLoggedIn, login, logout };
}

export const ADMIN_CREDENTIALS = USER;
