
const createLabel = ( inputName, text ) => {
  const label = document.createElement( 'label' );
  label.setAttribute( 'for', inputName );
  label.textContent = text;

  return label;
};

const createInput = ( type, id ) => {
  const input = document.createElement( 'input' );
  input.type = type;
  input.setAttribute( 'id', id);
  input.setAttribute( 'name', id);

  return input;
};

const createSpecialInput = ( elementType, name ) => {
  const element = document.createElement( elementType );
  element.setAttribute( 'id', name );
  element.setAttribute( 'name', name );

  return element;
};

const appendOptionsToSelect = ( options, selectElement ) => {
  if ( ! options.length ) {
    return;
  }

  options.forEach( option => {
    const optionNode = document.createElement( 'option' );

    optionNode.value = option;
    optionNode.textContent = option.toUpperCase();

    selectElement.append( optionNode );
  });
}

function generateTaskForm() {
  const form = document.createElement( 'form' );
  form.classList.add( "task__form" );

  const taskTitle = createLabel( 'title', 'Title' );
  const title = createInput( 'text', 'title' );

  const taskDescription = createLabel( 'description', 'Title' );
  const description = createSpecialInput( 'textarea', 'description' );

  const taskDueDate = createLabel( 'due-date', 'Deadline' );
  const dueDate = createInput( 'date', 'due-date' );

  const taskPriority = createLabel( 'priority', 'Priority' );
  const priority = createSpecialInput ( 'select', 'priority' );

  const priorityOptions = [ 'low', 'normal', 'high' ];
  appendOptionsToSelect( priorityOptions, priority );

  const taskNotes = createLabel( 'notes', 'Notes' );
  const notes = createSpecialInput( 'textarea', 'notes' );

  const taskProject = createLabel( 'project', 'Project' );
  const project = createSpecialInput( 'select', 'project' );

  appendOptionsToSelect( [ 'default' ], project );

  const closeButton = document.createElement( 'button' );
  closeButton.classList.add( 'button__close' );
  closeButton.textContent = 'Close';

  const submitButton = document.createElement( 'button' );
  submitButton.classList.add( 'button__submit' );
  submitButton.textContent = 'Save';

  form.append(
    taskTitle,
    title,
    taskDescription,
    description,
    taskDueDate,
    dueDate,
    taskPriority,
    priority,
    taskNotes,
    notes,
    taskProject,
    project,
    closeButton,
    submitButton,
  );

  return form;
}

export { generateTaskForm };
