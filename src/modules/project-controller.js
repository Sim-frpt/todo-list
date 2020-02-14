import MicroModal from "micromodal";
import { createProject, deleteProject, renameProject, projects } from "./project-model";
import * as pageInteraction from "./dom-manipulation";
import deleteRelatedTasks from "./task-project-interaction";

const confirmRename = ( event ) => {
  const input = document.getElementById( "project-rename-input" );
  const projectID = parseInt( event.target.parentNode.dataset.projectId );

  if ( ! isInputValid( input ) || isNameAlreadyTaken( input.value.toLowerCase() ) ) {
    input.focus();

    return;
  }

  renameProject( input, projectID );
  pageInteraction.displayProjects();
};

const getSelectedProject = () => {
  return projects.find( project => project.isSelected === true );
};

const handleAddingProject = ( event ) => {
  const input = document.getElementsByClassName( "project__input" )[0];

  if ( ! isInputValid( input ) || isNameAlreadyTaken( input.value.toLowerCase() ) ) {
    input.focus();

    return;
  }

  createProject( input.value.toLowerCase() );

  pageInteraction.removeProjectForm( event );
  pageInteraction.displayProjects();
  pageInteraction.displayTasks();
  pageInteraction.markProjectAsSelected();
};

const handleDeleteButtonClick = ( event ) => {
  const modalId = "del-project-modal";
  MicroModal.show( modalId, { awaitCloseAnimation: true } );

  const projectNode = event.target.parentNode;
  const confirmDelete = document.getElementsByClassName( "project__modal-del" )[0];

  confirmDelete.onclick = handleDeletingProject.bind( null, projectNode, modalId );
};

const handleDeletingProject = ( projectNode, modalId, event ) => {
  const deleteId = parseInt( projectNode.dataset.projectId );

  deleteProject( deleteId );
  deleteRelatedTasks( deleteId );

  // TODO maybe I'll have to toggle selected on another project after deletion

  pageInteraction.displayProjects();
  pageInteraction.displayTasks();

  pageInteraction.closeModal( modalId );
};

const handleProjectFocus = ( event ) => {
  const projectID = parseInt( event.target.parentNode.dataset.projectId );

  projects.forEach( project => {
    if ( project.isSelected && project.id !== projectID ) {
      project.toggleSelected();
    }
    if ( ! project.isSelected && project.id === projectID ) {
      project.toggleSelected();
    }
  });

  pageInteraction.markProjectAsSelected();
  pageInteraction.displayTasks();
};

const handleProjectInteraction = ( event ) => {
  if ( event.target.classList.contains( "button__add-project" ) ) {
    handleAddingProject( event );
  }
  if ( event.target.classList.contains( "button__close-project" ) ) {
    pageInteraction.removeProjectForm( event );
  }
  if ( event.target.classList.contains( "delete__project" ) ) {
    handleDeleteButtonClick( event );
    return;
  }
  if ( event.target.classList.contains( "project__name" ) ) {
    handleProjectFocus( event );
    return;
  }
  if ( event.target.classList.contains( "rename__button-cancel" ) ) {
    pageInteraction.displayProjects();
  }
  if ( event.target.classList.contains( "rename__button-ok" ) ) {
    confirmRename( event );
  }
  if ( event.target.classList.contains( "rename__project") ) {
    handleRenameButtonClick( event );
    return;
  }
  if ( event.target.classList.contains( "reveal__project-input" ) ) {
    pageInteraction.revealProjectForm( event );
  }
};

const handleRenameButtonClick = ( event ) => {
  const parentNode = event.target.parentNode;

  const focusedProject = parentNode.firstChild;
  const confirmButton = parentNode.getElementsByClassName( "rename__button-ok" )[0];
  const cancelButton = parentNode.getElementsByClassName( "rename__button-cancel" )[0];

  const projectInput = document.createElement( 'input' );
  projectInput.setAttribute( 'type', "text" );
  projectInput.setAttribute( 'id', "project-rename-input" );
  projectInput.value = focusedProject.textContent;

  focusedProject.replaceWith( projectInput );
  projectInput.focus();
  pageInteraction.toggleRenameControls( confirmButton, cancelButton );
}

const isInputValid = ( input ) => {

  if ( ! input.validity.valid ) {
    alert( "Please enter a project name, and make sure it's between 3 and 25 characters " );

    return false;
  }

  return true;
};

const isNameAlreadyTaken = input => {
  const isnameTaken = projects.find( project => project.name === input );

  if ( isnameTaken ) {
    alert( "This project name is already taken, please choose another one" );
  }

  return isnameTaken;
};

const updateLocalStorageProjects = ( projects ) => {
  localStorage.setItem( 'projects', JSON.stringify( projects ) );
};

export {
  getSelectedProject,
  handleProjectInteraction,
  handleProjectFocus,
  projects,
  updateLocalStorageProjects,
};
