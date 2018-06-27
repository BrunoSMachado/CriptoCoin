const execFile = require('child_process').execFile;
const remote = require('electron').remote
const dialog = remote.dialog
const crypto = require('crypto');
const keypair = require('keypair');
const fs = require('fs');

const browseButton = document.getElementById('button-create-browse')
const createButton = document.getElementById('button-create-create')
const textSuccess = document.getElementById('text-create-success')
const textError = document.getElementById('text-create-error')


createButton.addEventListener('click', function (event) {

    var pair = keypair();
    fs.writeFileSync('chave.priv', pair.private,'utf8');
    fs.writeFileSync('chave.pub', pair.public,'utf8');

    let path = '../../wallet/chave.pub'

    textSuccess.innerHTML = "Criadas chaves com sucesso"

    const child = execFile('node',['../fabric-samples/NewsCoin/newPeer.js', path], (error, stdout, stderr) => {
        if (error) {
            console.error('stderr', stderr);
            throw error;
        }
        console.log(stdout);
    });
});
