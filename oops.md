inheritance:
this lets us reuse code between classes
ref:product.js

polymorphism:
using the method without knowing the method

the class name should be represented in pascal case
js also has built in classes like Date()

this:
this only works inside and objects else this will be undefined

const obj={
a:2,
b:this.a
}
in the above example this will still be undefined cuz the object isnt created yet

function logThis(p1,p2){
console.log(this)
}

logThis()=> undefined;
logThis().call("hi",p1,p2)=> "hi"
the call() method will lets us change the value of this
the value of this will always be the first parameter when using call() method

arrow functions will never change the value of this

const obj={
method:()=>{
  console.log(this);
}
}
in the above example this will still be undefined cuz arrow functions wont change the value of this