//
// Common Component Functions
//

// main is the function to run for loading main conent
const loadContent = function(main) {
  loadCreateModal();
  loadHeader();
  main();
  loadFooter();
  $('a.links').click(links);
};

const loadCreateModal = function() {
  const user = getUserFromStorage();
  const userId = user ? user.id : -1;
  $('body').prepend(create_listing());
  $('#modal-userId-input').attr('value', userId);
  $('#create-listing').submit(submitNewListingEventHandler);
};

const loadHeader = function() {
  const user = getUserFromStorage();
  $("#page-header").append(updateHeader(user));
};

const loadFooter = function() {
  $("#page-footer").append(footerComponent());
};

//
// Home Page Functions
//

const loadMainContentHome = function(droids) {
  $("#main-content").append(heroSection());
  $("#main-content").append(featuredDroids(droids));
  $('#main-content').append(aboutUs());
};

const loadHomePage = function() {
  $.ajax({
    method: "GET",
    url: "/api/droids/featured",
  })
    .then((droids) => {
      loadContent(() => loadMainContentHome(droids));
    })
    .then(() => {
    // Start carousel.
      const myCarousel = document.querySelector('#featuredCarousel');
      const carousel = new bootstrap.Carousel(myCarousel);
    })
    .catch(err => console.error(err));
};

//
// Droid Page Functions
//

const loadMainContentDroid = function(droid) {
  $('#main-content').append(individualDroid(droid));

  // Add event listeners
  $('.droid-secondary img').click(imageSwapClickHandler);
  $('#delete-droid').click(() => deleteDroidEventHandler(droid.id));
};

const loadDroidPage = function(id) {
  $.ajax({
    method: 'GET',
    url: `/api/droids/${id}`
  })
    .then((droid) => {
      // If droid not found direct to 404 not found page.
      if (droid.error) {
        return changePage({id, error: 404}, '/404');
      }
      loadContent(() => loadMainContentDroid(droid));
    });
};

//
// Droids page functions
//

const loadDroidsPage = function(id) {
  return loadContent(() => {
    $('#main-content').append(droid_search());
    $('#droid-search').prepend(filter_options());
    appendDroids();
  });
};

// Helper function
// Appends droids to droid-container
const appendDroids = (data) => {
  const user = getUserFromStorage();
  const userId = user ? user.id : 0;

  Promise.all([$.ajax({
    type: 'GET',
    url: `/api/droids`,
    data
  }), getFavouriteDroidsEventHandler(userId)])
    .then(data => {
      $('#droid-container').html('');
      const droids = data[0].droids;
      const favourites = data[1];

      // Check for droids, If none show message saying there was none
      // If there is droids, check to see if its in the users favourites
      if (droids.length > 0) {
        for (const droid of droids) {
          let favourite = false;
          for (const item of favourites) {
            if (droid['id'] === item['droid_id']) {
              favourite = true;
            }
          }
          $('#droid-container').append(droid_card(droid, favourite, userId));
        }
        $('a.links').click(links);
      } else {
        $('#droid-container').append('<h1>These are not the droids you are looking for.</h1>');
      }
    });
};

//
// User Detail Page Functions
//

const loadMainContentUser = function(user) {
  $('#main-content').append(userPage(user));
  onClickFavourites(user.id);
  $('#user-favourites-button').click(() => onClickFavourites(user.id));
  $('#user-purchases-button').click(() => getUsersPurchasesEventHandler(user.id));
  $('#user-listings-button').click(() => getUsersListings(user.id));

  // DANGER! This is the big red button that wipes all droids and cascades.
  $('#nuke').click(nukeSite);
};

const loadUserPage = function(userId) {
  const userString = localStorage.getItem('user');
  if (!userString) {
    return changePage({userId}, '/');
  }
  const user = JSON.parse(userString);

  // Send user to their own user page if they try to visit someone else's.
  if (user.id !== userId) {
    const state = {notAuthorized: `user ${user.id} not authorized to view page for user ${userId}`};
    return changePage(state, `/user/${user.id}`);
  }
  loadContent(() => loadMainContentUser(user));
};

//
// Page Not Found Function
//

const loadMainContentPageNotFound = function() {
  $('#main-content').append('<h1>These are not the droids you are looking for.</h1>');
};

const loadPageNotFound = function() {
  loadContent(loadMainContentPageNotFound);
};
