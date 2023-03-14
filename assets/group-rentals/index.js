import { getRentalsByCityAndProvince } from "../models/rentalsdb.js";
var value = getRentalsByCityAndProvince();
console.log(value);
value.map((x) => {
  var MainDiv = document.createElement("div");
  MainDiv.classList.add("text-center");

  var titleElement1 = document.createElement("p5");
  titleElement1.textContent = `${x.cityProvince}`;
  MainDiv.appendChild(titleElement1);

  var MainContent=document.createElement("div");
  MainContent.classList.add("row","justify-space-around");

  x.rentals.map((y) => {
    if(y.featuredRental){
    var cardDiv = document.createElement("div");
    cardDiv.classList.add("card","col-5","m-5");
    
    
    var imgElement = document.createElement("img");
    imgElement.classList.add("card-img-top", "heightdiv");
    imgElement.src = `${y.imageUrl}`;
    imgElement.alt = "Card image cap";
    imgElement.style.height = "20rem";
    cardDiv.appendChild(imgElement);

    var cardBodyDiv = document.createElement("div");
    cardBodyDiv.classList.add("card-body");
    cardDiv.appendChild(cardBodyDiv);

    var titleElement = document.createElement("p5");
    titleElement.classList.add("card-title", "font-weight-bold");
    titleElement.textContent = `${y.headline}`;
    cardBodyDiv.appendChild(titleElement);

    var detailsDiv = document.createElement("div");
    detailsDiv.classList.add("d-flex", "flex-row", "justify-content-between");
    cardBodyDiv.appendChild(detailsDiv);

    var descriptionDiv = document.createElement("div");
    descriptionDiv.classList.add("font-weight-light");
    descriptionDiv.textContent = `Sleeps ${y.numSleeps}. ${y.numBedrooms}BR . ${y.numBathrooms}BA`;
    detailsDiv.appendChild(descriptionDiv);

    var rateDiv = document.createElement("div");
    detailsDiv.appendChild(rateDiv);

    var rateBoldElement = document.createElement("span");
    rateBoldElement.classList.add("font-weight-bold");
    rateBoldElement.textContent = `C$${y.pricePerNight} `;
    rateDiv.appendChild(rateBoldElement);

    var rateTextElement = document.createTextNode("avg/night");
    rateDiv.appendChild(rateTextElement);

    MainContent.appendChild(cardDiv);
    }
  })
  MainDiv.appendChild(MainContent);
  var cardContainer = document.querySelector(".rent_details1");
cardContainer.appendChild(MainDiv);
});
