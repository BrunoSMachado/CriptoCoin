const electron = require('electron')
const remote = electron.remote
const connection = require('./connection.js')
const BrowserWindow = remote.BrowserWindow
const path = require('path')
const url = require('url')

// the main window
let window = remote.getCurrentWindow()

/* ****************** */
/* TITLEBAR'S BUTTONS */
/* ****************** */

const minimizeButton = document.getElementById('titlebar-button-minimize')
const maximizeButton = document.getElementById('titlebar-button-maximize')
const restoreButton = document.getElementById('titlebar-button-restore')
const closeButton = document.getElementById('titlebar-button-close')
const settingsButton = document.getElementById('titlebar-button-settings')
const aboutButton = document.getElementById('titlebar-button-about')
const helpButton = document.getElementById('titlebar-button-help')

// hide restore or maximize button depending on wether the window is already maximized
if(window.isMaximized()) {
    maximizeButton.style.display = 'none'
} else {
    restoreButton.style.display = 'none'
}

// hide restore or maximize whenever the window gets maximized or exits the maximized state
window.on('maximize', function(event) {
    // hides maximize, shows restore
    maximizeButton.style.display = 'none'
    restoreButton.style.display = ''
})

window.on('unmaximize', function(event) {
    // hides restore, shows maximize
    restoreButton.style.display = 'none'
    maximizeButton.style.display = ''
})

// assign titlebar's buttons their respective functions
minimizeButton.addEventListener('click', function(event) {
    window.minimize()
})

maximizeButton.addEventListener('click', function(event) {
    window.maximize()
})

restoreButton.addEventListener('click', function(event) {
    window.restore()
})

closeButton.addEventListener('click', function(event) {
    window.close()
})

/* ****************** */
/*      SYNC TEXT     */
/* ****************** */
const syncDiv = document.getElementById('navbar-div-sync')
const syncText = document.getElementById('navbar-text-sync')
const syncCountText = document.getElementById('navbar-text-sync-count')
const syncSlash = document.getElementById('navbar-text-sync-slash')
const syncKnownText= document.getElementById('navbar-text-sync-known')



/* ****************** */
/*      SECTIONS      */
/* ****************** */

// function which changes the current section
function changeSection (sectionId) {
    // hide the current section that is being shown
    const sections = document.querySelectorAll('.is-shown')
    Array.prototype.forEach.call(sections, function (section) {
        section.classList.remove('is-shown')
    })

    // Show the section associated with the button
    let section = document.getElementById(sectionId)
    section.classList.add('is-shown')
}

const links = document.querySelectorAll('link[rel="import"]')

// Scan every import and add the html to the DOM, they are hidden
// but they will be shown upon clicking one of the navbar's buttons
Array.prototype.forEach.call(links, function (link) {
  let template = link.import.getElementsByTagName("template")[0];
  let clone = document.importNode(template.content, true)
  document.querySelector('#main-div').appendChild(clone)
})

// By default, open the overview tab
document.getElementById('section-overview').classList.add('is-shown')
// Assigns the buttons that change sections their respective functions
const sectionButtons = document.querySelectorAll('[data-section]')
const navbarButtons = document.querySelectorAll('.navbar-button')

Array.prototype.forEach.call(sectionButtons, function (button) {
    button.addEventListener('click', function(event) {
        changeSection(button.getAttribute('data-section'))
    })
})
