import MicroModal from "micromodal";
import { format, parseISO } from "date-fns";
import { getSelectedProject, projects, updateLocalStorageProjects } from "./project-controller";
import { getCorrespondingTasks, orderTasks, tasks, updateLocalStorageTasks } from "./task-controller";

const assignTaskPriorityClass = ( task ) => {
  let classString = '';
  switch ( parseInt( task.priority  ) ) {
    case 1:
      classString = "task__priority--low";
      break;

    case 2:
      classString = "task__priority--normal";
      break;

    case 3:
      classString = "task__priority--high";
      break;
  }

  return classString;
};

const closeModal = ( modalToClose ) => {
  MicroModal.close( modalToClose );
};

const createEditForm = ( task ) => {
  const form = document.createElement( 'form' );
  form.classList.add( "edit__form" );

  const formFieldNames = Object.keys( task ).filter( key => {
    if ( key === 'id' || key === 'toggleStatus' ) {
      return false;
    } else {
      return true;
    }
  } );

  const buttonDiv = document.createElement( 'div' );
  buttonDiv.classList.add( "edit__form-controls" );

  const confirmButton = document.createElement( 'button' );
  confirmButton.classList.add( "button--secondary", "edit-button", "edit__button-confirm" );
  confirmButton.innerHTML = "<i class='fas fa-check'></i>";

  const cancelButton = document.createElement( 'button' );
  cancelButton.classList.add( "button--secondary", "edit-button", "edit__button-cancel" );
  cancelButton.innerHTML = "<i class='fas fa-times'></i>";

  buttonDiv.append( confirmButton, cancelButton );

  formFieldNames.forEach( field => {
    const newDiv = document.createElement( 'div' );
    newDiv.classList.add( "edit__form-node", `task__${field}--edit` );

    const newLabel = document.createElement( 'label' );
    newLabel.setAttribute( 'for', `edit-${field}` );

    if ( field === 'status' ) {
      newLabel.textContent = 'Completed';
    } else {
      newLabel.textContent = getUpperCaseString( field );
    }

    newDiv.append( newLabel );

    switch( field ) {
      case 'title':
        let title = document.createElement( 'input' );
        title.type = 'text';
        title.setAttribute( 'id', `edit-${field}` );
        title.value = task[field];
        title.name = field;

        newDiv.append( title );
        break;

      case 'deadline':
        let deadline = document.createElement( 'input' );
        deadline.type = 'date';
        deadline.setAttribute( 'id', `edit-${field}` );
        deadline.value = task[field];
        deadline.name = field;

        newDiv.append( deadline );
        break;

      case 'description':
      case 'notes':
        let textArea = document.createElement( 'textarea' );
        textArea.setAttribute( 'id', `edit-${field}` );
        textArea.value = task[field];
        textArea.name = field;

        newDiv.append( textArea );
        break;

      case 'priority':
        let prioritySelect = document.createElement( 'select' );
        prioritySelect.setAttribute( 'id', `edit-${field}` );
        prioritySelect.name = field;

        let option1 = document.createElement( 'option' );
        option1.value = 1;
        option1.selected = task[field] === parseInt( option1.value ) ? true : false;
        option1.text = 'Low';

        let option2 = document.createElement( 'option' );
        option2.value = 2;
        option2.selected = task[field] === parseInt( option2.value ) ? true : false;
        option2.text = 'Normal';

        let option3 = document.createElement( 'option' );
        option3.value = 3;
        option3.selected = task[field] === parseInt( option3.value ) ? true : false;
        option3.text = 'High';

        prioritySelect.add( option1 );
        prioritySelect.add( option2 );
        prioritySelect.add( option3 );

        newDiv.append( prioritySelect );
        break;

      case 'project':
        let projectSelect = document.createElement( 'select' );
        projectSelect.setAttribute( 'id', `edit-${field}` );
        projectSelect.name = field;

        projects.forEach( project => {
          let option = document.createElement( 'option' );
          option.value = project.id;
          option.textContent = getUpperCaseString( project.name );

          if ( project.id === task[field] ) {
            option.selected = true;
          }

          projectSelect.add( option );
        } );

        newDiv.append( projectSelect );
        break;

      case 'status':
        let status = document.createElement( 'input' );
        status.setAttribute( 'id', `edit-${field}` );
        status.type = 'checkbox';
        status.name = field;
        status.checked = task[field] ? true : false;

        newDiv.append( status );
        break;
    }

    form.append( newDiv );
  });

  form.append( buttonDiv );

  return form;
};

const displayEditTaskForm = ( taskNode, task ) => {
  taskNode.innerHTML = '';

  const editForm = createEditForm( task );
  taskNode.append( editForm );
};

