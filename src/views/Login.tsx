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
      <div className=" col-4 bg-white p-4 rounded">
        <form className="centered" onSubmit={handleSubmit}>
          <h1 className="mb-3">Login</h1>
          <div className="input-box mb-3">
            <label className="form-label" htmlFor="email">
              Email:{" "}
            </label>
            <input
              className="form-control"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
          </div>
          <div className="invalid-feedback">Please input a valid email</div>
          <div className="input-box mb-3">
            <label className="form-label" htmlFor="password">
              Password:{" "}
            </label>
            <input
              className="form-control"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
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
