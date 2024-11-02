import { countryList } from "./countrycodes.js";

const BASE_URL =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

let dropdowns = document.querySelectorAll(".selections select");
const result = document.querySelector("#result");
let btn = document.querySelector("button");

//for adding options in dropdowns...
for (let select of dropdowns) {

    for (let currcode in countryList) {
        let Optiontag = document.createElement("option");
        Optiontag.value = currcode;
        Optiontag.innerText = currcode;
        if(select.id=="from" && currcode=="USD"){
            Optiontag.selected=true;
        }
        else if(select.id=="to" && currcode=="INR"){
            Optiontag.selected="selected";
        }
        select.append(Optiontag);
    }


    select.addEventListener("change",(event)=>{
        flagChanger(event.target);
    })
}

//for changing flags...
function flagChanger(selectTag){
    let currCode=selectTag.value;
    let countryCode=countryList[currCode];

    let flagsrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let imgtag = selectTag.parentElement.querySelector("img");
    imgtag.src = flagsrc;
}
// APi handeling...
const exchangeApi = async () => {
  let fromSelect = document.querySelector("#from");
  let fromcurrCodeLowercase = fromSelect.value.toLowerCase();

  let toSelect = document.querySelector("#to");
  let tocurrCodeLowercase = toSelect.value.toLowerCase();

  let amount = document.querySelector("#inputplace input");
  let amtVal = amount.value;
  console.log(amount.value);
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";}

  const URL = `${BASE_URL}/${fromcurrCodeLowercase}.json`;
  let response = await fetch(URL);
  let data = await response.json();
  let rate = data[fromcurrCodeLowercase][tocurrCodeLowercase];
  console.log(rate);

  
  let finalAmount = amtVal * rate;
  result.innerText = finalAmount;

  // Update result or perform any other actions based on the rate
};

btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  exchangeApi();
});

window.addEventListener("load", () => {
  exchangeApi();
});
