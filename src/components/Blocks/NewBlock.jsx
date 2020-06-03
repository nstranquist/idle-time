import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import moment from 'moment'
import { NewBlockForm } from '../Forms'
import { ClockInput } from '../Inputs'


const emptyNewBlock = {
  title: "",
  desc: "",
  startTime: moment('YYYY-MM-DD'),
  duration: 60,
  endTime: undefined,
}

export const NewBlock = ({
  onSubmit,
  onCancel,
}) => {
  const [newBlockData, setNewBlockData] = useState(emptyNewBlock)
  const [errors, setErrors] = useState(null)

  useEffect(() => {

    return () => resetData()
  }, [])

  const handleDateChange = (date, fieldName=null) => {
    console.log('new date:', date)
    // const startTime = moment(date).format('YYYY-MM-DD')

    const blockData = { ...newBlockData }

    if(fieldName)
      blockData[fieldName] = date;
    else
      blockData.startTime = date; // the default
    
    setNewBlockData(blockData)
  }

  const onHandleSubmitBody = (bodyData) => {
    // should update newBlockData's title and desc, then submit all data and reset the form
    const blockData = {
      ...newBlockData,
      title: bodyData.title,
      desc: bodyData.desc
    }
    setNewBlockData(blockData)
    console.log("submitting data:", blockData)
    onSubmit(blockData)
    resetData()
  }

  const onHandleSubmitClock = (clockData) => {
    // should update the clock data, but not submit component
    const blockData = {
      ...newBlockData,
      ...clockData,
    }
    setNewBlockData(blockData)
  }

  const resetData = () => {
    setNewBlockData(emptyNewBlock)
    setErrors(null)
  }

  return (
    <NewBlockStyled className="add-task-card task-card">
      <div className="task-left">
        <ClockInput
          timeData={newBlockData} // or 'dateData', includes: startTime, duration, endTime,
          serverErrors={null} // could be undefined
          onSubmit={onSubmit} // aka 'onSubmit'
          onCancel={onCancel}
        />
        {/* <DateForm
          timeData={{
            startTime: newBlockData.startTime,
            duration: newBlockData.duration,
            endTime: newBlockData.endTime,
          }}
          onSubmit={handleDateChange}
        /> */}
      </div>
      <div className="task-body">
        <NewBlockForm
          newBlockData={{
            title: newBlockData.title,
            desc: newBlockData.desc
          }}
          onSubmit={onHandleSubmitBody}
          onCancel={onCancel}
        />
      </div>
    </NewBlockStyled>
  )
}

const NewBlockStyled = styled.div`

`
