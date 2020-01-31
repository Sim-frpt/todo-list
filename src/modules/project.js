const projectFactory = ( name, isSelected = false, id = null ) => {
  const tasks = [];
  let _name  = name;

  const self = {
    id,
    isSelected,
    tasks,
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
