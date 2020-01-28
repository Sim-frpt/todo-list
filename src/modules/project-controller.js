import { createProject, projects } from "./project-model";
import { tasks } from "./task-model";
import { removeProjectForm, updateProjectsList, updateTasksList, markProjectAsSelected } from "./dom-manipulation";

const handleProjectRequest = ( event ) => {

  const input = document.getElementsByClassName( "project__input" )[0];

  if ( ! isInputValid( input ) || isNameAlreadyTaken( input.value ) ) {
    input.focus();

    return;
  }

  createProject( input.value );
  removeProjectForm();
  updateProjectsList( projects );
  markProjectAsSelected( projects );
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
  if ( ! event.target.classList.contains( "project__name" )) {
    return;
  }

  const projectName = event.target.textContent.toLowerCase();

  projects.forEach( project => {
    if ( project.name === projectName && ! project.isSelected ) {
      project.toggleSelected();
    }

    if ( project.isSelected && project.name !== projectName ) {
      project.toggleSelected();
    }
  });

  markProjectAsSelected( projects );
  updateTasksList( tasks );
};

export { handleProjectRequest, handleProjectNameFocus, projects };
