import {
  createTask,
  deleteTask,
  getCorrespondingTasks,
  getTask,
  orderTasks,
  tasks,
  updateCheckedStatus,
  updateTask,
} from "./task-model";
import MicroModal from "micromodal";
import * as pageInteraction from "./dom-manipulation";

const handleCheckBoxClick = ( event ) => {
  const taskId = parseInt( event.target.parentNode.dataset.taskId );

  updateCheckedStatus( taskId );
  pageInteraction.displayTasks();
};

const handleEditButtonClick = ( event ) => {
  const taskNode = event.target.parentNode;
  const taskId = parseInt( taskNode.dataset.taskId );

  const task = getTask( taskId );

  pageInteraction.displayEditTaskForm( taskNode, task );

};

const handleEditTask = ( event ) => {
  const form = event.target.form;
  const rawValues = getFormValues( form );

  const targetedTaskId = parseInt( event.target.form.parentNode.dataset.taskId );

  if ( ! isTitleTaskValid( rawValues.title ) ) {
    alert( "Please enter a title that is longer than 3 characters" );
    document.getElementById( "edit-title" ).focus();

    return;
  } else if ( ! passesBasicValidation( rawValues ) ) {
    alert( "Please make sure not to use special characters" );

    return;
  }

  updateTask( rawValues, targetedTaskId );
  pageInteraction.deleteEditTaskForm( form );
  pageInteraction.displayTasks();
};

const handleTaskInteraction = ( event ) => {
  if ( event.target.classList.contains( "button__add-task" ) ) {
    handleAddTaskClick( event );
  }
  if ( event.target.classList.contains( "button__close-task-form" ) ) {
    pageInteraction.removeTaskForm( event );
  }
  if ( event.target.classList.contains( "reveal__task-inputs" ) ) {
    pageInteraction.revealTaskForm( event );
  }
  if (
    event.target.classList.contains( "task__item" ) ||
    event.target.classList.contains( "task__title" )
  ) {
    pageInteraction.revealTaskFields( event );
  }
  if ( event.target.classList.contains( "task__checkbox" ) ) {
    handleCheckBoxClick( event );
  }
  if ( event.target.classList.contains( "task__edit" ) ) {
    handleEditButtonClick( event );
  }
  if ( event.target.classList.contains( "edit__button-confirm" ) ) {
    event.preventDefault();

    handleEditTask( event );
  }
  if ( event.target.classList.contains( "task__delete" ) ) {
    handleDeleteButtonClick( event );
  }
};

const handleAddTaskClick = ( event ) => {
  event.preventDefault();

  const rawValues = getFormValues( event.target.form );

  if ( ! isTitleTaskValid( rawValues.title ) ) {
    alert( "Please enter a title that is longer than 3 characters" );
    document.getElementById( "task-title" ).focus();

    return;
  } else if ( ! passesBasicValidation( rawValues ) ) {
    alert( "Please make sure not to use special characters" );

    return;
  }

  createTask( rawValues );
  pageInteraction.removeTaskForm( event );
  pageInteraction.displayTasks();
};

const handleDeleteButtonClick = ( event ) => {
  const modalId = "del-task-modal";
  console.log( event );
  MicroModal.show( modalId, { awaitCloseAnimation: true } );

  const taskNode = event.target.parentNode;
  const confirmDelete = document.getElementsByClassName( "task__modal-del" )[0];

  confirmDelete.onclick = handleDeletingTask.bind( null, taskNode, modalId );
};

const handleDeletingTask = ( taskNode, modalId, event ) => {
  const deleteId = parseInt( taskNode.dataset.taskId );

  deleteTask( deleteId );
  // TODO maybe I'll have to toggle selected on another project after deletion

  pageInteraction.displayTasks( tasks );
  pageInteraction.closeModal( modalId );
};

const getFormValues = ( form ) => {

  const formInputs = [...form.elements].filter( element => element.tagName !== 'BUTTON' );

  const taskStatus = formInputs.find( input => input.name === 'status' );
  taskStatus.value = taskStatus.checked ? true : false;

  const valuesObject = formInputs.reduce( ( obj, field ) => {
    if ( field.name === 'project' || field.name === 'priority' ) {
      obj[field.name] = parseInt( field.value );
    } else {
      obj[field.name] = field.value;
    }

    return obj;
  }, {});

  return valuesObject;
}

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

    // ToString because num values don't have a match function
    return value.toString().match( acceptedChars );
  });

    return isRegexMatching;
}

const updateLocalStorageTasks = ( tasks ) => {
  localStorage.setItem( 'tasks', JSON.stringify( tasks ) );
};

export {
  getCorrespondingTasks,
  handleTaskInteraction,
  orderTasks,
  tasks,
  updateLocalStorageTasks
};
