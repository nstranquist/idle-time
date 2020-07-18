// import React, { useState } from 'react'
// import styled from 'styled-components'

// export const Item = ({
//   project,
//   updateProject,
//   deleteProject,
// }) => {
//   const [projectData, setProjectData] = useState(undefined);
//   const [isEditing, setIsEditing] = useState(false)

//   if(isEditing) {
//     return (
//       <form className="form" onSubmit={updateProject}>

//       </form>
//     )
//   }
//   return (
//     <ProjectItem className="list-item">
//       <p>{project.title}</p>
//       <button onClick={() => handleStartUpdate(project._id)} className="button is-small is-warning">Edit</button>
//       <button onClick={() => handleDelete(project._id)} className="button is-small is-danger">Delete</button>
//     </ProjectItem>
//   )
// }

// const ProjectItem = styled.li`

// `