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
  return $.ajax({
    method: "GET",
    url: `/api/users/${data}`,
  })
  .done((data) => {
    const user = data.user[0];
    if (user) {
      return $("#page-header").append(updateHeader(user));
    }
    return $("#page-header").append(updateHeader());
  })
  .catch((err) => {
    return $("#page-header").append(updateHeader());
  });
};

const loadHeader = function() {
  // TODO: Load user from cookie
  getUserDetails(5);
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

  // Add event listeners to small pictures
  $('.droid-secondary img').click(function() {
    let primaryImageSrc = $('.droid-primary img').attr('src');

    // swap images
    $('.droid-primary img').attr('src', $(this).attr('src'));
    $(this).attr('src', primaryImageSrc);
  });
}

const loadDroidPage = function(id) {
  $.ajax({
    method: 'GET',
    url: `/api/droids/${id}`
  })
    .then((droid) => {
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
