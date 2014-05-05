var config = require('./remote_config_parser');
var expect_creator = require('./remote_expect_script_creator');
var ec1 = config(expect_creator, function(username1, hostname, portnumber, command_path) {
    var send_keys = require('./remote_key_copier');
    send_keys.copier.on('exit', function(code) {
        console.log('exited with code ' + code);
        var connector = require('./remote_ssh_connector2');
        connector1 = connector(username1, hostname, portnumber, command_path);
        connector1.ssh_connector();
    });
});
ec1.parser();