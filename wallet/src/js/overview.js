const execFile = require('child_process').execFile;
const fs = require('fs');
const settings = require('electron-settings');
const electron = require('electron');
const path = require('path');
const teste = require('./connection.js');
const load = require('./overview_load');

var temp;
var valor = 0;

function atualiza(){

	fs.readFile('chave.pub', 'utf-8', function (err,data){
		if(err){
			console.log("Ocorreu um erro a ler a chave pública");
		}

		document.getElementById("wallet-adress").innerHTML = data;

	});

	setTimeout(function() {
	}, (500));
	fs.readFile('balance', 'utf-8', function (err,data){
		if(err){
			console.log("Ocorreu um erro a ler o balanço")
		}
	temp = data.slice(9,-1);
	document.getElementById("balance-available").innerHTML = temp;
	})
}

atualiza();
