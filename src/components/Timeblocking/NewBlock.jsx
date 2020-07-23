import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
// import moment from 'moment'
import { TimeBlockForm } from './TimeBlockForm'
// import { NewBlockForm } from '../Forms'
// import { FormItemStyled } from '../../styles/components'
import { emptyNewTask as emptyNewBlock } from '../../constants'
import { SubmitButton, CancelButton } from '../Buttons'
import { ClockInput } from '../Inputs'
import { ErrorText } from '../ErrorText'
import { FormItemStyled } from '../../styles/components'
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewBlockData({ ...newBlockData, [name]: value })
  }

  const handleSave = ({ title=undefined, desc=undefined }, finished = true) => {
    if(title && desc)
      setNewBlockData({ ...newBlockData, title, desc })
    else if (title) setNewBlockData({ ...newBlockData, title })
    else if (desc) setNewBlockData({ ...newBlockData, desc })

    if(finished)
      handleSubmit()
  }

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

  const handleKeyDown = (e) => {
    if(e.keyCode === 13) // enter
      handleSubmit();
    if(e.keyCode === 27) { // esc
      onCancel();
    }
  }

  return (
    <>
      {errors && <ErrorText message={errors} clearErrors={() => setErrors(null)} />}

      <StyledTimeBlock
        className="time-block-container"
        style={{position: 'relative'}}
      >

        {newBlockData.duration && (
          <DurationText className="duration-text-container" priority={newBlockData.priority ? newBlockData.priority : -1}>
            <span className="duration-text">{newBlockData.duration}</span>
          </DurationText>
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
            <TimeBlockFormStyled className="new-block-form time-block-form" onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
              <FormItemStyled className="form-item">
                <input
                  id="form-title"
                  autoFocus
                  className="form-input form-h3"
                  type="text"
                  name="title"
                  value={newBlockData.title}
                  onChange={handleChange}
                />
              </FormItemStyled>
              <FormItemStyled className="form-item">
                <span className="desc-container">
                  <input
                    id="form-desc"
                    className="form-input form-p is-size-6"
                    type="text"
                    name="desc"
                    value={newBlockData.desc}
                    onChange={handleChange}
                  />
                </span>
              </FormItemStyled>
            </TimeBlockFormStyled>
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


const TimeBlockFormStyled = styled.form`
  padding-right: calc(18px + 3rem); // 6px + 12px + 3rem
  flex: 1;

  .form-input {
    margin-left: 6px;
  }
  .form-title {
    flex: 1;
    display: block;
    width: 100%;
  }
`
const StyledTimeBlock = styled.div`
  // container styles:
  margin-bottom: 8px;
  display: flex;
  align-items: center;

  .time-block-spacer {
    flex: 1;
    background: ${bulmaColors.light};
    border-radius: 8px;
    border: 1px solid rgba(0,0,0,.15);
    // overflow-y: auto;
    // transition: .25s ease-in-out;
  }
  .time-block-inner {
    // flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 6px 0 8px; // note: adjust the padding to make responsive
    // background-color: ${props => props.isCollapsed ? "none" : bulmaColors.light};
    // border-radius: ${props => props.isCollapsed ? "0" : "8px"};
    // border: ${props => props.isCollapsed ? "none" : "1px solid rgba(0,0,0,.15)"};
    // transition: .25s ease-in-out;
  }

  h3 {
    margin-bottom: 0;
  }
  p {
    margin-top: .6666em;
  }

  .block-left {
    padding-top: 12px;
    padding-bottom: 12px;
    padding-right: 8px;
  }
  
  .block-body {
    flex: 1;
    display: flex;
    align-items: center;
    padding-top: 12px;
    padding-bottom: 12px;
    padding-left: 4px;
  }
  .block-right {
    display: flex;
    flex-direction: row;
    align-items: center;

  }
  

  .drag-icon-container {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 6px;
    border-radius: 50%;
    cursor: pointer;
    background-color: inherit;
    transition: background-color .2s ease-in-out;

    &:hover {
      background-color: rgba(0,0,0,.06);
      transition: background-color .2s ease-in-out;
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
const DurationText = styled.div`
  &.duration-text-container {
    width: 54px;
    text-align: center;
    // padding-right: 10px;

    .duration-text {
      cursor: pointer;
      font-size: 16px;
      line-height: 20px;
      padding: 6px;
      text-align: center;
      align-self: center;
      margin: 0 auto;
      border-radius: 50%;
      border: 1px solid rgba(0,0,0,.3);
      // text-decoration: underline;

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