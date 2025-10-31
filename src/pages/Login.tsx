import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../admin/AuthContext";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { login, loggedIn, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && loggedIn) {
      navigate("/admin/articles");
    }
  }, [loggedIn, loading, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(email, password);
    if (success) {
      navigate("/admin/articles");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <section className="login">
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="on"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="on"
        />
        <button type="submit">Login</button>
      </form>
    </section>
  );
}
