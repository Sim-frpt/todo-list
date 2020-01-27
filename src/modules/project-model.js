import { projectFactory } from "./project";

const projects = [];

const defaultProject = projectFactory( 'default', true );

projects.push( defaultProject );

const createProject = ( projectName ) => {
  const newProject = projectFactory( projectName );

  projects.push( newProject );

  reorderProjects( projects );
};

const reorderProjects = ( projects ) => {
  // sorted alphabetically starting from z so that they can be inserted alphabetically
  projects.sort( (a, b) => {
    const A = a.name.toUpperCase();
    const B = b.name.toUpperCase();

    if ( A < B ) {
      return 1;
    }
    if ( A > B ) {
      return -1;
    }

    return 0;
  });
};
export { createProject, projects };
