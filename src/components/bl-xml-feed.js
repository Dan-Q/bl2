Slim.tag(
  'bl-xml-feed',
  ``,
  class BlXmlFeed extends Slim {
    onAdded(){
      console.log(`${new Date()}: xml feed triggered`);
      if(this.dataset.alreadyAdded) return;
      this.dataset.noResults = this.innerHTML;
      this.dataset.xml = this.attributes.xml.value;
      this.dataset.refresh = (this.attributes.refresh && this.attributes.refresh.value) || '3600000'; // default = 1 hour
      console.log(`${new Date()}: xml feed added`);
      this.dataset.refreshIntervalTimer = null;
      this.dataset.xslt = ''; // initially blank
      fetch(this.attributes.xslt.value).then(r=>{r.text().then(xslt=>{
        this.dataset.xslt = xslt;
        const blXmlFeedUpdate = ()=>{
          fetch(this.dataset.xml).then(r=>{r.text().then(rss=>{
            console.log(`${new Date()}: blXmlFeedUpdate`);
            const xsltProcessor = new XSLTProcessor();
            const parser = new DOMParser();
            const xsltStylesheet = parser.parseFromString(this.dataset.xslt, 'text/xml')
            const rssFeed = parser.parseFromString(rss, "text/xml");
            xsltProcessor.importStylesheet(xsltStylesheet);
            const fragment = xsltProcessor.transformToFragment(rssFeed, document);
            while (this.firstChild) this.removeChild(this.firstChild);
            console.log(fragment);
            this.appendChild(fragment);
          });});
        };
        //setInterval(blXmlFeedUpdate, parseInt(this.dataset.refresh));
        blXmlFeedUpdate();
        this.dataset.alreadyAdded = true;
      })});
    }

    render(){
    }
  }
);
