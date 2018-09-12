import bleno from 'bleno';
import util from 'util';

const characteristic = (function(){

    let BlenoCharacteristic = bleno.Characteristic;

    let GpsReceiverCharacteristic = function() {
        GpsReceiverCharacteristic.super_.call(this, {
            uuid: 'ab913146-2988-11e8-b467-0ed5f89f718b',
            properties: ['write', 'writeWithoutResponse']
        });

        this._value = new Buffer(0);
    };

    GpsReceiverCharacteristic.prototype.onWriteRequest = function(data, offset, withoutResponse, callback) {
        // if (!withoutResponse) { // TODO address this
            callback(this.RESULT_SUCCESS);
        //}
    };

    util.inherits(GpsReceiverCharacteristic, BlenoCharacteristic);

    return GpsReceiverCharacteristic;
})();

export default characteristic;