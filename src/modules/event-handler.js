import { handleProjectInteraction } from "./project-controller";
import { handleTaskInteraction } from "./task-controller";

const projectContainer = document.getElementsByClassName( "project__container")[0];
const taskContainer    = document.getElementsByClassName( "tasks__container" )[0];

function registerListeners() {
  projectContainer.addEventListener( 'click', handleProjectInteraction );
  taskContainer.addEventListener( 'click', handleTaskInteraction );
}

export { registerListeners }
