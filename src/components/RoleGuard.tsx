import { useUserRole } from "../hooks/useUserRole";
import Loading from "./Loading";

export default function RoleGuard({
    uid,
    allow,
    children,
}: {
    uid: string;
    allow: Array<"editor" | "viewer">;
    children: React.ReactNode;
}) {
    const { role, loading } = useUserRole(uid);
    if (loading) return <Loading />;
    if (!role || !allow.includes(role)) return <div style={{ padding: 24 }}>Access denied</div>;
    return <>{children}</>;
}
