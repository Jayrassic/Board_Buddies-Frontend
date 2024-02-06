import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

export default function Nav(): React.JSX.Element {
  const { user } = useAuthContext();

  return (
    <header>
      <p>Board buddies</p>
      <nav>
        {user && (
          <>
            <p>Welcome {user.email}</p>
            <Link to="#">LogOut</Link>
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
