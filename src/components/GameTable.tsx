import { GamesType } from "../models/global";
import { useGamesContext } from "../hooks/useGamesContext";
import { useAuthContext } from "../hooks/useAuthContext";

export default function GameTable({
  data,
}: {
  data: GamesType[];
}): React.JSX.Element {
  const { user } = useAuthContext();
  const { dispatch } = useGamesContext();

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
    <table>
      <caption>Games Here</caption>

      <tbody>
        <tr>
          <th>Game</th>
          <th>Owner</th>
          <th>Min Players</th>
          <th>Max Players</th>
        </tr>
        {data.map((game) => {
          return (
            <>
              <tr key={game._id + game.owner._id}>
                <th>{game.name}</th>
                <th>{game.owner.userName}</th>
                <th>{game.minPlayers}</th>
                <th>{game.maxPlayers}</th>
              </tr>
              <button onClick={() => handleClick(game)}>Delete</button>
            </>
          );
        })}
      </tbody>
    </table>
  );
}
