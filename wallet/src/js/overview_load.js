const remote = require('electron').remote
const fs = require('fs')

var chave = ""
const public_key = document.getElementById('input-load-public')
const loadButton = document.getElementById('button-load-load')
const errorText = document.getElementById('text-load-error')
const warningText = document.getElementById('text-load-warning')
const successText = document.getElementById('text-load-success')

loadButton.addEventListener('click', function (event) {

    chave = public_key.value;
    fs.writeFile('chave.pub', chave, function (err) {
        if (err) throw err;
    });
    document.getElementById("text-load-success").innerHTML = "Chave carregada ...";

});
