let selects = document.querySelectorAll(".selectContainer select");
let btn = document.querySelector("form button");
const fromCurrency = document.querySelector(".from select");
const toCurrency = document.querySelector(".to select");

for (let select of selects) {
  // console.log(select);
  for (code in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = code;
    newOption.value = code;
    if (select.name == "from" && code === "USD") {
      newOption.selected = "selected";
    } else if (select.name == "to" && code === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }

  select.addEventListener("change", (event) => {
    updateFlag(event.target);
  });
}

const updateFlag = (element) => {
  // console.log(element);
  let currencyCode = element.value;
  let countryCode = countryList[currencyCode];
  let FLAG_SRC = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = FLAG_SRC;
};

const updateExhangeRate = async () => {
    let amount = document.querySelector("form input");
    // console.log(amount.value);
    let amtVal = amount.value;
    if (amtVal == "" || amtVal < 1) {
      amtVal = 1;
      amount.value = amtVal;
    }
  
    let from = fromCurrency.value.toLowerCase();
    let to = toCurrency.value.toLowerCase();
    // console.log(to);
    const URL = `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${from}/${to}.json`;
    let response = await fetch(URL);
    let rate = await response.json();
    // console.log(rate);
    let equivalentValue = rate[to];
    // console.log(equivalentValue);
  
    let finalValue = equivalentValue * amtVal;
    // console.log(finalValue);
    const msgDisplay = document.querySelector(".msg");
    let msg = `${amtVal} ${from.toUpperCase()} = ${finalValue} ${to.toUpperCase()}`;
    msgDisplay.innerText = msg;
  };

btn.addEventListener("click", async (event) => {
  event.preventDefault();
  updateExhangeRate();
});


window.addEventListener("load", (evt) => {
    updateExhangeRate();
});
