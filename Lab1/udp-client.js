function createUdpClient(filename, isStream, bufferSize) {
    var udp = require('dgram');
    // creating a client socket
    var client = udp.createSocket('udp4');
    var fs = require('fs');
    var startDate = new Date();
    var hrstart, hrend;
    var sentMessages = 0;

    var readStream = fs.createReadStream(filename);

    client.on('message', function(msg, info) {
        // console.log('Data received from server : ' + msg.toString());
        // console.log(
        //     'Received %d bytes from %s:%d\n',
        //     msg.length,
        //     info.address,
        //     info.port
        // );
        console.log(msg.toString() + ' = ' + sentMessages);

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
            client.close();
            return;
        }
        client.send(chunk, 2222, 'localhost', function(error) {
            if (error) {
                client.close();
            } else {
                sentMessages++;
                //console.log(`Sent ${chunk.length}`);
            }
        });
    });

    readStream.on('end', () => {
        client.close();
    });

    client.on('close', function() {
        var finishDate = new Date();
        hrend = process.hrtime(hrstart);
        var time = (finishDate.getTime() - startDate.getTime()) / 1000;
        console.log(`Start time: ${startDate}`);
        console.log(`End time: ${finishDate}`);
        console.log(`Time: ${hrend[0]}s, ${hrend[1] / 1000000}ms`);
        console.log(`Number of messages: ${sentMessages}`);
    });
}
module.exports = {
    createUdpClient: createUdpClient
  };
//createUdpClient('./files/small.file', false, 4000);
