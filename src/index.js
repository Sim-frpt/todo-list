import "normalize.css";
import "./assets/styles/style.css";
import { taskFactory } from "./task";
import { generateTaskForm } from "./dom-manipulation";

console.log( taskFactory( { title:'hi', description:'lol', dueDate:'test', priority:'ier', notes:'xcv', project:'woie' }));

const form = generateTaskForm();
document.body.append( form );
//console.log( generateTaskForm() );
