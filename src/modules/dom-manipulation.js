import { projects } from "./project-model"

const projectForm = document.getElementsByClassName( "add__project" )[0];
const taskForm     = document.getElementsByClassName( "task__form" )[0];

const revealProjectForm = ( event ) => {
  projectForm.style.display = 'block';
};

const removeProjectForm = ( event ) => {
  const projectInput = document.getElementsByClassName( "project__input" )[0];

  clearInput( projectInput );

  projectForm.style.display = '';
};

const revealTaskForm = ( event ) => {
  taskForm.style.display = 'flex';
};

const removeTaskForm = ( event ) => {
  event.preventDefault();

  const form = [ ...event.target.form ];

  form.forEach( formElement => {
    clearInput( formElement );
  });

  taskForm.style.display = '';
};

const clearInput = ( input ) => {
  input.value = '';
};

const updateProjectsList = ( projects ) => {
  const projectsTitle = document.getElementsByClassName( "projects__title" )[0];
  const projectNodes  = [...document.getElementsByClassName( "project__name" )];

  projectNodes.forEach( node => node.remove() );

  projects.forEach( project => {
    const projectNode = document.createElement( "h3" );

    projectNode.classList.add( "project__name" );

    projectNode.textContent = project.name;

    projectsTitle.after( projectNode );
  });
};

const markProjectAsSelected = ( projects ) => {
  const selectedProject = projects.find( project => project.isSelected );
  const projectNodes    = [...document.getElementsByClassName( "project__name" )];
  const selectedClass   = "selected__project";

  projectNodes.forEach( node => {
    if ( node.textContent === selectedProject.name ) {
      node.classList.add( selectedClass );
    } else {
      node.classList.remove( selectedClass );
    }
  });
};

export {
  revealProjectForm,
  removeProjectForm,
  revealTaskForm,
  removeTaskForm,
  clearInput,
  updateProjectsList,
  markProjectAsSelected,
};
