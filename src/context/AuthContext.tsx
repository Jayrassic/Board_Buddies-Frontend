import { createContext, useEffect, useReducer } from "react";

interface UserInterface {
  user: object | null;
}

// interface NullInterface {
//   user: null;
// }

const initialState = { user: null };

// type StateType = { user: null } | { user: UserInterface };

type ACTIONTYPE =
  | { type: "LOGIN"; payload: UserInterface }
  | { type: "LOGOUT"; payload: UserInterface };

export const AuthContext = createContext<UserInterface>(initialState);

export function authReducer(
  state: UserInterface,
  action: ACTIONTYPE
): UserInterface {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };
    case "LOGOUT":
      return { user: null };
    default:
      return state;
  }
}

type ChildrenProps = { children: React.ReactNode };

export const AuthContextProvider = ({ children }: ChildrenProps) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      dispatch({ type: "LOGIN", payload: user });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
