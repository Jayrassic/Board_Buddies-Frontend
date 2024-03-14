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
    <nav
      className="navbar bg-primary navbar-primary p-3 navbar-expand-md"
      data-bs-theme="dark"
    >
      <div className="container">
        <Link className="navbar-brand" to="/">
          Board buddies
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarToggler"
          aria-controls="navbarToggler"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarToggler">
          {user && (
            // <div className="d-flex align-items-center gap-4">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <p className=" navbar-text text-white m-0 pe-4">
                  Welcome {user.userName}
                </p>
              </li>
              <li className="nav-item">
                <Link className="nav-link " to="/" onClick={logoutHandler}>
                  LogOut
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link " to={`/user/${user.userName}`}>
                  Your Games
                </Link>
              </li>
            </ul>
          )}
          {!user && (
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/create_account">
                  Create Account
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Log In
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
}
