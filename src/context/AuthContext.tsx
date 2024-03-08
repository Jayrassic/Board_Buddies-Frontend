import { createContext, useEffect, useReducer, Dispatch } from "react";
import { ActionType, authReducer } from "../utils/authReducer";
import { UserTokenType } from "../models/global";

type StateType = {
  user: UserTokenType | null;
  dispatch: Dispatch<ActionType>;
};

const initialState = { user: null, dispatch: () => {} };

export const AuthContext = createContext<StateType>(initialState);

type ChildrenProps = { children: React.ReactNode };

export const AuthContextProvider = ({ children }: ChildrenProps) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const user: UserTokenType = JSON.parse(
      localStorage.getItem("user") || `""`
    );

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
