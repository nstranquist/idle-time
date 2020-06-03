import React from 'react'
import { Check } from 'react-feather'

export const SubmitButton = ({
  handleClick
}) => {
  return (
    <button className="button submit-task-button is-success is-regular"
      onClick={handleClick}>
      <span className="icon is-large">
        <Check size={24} />
      </span>
      <span style={{fontSize:20,fontWeight:800,marginLeft:6}}>Submit</span>
    </button>
  )
}
