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
      <Link to="/">Board buddies</Link>
      <nav>
        {user && (
          <>
            <p>Welcome {user.email}</p>
            <Link to="/" onClick={logoutHandler}>
              LogOut
            </Link>
            <Link to={`/${user.userName}`}>Your Games</Link>
          </>
        )}

        {!user && (
          <>
            <Link to="/create_account">Create Account</Link>
            <Link to="/login">Log In</Link>
          </>
        )}
      </nav>
    </header>
  );
}
