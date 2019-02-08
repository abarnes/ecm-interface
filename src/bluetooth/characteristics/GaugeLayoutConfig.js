import { getLayoutConfig, setLayoutConfig } from "../../utils/ConfigFileUtil";
import { convertGaugeConfigToBuffer, convertGaugeConfigBufferToObject } from "../../utils/GaugeConfigBufferUtil";
import { publishGaugeLayoutChange } from "../../websocket/websocketController";
import bleno from '../BluetoothGateway';
import util from 'util';

let BlenoCharacteristic = bleno.Characteristic;

let GaugeLayoutConfigCharacteristic = function() {
    GaugeLayoutConfigCharacteristic.super_.call(this, {
        uuid: '94667c9c-6888-41a6-9401-3655ebbfaf63',
        properties: ['write', 'read']
    });
};

GaugeLayoutConfigCharacteristic.prototype.onWriteRequest = function onWriteRequest(data, offset, withoutResponse, callback) {
    console.log("Bluetooth: GaugeLayoutConfigCharacteristic write");
    console.log(BlenoCharacteristic.RESULT_SUCCESS);
    console.log(0x00);

    const newLayoutConfig = convertGaugeConfigBufferToObject(data);
    if (newLayoutConfig) {
        setLayoutConfig(newLayoutConfig);
        publishGaugeLayoutChange(newLayoutConfig);
    }

    if (!withoutResponse && typeof callback === "function") {
        console.log("callback!");
        callback(BlenoCharacteristic.RESULT_SUCCESS);
    }
}

GaugeLayoutConfigCharacteristic.prototype.onReadRequest = function(offset, callback) {
    console.log("Bluetooth: GaugeLayoutConfigCharacteristic read");
    callback(BlenoCharacteristic.RESULT_SUCCESS, convertGaugeConfigToBuffer(getLayoutConfig()));
};

util.inherits(GaugeLayoutConfigCharacteristic, BlenoCharacteristic);

export default GaugeLayoutConfigCharacteristic;