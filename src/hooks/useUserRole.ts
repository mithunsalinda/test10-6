import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../services/firebase";
import type { GlobalRole } from "../types/diagram";

export function useUserRole(uid?: string | null) {
    const [role, setRole] = useState<GlobalRole | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;
        async function run() {
            if (!uid) {
                setRole(null);
                setLoading(false);
                return;
            }
            const snap = await getDoc(doc(db, "roles", uid));
            if (!cancelled) {
                setRole(snap.exists() ? (snap.data().role as GlobalRole) : "viewer");
                setLoading(false);
            }
        }
        run();
        return () => {
            cancelled = true;
        };
    }, [uid]);

    return { role, loading };
}
