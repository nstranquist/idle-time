import React from 'react'

export const ErrorNotification = ({
  message,
  clearErrors = () => undefined,
}) => {

  return (
    <div className="notification is-danger is-light">
      <button className="delete" onClick={clearErrors}></button>
      {message}
    </div>
  )
}
