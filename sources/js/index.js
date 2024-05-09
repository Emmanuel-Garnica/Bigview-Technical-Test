import AOS from "aos";

AOS.init();

document.addEventListener('DOMContentLoaded', () => {

  const apiUrl = 'https://api-colombia.com';

  // Reusable function to get API data
  async function getApiData(endpoint) {

    return await fetch(`${apiUrl}${endpoint}`)
      .then(response => response.json())
      .catch(error => {
          console.error('Error al obtener los datos:', error);
          throw new Error(error);
      });
    
  }

  // Función to show initial data 
  async function showMainData() {
    
    const data = await getApiData('/api/v1/Country/Colombia');
    
    const descriptionContainer = document.querySelector('#generalInfo .description');
    const image = document.querySelector('#generalInfo .flagInfo img');
    
    descriptionContainer.innerText = data.description;
    image.setAttribute('src', data.flags[1])
   
  }

  showMainData()


  async function showTouristicData() {
    
    const touristicPlacesData = await getApiData('/api/v1/TouristicAttraction');

    const placesContainer = document.querySelector('#touristicPlaces .galleryWrapper');

    touristicPlacesData.forEach(place => {
      
        const cardContainer = document.createElement('div');
        cardContainer.classList.add('relative', 'mx-auto','max-w-sm', 'bg-white', 'border', 'border-gray-200', 'rounded-lg', 'shadow', 'hover:shadow-yellow-300');
        cardContainer.setAttribute('data-aos', 'fade-down-right')

        const image = document.createElement('img');
        image.classList.add('object-cover', 'w-full', 'aspect-[1]', 'rounded-t-lg', 'bg-[url("https://api-colombia.com/assets/logo-light.svg")]', 'bg-no-repeat', 'bg-cover');
        image.setAttribute('src', place.images[0]);
        image.setAttribute('alt', place.name);
        image.setAttribute('title', place.name);
        image.setAttribute('loading', 'lazy');

        const internalContainer = document.createElement('div');
        internalContainer.classList.add('p-5');

        const city = document.createElement('h5');
        city.classList.add('absolute', 'top-2', 'right-0', 'bg-yellow-300', 'px-4', 'rounded-l');
        city.innerText = place.city.name;

        const name = document.createElement('h3');
        name.classList.add('mb-2', 'text-2xl', 'font-bold', 'tracking-tight', 'text-gray-900');
        name.innerText = place.name;

        const description = document.createElement('p');
        description.classList.add('line-clamp-5', 'mb-3', 'font-normal', 'text-gray-700');
        description.innerText = place.description;

        internalContainer.appendChild(name);
        cardContainer.appendChild(city);
        internalContainer.appendChild(description);

        cardContainer.appendChild(image);
        cardContainer.appendChild(internalContainer);
        
        placesContainer.appendChild(cardContainer);
      
    });
  }

  showTouristicData()

});
