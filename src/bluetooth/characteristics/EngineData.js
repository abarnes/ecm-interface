import { convertToBuffer } from '../../utils/EngineDataBufferConverter'
import bleno from '../BluetoothGateway';
import Util from 'util'

export default (function(){
    // let lastDataPoint = null;
    let bluetoothCallback = null;

    let BlenoCharacteristic = bleno.Characteristic;

    let EngineDataCharacteristic = function() {
        EngineDataCharacteristic.super_.call(this, {
            uuid: 'f3f94f62-234e-11e8-b467-0ed5f89f718b',
            properties: ['notify'],
        });

        this._value = new Buffer(0);
    };

    EngineDataCharacteristic.logData = function logData(time, data) {
        data['time'] = time;
        this._value = convertToBuffer(data);
        if (bluetoothCallback) {
            bluetoothCallback(this._value);
        }

    }

    EngineDataCharacteristic.prototype.onSubscribe = function(maxValueSize, updateValueCallback) {
        bluetoothCallback = updateValueCallback;
    }


    Util.inherits(EngineDataCharacteristic, BlenoCharacteristic);

    return EngineDataCharacteristic;
})();