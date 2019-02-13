import { getLayoutConfig, setLayoutConfig } from "../../utils/ConfigFileUtil";
import { convertGaugeConfigToBuffer, convertGaugeConfigBufferToObject } from "../../utils/GaugeConfigBufferUtil";
import { publishGaugeLayoutChange } from "../../websocket/websocketController";
import bleno from '../BluetoothGateway';
import util from 'util';

let BlenoCharacteristic = bleno.Characteristic;

let bluetoothCallback = null;

let GaugeLayoutConfigCharacteristic = function() {
    GaugeLayoutConfigCharacteristic.super_.call(this, {
        uuid: '94667c9c-6888-41a6-9401-3655ebbfaf63',
        properties: ['write', 'read', 'notify']
    });
};

GaugeLayoutConfigCharacteristic.prototype.onWriteRequest = function onWriteRequest(data, offset, withoutResponse, callback) {
    console.log("Bluetooth: GaugeLayoutConfigCharacteristic write");

    const newLayoutConfig = convertGaugeConfigBufferToObject(data);
    if (newLayoutConfig) {
        setLayoutConfig(newLayoutConfig);
        publishGaugeLayoutChange(newLayoutConfig);
    }

    // Hack - use the notify callback here so that the value actually gets updated
    if (!withoutResponse && typeof bluetoothCallback === "function") {
        bluetoothCallback(data);
    }
}

GaugeLayoutConfigCharacteristic.prototype.onSubscribe = function(maxValueSize, updateValueCallback) {
    bluetoothCallback = updateValueCallback; 
}

GaugeLayoutConfigCharacteristic.prototype.onReadRequest = function(offset, callback) {
    console.log("Bluetooth: GaugeLayoutConfigCharacteristic read");
    callback(BlenoCharacteristic.RESULT_SUCCESS, convertGaugeConfigToBuffer(getLayoutConfig()));
};

util.inherits(GaugeLayoutConfigCharacteristic, BlenoCharacteristic);

export default GaugeLayoutConfigCharacteristic;