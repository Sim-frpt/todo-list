import MicroModal from "micromodal";
import { projects } from "./project-controller"
import { tasks } from "./task-controller"

const projectForm = document.getElementsByClassName( "add__project" )[0];
const taskForm     = document.getElementsByClassName( "task__form" )[0];

const closeModal = () => {
  MicroModal.close( "del-project-modal" );
};

const toggleRenameControls = ( okButton, cancelButton ) => {
  if ( okButton.style.display === '' ) {
    okButton.style.display = "inline";
    cancelButton.style.display = "inline";
  } else {
    okButton.style.display = "";
    cancelButton.style.display = "";
  }
};

const revealProjectForm = () => {
  projectForm.style.display = 'block';
};

const removeProjectForm = () => {
  const projectInput = document.getElementsByClassName( "project__input" )[0];

  clearInput( projectInput );

  projectForm.style.display = '';
};

const revealTaskForm = () => {
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

const displayProjects = ( projects ) => {
  const projectsContainer = document.getElementsByClassName( "project__container" )[0];
  const addProjectButton  = document.getElementsByClassName( "reveal__project-input")[0];
  const projectNodes      = [...document.getElementsByClassName( "project__wrapper" )];

  const createProjectNode = ( project ) => {
    const projectNode = document.createElement( 'div' );
    projectNode.classList.add( "project__wrapper" );
    projectNode.setAttribute( "data-project-id", `${project.id}` );

    const projectTitle = document.createElement( "h3" );
    projectTitle.classList.add( "project__name" );
    projectTitle.textContent = getUpperCaseString( project.name );

    const renameButton = document.createElement( 'button' );
    renameButton.classList.add( "button__detail", "rename__project" );
    renameButton.textContent = "Rename";

    const okButton = document.createElement( 'button' );
    okButton.classList.add( "rename__button-ok" );
    okButton.innerHTML = "<i class='fas fa-check'></i>";

    const cancelButton = document.createElement( 'button' );
    cancelButton.classList.add( "rename__button-cancel" );
    cancelButton.innerHTML = "<i class='fas fa-times'></i>";

    const deleteButton = document.createElement( 'button' );
    deleteButton.classList.add( "button__detail", "delete__project" );
    deleteButton.setAttribute( "data-del-project-modal", "del-project-modal" );
    deleteButton.textContent = "Delete";

    projectNode.append( projectTitle, okButton, cancelButton, renameButton, deleteButton );

    projectsContainer.insertBefore( projectNode, addProjectButton );
  };

  projectNodes.forEach( node => node.remove() );
  projects.forEach( project => createProjectNode( project ) );
};

const displayTasks = ( tasks ) => {
  const tasksContainer      = document.getElementsByClassName( "tasks__container" )[0];
  const selectedProjectNode = document.getElementsByClassName( "selected__project" )[0];
  const selectedProjectId   = parseInt( selectedProjectNode.dataset.projectId );
  const selectedProject     = projects.find( project => project.id === selectedProjectId );
  const tasksList           = [...document.getElementsByClassName( "task__item" )];
  const addTaskButton       = document.getElementsByClassName( "reveal__task-inputs" )[0];

  tasksList.forEach( node => node.remove() );

  if ( ! selectedProject ) {
    return;
  }

  tasks.forEach( task => {
    if ( task.project !== selectedProject.name ) {
      return;
    }

    const taskNode  = document.createElement( 'div' );
    const taskTitle = document.createElement( 'p' );
    const taskDate  = document.createElement( 'span' );

    taskNode.classList.add( "task__item" );
    taskTitle.classList.add( "task__title" );
    taskDate.classList.add( "task__date" );

    taskTitle.textContent = getUpperCaseString( task.title );
    taskDate.textContent = task.deadline;

    taskNode.append( taskTitle, taskDate );

    tasksContainer.insertBefore( taskNode, addTaskButton );
  });
}

const getUpperCaseString = ( string ) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const markProjectAsSelected = ( projects ) => {
  const selectedProject = projects.find( project => project.isSelected );
  const projectNodes    = [...document.getElementsByClassName( "project__wrapper" )];
  const selectedClass   = "selected__project";

  projectNodes.forEach( node => {
    let projectID = parseInt( node.dataset.projectId );

    if ( projectID === selectedProject.id ) {
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
    option.textContent = getUpperCaseString( project.name );

    if ( project.isSelected ) {
      option.selected = 'selected';
    }

    projectSelectInput.appendChild( option );
  });
};

export {
  closeModal,
  revealProjectForm,
  removeProjectForm,
  revealTaskForm,
  removeTaskForm,
  clearInput,
  displayProjects,
  displayTasks,
  markProjectAsSelected,
  toggleRenameControls,
};
