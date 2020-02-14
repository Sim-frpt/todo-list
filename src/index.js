import "normalize.css";
import "./assets/styles/style.css";
import "@fortawesome/fontawesome-free/js/all"
import { registerListeners } from "./modules/event-handler";
import { markProjectAsSelected, displayProjects, displayTasks } from "./modules/dom-manipulation";


registerListeners();
displayProjects();
displayTasks();
markProjectAsSelected();
