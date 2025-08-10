import { useState } from "react";
import { signOut } from "next-auth/react";

export default function Dashboard({ user, accessToken }) {
  const [link, setLink] = useState("");
  const [message, setMessage] = useState("");

  async function handleCopy() {
    if (!link) {
      setMessage("Please enter a valid Google Drive file/folder link.");
      return;
    }
    setMessage("Copying...");

    try {
      const res = await fetch("/api/copy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ link }),
      });
      const data = await res.json();
      if (data.success) {
        setMessage("File copied successfully! New File ID: " + data.fileId);
      } else {
        setMessage("Error: " + data.error);
      }
    } catch (err) {
      setMessage("Network error: " + err.message);
    }
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <p>Welcome, {user.name}</p>
        <button onClick={() => signOut()} style={{ cursor: "pointer" }}>
          Sign Out
        </button>
      </div>

      <input
        type="text"
        placeholder="Paste Google Drive file/folder link here"
        value={link}
        onChange={(e) => setLink(e.target.value)}
        style={{ width: "100%", padding: 10, marginTop: 20 }}
      />

      <button onClick={handleCopy} style={{ marginTop: 10, padding: "10px 20px" }}>
        Copy to My Drive
      </button>

      <p style={{ marginTop: 15 }}>{message}</p>
    </div>
  );
        }
