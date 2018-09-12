import { PowerFCCommands } from '../../../serial/PowerFCCommands'

let dataCallback = null;
let data = {
    command: PowerFCCommands.basic,
    injectorDuty: 20,
    leadingIgnition: 10,
    trailingIgnition: -5,
    rpm: 2500,
    speed: 50,
    boost: -300,
    knock: 10,
    waterTemp: 60,
    airTemp: 30,
    batteryVoltage: 14,

    // advanced
    intakePressure: 100,            // pressure at intake manifold
    mapSensorVoltage: 2,          // MAP sensor voltage
    tpsVoltage: 3,                 // TPS sensor voltage 
    primaryInjectorPulse: 0,      // primary injector pulse width
    fuelCorrection: 0,            // fuel correction 
    fuelTemp: 50,
    mopPosition: 30,               // metering oil pump position
    boostTP: 0,                   // boost duty (tp)
    boostWG: 0,                   // boost duty (wastegate)
    intakeTemp: 40,
    iscvDuty: 50,                  // bypass air control valve (Idle speed control valve) duty
    o2Voltage: 0,
    secondaryInjectorPulse: 0,    // injector pulse width

    // sensors
    tpsFullRangeVoltage: 2,
    tpsNarrowRangeVoltage: 3,
    mopPositionSensorVoltage: 3,
    waterTempSensorVoltage: 3,
    intakeAirTempSensorVoltage: 3,
    fuelTempSensorVoltage: 3,

    starterSwitch: true,
    airConditioningSwitch: false,
    powerSteeringPressureSwitch: false,
    neutralSwitch: false,
    clutchSwitch: false,
    stopSwitch: true,
    catalyzerThermoSensorSwitch: false,
    electricalLoadSwitch: false,
    exhaustTempWarningIndicator: false,
    fuelPumpOperation: true,
    fuelPumpControl: false,
    airPumpRelay: false,
    portAirControl: false,
    chargeControl: false,
    turboControl: true,
    pressureRegulatorControl: false
}

const connect = (options) => {
    if (typeof options.dataCallback !== "undefined") {
        dataCallback = options.dataCallback;
    }

    if (typeof options.statusCallback !== "undefined") {
        options.statusCallback("connected");
    }
}

const close = () => {}

