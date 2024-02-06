import { useState } from "react";
import { useCreateAccount } from "../hooks/useCreateAccount";

export default function CreateAccount() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const { createAccount, isLoading, error } = useCreateAccount();

  async function handleSubmit(e) {
    e.preventDefault();
    await createAccount(email, password, userName);
  }

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h3>Create an account</h3>

      <div className="signup-inputs">
        <div className="input">
          <label htmlFor="userName">UserName: </label>
          <input
            type="text"
            name="userName"
            id="userName"
            placeholder="Name show to all users"
            onChange={(e) => setUserName(e.target.value)}
            value={userName}
          />
        </div>

        <div className="input">
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="example@email.com"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className="input">
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
      </div>
      <button disabled={isLoading}>Create Account</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
}
