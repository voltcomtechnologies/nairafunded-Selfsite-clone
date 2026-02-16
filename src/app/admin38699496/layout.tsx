export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="admin-layout" style={{ position: "fixed", inset: 0, zIndex: 9999, background: "#0b0f19" }}>
            {children}
        </div>
    );
}
