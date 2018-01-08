Slim.tag(
  'bl-grid',
  ``,
  class BlGrid extends Slim {
    onAdded(){
      this.style.display = 'grid';
      this.style.height = '100%';
      this.style.width = '100%';
      this.style.gridTemplateRows = (this.attributes.rows && this.attributes.rows.value) || '1fr';
      this.style.gridTemplateColumns = (this.attributes.columns && this.attributes.columns.value) || '1fr';
      this.style.gridGap = (this.attributes.gap && this.attributes.gap.value) || '0';
    }

    render(){
    }
  }
);
