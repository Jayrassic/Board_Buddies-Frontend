import { useEffect, useState } from "react";
import {
  parseBggXmlApi2ThingResponse,
  BggGame,
  BggExpansion,
} from "@code-bucket/board-game-geek";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

export default function GameDetails() {
  type DataType = BggGame | BggExpansion | null;
  const [gameData, setGameData] = useState<DataType>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<boolean | string>(false);

  const { user } = useAuthContext();

  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    if (id === undefined) {
      return;
    }
    async function searchThing(id: string) {
      setError(false);
      try {
        const response = await fetch(
          `https://api.geekdo.com/xmlapi2/thing?id=${id}&versions=1&type=boardgame,boardgameexpansion`
        );
        const data = await response.text();
        const bggResponse = parseBggXmlApi2ThingResponse(data);
        console.log(bggResponse);
        if (bggResponse && bggResponse.items[0].type !== "boardgameaccessory") {
          // Error is irrelevant as the search result does not return lint error/
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          setGameData(bggResponse.items[0]);
          setIsLoading(false);
        }
      } catch (err) {
        setIsLoading(false);
        setError((err as Error).message);
      }
    }
    searchThing(id);
  }, [id]);

  async function handleAdd(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();

    if (!user) {
      setError("Please log into account");
      return;
    }

    let data = null;

    if (gameData) {
      data = {
        name: gameData.names[0].value,
        description: gameData.description,
        minPlayers: gameData.minplayers,
        maxPlayers: gameData.maxplayers,
        image: gameData.image,
        thumbnail: gameData.thumbnail,
      };
    }

    try {
      const response = await fetch("http://localhost:3000/games", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });

      const json = await response.json();

      if (!response.ok) {
        setError(json.error);
      }

      if (response.ok) {
        setError(false);
        navigate(`/user/${user.userName}`);
      }
    } catch (err) {
      setError((err as Error).message);
    }
  }

  return (
    <section className="bg-secondary-subtle min-vh-100 ">
      {error && <h1>{error}</h1>}
      {isLoading && (
        <div className="position-absolute top-50 start-50 translate-middle">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      {gameData && (
        <div className="container bg-white p-3 rounded min-vh-100">
          <h1>{gameData.names[0].value}</h1>
          <div className="row">
            <img
              className="img-fluid rounded col-5 row-5"
              src={gameData.image}
              alt=""
            />
            <div className="col d-flex flex-column justify-content-around">
              <p>
                <span className="fw-bold">Minimum Players: </span>
                {gameData.minplayers}
              </p>
              <p>
                <span className="fw-bold">Maximum Players: </span>
                {gameData.maxplayers}
              </p>
              <p>
                <span className="fw-bold">Playtime: </span>
                {gameData.playingtime} mins
              </p>
            </div>
          </div>
          <div className="pt-3 col-9">
            {" "}
            <p className="mb-0">
              <span className="fw-bold">Description: </span>
            </p>
            <p>
              {gameData.description
                .replace(/&quot;/g, '"')
                .replace(/&#10;/g, "\r\n")
                .replace(/&rsquo;/g, "'")
                .replace(/&mdash;/g, "—")}
            </p>
          </div>
          {user && (
            <div className="text-center m-2">
              {error && <h2 className="fs-5 text text-danger mt-2">{error}</h2>}
              <button
                type="button"
                className="btn btn-primary "
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
              >
                Add Game to your list
              </button>
            </div>
          )}
        </div>
      )}
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
                Add Game To your Collection?
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {" "}
              Are You sure you want to add this game?
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
                className="btn btn-primary"
                onClick={(e) => handleAdd(e)}
                data-bs-dismiss="modal"
              >
                Yes!
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
