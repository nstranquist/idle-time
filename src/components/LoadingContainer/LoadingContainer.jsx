import React from 'react'

export const LoadingContainer = ({
  height = 50
}) => {
  return (
    <div style={{height: height, }}>
      <p style={{marginBottom:0}}>loading...</p>
    </div>
  )
}
