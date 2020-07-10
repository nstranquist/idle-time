import React, { createContext } from 'react'
import moment from 'moment'

const TimerContext = createContext();

class TimerProvider extends React.Component {
  intervalId;

  state = {
    time: moment().format('hh:mm a'), // or object containing things
    settings: [],
    timeshift: [],
    alarms: [],
  };

  setTime = (newTime) => this.setState({ time: newTime })
  setTimeshift = (timeshift) => this.setState({ timeshift })
  setAlarms = (alarms) => this.setState({ alarms })

  addAlarm = (newAlarm) => {
    this.setState((prevState) => ({ alarms: [...prevState.alarms, newAlarm ]}))
  }
  updateAlarm = (alarmId, alarmData) => {
    const newAlarms = this.state.alarms.map(alarm => {
      if(alarm.id === alarmId)
        alarm = alarmData
      return alarm;
    })
    this.setState({ alarms: newAlarms })
  }
  removeAlarm = (alarmId) => {
    this.setState((prevState) => ({ alarms: prevState.alarms.filter(alarm => alarm.id === alarmId)}))
  }

  applyTimeshift = (timeValue) => {
    // console.log('applying timeshift to time value:', timeValue)
    // console.log('timeshift settings:', this.state.timeshift)

    let timeshiftedTime = timeValue;

    return timeshiftedTime;
  }

  // componentDidMount() {
  //   if(!this.intervalId)
  //     this.intervalId = setInterval(() => {
  //       this.setState({ time: moment() })
  //       // this.checkTime(this.state.time);
  //     }, 1000)
  // }

  componentWillUnmount() {
    if(this.intervalId) {
      clearInterval(this.intervalId)
      this.intervalId = undefined;
    }
  }

  checkTime(currentTime) {
    // console.log('the time in IdleTimer is:', currentTime)
  }

  render() {
    const { children } = this.props
    const { time, settings, alarms } = this.state
    const { setTimer } = this

    return (
      <TimerContext.Provider
        value={{
          time,
          settings,
          alarms,
          setTimer,
        }}
      >
        {children}
      </TimerContext.Provider>
    )
  }
}

export default TimerContext;

export { TimerProvider };