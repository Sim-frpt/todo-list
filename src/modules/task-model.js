import { taskFactory } from "./task";

const tasks = [];

const createTask = ( object ) => {
  const taskId = tasks.length > 0 ? tasks.length + 1 : 1;
  object.id = taskId;

  const newTask = taskFactory( object );

  tasks.push( newTask );
}

const getCorrespondingTasks = ( project ) => {
  return tasks.filter( task => task.project === project.id );
}

const getTask = ( id ) => {
  return tasks.find( task => task.id === id );
};

const updateCheckedStatus = ( id ) => {
  const task = tasks.find( task => task.id === id );

  task.toggleStatus();
};

const updateTask = ( object, taskId ) => {
  const taskToUpdate= tasks.find( task => task.id === taskId );

  Object.assign( taskToUpdate, object );
};

createTask({
  title:'sdfhi',
  description:'lol',
  deadline:'2020-02-18',
  priority:'3',
  notes:'xcv',
  project: 1,
  status: true,
});

createTask({
  title:'test',
  description:'',
  deadline:'',
  priority:'',
  notes:'',
  project:1,
});

export {
  createTask,
  getCorrespondingTasks,
  getTask,
  tasks,
  updateTask,
  updateCheckedStatus,
};
