const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies"

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg")


for(let select of dropdowns){
    for (let currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name === "from" && currCode === "USD"){
            newOption.selected = "selected";
        } if(select.name === "to" && currCode === "BDT"){
            newOption.selected = "selected";
        }
        select.append(newOption);
    }

    select.addEventListener("change",(evt) =>{
        updateFlag(evt.target);
    })
}


const updateFlag = (element)=>{
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img =  element.parentElement.querySelector("img");
    if(img){
        img.src = newSrc;
    } else {
        console.error("Image element not found");
    }
    }


btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amtVla = amount.value
    //to prevent entering num in negative//
    if(amtVla === "" || amtVla < 1 ){
        amtVla = 1 ;
        amount.value = "1";
    }

    console.log(fromCurr.value,toCurr.value);
    const URl =`${BASE_URL}/${fromCurr.value.toLowerCase()}.min.json`;
    let response = await fetch(URl);
    let data = await response.json();
   console.log(data);
   let from = fromCurr.value.toLowerCase();
    console.log(from);
    let to = toCurr.value.toLowerCase();
    console.log(to);
    let rate = data[from][to];
    console.log(rate);
    let finalAmount = amtVla * rate;
    msg.innerText = `${amtVla}${fromCurr.value} = ${finalAmount}${toCurr.value}`

} );

