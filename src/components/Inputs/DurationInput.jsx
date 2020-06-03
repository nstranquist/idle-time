import React, { useState } from 'react'
import { Watch } from 'react-feather'
import { bulmaColors } from '../../styles/bulma.colors' // note: just pass as prop?
import { OutsideAlerter } from '../../hoc/OutsideAlerter'

export const DurationInput = ({
  durationData,
  handleDurationChange,
  errors,
}) => {
  const [showDropdown, setShowDropdown] = useState(false)

  return (
    <span className="icon dropdown-icon" onClick={() => setShowDropdown(true)}>
      <Watch size={24} style={{color: errors ? bulmaColors.danger : 'initial'}} />
      {showDropdown && (
        <OutsideAlerter handleOutsideClick={() => setShowDropdown(false)}>
          <DurationModal
            durationData={{
              duration: durationData.duration,
              allDay: false,
            }}
            onSubmit={handleDurationChange}
          />
        </OutsideAlerter>
      )}
    </span>
  )
}
