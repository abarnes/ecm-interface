import { PowerFCCommands } from '../connectors/powerfc/PowerFCCommands'

const convertToBuffer = (data) => {
    if (!data) {
        return new Buffer(0);
    }    

    switch (data.command.hex) {
        case PowerFCCommands.basic.hex:
            return mapBasic(data);
        case PowerFCCommands.advancedData.hex:
            return mapAdvancedData(data);
        case PowerFCCommands.aux.hex:
            return mapAux(data);
        case PowerFCCommands.sensorData.hex:
            return mapSensorData(data);
        default:
            return new Buffer(0);
    }
};

const mapBasic = (data) => {
    let buffer = new Buffer(25);

    buffer.writeUInt8(parseInt(PowerFCCommands.basic.responseStartByte, 16), 0);

    
    console.log(parseInt(data.time, 16));
    // buffer.writeUIntLE(data.time, 2, 8);
    buffer.writeInt16LE(data.boost, 10);
    buffer.writeUInt8((data.waterTemp + 40), 12);
    buffer.writeUInt8(data.knock, 13);
    buffer.writeUInt16LE(data.injectorDuty, 14);
    buffer.writeInt8(data.leadingIgnition, 16);
    buffer.writeInt8(data.trailingIgnition, 17);
    buffer.writeUInt16LE(data.speed, 18);
    buffer.writeUInt8((data.airTemp + 40), 20);
    buffer.writeUInt16LE(Math.round(data.batteryVoltage * 10), 21);
    buffer.writeUInt16LE(data.rpm, 23);

    return buffer;
}

const mapAdvancedData = (data) => {    
    let buffer = new Buffer(41);

    buffer.writeUInt8(parseInt(PowerFCCommands.advancedData.responseStartByte, 16), 0);

    console.log(parseInt(data.time, 16));
    // buffer.writeUIntLE(data.time, 2, 8);
    buffer.writeUInt16LE(data.rpm, 10);
    buffer.writeInt16LE(data.intakePressure, 12);
    buffer.writeUInt16LE(Math.round(data.mapSensorVoltage * 10), 14);
    buffer.writeUInt16LE(Math.round(data.tpsVoltage * 10), 16);
    buffer.writeUInt16LE(data.primaryInjectorPulse, 18);
    buffer.writeUInt16LE(data.fuelCorrection, 20);
    buffer.writeInt8(data.leadingIgnition, 22);
    buffer.writeInt8(data.trailingIgnition, 23);
    buffer.writeUInt8((data.fuelTemp + 40), 24);
    buffer.writeUInt8(data.mopPosition, 25);
    buffer.writeUInt8(data.boostTP, 26);
    buffer.writeUInt8(data.boostWG, 27);
    buffer.writeUInt8((data.waterTemp + 40), 28);
    buffer.writeUInt8((data.intakeTemp + 40), 29);
    buffer.writeUInt8(data.knock, 30);
    buffer.writeUInt16LE(Math.round(data.batteryVoltage * 10), 21);
    buffer.writeUInt16LE(data.speed, 33);
    buffer.writeUInt16LE(data.iscvDuty, 35);
    buffer.writeUInt16LE(Math.round(data.o2Voltage * 10), 37);
    buffer.writeUInt16LE(data.secondaryInjectorPulse, 39);

    return buffer;
}

const mapSensorData = (data) => {

    let buffer = new Buffer(42);

    buffer.writeUInt8(parseInt(PowerFCCommands.sensorData.responseStartByte, 16), 0);
    
    console.log(parseInt(data.time, 16));
    // buffer.writeUIntLE(data.time, 2, 8);
    buffer.writeUInt16LE(Math.round(data.mapSensorVoltage * 10), 10);
    buffer.writeUInt16LE(Math.round(data.tpsFullRangeVoltage * 10), 12);
    buffer.writeUInt16LE(Math.round(data.tpsNarrowRangeVoltage * 10), 14);
    buffer.writeUInt16LE(Math.round(data.mopPositionSensorVoltage * 10), 16);
    buffer.writeUInt16LE(Math.round(data.waterTempSensorVoltage * 10), 18);
    buffer.writeUInt16LE(Math.round(data.intakeAirTempSensorVoltage * 10), 20);
    buffer.writeUInt16LE(Math.round(data.fuelTempSensorVoltage * 10), 22);
    buffer.writeUInt16LE(Math.round(data.o2SensorVoltage * 10), 24);
    
    buffer.writeInt8((data.starterSwitch ? 1 : 0), 26);
    buffer.writeInt8((data.airConditioningSwitch ? 1 : 0), 27);
    buffer.writeInt8((data.powerSteeringPressureSwitch ? 1 : 0), 28);
    buffer.writeInt8((data.neutralSwitch ? 1 : 0), 29);
    buffer.writeInt8((data.clutchSwitch ? 1 : 0), 30);
    buffer.writeInt8((data.stopSwitch ? 1 : 0), 31);
    buffer.writeInt8((data.catalyzerThermoSensorSwitch ? 1 : 0), 32);
    buffer.writeInt8((data.electricalLoadSwitch ? 1 : 0), 33);
    buffer.writeInt8((data.exhaustTempWarningIndicator ? 1 : 0), 34);
    buffer.writeInt8((data.fuelPumpOperation ? 1 : 0), 35);
    buffer.writeInt8((data.fuelPumpControl ? 1 : 0), 36);
    buffer.writeInt8((data.airPumpRelay ? 1 : 0), 37);
    buffer.writeInt8((data.portAirControl ? 1 : 0), 38);
    buffer.writeInt8((data.chargeControl ? 1 : 0), 39);
    buffer.writeInt8((data.turboControl ? 1 : 0), 40);
    buffer.writeInt8((data.pressureRegulatorControl ? 1 : 0), 41);

    return buffer;
}

const mapAux = (data) => {
    return new Buffer(0);
}

export { convertToBuffer }  