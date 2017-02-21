const _        = require('underscore-node');

/*====
The elevator will always head towards requests[0], servicing every floor along the
way for which it has a request. However, requests are sorted based on the
elevator's direction everytime a new request is submitted. I.e. if the elevator
is going down, requests[0] is the lowest requested floor; otherwise, it's the
highest, because we then reverse the sorting. This means that the elevator
prioritizes the oldest request, but will try to reverse direction as infrequently
as possible. I think it's better suited for really tall buildings with dozens of
floors and potentially hundreds of passengers, where it probably makes more
sense to run like a train instead of cashier. Those buildings often have multiple
elevators anyway.
====*/

class Elevator {

  constructor(){
    this.floor       = 0;
    this.MAXFLOOR    = 10;
    this.passengers  = [];
    this.requests    = [];
    this.waitingList = [];
    this.direction   = 'rest';
  }


  start() {
    this.updater = setInterval(() => {
      this.update();
    }, 1000);
  }

  stop() {
    clearInterval(this.updater);
  }

  update() {
    console.log('update', this.requests);
    if (this.requests[0]) {
      if (this.requests.includes(this.floor)) {
        console.log('here');
        this._passengersLeave(this.floor);
        this._passengersEnter(this.floor);
      }

      //Up if the next request is higher
      if      (this.requests[0] > this.floor) {
        this._floorUp();
      }
      //Down if the next request is lower
      else if (this.requests[0] < this.floor) {
        this._floorDown();
      }
      this.requests.splice(this.requests.indexOf(this.floor));
    }
    else {
      //stops elevator
      this.stop();
    }

    this.log();
  }

  _passengersEnter(floor) {
    const passengers = this.waitingList.filter((p) => p.originFloor === floor);
    console.log('enter: ' + passengers);
    if (passengers.length) {
      console.log(passengers.length + ' got on');
    }

    this.passengers.push(...passengers);
    passengers.forEach((p) => {
      this.waitingList.splice(this.passengers.indexOf(p), 1);
    });
  }

  _passengersLeave(floor) {
    const passengers = this.passengers.filter((p) => p.destinationFloor === floor);
    console.log('leave: ' + passengers);
    if (passengers.length) {
      console.log(passengers.length + ' got off');
    }

    passengers.forEach((p) => {
      this.passengers.splice(this.passengers.indexOf(p), 1);
    });
  }

  _floorUp() {
    if (this.floor < this.MAXFLOOR) {
      if (this.direction !== 'up') {
        console.log('Going up...');
        this.direction = 'up';
      }
      this.floor++;
    }
  }

  _floorDown() {
    if (this.floor > 0) {
      if (this.direction !== 'down') {
        console.log('Going up...');
        this.direction = 'down';
      }
      this.floor--;
    }
  }

  call(person) {
    //starts elevator
    if (!this.requests[0]) {
      this.start();
    }

    this.waitingList.push(person);
    if (!this.requests.includes(person.destinationFloor)) {
      this.requests.push(person.destinationFloor);
      this.requests.sort();
      if (this.direction === 'up') {
        this.requests.reverse();
      }
    }

  }

  log() {
    console.log(`Direction: ${this.direction} | Floor: ${this.floor}`);
  }
}

module.exports = Elevator;
