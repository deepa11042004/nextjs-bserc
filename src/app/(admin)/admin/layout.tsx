export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="admin-container">
      {/* No Navbar or Footer here */}
      {children}
    </div>
  );
}