const sendCommand = (command) => {
    const sign = Math.random() < .5 ? -1 : 1; 

    if (command === PowerFCCommands.basic) {

        data.command = PowerFCCommands.basic;
        data.injectorDuty = Math.round(data.injectorDuty + (Math.random() * sign * 10), 1);
        data.leadingIgnition = Math.round(data.leadingIgnition + (Math.random() * sign * 4));
        data.trailingIgnition = Math.round(data.trailingIgnition + (Math.random() * sign * 4));
        data.rpm = Math.round(data.rpm + (Math.random() * 200 * sign));
        data.speed = Math.round(data.speed + (Math.random() * 30 * sign), 2);
        data.boost = Math.round(data.boost + (Math.random() * 60 * sign * -1));
        data.knock = Math.round(data.knock + (Math.random() * 10 * sign));
        data.waterTemp = Math.round(data.waterTemp + (Math.random() * 8 * sign));
        data.airTemp = Math.round(data.airTemp + (Math.random() * 8 * sign));
        data.batteryVoltage = Math.round(data.batteryVoltage + (Math.random() * sign), 1);

    } else if (command === PowerFCCommands.advancedData) {

        data.command = PowerFCCommands.advancedData;
        data.rpm = Math.round(data.rpm + (Math.random() * 200 * sign));
        data.waterTemp = Math.round(data.waterTemp + (Math.random() * 8 * sign));
        data.knock = Math.round(data.knock + (Math.random() * 10 * sign));
        data.speed = Math.round(data.speed + (Math.random() * 30 * sign), 2);
        data.leadingIgnition = Math.round(data.leadingIgnition + (Math.random() * sign * 4));
        data.trailingIgnition = Math.round(data.trailingIgnition + (Math.random() * sign * 4));
        data.batteryVoltage = Math.round(data.batteryVoltage + (Math.random() * sign), 1);

        data.intakePressure = Math.round(data.intakePressure + (Math.random() * 60 * sign * -1));
        data.mapSensorVoltage = Math.round(data.mapSensorVoltage + (Math.random() * sign), 1);
        data.tpsVoltage = Math.round(data.tpsVoltage + (Math.random() * sign), 1);
        data.primaryInjectorPulse = Math.round(data.primaryInjectorPulse + (Math.random() * sign), 1); // unknown value
        data.fuelCorrection = Math.round(data.fuelCorrection + (Math.random() * sign), 1); // unknown value
        data.fuelTemp = Math.round(data.fuelTemp + (Math.random() * 8 * sign));
        data.mopPosition++; // 1-72?
        data.boostTP = Math.round(data.boostTP + (Math.random() * sign), 1); // unknown value
        data.boostWG = Math.round(data.boostWG + (Math.random() * sign), 1); // unknown value
        data.intakeTemp = Math.round(data.intakeTemp + (Math.random() * 8 * sign)); // unknown value
        data.iscvDuty = Math.round(data.iscvDuty + (Math.random() * sign), 1); // unknown value
        data.secondaryInjectorPulse = Math.round(data.secondaryInjectorPuls + (Math.random() * sign), 1); // unknown value

    } else if (command === PowerFCCommands.sensorData) {

        data.command = PowerFCCommands.sensorData;
        data.mapSensorVoltage = Math.round(data.mapSensorVoltage + (Math.random() * sign), 1);
        data.tpsFullRangeVoltage = Math.round(data.tpsFullRangeVoltage + (Math.random() * sign), 1);
        data.tpsNarrowRangeVoltage = Math.round(data.tpsNarrowRangeVoltage + (Math.random() * sign), 1);
        data.mopPositionSensorVoltage = Math.round(data.mopPositionSensorVoltage + (Math.random() * sign), 1);
        data.intakeAirTempSensorVoltage = Math.round(data.intakeAirTempSensorVoltage + (Math.random() * sign), 1);
        data.fuelTempSensorVoltage = Math.round(data.fuelTempSensorVoltage + (Math.random() * sign), 1);
        data.o2SensorVoltage = Math.round(data.o2SensorVoltage + (Math.random() * sign), 1);

        data.starterSwitch = (Math.random() < .1) ? !data.starterSwitch : data.starterSwitch;
        data.airConditioningSwitch = (Math.random() < .1) ? !data.airConditioningSwitch : data.airConditioningSwitch;
        data.powerSteeringPressureSwitch = (Math.random() < .2) ? !data.powerSteeringPressureSwitch : data.powerSteeringPressureSwitch;
        data.neutralSwitch = (Math.random() < .1) ? !data.neutralSwitch : data.neutralSwitch;
        data.clutchSwitch = (Math.random() < .1) ? !data.clutchSwitch : data.clutchSwitch;
        data.stopSwitch = (Math.random() < .1) ? !data.stopSwitch : data.stopSwitch;
        data.catalyzerThermoSensorSwitch = (Math.random() < .1) ? !data.catalyzerThermoSensorSwitch : data.catalyzerThermoSensorSwitch;
        data.electricalLoadSwitch = (Math.random() < .1) ? !data.electricalLoadSwitch : data.electricalLoadSwitch;
        data.exhaustTempWarningIndicator = (Math.random() < .1) ? !data.exhaustTempWarningIndicator : data.exhaustTempWarningIndicator;
        data.fuelPumpOperation = (Math.random() < .1) ? !data.fuelPumpOperation : data.fuelPumpOperation;
        data.airPumpRelay = (Math.random() < .1) ? !data.airPumpRelay : data.airPumpRelay;
        data.portAirControl = (Math.random() < .1) ? !data.portAirControl : data.portAirControl;
        data.chargeControl = (Math.random() < .1) ? !data.chargeControl : data.chargeControl;
        data.turboControl = (Math.random() < .1) ? !data.turboControl : data.turboControl;
        data.pressureRegulatorControl = (Math.random() < .1) ? !data.pressureRegulatorControl : data.pressureRegulatorControl;

    }

    if (data.injectorDuty < 0 || data.injectorDuty > 100) data.injectorDuty = 20;
    if (data.knock < 0 || data.knock > 100) data.knock = 10;
    if (data.rpm < 600 || data.rpm > 8500) data.rpm = 2500;
    if (data.boost < -600 || data.boost > 800) data.boost = 0;
    if (data.speed < 0 || data.speed > 220) data.speed = 50;
    if (data.waterTemp < 0 || data.waterTemp > 140) data.waterTemp = 60;
    if (data.leadingIgnition > 100 || data.leadingIgnition < -100) data.leadingIgnition = 0;
    if (data.trailingIgnition > 100 || data.trailingIgnition < -100) data.trailingIgnition = 0;
    if (data.batteryVoltage < 4 || data.batteryVoltage > 20) data.batteryVoltage = 14;
    if (data.airTemp < 40 || data.airTempt > 60) data.airTemp = 27;

    if (data.intakePressure < -600 || data.intakePressure > 800) data.intakePressure = 0;
    if (data.mapSensorVoltage < 0 || data.mapSensorVoltage > 10) data.mapSensorVoltage = 2;
    if (data.tpsVoltage < 0 || data.tpsVoltage > 10) data.tpsVoltage = 2;
    if (data.fuelTemp < 0 || data.fuelTemp > 200) data.fuelTemp = 50;
    if (data.mopPosition < 0 || data.mopPosition > 72) data.mopPosition = 0;
    if (data.tpsFullRangeVoltage < 0 || data.tpsFullRangeVoltage > 6) data.tpsFullRangeVoltage = 2;
    if (data.tpsNarrowRangeVoltage < 0 || data.tpsNarrowRangeVoltage > 6) data.tpsNarrowRangeVoltage = 2;
    if (data.mopPositionSensorVoltage < 0 || data.mopPositionSensorVoltage > 10) data.mopPositionSensorVoltage = 2;
    if (data.fuelTempSensorVoltage < 0 || data.fuelTempSensorVoltage > 6) data.fuelTempSensorVoltage = 2;
    if (data.waterTempSensorVoltage < 0 || data.waterTempSensorVoltage > 6) data.waterTempSensorVoltage = 2;
    if (data.intakeAirTempSensorVoltage < 0 || data.intakeAirTempSensorVoltage > 6) data.intakeAirTempSensorVoltage = 2;
    if (data.o2SensorVoltage < 0 || data.o2SensorVoltage > 6) data.o2SensorVoltage = 2;
    if (data.primaryInjectorPulse < 0 || data.primaryInjectorPulse > 1000) data.primaryInjectorPulse = 100;
    if (data.fuelCorrection < 0 || data.fuelCorrection > 1000) data.fuelCorrection = 100;
    if (data.boostTP < 0 || data.boostTP > 1000) data.boostTP = 100;
    if (data.boostWG < 0 || data.boostWG > 1000) data.boostWG = 100;
    if (data.intakeTemp < 0 || data.intakeTemp > 200) data.intakeTemp = 50;

    dataCallback(data);
}

export default { connect, close, sendCommand };