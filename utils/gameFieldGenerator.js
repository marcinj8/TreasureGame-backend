const { v4: uuidv4 } = require('uuid');

const generate3 = (arr, treasureIndex) => {
    const value3Indexes = [
        treasureIndex % 5 ? treasureIndex - 1 : -1,
        treasureIndex + 5,
        (treasureIndex + 1) % 5 ? treasureIndex + 1 : -1,
        treasureIndex - 5
    ];
    value3Indexes.forEach(valueIndex => {
        if (valueIndex >= 0 && valueIndex < arr.length) {
            if (arr[valueIndex].value !== "T") {
                arr[valueIndex].value = 3;
            }
        }
    })
    return arr
}

const generate2 = (arr, treasureIndex) => {
    const value2Indexes = [
        treasureIndex % 5 < 4 ? treasureIndex - 4 : -1,
        treasureIndex % 5 > 0 ? treasureIndex + 4 : -1,
        treasureIndex + 10,
        treasureIndex - 10,
        treasureIndex % 5 > 0 ? treasureIndex - 6 : -1,
        treasureIndex % 5 < 4 ? treasureIndex + 6 : -1,
        treasureIndex % 5 < 3 ? treasureIndex + 2 : -1,
        treasureIndex % 5 > 1 ? treasureIndex - 2 : -1
    ];
    value2Indexes.forEach(valueIndex => {
        if (valueIndex >= 0 && valueIndex < arr.length) {
            if (arr[valueIndex].value !== 3 && arr[valueIndex].value !== "T") {
                arr[valueIndex].value = 2;
            }
        }
    })
    return arr
}

const generateValues = (arr, length) => {
    const treasureIndex = Math.floor(Math.random() * (length - 1));
    if (arr[treasureIndex].value === 1) {
        arr[treasureIndex].value = "T";
        generate3(arr, treasureIndex);
        generate2(arr, treasureIndex);
    } else {
        generateValues(arr, length);
    }
    return arr
}

const fieldsGenerator = (no) => {
    const arr = new Array(no);
    const arrForUser = new Array(no);
    for (let i = 0; i < no; i++) {
        const id = uuidv4();

        arrForUser[i] = {
            id,
            revealed: false,
            value: null
        }
        arr[i] = {
            id,
            value: 1,
        }
    }
    generateValues(arr, no)
    generateValues(arr, no)
    generateValues(arr, no)
    return [arr, arrForUser]
};

module.exports = fieldsGenerator;