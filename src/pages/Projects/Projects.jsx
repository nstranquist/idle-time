import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { ErrorNotification } from '../../components/ErrorText'
import { AddForm } from './AddForm'
import { getProjects, addProject, updateProject, deleteProject, clearErrors } from '../../store/Projects'
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
  clearErrors
}) => {
  // const [updating, setUpdating] = useState(null) // null or string
  const [adding, setAdding] = useState(false)
  
  useEffect(() => {
    getProjects(token);
  }, [])

  const handleAddProject = (projectData) => {
    console.log('project data:', projectData)
    addProject(token, projectData);
    toggleAddProject()
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

  const toggleAddProject = () => setAdding(adding => !adding)
  
  return (
    <div className="container section-container">
      <header className="section-header">
        <h3 className="is-size-3">Projects</h3>
        {errors && <ErrorNotification message={errors.toString()} clearErrors={clearErrors} />  }

        {!adding
          ? <button onClick={toggleAddProject} className="button is-link">Add Project</button>
          : <AddForm
          submitForm={handleAddProject}
          cancelForm={toggleAddProject}
          />
        }
      </header>

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
  { getProjects, addProject, updateProject, deleteProject, clearErrors }
)(Projects)
