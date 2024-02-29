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
    <nav className="navbar">
      <Link className="nav-link navbar-brand" to="/">
        Board buddies
      </Link>
      {user && (
        <div className="d-flex align-items-center gap-4">
          <span className="nav-item navbar-text">Welcome {user.email}</span>

          <Link className="nav-link" to="/" onClick={logoutHandler}>
            LogOut
          </Link>
          <Link className="nav-link" to={`/user/${user.userName}`}>
            Your Games
          </Link>
        </div>
      )}

      {!user && (
        <div>
          <Link to="/create_account">Create Account</Link>
          <Link to="/login">Log In</Link>
        </div>
      )}
    </nav>
  );
}
