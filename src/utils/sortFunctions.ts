export function sortGameNameAscending(data) {
  const newData = [...data];

  newData.sort((a, b) => {
    if (a.name.toLowerCase() < b.name.toLowerCase()) {
      return -1;
    }

    if (a.name.toLowerCase() > b.name.toLowerCase()) {
      return -1;
    }

    return 0;
  });

  return newData;
}

export function sortGameNameDescending(data) {
  return sortGameNameAscending(data).reverse();
}

export function sortGameOwnerAscending(data) {
  const newData = [...data];

  newData.sort((a, b) => {
    if (a.owner.userName.toLowerCase() < b.owner.userName.toLowerCase()) {
      return -1;
    }

    if (a.owner.userName.toLowerCase() > b.owner.userName.toLowerCase()) {
      return -1;
    }

    return 0;
  });

  return newData;
}

export function sortGameOwnerDescending(data) {
  return sortGameNameAscending(data).reverse();
}

// Sorts the original array by minPlayers number of players in acceding order
export function sortMinPlayersAscending(data) {
  const newData = [...data];

  newData.sort((a, b) => {
    if (a.minPlayers < b.minPlayers) {
      return -1;
    }

    if (a.minPlayers > b.minPlayers) {
      return 1;
    }

    return 0;
  });

  return newData;
}

// Sorts the original array by minPlayers number of players in descending order
export function sortMinPlayersDescending(data) {
  return sortMinPlayersAscending(data).reverse();
}

// Sorts the original array by minPlayers number of players in acceding order
export function sortMaxPlayersAscending(data) {
  const newData = [...data];

  newData.sort((a, b) => {
    if (a.maxPlayers < b.maxPlayers) {
      return -1;
    }

    if (a.maxPlayers > b.maxPlayers) {
      return 1;
    }

    return 0;
  });

  return newData;
}

// Sorts the original array by minPlayers number of players in descending order
export function sortMaxPlayersDescending(data) {
  return sortMaxPlayersAscending(data).reverse();
}