$(() => {
  const path = location.pathname;
  $('#main-content').html('');
  $('#page-header').html('');
  $('#page-footer').html('');
  const pathArr = path.split('/')

  switch (path) {
    case '/':
      loadHomePage();
      break;
    case `/droid/${pathArr[pathArr.length - 1]}`:
      loadDroidPage(Number(pathArr[pathArr.length - 1]));
      break;
    case '/droids':
      loadDroidsPage();
      break;
    default:
      loadPageNotFound();
      break;
  }
});
