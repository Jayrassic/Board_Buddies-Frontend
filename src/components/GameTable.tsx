import { GamesType } from "../models/global";
import { useGamesContext } from "../hooks/useGamesContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { useParams } from "react-router-dom";
import { useState } from "react";

export default function GameTable({
  data,
}: {
  data: GamesType[];
}): React.JSX.Element {
  const { user } = useAuthContext();
  const { dispatch } = useGamesContext();
  const { id } = useParams();

  const [deleteData, setDeleteData] = useState(null);

  const handleClick = async (data) => {
    console.log(data);
    const response = await fetch("http://localhost:3000/games", {
      method: "DELETE",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_GAME", payload: json });
    }
  };

  return (
    <>
      <table className=" table table-striped table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Game</th>
            {!id && <th className="col-2">Owner</th>}
            <th className="col-2">Min Players</th>
            <th className="col-2">Max Players</th>
            {id && <th className="col-1">Delete</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((game) => {
            return (
              <>
                <tr key={game._id + game.owner._id}>
                  <td>{game.name}</td>
                  {!id && <td>{game.owner.userName}</td>}
                  <td>{game.minPlayers}</td>
                  <td>{game.maxPlayers}</td>
                  {user && id && (
                    <td>
                      <button
                        type="button"
                        className="btn btn-danger"
                        data-bs-toggle="modal"
                        data-bs-target="#staticBackdrop"
                        onClick={() => setDeleteData(game)}
                      >
                        Delete
                      </button>
                    </td>
                  )}
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
      {/* Modal */}
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Are you sure you want to remove this game from you collection?
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              You can always add the game back if you change your mind.
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                No
              </button>
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
                onClick={() => handleClick(deleteData)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
