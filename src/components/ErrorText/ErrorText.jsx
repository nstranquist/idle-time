import React from 'react'

export const ErrorText = ({
  message,
}) => {
  return (
    <div className="errors" style={{textAlign:"center",marginTop:10,marginBottom:7}}>
      <p className="error-text" style={{color:"rgba(255,0,0,.75)",fontSize:16}}>*{message}</p>
    </div>
  )
}
