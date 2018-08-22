const axios = require('axios');
const keys = require('../keys');

let accessCode = "";
let apiToken = "";

module.exports = app => {
  app.get('/', (req, res) => {
    if(req.query.code == undefined) {
      res.redirect(301,
        `https://sandbox.dev.clover.com/oauth/authorize?client_id=${keys.APP_ID}`);
    } else {
      accessCode = req.query.code;
      requestAPIToken(res, req, accessCode);
    }
  });
};

//function which makes a request for an API token
const requestAPIToken = (res, req, code) => {
  const url = `https://sandbox.dev.clover.com/oauth/token?client_id=${keys.APP_ID}&client_secret=${keys.APP_SECRET}&code=${code}`

  axios.get(url).then(response => {
    apiToken = response.data;
    res.send(apiToken);
  }).catch(err => {
    res.send({err});
  });
}
