class Car {
  brand;
  model;
  speed =0;
  constructor(carDetails) {
    this.brand = carDetails.brand;
    this.model = carDetails.model;

  }
  displayInfo(){
    console.log(`${this.brand} ${this.model} ${this.speed} Km/Hr`  )
  }
  go(){
    this.speed<200? this.speed+=5:alert("cant increase speed");

  }
  brake(){
    this.speed>0? this.speed-=5: alert("cant break")
  }
}

let car1 = new Car({
  brand: "Toyota",
  model: "corolla",
});

let car2 = new Car({
  brand: "Tesla",
  model: "model 3",
});

// console.log(car1);
// console.log(car2);
let run =1
while(run<=39){
car1.go();
car2.go()
  run++
}


car1.displayInfo();
car2.displayInfo();
