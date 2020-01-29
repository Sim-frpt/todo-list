import { createProject, projects } from "./project-model";
import { tasks } from "./task-model";
import * as pageInteraction from "./dom-manipulation";

const handleProjectInteraction = ( event ) => {
  if ( event.target.classList.contains( "project__name" ) ) {
    handleProjectNameFocus( event );
    return;
  }
  if ( event.target.classList.contains( "rename__project") ) {
    handleRenamingProject( event );
    return;
  }
  if ( event.target.classList.contains( "delete__project" ) ) {
    handleDeletingProject( event );
    return;
  }
  if ( event.target.classList.contains( "reveal__project-input" ) ) {
    pageInteraction.revealProjectForm( event );
  }
  if ( event.target.classList.contains( "button__add-project" ) ){
    handleAddingProject( event );
  }
  if ( event.target.classList.contains( "button__close-project" ) ){
    pageInteraction.removeProjectForm( event );
  }

};

const handleAddingProject = ( event ) => {
  const input = document.getElementsByClassName( "project__input" )[0];

  if ( ! isInputValid( input ) || isNameAlreadyTaken( input.value ) ) {
    input.focus();

    return;
  }

  createProject( input.value );
  pageInteraction.removeProjectForm( event );
  pageInteraction.updateProjectsList( projects );
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
  const projectName = event.target.textContent.toLowerCase();

  projects.forEach( project => {
    if ( project.name === projectName && ! project.isSelected ) {
      project.toggleSelected();
    }

    if ( project.isSelected && project.name !== projectName ) {
      project.toggleSelected();
    }
  });

  pageInteraction.markProjectAsSelected( projects );
  pageInteraction.updateTasksList( tasks );
};

const handleRenamingProject = ( event ) => {
  // TODO finish this function

  const focusedProject = event.target.previousElementSibling;
  const projectName = focusedProject.textContent.toLowerCase();

  const projectInput = document.createElement( 'input' );
  projectInput.setAttribute( 'type', "text" );
  projectInput.setAttribute( 'id', "project-rename-input" );
  projectInput.value = focusedProject.textContent;
  focusedProject.replaceWith( projectInput );
  projectInput.focus();
  //pageInteraction.addControls( focusedProject );

}

export {
  handleProjectInteraction,
  handleProjectNameFocus,
  projects,
};
