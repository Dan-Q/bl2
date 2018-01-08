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
    if((statusLine[0] || '') != ''){
      document.querySelector(`bl-template bl-container#${statusLine[0]}`).attributes.showing.value = statusLine[1];
    }
  });
}
function navigate(id, target){
  const container = document.querySelector(`bl-template bl-container#${target}`);
  if(!container) return;
  container.loadContent(id);
  saveStatus();
  markLinksToCurrentPage();
}

// Tags links to the _current_ page so that they can be styled differently (e.g. in menus)
function markLinksToCurrentPage(){
  const currentPages = [...document.querySelectorAll('bl-template .renderable')].map(container=>container.attributes.showing.value);
  const links = [...document.querySelectorAll('a')];
  links.forEach(a=>a.classList.remove('current'));
  links.filter(a=>currentPages.includes(a.attributes.href.value)).forEach(a=>a.classList.add('current'));
}

// Link handling
function documentClickHandler(e){
  const a = e.path.find(el=>el.tagName=='A');
  if(!a) return false;
  e.preventDefault();
  if((a.tagName == 'A') && a.attributes.href){
    if(!!a.attributes.href.value.match(/\.(gif|png|jpe?g|webp)$/i)){
      // link to an image: pop up in an overlay
      debugger;
    } else if(a.attributes.target){
      // link including a target - probably an internal (content) link
      navigate(a.attributes.href.value, a.attributes.target.value);
    }
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
  markLinksToCurrentPage()
});
