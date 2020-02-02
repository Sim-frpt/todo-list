const taskFactory = ( {
  id = null,
  title,
  description = '',
  deadline = '',
  priority = '',
  notes = '',
  project = '',
  checked = false,
}) => ({
  id,
  title,
  description,
  deadline,
  priority,
  notes,
  project,
  checked,
});

export { taskFactory };
