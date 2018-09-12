import fs from 'fs';
import { PowerFCCommands } from '../../../serial/PowerFCCommands';

process.on('message', (message) => {
    if (typeof message.filepath === "undefined" || typeof message.results === "undefined") {
        return;
    }

    const filepath = message.filepath;
    const results = message.results; 

    const parsedResults = results.map((result) => {
        return parseByCommand(result);
    });

    const buffer = new Buffer(parsedResults.join("\n") + "\n");
    fs.open(filepath, 'a+', function(err, fd) {
        if (err) {
            throw 'error opening file: ' + err;
        }

        fs.write(fd, buffer, 0, buffer.length, null, function(err) {
            if (err) throw 'error writing file: ' + err;
            fs.close(fd, function() {
                console.log('CSV Data written at ' + new Date().toLocaleString('en-US'));
            })
        });
    });
});

const parseByCommand = (result) => {
    let stringArray = [result.time.toString(), result.data.command.hex, "", ""]; // 3rd and 4th spots reserved for GPS data
    if (result.data.command.hex === PowerFCCommands.basic.hex) {
        stringArray.push(result.data.rpm);
        stringArray.push(result.data.boost);
        stringArray.push(result.data.waterTemp);
        stringArray.push(result.data.knock);
        stringArray.push(result.data.injectorDuty);
        stringArray.push(result.data.speed);
        stringArray.push(result.data.leadingIgnition);
        stringArray.push(result.data.trailingIgnition);
        stringArray.push(result.data.airTemp);
        stringArray.push(result.data.batteryVoltage);
    } else if (result.data.command.hex === PowerFCCommands.advancedData.hex) {
        stringArray.push(result.data.rpm);
        stringArray.push(""); // boost - not sent in advancedData
        stringArray.push(result.data.waterTemp);
        stringArray.push(result.data.knock);
        stringArray.push(""); // injector duty - not sent in advancedData
        stringArray.push(result.data.speed);
        stringArray.push(result.data.leadingIgnition);
        stringArray.push(result.data.trailingIgnition);
        stringArray.push(""); // air temp - not sent in advancedData
        stringArray.push(result.data.batteryVoltage);

        stringArray.push(result.data.intakePressure); // boost?
        stringArray.push(result.data.mapSensorVoltage);
        stringArray.push(result.data.tpsVoltage);
        stringArray.push(result.data.primaryInjectorPulse);
        stringArray.push(result.data.fuelCorrection);
        stringArray.push(result.data.fuelTemp);
        stringArray.push(result.data.mopPosition);
        stringArray.push(result.data.boostTP);
        stringArray.push(result.data.boostWG);
        stringArray.push(result.data.intakeTemp);
        stringArray.push(result.data.iscvDuty);
        stringArray.push(result.data.secondaryInjectorPulse);
    } else if (result.data.command.hex === PowerFCCommands.sensorData.hex) {
        // skip 22
        let emptyDataPoints = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        stringArray.push(...emptyDataPoints);

        stringArray.push(result.data.secondaryInjectorPulse);
        stringArray.push(result.data.tpsFullRangeVoltage);
        stringArray.push(result.data.tpsNarrowRangeVoltage);
        stringArray.push(result.data.mopPositionSensorVoltage);
        stringArray.push(result.data.waterTempSensorVoltage);
        stringArray.push(result.data.intakeAirTempSensorVoltage);
        stringArray.push(result.data.fuelTempSensorVoltage);
        stringArray.push(result.data.o2SensorVoltage);
        stringArray.push(result.data.starterSwitch);
        stringArray.push(result.data.airConditioningSwitch);
        stringArray.push(result.data.powerSteeringPressureSwitch);
        stringArray.push(result.data.neutralSwitch);
        stringArray.push(result.data.clutchSwitch);
        stringArray.push(result.data.stopSwitch);
        stringArray.push(result.data.catalyzerThermoSensorSwitch);
        stringArray.push(result.data.electricalLoadSwitch);
        stringArray.push(result.data.exhaustTempWarningIndicator);
        stringArray.push(result.data.fuelPumpOperation);
        stringArray.push(result.data.airPumpRelay);
        stringArray.push(result.data.portAirControl);
        stringArray.push(result.data.chargeControl);
        stringArray.push(result.data.turboControl);
        stringArray.push(result.data.pressureRegulatorControl);
    }
        
    return stringArray.join(",");
}