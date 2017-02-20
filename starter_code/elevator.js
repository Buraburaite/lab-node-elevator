class Elevator {
  constructor(){
    this.floor      = 0;
    this.MAXFLOOR   = 10;
    this.requests   = [];
    this.direction  = 'rest';
  }


  start() {
    this.updater = setInterval(this.update(), 1000);
  }
  stop() {
    clearInterval(this.updater);
  }
  update() {
    this.log();
  }
  _passengersEnter() { }
  _passengersLeave() { }
  floorUp() {
    if (this.floor < this.MAXFLOOR) {
      this.direction = 'up';
      this.floor++;
    }
    this.log();
  }
  floorDown() {
    if (this.floor > 0) {
      this.direction = 'down';
      this.floor--;
    }
    this.log();
  }
  call() { }
  log() {
    console.log(`
      Direction: ${this.direction} | Floor: ${this.floor}
      `);
  }
}

module.exports = Elevator;
