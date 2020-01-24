const projectFactory = ( name ) => {
  const tasks = [];

  return {
    name,
    tasks,
  };
};

export { projectFactory };
