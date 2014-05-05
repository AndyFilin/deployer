module.exports = function(expect_creator, callback1) {
    return {
        parser: function() {
            var fs = require('fs');
            var configs = fs.readFile('./WebstormProjects/task3/config_list', 'utf8', function(err, data) {
              var lines = data.split(/\n/);
              cl = {
                    username: lines[0],
                    host: lines[1],
                    port: lines[2],
                    password: lines[3],
                    command_path: lines[4]
                };
                console.log(cl);
                expect_creator(cl.username, cl.host, cl.password, cl.port, cl.command_path, callback1);
            });
}};
};
