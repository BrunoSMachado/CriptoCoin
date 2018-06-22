const electron = require('electron')
const settings = require('electron-settings')
const fs = require('fs');

var temp;
var value = 0;

function atualiza(){

	fs.readFile('chave.pub', 'utf-8', function (err,data){
		if(err){
			document.getElementById("wallet-adress").innerHTML = 'erro';
		}
			document.getElementById("wallet-adress").innerHTML = data;
	});

	value = getValue(data);
	document.getElementById("balance-available").innerHTML = value;
  setTimeout(atualiza,10000);
}

atualiza();
