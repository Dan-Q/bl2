Slim.tag(
  'bl-template',
  ``,
  class BlTemplate extends Slim {
    onAdded(){
      this.style.width = (this.attributes.width && this.attributes.width.value) || '100%';
      this.style.height = (this.attributes.height && this.attributes.height.value) || '100%';
    }

    render(){
    }
  }
);
