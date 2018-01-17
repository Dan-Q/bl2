"use strict"; // ES6

import {Slim} from 'slim-js'
import {tag, template} from 'slim-js/Decorators'

// Load all components
function requireAll(r) { r.keys().forEach(r); }
requireAll(require.context('./components/', true, /\.js$/));

// Set up the page
function initialize(){
  // Add <bl-overlay />
  if(!document.querySelector('bl-overlay')) document.body.appendChild(document.createElement('bl-overlay'));
}

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
  // console.log(`BodLanes2 - Navigate: #${id} > ${target}`);
  const container = document.querySelector(`bl-template bl-container#${target}`);
  if(!container) return;
  container.loadContent(id);
  saveStatus();
  markLinksToCurrentPage();
}

// Tags links to the _current_ page so that they can be styled differently (e.g. in menus)
function markLinksToCurrentPage(){
  const currentPages = [...document.querySelectorAll('bl-template .renderable')].map(container=>container.attributes.showing.value);
  const currentPageIdentities = currentPages.filter(id=>id != '').map(id=>{
    const block = document.querySelector(`bl-content #${id}`);
    if(!block) return '';
    return(block.attributes.identifyas ? block.attributes.identifyas.value : id);
  });
  const links = [...document.querySelectorAll('a')];
  links.forEach(a=>a.classList.remove('current'));
  links.filter(a=>currentPageIdentities.includes(a.attributes.href.value)).forEach(a=>a.classList.add('current'));
}

// Shows an image overlay
function showOverlayImage(url){
  const overlay = document.querySelector('bl-overlay');
  overlay.innerHTML = `
    <img src="${url}">
    <bl-floater top="15px" right="15px">
      <a href="#close-overlay" class="button">&times;</a>
    </bl-floater>
  `;
  overlay.style.display = 'block';
}

// Shows an zoomable image overlay
function showZoomableOverlayImage(url){
  showOverlayImage(url);
  const overlay = document.querySelector('bl-overlay');
  const img = overlay.querySelector('img');
  let viewer = new Viewer(img, {
    inline: true,
    button: false,
    toolbar: false,
    title: false,
    navbar: false,
    tooltip: false,
    container: 'bl-overlay',
    minZoomRatio: 1
  });
  img.style.display = 'none';
}

// Shows a video overlay
function showOverlayVideo(url){
  const overlay = document.querySelector('bl-overlay');
  overlay.innerHTML = `
    <video src="${url}" autoplay></video>
    <bl-floater top="15px" right="15px">
      <a href="#close-overlay" class="button">&times;</a>
    </bl-floater>
  `;
  const video = overlay.querySelector('video');
  video.addEventListener('ended', hideOverlay); // hide video when complete
  overlay.style.display = 'block';
}

// Hides the overlay
function hideOverlay(){
  const overlay = document.querySelector('bl-overlay');
  overlay.innerHTML = '';
  overlay.style.display = 'none';
}

// Link handling
function documentClickHandler(e){
  const a = e.path.find(el=>el.tagName=='A');
  if(!a) return false;
  e.preventDefault();
  if((a.tagName == 'A')){
    if(a.attributes.action){
      // if hyperlink specifies an action to perform, run that JS first!
      eval(a.attributes.action.value);
    }
    if(a.attributes.href){
      if(a.attributes.href.value == '#close-overlay'){
        // close the overlay
        hideOverlay();
      } else if(!!a.attributes.href.value.match(/\.(ogv|avi|flv|wmv|mp4|mov|asf|qt|swf|mpg)$/i)){
        // link to a video: pop up in an overlay
        showOverlayVideo(a.attributes.href.value);
      } else if(!!a.attributes.href.value.match(/\.(gif|png|jpe?g|webp)$/i)){
        // link to an image: pop up in an overlay
        const aClasses = [...a.classList];
        if(aClasses.indexOf('zoomable') > -1){
          showZoomableOverlayImage(a.attributes.href.value);
        } else {
          showOverlayImage(a.attributes.href.value);
        }
      } else if(a.attributes.target){
        // link including a target - probably an internal (content) link
        navigate(a.attributes.href.value, a.attributes.target.value);
      }
    }
  }
}
document.addEventListener('touchend', documentClickHandler);
document.addEventListener('click', documentClickHandler);

// Mark page as loaded
window.addEventListener('load', (e)=>{
  initialize();
  loadStatus();
  document.body.classList.add('loaded');
  document.querySelectorAll('bl-template .renderable').forEach((e)=>e.render());
  saveStatus();
  markLinksToCurrentPage();
});
