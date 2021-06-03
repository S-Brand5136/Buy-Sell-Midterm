function updateHeader(user) {
  return`
    <div class="container-fluid flex-row">
    <h3><a href="#" class="links" data-destination='/'>Droid Reclaimers <img src='../images/r2d2-icon.svg'></a></h3>
    <ul class="nav">
      <li class='nav-item'>
        <a class="links" data-destination="/droids" href="#">Shop for Droids</a>
      </li>
      <li class='nav-item'>
        ${user && user.is_admin ? `<button class="btn btn-primary nav-item" data-bs-toggle="modal" data-bs-target="#createDroidModal">Create Listing</button>` : ''}
      </li>
      <li class='nav-item'>
        ${user ? `<span>Welcome: <a href="#" class="links" data-destination='/user/${user.id}'>${user.name}</a></span><a id="logout">Log out</a>`
      : `<a id='login-btn'>Log in</a>`}
      </li>
      </ul>
   </div>
  `;
}

$('body').on('click', '#login-btn', function(event) {
  $.ajax({
    type: 'GET',
    url: '/api/auth/2'
  }).then((data) => {
    // Stringify user and add it to localstorage
    const userJson = JSON.stringify(data);
    localStorage.setItem('user', userJson);
    const newUrl = `/user/${data.id}`;
    changePage(data, newUrl);
  })
    .catch((err) => {
      alert(err.message);
    });
});

$('body').on('click', '#logout', function(event) {
  localStorage.removeItem('user');
  changePage({}, '/');
});
