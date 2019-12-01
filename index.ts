// Import stylesheets
import './style.css';
import * as UTILS from './utils'

// composeF
const add1 = x => x + 1;
const mul3 = y => y * 3; 

const composeF = (f, g) => x => g(f(x));

const add1ThenMul3 = composeF(add1, mul3)
UTILS.showResult('add1ThenMul3', add1ThenMul3(4));

// async add callback

// Hight Order async
const asyncAdd1 = (x, cb) => {
  setTimeout( () => { 
    cb(x)
    } , 1000);
}

asyncAdd1(1, r => console.log(r));

// split ()()

// creaete object 

// add exec

// use exec as first argument