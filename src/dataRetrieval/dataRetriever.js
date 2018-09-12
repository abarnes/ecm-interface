// import DataLogger from '../logger/DataLogger'
import store from '../store/EngineData';

let isListening = false;
let dataProvider = null;
let bluetoothConnector = null;
let hasReceivedValidData = false;

let updatesToSkip = {};
let skippedUpdateCounter = {};
let requests = {}; 

const listen = (bluetoothConnectorParam, dataProvider, dataRequestIntervals, statusUpdateReceivedParam) => {
    if ( !dataProvider || isListening || !statusUpdateReceivedParam) {
        return;
    }

    bluetoothConnector = bluetoothConnectorParam;

    // DataLogger.init();

    const serialOptions = {
        dataCallback: dataReceived,
        errorCallback: errorReceived,
        statusCallback: statusUpdateReceivedParam
    };
    dataProvider.connect(serialOptions);

    for (let request of dataRequestIntervals) {
        if (request.stateUpdateSkips) {
            updatesToSkip[request.command.hex] = request.stateUpdateSkips;
            skippedUpdateCounter[request.command.hex] = 0;
        }

        setTimeout(function () {
            setInterval(function() {
                dataProvider.sendCommand(request.command);
            }, request.requestInterval);
        }, request.startOffset);
    }
}

const stopListening = () => {
    dataProvider.close();
    isListening = false;
}


// callbacks

const dataReceived = (data) => { 
    if (!data || typeof data !== "object") {
        return;
    }    

    // Bypass state update but pipe data to logger every X responses
    let time = Date.now();
    // DataLogger.logData(time, data);
    bluetoothConnector.logEngineData(time, data);

    if (skippedUpdateCounter[data.command.hex] < updatesToSkip[data.command.hex]) {
        skippedUpdateCounter[data.command.hex]++;
    } else {
        skippedUpdateCounter[data.command.hex] = 0;
        store.updateState(data);
    }

    if (typeof data.rpm !== "undefined") {
        if (data.rpm > 300) {
            hasReceivedValidData = true;
        } else if (hasReceivedValidData && (data.rpm <= 0)) {
            console.log("Engine not running. Shutting down in 3 seconds.");
            /*
            shutdown.shutdown({
                force: true,
                timerseconds: 3,
                sudo: true,
                debug: false,
                quitapp: false
            });
            */ // TODO - reenable this
        }
    }
}

const errorReceived = (error) => {
    console.error("Error received", error);
}

export default { listen, stopListening }