const childProcess = require('child_process')
const exec = childProcess.exec
const execFile = childProcess.execFile
const spawn = childProcess.spawn
const path = require('path')
const jayson = require('jayson')
const settings = require('electron-settings')
const util = require('util')
const fs = require('fs')


function um(){
  return 1;
}

module.exports{um}
