class Elevator {
  constructor(){
    this.floor      = 0;
    this.MAXFLOOR   = 10;
    this.requests   = [];
  }

  start() {
    let updater = setInterval(update, 1000);
  }
  stop() {
    clearInterval(updater);
  }
  update() { }
  _passengersEnter() { }
  _passengersLeave() { }
  floorUp() { }
  floorDown() { }
  call() { }
  log() {
    console.log('Direction: up | Floor: 0');
  }
}

module.exports = Elevator;
