const taskFactory = ( {
  title,
  description,
  deadline,
  priority,
  notes,
  project,
  checked = false,
}) => ({
  title,
  description,
  deadline,
  priority,
  notes,
  project,
  checked,
});

export { taskFactory };
