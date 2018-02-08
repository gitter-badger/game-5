import terrainTileset from '@/assets/tiles/terrain.png';
import objectsTileset from '@/assets/tiles/objects.png';

import npcImage from '@/assets/graphics/actors/npcs.png';
import playerImage from '@/assets/graphics/actors/players/human.png';
import weaponsImage from '@/assets/graphics/items/weapons.png';

import bus from '../core/utilities/bus';
import Map from './map';
import Player from './player';
import NPC from './npc';
import Item from './item';

class Game {
  constructor() {
    this.map = null;
    this.background = null;
    this.foreground = null;

    this.assets = [];
    this.images = null;
    this.assetsLoaded = false;

    // Data
    this.player = null;
    this.items = [];
    this.npcs = [];

    bus.$on('DRAW:MOUSE', ({ x, y }) => this.map.setMouseCoordinates(x, y));
    bus.$on('PLAYER:MOVE', ({ x, y }) => this.map.findPath(x, y));

    window.ws.on('client:send-assets', (data) => {
      if (this.images) {
        console.log('Assets received from server');
        // this.setAssets(data);
      }
    });
  }

  async setAssets(data) {
    console.log(data);
    console.log(this.images);
    // Create player
    // this.player = new Player(data.player);

    // Create NPCs
    data.npcs.forEach(npc => this.npcs.push(new NPC(npc)), this);

    // Create items
    data.items.forEach(item => this.items.push(new Item(item)), this);

    // Load map data
    this.map = new Map(
      'surface',
      this.images,
      this.player,
      this.npcs,
      this.items,
    );

    // Set data
    const mapData = await this.map.load(); // EDIT FROM SERVER
    this.background = mapData[0].data;
    this.foreground = mapData[1].data;

    this.map.build([this.background, this.foreground], this.images);
  }

  /**
   * The main entry point.
   *
   * Start the game.
   */
  async start() {
    return new Promise(async (resolve) => {
      // Load images
      const { images } = await this.init();
      this.images = images;

      console.log('Images loaded.', images);

      let assetLoaded = false;

      while (!assetLoaded && this.images) {
        assetLoaded = true;
        resolve(200);
      }
    });
  }

  setData(data) {
    console.log(data);
    console.log(this.images);
  }

  /**
   * Initiate game by loading assets and data
   *
   * @return {object}
   */
  async init() {
    // Get data from server
    this.constructor.loadData();

    // Construct images
    const promisedData = {
      // Images from players, monsters, tileset and more
      images: await Promise.all(this.loadAssets()),
    };

    return promisedData;
  }

  /**
   * Load assets by passing them through
   * a new instance of Image() and resolve the array
   *
   * @return {array}
   */
  loadAssets() {
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
   * Resolve data through for various channels
   *
   * @return {array}
   */
  static loadData() {
    window.ws.emit('client:load-assets');
    const self = this;
    const data = new Promise((resolve) => {
      while (self.assets !== [] && self.assets !== undefined && !self.assetsLoaded) {
        self.assetsLoaded = true;
        resolve(self.assets);
      }
    });

    return data;
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

  /**
   * Move the player one tile
   *
   * @param {string} direction The direction the player moved
   */
  move(direction) {
    this.player.move(direction, this.map);
  }
}

export default Game;
