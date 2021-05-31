$(() => {
  $.ajax({
    method: "GET",
    url: "/api/droids/featured",
  }).done((droids) => {
    getUserDetails(1);
    $("#main-content").append(heroSection());
    $("#main-content").append(featuredDroids(droids));
    $("#page-footer").append(footerComponent());
  });
});

function getUserDetails(data) {
  return $.ajax({
    method: "GET",
    url: `/api/users/${data}`,
  }).done((data) => {
    const user = data.user[0];
    $("#page-header").append(updateHeader(user));
  });
}
