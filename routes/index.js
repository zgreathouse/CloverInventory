const axios = require('axios');
const keys = require('../keys');

let accessCode = "";
let apiToken = "";
let merchantID = "";
let employeeID = "";

module.exports = app => {
  //OAuth route
  app.get('/', (req, res) => {
    if(req.query.code === undefined) {
      res.redirect(301,
        `https://sandbox.dev.clover.com/oauth/authorize?client_id=${keys.APP_ID}`);
    } else {
      accessCode = req.query.code;
      merchantID = req.query.merchant_id;
      employeeID = req.query.employee_id;
      requestAPIToken(res, req, accessCode);
    }
  });

  //route which requests the user's inventory
  app.get('/api/inventory', (req, res) => {
    const url = `https://apisandbox.dev.clover.com/v3/merchants/${merchantID}/items?access_token=${apiToken}`;

    axios.get(url).then(response => {
      res.send(response.data);
    }).catch(err => {
      res.send({err})
    });
  });
};

//function which makes a request for an API token
const requestAPIToken = (res, req, code) => {
  const url = `https://sandbox.dev.clover.com/oauth/token?client_id=${keys.APP_ID}&client_secret=${keys.APP_SECRET}&code=${code}`

  axios.get(url).then(response => {
    apiToken = response.data;
    res.sendStatus(200)
  }).catch(err => {
    res.send({err});
  });
}
