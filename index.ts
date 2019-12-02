// Import stylesheets
import './style.css';
import * as UTILS from './utils';


// compose Continious Passing style
const add1 = x => x + 1;
const mul3 = y => y * 3;
const composeCPS =  (f, g) => x => g(f(x));
const add1ThenMul3 = composeCPS(add1, mul3);
UTILS.showResult('add1ThenMul3', add1ThenMul3(4));


// async
const async = f => {
  return (x:number, cb:Function) => {
    setTimeout( () => { 
    cb(f(x))
    } , 1000);
  }
}
const asyncAdd1 = async(add1);
const asyncMul3 = async(mul3);
asyncAdd1(1, r => UTILS.showResult('async_add1', r));
asyncMul3(1, r => UTILS.showResult('async_Mul3', r));

// Continious Passing Functoin
const composeHOF = (f, g) => (x, cb) => {
  f(x, r => g(r, r => cb(r)))
}
composeHOF(asyncAdd1, asyncMul3)(
  4, r => UTILS.showResult('asyncAdd1ThenMul3CPS', r))


// Exec
const exec = f => x => ({
  exec: cb => {
    f(x, r => cb(r))
  }
});
exec(asyncAdd1)(4).exec(r => UTILS.showResult('exec(asyncAdd1)(4)', r));
exec(asyncMul3)(4).exec(r => UTILS.showResult('exec(asyncMul3)(4)', r));
const asyncAdd1exec = exec(asyncAdd1);
const asyncMul3exec = exec(asyncMul3);
const composeCPS_HOF_EXEC = (f, g) => x => ({
  exec: cb => {
    f(x).exec( r => g(r).exec(cb) )
  }
})
composeCPS_HOF_EXEC(asyncAdd1exec, asyncMul3exec)(4).exec(
  r => UTILS.showResult('composeCPS_HOF_EXEC', r));


// BindExec
const bindExec = (execF, f) => ({
  exec: cb => {
    execF.exec( y => f(y).exec(cb))
  }
})
bindExec(asyncAdd1exec(4), asyncMul3exec).exec(
  r => UTILS.showResult('bindExec', r)
);



// Create object
const createBindObject = exec => ({
  exec,
  bind(f) {
    return createBindObject( cb => {
      this.exec( r => f(r).exec(cb) )
    })
  } 
})

const toObject = f => x => {
  return createBindObject( cb => {
    f(x, cb)
  })
}

const objectAsyncAdd1 = toObject(asyncAdd1);
const objectAsyncMul3 = toObject(asyncMul3);

objectAsyncAdd1(4)
.bind(objectAsyncMul3)
.exec(
  r => UTILS.showResult('createBindObject', r)
)



// pipe
const createSubscribeObj = subs => ({
  subs,
  pipe(f) {
    return createSubscribeObj(cb => {
      this.subs( r => 
        f(r).subs(cb))
    })
  }
})
const toSubObject = f => x => {
  return createSubscribeObj( cb => {
    f(x, cb)
  })
}
const subObjectAsyncAdd1 = toSubObject(asyncAdd1);
const subObjectAsyncMul3 = toSubObject(asyncMul3);
subObjectAsyncAdd1(4)
.pipe(subObjectAsyncMul3)
.pipe(subObjectAsyncMul3)
.subs(
  r => UTILS.showResult('pipe', r)
)

