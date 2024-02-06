import { Outlet } from "react-router-dom";
import Nav from "../components/Nav";

export default function MainView() {
  return (
    <>
      <Nav />
      <Outlet />
    </>
  );
}
