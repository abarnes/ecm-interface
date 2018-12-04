import bluetoothDataBuffers from '../models/BluetoothDataBuffers'
import { engineDataItems, itemFromIndex as getEngineDataName } from '../models/EngineDataItem'

const SEPARATOR_VALUE = (256 * 256 * 256) - 1;

const convertGaugeConfigToBuffer = (config) => {
    if (typeof config !== "object" || !config.gauges || !config.monitors) {
        return null;
    }

    const itemCount = (Object.keys(config.gauges).length * 3) + Object.keys(config.monitors).length;

    let buffer = new Buffer(itemCount + 5);

    buffer.writeUInt16LE(bluetoothDataBuffers.readLayoutConfig, 0);
    
    let bufferIndex = 2
    for (let key of Object.keys(config.gauges)) {
        buffer.writeInt8(engineDataItems[key].index, bufferIndex++);
        buffer.writeInt8(config.gauges[key].showGraph ? 1 : 0, bufferIndex++);
        buffer.writeInt8(config.gauges[key].graphTime, bufferIndex++);
    }

    // separate the gauges and monitors
    buffer.writeUInt(SEPARATOR_VALUE, bufferIndex);
    bufferIndex += 3;

    for (let key of Object.keys(config.monitors)) {
        buffer.writeInt8(engineDataItems[key].index, bufferIndex++);
    }

    return buffer;
}

const convertGaugeConfigBufferToObject = (buffer) => {
    if (!buffer) {
        return null;
    }

    if (buffer.readInt16LE(0) !== bluetoothDataBuffers.setLayoutConfig) {
        console.log("Attempted to convert gauge config buffer when command was not setLayoutConfig (1). Aborting.");
        return null;
    }

    let layoutConfig = {
        gauges: {},
        monitors: {}
    };

    let isInGaugeSection = true;
    let index = 2;
    while (index < buffer.byteLength) {
        if (buffer.readIntLE(index, 3) === SEPARATOR_VALUE) {
            isInGaugeSection = false;
            index += 3;
        }

        let item = buffer.readIntLE(index, 1);

        // need to convert item index to item
        if (isInGaugeSection) {
            const name = getEngineDataName(index);
            if (name) {
                layoutConfig.gauges[item] = {
                    showGraph: buffer.readIntLE(index + 1, 1),
                    graphTime: buffer.readIntLE(index + 2, 1)
                }
            }
            index +=3;
        } else {
            const name = getEngineDataName(index);
            if (name) {
                layoutConfig.monitors[item] = item
            }
            index++;
        }
    }

    return layoutConfig;
}

export { convertGaugeConfigToBuffer, convertGaugeConfigBufferToObject }