const taskFactory = ( {
  id = null,
  title,
  description = '',
  deadline = '',
  priority = '',
  notes = '',
  project = '',
  status = false,
}) => {
  const self = {
    id,
    title,
    description,
    deadline,
    priority,
    notes,
    project,
    status,
    toggleStatus() {
      self.status = ! self.status;
    },
  };

  return self;
};

export { taskFactory };
