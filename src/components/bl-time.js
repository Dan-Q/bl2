Slim.tag(
  'bl-time',
  ``,
  class BlTime extends Slim {
    onAdded(){
    }

    render(){
    }
  }
);

document.addEventListener('DOMContentLoaded', ()=>{
  document.querySelectorAll('bl-time').forEach((el)=>{
    el.dataset.format = (el.attributes.format && el.attributes.format.value) || 'HH:mm';
    el.dataset.refresh = (el.attributes.refresh && el.attributes.refresh.value) || '1000';

    const blTimeTick = ()=>{
      console.log(`${new Date()}: blTimeTick`);
      el.innerText = moment().format(el.dataset.format);
    };
    setInterval(blTimeTick, parseInt(el.dataset.refresh));
    blTimeTick();    
  });
});
