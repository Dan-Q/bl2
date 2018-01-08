Slim.tag(
  'bl-floater',
  ``,
  class BlFloater extends Slim {
    onAdded(){
      this.style.display = 'block';
      this.style.position = 'absolute';
      if(this.attributes.top) this.style.top = this.attributes.top.value;
      if(this.attributes.bottom) this.style.bottom = this.attributes.bottom.value;
      if(this.attributes.left) this.style.left = this.attributes.left.value;
      if(this.attributes.right) this.style.right = this.attributes.right.value;
      if(this.attributes.width) this.style.width = this.attributes.width.value;
      if(this.attributes.height) this.style.height = this.attributes.height.value;
    }

    render(){
    }
  }
);
