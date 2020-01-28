import { projects } from "./project-controller"
import { tasks } from "./task-controller"

const projectForm = document.getElementsByClassName( "add__project" )[0];
const taskForm     = document.getElementsByClassName( "task__form" )[0];

const revealProjectForm = ( event ) => {
  projectForm.style.display = 'block';
};

const removeProjectForm = ( event ) => {
  const projectInput = document.getElementsByClassName( "project__input" )[0];

  clearInput( projectInput );

  projectForm.style.display = '';
};

const revealTaskForm = ( event ) => {
  reloadProjectOptions();

  taskForm.style.display = 'flex';
};

const removeTaskForm = ( event ) => {
  event.preventDefault();

  const form = [ ...event.target.form ];

  form.forEach( formElement => {
    clearInput( formElement );
  });

  taskForm.style.display = '';
};

const clearInput = ( input ) => {
  input.value = '';
};

const updateProjectsList = ( projects ) => {
  const projectsContainer = document.getElementsByClassName( "project__container" )[0];
  const addProjectButton  = document.getElementsByClassName( "reveal__project-input")[0];
  const projectNodes      = [...document.getElementsByClassName( "project__name" )];

  projectNodes.forEach( node => node.remove() );

  projects.forEach( project => {
    const projectNode = document.createElement( "h3" );

    projectNode.classList.add( "project__name" );

    projectNode.textContent = getUpperCaseString( project.name );

    projectsContainer.insertBefore( projectNode, addProjectButton );
  });
};

const updateTasksList = ( tasks ) => {
  const tasksContainer      = document.getElementsByClassName( "todos__container" )[0];
  const selectedProject     = document.getElementsByClassName( "selected__project" )[0];
  const selectedProjectName = selectedProject.textContent.toLowerCase();
  const tasksList           = [...document.getElementsByClassName( "todo__item" )];
  const addTaskButton       = document.getElementsByClassName( "reveal__task-inputs" )[0];

  tasksList.forEach( node => node.remove() );

  tasks.forEach( task => {
    if ( task.project !== selectedProjectName ) {
      return;
    }

    const taskNode  = document.createElement( 'div' );
    const taskTitle = document.createElement( 'p' );
    const taskDate  = document.createElement( 'span' );

    taskNode.classList.add( "todo__item" );
    taskTitle.classList.add( "todo__title" );
    taskDate.classList.add( "todo__date" );

    taskTitle.textContent = getUpperCaseString( task.title );
    taskDate.textContent = task.deadline;

    taskNode.append( taskTitle, taskDate );

    tasksContainer.insertBefore( taskNode, addTaskButton );
  });
  console.log( selectedProjectName );
}

const getUpperCaseString = ( string ) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const markProjectAsSelected = ( projects ) => {
  const selectedProject = projects.find( project => project.isSelected );
  const projectNodes    = [...document.getElementsByClassName( "project__name" )];
  const selectedClass   = "selected__project";

  projectNodes.forEach( node => {
    let projectName = node.textContent.toLowerCase();

    if ( projectName === selectedProject.name ) {
      node.classList.add( selectedClass );
    } else {
      node.classList.remove( selectedClass );
    }
  });
};

const reloadProjectOptions = () => {
  const projectSelectInput = document.getElementById( "task-project" );

  projectSelectInput.innerHTML = '';

  projects.forEach( project => {
    let option = document.createElement( 'option' );

    option.value = project.name;
    option.textContent = getUpperCaseString( project.name );

    if ( project.isSelected ) {
      option.selected = 'selected';
    }

    projectSelectInput.appendChild( option );
  });
};

export {
  revealProjectForm,
  removeProjectForm,
  revealTaskForm,
  removeTaskForm,
  clearInput,
  updateProjectsList,
  updateTasksList,
  markProjectAsSelected,
};
