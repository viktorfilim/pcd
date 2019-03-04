function createTctClient(filename, isStream, bufferSize) {
    var net = require('net');
    var fs = require('fs');
    var sentMessages = 0;
    var readStream = fs.createReadStream(filename);

    // creating a custom socket client and connecting it....
    var client = new net.Socket();
    client.connect({
        port: 2222
    });

    client.on('connect', function() {
        var address = client.address();
        var port = address.port;
        var family = address.family;
        var ipaddr = address.address;
        console.log('Client is listening at port' + port);
        console.log('Client ip :' + ipaddr);
        console.log('Client is IP4/IP6 : ' + family);

    });

    client.setEncoding('utf8');

    client.on('data', function(data) {
        console.log(' Data from server:' + data);
        console.log(data.toString() + ' = ' + sentMessages);
        // writing data to server
        //client.write('hello from client');
        readStream.read(bufferSize);
    });

    readStream.on('readable', () => {
        startDate = new Date();
        hrstart = process.hrtime();
        if (isStream) {
            while (null !== readStream.read(bufferSize)) {}
        } else {
            readStream.read(bufferSize);
        }
    });

    readStream.on('data', chunk => {
        if (chunk === null) {
            client.end();
            return;
        }
        client.write(chunk, function(error) {
            if (error) {
                client.end();
            } else {
                sentMessages++;
                console.log(`Sent ${chunk.length}`);
            }
        });
    });

    readStream.on('end', () => {
        client.end();
    });

    // setTimeout(function() {
    //     client.end('Bye bye server');
    // }, 5000);

    //NOTE:--> all the events of the socket are applicable here..in client...

    // -----------------creating client using net.connect instead of custom socket-------

    // server creation using net.connect --->
    // u can also => write the below code in seperate js file
    // open new node instance => and run it...

    // const clients = net.connect({ port: 2222 }, () => {
    //     // 'connect' listener
    //     console.log('connected to server!');
    //     clients.write('world!\r\n');
    // });
    // clients.on('data', data => {
    //     console.log(data.toString());
    //     clients.end();
    // });
    // clients.on('end', () => {
    //     console.log('disconnected from server');
    // });
}
module.exports = {
    createTctClient: createTctClient
  };