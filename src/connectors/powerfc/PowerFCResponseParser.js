import { PowerFCCommands } from './PowerFCCommands'
import BitArray from 'node-bitarray'

let dataCallback = null;
let errorCallback = null;

// Main Response Handler
const parseResponse = (command, response) => {
    if (!command || !command.hex || !response || !response.length) {
        console.error("PowerFCResponseRouter.parseResponse called with incomplete parameters", command, response);
        return;
    }

    switch (command.hex) {
        case PowerFCCommands.init.hex:
            break;
        case PowerFCCommands.sensorStrings.hex:
            // I think we can just use sensorData here instead
            break;
        case PowerFCCommands.advancedData.hex:
            parseAdvanced(response);
            break;
        case PowerFCCommands.mapIndices.hex:
            // not yet supported
            break;
        case PowerFCCommands.sensorData.hex:
            parseSensorData(response);
            break;
        case PowerFCCommands.basic.hex:
            parseBasic(response);
            break;
        case PowerFCCommands.aux.hex:
            // Not yet supported
            break;
        default:
            console.warn("PowerFCResponseRouter.parseResponse called with unrecognized command: ", command);
            break;
    }

}



// Parser Methods

const parseBasic = (response) => {
    if (!response || response.length != PowerFCCommands.basic.expectedBytes) { 
        console.warn("PowerFCResponseRouter parseBasic called with incorrect byte length of " + response.length + ": ", response);
        return; 
    }

    const data = {
        command: PowerFCCommands.basic,
        injectorDuty: injectorDutyFromBuffer(response.slice(2, 4)),
        leadingIgnition: ignitionTimingFromBuffer(response.slice(4, 6)),
        trailingIgnition: ignitionTimingFromBuffer(response.slice(6, 8)),
        rpm: rpmFromBuffer(response.slice(8, 10)),
        speed: speedKphFromBuffer(response.slice(10, 12)),
        boost: boostFromBuffer(response.slice(12, 14)),
        knock: knockFromBuffer(response.slice(14, 16)),
        waterTemp: tempFromBuffer(response.slice(16, 18)),
        airTemp: tempFromBuffer(response.slice(18, 20)),
        batteryVoltage: batteryVoltageFromBuffer(response.slice(20, 22)),
        // checksum: response.slice(22, 23)
    };

    if (typeof PowerFCResponseRouter.dataCallback == "function") {
        PowerFCResponseRouter.dataCallback(data);
    } else {
        debugPrintData(data);
    }
}

const parseAdvanced = (response) => {
    if (!response || response.length != PowerFCCommands.advancedData.expectedBytes) { 
        console.warn("PowerFCResponseRouter parseAdvanced called with incorrect byte length of " + response.length + ": ", response);
        return; 
    }

    const data = {
        command:                PowerFCCommands.advancedData,
        rpm:                    rpmFromBuffer(response.slice(2, 4)),
        intakePressure:         intakePressureFromBuffer(response.slice(4, 6)),         // pressure at intake manifold
        mapSensorVoltage:       voltageFromBuffer(response.slice(6, 8), 1000),          // MAP sensor voltage
        tpsVoltage:             voltageFromBuffer(response.slice(8, 10), 1000),         // TPS sensor voltage
        primaryInjectorPulse:   voltageFromBuffer(response.slice(10, 12), 1000),        // primary injector pulse width
        fuelCorrection:         fuelCorrectionFromBuffer(response.slice(12, 14)),       // fuel correction 
        leadingIgnition:        ignitionTimingFromBuffer(response.slice(14, 15)),
        trailingIgnition:       ignitionTimingFromBuffer(response.slice(15, 16)),
        fuelTemp:               tempFromBuffer(response.slice(16, 17)),
        mopPosition:            mopPositionFromBuffer(response.slice(17, 18)),          // metering oil pump position
        boostTP:                boostDutyFromBuffer(response.slice(18, 19)),            // boost duty (tp)
        boostWG:                boostDutyFromBuffer(response.slice(19, 20)),            // boost duty (wastegate)
        waterTemp:              tempFromBuffer(response.slice(20, 21)),
        intakeTemp:             tempFromBuffer(response.slice(21, 22)),
        knock:                  knockFromBuffer(response.slice(22, 23)),
        batteryVoltage:         batteryVoltageFromBuffer(response.slice(23, 24)),
        speed:                  speedKphFromBuffer(response.slice(24, 26)),
        iscvDuty:               iscvDutyFromBuffer(response.slice(26, 28)),             // bypass air control valve (Idle speed control valve) duty
        o2Voltage:              voltageFromBuffer(response.slice(28, 29), 100), // is this divisor correct??
        // na1: response.slice(29, 30),                                                 // unknown
        secondaryInjectorPulse: voltageFromBuffer(response.slice(30, 32), 1000),        // injector pulse width
        // na2: response.slice(32, 33)                                                  // unknown
    }

    if (typeof PowerFCResponseRouter.dataCallback == "function") {
        PowerFCResponseRouter.dataCallback(data);
    } else {
        debugPrintData(data);
    }
}

