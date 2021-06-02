// Make a secondary image the primary image on the /droids/:id client route
const imageSwapClickHandler = function() {
  let primaryImageSrc = $('.droid-primary img').attr('src');

  // swap images
  $('.droid-primary img').attr('src', $(this).attr('src'));
  $(this).attr('src', primaryImageSrc);
};

// Delete a droid with the passed in id.  This is permanent!
const deleteDroidEventHandler = function(id) {
  $.ajax({
    method: 'DELETE',
    url: `/api/droids/${id}`
  })
    .then(result => {
      changePage({ droidId: id }, '/');
    })
    .catch(err => console.error(err));
};

// Get all droids that a user has on their favourites
const getFavouriteDroidsEventHandler = function(userId) {
  return $.ajax({
    method: 'GET',
    url: `/api/users/${userId}/favourites`
  })
    .then((result) => result);
};

// Add a droid to a user's favourites
const addToFavouritesEventHandler = function(userId, droidId) {
  return $.ajax({
    method: 'POST',
    url: `/api/users/${userId}/favourites/`,
    data: { droidId }
  })
    .then((result) => {
      // TODO: Update UI to show that droid has been added to favourites.
      console.log(result);
    })
    .catch(err => console.error(err));
};

// Remove a droid from user's favourites.
const removeDroidFromFavouritesEventHandler = function(userId, droidId) {
  $.ajax({
    method: 'DELETE',
    url: `/api/users/${userId}/favourites/${droidId}`
  })
    .then((result) => {
      // TODO: Handl the return value, result.
      console.log(result);
    })
    .catch(err => console.error(err));
};

// Get a list of droids purchased by user and load into user page.
const getUsersPurchasesEventHandler = function(userId) {
  $.ajax({
    method: 'GET',
    url: `/api/purchases?buyer=${userId}`
  })
    .then((droids) => {
      $userContent = $('#user-droid-content');
      $userContent.html('');
      $('#user-purchases-button').addClass('active');
      $('#user-favourites-button').removeClass('active');
      $('#user-listings-button').removeClass('active');
      for (const droid of droids) {
        $userContent.append(userPurchasedContent(droid));
      }
    })
    .catch((err) => {
      console.error(err);
    });
};

// Pulled out of event handler and then chained to it.
const onClickFavourites = (userId) => {
  getFavouriteDroidsEventHandler(userId)
    .then((droids) => {
      $userContent = $('#user-droid-content');
      $userContent.html('');
      $('#user-favourites-button').addClass('active');
      $('#user-purchases-button').removeClass('active');
      $('#user-listings-button').removeClass('active');
      for (const droid of droids) {
        $userContent.append(userFavouriteContent(droid));
      }
    })
    .catch((err) => console.error(err));
};

const getUsersListings = (userId) => {
  $.ajax({
    method: 'GET',
    url: `/api/droids/admin/${userId}`
  }).then((droids) => {
    $userContent = $('#user-droid-content');
    $userContent.html('');
    $('#user-purchases-button').removeClass('active');
    $('#user-favourites-button').removeClass('active');
    $('#user-listings-button').addClass('active');
    for (const droid of droids) {
      $userContent.append(userFavouriteContent(droid));
    }
  })
}

const submitNewListingEventHandler = function(event) {
  event.preventDefault();
  $.ajax({
    method: 'POST',
    url: '/api/droids',
    data: new FormData($('#create-listing')[0]),
    enctype: 'multipart/form-data',
    processData: false,
    contentType: false,
    cache: false
  })
    .then((data) => {
      // Clear the form in the modal
      $(this)[0].reset();

      // Hide modal after submitting the form.
      $('#createDroidModal').modal('hide');

      const id = $('#modal-userId-input').attr('value');
      changePage({id: id}, `/droids/${data.droid_id}`);
    })
    .catch((err) => {
      console.error(err);
    });
};
