const execFile = require('child_process').execFile;
const remote = require('electron').remote
const dialog = remote.dialog

const browseButton = document.getElementById('button-create-browse')
const createButton = document.getElementById('button-create-create')
const textSuccess = document.getElementById('text-create-success')
const textError = document.getElementById('text-create-error')

const folderPath = document.getElementById('input-create-path')
const pub = document.getElementById('input-create-name')
const walletPassword = document.getElementById('input-create-password')

var x;

browseButton.addEventListener('click', function(event) {
    dialog.showOpenDialog({properties: ['openDirectory']}, function (files) {
        if (files) {
            folderPath.value = files[0]
        }
    })
})

createButton.addEventListener('click', function (event) {

    x = pub.value;
    const child = execFile('node',['../fabric-samples/NewsCoin/newPeer.js', x], (error, stdout, stderr) => {
        if (error) {
            console.error('stderr', stderr);
            throw error;
        }
        console.log(stdout);
    });

});
