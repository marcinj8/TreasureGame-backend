const removeExpiredGames = games => {
    const currentDate = new Date().getTime();
    const gamesUpdaded = games.filter(game => game.gameExpirationDate > currentDate);

    return gamesUpdaded;
}

const removeFinishedGames = (games, id) => {
    const gamesUpdaded = games.filter(game => game.gameId !== id);

    return gamesUpdaded;
}

const pepareGameDataForUser = game => {
    const gameDataForUser = {...game}
    delete gameDataForUser.fieldsRelayed;

    return gameDataForUser; 
}

module.exports.removeExpiredGames = removeExpiredGames;
module.exports.removeFinishedGames = removeFinishedGames;
module.exports.pepareGameDataForUser = pepareGameDataForUser;