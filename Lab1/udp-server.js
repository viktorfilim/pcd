function startUdpServer(isStream) {
    var udp = require('dgram');
    var server = udp.createSocket('udp4');

    var protocol = 'Udp';
    var numberOfMessages = 0;
    var numberOfBytes = 0;

    server.on('error', function(error) {
        console.log('Error: ' + error);
        server.close();
    });

    server.on('message', function(msg, info) {
        numberOfMessages++;
        numberOfBytes = numberOfBytes + msg.length;
        if (!isStream) {
            server.send('OK ' + numberOfMessages, info.port, 'localhost', function(error) {
                if (error) {
                    client.close();
                } else {
                    //console.log(numberOfMessages);
                }
            });
        }
    });

    server.on('listening', function() {
        var address = server.address();
        var port = address.port;
        var family = address.family;
        var ipaddr = address.address;
        console.log('Server is listening at port' + port);
        console.log('Server ip :' + ipaddr);
        console.log('Server is IP4/IP6 : ' + family);
    });

    server.on('close', function() {
        console.log('Socket is closed !');
        console.log(`Protocol: ${protocol}`);
        console.log(`Number of messages: ${numberOfMessages}`);
        console.log(`Bytes: ${numberOfBytes}`);
    });

    server.bind(2222);

    setTimeout(function() {
        server.close();
    }, 100000);
}
module.exports = {
    startUdpServer: startUdpServer
  };
