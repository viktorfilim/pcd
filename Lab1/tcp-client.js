function createTctClient(filename, isStream, bufferSize) {
    var net = require('net');
    var fs = require('fs');
    var sentMessages = 0;
    var readStream = fs.createReadStream(filename);
    var startDate = new Date();
    var hrstart, hrend;
    var numberOfBytes = 0;

    var client = new net.Socket();
    client.connect({
        port: 2222
    });

    client.on('connect', function () {
        var address = client.address();
        var port = address.port;
        var family = address.family;
        var ipaddr = address.address;
        console.log('Client is listening at port' + port);
        console.log('Client ip :' + ipaddr);
        console.log('Client is IP4/IP6 : ' + family);
        hrstart = process.hrtime();
    });

    client.on('data', function (data) {
        //console.log(data.toString() + ' = ' + sentMessages);
        readStream.read(bufferSize);
    });

    readStream.on('data', chunk => {
        if (chunk === null) {
            client.end();
            return;
        }
        client.write(chunk, function (error) {
            if (error) {
            console.log('write error');
            client.end();
            } else {
                sentMessages++;
                numberOfBytes = numberOfBytes + chunk.length;

                //console.log(`Sent ${chunk.length}`);
            }
        });
    });

    readStream.on('end', () => {
        client.end();

        var finishDate = new Date();
        hrend = process.hrtime(hrstart);
        var time = (finishDate.getTime() - startDate.getTime()) / 1000;
        console.log(`Start time: ${startDate}`);
        console.log(`End time: ${finishDate}`);
        console.log(`Time: ${hrend[0]}s, ${hrend[1] / 1000000}ms`);
        console.log(hrend);
        console.log(`Number of messages: ${sentMessages}`);
        console.log(`Bytes: ${numberOfBytes}`);
    });

    if (isStream) {
        console.log('aa');
        while (null !== readStream.read(bufferSize)) { }
    } else {
        console.log('ss');
        readStream.read(bufferSize);
    }
}
module.exports = {
    createTctClient: createTctClient
};