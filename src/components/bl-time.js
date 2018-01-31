Slim.tag(
  'bl-time',
  `<div>ay ay ay</div>`,
  class BlTime extends Slim {
    onAdded(){
      this.dataset.format = (this.attributes.format && this.attributes.format.value) || 'HH:mm';
      this.dataset.refresh = (this.attributes.refresh && this.attributes.refresh.value) || '1000';
    }

    render(){
      setInterval(()=>{
        this.innerText = moment().format(this.dataset.format);
      }, parseInt(this.dataset.refresh));
    }
  }
);
