$(() => {
  const path = location.pathname;
  $('#main-content').html('');

  switch (path) {
    case '/':
      loadHomePage();
      break;
    case '/droids':
      loadDroidsPage();
      break;
    default:
      loadPageNotFound();
      break;
  }
});
