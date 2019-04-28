//
//  Share Clipboard Sink
//
//  Based on Share Clipboard created by Coral Wu on 2014-05-10.
//  Copyright (c) 2014 Langui.net
//
//  JDB: Don't prepend length to message
//  JDB: Use as an nc server

var os = require("os");
var net = require('net');
var clipboard = require("copy-paste");

var port = 7582;

var debug = false;
function debugLog(msg) {
    if (debug) {
        console.log(msg);
    }
}

function writeToClipboard(text)
{
    clipboard.copy(text);
}

var server = net.createServer(function (socket) {
    debugLog('client connected');
    var buf = "";

    // save the data
    socket.on('data', function (chunk) {
        var text = chunk.toString('utf8');
        debugLog('data: ' + text);
        buf += text;
    });

    // remove client from the list
    socket.on('end', function() {
        debugLog('end: ' + buf);
        writeToClipboard(buf);
    });

    // error handling
    socket.on('error', function(err) {
        console.log('socket error ' + err);
    });
});

var hostname = os.hostname();

// port 7582 is used by Share Clipboard
server.listen(port, function() { //'listening' listener
    console.log("server started on " + hostname + ":" + port);
});
