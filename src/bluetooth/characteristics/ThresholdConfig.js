import { getThresholdConfig } from "../../utils/ConfigFileUtil";
import bleno from '../BluetoothGateway';
import util from 'util';

let BlenoCharacteristic = bleno.Characteristic;

let ThresholdConfigCharacteristic = function() {
    ThresholdConfigCharacteristic.super_.call(this, {
        uuid: 'e87a9de0-2fda-47ec-bc60-87ff31c9777f',
        properties: ['read', 'write'],
    });
};

ThresholdConfigCharacteristic.updateThresholds = function updateThresholds(data) {
    console.log("Bluetooth: ThresholdtConfigCharacteristic updateThresholds");
}


ThresholdConfigCharacteristic.prototype.onReadRequest = function(offset, callback) {
    console.log("Bluetooth: ThresholdtConfigCharacteristic read");
    callback(BlenoCharacteristic.RESULT_SUCCESS, Buffer.from(JSON.stringify(getThresholdConfig())));
};

util.inherits(ThresholdConfigCharacteristic, BlenoCharacteristic);

export default ThresholdConfigCharacteristic;