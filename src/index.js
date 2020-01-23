import "normalize.css";
import "./assets/styles/style.css";
import { taskFactory } from "./modules/task";
import { revealProjectInput, removeProjectInput } from "./modules/dom-manipulation";

//console.log( taskFactory( { title:'hi', description:'lol', dueDate:'test', priority:'ier', notes:'xcv', project:'woie' }));

const revealProjectFormButton = document.getElementsByClassName( "reveal__project-input" )[0];
const hideProjectFormButton = document.getElementsByClassName( "button__close-project" )[0];

revealProjectFormButton.addEventListener( 'click', revealProjectInput );
hideProjectFormButton.addEventListener( 'click', removeProjectInput );
