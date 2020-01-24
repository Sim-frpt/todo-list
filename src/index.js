import "normalize.css";
import "./assets/styles/style.css";
import { taskFactory } from "./modules/task";
import { registerListeners } from "./modules/event-handler";

//console.log( taskFactory( { title:'hi', description:'lol', dueDate:'test', priority:'ier', notes:'xcv', project:'woie' }));

registerListeners();
