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

    console.log('MIIBCgKCAQEAhF6963IwAP8g2E7MC5Fr9yMQVkiuTFf5VT16pW4fhYcJtLEWw7N8BuS7GKVR84vtJUsbNlgtbCpVnk8adS4DavtQvUdzBcBzIhpduUlP4iFQyIgpQN8yNAcXCiYbd0alTVxL'.length)
    console.log('MIIBCgKCAQEApq/4WP31aFm3kgl2CgIJwDugpi3XgLHstPdVnAzPKIZuSJWinUdaXRo4i8K7hHW4VJf/wrhRqv57gg0E6nbnD/RFuw/8cdjrjj2+NOuA7Iz8k3Dwq1bR7/IqDIM/Hxp8RzT9'.length)

    textSuccess.innerHTML = "Criadas chaves com sucesso"
/*
    const child = execFile('node',['../fabric-samples/NewsCoin/newPeer.js', x], (error, stdout, stderr) => {
        if (error) {
            console.error('stderr', stderr);
            throw error;
        }
        console.log(stdout);
    });
*/
});
