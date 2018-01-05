"use strict"; // ES6

import {Slim} from 'slim-js'
import {tag, template} from 'slim-js/Decorators'

// Load all components
function requireAll(r) { r.keys().forEach(r); }
requireAll(require.context('./components/', true, /\.js$/));

// Save/load current container content status (to the hash)
function saveStatus(){

}
function loadStatus(){

}
// Load initial status
loadStatus();

// Mark page as loaded
window.addEventListener('load', (e)=>{
  document.body.classList.add('loaded');
  document.querySelectorAll('bl-template .renderable').forEach((e)=>e.render());
});
