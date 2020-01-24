import { projectFactory } from "./project";

const projects = [];

const createProject = ( projectName ) => {
  const newProject = projectFactory( projectName );

  projects.push( newProject );

  console.log( newProject );
};

export { createProject, projects };
