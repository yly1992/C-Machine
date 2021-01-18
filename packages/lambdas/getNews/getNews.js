const WebSocket = require('ws');


const socket = new WebSocket('wss://ws.finnhub.io?token=bv278u748v6o5ed700rg');

// Connection opened -> Subscribe
socket.addEventListener('open', function (event) {
    socket.send(JSON.stringify({'type':'subscribe-news', 'symbol': 'AAPL'}))
    socket.send(JSON.stringify({'type':'subscribe-news', 'symbol': 'MSFT'}))
    socket.send(JSON.stringify({'type':'subscribe-news', 'symbol': 'AMZN'}))
});

// Listen for messages
socket.addEventListener('message', function (event) {
    console.log('Message from server ', event.data);
});

// Unsubscribe
//  var unsubscribe = function(symbol) {
//     socket.send(JSON.stringify({'type':'unsubscribe-news','symbol': symbol}))
// }