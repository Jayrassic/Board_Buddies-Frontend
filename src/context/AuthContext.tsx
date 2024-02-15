import { createContext, useEffect, useReducer } from "react";
import { authReducer } from "../utils/authReducer";
import { UserTokenType } from "../models/global";

interface UserInterface {
  user: UserTokenType | null;
}

const initialState = { user: null };

export const AuthContext = createContext<UserInterface>(initialState);

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
