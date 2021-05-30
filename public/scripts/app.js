$(() => {
  $.ajax({
    method: "GET",
    url: "/api/droids/featured"
  }).done((droids) => {
    featuredDroids(droids);
  });;
});
