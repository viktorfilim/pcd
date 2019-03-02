var args = process.argv;
var serverType = args[2];
var messageSize = args[4];
var sendType = args[3];
var fileName = args[5];
var isStream = sendType === 'stream';
var serverUdp = require('./udp-server');
var clientUdp = require('./udp-client');
if (serverType == 'udp') {
    serverUdp.startUdpServer(isStream);
}
