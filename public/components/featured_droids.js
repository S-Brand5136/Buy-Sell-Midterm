// Pass in and object where the key droids is an array of featured droids.
const featuredDroids = function({droids}) {
  let featuredString = `
  <div class="container pb-3">
    <h2>Featured Droids</h2>
    <div id="featuredCarousel" class="carousel slide" data-bs-ride="carousel">
    <div id="featuredIndicators" class="carousel-indicators">
  `;

  for (let i = 0; i < droids.length; i++) {
    if (i === 0) {
      featuredString += `<button type="button" data-bs-target="#featuredCarousel" data-bs-slide-to="${i}" class="active"></button>`;
    } else {
      featuredString += `<button type="button" data-bs-target="#featuredCarousel" data-bs-slide-to="${i}"></button>`;
    }
  }

  featuredString += `</div><div id="featuredDroids" class="carousel-inner">`;

  for (let i = 0; i < droids.length; i++) {
    if (i === 0) {
      featuredString += '<div class="carousel-item active">';
    } else  {
      featuredString += '<div class="carousel-item">';
    }

    featuredString += `
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
  }

  featuredString += `
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#featuredCarousel" data-bs-slide="prev">
  <span class="carousel-control-prev-icon" aria-hidden="true"></span>
  <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#featuredCarousel" data-bs-slide="next">
  <span class="carousel-control-next-icon" aria-hidden="true"></span>
  <span class="visually-hidden">Next</span>
  </button>
  </div>
  </div>
  `;

  return featuredString;
};
