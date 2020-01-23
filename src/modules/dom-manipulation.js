const addProjectDiv = document.getElementsByClassName( 'add__project' )[0];

const revealProjectInput = ( event ) => {
  addProjectDiv.style.display = 'block';
}

const removeProjectInput = ( event ) => {
  const addProjectInput = document.getElementsByClassName( "project__input" )[0];

  addProjectInput.textContent = '';
  addProjectDiv.style.display = '';
}

export { revealProjectInput, removeProjectInput };
