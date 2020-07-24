// A Timer Class Object

export class Timer {
  time;
  activeId;
  isActive;
  date;
  paused;
  stopped;

  constructor() {
    this.date = new Date();
    this.time = 0;
    this.paused = false;
    this.stopped = false;
    this.activeId = undefined;
  }

  getTime = () => this.formatTime();
  getRawTime = () => this.time;

  getSeconds = () => Math.floor(this.time % 60);
  getMinutes = () => Math.floor(this.time / 60);

  formatTime = () => {
    // assumes a number representing seconds
    // expects a time-formatted string
    let seconds = this.getSeconds();
    let minutes = this.getMinutes();

    if(seconds < 10)
      seconds = "0" + seconds;
    if(minutes < 10)
      minutes = "0" + minutes;
    
    return `${minutes}:${seconds}` // 00:00 format (minutes:seconds)
  }

  startTimer = () => {
    if(this.paused) this.paused = false;
    if(this.stopped) this.stopped = false;
    
    this.activeId = setInterval(() => {
      if(!this.paused && !this.stopped) {
        console.log('call interval')
        this.time++
      }
    }, 1000);
  }

  pauseTimer = () => {
    // pause the interval mechanism, clear the interval but don't reset the time
    this.paused = true;
    clearInterval(this.activeId)
    this.activeId = undefined;
  }

  resumeTimer = () => {
    if(!this.stopped)
      this.paused = false;
    else
      this.resetTimer();
  }

  stopTimer = () => {
    this.stopped = true;
    if(this.paused) this.paused = false;
    if(this.activeId) {
      clearInterval(this.activeId)
      this.activeId = undefined;
    }
    this.time = 0;
  }

  resetTimer = () => {
    clearInterval(this.activeId)
    this.activeId = undefined;
    this.date = new Date();
    this.time = 0;
    this.paused = false;
    this.stopped = false;
  }
}
