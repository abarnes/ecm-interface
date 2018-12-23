import bleno from 'bleno';
import { SystemService } from './SystemService'
import EngineDataCharacteristic from './characteristics/EngineData'

const systemService = new SystemService();

const init = () => {
    bleno.on('stateChange', stateChange);
    bleno.on('advertisingStart', advertisingStart);
    bleno.on('accept', accept);
}

const logEngineData = (time, data) => {
    EngineDataCharacteristic.logData(time, data);
}

const stateChange = (state) => {
    console.log('Bluetooth: on -> stateChange: ' + state);
    if (state === 'poweredOn') {
        bleno.startAdvertising(bleno.name, [systemService.uuid]);
    } else {
        bleno.stopAdvertising();
    }
};

const advertisingStart = (error) => {
    console.log('Bluetooth: advertisingStart ' + (error ? 'error ' + error : 'success')); 
    if (!error) {
        bleno.setServices([
            systemService
        ]);
    }
};

const accept = (clientAddress) => {
    console.log("Bluetooth: accepted " + clientAddress);
}

export default {
    init,
    logEngineData
}