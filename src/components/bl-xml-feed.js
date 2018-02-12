Slim.tag(
  'bl-xml-feed',
  ``,
  class BlXmlFeed extends Slim {
    onAdded(){
    }

    render(){
    }
  }
);

let blXmlFeedCounter = 0;

document.addEventListener('DOMContentLoaded', ()=>{
  document.querySelectorAll('bl-xml-feed').forEach(component=>{
    console.log(`${new Date()}: xml feed triggered`);
    const el = document.createElement('div');
    const id = `bl-xml-feed-${blXmlFeedCounter++}`;
    el.id = id;
    el.classList.add('bl-xml-feed');
    el.dataset.noResults = component.innerHTML;
    el.dataset.xml = component.attributes.xml.value;
    el.dataset.xslt = component.attributes.xslt.value;
    el.dataset.refresh = (component.attributes.refresh && component.attributes.refresh.value) || '3600000'; // default = 1 hour
    el.dataset.refreshIntervalTimer = null;
    component.replaceWith(el);
    console.log(`${new Date()}: xml feed added`);
    fetch(el.dataset.xslt).then(r=>r.text()).then(xslt=>{
      el.dataset.xslt = xslt;
      el.blXmlFeedUpdate = ()=>{
        fetch(el.dataset.xml).then(r=>r.text()).then(rss=>{
          const el = document.querySelector(`#${id}`);
          console.log(`${new Date()}: xml feed inner`);
          const xsltProcessor = new XSLTProcessor();
          const parser = new DOMParser();
          const xsltStylesheet = parser.parseFromString(el.dataset.xslt, 'text/xml')
          const rssFeed = parser.parseFromString(rss, "text/xml");
          xsltProcessor.importStylesheet(xsltStylesheet);
          const fragment = xsltProcessor.transformToFragment(rssFeed, document);
          while (el.firstChild) el.removeChild(el.firstChild);
          el.appendChild(fragment);
          if(el.innerText == '') el.innerHTML = el.dataset.noResults;
        });
      };
      setInterval(el.blXmlFeedUpdate, parseInt(el.dataset.refresh));
      el.blXmlFeedUpdate();
    });
  });
});