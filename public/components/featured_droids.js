/*
  Pass in an array of droid objects. Each droid object will be of the form:
    {
      id: Number (integer),
      sellers_id: Number (integer),
      name: string,
      description: string,
      price: Number (integer),
      manufacturer: string,
      model: string,
      start_date: Date,
      end_date: Date,
      image_url: string
    }
*/
const featuredDroids = function({droids}) {
  for (let i = 0; i < droids.length; i++) {
    if (i === 0) {
      $('#featuredIndicators').append(`<button type="button" data-bs-target="#featuredCarousel" data-bs-slide-to="${i}" class="active"></button>`)
      $('#featuredDroids').append(`
        <div class="carousel-item active">
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
      `);
    } else {
      $('#featuredIndicators').append(`<button type="button" data-bs-target="#featuredCarousel" data-bs-slide-to="${i}"></button>`);
      $('#featuredDroids').append(
        `<div class="carousel-item">
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
      `);
    }
  }
};
