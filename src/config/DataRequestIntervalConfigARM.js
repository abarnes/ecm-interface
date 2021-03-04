import { PowerFCCommands } from '../connectors/powerfc/PowerFCCommands'

const intervals = [
    {
        command: PowerFCCommands.basic,
        requestInterval: 100, // milliseconds
        stateUpdateSkips: 0,
        startOffset: 0 // milliseconds
    }
];

export default { intervals };