const revealTaskForm = () => {
  const taskForm = document.getElementsByClassName( "task__form" )[0];
  reloadProjectOptions();

  taskForm.style.display = 'flex';
};

const deleteEditTaskForm = ( form ) => {
  form.remove();
};

const removeTaskForm = ( event ) => {
  event.preventDefault();

  const form = event.target.form;

  [...form].forEach( formElement => {
    if ( formElement.name === "priority" ) {
      selectDefaultOption( formElement );
    } else {
      clearInput( formElement );
    }
  });

  form.style.display = '';
};

const selectDefaultOption = ( selectInput ) => {
  const options = [...selectInput.options];

  options.forEach( option => {
    if ( parseInt( option.value ) === 2 ) {
      option.selected = true;
    }
  });
};

const clearInput = ( input ) => {
  input.value = '';
};

const displayProjects = () => {
  const projectsContainer = document.getElementsByClassName( "project__container" )[0];
  const projectNodes      = [...document.getElementsByClassName( "project__wrapper" )];

  projectNodes.forEach( node => node.remove() );

  const createProjectNode = ( project ) => {
    const projectNode = document.createElement( 'div' );
    projectNode.classList.add( "project__wrapper" );
    projectNode.setAttribute( "data-project-id", project.id );

    const projectTitle = document.createElement( "h3" );
    projectTitle.classList.add( "project__name" );
    projectTitle.textContent = getUpperCaseString( project.name );

    const renameButton = document.createElement( 'button' );
    renameButton.classList.add( "button--main", "button--main-action", "rename__project", "button--hidden" );
    renameButton.textContent = "Rename";

    const okButton = document.createElement( 'button' );
    okButton.classList.add( "button--secondary", "button--ok", "rename__button-ok" );
    okButton.innerHTML = "<i class='fas fa-check'></i>";

    const cancelButton = document.createElement( 'button' );
    cancelButton.classList.add( "button--secondary", "button--cancel", "rename__button-cancel" );
    cancelButton.innerHTML = "<i class='fas fa-times'></i>";

    const deleteButton = document.createElement( 'button' );
    deleteButton.classList.add( "button--main", "delete__project", "button--main-delete", "button--hidden" );
    deleteButton.setAttribute( "data-del-project-modal", "del-project-modal" );
    deleteButton.textContent = "Delete";

    projectNode.append( projectTitle, okButton, cancelButton, renameButton, deleteButton );

    projectsContainer.append( projectNode );
  };

  projects.forEach( createProjectNode );
  markProjectAsSelected();
  updateLocalStorageProjects( projects );
};

const displayProjectRenameControls = ( event ) => {
  const parentNode = event.target.parentNode;

  const focusedProject = parentNode.firstChild;
  const confirmButton = parentNode.getElementsByClassName( "rename__button-ok" )[0];
  const cancelButton = parentNode.getElementsByClassName( "rename__button-cancel" )[0];

  const projectInput = document.createElement( 'input' );
  projectInput.classList.add( "project__input-rename" );
  projectInput.setAttribute( 'type', "text" );
  projectInput.setAttribute( 'id', "project-rename-input" );
  projectInput.value = focusedProject.textContent;

  focusedProject.replaceWith( projectInput );
  projectInput.focus();
  toggleRenameControls( confirmButton, cancelButton );

  const nodeChildren = [...parentNode.children];

  nodeChildren.forEach( child => {
    if ( child.classList.contains( "button--main") ) {
      toggleMainButtonsDisplay( child );
    }
  });
};

