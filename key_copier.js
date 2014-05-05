var fs = require('fs');
var key_out = fs.createWriteStream('./WebstormProjects/task3/key_out.log');
var spawn = require('child_process').spawn;
var err = 0;
var key_copy = spawn('expect', ['./WebstormProjects/task3/auto_key_copier.sh']);
    console.log('copying keys');
    key_copy.stdout.pipe(key_out);
    key_copy.stderr.on('data', function(data) {
        err = 0;
        console.log('key_stderr_ssh: ' + data);
    });
    key_copy.on('exit', function(code) {
        if (code == 0) {
            err = 2;
            console.log('key seems to have been transmitted');
        }
        else {
            console.log('key seems to be on the remote computer already');
            err = 3;
        }
    });
exports.copier = key_copy;
exports.err = err;