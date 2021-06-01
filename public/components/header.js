function updateHeader(user) {
  return !user
    ? `
      <div class="container-fluid flex-row justify-content-end">
      <a class="me-3" href="">Log in</a>
      <a href="">Register</a>
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
      <a href="" id="logout">Log out</a>
    </div>
    <div class="container-fluid flex-row justify-content-between">
      <h3>Droid Reclaimers</h3>
      <nav class="nav-links">
        <a href="">Favourites</a>
        <a href="">Droids</a>
        <a href="">Purchased</a>
      </nav>
      <button class="btn btn-primary" id="selling-btn">Start selling</button>
    </div>
      `;
}
