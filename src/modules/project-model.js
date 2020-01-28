import { projectFactory } from "./project";

const projects = [];

const defaultProject = projectFactory( 'default', true );

projects.push( defaultProject );

const createProject = ( projectName ) => {
  projects.forEach( project => {
    if ( project.isSelected ) {
      project.toggleSelected();
    }
  });

  const newProject = projectFactory( projectName, true );

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

export { createProject, projects };
