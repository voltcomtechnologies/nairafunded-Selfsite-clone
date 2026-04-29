export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div 
            className="admin-layout-wrapper" 
            style={{ 
                minHeight: "100vh",
                background: "#0b0f19",
                position: "relative",
                zIndex: 9999 // Ensure it stays above main site navbar
            }}
        >
            {children}
        </div>
    );
}
