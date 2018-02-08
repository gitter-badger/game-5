const Map = require('../core/map');
const npcs = require('./../entities/npcs');
const items = require('./../entities/items');

class Assets {
  static async loadData(bus) {
    console.log('[SERVER] Loading data...');

    const block = {
      map: await Map.load(),
      npcs,
      items,
    };

    bus.emit('client:send-data', block);
  }
}

module.exports = Assets;
