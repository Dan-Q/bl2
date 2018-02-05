Slim.tag(
  'bl-carousel',
  ``,
  class BlCarousel extends Slim {
    onAdded(){
      this.dataset.refresh = (this.attributes.refresh && this.attributes.refresh.value) || '10000';

      const blCarouselRotate = ()=>{
        //this.children
      };
      //setInterval(blCarouselRotate, parseInt(this.dataset.refresh));
      //blCarouselRotate();
    }

    render(){
    }
  }
);
