const PowerFCCommands = {
    init: {
        hex: "F3020A",
        expectedBytes: 11,
        responseStartByte: "F3"
    },             
    sensorStrings: {
        hex: "DD0220",
        expectedBytes: 83
    },
    advancedData: {
        hex: "F0020D",
        expectedBytes: 33,
        responseStartByte: "F0"
    },
    mapIndices: {
        hex: "DB0222",
        expectedBytes: 5
    },
    sensorData: {
        hex: "DE021F",
        expectedBytes: 21,
        responseStartByte: "DE"
    },
    basic: {
        hex: "DA0223",
        expectedBytes: 23,
        responseStartByte: "da"
    },
    aux: {
        hex: "0002FD",
        expectedBytes: 7
    }
};

module.exports = { PowerFCCommands }