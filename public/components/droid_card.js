const droid_card = (droid) => {
  console.log(droid);
  return `
  <div class="card mb-3">
    <div class="row g-0">
      <div class="col-xs-2 col-sm-4 col-md-4 col-lg-4">
        <img src="../${droid.image_url}">
      </div>
      <div class="col-xs-3 col-sm-5 col-md-4 col-lg-5">
        <div class="card-body">
          <h5 class="card-title">${droid.name}</h5>
          <p class="card-text"><small class="text-muted">Date Posted: ${droid.date_posted.slice(0,10)}</small></p>
          <p class="card-text">${droid.description}</p>
        </div>
      </div>
      <div class="col-xs-3 col-sm-2 col-md-4 col-lg-3 align-self-center">
        <div class="d-flex justify-content-center flex-column">
          <span>Manufacturer: ${droid.manufacturer}</span>
          <span>Model: ${droid.model}</span>
          <span>Price: ${droid.price} credits</span>
        </div>
        <div class="d-flex justify-content-center align-items-center flex-row button-group">
          <span id="#favourite"><i class="far fa-heart"></i></span>
          <button class="btn btn-primary">View <i class="fas fa-robot"></i></button>
        </div>
      </div>
    </div>
  </div>`;
}
