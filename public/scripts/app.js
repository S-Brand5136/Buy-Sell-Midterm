const routing = () => {
  const path = location.pathname;
  $('#main-content').html('');
  $('#page-header').html('');
  $('#page-footer').html('');
  const pathArr = path.split('/')

  switch (path) {
    case '/':
      loadHomePage();
      break;
    case `/droids/${pathArr[pathArr.length - 1]}`:
      loadDroidPage(Number(pathArr[pathArr.length - 1]));
      break;
    case '/droids':
      loadDroidsPage();
      break;
    case 404:
    default:
      loadPageNotFound();
      break;
  }
};

const changePage = (state, newUrl) => {
  console.log('newUrl', newUrl);
  history.pushState(state, '', newUrl);
  routing();
};

window.onload = () => {
  routing();
}
