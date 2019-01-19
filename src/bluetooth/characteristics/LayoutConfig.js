import { getLayoutConfig } from "../../utils/ConfigFileUtil";
import { convertGaugeConfigToBuffer } from "../../utils/GaugeConfigBufferUtil";
import bleno from '../BluetoothGateway';
import util from 'util';

let BlenoCharacteristic = bleno.Characteristic;

let LayoutConfigCharacteristic = function() {
    LayoutConfigCharacteristic.super_.call(this, {
        uuid: '94667c9c-6888-41a6-9401-3655ebbfaf63',
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