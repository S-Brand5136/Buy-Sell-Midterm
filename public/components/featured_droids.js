// Pass in and object where the key droids is an array of featured droids.
const featuredDroids = function({droids}) {
  for (let i = 0; i < droids.length; i++) {
    let inner = '';
    if (i === 0) {
      $('#featuredIndicators').append(`<button type="button" data-bs-target="#featuredCarousel" data-bs-slide-to="${i}" class="active"></button>`)
      inner += '<div class="carousel-item active">';
    } else {
      $('#featuredIndicators').append(`<button type="button" data-bs-target="#featuredCarousel" data-bs-slide-to="${i}"></button>`);
      inner += '`<div class="carousel-item">';
    }
    inner += `
      <div>
        <img src="${droids[i].image_url}" class="d-block" alt="A droid named ${droids[i].name}">
        <div class="card text-light m-0 border-0">
          <div class="card-body">
            <h4 class="card-title"><span>${droids[i].droid_name}</span> - $${droids[i].price}</h4>
            <p class="card-text">${droids[i].description}</p>
            <h5>Details</h5>
            <ul>
              <li>Manufacturer: ${droids[i].manufacturer}</li>
              <li>Model: ${droids[i].model}</li>
              <li>Seller: ${droids[i].seller}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    `;
    $('#featuredDroids').append(inner);
  }
};
