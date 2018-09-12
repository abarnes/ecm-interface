import DataRetriever from './dataRetrieval/dataRetriever'
import DataRequestIntervalsX64 from './config/DataRequestIntervalConfigX64'
import DataRequestIntervalsARM from './config/DataRequestIntervalConfigARM'
import BluetoothConnector from './bluetooth/BluetoothConnector'
import RealDataConnector from './connectors/powerfc/SerialConnector'
import MockDataConnector from './mock/MockDataConnector'
import { startServer } from './websocket/websocketController'
import SerialPort from 'serialport'

import os from "os"

const shouldUseMockData = process.argv.includes("-mock") || process.argv.includes("mock");

// start data requests
function startDataRequests() {
    const dataConnector = shouldUseMockData ? MockDataConnector : RealDataConnector;
    const intervalConfigForArch = (process.arch === "arm") ? DataRequestIntervalsARM : DataRequestIntervalsX64;
    BluetoothConnector.init();
    DataRetriever.listen(BluetoothConnector, dataConnector, intervalConfigForArch.intervals, function statusUpdate(){});
}

// start websockets
function startWebsockets() {
    startServer()
}

startDataRequests();
startWebsockets();


