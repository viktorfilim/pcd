function startUdpServer(isStream) {
    var udp = require('dgram');
    // creating a udp server
    var server = udp.createSocket('udp4');

    var protocol = 'Udp';
    var numberOfMessages = 0;
    var numberOfBytes = 0;

    // emits when any error occurs
    server.on('error', function(error) {
        console.log('Error: ' + error);
        server.close();
    });

    // emits on new datagram msg
    server.on('message', function(msg, info) {
        //console.log('Data received from client : ' + msg.toString());
        numberOfMessages++;
        numberOfBytes = numberOfBytes + msg.length;
        // console.log(
        //     'Received %d bytes from %s:%d\n',
        //     msg.length,
        //     info.address,
        //     info.port
        // );

        if (!isStream) {
            //sending msg
            server.send('OK ' + numberOfMessages, info.port, 'localhost', function(error) {
                if (error) {
                    client.close();
                } else {
                    console.log(numberOfMessages);
                }
            });
        }
    });

    //emits when socket is ready and listening for datagram msgs
    server.on('listening', function() {
        var address = server.address();
        var port = address.port;
        var family = address.family;
        var ipaddr = address.address;
        console.log('Server is listening at port' + port);
        console.log('Server ip :' + ipaddr);
        console.log('Server is IP4/IP6 : ' + family);
    });

    //emits after the socket is closed using socket.close();
    server.on('close', function() {
        console.log('Socket is closed !');
        console.log(`Protocol: ${protocol}`);
        console.log(`Number of messages: ${numberOfMessages}`);
        console.log(`Bytes: ${numberOfBytes}`);
    });

    server.bind(2222);

    setTimeout(function() {
        server.close();
    }, 990000);
}
module.exports = {
    startUdpServer: startUdpServer
  };
