import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
// import moment from 'moment'
import { TimeBlockForm } from '../Timeblocking/TimeBlockForm'
// import { NewBlockForm } from '../Forms'
// import { FormItemStyled } from '../../styles/components'
import { emptyNewTask as emptyNewBlock } from '../../constants'
import { SubmitButton, CancelButton } from '../Buttons'
import { ClockInput } from '../Inputs'
import { ErrorText } from '../ErrorText'
import { boxShadows } from '../../styles/shadows.style'
import { bulmaColors } from '../../styles/bulma.colors'


export const NewBlock = ({
  onSubmit,
  onCancel,
}) => {
  const [newBlockData, setNewBlockData] = useState(emptyNewBlock)
  const [errors, setErrors] = useState(null)

  useEffect(() => {

    return () => resetData() // resets data on unmount
  }, [])

  // const handleChange = (e) => {
  //   setNewBlockData({
  //     ...newBlockData,
  //     [e.target.name]: e.target.value
  //   })
  // }

  const handleSave = ({ title, desc }, finished = true) => {
    console.log('saving new data:', title, desc)
    setNewBlockData({
      ...newBlockData,
      title,
      desc
    })
    if(finished)
      handleSubmit()
  }

  // const handleDateChange = (date, fieldName=null) => {
  //   console.log('new date:', date)
  //   // const startTime = moment(date).format('YYYY-MM-DD')

  //   const blockData = { ...newBlockData }

  //   if(fieldName)
  //     blockData[fieldName] = date;
  //   else
  //     blockData.startTime = date; // the default
    
  //   setNewBlockData(blockData)
  // }

  // const onHandleSubmitBody = (bodyData) => {
  //   // should update newBlockData's title and desc, then submit all data and reset the form
  //   const blockData = {
  //     ...newBlockData,
  //     title: bodyData.title,
  //     desc: bodyData.desc
  //   }
  //   setNewBlockData(blockData)
  //   console.log("submitting data:", blockData)
  //   onSubmit(blockData)
  //   resetData()
  // }

  const handleSubmitClock = (clockData) => {
    const blockData = {
      ...newBlockData,
      ...clockData,
    }
    setNewBlockData(blockData)
  }

  const handleSubmit = (e = undefined) => {
    if(e)
      e.preventDefault()

    if(!newBlockData)
      setErrors("data is undefined")
    else if (!newBlockData.title || newBlockData.title === "")
      setErrors("Title field is required")
    else {
      console.log('submitting data:', newBlockData)
      onSubmit(newBlockData)
    }
  }

  const resetData = () => {
    setNewBlockData(emptyNewBlock)
    setErrors(null)
  }

  return (
    <>
      {errors && <ErrorText message={errors} clearErrors={() => setErrors(null)} />}

      <StyledTimeBlock
        className="time-block-container"
        style={{position: 'relative'}}
      >

      {newBlockData.duration && (
        <div className="duration-text-container">
          <span className="duration-text">{newBlockData.duration}</span>
        </div>
      )}

      {/* Holds the padding, layout, and stuff */}
      <div className="time-block-inner">
        <div className="block-left" style={{position: 'relative'}}>
          <ClockInput
            timeData={{
              startTime: newBlockData.startTime,
              duration: newBlockData.duration,
            }}
            serverErrors={null}
            onSave={handleSubmitClock}
            onCancel={() => null}
          />
        </div>
        <div className="block-body">
          <TimeBlockForm
            timeData={{
              title: newBlockData.title,
              desc: newBlockData.desc,
            }}
            handleSave={handleSave}
            handleCancel={onCancel}
          />
        </div>
      </div>
    </StyledTimeBlock>

      {/* Put Buttons Here */}
      <div className="submit-button-container">
        <CancelButton handleClick={onCancel} />
        <SubmitButton handleClick={() => handleSubmit()} />
      </div>
    </>
  )
}
const StyledTimeBlock = styled.div`
  // container styles:
  margin-bottom: 8px;
  display: flex;
  align-items: center;

  .time-block-inner {
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 6px; // note: adjust the padding to make responsive
    background: ${bulmaColors.light};
    border-radius: 8px;
    border: 1px solid rgba(0,0,0,.15);

  }

  h3 {
    margin-bottom: 0;
  }
  p {
    margin-top: .6666em;
  }

  .block-left {
    padding-right: 8px;
  }
  
  .block-body {
    flex: 1;
    display: flex;
    align-items: center;
  }

  .drag-icon-container {
    padding: 6px;
    border-radius: 50%;
    cursor: pointer;
    background-color: inherit;
    transition: background-color .2s ease-in-out;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      background-color: rgba(0,0,0,.06);
      transition: background-color .2s ease-in-out;
    }

    .drag-icon {
      flex: 1;
      background-color: inherit;
    }
  }

  .duration-text-container {
    // padding-right: 10px;
    width: 40px;

    .duration-text {
      font-size: 16px;
      line-height: 20px;
      text-align: center;
      align-self: center;
      margin: 0 auto;
    }
  }
`
const NewBlockStyled = styled.div`


  .submit-button-container {
    padding-top: 6px;
    margin-bottom: 6px;
    text-align: center;

    .add-task-button,
    .submit-task-button {
      // border-radius: 0;
      font-family: montserrat, sans-serif;
      font-style: normal;
      box-shadow: ${boxShadows.shadow2};
    }
  }
`
const NewBlockFormStyled = styled.form`
  // margin-right: 30px !important;

  .form-input {
    display: block;
    width: 100%;
  }
  
`

  // return (
  //   <>
  //     <NewBlockStyled className="add-task-card task-card">
  //
  //       <div className="task-left">
  //         <ClockInput
  //           timeData={newBlockData} // or 'dateData', includes: startTime, duration, endTime,
  //           serverErrors={null} // could be undefined
  //           onSubmit={onSubmit} // aka 'onSubmit'
  //           onCancel={onCancel}
  //         />
  //       </div>
  //       <div className="task-body">
  //         <NewBlockFormStyled
  //           className="time-block-form"
  //           onSubmit={handleSubmit}
  //           onKeyDown={(e) => {
  //             console.log('event:', e)
  //             if(e.keyCode === 13) // 'enter' key
  //               handleSubmit();
  //             else if(e.keyCode === 27) // 'escape' key
  //               onCancel();
  //           }}
  //         >
  //           {newBlockData && (
  //             <>
  //               <FormItemStyled className="form-item">
  //                 <input
  //                   autoFocus
  //                   className={"form-input form-h3"}
  //                   // className={inputClasses + " form-h3"}
  //                   type="text"
  //                   name="title"
  //                   value={newBlockData.title}
  //                   onChange={handleChange}
  //                 />
  //               </FormItemStyled>
  //               {/* TODO: click '+ add description' to show / focus on this input. And 'X' to close / erase it */}
  //               <FormItemStyled className="form-item">
  //                 <input
  //                   className="form-input form-p"
  //                   type="text"
  //                   name="desc"
  //                   value={newBlockData.desc}
  //                   onChange={handleChange}
  //                 />
  //               </FormItemStyled>
  //             </>
  //           )}
  //
  //         </NewBlockFormStyled>
  //       </div>
  //     </NewBlockStyled>
  //
  //     {/* Put Buttons Here */}
  //     <div className="submit-button-container">
  //       <CancelButton handleClick={onCancel} />
  //       <SubmitButton handleClick={() => handleSubmit()} />
  //     </div>
  //   </>
  // )