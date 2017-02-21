const Elevator = require('./elevator.js');
const Person   = require('./person.js');
const _        = require('underscore-node');

const e = new Elevator();

const possibleFloors = _.range(0, e.MAXFLOOR + 1);

const traffic = [];
let counter = 0;
_.times(5, () => {
  let origin = _.sample(possibleFloors);
  let dest   = _.sample(possibleFloors);
  let p = new Person('Thing ' + counter++, origin, dest);

  e.call(p);
  traffic.push(p);
});

traffic.sort((a,b) => a.originFloor - b.originFloor);
console.log(traffic);
