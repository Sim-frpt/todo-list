import "normalize.css";
import "./assets/styles/style.css";
//import { taskFactory } from "./modules/task";
import { registerListeners } from "./modules/event-handler";
import { markProjectAsSelected, updateProjectsList } from "./modules/dom-manipulation";
import { projects } from "./modules/project-model";

//console.log( taskFactory( { title:'hi', description:'lol', dueDate:'test', priority:'ier', notes:'xcv', project:'woie' }));

registerListeners();
updateProjectsList( projects );
markProjectAsSelected( projects );
