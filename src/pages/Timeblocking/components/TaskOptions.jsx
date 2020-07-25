import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { OutsideAlerter } from '../../../hoc/OutsideAlerter'
import { selectPresetTaskIds } from '../../../store/Presets/selectors'

export const TaskOptions = ({
  taskId,
  handleSavePreset,
  handleRemovePreset,
  handleOutsideClick,
  handleDelete,
}) => {
  const [isPreset, setIsPreset] = useState(undefined)
  const taskIds = useSelector(selectPresetTaskIds)

  useEffect(() => {
    if(taskId) {
      if(taskIds && taskIds.length > 0) {
        console.log('taskIds:', taskIds)
        if(taskIds.includes(taskId))
          setIsPreset(true)
        else
          setIsPreset(false)
      }
      else setIsPreset(false)
    }
    else console.log('error... taskIds:', taskIds)
  }, [taskId, taskIds])

  return (
    <OutsideAlerter handleOutsideClick={handleOutsideClick}>
      <div className="options-menu">
        {isPreset !== undefined
          ? isPreset
            ? <p className="option" onClick={handleRemovePreset} style={{opacity: .7}}>Saved!</p>
            : <p className="option" onClick={handleSavePreset}>Save as Preset</p>
          : <p className="option" style={{opacity: .7}}>loading...</p>
        }
        <p className="option" onClick={handleDelete}>Delete</p>
      </div>
    </OutsideAlerter>
  )
}
