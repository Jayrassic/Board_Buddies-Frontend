import { useState } from "react";
import { useLogin } from "../hooks/useLogin";

export default function LoginPage(): React.JSX.Element {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { login, isLoading, error } = useLogin();

  async function handleSubmit(e: React.MouseEvent) {
    e.preventDefault();
    await login(email, password);
  }

  return (
    <>
      <form className="login-form">
        <h1>Login</h1>
        <div className="input-box">
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className="input-box">
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <button disabled={isLoading} onClick={(e) => handleSubmit(e)}>
          Login
        </button>
        {error && <div className="error">{error}</div>}
      </form>
    </>
  );
}
