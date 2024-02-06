import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";

export default function Nav(): React.JSX.Element {
  const { user } = useAuthContext();
  const { logout } = useLogout();

  function logoutHandler(): void {
    logout();
  }

  return (
    <header>
      <p>Board buddies</p>
      <nav>
        {user && (
          <>
            <p>Welcome {user.email}</p>
            <Link to="/" onClick={logoutHandler}>
              LogOut
            </Link>
          </>
        )}

        {!user && (
          <>
            <Link to="#">Create Account</Link>
            <Link to="/login">Log In</Link>
          </>
        )}
      </nav>
    </header>
  );
}
