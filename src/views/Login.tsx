import { useState } from "react";
import { useLogin } from "../hooks/useLogin";

export default function LoginPage(): React.JSX.Element {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { login, isLoading, error } = useLogin();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await login(email, password);
  }

  return (
    <div className="bg-secondary-subtle d-flex justify-content-center align-items-center min-vh-100">
      <div className=" col-10 col-lg-4 bg-white p-4 rounded">
        <form className="centered" onSubmit={handleSubmit}>
          <h1 className="mb-3 fw-bold">Login</h1>
          <div className="input-box mb-3">
            <label className="form-label fw-bold fs-5" htmlFor="email">
              Email:{" "}
            </label>
            <input
              id="email"
              className="form-control"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              autoComplete="on"
              required
            />
          </div>
          <div className="invalid-feedback">Please input a valid email</div>
          <div className="input-box mb-3">
            <label className="form-label fw-bold fs-5" htmlFor="password">
              Password:{" "}
            </label>
            <input
              id="password"
              className="form-control"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              autoComplete="on"
              required
            />
          </div>
          <button className="btn btn-primary" disabled={isLoading}>
            Login
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
