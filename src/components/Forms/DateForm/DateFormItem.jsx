import React, { useState } from 'react'
import styled from 'styled-components'

export const DateFormItem = ({
  label,
  inputType="text",
  value,
  onValueChange,
}) => {
  const [data, setData] = useState(undefined)
  const [showInput, setShowInput] = useState(false)

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    })
  }

  if(showInput)
    return (
      <DateFormItemStyled>
        <label htmlFor={label}>{label}</label>
        <input
          type={inputType}
          name={label}
          value={value}
          onValueChange={onValueChange}
        />
      </DateFormItemStyled>
    )
  return (
    <DateFormItemStyled>
      <div>show {label}</div>
    </DateFormItemStyled>
  )
}

const DateFormItemStyled = styled.div`

`