import { format, formatISO, parseISO, parse } from "date-fns";
import { taskFactory } from "./task";

const tasks = [];

const createTask = ( object ) => {
  const taskId = tasks.length > 0 ? tasks.length + 1 : 1;

  object.id = taskId;

  object.deadline = getFormattedDate( object.deadline );

  const newTask = taskFactory( object );

  tasks.push( newTask );
}

const getCorrespondingTasks = ( project ) => {
  return tasks.filter( task => task.project === project.name );
}

const getFormattedDate = ( date ) => {

  if ( date === '' || date === undefined ) {
    return date;
  }

  const formattedDate = format( parseISO( date ), "do 'of' MMMM yyyy");

  return formattedDate;
}

const getStandardDate = ( date ) => {
  if ( date === '' ) {
    return date;
  }

  const newFormat = parse( date, "do 'of' MMMM yyyy", new Date() )

  return formatISO( newFormat, { representation: 'date' } );
};

const getTask = ( id ) => {
  return tasks.find( task => task.id === id );
};

const updateCheckedStatus = ( id ) => {
  const task = tasks.find( task => task.id === id );

  task.toggleStatus();
};

createTask({
  title:'hi',
  description:'lol',
  deadline:'2020-02-18',
  priority:'3',
  notes:'xcv',
  project:'default',
  status: true,
});

createTask({
  title:'test',
  description:'',
  deadline:'',
  priority:'',
  notes:'',
  project:'default'
});

export {
  createTask,
  getCorrespondingTasks,
  getStandardDate,
  getTask,
  tasks,
  updateCheckedStatus,
};
