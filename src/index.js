import "normalize.css";
import "./assets/styles/style.css";
import "@fortawesome/fontawesome-free/js/all"
//import { taskFactory } from "./modules/task";
import { registerListeners } from "./modules/event-handler";
import { markProjectAsSelected, displayProjects } from "./modules/dom-manipulation";
import { projects } from "./modules/project-model";

//console.log( taskFactory( { title:'hi', description:'lol', dueDate:'test', priority:'ier', notes:'xcv', project:'woie' }));

registerListeners();
displayProjects( projects );
markProjectAsSelected( projects );
