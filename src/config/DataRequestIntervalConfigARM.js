import { PowerFCCommands } from '../connectors/powerfc/PowerFCCommands'

const intervals = [
    {
        command: PowerFCCommands.basic,
        requestInterval: 250,
        stateUpdateSkips: 0,
        startOffset: 0
    }
];

export default { intervals };