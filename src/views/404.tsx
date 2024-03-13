import MainView from "./Main";

export default function Error404() {
  return (
    <>
      <MainView />
      <div className="bg-secondary-subtle min-vh-100">
        <div className="container bg-white p-3 rounded min-vh-100">
          <h1 className="d-flex justify-content-center align-items-center min-vh-100">
            404
          </h1>
        </div>
      </div>
    </>
  );
}
