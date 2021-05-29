$(() => {
  $.ajax({
    method: "GET",
    url: "/api/droids/featured"
  }).done((droids) => {
    // const featureCarousel = featuredDroids(droids);
    // $('#main-content').append(featureCarousel);
    featuredDroids(droids);
  });;
});
