module.exports = function(username1, hostname, portnumber, command_path) {
return {
ssh_connector: function() {
    var fs = require('fs');
    var readline = require('readline');
    var connection = require('ssh2');
    var spawn = require('child_process').spawn;
    var ssh_out = fs.createWriteStream('/home/andreyfilin/nodescripts/ssh_out.log');
    var input = fs.createReadStream(command_path, {encoding: 'utf8'});
    var ssh_err = fs.openSync('/home/andreyfilin/nodescripts/ssh_err.log', 'a');
    var remaining = '';
    input.on('data', function(data) {
        var c = new connection();
        c.connect({
            host: hostname,
            port: parseInt(portnumber),
            username: username1,
            privateKey: require('fs').readFileSync('/home/andreyfilin/.ssh/id_rsa')
        });
        remaining += data;
        var index = remaining.indexOf('\n');
        c.on('ready', function() {
            console.log('ready');
            function read_next_line(remaining, index) {
                var line = remaining.substring(0, index);
                console.log('connecting and passing the command: ' + line);
                remaining = remaining.substring(index + 1);
                index = remaining.indexOf('\n');
                if (index > -1) {
                    c.exec(line, function(err, stream) {
                        console.log('executing');
                        if (err) {
                            console.log('error');
                            throw err;
                        }
                        rl = readline.createInterface({
                            input: process.stdin,
                            output: process.stdout
                        });

                        stream.on('data', function(data) {
                            console.log('out: ' + data);
                            rl.question('', function(answer) {
                                stream.write(answer + '\r');
                                stream.end();
                            });
                        });
                        stream.on('error', function(err) {
                            console.log('err: ' + err);
                        });
                        stream.on('end', function() {
                           console.log('end');
                        });
                        stream.on('close', function() {
                            console.log('close');
                            rl.close();
                            read_next_line(remaining, index);
                        });
                        stream.on('exit', function() {
                            console.log('exit');
                        });
                    });
                }
                else {
                    console.log('all commands passed');
                    c.end();
                    process.exit()
                    spawb
                }
            }
            read_next_line(remaining, index);
        });
    });
    }
};
};