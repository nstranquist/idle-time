import React from 'react'
import { PlusCircle } from 'react-feather'

export const AddButton = ({
  handleClick
}) => {
  return (
    <button className="button add-task-button is-primary is-regular"
      onClick={handleClick}>
      <span className="icon is-large">
        <PlusCircle size={24} />
      </span>
      <span style={{fontSize:20,fontWeight:800,marginLeft:6}}>Add</span>
    </button>
  )
}
