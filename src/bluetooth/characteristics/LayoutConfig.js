import { getLayoutConfig } from "../../utils/ConfigFileUtil";
import { convertGaugeConfigToBuffer } from "../../utils/GaugeConfigBufferUtil";
import bleno from 'bleno';
import util from 'util';

let BlenoCharacteristic = bleno.Characteristic;

let LayoutConfigCharacteristic = function() {
    LayoutConfigCharacteristic.super_.call(this, {
        uuid: 'f3floi62-f54e-20e8-b467-0ed5f8hs718b',
        properties: ['read', 'write'],
    });
};

LayoutConfigCharacteristic.prototype.onWriteRequest = function updateLayout(data) {
    console.log("should update with data", data);
}

LayoutConfigCharacteristic.prototype.onReadRequest = function(offset, callback) {
    callback(BlenoCharacteristic.RESULT_SUCCESS, convertGaugeConfigToBuffer(getLayoutConfig()));
};

util.inherits(LayoutConfigCharacteristic, BlenoCharacteristic);

export default LayoutConfigCharacteristic;