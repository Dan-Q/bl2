Slim.tag(
  'bl-container',
  ``,
  class BlContainer extends Slim {
    loadContent(id){
      console.log(`${new Date()}: bl-container#loadContent`);
      this.attributes.showing.value = id;
      this.innerHTML = '';
      if(!id || (id == '')) return;
      let originalNode = document.querySelector(`bl-content #${id}`);
      if(!originalNode) return;
      let newNode = document.querySelector(`bl-content #${id}`).cloneNode(true);
      this.appendChild(newNode);
    }

    runRender(){
      console.log(`${new Date()}: bl-container#runRender`);
      if(this.attributes.showing && (this.attributes.showing.value != '')) this.loadContent(this.attributes.showing.value);
    }

    onAdded(){
      this.classList.add('renderable');
    }

    render(){
    }
  }
);

