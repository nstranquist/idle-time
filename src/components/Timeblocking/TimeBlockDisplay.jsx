import React from 'react'
import { pure } from 'recompose'

// TODO: make pure component

const TimeBlockDisplay = ({
  title,
  desc = null,
  handleInputClick,
}) => (
  <div className="block-right-display">
    <h3 className="block-title is-size-4" onClick={() => handleInputClick('title')}>{title}</h3>
    {desc && (
      <p className="block-desc has-gray-text is-size-6" onClick={() => handleInputClick('desc')}>
        {desc}</p>
    )}
  </div>
)

export default pure(TimeBlockDisplay)