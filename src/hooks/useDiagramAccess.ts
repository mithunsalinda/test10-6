import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../services/firebase";
import type { Diagram } from "../types/diagram";

export function useDiagramAccess(diagramId: string, uid?: string | null) {
    const [canView, setCanView] = useState(false);
    const [canEdit, setCanEdit] = useState(false);

    useEffect(() => {
        if (!diagramId || !uid) return;
        const unsub = onSnapshot(doc(db, "diagrams", diagramId), (snap) => {
            if (!snap.exists()) {
                setCanView(false);
                setCanEdit(false);
                return;
            }
            const d = snap.data() as Diagram;
            const isOwner = d.ownerUid === uid;
            const collabRole = d.collaboratorRoles?.[uid];
            setCanView(isOwner || !!collabRole);
            setCanEdit(isOwner || collabRole === "editor");
        });
        return () => unsub();
    }, [diagramId, uid]);

    return { canView, canEdit };
}
