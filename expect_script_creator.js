module.exports = function(username, host, password, port, path, callback) {
    if (port !== undefined) {
        var port1 = "-P "+port+' ';
        var port2 = "-p"+port+' ';
    }
    var fs = require('fs');
    fs.unlink('./WebstormProjects/task3/auto_key_copier.sh', function() {
    fs.open('./WebstormProjects/task3/auto_key_copier.sh', 'a', function(err, file_handle) {
        if (err) {
            console.log('problems opening the file');
        } else {
            fs.write(file_handle, '#!/usr/bin/expect -f\n' +
                'spawn scp ' + port1 +'/Users/andrejfilin/.ssh/id_rsa.pub "' + username + '@' + host + ':"\n' +
                'expect {\n' +
                '"yes/no" {\n' +
                '   send "yes\\r"\n'+
                '   expect "assword:" {\n' +
                '       send "' + password +'\\r"\n' +
                '       spawn ssh ' + port2 + username + '@' + host + '\n' +
                '       expect "assword:"\n' +
                '       send "' + password + '\\r"\n' +
                '       expect ":~?"\n' +
                '       send "cat ~/id_rsa.pub >> ~/.ssh/authorized_keys\\r"\n' +
                '       expect ":~?"\n' +
                //'       send "rm ~/id_rsa.pub\\r"\n' +
                //'       expect ":~?"\n' +
                '       spawn scp ' + port1 +'/Users/andrejfilin/WebstormProjects/task3/node_binaries.tar.gz "' + username + '@' + host + ':"\n' +
                '       expect "5190"\n' +
                //'       expect ":~?"\n'+
                '       spawn scp ' + port1 +'-r /Users/andrejfilin/WebstormProjects/task3/remote_scripts "' + username + '@' + host + ':~/nodescripts"\n' +
                '       expect "ssh_connector2.js"\n' +
                '       expect ":~?"\n'+
                '       exit 0}}\n' +
                '"assword:" {\n' +
                '   send "' + password + '\\r"\n' +
                '   spawn ssh ' + port2 + username + '@' + host + '\n'+
                '   expect "assword:"\n'+
                '   send "' + password + '\\r"\n'+
                '   expect ":~?"\n'+
                '   send "cat ~/id_rsa.pub >> ~/.ssh/authorized_keys\\r"\n'+
                '   expect ":~?"\n'+
                //'   send "rm ~/id_rsa.pub\\r"\n'+
                //'   expect ":~?"\n'+
                '   spawn scp ' + port1 +'/Users/andrejfilin/WebstormProjects/task3/node_binaries.tar.gz "' + username + '@' + host + ':"\n' +
                '   expect "5190"\n' +
                //'   expect ":~?"\n'+
                '   spawn scp ' + port1 +'-r /Users/andrejfilin/WebstormProjects/task3/remote_scripts "' + username + '@' + host + ':~/nodescripts"\n' +
                '   expect "ssh_connector2.js"\n' +
                '   expect ":~?"\n'+
                '   exit 0}\n'+
                '"id_rsa" {\n'+
                '   spawn ssh ' + port2 + username + '@' + host + '\n' +
                '   expect ":~?"\n'+
                //'   send "rm ~/id_rsa.pub\\r"\n'+
                '   expect ":~?"\n'+
                '   spawn scp ' + port1 +'/Users/andrejfilin/WebstormProjects/task3/node_binaries.tar.gz "' + username + '@' + host + ':"\n' +
                '   expect "5190"\n' +
                //'   expect ":~?"\n'+
                '   spawn scp ' + port1 +'-r /Users/andrejfilin/WebstormProjects/task3/remote_scripts "' + username + '@' + host + ':~/nodescripts"\n' +
                '   expect "ssh_connector2.js"\n' +
                '   expect ":~?"\n'+
                '   exit 1}}\n',
                null, 'utf8', function(err, written) {
                if (err) {
                    console.log('problems writing to file');
                }
                else {
                    console.log('file created, '+written+' bytes written');
                    callback(username, host, port, path);
                }
            });
        }
    });
    });
};