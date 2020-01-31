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

const renameProject = ( input ) => {
  const newName = input.value.toLowerCase();
  const oldName = input.dataset.projectPreviousName;

  projects.map( project => {
    if ( project.name === oldName ) {
      project.name = newName;
    }
  });

  reorderProjects( projects );
};

export { createProject, renameProject, projects };
