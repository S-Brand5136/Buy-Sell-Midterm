// Pass in and object where the key droids is an array of featured droids.
const featuredDroids = function({droids}) {
  let featuredString = `
  <section class="container pb-3">
    <h2 class="main-content-title">Featured Droids</h2>
    <div id="featuredCarousel" class="carousel slide">
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

    console.log(droids[i]);

    featuredString += `
      <div>
        <img src="../${droids[i].image_url}" class="d-block" alt="A droid named ${droids[i].name}">
        <div class="card m-0 border-0">
          <div class="card-body">
            <h4 class="card-title"><span>${droids[i].droid_name}</span></h4>
            <p class="card-text"><small class="text-muted">Date Posted:
            ${new Date(droids[i].date_posted).toLocaleDateString()}</small></p>
            <p class="card-text">${droids[i].description}</p>
            <h5>Details</h5>
            <ul>
              <li><strong class='text-primary list-label'>Manufacturer:</strong> ${droids[i].manufacturer}</li>
              <li><strong class='text-primary list-label'>Model:</strong> ${droids[i].model}</li>
              <li><strong class="text-primary list-label">Price:</strong>${droids[i].sold_out ? `<span class='sold-out'> SOLD OUT</span` : '$' + droids[i].price}</li>
              <li><strong class='text-primary list-label'>Seller:</strong>: ${droids[i].seller}</li>
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
  </section>
  `;

  return featuredString;
};
