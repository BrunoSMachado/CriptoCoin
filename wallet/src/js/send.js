const execFile = require('child_process').execFile;
const fs = require('fs');

const button = document.getElementById('button-send-send')
const adress = document.getElementById('input-send-address')
const amount = document.getElementById('input-send-amount')
const sucess = document.getElementById('text-send-success')

var adr1;
var adr2;
var value;
var priv;
var assinatura;

button.addEventListener('click', function (event) {

    adr1 = fs.readFileSync('chave.pub','utf8');
    let temp = adr1.slice(31)
    let key = temp.substring(0,145)
    let nova = key.substring(0,72) + key.substring(73,145)
    adr2 = adress.value;
    value = amount.value;
    priv = fs.readFileSync('chave.priv','utf8');

    const crypto = require('crypto');
    const sign = crypto.createSign('SHA256');

    sign.update(adr1);

    assinatura = sign.sign(priv,'hex');

    const child = execFile('node',['../fabric-samples/NewsCoin/transaction.js', nova, adr2, value, assinatura], (error, stdout, stderr) => {
        if (error) {
            console.error('stderr', stderr);
            throw error;
        }
        console.log(stdout);
    });

    sucess.innerHTML = 'Transação bem sucedida'
});
