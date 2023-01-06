import { Notify } from 'notiflix/build/notiflix-notify-aio';


 export function fetchCountries(name) {
return fetch(`https://restcountries.com/v2/name/${name}?fields=name,capital,population,flag,languages`) 
    
    .then(response => {
             if (!response.ok) {
          countryList.innerHTML = '';
          countryInfo.innerHTML = '';
        Notify.failure('Oops, there is no country with that name');
          throw new Error(resp.statusText);
        }
               return  response.json() 
             
         })

}


