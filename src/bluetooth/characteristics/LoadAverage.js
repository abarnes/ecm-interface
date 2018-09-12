import bleno from 'bleno';
import os from 'os';
import util from 'util';

let BlenoCharacteristic = bleno.Characteristic;

let LoadAverageCharacteristic = function() {
 LoadAverageCharacteristic.super_.call(this, {
    uuid: 'ff51b30e-d7e2-4d93-8842-a7c4a57dfb10',
    properties: ['read'/*, 'notify'*/],
  });

 this._value = new Buffer(0);
};

LoadAverageCharacteristic.prototype.onSubscribe = function(maxValueSize, updateValueCallback) {

  console.log("subscription received");
  setInterval(function refreshData() {
    //this._value = getLoadBuffer();
    updateValueCallback(getLoadBuffer());
  }, 400);
}

LoadAverageCharacteristic.prototype.onReadRequest = function(offset, callback) {

  if(!offset) {
    this._value = getLoadBuffer();
  }

  console.log('LoadAverageCharacteristic - onReadRequest: value = ' +
    this._value.slice(offset, offset + bleno.mtu).toString()
  );

  callback(this.RESULT_SUCCESS, this._value.slice(offset, this._value.length));
};

function getLoadBuffer() {
  return new Buffer.from("itsastringasfdnasdfjlkhhjlhjklhjeawlruyiuewhuihjlkhl&&hjlkhasfhjhuiweiuewuhiuihewhuirhjfhkhjkdshjsdl!", 'utf8');
  let loadAverage = os.loadavg().map(function(currentValue, index, array){
    return currentValue.toFixed(3);
  });

  return new Buffer(JSON.stringify({
    '1' : loadAverage[0],
    '5': loadAverage[1],
    '15': loadAverage[2]
  }));
}

util.inherits(LoadAverageCharacteristic, BlenoCharacteristic);

export default LoadAverageCharacteristic;