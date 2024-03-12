import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export function useLogin() {
  const [error, setError] = useState<string[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { dispatch } = useAuthContext();

  async function login(email: string, password: string) {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:3000/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const json = await response.json();

      if (!response.ok) {
        setIsLoading(false);
        console.log("json");
        setError(json.error);
      }

      if (response.ok) {
        localStorage.setItem("user", JSON.stringify(json));
        dispatch({ type: "LOGIN", payload: json });
        setIsLoading(false);
      }
    } catch (err) {
      setIsLoading(false);
      setError([(err as Error).message]);
    }
  }

  return { login, isLoading, error };
}
