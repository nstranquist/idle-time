import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

export const TasksMenu = ({
  taskCollections
}) => {
  return (
    <div>
      <header className="section-heading">
        <h3 className="heading-text is-size-3">Your Tasks</h3>
      </header>
      <div className="tasks-menu-items">
        {/* Todo: Map over task collections */}
        <CollectionItem className="tasks-collection-item">
          <p className="title-text">First Collection</p>
        </CollectionItem>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  taskCollections: state.tasks.tasks, // todo: change to collections
})

export const ConnectedTasksMenu = connect(
  mapStateToProps,
  {  }
)(TasksMenu)

const CollectionItem = styled.div`

`