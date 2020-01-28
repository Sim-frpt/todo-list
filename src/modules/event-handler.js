import * as displayFunctions from "./dom-manipulation";
import { handleProjectRequest } from "./project-controller";
import { handleTaskRequest } from "./task-controller";

const revealProjectFormButton = document.getElementsByClassName( "reveal__project-input" )[0];
const hideProjectFormButton = document.getElementsByClassName( "button__close-project" )[0];
const revealTaskFormButton = document.getElementsByClassName( "reveal__task-inputs" )[0];
const hideTaskFormButton = document.getElementsByClassName( "close__task-form" )[0];

const addProjectButton = document.getElementsByClassName( "button__add-project" )[0];
const addTaskButton = document.getElementsByClassName( "button__add-task" )[0];

function registerListeners() {
  revealProjectFormButton.addEventListener( 'click', displayFunctions.revealProjectForm );

  hideProjectFormButton.addEventListener( 'click', displayFunctions.removeProjectForm );

  revealTaskFormButton.addEventListener( 'click', displayFunctions.revealTaskForm );

  hideTaskFormButton.addEventListener( 'click', displayFunctions.removeTaskForm );

  addProjectButton.addEventListener( 'click', handleProjectRequest );

  addTaskButton.addEventListener( 'click', handleTaskRequest );
}

export { registerListeners }
