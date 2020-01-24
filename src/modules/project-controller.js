import { createProject, projects } from "./project-model";
import { clearInput } from "./dom-manipulation";

const handleProjectRequest = ( event ) => {

  const input = document.getElementsByClassName( "project__input" )[0];

  if ( ! validateInput( input ) || nameIsAlreadyTaken( input.value ) ) {
    input.focus();

    return;
  }

  createProject( input.value );
  clearInput( input );
};

const validateInput = ( input ) => {

  if ( ! input.validity.valid ) {
    alert( "Please enter a project name, and make sure it's between 3 and 25 characters " );

    return false;
  }

  return true;
};

const nameIsAlreadyTaken = input => {
  const isnameTaken = projects.find( project => project.name === input );

  if ( isnameTaken ) {
    alert( "This project name is already taken, please choose another one" );
  }

  return isnameTaken;
};

export { handleProjectRequest };
