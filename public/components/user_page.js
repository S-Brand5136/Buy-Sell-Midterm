const userPage = function(user) {
  let userString = `
  <h2 class="user-page-title">${user.name}</h2>
  <div id="user-content">
    <section>
      <img src="../${user.avatar_url}">
      <ul>
        <li><span>Email:</span> ${user.email}</li>
        <li><span>Phone:</span> ${user.mobile_phone}</li>
        <li><span>Date Joined:</span> ${new Date(user.created_at).toLocaleDateString()}</li>
  `;

  if (user.is_admin) {
    userString += `
    <li>
      <span class="badge rounded-pill bg-primary">Administrator</span>
    </li>`
  }

  userString += '</ul>';

  if (user.is_admin) {
    userString += `
      <div>
        <button class="btn btn-danger type="button onClick="deleteEverything">
          <i class="fas fa-exclamation-triangle"></i>Delete All Droid Listings!
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
