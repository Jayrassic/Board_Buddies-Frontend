import { GamesType } from "../models/global";

export default function GameTable({
  data,
}: {
  data: GamesType[];
}): React.JSX.Element {
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
            <tr key={game._id + game.owner._id}>
              <th>{game.name}</th>
              <th>{game.owner.userName}</th>
              <th>{game.minPlayers}</th>
              <th>{game.maxPlayers}</th>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
