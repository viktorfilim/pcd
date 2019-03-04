var args = process.argv;
var serverType = args[2];
var messageSize = args[4];
var sendType = args[3];
var fileName = args[5];
var isStream = sendType === 'stream';
var clientUdp = require('./udp-client');
var clientTcp = require('./tcp-client');
if(isStream){
    console.log(`Started in mode stream`);
}else{
    console.log(`Started in mode stop/wait`);
}
if (serverType == 'udp') {
    clientUdp.createUdpClient(fileName, isStream, messageSize);
}
if (serverType == 'tcp') {
    clientTcp.createTctClient(fileName, isStream, messageSize);
}