import { projects } from "./project-controller"
import { task } from "./task-controller"

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
  reloadProjectOptions();

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
  const projectsContainer = document.getElementsByClassName( "project__container" )[0];
  const addProjectButton  = document.getElementsByClassName( "reveal__project-input")[0];
  const projectNodes      = [...document.getElementsByClassName( "project__name" )];

  projectNodes.forEach( node => node.remove() );

  projects.forEach( project => {
    const projectNode = document.createElement( "h3" );

    projectNode.classList.add( "project__name" );

    projectNode.textContent = project.name;

    projectsContainer.insertBefore( projectNode, addProjectButton );
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

const reloadProjectOptions = () => {
  const projectSelectInput = document.getElementById( "task-project" );

  projectSelectInput.innerHTML = '';

  projects.forEach( project => {
    let option = document.createElement( 'option' );

    option.value = project.name;
    option.textContent = project.name.charAt(0).toUpperCase() + project.name.slice(1);

    if ( project.isSelected ) {
      option.selected = 'selected';
    }

    projectSelectInput.appendChild( option );
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
