import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { getProjects, addProject, updateProject, deleteProject } from '../../store/Projects'
import { selectProjects } from '../../store/Projects/selectors'
import { selectAuthToken } from '../../store/Auth/selectors'


const Projects = ({
  token,
  projects,
  loading,
  errors,
  getProjects,
  addProject,
  updateProject,
  deleteProject,
}) => {
  // const [updating, setUpdating] = useState(null) // null or string
  
  useEffect(() => {
    getProjects(token);
  }, [])

  const handleAddProject = () => {
    const newProject = {
      title: "New Project",
      desc: "example description"
    }
    addProject(token, newProject);
  }

  const handleStartUpdate = (id) => {
    // setUpdating(id)
    const updatedTask = {
      title: "Updated Project",
      desc: "example updated project description"
    }
    handleUpdate(id, updatedTask)
  }

  const handleUpdate = (id, data) => {
    updateProject(token, id, data)
  }

  const handleDelete = (id) => {
    deleteProject(token, id)
  }

  const handleAssignTask = (id) => {

  }
  
  return (
    <div className="container">
      <h3 className="is-size-3">Projects</h3>
      {errors && <p className="has-text-danger">{errors.toString()}</p>  }
      <button onClick={handleAddProject} className="button is-link">Add Project</button>
      <ul className="list">
        {projects.length === 0 ? (
          <li className="list-item project-item">You don't have any projects yet!</li>
        ) : loading ? <p>loading...</p>
          : projects.map(project => (
            <li key={project._id} className="list-item project-item">
              <div style={{display:'flex',alignItems:'center'}}>
                <p style={{flex:1,margin:0}}>{project.title} - {project.tasks.length}</p>
                <button onClick={() => handleAssignTask(project._id)} className="button is-small is-link">Assign</button>
                <button onClick={() => handleStartUpdate(project._id)} className="button is-small is-warning">Edit</button>
                <button onClick={() => handleDelete(project._id)} className="button is-small is-danger">Delete</button>
              </div>
              {project.desc && <p style={{margin:0,marginTop:".8rem"}}>{project.desc}</p>}
            </li>
          ))
        }
      </ul>
    </div>
  )
}

const mapStateToProps = (state) => ({
  token: selectAuthToken(state),
  projects: selectProjects(state),
  loading: state.projects.loading,
  errors: state.projects.errors,
  // loading, errors
})

export const ConnectedProjects = connect(
  mapStateToProps,
  { getProjects, addProject, updateProject, deleteProject }
)(Projects)
