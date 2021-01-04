const https = require('https')



exports.handler = function(event) {
    const https = require('https');

    var ticker = event['ticker']
    let token = "bntbl87rh5rfc44snao0";
    let url = `https://finnhub.io/api/v1/stock/metric?symbol=${ticker}&metric=all&token=${token}`;
    let dataString = '';
    
    const req = https.get(url, function(res) {
      res.on('data', chunk => {
        dataString += chunk;
      });
      res.on('end', () => {
        console.log(dataString);
      });
    });
    
    req.on('error', (e) => {
      console.error(e);
    });
    
  return dataString;
}