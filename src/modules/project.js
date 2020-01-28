const projectFactory = ( name, isSelected = false ) => {
  const tasks = [];

  const self = {
    name,
    tasks,
    isSelected,
    toggleSelected() {
      return this.isSelected = ! this.isSelected;
    },
  }

  return self;
};

export { projectFactory };
