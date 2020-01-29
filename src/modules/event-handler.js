import * as displayFunctions from "./dom-manipulation";
import { handleProjectInteraction } from "./project-controller";
import { handleTaskRequest } from "./task-controller";

const revealTaskFormButton    = document.getElementsByClassName( "reveal__task-inputs" )[0];
const addTaskButton           = document.getElementsByClassName( "button__add-task" )[0];
const projectContainer        = document.getElementsByClassName( "project__container")[0];

function registerListeners() {
  revealTaskFormButton.addEventListener( 'click', displayFunctions.revealTaskForm );

  addTaskButton.addEventListener( 'click', handleTaskRequest );

  projectContainer.addEventListener( 'click', handleProjectInteraction );
}

export { registerListeners }
