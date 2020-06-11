import React from 'react'
import styled from 'styled-components'
import { Plus } from 'react-feather'
import { bulmaColors } from '../../styles/bulma.colors'

export const AddFormItem = ({
  labelText = "",
  handleClick,
}) => {
  return (
    <AddFormItem_ className="add-form-item" onClick={handleClick}>
      <span className="icon" style={{marginRight:2}}>
        <Plus size={20} fillOpacity={.8} />
      </span>
      <span className="add-form-field-label">{labelText}</span>
    </AddFormItem_>
  )
}

const AddFormItem_ = styled.span`
  display: flex;
  flex-direction: row;
  align-items: center;
  background: ${bulmaColors.light};
  padding-left: 6px;
  padding-right: 6px;
  padding-top: 2px;
  padding-bottom: 2px;
  border-radius: 6px;
  border: 1px solid rgba(0,0,0,.09);
  cursor: pointer;
  box-shadow: 0 1px 3px rgba(0,0,0,0.08),0 1px 3px rgba(0,0,0,0.12);

  &:hover {
    border-color: rgba(0,0,0,.3);
  }

  .add-form-field-label {
    white-space: nowrap;
    font-size: 16px;
    opacity: .9;
    color: #000;
  }
`