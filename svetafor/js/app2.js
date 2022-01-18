"use strict";

let circle = document.getElementsByClassName("circle");

function counter(setCounterOne, setCounterTwo, classIndex0, classIndex1, classIndex2) {
  
    let timeoutId = setInterval(function () { 
    classIndex0.classList.add("circleBGColor1");
    classIndex1.innerHTML = setCounterOne;
    classIndex1.classList.add("circleColor1");
    

    if(setCounterOne <= 3) {
      classIndex1.innerHTML = "";
      classIndex1.classList.add("circleBGColor2");
    }
    setCounterOne--;
    
    if (setCounterOne == 0) {
      clearInterval(timeoutId);
      classIndex1.classList.remove("circleBGColor2", "circleColor1");
      classIndex0.classList.remove("circleBGColor1");
      let timeId = setInterval(function() {
       
        classIndex2.classList.add("circleBGColor3");
        classIndex1.innerHTML = setCounterTwo;
        classIndex1.classList.add("circleColor2");
        
        if(setCounterTwo <= 3) {
         
          setTimeout(function() {
            classIndex2.classList.remove("circleBGColor3");
          }, 500);
        }
        if(setCounterTwo == 0) {
          clearInterval(timeId);
          classIndex1.innerHTML = "";
          classIndex1.classList.remove("circleColor2");
        }
        setCounterTwo--;
      }, 1000);
    }
  },1000);
}

let totalCounter;
function sumTimeout(counterOne, counterTwo) {
    let sumCounterOne = counterOne * 1000;
    let sumCounterTwo = counterTwo * 1000;
  totalCounter = (sumCounterOne + sumCounterTwo) + 1000;
  return totalCounter;
}

setTimeout(function restartCounter() {
  
    let addCounterOne = 10;
    let addCounterTwo = 7;
  
  sumTimeout(addCounterOne, addCounterTwo);
  
  counter(addCounterOne, addCounterTwo, circle[0], circle[1], circle[2]);
  setTimeout(restartCounter, totalCounter);
},100);