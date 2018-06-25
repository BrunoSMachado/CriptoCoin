const execFile = require('child_process').execFile;
const fs = require('fs')

const button = document.getElementById('button-send-send')
const adress = document.getElementById('input-send-address')
const amount = document.getElementById('input-send-amount')
const sucess = document.getElementById('text-send-success')

var adr2;
var value;

button.addEventListener('click', function (event) {

  fs.readFile('chave.pub', 'utf-8', function (err,data){
    if(err){
      console.log("Ocorreu um erro a ler a chave pública");
    }
    adr2 = adress.value
    value = amount.value

    const child = execFile('node',['../fabric-samples/NewsCoin/transaction.js', data, adr2, value], (error, stdout, stderr) => {
        if (error) {
            console.error('stderr', stderr);
            throw error;
        }
        console.log(stdout);
    });

  });

    sucess.innerHTML = 'Transação bem sucedida'
});
