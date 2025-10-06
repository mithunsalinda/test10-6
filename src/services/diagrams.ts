import { db } from "./firebase";
import {
    addDoc,
    collection,
    doc,
    getDoc,
    onSnapshot,
    orderBy,
    query,
    serverTimestamp,
    setDoc,
    updateDoc,
    where,
} from "firebase/firestore";
import type { Diagram, DiagramEdge, DiagramNode, AccessRole } from "../types/diagram";

export async function createDiagram(ownerUid: string): Promise<string> {
    const { id } = await addDoc(collection(db, "diagrams"), {
        title: "Untitled Diagram",
        ownerUid,
        collaboratorUids: [],
        collaboratorRoles: {},
        nodes: [] as DiagramNode[],
        edges: [] as DiagramEdge[],
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
    });
    return id;
}

export async function loadDiagram(id: string) {
    const snap = await getDoc(doc(db, "diagrams", id));
    return snap.exists() ? ({ id: snap.id, ...snap.data() } as Diagram) : null;
}

export async function saveDiagram(id: string, data: Pick<Diagram, "title" | "nodes" | "edges">) {
    await updateDoc(doc(db, "diagrams", id), {
        ...data,
        updatedAt: serverTimestamp(),
    });
}

export function subscribeMyDiagrams(uid: string, cb: (diagrams: Diagram[]) => void) {
    const q = query(collection(db, "diagrams"), where("collaboratorUids", "array-contains", uid));
    const q2 = query(collection(db, "diagrams"), where("ownerUid", "==", uid));
    const unsubs = [
        onSnapshot(q, (s) => cb(s.docs.map((d) => ({ id: d.id, ...d.data() }) as Diagram))),
        onSnapshot(q2, (s) => cb(s.docs.map((d) => ({ id: d.id, ...d.data() }) as Diagram))),
    ];
    return () => unsubs.forEach((u) => u());
}

export async function addCollaborator(diagramId: string, userUid: string, role: AccessRole) {
    const ref = doc(db, "diagrams", diagramId);
    const snap = await getDoc(ref);
    if (!snap.exists()) return;
    const d = snap.data() as Diagram;
    const set = new Set(d.collaboratorUids ?? []);
    set.add(userUid);
    await setDoc(
        ref,
        {
            collaboratorUids: Array.from(set),
            collaboratorRoles: { ...(d.collaboratorRoles ?? {}), [userUid]: role },
        },
        { merge: true }
    );
}
