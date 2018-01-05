Slim.tag(
  'bl-container',
  ``,
  class BlContainer extends Slim {
    loadContent(id){
      this.attributes.showing.value = id;
      this.innerHTML = '';
      let node = document.querySelector(`bl-content #${id}`).cloneNode(true);
      this.appendChild(document.querySelector(`bl-content #${id}`).cloneNode(true));
    }

    onAdded(){
      this.classList.add('renderable');
    }

    render(){
      if(this.attributes.showing) this.loadContent(this.attributes.showing.value);
    }
  }
);
