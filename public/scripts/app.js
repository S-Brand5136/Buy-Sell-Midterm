$(() => {
  const path = location.pathname;
  $('#main-content').html('');
  console.log('path', path);

  switch (path) {
    case '/':
      loadHomePage();
      break;
    case '/droids':
      console.log('in /droids case');
      loadDroidsPage();
      break;
    default:
      loadPageNotFound();
      break;
  }
});
