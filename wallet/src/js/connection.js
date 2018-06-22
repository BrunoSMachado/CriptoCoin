const childProcess = require('child_process')
const exec = childProcess.exec
const execFile = childProcess.execFile
const spawn = childProcess.spawn
const path = require('path')
const jayson = require('jayson')
const settings = require('electron-settings')
const util = require('util')
const fs = require('fs')

const ERROR_WALLETLAUNCH = 'Failed to start walletd. Set the path to walletd properly in the settings tab.'
const ERROR_WALLETSYNC = 'Failed to sync walletd. Make sure you selected a valid wallet file and that the password is correct.'
const ERROR_IMPORTDIR = 'Failed to import file. You must specify a directory!'
const ERROR_IMPORTFILE = 'Failed to generate wallet file. Make sure the file does not already exist and the folder is accessible.'
const ERROR_IMPORTKEYS = 'Unable to create wallet file. Check if both the spend and view keys are correct.'
const ERROR_CREATEDIR = 'Failed to create wallet file. You must specify a directory!'
const ERROR_CREATEFILE = 'Failed to create wallet file. Make sure the file does not already exist and the folder is accessible.'
