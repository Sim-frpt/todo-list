import { format, parseISO } from "date-fns";
import { taskFactory } from "./task";

const tasks = [];

const createTask = ( object ) => {

  const formattedObj = getFormattedObj( object );
  const newTask = taskFactory( formattedObj );

  tasks.push( newTask );
}

const getFormattedObj = ( rawObject ) => {
  const date = rawObject.deadline;

  if ( date === '' ) {
    return rawObject;
  }

  const formattedDate = format( parseISO( date ), "do 'of' MMMM yyyy");

  const formattedObj = Object.assign( rawObject, { deadline: formattedDate } );

  return formattedObj;
}

export { createTask, tasks };
