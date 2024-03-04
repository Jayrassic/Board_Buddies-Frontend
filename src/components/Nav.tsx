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
    <nav className="navbar bg-primary text-light p-3">
      <Link className="nav-link navbar-brand text-white" to="/">
        Board buddies
      </Link>
      {user && (
        <div className="d-flex align-items-center gap-4">
          <span className="nav-item navbar-text text-white">
            Welcome {user.email}
          </span>

          <Link className="nav-link" to="/" onClick={logoutHandler}>
            LogOut
          </Link>
          <Link className="nav-link" to={`/user/${user.userName}`}>
            Your Games
          </Link>
        </div>
      )}

      {!user && (
        <div className="d-flex align-items-center gap-4">
          <Link className="nav-link" to="/create_account">
            Create Account
          </Link>
          <Link className="nav-link" to="/login">
            Log In
          </Link>
        </div>
      )}
    </nav>
  );
}
