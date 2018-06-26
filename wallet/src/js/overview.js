const execFile = require('child_process').execFile;
const fs = require('fs');
const settings = require('electron-settings');
const electron = require('electron');
const path = require('path');
const teste = require('./connection.js');

function refreshA(){
	setTimeout( function() {
	  $.get('../../chave.pub', function(data){
      teste.query(data)
      $('#wallet-adress').text(data)
    });
	  refreshA();
	}, 10000);
};

function refreshB(){
	setTimeout( function() {
    $.get('../../balance.txt', function(data) {
      $('#balance-available').text(data.slice(9,-1));
    });
		refreshB();
	}, 10000);
};

$(document).ready( function(){
	$.get('../../balance.txt', function(data) {
    $('#balance-available').text(data.slice(9,-1));
  });
	refreshB();
});

$(document).ready( function(){
  $.get('../../chave.pub', function(data){
    $('#wallet-adress').text(data)
  });
	refreshA();
});
