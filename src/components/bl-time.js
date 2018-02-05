Slim.tag(
  'bl-time',
  ``,
  class BlTime extends Slim {
    onAdded(){
      this.dataset.format = (this.attributes.format && this.attributes.format.value) || 'HH:mm';
      this.dataset.refresh = (this.attributes.refresh && this.attributes.refresh.value) || '1000';

      const blTimeTick = ()=>{
        this.innerText = moment().format(this.dataset.format);
      };
      setInterval(blTimeTick, parseInt(this.dataset.refresh));
      blTimeTick();
    }

    render(){
    }
  }
);
