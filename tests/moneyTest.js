import{formatCurrency} from"../js/utils/money.js"


console.log("test suite money");
if(formatCurrency(2096)=== "21.00"){
  console.log("passed1");
}
else{
  console.log("failed1");
}


if(formatCurrency(0)=== "0.00"){
  console.log("passed2");
}
else{
  console.log("failed2");
}

if(formatCurrency(2004)=== "20.00"){
  console.log("passed3");
 
}
else{
  console.log("failed3");
}