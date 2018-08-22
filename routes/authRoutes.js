const keys = require('../config/keys');
let accessToken = "";

module.exports = app => {
  app.get('/', (req, res) => {
    if(req.query.code == undefined) {
      res.redirect(301, `https://sandbox.dev.clover.com/oauth/authorize?client_id=${keys.APP_ID}&redirect_uri=${keys.REDIRECT_ID}`);
    } else {
      accessToken = req.query.code;
    }
  });
};
