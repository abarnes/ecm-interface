import { PowerFCCommands } from '../connectors/powerfc/PowerFCCommands'

const intervals = [
    {
        command: PowerFCCommands.basic,
        requestInterval: 1000,
        stateUpdateSkips: 0,
        startOffset: 0
    },
    {
        command: PowerFCCommands.sensorData,
        requestInterval: 2000,
        stateUpdateSkips: 0,
        startOffset: 250
    },
    {
        command: PowerFCCommands.advancedData,
        requestInterval: 1000,
        stateUpdateSkips: 0,
        startOffset: 500
    }
];

export default { intervals };