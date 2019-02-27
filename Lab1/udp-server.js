function startUdp() {
    var udp = require('dgram');

    // creating a udp server
    var server = udp.createSocket('udp4');

    // emits when any error occurs
    server.on('error', function (error) {
        console.log('Error: ' + error);
        server.close();
    });

    // emits on new datagram msg
    server.on('message', function (msg, info) {
        console.log('Client %s: %s:%d\n', msg.toString(), info.address, info.port);
        //console.log('Received %d bytes from %s:%d\n', msg.length, info.address, info.port);
        var i = 0;    
        while (i < 100) {


            //sending msg
            server.send(i.toString(), info.port, 'localhost', function (error) {
                if (error) {
                    client.close();
                } else {
                    console.log('Data sent !!!');
                }
                i++;
            });
        }
    });

    //emits when socket is ready and listening for datagram msgs
    server.on('listening', function () {
        var address = server.address();
        var port = address.port;
        var family = address.family;
        var ipaddr = address.address;
        console.log('Server is listening at port' + port);
        console.log('Server ip :' + ipaddr);
        console.log('Server is IP4/IP6 : ' + family);
    });

    //emits after the socket is closed using socket.close();
    server.on('close', function () {
        console.log('Socket is closed !');
    });

    server.bind(2222);

    setTimeout(function () {
        server.close();
    }, 8000);

}

startUdp();