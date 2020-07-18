import React, { createContext } from 'react'
import moment from 'moment'

const TimerContext = createContext();

class TimerProvider extends React.Component {
  intervalId;

  state = {
    time: moment().format('h:mm a'), // or object containing things
    // settings: {

    // },
    timeshiftActive: false,
    timeshift: {
      excludeDigits: [],
      roundUpBy: 0, // or null
    }, // or null
    alarms: [],
  };

  setTime = (newTime) => this.setState({ time: newTime })
  // setTimeshift = (timeshift) => this.setState({ timeshift })
  // setAlarms = (alarms) => this.setState({ alarms })

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

  setTimeshift = (value, settings=null) => this.setState({ timeshiftActive: value, timeshift: null })

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

  render() {
    return (
      <TimerContext.Provider
        value={{
          time: this.state.time,
          setTimeshift: this.setTimeshift,
          applyTimeshift: this.applyTimeshift,
          addAlarm: this.addAlarm,
          updateAlarm: this.updateAlarm,
          removeAlarm: this.removeAlarm,
          // updateSettings: this.updateSettings,
        }}
      >
        {this.props.children}
      </TimerContext.Provider>
    )
  }
}

export default TimerContext;

export { TimerProvider };