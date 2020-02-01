import { projectFactory } from "./project";

const projects = [];

const defaultProject = projectFactory( 'default', true, 1 );

projects.push( defaultProject );

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

export { createProject, deleteProject, renameProject, projects };
