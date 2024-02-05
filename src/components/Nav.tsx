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
            <a href="#">LogOut</a>
          </>
        )}

        {!user && (
          <>
            <a href="#">Create Account</a>
            <a href="#">Log In</a>
          </>
        )}
      </nav>
    </header>
  );
}
