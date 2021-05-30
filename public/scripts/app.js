$(() => {
  $.ajax({
    method: "GET",
    url: "/api/droids/featured"
  }).done((droids) => {
    $('#main-content').append(featuredDroids(droids));
  });;
});
