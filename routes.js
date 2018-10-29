
const axios = require('axios');
const keys = require('./keys');

let accessCode = "";

module.exports = app => {
  //OAuth route
  app.get('/', (req, res) => {
    if(req.query.code === undefined ) {
      res.redirect(301,
        `https://sandbox.dev.clover.com/oauth/authorize?client_id=${keys.APP_ID}&merchant_id=${keys.MERCHANT_ID}$redirect_uri=http://localhost:5000`);
    } else {
      requestAPIToken(req, res, req.query.code);
    }
  });

  //route which requests the user's inventory
  app.get('/api/inventory', (req, res) => {
    const url = `https://apisandbox.dev.clover.com/v3/merchants/${keys.MERCHANT_ID}/items?access_token=${keys.ACCESS_TOKEN}`;
    axios.get(url).then(response => {
      res.send(response.data);
    }).catch(err => {
      res.send({err})
    });
  });
};

//function which makes a request for an API token
const requestAPIToken = (req, res, code) => {
  const url = `https://sandbox.dev.clover.com/oauth/token?client_id=${keys.APP_ID}&client_secret=${keys.APP_SECRET}&code=${code}`

  axios.get(url).then(response => {
    accessToken = response.data;
    res.send(accessToken);
  }).catch(err => {
    res.send({err});
  });
}
