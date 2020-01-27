const projectFactory = ( name, isSelected = false ) => {
  const tasks = [];

  return {
    name,
    tasks,
    isSelected
  };
};

export { projectFactory };
