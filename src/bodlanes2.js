"use strict"; // ES6

import {Slim} from 'slim-js'
import {tag, template} from 'slim-js/Decorators'

// Load all components
function requireAll(r) { r.keys().forEach(r); }
requireAll(require.context('./components/', true, /\.js$/));

// Save/load/set current container content status (to the hash)
function saveStatus(){
  const containers = [...document.querySelectorAll('bl-template .renderable')];
  const status = containers.map((el)=>`${el.id}=${el.attributes.showing.value}`).join('&');
  window.location.hash = status;
}
function loadStatus(){
  const status = window.location.hash.replace(/^#/, '').split('&').map((i)=>i.split('=',2));
  status.forEach((statusLine)=>{
    //debugger;
    document.querySelector(`bl-template bl-container#${statusLine[0]}`).attributes.showing.value = statusLine[1];
  });
}
function navigate(id, target){
  const container = document.querySelector(`bl-template bl-container#${target}`);
  if(!container) return;
  container.loadContent(id);
  saveStatus();
}

// Link handling
function documentClickHandler(e){
  const el = e.target;
  if((el.tagName == 'A') && el.attributes.href && el.attributes.target){
    e.preventDefault();
    navigate(el.attributes.href.value, el.attributes.target.value);
  }
}
document.addEventListener('touchend', documentClickHandler);
document.addEventListener('click', documentClickHandler);

// Mark page as loaded
window.addEventListener('load', (e)=>{
  loadStatus();
  document.body.classList.add('loaded');
  document.querySelectorAll('bl-template .renderable').forEach((e)=>e.render());
  saveStatus();
});
