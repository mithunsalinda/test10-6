import {
  addDoc, collection, doc, getDoc, onSnapshot, query, where, serverTimestamp,
} from "firebase/firestore";
import { db } from "./firebase";
import type { Diagram, AccessRole } from "../types/diagram";

const COLLECTION = "diagrams";

export async function createDiagram(ownerUid: string, title = "Untitled Diagram"): Promise<string> {
  const ref = await addDoc(collection(db, COLLECTION), {
    title,
    ownerUid,
    collaboratorUids: [ownerUid],
    collaboratorRoles: { [ownerUid]: "editor" as AccessRole },
    nodes: [],
    edges: [],
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return ref.id;
}

export function subscribeDiagramsForUser(
  uid: string,
  cb: (diagrams: Diagram[]) => void
) {
  const q = query(collection(db, COLLECTION), where("collaboratorUids", "array-contains", uid));
  return onSnapshot(q, (snap) => {
    const data = snap.docs.map(d => ({ id: d.id, ...(d.data() as Omit<Diagram, "id">) }));
    data.sort((a, b) => (b.updatedAt?.toMillis() ?? 0) - (a.updatedAt?.toMillis() ?? 0));
    cb(data);
  });
}
export function subscribeDiagramsForUser_Dual(
  uid: string,
  cb: (diagrams: Diagram[]) => void
) {
  const c = collection(db, COLLECTION);
  const unsubs: Array<() => void> = [];

  const merge = (a: Diagram[], b: Diagram[]) => {
    const m = new Map<string, Diagram>();
    [...a, ...b].forEach(x => m.set(x.id, x));
    const arr = [...m.values()];
    arr.sort((x, y) => (y.updatedAt?.toMillis() ?? 0) - (x.updatedAt?.toMillis() ?? 0));
    cb(arr);
  };

  let ownerList: Diagram[] = [];
  let collabList: Diagram[] = [];

  unsubs.push(onSnapshot(query(c, where("ownerUid", "==", uid)), (snap) => {
    ownerList = snap.docs.map(d => ({ id: d.id, ...(d.data() as Omit<Diagram, "id">) }));
    merge(ownerList, collabList);
  }));

  unsubs.push(onSnapshot(query(c, where("collaboratorUids", "array-contains", uid)), (snap) => {
    collabList = snap.docs.map(d => ({ id: d.id, ...(d.data() as Omit<Diagram, "id">) }));
    merge(ownerList, collabList);
  }));

  return () => unsubs.forEach(u => u());
}
