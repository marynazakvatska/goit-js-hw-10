
import './css/styles.css';

import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './fetchCountries';


const DEBOUNCE_DELAY = 300;

const inputEl = document.querySelector("input#search-box")
const listEl = document.querySelector(".country-list")
const descrEl = document.querySelector(".country-info")


/* inputEl.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY)) */
inputEl.addEventListener('input', onInput)



function onInput(e) {
    
    console.log(e.currentTarget.value); 
    if (e.currentTarget.value === "" ) {
        listEl.innerHTML = "";
         descrEl.innerHTML = "";
     return
    }

fetchCountries(e.currentTarget.value)
    .then(countries => {
        console.log(countries)
 
        for (const country of countries) {
            const { flag, name, capital, population, languages } = country;
            if (countries.length >= 10) {
        listEl.innerHTML = "";
         descrEl.innerHTML = "";
return  Notify.info("Too many matches found. Please enter a more specific name.");

            }
            else if (countries.length < 10 && countries.length >= 2) {
                descrEl.innerHTML =''
                listEl.insertAdjacentHTML("beforeend", `
<ul>
<li><image src = "${flag}"  alt = "flag of ${name}"  width = 80px></image> </li>
<li>${name}</li>
</ul>`
   
)
       }
            else if (countries.length === 1) {
    listEl.innerHTML = ""
      descrEl.insertAdjacentHTML("beforeend",  `<ul>

<li><image src = "${flag}"  alt = "flag of ${name}"  width = 80></image> </li>
<li>${name}</li>
<li>Capital : ${capital} </li>
<li>Population: ${population}</li>
<li>Languages: ${languages}</li>

</ul>`)    

            }
        }
    })
    .catch(onFetchError)

  
};

function onFetchError(error) {
return Notify.failure("Oops, there is no country with that name");
}