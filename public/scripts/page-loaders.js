// Home Page Functions
const loadHomePage = function() {
  $.ajax({
    method: "GET",
    url: "/api/droids/featured",
  })
  .then((droids) => {
    getUserDetails(5);
    $("#main-content").append(heroSection());
    $("#main-content").append(featuredDroids(droids));
    $('#main-content').append(aboutUs());
    $("#page-footer").append(footerComponent());
  })
  .then(() => {
    // Start carousel.
    const myCarousel = document.querySelector('#featuredCarousel');
    const carousel = new bootstrap.Carousel(myCarousel);
  })
  .catch(err => console.error(err));
};

function getUserDetails(data) {
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
}

// Droid Page Functions
const loadDroidsPage = function() {
  $('#main-content').html('<h1>DROIDS!</h1>');
};

// Page Not Found Function
const loadPageNotFound = function() {
  $('#main-content').append('<h1>These are not the droids you are looking for.</h1>');
};
