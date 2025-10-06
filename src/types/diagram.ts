import type { Edge, Node } from "reactflow";

export type GlobalRole = "editor" | "viewer";
export type AccessRole = "editor" | "viewer";

export type DiagramNodeData = { label: string };
export type DiagramNode = Node<DiagramNodeData>;
export type DiagramEdge = Edge;

export interface Diagram {
    id: string;
    title: string;
    ownerUid: string;
    collaboratorUids: string[];
    collaboratorRoles: Record<string, AccessRole>;
    nodes: DiagramNode[];
    edges: DiagramEdge[];
    createdAt?: unknown;
    updatedAt?: unknown;
}
