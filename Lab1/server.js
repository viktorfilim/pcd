var args = process.argv;
var serverType = args[2];
var sendType = args[3];
var isStream = sendType === 'stream';
var serverUdp = require('./udp-server');
var serverTcp = require('./tcp-server');
if(isStream){
    console.log(`Started in mode stream`);
}else{
    console.log(`Started in mode stop/wait`);
}
if (serverType == 'udp') {
    serverUdp.startUdpServer(isStream);
}
if (serverType == 'tcp') {
    serverTcp.startTcpServer(isStream);
}
