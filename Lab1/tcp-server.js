function startTcpServer(isStream) {
    var net = require('net');
    var protocol = 'Tcp';
    var numberOfMessages = 0;
    var numberOfBytes = 0;

    var server = net.createServer();

    server.on('connection', function(socket) {
        var lport = socket.localPort;
        var laddr = socket.localAddress;
        console.log('Server is listening at LOCAL port' + lport);
        console.log('Server LOCAL ip :' + laddr);

        console.log('------------remote client info --------------');

        var rport = socket.remotePort;
        var raddr = socket.remoteAddress;
        var rfamily = socket.remoteFamily;

        console.log('REMOTE Socket is listening at port' + rport);
        console.log('REMOTE Socket ip :' + raddr);
        console.log('REMOTE Socket is IP4/IP6 : ' + rfamily);

        socket.on('data', function(data) {
            var bread = socket.bytesRead;

            numberOfMessages++;
            numberOfBytes = numberOfBytes + data.length;
            if (!isStream) {
                var ok = socket.write('OK ' + numberOfMessages);
                // if (ok) {
                //     console.log(numberOfMessages);
                // }
            }
        });

        socket.on('error', function(error) {
            console.log('Error : ' + error);
        });

        socket.on('timeout', function() {
            console.log('Socket timed out !');
            socket.end('Timed out!');
        });

        socket.on('end', function(data) {
            console.log('Socket ended from other end!');
        });

        socket.on('close', function(error) {
            if (error) {
                console.log('Socket was closed coz of transmission error');
            }

            var bread = socket.bytesRead;
            console.log(`Protocol: ${protocol}`);
            console.log(`Number of messages: ${numberOfMessages}`);
            console.log(`Bytes: ${bread}`);

            console.log('Socket closed!');

        });
    });

    server.on('error', function(error) {
        console.log('Error: ' + error);
    });

    server.on('close', function() {
        console.log('Server closed !');
    });

    server.on('listening', function() {
        var address = server.address();
        var port = address.port;
        var family = address.family;
        var ipaddr = address.address;
        console.log('Server is listening at port ' + port);
        console.log('Server ip :' + ipaddr);
        console.log('Server is IP4/IP6 : ' + family);
    });

    server.listen(2222);

    // setTimeout(function() {
    //     server.close();
    // }, 5000000);
}
module.exports = {
    startTcpServer: startTcpServer
  };