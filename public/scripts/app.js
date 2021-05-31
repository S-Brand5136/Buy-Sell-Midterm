$(() => {
  $.ajax({
    method: "GET",
    url: "/api/droids/featured"
  })
  .then((droids) => {
    // Add carousel to <main>
    $('#main-content').append(featuredDroids(droids));
  })
  .then(() => {
    // Start carousel.
    const myCarousel = document.querySelector('#featuredCarousel');
    console.log('myCarousel', myCarousel);
    const carousel = new bootstrap.Carousel(myCarousel);

    // Add about section below carousel.
    $('#main-content').append(aboutUs());
  })
  .catch(err => console.error(err));
});
