import React, { useState, useEffect } from 'react'
import { ErrorNotification } from '../../components/ErrorText'
import { deepEqual } from '../../utils/deepEqual'

export const SettingsModal = ({
  timetrackingSettings,
  submitForm,
  cancelForm
}) => {
  const [formData, setFormData] = useState(timetrackingSettings)
  const [formErrors, setFormErrors] = useState(null)
  const [isModified, setIsModified] = useState(false)

  useEffect(() => {
    if(deepEqual(formData, timetrackingSettings))
      setIsModified(false)
    else setIsModified(true)
  }, [formData])

  const handleSubmit = (e=undefined) => {
    if(e) e.preventDefault()
    
    // submit form data
    if(!isModified)
      setFormErrors("your settings have not changed yet")
  }
  
  return (
    <div className="modal">
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Timetracking Settings</p>
          <button onClick={cancelForm} className="delete" aria-label="close"></button>
        </header>
        <section className="modal-card-body">
          {formErrors && <ErrorNotification message={formErrors} clearErrors={() => setFormErrors(null)} />}
          {/* Fields: enableTracking: Boolean, enableTimeGoals: Boolean, timeGoals  */}
          <form className="form" onSubmit={handleSubmit}>

          </form>
        </section>
        <footer className="modal-card-foot">
          <button disabled={!isModified} onClick={submitForm} className="button is-link">Save changes</button>
          <button onClick={cancelForm} className="button is-link is-ghost">Cancel</button>
        </footer>
      </div>
    </div>
  )
}
