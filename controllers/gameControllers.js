const Game = require('../model/gameModel');
const fieldsGenerator = require('../utils/gameFieldGenerator');
const gameMaintaince = require('../utils/gamesMaintaince');

let games = [
    {
        userName: 'expirate game',
        gameId: 'b43918a8-5373-43ba-a7a3-6457722a92ca',
        roundsPlayed: 0,
        fields: [],
        fieldsRelayed: [],
        isActive: true,
        isWon: false,
        gameExpirationDate: 1622285881304
    }
];

const top10Ranking = [
    { name: 'Monika', rounds: 4 },
    { name: 'Adam', rounds: 12 },
    { name: 'Tomek', rounds: 7 },
    { name: 'Karol', rounds: 11 },
    { name: 'Ola', rounds: 6 },
    { name: 'Marek', rounds: 16 },
    { name: 'Piotrek', rounds: 5 },
    { name: 'Aneta', rounds: 8 },
    { name: 'Harry', rounds: 9 },
    { name: 'Paulina', rounds: 10 },
];

const startNewGame = (req, res, next) => {
    const userName = req.body.userName;
    const [gameFieldsRelayed, gameFields] = fieldsGenerator(25)

    if (userName.length < 3) {
        throw new Error('Invalid name.');
    };

    games = gameMaintaince.removeExpiredGames(games);

    const newGame = new Game(userName, gameFields, gameFieldsRelayed);
    games.push(newGame);

    const gameData = gameMaintaince.pepareGameDataForUser(newGame);

    res.send({ gameData });
};

const resumeGame = (req, res, next) => {
    const gameId = req.body.gameId;
    const resumedGameData = games.find(game => game.gameId === gameId);
    
    games = gameMaintaince.removeExpiredGames(games);
    if (!resumedGameData) {
        return res.send({ gameExpiried: true })
    }

    const gameData = gameMaintaince.pepareGameDataForUser(resumedGameData);

    res.send({ gameData });
};

const checkIsGameWon = fields => {
    let counter = 0;
    fields.forEach(field => {
        if (field.value === 'T') {
            counter++;
        }
    })
    if (counter === 3) {
        return true
    } else {
        return false
    }
}

const compare = (a, b) => {
    if (a.rounds < b.rounds) {
        return -1;
    }
    if (a.rounds > b.rounds) {
        return 1;
    }
    return 0;
}

const updateRanking = (roundsPlayed, userName) => {
    top10Ranking.push({
        name: userName,
        rounds: roundsPlayed
    })
    top10Ranking.sort(compare);
    top10Ranking.pop();

    return top10Ranking;
}

const checkAnswer = (req, res, next) => {
    const choosenFields = req.body.choosenFields;
    const currentGame = games.find(game => game.gameId === req.body.gameId);
    let ranking = null;

    if(!currentGame) {
        throw new Error("Game doesn't exist.")
    };

    for (let value of choosenFields) {
        const fieldsRelayedIndex = currentGame.fieldsRelayed.findIndex(field => field.id === value);
        const fieldIndex = currentGame.fields.findIndex(field => field.id === value);
        currentGame.fields[fieldIndex].value = currentGame.fieldsRelayed[fieldsRelayedIndex].value;
        currentGame.fields[fieldIndex].revealed = true;
    }

    currentGame.roundsPlayed++;
    currentGame.isWon = checkIsGameWon(currentGame.fields);

    if (currentGame.isWon) {
        ranking = updateRanking(currentGame.roundsPlayed, currentGame.userName);
        games = gameMaintaince.removeFinishedGames(games, currentGame.gameId);
    }

    res.send({
        round: currentGame.roundsPlayed,
        fields: currentGame.fields,
        isWon: currentGame.isWon,
        ranking: ranking
    })
}

exports.startNewGame = startNewGame;
exports.resumeGame = resumeGame;
exports.checkAnswer = checkAnswer;