const displayTasks = () => {
  updateLocalStorageTasks( tasks );

  const tasksContainer      = document.getElementsByClassName( "tasks__container" )[0];
  const selectedProject     = getSelectedProject();
  const tasksList           = [...document.getElementsByClassName( "task__item" )];
  const addTaskButton       = document.getElementsByClassName( "reveal__task-inputs" )[0];

  tasksList.forEach( node => node.remove() );

  if ( ! selectedProject ) {
    return;
  }

  const projectRelatedTasks = getCorrespondingTasks( selectedProject );

  const orderedTasks = orderTasks( projectRelatedTasks );

  const createTaskNode = ( task ) => {
    const taskNode  = document.createElement( 'div' );
    const taskNodePriorityClass = assignTaskPriorityClass( task );
    taskNode.classList.add( "task__item", taskNodePriorityClass );
    taskNode.setAttribute( "data-task-id", task.id );

    if ( task.status ) {
      taskNode.classList.add( "task--completed" );
    }

    const checkBox = document.createElement( 'input' );
    checkBox.type = 'checkbox';
    checkBox.classList.add( "task__checkbox" );

    if ( task.status === true ) {
      checkBox.checked = true;
    }

    const taskTitle = document.createElement( 'p' );
    taskTitle.classList.add( "task__title" );
    taskTitle.textContent = getUpperCaseString( task.title );

    const taskDate  = document.createElement( 'span' );
    taskDate.classList.add( "task__date" );
    taskDate.textContent = getFormattedDate( task.deadline );

    const taskDescription = document.createElement( 'p' );
    taskDescription.classList.add( "task__description", "task__hidden" );
    taskDescription.textContent = task.description;

    const taskNotes = document.createElement( 'p' );
    taskNotes.classList.add( "task__notes", "task__hidden" );
    taskNotes.textContent = task.notes;

    const editButton = document.createElement( 'button' );
    editButton.classList.add( "button--main", "task__edit", "task__hidden" );
    editButton.textContent = "Edit";

    const deleteButton = document.createElement( 'button' );
    deleteButton.classList.add( "button--main", "task__delete", "task__hidden" );
    deleteButton.textContent = "Delete";

    taskNode.append(
      checkBox,
      taskTitle,
      taskDate,
      taskDescription,
      taskNotes,
      editButton,
      deleteButton,
    );

    tasksContainer.insertBefore( taskNode, addTaskButton );
  };

  orderedTasks.forEach( createTaskNode );
}

const getFormattedDate = ( date ) => {

  if ( date === '' || date === undefined ) {
    return date;
  }

  const formattedDate = format( parseISO( date ), "do 'of' MMMM yyyy");

  return formattedDate;
}

const getUpperCaseString = ( string ) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const markProjectAsSelected = () => {
  const selectedProject = getSelectedProject();

  if ( ! selectedProject ) {
    return;
  }

  const projectNodes    = [...document.getElementsByClassName( "project__wrapper" )];
  const selectedClass   = "selected__project";

  projectNodes.forEach( node => {
    let projectID = parseInt( node.dataset.projectId );

    if ( projectID === selectedProject.id ) {
      node.classList.add( selectedClass );
      toggleProjectButton( node, true );
    } else {
      node.classList.remove( selectedClass );
      toggleProjectButton( node, false );
    }
  });
};

const reloadProjectOptions = () => {
  const projectSelectInput = document.getElementById( "task-project" );

  projectSelectInput.innerHTML = '';

  projects.forEach( project => {
    let option = document.createElement( 'option' );

    option.value = project.id;
    option.textContent = getUpperCaseString( project.name );

    if ( project.isSelected ) {
      option.selected = 'selected';
    }

    projectSelectInput.appendChild( option );
  });
};

const revealTaskFields = ( event ) => {
  let taskNode;

  if ( event.target.classList.contains( "task__title" ) ) {
    taskNode = event.target.parentNode;
  } else {
    taskNode = event.target;
  }

  const taskElements = [...taskNode.children];
  const targetedClasses = [ "task__description", "task__notes", "task__edit", "task__delete"];

  taskElements.forEach( element => {
    if ( targetedClasses.some(
      targetedClass => [...element.classList].includes( targetedClass ) )
    ) {
      element.classList.toggle( "task__hidden" );
    }
  });
};

const toggleMainButtonsDisplay = ( element ) => {
  element.classList.toggle( "button--hidden" );
};

const toggleProjectButton = ( targetedNode, isActive ) => {
  [...targetedNode.children].forEach( element => {
    if ( ! element.classList.contains( "button--main" ) ) {
      return;
    }
    if ( isActive ) {
      element.classList.remove( "button--hidden" );
    } else {
      element.classList.add( "button--hidden" );
    }
  } );
}

const toggleProjectForm = ( shouldFormBeVisible = false ) => {
  const projectForm  = document.getElementsByClassName( "add__project" )[0];
  const projectInput = document.getElementsByClassName( "project__input" )[0];

  if ( shouldFormBeVisible ) {
    projectForm.style.display = 'flex';
    projectInput.focus();
  } else {
    clearInput( projectInput );
    projectForm.style.display = '';
  }
}

const toggleRenameControls = ( okButton, cancelButton ) => {
  if ( okButton.style.display === '' ) {
    okButton.style.display = "inline";
    cancelButton.style.display = "inline";
  } else {
    okButton.style.display = "";
    cancelButton.style.display = "";
  }
};

export {
  clearInput,
  closeModal,
  deleteEditTaskForm,
  displayEditTaskForm,
  displayProjects,
  displayProjectRenameControls,
  displayTasks,
  markProjectAsSelected,
  removeTaskForm,
  revealTaskForm,
  revealTaskFields,
  toggleProjectForm,
};
