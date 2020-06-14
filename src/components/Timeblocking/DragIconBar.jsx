import React from 'react'
import styled from 'styled-components'
import { Trash2, Save } from 'react-feather'
import { bulmaColors } from '../../styles/bulma.colors'

export const DragIconBar = ({
  onDragEnter=()=>null,
  onDragExit=()=>null,
  handleDrop=()=>null,
}) => {
  return (
    <Container className="icon-bar-container">
      <div className="icon-container" id="trashIcon"
        onDragOver={e => e.preventDefault()}
        onDragEnter={e => {
          console.log('current:', e.currentTarget)
          if(e.currentTarget)
            e.currentTarget.classList.add('hovered')
        }}
        onDragExit={e => {
          if(e.currentTarget)
            e.currentTarget.classList.remove('hovered')
        }}
        onDrop={e => {
          handleDrop(e, 'trash')
        }}
      >
        <span className="icon trash-icon">
          <Trash2 color={bulmaColors.danger} size={32} />
        </span>
      </div>
      <div className="icon-container" id="saveIcon"
        onDragOver={e => e.preventDefault()}
        onDrop={e => handleDrop(e, 'save')}
      >
        <span className="icon trash-icon">
          <Save color={bulmaColors.success} size={32} />
        </span>
      </div>
    </Container>
  )
}

const Container = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  display: flex;
  margin-right: 12px;
  margin-bottom: 12px;
  z-index: 1100;

  .icon-container {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 30px;
    border-radius: 50%;
    cursor: pointer;
    background-color: inherit;
    transition: background-color .2s ease-in-out;

    &:hover {
      background-color: rgba(0,0,0,.05);
      transition: background-color .2s ease-in-out;
    }
    &.hovered {
      background-color: rgba(0,0,0,.05);
      transition: background-color .2s ease-in-out;
    }

    .trash-icon {
      flex: 1;
      // background-color: inherit;
    }
  }
`