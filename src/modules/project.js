const projectFactory = ( name, isSelected = false, id = null ) => {
  let _name  = name;

  const self = {
    id,
    isSelected,
    get name() {
      return _name;
    },
    set name( name ) {
      return _name = name;
    },
    toggleSelected() {
      return this.isSelected = ! this.isSelected;
    },
  }

  return self;
};

export { projectFactory };
