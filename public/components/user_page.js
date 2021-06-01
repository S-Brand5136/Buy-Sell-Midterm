const userPage = function(user) {
  let userString = `
  <div id="user-content">
    <section>
      <h2>${user.name}</h2>
      <img src="../${user.avatar_url}">
      <ul>
        <li>${user.email}</li>
        <li>${user.mobile_phone}</li>
  `;

  if (user.is_admin) {
    userString += '<li>Administrator</user>'
  }

  userString += `
  <li>${user.created_at}</li>
</ul>
  `;

  if (user.is_admin) {
    userString += `
      <div>
        <button class="btn btn-danger type="button onClick="deleteEverything">
          Delete All Droid Listings!
        </button>
      </div>`
  }

  userString += `
  </section>
  <section>
    <nav>
      <ul class="nav nav-tabs">
        <li class="nav-item">
          <button class="nav-link active" onClick="loadFavourites">Favourites</button>
        </li>
        <li class="nav-item">
          <button class="nav-link" onClick="laodPurchases">Purchases</button>
        </li>
      </ul>
    <nav>
    <div id="user-content"></div>
  </section>
  </div>
  `;

  return userString;
};
