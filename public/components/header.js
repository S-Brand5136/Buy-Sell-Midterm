$(() => {
  window.header = {};

  const $pageHeader = $("page-header");
  const currentUser = null;
  function updateHeader(user) {
    currentUser = user;
    let userLinks;

    if (!user) {
      userLinks = `<div class="container-fluid flex-row justify-content-end">
      <a class="me-3" href="">Log in</a>
      <a href="">Register</a>
    </div>
    <div class="container-fluid flex-row justify-content-between">
      <h3>Droid Reclaimers</h3>
      <nav class="nav-links">
        <a href="">Favourites</a>
        <a href="">Droids</a>
        <a href="">Purchased</a>
      </nav>
      <button class="btn btn-primary">Start selling</button>
    </div>`;
    } else {
      userLinks = ` <div class="container-fluid flex-row justify-content-end">
      <img alt="avatar">
      <span>Logged in as: Yoda</span>
      <a href="" id="logout">Log out</a>
    </div>
    <div class="container-fluid flex-row justify-content-between">
      <h3>Droid Reclaimers</h3>
      <nav class="nav-links">
        <a href="">Favourites</a>
        <a href="">Droids</a>
        <a href="">Purchased</a>
      </nav>
      <button class="btn btn-primary">Start selling</button>
    </div>
      `;
    }

    $pageHeader.append(userLinks);
  }

  window.header.update = updateHeader;
});
