import DataRetriever from './dataRetrieval/dataRetriever'
import DataRequestIntervalsX64 from './config/DataRequestIntervalConfigX64'
import DataRequestIntervalsARM from './config/DataRequestIntervalConfigARM'
// import BluetoothConnector from './bluetooth/BluetoothConnector'
import RealDataConnector from './connectors/powerfc/SerialConnector'
import MockDataConnector from './dataRetrieval/MockDataConnector'
import { startServer as startWebsocketServer } from './websocket/websocketController'

const shouldUseMockData = process.argv.includes("-mock") || process.argv.includes("mock");

const BLUETOOTH_ENABLED = false; // also need to remove 'bleno' override in webpack config

// start data requests
function startDataRequests() {
    const dataConnector = shouldUseMockData ? MockDataConnector : RealDataConnector;
    const intervalConfigForArch = (process.arch === "arm") ? DataRequestIntervalsARM : DataRequestIntervalsX64;
    if (BLUETOOTH_ENABLED) {
        BluetoothConnector.init();
    }
    DataRetriever.listen((BLUETOOTH_ENABLED ? BluetoothConnector : null), dataConnector, intervalConfigForArch.intervals, function statusUpdate(){});
}

// start websockets
function startWebsockets() {
    startWebsocketServer()
}

startDataRequests();
startWebsockets();


