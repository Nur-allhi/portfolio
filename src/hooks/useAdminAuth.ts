import { useEffect, useState, useCallback } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, type User } from "firebase/auth";
import { auth } from "../lib/firebase";

export function useAdminAuth() {
  const [user, setUser] = useState<User | null>(auth.currentUser);
  const [loading, setLoading] = useState(!auth.currentUser);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => { setUser(u); setLoading(false); });
    return () => unsub();
  }, []);

  const login = useCallback(async (email: string, pass: string) => {
    try { await signInWithEmailAndPassword(auth, email, pass); return true; } catch { return false; }
  }, []);

  const logout = useCallback(async () => { await signOut(auth); }, []);

  return { user, isLoggedIn: !!user, loading, login, logout };
}
