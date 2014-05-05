#!/usr/bin/expect -f
spawn scp -P 22 /Users/andrejfilin/.ssh/id_rsa.pub "andreyfilin@192.168.0.218:"
expect {
"yes/no" {
   send "yes\r"
   expect "assword:" {
       send "eltech2014\r"
       spawn ssh -p22 andreyfilin@192.168.0.218
       expect "assword:"
       send "eltech2014\r"
       expect ":~?"
       send "cat ~/id_rsa.pub >> ~/.ssh/authorized_keys\r"
       expect ":~?"
       spawn scp -P 22 /Users/andrejfilin/WebstormProjects/task3/node_binaries.tar.gz "andreyfilin@192.168.0.218:"
       expect "5190"
       spawn scp -P 22 -r /Users/andrejfilin/WebstormProjects/task3/remote_scripts "andreyfilin@192.168.0.218:~/nodescripts"
       expect "ssh_connector2.js"
       expect ":~?"
       exit 0}}
"assword:" {
   send "eltech2014\r"
   spawn ssh -p22 andreyfilin@192.168.0.218
   expect "assword:"
   send "eltech2014\r"
   expect ":~?"
   send "cat ~/id_rsa.pub >> ~/.ssh/authorized_keys\r"
   expect ":~?"
   spawn scp -P 22 /Users/andrejfilin/WebstormProjects/task3/node_binaries.tar.gz "andreyfilin@192.168.0.218:"
   expect "5190"
   spawn scp -P 22 -r /Users/andrejfilin/WebstormProjects/task3/remote_scripts "andreyfilin@192.168.0.218:~/nodescripts"
   expect "ssh_connector2.js"
   expect ":~?"
   exit 0}
"id_rsa" {
   spawn ssh -p22 andreyfilin@192.168.0.218
   expect ":~?"
   expect ":~?"
   spawn scp -P 22 /Users/andrejfilin/WebstormProjects/task3/node_binaries.tar.gz "andreyfilin@192.168.0.218:"
   expect "5190"
   spawn scp -P 22 -r /Users/andrejfilin/WebstormProjects/task3/remote_scripts "andreyfilin@192.168.0.218:~/nodescripts"
   expect "ssh_connector2.js"
   expect ":~?"
   exit 1}}
