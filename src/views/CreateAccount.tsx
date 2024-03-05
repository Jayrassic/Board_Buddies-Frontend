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
    <div className="bg-secondary-subtle d-flex justify-content-center align-items-center min-vh-100">
      <div className=" col-4 bg-white p-4 rounded">
        <form className="centered" onSubmit={handleSubmit}>
          <h1 className="mb-3">Create an account</h1>
          <div className="login-form centered">
            <div className="input-box mb-3">
              <label className="form-label" htmlFor="userName">
                UserName:{" "}
              </label>
              <input
                className="form-control"
                type="text"
                name="userName"
                id="userName"
                placeholder="Name show to all users"
                onChange={(e) => setUserName(e.target.value)}
                value={userName}
              />
            </div>
            <div className="input-box mb-3">
              <label htmlFor="email">Email: </label>
              <input
                className="form-control"
                type="email"
                name="email"
                id="email"
                placeholder="example@email.com"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>
            <div className="input-box mb-3">
              <label htmlFor="password">Password: </label>
              <input
                className="form-control"
                type="password"
                name="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>
          </div>
          <button className="btn btn-primary" disabled={isLoading}>
            Create Account
          </button>
          {error && <div className="fs-5 text text-danger mt-2">{error}</div>}
        </form>
      </div>
    </div>
  );
}
