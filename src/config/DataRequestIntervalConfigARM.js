import { PowerFCCommands } from '../connectors/powerfc/PowerFCCommands'

const intervals = [
    {
        command: PowerFCCommands.basic,
        requestInterval: 500,
        stateUpdateSkips: 4,
        startOffset: 0
    }
];

export default { intervals };