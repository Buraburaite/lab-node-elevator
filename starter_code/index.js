const Elevator = require('./elevator.js');
const Person   = require('./person.js');

const e = new Elevator();
let p = new Person();

e.start();
e.floorUp();
e.floorDown();
