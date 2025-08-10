import { useSession } from "next-auth/react";
import Layout from "../components/Layout";
import LoginForm from "../components/LoginForm";
import Dashboard from "../components/Dashboard";

export default function Home() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <Layout>
        <p>Loading...</p>
      </Layout>
    );
  }

  return (
    <Layout>
      {!session ? <LoginForm /> : <Dashboard user={session.user} accessToken={session.accessToken} />}
    </Layout>
  );
}
