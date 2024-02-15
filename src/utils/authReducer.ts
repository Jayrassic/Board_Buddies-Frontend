interface UserInterface {
  user: object | null;
}
type ACTIONTYPE =
  | { type: "LOGIN"; payload: UserInterface }
  | { type: "LOGOUT"; payload: UserInterface };

export const authReducer = (
  state: UserInterface,
  action: ACTIONTYPE
): UserInterface => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };
    case "LOGOUT":
      return { user: null };
    default:
      return state;
  }
};
