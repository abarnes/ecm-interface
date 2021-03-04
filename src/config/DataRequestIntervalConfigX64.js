import { PowerFCCommands } from '../connectors/powerfc/PowerFCCommands'

const intervals = [
    {
        command: PowerFCCommands.basic,
        requestInterval: 1000, // milliseconds
        stateUpdateSkips: 0,
        startOffset: 0
    },
    {
        command: PowerFCCommands.sensorData,
        requestInterval: 2000, // milliseconds
        stateUpdateSkips: 0,
        startOffset: 250 // milliseconds, after app launch to start polling this piece
    },
    {
        command: PowerFCCommands.advancedData,
        requestInterval: 1000, // milliseconds
        stateUpdateSkips: 0,
        startOffset: 500 // milliseconds, after app launch to start polling this piece
    }
];

export default { intervals };