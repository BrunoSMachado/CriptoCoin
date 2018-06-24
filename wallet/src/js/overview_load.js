const remote = require('electron').remote
const fs = require('fs')

const public_key = document.getElementById('input-load-public')
const loadButton = document.getElementById('button-load-load')
const errorText = document.getElementById('text-load-error')
const warningText = document.getElementById('text-load-warning')
const successText = document.getElementById('text-load-success')

loadButton.addEventListener('click', function (event) {

    chave = public_key.value;
    document.getElementById("text-load-success").innerHTML = "Chave carregada ...";

});
