const axios = require('axios');

class Authentication {
  static login(bus, data) {
    console.log('Logging in as...');
    const url = `${process.env.SITE_URL}/api/auth/login`;

    console.log(data);

    axios
      .post(url, data)
      .then((r) => {
        console.log('Success.');
        console.log(r.data);
        bus.emit('login', r.data);
      })
      .catch((err) => {
        console.log('Error.');
        console.log(err.response.status, err.response.data);
      });
  }
}

module.exports = Authentication;
