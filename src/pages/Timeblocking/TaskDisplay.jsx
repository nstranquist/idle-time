import React from 'react'
import styled from 'styled-components'
import { pure } from 'recompose'

// TODO: make pure component

const TimeBlockDisplay = ({
  title,
  desc = null,
  handleInputClick,
}) => (
  <StyledTimeBlockDisplay className="block-right-display">
    <h3 className="block-title is-size-4" onClick={() => handleInputClick('title')}>{title}</h3>
    {desc && desc.length > 0 && (
      <p className="block-desc has-gray-text is-size-6" onClick={() => handleInputClick('desc')}>
        {desc}</p>
    )}
  </StyledTimeBlockDisplay>
)

const StyledTimeBlockDisplay = styled.div`
  &.block-right-display {
    flex: 1;

    .block-title {
      cursor: pointer;

      &:hover {
        // text-decoration: underline;
        // background-color: 
      }
    }
    .block-desc {
      cursor: pointer;

      &:hover {
        // text-decoration: underline;

      }
    }
  }
`

export default pure(TimeBlockDisplay)