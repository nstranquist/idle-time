import React from 'react'
import { X } from 'react-feather'

export const CancelButton = ({
  handleClick,
}) => {
  return (
    <button className="button submit-task-button is-regular" style={{marginRight:16}}
      onClick={handleClick}>
      <span className="icon is-large">
        <X size={24} />
      </span>
      <span style={{fontSize:20,fontWeight:800,marginLeft:6}}>Cancel</span>
    </button>
  )
}
