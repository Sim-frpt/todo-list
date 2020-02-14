import { tasks, deleteTask } from "./task-model";
import { projects } from "./project-model";

const deleteRelatedTasks = ( projectId ) => {
  tasks.forEach( task => {
    if ( task.project === projectId ) {
      deleteTask( task.id );
    }
  });
};

export default deleteRelatedTasks;

