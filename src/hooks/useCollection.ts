import { useEffect, useState } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../lib/firebase";

export function useCollection<T>(name: string, fallback: T[]): { data: T[]; loading: boolean } {
  const [data, setData] = useState<T[]>(fallback);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const q = query(collection(db, name), orderBy("order", "asc"));
    const unsub = onSnapshot(q, (snap) => {
      if (snap.empty) { setData(fallback); } else { setData(snap.docs.map(d => ({ id: d.id, ...(d.data() as T) }))); }
      setLoading(false);
    }, () => { setData(fallback); setLoading(false); });
    return () => unsub();
  }, [name, fallback]);
  return { data, loading };
}
