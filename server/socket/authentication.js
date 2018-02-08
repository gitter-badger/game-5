const axios = require('axios');

class Authentication {
  constructor() {
    this.token = null;
    this.id = null;
  }

  static async login(bus, data) {

    const player = await this.getToken(data).then(this.getProfile);

    console.log(player);


    // axios
    //   .post(url, data)
    //   .then((r) => { this.token = r.data; })
    //   .then(await this.getProfile)
    //   .then((response) => {
    //     console.log(response.username, 'has logged in.');
    //     bus.emit('login', response.data);
    //   })
    //   .catch((err) => {
    //     console.log('Error.');
    //     console.log(err.response.status, err.response.data);
    //   });
  }

  static getToken(data) {
    const url = `${process.env.SITE_URL}/api/auth/login`;

    return new Promise((resolve) => {
      axios
        .post(url, data)
        .then(r => resolve(r.data));
    });
  }

  static getProfile(response) {
    const url = `${process.env.SITE_URL}/api/auth/me`;
    const config = {
      headers: { Authorization: `Bearer ${response.access_token}` },
    };

    return new Promise((resolve) => {
      axios
        .post(url, null, config)
        .then(r => resolve(r.data));
    });
  }
}

module.exports = Authentication;
