const fs = require('fs')
const remote = require('electron').remote
const dialog = remote.dialog

const loadButton = document.getElementById('button-load-load')
const errorText = document.getElementById('text-load-error')
const warningText = document.getElementById('text-load-warning')
const successText = document.getElementById('text-load-success')
const browseButton1 = document.getElementById('button-create-browse1')
const browseButton2 = document.getElementById('button-create-browse2')
const createButton = document.getElementById('button-create-create')
const folderPathPub = document.getElementById('input-create-path1')
const folderPathPriv = document.getElementById('input-create-path2')


browseButton1.addEventListener('click', function(event) {
    dialog.showOpenDialog({properties: ['openFile']}, function (files) {
        if (files) {
            folderPathPub.value = files[0]
        }
    })
})

browseButton2.addEventListener('click', function(event) {
    dialog.showOpenDialog({properties: ['openFile']}, function (files) {
        if (files) {
            folderPathPriv.value = files[0]
        }
    })
})

loadButton.addEventListener('click', function (event) {


    let pub = fs.readFileSync(folderPathPub.value,'utf8');
    let priv = fs.readFileSync(folderPathPriv.value,'utf8');


    fs.writeFileSync('chave.pub', pub,'utf8');
    fs.writeFileSync('chave.priv', priv,'utf8');

    document.getElementById("text-load-success").innerHTML = "Chave carregada ...";

});
