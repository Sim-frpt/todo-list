const projectForm = document.getElementsByClassName( "add__project" )[0];
const taskForm     = document.getElementsByClassName( "task__form" )[0];

const revealProjectForm = ( event ) => {
  projectForm.style.display = 'block';
};

const removeProjectForm = ( event ) => {
  const projectInput = document.getElementsByClassName( "project__input" )[0];

  projectInput.textContent = '';
  projectForm.style.display = '';
};

const revealTaskForm = ( event ) => {
  taskForm.style.display = 'flex';
};

const removeTaskForm = ( event ) => {
  event.preventDefault();

  const form = [ ...event.target.form ];

  form.forEach( formElement => {
    formElement.value = '';
  });

  taskForm.style.display = '';
};

const addProject = ( event ) => {
  console.log( event.target );
};

export {
  revealProjectForm,
  removeProjectForm,
  revealTaskForm,
  removeTaskForm,
  addProject,
};
