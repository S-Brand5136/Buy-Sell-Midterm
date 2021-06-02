const droid_card = (droid, favourite) => {

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
  <span><h6>Manufacturer:</h6> ${droid.manufacturer}</span>
  <span><h6>Model:</h6> ${droid.model}</span>
  <span><h6>Price:</h6> ${droid.price} credits</span>
  </div>
  <div class="d-flex justify-content-center align-items-center flex-row button-group">
  <span id='favourite-btn' class="${favourite ? 'favourite' : 'un-favourite'}"><i class="fas fa-heart"></i></span>
  <a href='/droids/${droid.id}' class="btn btn-primary">View <i class="fas fa-robot"></i><a>
  </div>
  </div>
  </div>
  </div>`;
};


$('body').on('click', '#favourite-btn', function() {
  const droidId = $(this).next().attr('href').slice(8);
  const user = getUserFromStorage();

  if (!$(this).hasClass('un-favourite')) {
    removeDroidFromFavouritesEventHandler(user.id, droidId);
    $(this).removeClass('favourite').addClass("un-favourite");
  } else {
    addToFavouritesEventHandler(user.id, droidId);
    $(this).removeClass('un-favourite').addClass('favourite');
  }
});
