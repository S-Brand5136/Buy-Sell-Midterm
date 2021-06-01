//
// Common Component Functions
//

// main is the function to run for loading main conent
const loadContent = function(main) {
  loadHeader();
  main();
  loadFooter();
};

const getUserDetails = function(data) {
  if(data['userId']) {
    return $.ajax({
      method: "GET",
      url: `/api/users/${data['userId']}`,
    })
    .done((data) => {
      const user = data.user[0];
      if (user) {
        return $("#page-header").append(updateHeader(user));
      }
    })
      .catch((err) => {
        return $("#page-header").append(updateHeader());
      });
  }
    return $("#page-header").append(updateHeader());
};

const loadHeader = function() {
  const cookies = {};
  cookies['userId'] = Cookies.get('userId');
  getUserDetails(cookies);
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
}

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
    })
};

const loadMainContentDroids = function() {
  $('#main-content').append(droid_search());
  $('#droid-search').prepend(filter_options());
  appendDroids();
};

// Helper function
// Clears droid-container
// Appends droids to droid-container
const appendDroids = (data) => {
  $('#droid-container').html('');
  $.ajax({
    type: 'GET',
    url: `/api/droids`,
    data
  })
  .then((data) => {
    const droids = data.droids
    if(droids.length > 0) {
      for (const droid of droids) {
        $('#droid-container').append(droid_card(droid));
      }
    } else {
      $('#droid-container').append('<h1>These are not the droids you are looking for.</h1>')
    }
  })
  .catch(err => console.error(err));
}

const loadDroidsPage = function() {
  loadContent(loadMainContentDroids);
};

//
// Page Not Found Function
//

const loadMainContentPageNotFound = function() {
  $('#main-content').append('<h1>These are not the droids you are looking for.</h1>');
}

const loadPageNotFound = function() {
  loadContent(loadMainContentPageNotFound);
};
