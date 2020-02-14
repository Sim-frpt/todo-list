import { projectFactory } from "./project";

const projects = [];

const createProject = ( projectName ) => {
  projects.forEach( project => {
    if ( project.isSelected ) {
      project.toggleSelected();
    }
  });

  const projectID = projects.length > 0 ? projects.length + 1 : 1;

  const newProject = projectFactory( projectName, true, projectID );

  projects.push( newProject );

  reorderProjects( projects );
};

const initProjectsArray = ( projects ) => {

  if ( 'projects' in localStorage ) {
    const storedProjects = JSON.parse( localStorage.getItem( 'projects' ) );

    storedProjects.forEach( project => createProject( project.name ) );
  } else {
    const defaultProject = projectFactory( 'default', true, 1 );

    projects.push( defaultProject );
  }

  return projects;
};

const reorderProjects = ( projects ) => {
  projects.sort( (a, b) => {
    const A = a.name.toUpperCase();
    const B = b.name.toUpperCase();

    if ( A < B ) {
      return -1;
    }
    if ( A > B ) {
      return 1;
    }

    return 0;
  });
};

const renameProject = ( input, id ) => {
  const newName = input.value.toLowerCase();

  projects.map( project => {
    if ( project.id === id ) {
      project.name = newName;
    }
  });

  reorderProjects( projects );
};

const deleteProject = ( id ) => {
  const delIndex = projects.findIndex( project => project.id === id );

  if ( delIndex === -1 ) {
    return;
  }

  projects.splice( delIndex, 1 );

  reorderProjects( projects );

};

initProjectsArray( projects );

export { createProject, deleteProject, renameProject, projects };
