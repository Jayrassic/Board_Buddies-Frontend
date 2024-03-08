import { useAuthContext } from "./useAuthContext";

export function useLogout(): { logout: () => void } {
  const { dispatch } = useAuthContext();

  function logout(): void {
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT", payload: { user: null } });
  }
  return { logout };
}
