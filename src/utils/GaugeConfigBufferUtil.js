import bluetoothDataBuffers from '../models/BluetoothDataBuffers'
import { engineDataItems, itemFromIndex as getEngineDataName } from '../models/EngineDataItem'

const SEPARATOR_VALUE = 255;
const SEPARATOR_BYTE_LENGTH = 3;

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
    for (var i = 0; i++; i < SEPARATOR_BYTE_LENGTH) {
        buffer.writeUIntLE(SEPARATOR_VALUE, bufferIndex, 1);
        bufferIndex++;
    }

    for (let key of config.monitors) {
        buffer.writeInt8(engineDataItems[key].index, bufferIndex++);
    }

    return buffer;
}

const convertGaugeConfigBufferToObject = (buffer) => {
    if (!buffer || buffer.length < 3) {
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

    let byteIndex = 2;
    let isInMonitorSection = false;
    let separatorCounter = 0;
    while (byteIndex < buffer.byteLength) {
        const value = buffer.readIntLE(byteIndex, 1);

        if (!isInMonitorSection) {
            separatorCounter = (value === SEPARATOR_VALUE) ? (separatorCounter + 1) : 0;

            if (separatorCounter === SEPARATOR_BYTE_LENGTH) {
                isInMonitorSection = true;
            }
        }

        if (value !== SEPARATOR_VALUE) {
            const name = getEngineDataName(byteIndex);
            if (name) {
                if (!isInMonitorSection) {
                    layoutConfig.gauges[name] = {
                        showGraph: (buffer.readIntLE(byteIndex + 1, 1) === 1),
                        graphTime: buffer.readIntLE(byteIndex + 2, 1)
                    }
                    byteIndex += 2;
                } else {
                    layoutConfig.monitors.push(name);
                }
            }
        }

        byteIndex++;
    }

    return layoutConfig;
}

export { convertGaugeConfigToBuffer, convertGaugeConfigBufferToObject }