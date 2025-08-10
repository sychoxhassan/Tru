export default function Layout({ children }) {
  return (
    <div style={{ maxWidth: 800, margin: "auto", padding: 20, fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center" }}>Google Drive Copy Tool</h1>
      {children}
    </div>
  );
}
