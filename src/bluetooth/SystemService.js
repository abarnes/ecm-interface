import Bleno from './BluetoothGateway';
import Util from 'util'

import LoadAverageCharacteristic from './characteristics/LoadAverage'
import EngineDataCharacteristic from './characteristics/EngineData'
import GpsReceiverCharacteristic from './characteristics/GpsReceiver'
import ThresholdConfigCharacteristic from './characteristics/ThresholdConfig'
import GaugeLayoutConfigCharacteristic from './characteristics/GaugeLayoutConfig'
import ShutdownCharacteristic from './characteristics/Shutdown'

function SystemService() {

  Bleno.PrimaryService.call(this, {
    uuid: 'f9d53a38-2324-11e8-b467-0ed5f89f718b',
    characteristics: [
      new EngineDataCharacteristic(),
      // new LoadAverageCharacteristic(),
      new GpsReceiverCharacteristic(),
      new ThresholdConfigCharacteristic(),
      new GaugeLayoutConfigCharacteristic(),
      new ShutdownCharacteristic()
    ]
  });
};

Util.inherits(SystemService, Bleno.PrimaryService);

export { SystemService }