const singleton = function() {

  let subscribers = [];

  const state = {
    // basic
    injectorDuty: 0,
    leadingIgnition: 0,
    trailingIgnition: 0,
    rpm: 0,
    speed: 0,
    boost: 0,
    knock: 0,
    waterTemp: 0,
    airTemp: 0,
    batteryVoltage: 0,

    // advanced
    intakePressure: 0,            // pressure at intake manifold
    mapSensorVoltage: 0,          // MAP sensor voltage
    tpsVoltage:0,                 // TPS sensor voltage 
    primaryInjectorPulse: 0,      // primary injector pulse width
    fuelCorrection: 0,            // fuel correction 
    leadingIgnition: 0,
    trailingIgnition: 0,
    fuelTemp: 0,
    mopPosition: 0,               // metering oil pump position
    boostTP: 0,                   // boost duty (tp)
    boostWG: 0,                   // boost duty (wastegate)
    intakeTemp: 0,
    iscvDuty: 0,                  // bypass air control valve (Idle speed control valve) duty
    o2Voltage: 0,
    secondaryInjectorPulse: 0,    // injector pulse width

    // sensors
    mapSensorVoltage: 0,
    tpsFullRangeVoltage: 0,
    tpsNarrowRangeVoltage: 0,
    mopPositionSensorVoltage: 0,
    waterTempSensorVoltage: 0,
    intakeAirTempSensorVoltage: 0,
    fuelTempSensorVoltage: 0,

    starterSwitch: false,
    airConditioningSwitch: false,
    powerSteeringPressureSwitch: false,
    neutralSwitch: false,
    clutchSwitch: false,
    stopSwitch: false,
    catalyzerThermoSensorSwitch: false,
    electricalLoadSwitch: false,
    exhaustTempWarningIndicator: false,
    fuelPumpOperation: false,
    fuelPumpControl: false,
    airPumpRelay: false,
    portAirControl: false,
    chargeControl: false,
    turboControl: false,
    pressureRegulatorControl: false
  };

  const getState = function getState() {
    return state;
  }

  const updateState = function updateState(payload) {
    for (let item in payload) {
      if (typeof state[item] !== "undefined") {
        state[item] = payload[item];
      }
    }

    subscribers.forEach(callback => {
      callback(state);
    });
  }

  const subscribeToStateChange = function subscribeToStateChange(subscribingFunction) {
    if (typeof subscribingFunction !== "function") {
      return
    }

    subscribers.push(subscribingFunction);
  } 

  return {
    getState,
    updateState,
    subscribeToStateChange
  }
}();

export default singleton;
