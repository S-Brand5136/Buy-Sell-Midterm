const routing = () => {
  const path = location.pathname;
  // Clear existing content
  $('#main-content').html('');
  $('#page-header').html('');
  $('#page-footer').html('');

  // Split path on '/' to get array of url segments
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
    case `/users/${pathArr[pathArr.length -1]}`:
      loadUserPage(Number(pathArr[pathArr.length -1]));
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

const getUserFromStorage = () => {
  const userDetails = localStorage.getItem('user');
  return JSON.parse(userDetails)
}
