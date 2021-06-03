const droid_card = (droid, favourite, userId) => {
  return `
  <div class="card mb-3">
  <div class="row g-0">
    <div class="col-md-4 align-self-center">
     <img src="../${droid.image_url}">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">${droid.name}</h5>
        <p class="card-text"><small class="text-muted">Date Posted: ${droid.date_posted.slice(0,10)}</small></p>
        <p class="card-text">${droid.description}</p>
        <div class="d-flex justify-content-center flex-column button-group">
          <p><strong class='text-primary list-label'>Manufacturer:</strong> ${droid.manufacturer}</p>
          <p><strong class='text-primary list-label'>Model:</strong> ${droid.model}</p>
          <p><strong class='text-primary list-label'>Price:</strong> $${droid.price}</p>
          <div class='d-flex'>
          ${userId ? `<span id='favourite-btn' data-id='${droid.id}' class="${favourite ? "favourite" : "un-favourite"}"><i class="fas fa-heart"></i></span>
        ` : ' '}
            <a href="#" data-destination='/droids/${droid.id}' class="links btn btn-primary btn-lg">View <i class="fas fa-robot"></i><a>
          </div>
        </div>
      <div>
    </div>
  </div>
</div>`;
};

$("body").on("click", "#favourite-btn", function () {
  const droidId = $(this).data('id');
  const user = getUserFromStorage();

  if (!$(this).hasClass("un-favourite")) {
    removeDroidFromFavouritesEventHandler(user.id, droidId);
    $(this).removeClass("favourite").addClass("un-favourite");
  } else {
    addToFavouritesEventHandler(user.id, droidId);
    $(this).removeClass("un-favourite").addClass("favourite");
  }
});
