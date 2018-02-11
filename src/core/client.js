import terrainTileset from '@/assets/tiles/terrain.png';
import objectsTileset from '@/assets/tiles/objects.png';

import npcImage from '@/assets/graphics/actors/npcs.png';
import playerImage from '@/assets/graphics/actors/players/human.png';
import weaponsImage from '@/assets/graphics/items/weapons.png';

class Client {
  constructor() {
    // Map data
    this.map = null;
    this.background = null;
    this.foreground = null;
    this.player = null;

    // Asset loading data
    this.images = [];
  }

  async loadAssets() {
    // Get data of NPCs other entities from server
    this.loadData();

    // Get images of tileset and entities from server
    this.images = await Promise.all(this.loadImages());
  }

  /**
   * Load data from connected server
   */
  loadData() {
    window.ws.emit('client:load-data');
    window.ws.on('client:send-data', (data) => {
      this.items = data.items;
      this.npcs = data.npcs;

      this.background = data.map[0].data;
      this.foreground = data.map[1].data;
    });
  }

  /**
   * Load assets by passing them through
   * a new instance of Image() and resolve the array
   *
   * @return {array}
   */
  loadImages() {
    const assets = [
      playerImage,
      npcImage,
      objectsTileset,
      terrainTileset,
      weaponsImage,
    ];

    const images = Object.values(assets).map(asset =>
      this.constructor.uploadImage(asset),
    );

    return images;
  }

  /**
   * New up an Image() and sets the source to image
   *
   * @param {string} path The path of the asset
   */
  static uploadImage(path) {
    const asset = new Promise((resolve) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = () => resolve(403);
      image.src = path;
    });

    return asset;
  }
}

export default Client;
