import * as util from '../utils/GaugeConfigUtil';

const gauges = {
    gauges: {
        rpm: {
            name: "RPM",
            stateKey: "rpm",
            showGraph: true,
            graphTime: 15,
            transform: (value) => {
                return Math.round(value);
            },
            displaySuffix: null,
            thresholds: {
                warning: 7500,
                critical: 8000
            }
        },
        boost: {
            name: "Boost",
            stateKey: "boost",
            showGraph: true,
            graphTime: 15,
            transform: (value) => {
                return Math.round(mmHGToPsi(value));
            },
            displaySuffix: (value) => {
                return value > 0 ? (value + "PSI") : (value + "inHG");
            },
            thresholds: {
                warning: 520, // 10psi
                critical: 672 // 13psi
            }
        },
        waterTemp: {
            name: "Water Temp",
            stateKey: "waterTemp",
            showGraph: true,
            graphTime: 30,
            transform: (value) => {
                return Math.round(celciusToFahrenheit(value));
            },
            displaySuffix: (value) => {
                return value + "&deg;"
            },
            thresholds: {
                warning: 97,
                critical: 108
            }
        },
        knock: {
            name: "Knock",
            stateKey: "knock",
            showGraph: true,
            graphTime: 15,
            transform: (value) => {
                return Math.round(value);
            },
            displaySuffix: null,
            thresholds: {
                warning: 32,
                critical: 40
            }
        },
        injectorDuty: {
            name: "Injector Duty",
            stateKey: "injectorDuty",
            showGraph: true,
            graphTime: 15,
            transform: (value) => {
                return Math.round(value, 1);
            },
            displaySuffix: (value) => {
                return value + "%"
            },
            thresholds: {
                warning: 80,
                critical: 95
            }
        },

        // monitors

        speed: {
            name: "Speed",
            stateKey: "speed",
            showGraph: false,
            graphTime: 0,
            transform: (value) => {
                return Math.round(kphToMph(value));
            },
            displaySuffix: (value) => {
                return value + " MPH"
            },
            thresholds: null
        },
        leadingIgnition: {
            name: "Leading Ignition",
            stateKey: "leadingIgnition",
            showGraph: false,
            graphTime: 0,
            transform: (value) => {
                return Math.round(value, 1);
            },
            displaySuffix: (value) => {
                return value + "&deg;"
            },
            thresholds: null
        },
        trailingIgnition: {
            name: "Trailing Ignition",
            stateKey: "trailingIgnition",
            showGraph: false,
            graphTime: 0,
            transform: (value) => {
                return Math.round(value, 1);
            },
            displaySuffix: (value) => {
                return value + "&deg;"
            },
            thresholds: null
        },
        airTemp: {
            name: "Air Temp",
            stateKey: "airTemp",
            showGraph: false,
            graphTime: 0,
            transform: (value) => {
                return Math.round(celciusToFahrenheit(value));
            },
            displaySuffix: (value) => {
                return value + "&deg;"
            },
            thresholds: null
        },
        batteryVoltage: {
            name: "Battery Voltage",
            stateKey: "batteryVoltage",
            showGraph: false,
            graphTime: 0,
            transform: (value) => {
                return Math.round(value, 1);
            },
            displaySuffix: (value) => {
                return value + "V"
            },
            thresholds: null
        },

        // advanced
        intakePressure: {
            name: "IntakePressure",
            stateKey: "intakePressure",
            showGraph: true,
            graphTime: 60,
            transform: util.pressureTransform,
            displaySuffix: util.pressureSuffix
        },            
        mapSensorVoltage: {
            name: "Map Sensor Voltage",
            stateKey: "mapSensorVoltage",
            showGraph: true,
            graphTime: 60,
            transform: util.roundingTransform.bind(this, 1),
            displaySuffix: util.voltageSuffix
        },
        tpsVoltage: {
            name: "TPS Sensor Voltage",
            stateKey: "tpsVoltage",
            showGraph: true,
            graphTime: 60,
            transform: util.roundingTransform.bind(this, 1),
            displaySuffix: util.voltageSuffix
        }, 
        primaryInjectorPulse: {
            name: "Primary Injector Pulse",
            stateKey: "primaryInjectorPulse",
            showGraph: true,
            graphTime: 60,
            transform: null,
            displaySuffix: null
        }, 
        fuelCorrection: {
            name: "Fuel Correction",
            stateKey: "fuelCorrection",
            showGraph: true,
            graphTime: 60,
            transform: null,
            displaySuffix: null
        },
        fuelTemp: {
            name: "Fuel Temp",
            stateKey: "fuelTemp",
            showGraph: true,
            graphTime: 60,
            transform: util.tempTransform,
            displaySuffix: util.degreeSuffix
        },
        mopPosition: {
            name: "MOP Position",
            stateKey: "mopPosition",
            showGraph: true,
            graphTime: 60,
            transform: null,
            displaySuffix: null
        },
        boostTP: {
            name: "Boost TP",
            stateKey: "boostTP",
            showGraph: true,
            graphTime: 60,
            transform: null,
            displaySuffix: null
        }, 
        boostWG: {
            name: "Boost WG",
            stateKey: "boostWG",
            showGraph: true,
            graphTime: 60,
            transform: null,
            displaySuffix: null
        },
        intakeTemp: {   
            name: "Intake Temp",
            stateKey: "intakeTemp",
            showGraph: true,
            graphTime: 60,
            transform: util.tempTransform,
            displaySuffix: util.degreeSuffix
        },
        iscvDuty: {
            name: "Idle Speed Control Valve Duty",
            stateKey: "icsvDuty",
            showGraph: true,
            graphTime: 60,
            transform: util.roundingTransform.bind(this, 0),
            displaySuffix: util.percentSuffix
        },
        o2Voltage: {
            name: "O2 Sensor Voltage",
            stateKey: "o2Voltage",
            showGraph: true,
            graphTime: 60,
            transform: util.roundingTransform.bind(this, 1),
            displaySuffix: util.voltageSuffix
        },
        secondaryInjectorPulse: {
            name: "Secondary Injector Pulse",
            stateKey: "secondaryInjectorPulse",
            showGraph: true,
            graphTime: 60,
            transform: null,
            displaySuffix: null
        },

        // sensor data
        tpsFullRangeVoltage: {
            name: "TPS Full Range Voltage",
            stateKey: "tpsFullRangeVoltage",
            showGraph: true,
            graphTime: 60,
            transform: util.roundingTransform.bind(this, 1),
            displaySuffix: util.voltageSuffix
        },
        tpsNarrowRangeVoltage: {
            name: "TPS Narrow Range Voltage",
            stateKey: "tpsNarrowRangeVoltage",
            showGraph: true,
            graphTime: 60,
            transform: util.roundingTransform.bind(this, 1),
            displaySuffix: util.voltageSuffix
        },
        mopPositionSensorVoltage: {
            name: "MOP Position Sensor Voltage",
            stateKey: "mopPositionSensorVoltage",
            showGraph: true,
            graphTime: 60,
            transform: util.roundingTransform.bind(this, 1),
            displaySuffix: util.voltageSuffix
        },
        waterTempSensorVoltage: {
            name: "Water Temp Sensor Voltage",
            stateKey: "waterTempSensorVoltage",
            showGraph: true,
            graphTime: 60,
            transform: util.roundingTransform.bind(this, 1),
            displaySuffix: util.voltageSuffix
        },
        intakeAirTempSensorVoltage: {
            name: "Intake Air Temp Sensor Voltage",
            stateKey: "intakeAirTempSensorVoltage",
            showGraph: true,
            graphTime: 60,
            transform: util.roundingTransform.bind(this, 1),
            displaySuffix: util.voltageSuffix
        },
        fuelTempSensorVoltage: {
            name: "Fuel Temp Sensor Voltage",
            stateKey: "fuelTempSensorVoltage",
            showGraph: true,
            graphTime: 60,
            transform: util.roundingTransform.bind(this, 1),
            displaySuffix: util.voltageSuffix
        },

        starterSwitch: {
            name: "Starter Switch",
            stateKey: "starterSwitch",
            showGraph: false,
            graphTime: 0,
            transform: util.booleanTransform,
            displaySuffix: null
        },
        airConditioningSwitch: {
            name: "Air Conditioning Switch",
            stateKey: "airConditioningSwitch",
            showGraph: false,
            graphTime: 0,
            transform: util.booleanTransform,
            displaySuffix: null
        },
        powerSteeringPressureSwitch: {
            name: "Power Steering Pressure Switch",
            stateKey: "powerSteeringPressureSwitch",
            showGraph: false,
            graphTime: 0,
            transform: util.booleanTransform,
            displaySuffix: null
        },
        neutralSwitch: {
            name: "Neutral Switch",
            stateKey: "neutralSwitch",
            showGraph: false,
            graphTime: 0,
            transform: util.booleanTransform,
            displaySuffix: null
        },
        clutchSwitch: {
            name: "Clutch Switch",
            stateKey: "clutchSwitch",
            showGraph: false,
            graphTime: 0,
            transform: util.booleanTransform,
            displaySuffix: null
        },
        stopSwitch: {
            name: "Stop Switch",
            stateKey: "stopSwitch",
            showGraph: false,
            graphTime: 0,
            transform: util.booleanTransform,
            displaySuffix: null
        },
        catalyzerThermoSensorSwitch: {
            name: "Catalyzer Thermo Sensor Switch",
            stateKey: "catalyzerThermoSensorSwitch",
            showGraph: false,
            graphTime: 0,
            transform: util.booleanTransform,
            displaySuffix: null
        },
        electricalLoadSwitch: {
            name: "Electrical Load Switch",
            stateKey: "electricalLoadSwitch",
            showGraph: false,
            graphTime: 0,
            transform: util.booleanTransform,
            displaySuffix: null
        },
        exhaustTempWarningIndicator: {
            name: "Exhaust Temp Warning Indicator",
            stateKey: "exhaustTempWarningIndicator",
            showGraph: false,
            graphTime: 0,
            transform: util.booleanTransform,
            displaySuffix: null
        },
        fuelPumpOperation: {
            name: "Fuel Pump Operation",
            stateKey: "fuelPumpOperation",
            showGraph: false,
            graphTime: 0,
            transform: util.booleanTransform,
            displaySuffix: null
        },
        fuelPumpControl: {
            name: "Fuel Pump Control",
            stateKey: "fuelPumpControl",
            showGraph: false,
            graphTime: 0,
            transform: util.booleanTransform,
            displaySuffix: null
        },
        airPumpRelay: {
            name: "Air Pump Relay",
            stateKey: "airPumpRelay",
            showGraph: false,
            graphTime: 0,
            transform: util.booleanTransform,
            displaySuffix: null
        },
        portAirControl: {
            name: "Port Air Control",
            stateKey: "portAirControl",
            showGraph: false,
            graphTime: 0,
            transform: util.booleanTransform,
            displaySuffix: null
        },
        chargeControl: {
            name: "Charge Control",
            stateKey: "chargeControl",
            showGraph: false,
            graphTime: 0,
            transform: util.booleanTransform,
            displaySuffix: null
        },
        turboControl: {
            name: "Turbo Control",
            stateKey: "turboControl",
            showGraph: false,
            graphTime: 0,
            transform: util.booleanTransform,
            displaySuffix: null
        },
        pressureRegulatorControl: {
            name: "Pressure Regulator Control",
            stateKey: "pressureRegulatorControl",
            showGraph: false,
            graphTime: 0,
            transform: util.booleanTransform,
            displaySuffix: null
        }

    }
};

export default gauges;