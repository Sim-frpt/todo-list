import { createProject, renameProject, projects } from "./project-model";
import { tasks } from "./task-model";
import * as pageInteraction from "./dom-manipulation";

const handleProjectInteraction = ( event ) => {
  if ( event.target.classList.contains( "project__name" ) ) {
    handleProjectNameFocus( event );
    return;
  }
  if ( event.target.classList.contains( "rename__project") ) {
    handleRenameButtonClick( event );
    return;
  }
  if ( event.target.classList.contains( "delete__project" ) ) {
    handleDeletingProject( event );
    return;
  }
  if ( event.target.classList.contains( "reveal__project-input" ) ) {
    pageInteraction.revealProjectForm( event );
  }
  if ( event.target.classList.contains( "button__add-project" ) ) {
    handleAddingProject( event );
  }
  if ( event.target.classList.contains( "button__close-project" ) ) {
    pageInteraction.removeProjectForm( event );
  }
  if ( event.target.classList.contains( "rename__button-ok" ) ) {
    handleRenameProject( event );
  }
  if ( event.target.classList.contains( "rename__button-cancel" ) ) {

  }

};

const handleRenameProject = ( event ) => {
  const input = document.getElementById( "project-rename-input" );

  if ( ! isInputValid( input ) || isNameAlreadyTaken( input.value.toLowerCase() ) ) {
    input.focus();

    return;
  }

  renameProject( input );
};

const handleAddingProject = ( event ) => {
  const input = document.getElementsByClassName( "project__input" )[0];

  if ( ! isInputValid( input ) || isNameAlreadyTaken( input.value.toLowerCase() ) ) {
    input.focus();

    return;
  }

  createProject( input.value.toLowerCase() );

  pageInteraction.removeProjectForm( event );
  pageInteraction.displayProjects( projects );
  pageInteraction.markProjectAsSelected( projects );
};

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

const handleProjectNameFocus = ( event ) => {
  const projectID = parseInt( event.target.parentNode.dataset.projectId );

  projects.forEach( project => {
    if ( project.isSelected && project.id !== projectID ) {
      project.toggleSelected();
    }
    if ( ! project.isSelected && project.id === projectID ) {
      project.toggleSelected();
    }
  });

  pageInteraction.markProjectAsSelected( projects );
  pageInteraction.updateTasksList( tasks );
};

const handleRenameButtonClick = ( event ) => {
  // TODO finish this function

  const focusedProject = event.target.previousElementSibling;
  const projectInput = document.createElement( 'input' );

  projectInput.setAttribute( 'type', "text" );
  projectInput.setAttribute( 'id', "project-rename-input" );
  projectInput.setAttribute( "data-project-previous-name", `${focusedProject.textContent.toLowerCase()}` );
  projectInput.value = focusedProject.textContent;

  focusedProject.replaceWith( projectInput );
  projectInput.focus();
  pageInteraction.toggleRenameControls( projectInput );
}

export {
  handleProjectInteraction,
  handleProjectNameFocus,
  projects,
};
