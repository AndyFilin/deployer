module.exports = function(username, host, password, port, path, callback) {
    if (port !== undefined) {
        var port1 = "-P "+port+' ';
        var port2 = "-p"+port+' ';
    }
    var fs = require('fs');
    fs.unlink('/home/andreyfilin/nodescripts/auto_key_copier.sh', function() {
        fs.open('/home/andreyfilin/nodescripts/auto_key_copier.sh', 'a', function(err, file_handle) {
            if (err) {
                console.log('problems opening the file');
            } else {
                fs.write(file_handle, '#!/usr/bin/expect -f\n' +
                    'spawn scp ' + port1 +'/home/andreyfilin/.ssh/id_rsa.pub "' + username + '@' + host + ':"\n' +
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
                    '       send "rm ~/id_rsa.pub\\r"\n' +
                    '       expect ":~?"\n' +
                    '       spawn scp ' + port1 +'/home/andreyfilin/node_binaries.tar.gz "' + username + '@' + host + ':"\n' +
                    '       expect "5190"\n' +
                    '       exit 0}}\n' +
                    '"assword:" {\n' +
                    '   send "' + password + '\\r"\n' +
                    '   spawn ssh ' + port2 + username + '@' + host + '\n'+
                    '   expect "assword:"\n'+
                    '   send "' + password + '\\r"\n'+
                    '   expect ":~?"\n'+
                    '   send "cat ~/id_rsa.pub >> ~/.ssh/authorized_keys\\r"\n'+
                    '   expect ":~?"\n'+
                    '   send "rm ~/id_rsa.pub\\r"\n'+
                    '   expect ":~?"\n'+
                    '   spawn scp ' + port1 +'/home/andreyfilin/node_binaries.tar.gz "' + username + '@' + host + ':"\n' +
                    '   expect "5190"\n' +
                    '   exit 0}\n'+
                    '"id_rsa" {\n'+
                    '   spawn ssh ' + port2 + username + '@' + host + '\n' +
                    '   expect ":~?"\n'+
                    '   send "rm ~/id_rsa.pub\\r"\n'+
                    '   expect ":~?"\n'+
                    '   spawn scp ' + port1 +'/home/andreyfilin/node_binaries.tar.gz "' + username + '@' + host + ':"\n' +
                    '   expect "5190"\n' +
                    '   expect ":~?"\n'+
                    '   exit 1}}\n',
                    null, 'utf8', function(err, written) {
                        if (err) {
                            console.log('problems writing to file');
                        }
                        else {
                            console.log('file created, '+written+' bytes written');
                            fs.unlink('/home/andreyfilin/nodescripts/auto_key_copier1.sh', function() {
                                fs.open('/home/andreyfilin/nodescripts/auto_key_copier1.sh', 'a', function(err, file_handle) {
                                    if (err) {
                                        console.log('problems opening the file');
                                    } else {
                                        fs.write(file_handle, '#!/usr/bin/expect -f\n' +
                                            'spawn scp ' + port1 +'/home/andreyfilin/id_rsa.pub "' + username + '@' + host + ':"\n' +
                                            'expect {\n' +
                                            '"yes/no" {\n' +
                                            '   send "yes\\r"\n'+
                                            '   expect "assword:" {\n' +
                                            '       send "' + password +'\\r"\n' +
                                            '       spawn ssh ' + port2 + username + '@' + host + '\n' +
                                            '       expect "assword:"\n' +
                                            '       send "' + password + '\\r"\n' +
                                            '       expect ":~?"\n' +
                                            '       send "cat /home/andreyfilin/id_rsa.pub >> /home/andreyfilin/.ssh/authorized_keys\\r"\n' +
                                            '       expect ":~?"\n' +
                                            '       send "rm /home/andreyfilin/id_rsa.pub\\r"\n' +
                                            '       expect ":~?"\n' +
                                            //'       spawn scp ' + port1 +'/home/andreyfilin/node_binaries.tar.gz "' + username + '@' + host + ':"\n' +
                                            //'       expect "5190"\n' +
                                            '       exit 0}}\n' +
                                            '"assword:" {\n' +
                                            '   send "' + password + '\\r"\n' +
                                            '   spawn ssh ' + port2 + username + '@' + host + '\n'+
                                            '   expect "assword:"\n'+
                                            '   send "' + password + '\\r"\n'+
                                            '   expect ":~?"\n'+
                                            '   send "cat /home/andreyfilin/id_rsa.pub >> /home/andreyfilin/.ssh/authorized_keys\\r"\n'+
                                            '   expect ":~?"\n'+
                                            '   send "rm /home/andreyfilin/id_rsa.pub\\r"\n'+
                                            '   expect ":~?"\n'+
                                            //'   spawn scp ' + port1 +'/home/andreyfilin/node_binaries.tar.gz "' + username + '@' + host + ':"\n' +
                                            //'   expect "5190"\n' +
                                            '   exit 0}\n'+
                                            '"id_rsa" {\n'+
                                            '   spawn ssh ' + port2 + username + '@' + host + '\n' +
                                            '   expect ":~?"\n'+
                                            '   send "rm /home/andreyfilin/id_rsa.pub\\r"\n'+
                                            '   expect ":~?"\n'+
                                            //'   spawn scp ' + port1 +'/home/andreyfilin/node_binaries.tar.gz "' + username + '@' + host + ':"\n' +
                                            //'   expect "5190"\n' +
                                            '   expect ":~?"\n'+
                                            '   exit 1}}\n',
                                            null, 'utf8', function(err, written) {
                                                if (err) {
                                                    console.log('problems writing to file');
                                                }
                                                else {
                                                    console.log('file created, '+written+' bytes written');
                                                    var send_keys = require('/home/andreyfilin/nodescripts/remote_key_copier1');
                                                    send_keys.copier.on('exit', function() {
                                                        console.log('ORIGINAL KEYS COPIED');
                                                        callback(username, host, port, path);
                                                    });
                                                }
                                            });
                                    }
                                });
                            });
                            //callback(username, host, port, path);
                        }
                    });
            }
        });
    });


};