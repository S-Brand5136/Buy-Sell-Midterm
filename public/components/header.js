function updateHeader(user) {
  return !user
    ? `
      <div class="container-fluid flex-row justify-content-end">
      <a class="me-3" id='login-btn'>Log in</a>
    </div>
    <div class="container-fluid flex-row justify-content-between">
      <h3><a href='/'>Droid Reclaimers</a></h3>
      <nav class="nav-links">
        <a href="">Favourites</a>
        <a href="/droids">Droids</a>
        <a href="">Purchased</a>
      </nav>
    </div>`
    : ` <div class="container-fluid flex-row justify-content-end">
      <img alt="avatar">
      <span>Logged in as: ${user.name}</span>
      <a id="logout">Log out</a>
    </div>
    <div class="container-fluid flex-row justify-content-between">
    <h3><a href='/'>Droid Reclaimers</a></h3>
      <nav class="nav-links">
        <a href="">Favourites</a>
        <a href="/droids">Droids</a>
        <a href="">Purchased</a>
      </nav>
      ${user.is_admin ? `<button class="btn btn-primary" id="selling-btn">Create Listing</button>` : ''}
    </div>
      `;
}

$('body').on('click', '#login-btn', function(event) {
  $.ajax({
    type: 'GET',
    url: '/api/auth/2'
  }).then((data) => {
    const userJson = JSON.stringify(data);
    localStorage.setItem('user', userJson);
    const newUrl = `/users/${data.id}`;
    changePage(data, newUrl);
  })
  .catch ((err) => {
    alert(err.message)
  })
})

$('body').on('click', '#logout', function(event) {
  $.ajax({
    type: 'POST',
    url: '/api/auth/logout'
  }).then((data) => {
    localStorage.removeItem('user');
    const newUrl = `/`;
    changePage({}, newUrl);
  })
  .catch ((err) => {
    alert(err.message)
  })
})

