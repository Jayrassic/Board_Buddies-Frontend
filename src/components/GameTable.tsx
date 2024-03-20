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

  const [deleteData, setDeleteData] = useState<null | GamesType>(null);

  const handleClick = async (data: GamesType | null) => {
    if (data === null) {
      return;
    }
    if (user) {
      const response = await fetch(
        "https://boardbuddies-api-production.up.railway.app/games",
        {
          method: "DELETE",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          mode: "cors",
        }
      );
      const json: GamesType = await response.json();

      if (response.ok) {
        dispatch({ type: "DELETE_GAME", payload: json });
      }
    }
  };

  return (
    <div className="table-responsive">
      <table className=" table table-striped table-bordered align-middle">
        <thead className="table-dark">
          <tr>
            <th>Game</th>
            {!id && <th className="col-2">Owner</th>}
            <th className="col-2">Min Players</th>
            <th className="col-2">Max Players</th>
            <th>Playing Time</th>
            {id && <th className="col-1">Delete</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((game) => {
            return (
              <tr key={game._id + game.owner._id}>
                <td>{game.name}</td>
                {!id && <td>{game.owner.userName}</td>}
                <td>{game.minPlayers}</td>
                <td>{game.maxPlayers}</td>
                <td>{game.playingTime}</td>
                {user && id && (
                  <td>
                    <button
                      type="button"
                      className="btn"
                      data-bs-toggle="modal"
                      data-bs-target="#staticBackdrop"
                      onClick={() => setDeleteData(game)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="20"
                        viewBox="0 -960 960 960"
                        width="20"
                      >
                        <path
                          fill="#dc3545"
                          d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm80-160h80v-360h-80v360Zm160 0h80v-360h-80v360Z"
                        />
                      </svg>
                    </button>
                  </td>
                )}
              </tr>
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
        tabIndex={-1}
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
    </div>
  );
}
