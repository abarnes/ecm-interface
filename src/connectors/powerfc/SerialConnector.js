//import SerialPort from 'node-loader!./serialport.node';
import SerialPort from 'serialport'
import Buffer from 'buffer'
import ConvertHex from 'convert-hex'
import { PowerFCCommands } from './PowerFCCommands'
import PowerFCResponseParser from './PowerFCResponseParser'
import SerialConnectionStatus from './SerialConnectionStatus'

const SerialConectorConstants = {
    baudRate: 57600,
    dataBits: 8,
    parity: "none",
    stopBits: 1
};

const PowerFCConstants = {
    manufacturer: "FTDI",
    vendorId: "0403"
};

let port = null;
let wholeBuffer = null;
let currentCommands = [];
let statusCallback = SerialConnectionStatus.connecting;

// Main Serial Port Events (Public)

const connect = (options) => {
    console.log("Serialport Attempting to connect");
   
    if (typeof options.dataCallback=== "function") {
        PowerFCResponseParser.dataCallback = options.dataCallback;
    }
    if (typeof options.dataCallback === "function") {
        PowerFCResponseParser.errorCallback = options.errorCallback;
    }
    if (typeof options.statusCallback === "function") {
        statusCallback = options.statusCallback;
        statusCallback(SerialConnectionStatus.connecting);
    }

    findPowerFCPort()
        .then((powerFcPort) => {
            console.log("Serialport found", powerFcPort);
            if (typeof statusCallback === "function") {
                statusCallback(SerialConnectionStatus.connected);
            }

            port = new SerialPort(powerFcPort.comName, {
                baudRate: SerialConectorConstants.baudRate,
                dataBits: SerialConectorConstants.dataBits,
                parity: SerialConectorConstants.parity,
                stopBits: SerialConectorConstants.stopBits
            });
            
            // Open errors will be emitted as an error event
            port.on('error', serialPortError);
            port.on('data', serialPortDataReceived);

            writeToPort(PowerFCCommands.init);
        })
        .catch((err) => {
            console.error("Serialport error listing ports:", err);
            if (typeof statusCallback === "function") {
                statusCallback(SerialConnectionStatus.disconnected);
            }
        });
}

const close = () => {
    if (!port) { 
        console.log("Serialport Error: can't close connection. port is null.");
        return; 
    }

    port.close((err) => {
        console.log("Serialport Error: error closing connection", err);
        return;
    });

    console.log("Serialport connection closed."); 
}

const sendCommand = (command) => {
    writeToPort(command);
}


// Serial Port Helper Methods

const writeToPort = (command) => {
    if (!port) { 
        console.log("Serialport Error: can't write. port is null.");
        return; 
    }

    if (!command || typeof command.hex !== "string") {
        console.log("Serialport Error: can't write. hexCommandString is not a string.");
        return; 
    }

    currentCommands.push(command);
    port.write(ConvertHex.hexToBytes(command.hex), serialPortWritten);
}



// Serial Port Event Handlers

const serialPortError = (err) => {
    console.log('Serialport Error: ', err.message);
}

const serialPortWritten = (err) => {
    if (err) {
        return console.log('Serialport error on write: ', err.message);
    }

    console.log('Serialport written to successfully.');
}

const serialPortDataReceived = (data) => {
    // console.log("Serialport data received: ", data);

    wholeBuffer = addToBuffer(data, wholeBuffer)
    wholeBuffer = findCompleteCommandsInBuffer(currentCommands, wholeBuffer);
}



// Buffer Handling

const addToBuffer = (data, entireBuffer) => {
    if (!data || data.length < 1) {
        return entireBuffer;
    }

    if (!entireBuffer) {
        // create buffer
        entireBuffer = data;
    } else {
        // add to buffer
        let newBuffer = Buffer.alloc(data.length + entireBuffer.length);
        entireBuffer.copy(newBuffer, 0);
        data.copy(newBuffer, entireBuffer.length);
        entireBuffer = newBuffer;
    }

    return entireBuffer;
}

const findCompleteCommandsInBuffer = (commands, buffer) => {
    if (!commands || !commands.length || !buffer || !buffer.length) {
        return;
    }
    let updatedBuffer = buffer;

    const getStartOfBuffer = (currentCommand, currentBuffer) => {
        return currentBuffer.indexOf(Buffer.from(ConvertHex.hexToBytes(currentCommand.responseStartByte)));
    }

    const extractResponseFromBuffer = (currentCommand, currentBuffer) => {
        const commandStartInBuffer = getStartOfBuffer(currentCommand, currentBuffer);
        if (commandStartInBuffer < 0) {
            return;
        }

        if (currentBuffer.length < (commandStartInBuffer + currentCommand.expectedBytes)) {
            return;
        }
        
        return currentBuffer.slice(commandStartInBuffer, (commandStartInBuffer + currentCommand.expectedBytes));
    }

    const removeCommandFromBuffer = (currentCommand, currentBuffer) => {
        const newBufferLength = (currentBuffer.length - currentCommand.expectedBytes);
        if (newBufferLength < 1) {
            return currentBuffer;
        }

        let newBuffer = Buffer.alloc(newBufferLength);
        const commandStartInBuffer = getStartOfBuffer(currentCommand, currentBuffer);
        const commandEndInBuffer = (commandStartInBuffer + currentCommand.expectedBytes)
        if (commandStartInBuffer > 0) {
            currentBuffer.slice(0, commandStartInBuffer).copy(newBuffer, 0);
        }
        if (currentBuffer.length > commandEndInBuffer) {
            currentBuffer.slice(commandEndInBuffer, currentBuffer.length).copy(newBuffer, currentBuffer.slice(0, commandStartInBuffer).length);
        }
        
        return newBuffer;
    }

    commands.forEach((command, index) => {
        let responseBuffer = extractResponseFromBuffer(command, updatedBuffer);
        if (responseBuffer) {
            PowerFCResponseParser.parseResponse(command, responseBuffer);
            updatedBuffer = removeCommandFromBuffer(command, updatedBuffer);
            commands.splice(index, 1);
        }
    });

    return updatedBuffer;
}



// Find PowerFC in serial devices

const findPowerFCPort = () => {
    
    /*

    MacOS - Datalogit:

    { 
        comName: '/dev/tty.usbserial-A600dkoZ',
        manufacturer: 'FTDI',
        serialNumber: 'A600dkoZ',
        pnpId: undefined,
        locationId: '14200000',
        vendorId: '0403',
        productId: '6001' 
    }

    */

    const findPortInPortList = (foundPort) => {
        return (foundPort.manufacturer == PowerFCConstants.manufacturer) && (foundPort.vendorId == PowerFCConstants.vendorId);
    }

    return new Promise(function(resolve, reject) {
        SerialPort.list() 
            .then((ports) => {
                const port = ports.find(findPortInPortList);
                if (typeof port !== "undefined") {
                    resolve(port);
                } else {
                    reject("Valid port not found.")
                }
            })
            .catch((err) => {
                reject(err);
            });
    });
}
    
export default { connect, close, sendCommand };