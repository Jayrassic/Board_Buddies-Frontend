import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export function useCreateAccount() {
  const [error, setError] = useState<object | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { dispatch } = useAuthContext();

  async function createAccount(
    email: string,
    password: string,
    userName: string
  ) {
    setIsLoading(true);
    setError(null);

    const response = await fetch("http://localhost:3000/users/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, userName }),
    });
    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }

    if (response.ok) {
      localStorage.setItem("user", JSON.stringify(json));
      dispatch({ type: "LOGIN", payload: json });
      setIsLoading(false);
    }
  }
  return { createAccount, isLoading, error };
}
