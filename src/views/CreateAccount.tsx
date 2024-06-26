import { useState } from "react";
import { useCreateAccount } from "../hooks/useCreateAccount";

export default function CreateAccount() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const { createAccount, isLoading, error } = useCreateAccount();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await createAccount(email, password, userName);
  }

  return (
    <div className="bg-secondary-subtle d-flex justify-content-center align-items-center min-vh-100">
      <div className=" col-10 col-lg-4 bg-white p-4 rounded">
        <form className="centered" onSubmit={handleSubmit}>
          <h1 className="mb-3 fw-bold">Create an account</h1>
          <div className="login-form centered">
            <div className="input-box mb-3">
              <label className="form-label fw-bold fs-5" htmlFor="userName">
                User Name:{" "}
              </label>
              <input
                className="form-control"
                type="text"
                name="userName"
                id="userName"
                minLength={2}
                maxLength={15}
                placeholder="Name show to all users"
                onChange={(e) => setUserName(e.target.value)}
                value={userName}
                autoComplete="on"
                required
              />
            </div>
            <div className="input-box mb-3">
              <label className="form-label fw-bold fs-5" htmlFor="email">
                Email:{" "}
              </label>
              <input
                className="form-control"
                type="email"
                name="email"
                id="email"
                placeholder="example@email.com"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                autoComplete="on"
                required
              />
            </div>
            <div className="input-box mb-3">
              <label className="form-label fw-bold fs-5" htmlFor="password">
                Password:{" "}
                <span className="fs-6 fw-normal">
                  * Must be 8 charters long and include a capital, symbol, and
                  number *
                </span>
              </label>
              <input
                className="form-control"
                type="password"
                name="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                autoComplete="on"
                required
              />
            </div>
          </div>
          <button className="btn btn-primary" disabled={isLoading}>
            Create Account
          </button>
          {error &&
            error.map((singleError, index) => {
              return (
                <div key={index} className="fs-5 text text-danger mt-2">
                  {singleError}
                </div>
              );
            })}
        </form>
      </div>
    </div>
  );
}
