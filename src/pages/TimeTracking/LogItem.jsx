import React from 'react'
import { TimelogItemStyled } from './TimeTracking'

export const TimelogItem = ({
  timelog,
  // handleUpdateLog,
  handleRemoveLog,
}) => {
  return (
    <TimelogItemStyled className="timelog-item">
      <div className="item-left">
        <p className="log-text is-size-5" style={{marginBottom:'.2rem'}}>{timelog.title}</p>
        { timelog.desc && <div className="log-text">{timelog.desc}</div> }
      </div>
      <div className="item-right">
        <p className="log-text log-duration-text">{timelog.duration}</p>
        <button className="button is-small-is-rounded is-outline is-danger is-light" onClick={() => handleRemoveLog(timelog._id)}>delete</button>
      </div>
    </TimelogItemStyled>
  )
}
