import { createTask, tasks } from "./task-model";

const handleTaskRequest = ( event ) => {
  event.preventDefault();

  const form = document.getElementsByClassName( "task__form" )[0];
  const formInputs = [...form.elements].filter( element => element.tagName !== 'BUTTON' );

  const rawValues = formInputs.reduce( ( obj, field ) => {
    obj[field.name] = field.value;

    return obj;
  }, {});

  if ( ! isTitleTaskValid( rawValues.title ) ) {
    alert( "Please enter a title that is longer than 3 characters" );
    document.getElementById( "task-title" ).focus();

    return;
  } else if ( ! passesBasicValidation( rawValues ) ) {
    alert( "Please make sure not to use special characters" );

    return;
  }

  createTask( rawValues );
};

const isTitleTaskValid = ( title ) => {
  if ( title.length < 3 ) {
    return false;
  }
  return true;
};

const passesBasicValidation = ( object ) => {
  const acceptedChars =/[A-Za-z0-9\.\,\?\!\/;'":]/g;

  const isRegexMatching = Object.values( object ).every( value => {
    if ( value === '' ) { // Only title is required, don't care if others fields are empty
      return true;
    }

    return value.match( acceptedChars );
  });

    return isRegexMatching;
}

export { handleTaskRequest, tasks };
