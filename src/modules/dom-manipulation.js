import MicroModal from "micromodal";
import { getSelectedProject, projects } from "./project-controller";
import { getCorrespondingTasks } from "./task-controller";

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
    projectNode.setAttribute( "data-project-id", project.id );

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

const displayTasks = () => {
  const tasksContainer      = document.getElementsByClassName( "tasks__container" )[0];
  const selectedProject     = getSelectedProject();
  const tasksList           = [...document.getElementsByClassName( "task__item" )];
  const addTaskButton       = document.getElementsByClassName( "reveal__task-inputs" )[0];

  tasksList.forEach( node => node.remove() );

  if ( ! selectedProject ) {
    return;
  }

  const projectRelatedTasks = getCorrespondingTasks( selectedProject );

  projectRelatedTasks.forEach( task => {
    const taskNode  = document.createElement( 'div' );
    taskNode.classList.add( "task__item" );
    taskNode.setAttribute( "data-task-id", task.id );

    const checkBox = document.createElement( 'input' );
    checkBox.type = 'checkbox';
    checkBox.classList.add( "task__checkbox" );

    const taskTitle = document.createElement( 'p' );
    taskTitle.classList.add( "task__title" );
    taskTitle.textContent = getUpperCaseString( task.title );

    const taskDate  = document.createElement( 'span' );
    taskDate.classList.add( "task__date" );
    taskDate.textContent = task.deadline;

    const taskDescription = document.createElement( 'p' );
    taskDescription.classList.add( "task__description", "task__hidden" );
    taskDescription.textContent = task.description;

    const taskNotes = document.createElement( 'p' );
    taskNotes.classList.add( "task__notes", "task__hidden" );
    taskNotes.textContent = task.notes;

    const editButton = document.createElement( 'button' );
    editButton.classList.add( "button__detail", "task__edit", "task__hidden" );
    editButton.textContent = "Edit";

    const deleteButton = document.createElement( 'button' );
    deleteButton.classList.add( "button__detail", "task__delete", "task__hidden" );
    deleteButton.textContent = "Delete";

    taskNode.append(
      checkBox,
      taskTitle,
      taskDate,
      taskDescription,
      taskNotes,
      editButton,
      deleteButton,
    );

    tasksContainer.insertBefore( taskNode, addTaskButton );
  });
}

const getUpperCaseString = ( string ) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const markProjectAsSelected = () => {
  const selectedProject = getSelectedProject();
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

const revealTaskFields = ( event ) => {
  let taskNode;

  if ( event.target.classList.contains( "task__title" ) ) {
    taskNode = event.target.parentNode;
  } else {
    taskNode = event.target;
  }

  const taskElements = [...taskNode.children];
  const targetedClasses = [ "task__description", "task__notes", "task__edit", "task__delete"];

  taskElements.forEach( element => {
    if ( targetedClasses.some(
      targetedClass => [...element.classList].includes( targetedClass ) )
    ) {
      element.classList.toggle( "task__hidden" );
    }
  });
};

export {
  clearInput,
  closeModal,
  displayProjects,
  displayTasks,
  markProjectAsSelected,
  removeProjectForm,
  removeTaskForm,
  revealProjectForm,
  revealTaskForm,
  revealTaskFields,
  toggleRenameControls,
};
