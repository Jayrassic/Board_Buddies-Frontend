import { GamesType } from "../models/global";
import { useGamesContext } from "../hooks/useGamesContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { useParams } from "react-router-dom";

export default function GameTable({
  data,
}: {
  data: GamesType[];
}): React.JSX.Element {
  const { user } = useAuthContext();
  const { dispatch } = useGamesContext();
  const { id } = useParams();

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
    <table className="table table-striped table-bordered">
      <caption>Games Here</caption>

      <thead className="table-dark">
        <tr>
          <th>Game</th>
          <th>Owner</th>
          <th className="col-2">Min Players</th>
          <th className="col-2">Max Players</th>
        </tr>
      </thead>
      <tbody>
        {data.map((game) => {
          return (
            <>
              <tr key={game._id + game.owner._id}>
                <td>{game.name}</td>
                <td>{game.owner.userName}</td>
                <td>{game.minPlayers}</td>
                <td>{game.maxPlayers}</td>
              </tr>
              {user && id && (
                <button onClick={() => handleClick(game)}>Delete</button>
              )}
            </>
          );
        })}
      </tbody>
    </table>
  );
}
