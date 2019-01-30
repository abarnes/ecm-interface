const engineDataItems = {
    rpm: {
        index: 0
    },
    boost: {
        index: 1
    },
    waterTemp: {
        index: 2
    },
    knock: {
        index: 3
    },
    injectorDuty: {
        index: 4
    },
    leadingIgnition: {
        index: 5
    },
    trailingIgnition: {
        index: 6
    },
    speed: {
        index: 7
    },
    airTemp: {
        index: 8
    },
    batteryVoltage: {
        index: 9
    },
    
    intakePressure: {
        index: 10
    },
    mapSensorVoltage: {
        index: 11
    },
    tpsVoltage: {
        index: 12
    },
    primaryInjectorPulse: {
        index: 13
    },
    fuelCorrection: {
        index: 14
    },
    fuelTemp: {
        index: 15
    },
    mopPosition: {
        index: 16
    },
    boostTP: {
        index: 17
    },
    boostWG: {
        index: 18
    },
    intakeTemp: {
        index: 19
    },
    iscvDuty: {
        index: 20
    },
    o2Voltage: {
        index: 21
    },
    secondaryInjectorPulse: {
        index: 22
    },
    
    tpsFullRangeVoltage: {
        index: 23
    },
    tpsNarrowRangeVoltage: {
        index: 24
    },
    mopPositionSensorVoltage: {
        index: 25
    },
    waterTempSensorVoltage: {
        index: 26
    },
    intakeAirTempSensorVoltage: {
        index: 27
    },
    fuelTempSensorVoltage: {
        index: 28
    },
    o2SensorVoltage: {
        index: 29
    },
    starterSwitch: {
        index: 30
    },
    airConditioningSwitch: {
        index: 31
    },
    powerSteeringPressureSwitch: {
        index: 32
    },
    neutralSwitch: {
        index: 33
    },
    clutchSwitch: {
        index: 34
    },
    stopSwitch: {
        index: 35
    },
    catalyzerThermoSensorSwitch: {
        index: 36
    },
    electricalLoadSwitch: {
        index: 37
    },
    exhaustTempWarningIndicator: {
        index: 38
    },
    fuelPumpOperation: {
        index: 39
    },
    fuelPumpControl: {
        index: 40
    },
    airPumpRelay: {
        index: 41
    },
    portAirControl: {
        index: 42
    },
    chargeControl: {
        index: 43
    },
    turboControl: {
        index: 44
    },
    pressureRegulatorControl: {
        index: 45
    }
}

const itemFromIndex = (index) => {
    for (var key in engineDataItems) {
        if (engineDataItems.hasOwnProperty(key)) {
            if (engineDataItems[key].index === index) {
                return key;
            }
        }
    }

    return null;
}

export { engineDataItems, itemFromIndex }