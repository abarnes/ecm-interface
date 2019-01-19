const bleno = process.platform === "darwin" ? require('bleno-mac') : require('bleno');

export default bleno;