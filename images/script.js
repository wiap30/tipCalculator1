// TODO: Handle user input of initial bill value
// TODO: Handle user selection of the gratuity, both default and custom values
// TODO: Handle user input of number of people to split the bill between
// TODO: Handle calculation of tip per person and total bill per person
// TODO: Handle resetting the calculator
// TODO: Handle appropriate styling for gratuities
// -> If a pre-set gratuity is selected, it should appear active.
// -> If no a pre-set gratuity is selected, or the user is providing a custom tip,
//    the buttons should NOT have appear active
// TODO: Handle appropriate styling for reset btn
// -> If there has been no value calculated, the reset btn should not work
// -> If the tips have been calculated, the reset btn should work

// !! Figma File Link :: https://www.figma.com/file/QcBtJ2rFIPtAcCb0bxmHea/tip-calculator-app?type=design&node-id=0-1&t=vneSsg9Qw4qG6emq-0

// Note: The elements needed have been queried for you here
// ** Query elements
/*const bill = document.getElementById("bill");
const gratuityBtns = document.querySelectorAll(".gratuity");
const customGratuity = document.getElementById("custom-gratuity");
const people = document.getElementById("people");
const splitTip = document.getElementById("split-tip");
const splitTotal = document.getElementById("split-total");
const resetBtn = document.getElementById("reset");

// ** Your work goes below here

// ** Event Listeners
document.getElementById("reset").addEventListener("click", () => {
  document.querySelectorAll("input").forEach((i) => (i.value = ""));
  resetGratuities();
});

// query button, add event listener, click => reset all gratuities, set active state, set gratuity value
gratuityBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    // reset all gratuities
    resetGratuities();
    btn.classList.add("active");
    console.log("button on 42: ==> ", btn);
    console.log("button on 42: ==> ", parseInt(btn.value));

    handleUserInput();

    // if(validateBillTotal() && validateNumPeople()){
    //   handleUserInput();
    // }
  });
});
customGratuity.addEventListener("click", () => resetGratuities());
customGratuity.addEventListener("blur", () => {
  if (validateBillTotal() && validateCustomTip() && validateNumPeople()) {
    handleUserInput();
  }
});

// ** Functionality
// function resetCalculator(){
//   resetGratuities();
// }

// function validateInputs

function resetGratuities() {
  //  document.querySelectorAll('input').forEach(i => i.value = '');
  gratuityBtns.forEach((btn) => btn.classList.remove("active"));
  customGratuity.value = "";
}

function getUserInputs() {
  const billTotal = parseFloat(bill.value);
  const tipPercentage = getTipValue();
  const numPeople = parseInt(people.value);

  return {
    billTotal: billTotal,
    tipPercentage: tipPercentage,
    numPeople: numPeople,
  };
}

function getTipValue() {
  const defaultTip = document.getElementsByClassName("active").value;
  console.log("default tip: ", defaultTip);
  let tip = null;
  if (typeof parseInt(defaultTip) == "number") {
    console.log(defaultTip, " <== this is the default tip");
    tip = parseInt(defaultTip);
    console.log("Tip ln 86: ", tip);
  } else if (validateCustomTip()) {
    tip = customGratuity.value;
    console.log("Tip ln 90: ", tip);
  }

  return tip * 0.01;
}

function validateCustomTip() {
  const checkTip = parseFloat(customGratuity.value);
  console.log("checking custom tip:", typeof checkTip);
  if (typeof checkTip !== "number") {
    throw new Error("Input a valid number");
  }
  return true;
}

function validateNumPeople() {
  const numPeople = parseInt(people.value);
  if (typeof numPeople !== "number") {
    throw new Error(
      `Your input of earthlings can only be a positive interger.`
    );
  }
  return true;
}

function validateBillTotal() {
  const billTotal = parseInt(bill.value);
  if (typeof billTotal !== "number") {
    throw new Error(
      `Your input of moneys can only be a non-zero positive number.`
    );
  }
  return true;
}

// ids for the tip element split-tip && split-total

function handleUserInput() {
  console.log("Handling inputs");
  if (validateBillTotal() && validateCustomTip() && validateNumPeople()) {
    console.log("Calculating...");
    const { billTotal, numPeople, tipPercentage } = getUserInputs();
    console.log(billTotal, numPeople, tipPercentage);
    const tipAmount = billTotal * tipPercentage;
    const billWithTip = tipAmount + billTotal;

    const tipPerPerson = tipAmount / numPeople;
    const billPerPerson = billWithTip / numPeople;

    document.getElementById("split-tip").innerHTML = `$ ${tipPerPerson}`;
    document.getElementById("split-total").innerHTML = `$ ${billPerPerson}`;
  }
}*/

