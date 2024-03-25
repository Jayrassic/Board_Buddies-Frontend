# Board Buddies Frontend

## Technical Overview

This is the frontend code for my Board buddies project. It's built the React framework as a single page application using react-dom-router. The styling comes via the Bootstrap framework.

## Goals

This project was created to have a searchable database for my friends board games. We collectively have over 100 board games and it can be difficult to know who has what, what games can be played, in what amount of time, and how many people can play. Thanks to this site, we now have a searchable database that can help sort that information so that we can quickly decide what games we want to play for the particular situation we are in. The game information comes from the [BoardGameGeeks](https://boardgamegeek.com/) public [API](https://boardgamegeek.com/wiki/page/BGG_XML_API2).

## Notes

Using the BoardGameGeeks API brought some challenges to this project. In my opinion it is very limit in how and what information is presented compared to their private API. For example it is returned via XML as opposed to JSON. Luckily there was a [community made parser](https://www.npmjs.com/package/@code-bucket/board-game-geek/v/0.0.4) that helped sort the data in a more manageable way.

The parser really helped this project but the API itself was missing information from their private API as well as their internal ranking which would place more popular game further up the list. Despite these limitations, BoardGameGeeks is the most comprehensive source of information on boardgames and was a clear choose for this project.

Overall this project deploys a host of skills which I am proud to display and even prouder that my friends and I can save some time trying to figure out what to play.

## Attribution

- Favicon: https://favicon.io/emoji-favicons/game-die/
- Board Game Geek JS API: https://www.npmjs.com/package/@code-bucket/board-game-geek/v/0.0.4
- BoardGameGeek API: https://boardgamegeek.com/wiki/page/BGG_XML_API2
