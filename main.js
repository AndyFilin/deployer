var config = require('./config_parser');
var expect_creator = require('./expect_script_creator');
var ec1 = config(expect_creator, function(username1, hostname, portnumber, command_path) {
    var send_keys = require('./key_copier');
    send_keys.copier.on('exit', function(code) {
        console.log('exited with code ' + code);
        var connector = require('./ssh_connector2');
        connector1 = connector(username1, hostname, portnumber, command_path, function() {
            console.log('now connecting computer 1 to computer 3...');
            var child = require('child_process').spawn;
            var ssh_connection = child('ssh', ['-tt', 'andreyfilin@192.168.0.211']);
            ssh_connection.stdout.on('data',function(data) {
                console.log('stdout: ' + data);
            });
            process.stdin.resume();
            process.stdin.on('data', function (chunk) {
                ssh_connection.stdin.write(chunk);
            });
            ssh_connection.on('exit', function() {
                process.exit();
            });
        });
        connector1.ssh_connector();
    });
});
ec1.parser();