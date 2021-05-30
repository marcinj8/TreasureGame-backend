const { v4: uuidv4 } = require('uuid');

class Game {
    constructor(name, gameFields, fieldsRelayed) {
        this.userName = name;
        this.gameId = uuidv4();
        this.roundsPlayed = 0;
        this.fields = gameFields;
        this.fieldsRelayed = fieldsRelayed;
        this.isActive = true;
        this.isWon = false;
        this.gameExpirationDate = new Date().getTime() + 3600000
    }
};

module.exports = Game;
