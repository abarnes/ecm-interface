import DataRetriever from './src/dataRetrieval/dataRetriever'
import DataRequestIntervalsX64 from './src/config/DataRequestIntervalConfigX64'
import DataRequestIntervalsARM from './src/config/DataRequestIntervalConfigARM'
import BluetoothConnector from './src/bluetooth/BluetoothConnector'
import RealDataConnector from './src/connectors/powerfc/SerialConnector'
import MockDataConnector from './src/dataRetrieval/MockDataConnector'
import { startServer as startWebsocketServer } from './src/websocket/websocketController'

const shouldUseMockData = process.argv.includes("-mock") || process.argv.includes("mock");

const BLUETOOTH_ENABLED = true; // also need to remove 'bleno' override in webpack config

// start data requests
exports.startDataRequests = function startDataRequests() {
    const dataConnector = shouldUseMockData ? MockDataConnector : RealDataConnector;
    const intervalConfigForArch = (process.arch === "arm") ? DataRequestIntervalsARM : DataRequestIntervalsX64;
    if (BLUETOOTH_ENABLED) {
        BluetoothConnector.init();
    }
    DataRetriever.listen((BLUETOOTH_ENABLED ? BluetoothConnector : null), dataConnector, intervalConfigForArch.intervals, function statusUpdate(){});
}

// start websockets
exports.startWebsockets = function startWebsockets() {
    startWebsocketServer()
}

// startDataRequests();
// startWebsockets();

// export default { startDataRequests, startWebsockets };