const parseSensorData = (response) => {
    if (!response || response.length != PowerFCCommands.sensorData.expectedBytes) { 
        console.warn("PowerFCResponseRouter parseSensorData called with incorrect byte length of " + response.length + ": ", response);
        return; 
    }

    const data = {
        command: PowerFCCommands.sensorData,
        mapSensorVoltage: voltageFromBuffer(response.slice(2, 4), 100),
        tpsFullRangeVoltage: voltageFromBuffer(response.slice(4, 6), 100),
        tpsNarrowRangeVoltage: voltageFromBuffer(response.slice(6, 8), 100),
        mopPositionSensorVoltage: voltageFromBuffer(response.slice(8, 10), 100),
        waterTempSensorVoltage: voltageFromBuffer(response.slice(10, 12), 100),
        intakeAirTempSensorVoltage: voltageFromBuffer(response.slice(12, 14), 100),
        fuelTempSensorVoltage: voltageFromBuffer(response.slice(14, 16), 100),
        o2SensorVoltage: voltageFromBuffer(response.slice(16, 18), 100)
    };

    booleanSensorFlags = BitArray.fromBuffer(response.slice(18, 20)).__bits;

    data["starterSwitch"] = booleanSensorFlags[7];
    data["airConditioningSwitch"] = booleanSensorFlags[6];
    data["powerSteeringPressureSwitch"] = booleanSensorFlags[5];
    data["neutralSwitch"] = booleanSensorFlags[4];
    data["clutchSwitch"] = booleanSensorFlags[3];
    data["stopSwitch"] = booleanSensorFlags[2];
    data["catalyzerThermoSensorSwitch"] = booleanSensorFlags[1];
    data["electricalLoadSwitch"] = booleanSensorFlags[0];
    data["exhaustTempWarningIndicator"] = booleanSensorFlags[15];
    data["fuelPumpOperation"] = booleanSensorFlags[14];
    data["fuelPumpControl"] = booleanSensorFlags[13];
    data["airPumpRelay"] = booleanSensorFlags[12];
    data["portAirControl"] = booleanSensorFlags[11];
    data["chargeControl"] = booleanSensorFlags[10];
    data["turboControl"] = booleanSensorFlags[9];
    data["pressureRegulatorControl"] = booleanSensorFlags[8];

    if (typeof PowerFCResponseRouter.dataCallback == "function") {
        PowerFCResponseRouter.dataCallback(data);
    } else {
        debugPrintData(data);
    }
}


// Debug methods

const debugPrintData = (data) => {
    //process.stdout.write('\033[2J');
    //process.stdout.write('\033[0f');
    
    process.stdout.cursorTo(0);

    for (var key in data) {
        process.stdout.write(key + ": " + data[key] + "\n");
    }
}



// Parse Individual Sensors 

const injectorDutyFromBuffer = (buffer) => {
    return (buffer.readUInt16LE() /10);
}

const ignitionTimingFromBuffer = (buffer) => {
    const parsedBuffer = buffer.length == 2 ? buffer.readUInt16LE() : buffer.readUInt8();
    return (parsedBuffer - 25);
}

const rpmFromBuffer = (buffer) => {
    return buffer.readUInt16LE();
}

const speedKphFromBuffer = (buffer) => {
    return buffer.readUInt16LE();
}

const boostFromBuffer = (buffer) => {
    return (buffer.readUInt16LE() - 760);
}

const knockFromBuffer = (buffer) => {
    return buffer.length == 2 ? buffer.readUInt16LE() : buffer.readUInt8();
}

const tempFromBuffer = (buffer) => {
    const parsedBuffer = buffer.length == 2 ? buffer.readUInt16LE() : buffer.readUInt8();
    return (parsedBuffer - 80);
}

const batteryVoltageFromBuffer = (buffer) => {
    const parsedBuffer = buffer.length == 2 ? buffer.readUInt16LE() : buffer.readUInt8();
    return (parsedBuffer / 10);
}

const voltageFromBuffer = (buffer, divisor) => {
    const parsedBuffer = buffer.length == 2 ? buffer.readUInt16LE() : buffer.readUInt8();
    return (parsedBuffer / divisor);
}

const intakePressureFromBuffer = (buffer) => {
    return buffer.readUInt16LE();
}

const fuelCorrectionFromBuffer = (buffer) => {
    return buffer.readUInt16LE();
}

const mopPositionFromBuffer = (buffer) => {
    return buffer.readUInt8();
}

const boostDutyFromBuffer = (buffer) => {
    return (buffer.readUInt8() / 2.56);
}

const iscvDutyFromBuffer = (buffer) => {
    return (buffer.readUInt16LE() / 1000);
}

// make it a singleton
/*
let PowerFCResponseRouter = (function () {
    this.dataCallback = null;
    this.errorCallback = null;

    this.parseResponse = parseResponse;

    return this;
})();
*/

// export default PowerFCResponseRouter;

export default {
    dataCallback,
    errorCallback,
    parseResponse
}