import { format, parseISO } from "date-fns";
import { taskFactory } from "./task";

const tasks = [];

const createTask = ( object ) => {
  const taskId = tasks.length > 0 ? tasks.length + 1 : 1;
  object.id = taskId;

  const formattedObj = getFormattedObj( object );

  const newTask = taskFactory( formattedObj );

  tasks.push( newTask );
}

const getCorrespondingTasks = ( project ) => {
  return tasks.filter( task => task.project === project.name );
}

const getFormattedObj = ( rawObject ) => {
  const date = rawObject.deadline;

  if ( date === '' || date === undefined ) {
    return rawObject;
  }

  const formattedDate = format( parseISO( date ), "do 'of' MMMM yyyy");

  const formattedObj = Object.assign( rawObject, { deadline: formattedDate } );

  return formattedObj;
}

export { createTask, getCorrespondingTasks, tasks };
