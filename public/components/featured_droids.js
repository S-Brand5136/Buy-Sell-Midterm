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
      $('#featuredDroids').append(
        `<div class="carousel-item active"><img src="${droids[i].image_url}" class="d-block 1-100" alt="A droid named ${droids[i].name}"></div>`
      );
    } else {
      $('#featuredIndicators').append(`<button type="button" data-bs-target="#featuredCarousel" data-bs-slide-to="${i}"></button>`);
      $('#featuredDroids').append(
        `<div class="carousel-item"><img src="${droids[i].image_url}" class="d-block 1-100" alt="A droid named ${droids[i].name}"></div>`
      );
    }
  }
};
