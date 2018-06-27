const execFile = require('child_process').execFile;
const fs = require('fs');
const settings = require('electron-settings');
const electron = require('electron');
const path = require('path');
const teste = require('./connection.js');

function refreshA(){
	setTimeout( function() {
	  $.get('../../chave.pub', function(data){
			let temp = data.slice(31)
			let key = temp.substring(0,145)
			let nova = key.substring(0,72) + key.substring(73,145)
			teste.query(nova)
      $('#wallet-adress').text(nova)
    });
	  refreshA();
	}, 10000);
};

function refreshB(){
	setTimeout( function() {
    $.get('../../balance.txt', function(data) {
      $('#balance-available').text(data);
    });
		refreshB();
	}, 10000);
};

$(document).ready( function(){
	$.get('../../balance.txt', function(data) {
    $('#balance-available').text(data);
  });
	refreshB();
});

$(document).ready( function(){
  $.get('../../chave.pub', function(data){
		let temp = data.slice(31)
		let key = temp.substring(0,145)
		let nova = key.substring(0,72) + key.substring(73,145)
		teste.query(nova)
    $('#wallet-adress').text(nova)
  });
	refreshA();
});
