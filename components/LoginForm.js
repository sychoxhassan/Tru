import { signIn } from "next-auth/react";

export default function LoginForm() {
  return (
    <div style={{ textAlign: "center", marginTop: 100 }}>
      <h2>Please Sign In</h2>
      <button
        style={{
          padding: "10px 20px",
          fontSize: 16,
          cursor: "pointer",
          borderRadius: 5,
          border: "none",
          backgroundColor: "#4285f4",
          color: "white",
        }}
        onClick={() => signIn("google")}
      >
        Sign in with Google
      </button>
    </div>
  );
}
