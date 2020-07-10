import React from 'react'

export const ErrorText = ({
  message,
  clearErrors = () => undefined
}) => {
  return (
    <div className="errors" style={{textAlign:"center",marginTop:10,marginBottom:7,display:'flex',alignItems:'center'}}>
      <p className="error-text" style={{color:"rgba(255,0,0,.75)",fontSize:16,flex:1,marginBottom:0}}>*{message}</p>
      <a onClick={clearErrors} className="delete" style={{cursor:'pointer',marginLeft:6}}></a>
    </div>
  )
}
