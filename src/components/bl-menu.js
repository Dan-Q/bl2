Slim.tag(
  'bl-menu',
  ``,
  class BlMenu extends Slim {
    onAdded(){
      if(this.attributes.direction && (this.attributes.direction.value == 'column')){
        this.style.display = 'flex';
        this.style.flexDirection = 'column';
        this.style.justifyContent = 'space-evenly';
      }
    }

    render(){
    }
  }
);
