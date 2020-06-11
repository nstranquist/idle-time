import React from 'react'
import styled from 'styled-components'
import { Minus } from 'react-feather'
import { boxShadows } from '../../styles/shadows.style'

export const MinusButton = ({
  handleClick
}) => {
  return (
    <MinusBtn className="icon minus-icon" onClick={handleClick}>
      <Minus size={20} fillOpacity={.85} />
    </MinusBtn>
  )
}

const MinusBtn = styled.span`
  box-shadow: ${boxShadows.shadow1};
  background: #fff;
`
