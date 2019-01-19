const bleno = process.platform === "darwin" ? require('bleno-mac') : require('bleno');

module.exports = bleno;