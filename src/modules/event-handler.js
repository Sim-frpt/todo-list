import * as listenerFunctions from "./dom-manipulation";

const revealProjectFormButton = document.getElementsByClassName( "reveal__project-input" )[0];
const hideProjectFormButton = document.getElementsByClassName( "button__close-project" )[0];
const revealTaskFormButton = document.getElementsByClassName( "reveal__task-inputs" )[0];
const hideTaskFormButton = document.getElementsByClassName( "close__task-form" )[0];

const addProjectButton = document.getElementsByClassName( "button__add-project" )[0];

function registerListeners() {
  revealProjectFormButton.addEventListener( 'click', listenerFunctions.revealProjectForm );

  hideProjectFormButton.addEventListener( 'click', listenerFunctions.removeProjectForm );

  revealTaskFormButton.addEventListener( 'click', listenerFunctions.revealTaskForm );

  hideTaskFormButton.addEventListener( 'click', listenerFunctions.removeTaskForm );

  addProjectButton.addEventListener( 'click', listenerFunctions.addProject );
}

export { registerListeners }
