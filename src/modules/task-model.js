import { taskFactory } from "./task";

const tasks = [];

const createTask = ( object ) => {
  const taskId = tasks.length > 0 ? tasks.length + 1 : 1;
  object.id = taskId;

  getBooleanStatus( object );

  const newTask = taskFactory( object );

  tasks.push( newTask );
}

const deleteTask  = ( id ) => {
  const delIndex = tasks.findIndex( task => task.id === id );

  if ( delIndex === -1 ) {
    return;
  }

  tasks.splice( delIndex, 1 );
};

const getBooleanStatus = ( object ) => {
  if ( object.status === 'true' ) {
    object.status = true;
  } else if ( object.status === 'false' ) {
    object.status = false;
  }
};

const getCorrespondingTasks = ( project ) => {
  return tasks.filter( task => task.project === project.id );
}

const getTask = ( id ) => {
  return tasks.find( task => task.id === id );
};

const initTasksArray = ( tasks ) => {

  if ( 'tasks' in localStorage ) {
    const storedTasks = JSON.parse( localStorage.getItem( 'tasks' ) );

    storedTasks.forEach( createTask );
  }

  return tasks;
};

const orderTasks = ( selectedTasks ) => {

  const sortByDate = ( a, b ) => {
    if (
      ! a.deadline && b.deadline !== '' ||
      a.deadline > b.deadline && b.deadline !== ''
      ) {
      return 1;
    } else if (
      a.deadline !== '' && ! b.deadline ||
      ! a.deadline && ! b.deadline ||
      a.deadline <= b.deadline
    ) {
      return -1;
    }
  };

  const sortByName = ( a, b ) => {
    let A = a.title.toUpperCase();
    let B = b.title.toUpperCase();

    if ( a.deadline || b.deadline ) {
      return 0;
    }

    if ( A < B ) {
      return -1;
    }
    if ( A > B ) {
      return 1;
    }

    return 0;
  };

  const sortedTasks = selectedTasks.sort( sortByDate );

  return sortedTasks.sort( sortByName );
};

const updateCheckedStatus = ( id ) => {
  const task = tasks.find( task => task.id === id );

  task.toggleStatus();
};

const updateTask = ( object, taskId ) => {
  const taskToUpdate= tasks.find( task => task.id === taskId );

  getBooleanStatus( object );

  Object.assign( taskToUpdate, object );
};

initTasksArray( tasks );

//createTask({
  //title: 'sdfhi',
  //description: 'lol',
  //deadline: '2020-02-18',
  //priority: 3,
  //notes: 'xcv',
  //project: 1,
  //status: true,
//});

//createTask({
  //title: 'test',
  //description: '',
  //deadline: '',
  //priority:  2,
  //notes: '',
  //project: 1,
  //status:  false,
//});

export {
  createTask,
  deleteTask,
  getCorrespondingTasks,
  getTask,
  orderTasks,
  tasks,
  updateTask,
  updateCheckedStatus,
};
