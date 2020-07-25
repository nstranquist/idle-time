import React, { useState, useEffect } from 'react'
import { createSelector } from 'reselect'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { OutsideAlerter } from '../../../hoc/OutsideAlerter'

const selectProjects = state => state.projects.projects;
const selectProjectOptions = createSelector(
  selectProjects,
  (projects) => {
    console.log('projects in selectors:', projects)
    const newProjects = projects
      .filter(project => project.isActive)
      .map(project => ({
        _id: project._id,
        title: project.title
      }))
    console.log('new projects:', newProjects)
    return newProjects
  }
)

export const SelectProject = ({
  assignProject,
  onCancel,
}) => {
  const [options, setOptions] = useState(undefined)
  const projectOptions = useSelector(selectProjectOptions);

  useEffect(() => {
    if(projectOptions)
      setOptions(projectOptions)
  }, [projectOptions])

  const handleSelect = (id, title) => {
    assignProject(id, title);
    onCancel()
  }

  return (
    <OutsideAlerter handleOutsideClick={onCancel}>
      <div className="options-menu text-options-menu">
        {options
          ? options.length > 0
            ? options.map(option => (
              <p className="option" key={option._id} onClick={() => handleSelect(option._id, option.title)}>{option.title}</p>
            )) : <p className="option">No projects yet!</p>
          : (
          <p className="option">Loading...</p>
        )}
      </div>
    </OutsideAlerter>
  )
}

const StyledSelectProject = styled.div`
  
`