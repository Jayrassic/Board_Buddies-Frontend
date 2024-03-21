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
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <p className=" navbar-text text-white m-0 pe-4">
                  Welcome {user.userName}
                </p>
              </li>
              <li className="nav-item">
                <Link className="nav-link " to="/" onClick={logoutHandler}>
                  <span
                    data-bs-toggle={window.innerWidth > 769 ? " " : "collapse"}
                    data-bs-target="#navbarToggler"
                  >
                    LogOut
                  </span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to={`/user/${user.userName}`} className="nav-link ">
                  <span
                    data-bs-toggle={window.innerWidth > 769 ? " " : "collapse"}
                    data-bs-target="#navbarToggler"
                  >
                    Your Games
                  </span>
                </Link>
              </li>
            </ul>
          )}
          {!user && (
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/create_account">
                  <span
                    data-bs-toggle={window.innerWidth > 769 ? " " : "collapse"}
                    data-bs-target="#navbarToggler"
                  >
                    Create Account
                  </span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  <span
                    data-bs-toggle={window.innerWidth > 769 ? " " : "collapse"}
                    data-bs-target="#navbarToggler"
                  >
                    Log In
                  </span>
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
}
