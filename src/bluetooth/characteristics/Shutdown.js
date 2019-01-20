import bleno from '../BluetoothGateway';
import util from 'util';
import child_process from 'child_process';
import DefaultThresholdConfig from '../../config/DefaultThresholdConfig';

let BlenoCharacteristic = bleno.Characteristic;

let ShutdownCharacteristic = function() {
    ShutdownCharacteristic.super_.call(this, {
        uuid: '382cccf9-9fdc-4ae0-8fc1-4570eabc3107',
        properties: ['writeWithoutResponse']
    });
};

ShutdownCharacteristic.prototype.onWriteRequest = function shutdown(data) {
    console.log("Attempting shutdown");
    child_process.exec('sudo /sbin/shutdown -h now', function (msg) { 
        console.log("Shutting down: ", msg);
    });
}

util.inherits(ShutdownCharacteristic, BlenoCharacteristic);

export default ShutdownCharacteristic;DefaultThresholdConfig