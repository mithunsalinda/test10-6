import type { Timestamp } from "firebase/firestore";

export type AccessRole = "editor" | "viewer";

export interface Diagram {
  id: string;
  title: string;
  ownerUid: string;
  collaboratorUids: string[];
  collaboratorRoles: Record<string, AccessRole>;
  // React Flow content omitted here
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}