//DOM Variable
const buttons = document.querySelectorAll(".button");
const buttonSelected = document.getElementsByClassName("active"); //The selected button with the percentage.
const reset = document.querySelector("#main-right #button-reset");
const inputs = document.querySelectorAll(".input");
const resultTip = document.querySelector("#result-tip");
const resultTotal = document.querySelector("#result-total");
const bill = document.querySelector("main #main-left #bill .input");
const numberOfPeople = document.querySelector(
  "main #main-left-bottom #number-people .input"
);
const errorMessage = document.querySelector(".if-zero-number");
const customTip = document.querySelector(".custom");

//Event Listeners

customTip.addEventListener("click", calculateCustomTip);

buttons.forEach((button) => {
  button.addEventListener("click", calculateTip);
});

//Reset

reset.addEventListener("click", resetAll);

reset.addEventListener("mouseenter", () => {
  reset.getElementsByClassName.backgroundColor = "var(--lightGrayishCyan)";
});

reset.addEventListener("mouseleave", () => {
  reset.getElementsByClassName.backgroundColor = "";
});

//Oninput

bill.oninput = function (event) {
  dealWithResetButton();

  if (
    customTip.value !== "" &&
    (numberOfPeople.value !== "" || numberOfPeople.value > 0)
  ) {
    calculate();
  }
};

customTip.oninput = function () {
  dealWithResetButton();

  if (
    (bill.value !== "" || bill.value < 0) &&
    (numberOfPeople.value !== "" || numberOfPeople.value > 0)
  ) {
    calculate();
  }
};

numberOfPeople.oninput = function () {
  dealWithResetButton();

  if (numberOfPeople.value <= 0 || numberOfPeople.value === "") {
    errorMessage.innerText = `cant be zero`;
    errorMessage.innerText.style.color = "red";
    numberOfPeople.style.borderColor = "red";
    resultTip.innerText = "----";
    resultTotal.innerText = "----";
  } else {
    errorMessage.innerText = ``;
    numberOfPeople.style.borderColor = "";
    calculate();
  }
};

// Functions

function calculate() {
    let tipPerPerson;
    let totalPerPerson;
    let tipPercentage;

    if (buttonSelected.length == 0) {
        tipPercentage = 0;
    } else {
        if (customTip.classList.contains('active')) {
            tipPercentage = customTip.value;
        } else {
            tipPercentage = buttonSelected[0].value;
        }
        }
    }
tipPerPerson = (bill.value * tipPercentage * 0.01) /
numberOfPeople.value;
totalPerPerson = bill.value / numberOfPeople.value + tipPerPerson;
tipPerPerson = tipPerPerson.toFixed(2);
totalPerPerson = totalPerPerson.toFixed(2);

resultTip.innerText = tipPerPerson;
resultTotal.innerText = totalPerPerson;
}

function calculateTip() {
    buttons.forEach((button) => {
        button.classList.remove("active");
});
this.classList.add("active");
customTip.classList.remove("active");
calculate();
}

function calculateCustomTip() {
    buttons.forEach((button) => {
        button.classList.remove("active");
    });
    this.classList.add("active");

    if (
        (bill.value !== "" || bill.value < 0) &&
        (numberOfPeople.value !== "" || numberOfPeople.value > 0)
    ) {
        calculate();
    }
}

//reset

function dealWithResetButton () { 
    if (
        customTip.value === "" &&
        bill.value === "" &&
        numberOfPeople.value === ""
    ) {
        reset.disabled = true;
        reset.classList.remove("has-reset-activated");
        numberOfPeople.style.borderColor = "";
    } else {
        reset.disabled = false;
        reset.classList.add("has-reset-activated");
    }
    }

function resetAll() {
    buttons.forEach((button) => {
        button.classList.remove("active");

    });

    inputs.forEach((input) => {
        input.value = "";
    });

    resultTip.innerText = "0.00";
    resultTotal.innerText = "0.00";

    reset.disabled = true;
    errorMessage.innerText = ``;
    numberOfPeople.style.borderColor = "";
    reset.classList.remove("has-reset-activated");
    reset.style.backgroundColor = "";
}

    
    
    