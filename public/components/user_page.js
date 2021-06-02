const userPage = function(user) {
  let userString = `
  <div id="user-content">
    <section>
      <div>
        <h2 class="user-page-title">
          ${user.name}
          ${user.is_admin && '<span class="badge rounded-pill bg-primary">Administrator</span>'}
        </h2>
        <img src="../${user.avatar_url}">
      </div>
      <ul>
        <li><strong class="text-primary">Email:</strong> ${user.email}</li>
        <li><strong class="text-primary">Phone:</strong> ${user.mobile_phone}</li>
        <li><strong class="text-primary">Date Joined:</strong> ${new Date(user.created_at).toLocaleDateString()}</li>
  `;

  // if (user.is_admin) {
  //   userString += `
  //   <li>
  //     <span class="badge rounded-pill bg-primary">Administrator</span>
  //   </li>`
  // }

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
          <button id="user-favourites-button" class="nav-link">Favourites</button>
        </li>
        <li class="nav-item">
          <button id="user-purchases-button" class="nav-link">Purchases</button>
        </li>
      </ul>
    </nav>
    <ul id="user-droid-content"></ul>
  </section>
  </div>
  `;

  return userString;
};

const userFavouriteContent = (droid) => {
  return `
    <li>
      <img src="../${droid.image_url}">
      <div>
        <h4>${droid.name}</h4>
        <small>Date Posted: ${new Date(droid.date_posted).toLocaleDateString()}</small>
        <ul>
          <li>
            <strong class="text-primary list-label">Manufacturer:</strong> ${droid.manufacturer}
          </li>
          <li>
            <strong class="text-primary list-label">Model:</strong> ${droid.model}
          </li>
          <li>
            <strong class="text-primary list-label">Price</strong> ${droid.price && '$'}${droid.price || 'SOLD'}
          </li>
          <li>
            <strong class="text-primary list-label">Seller:</strong> ${droid.sellers_name}
          </li>
          <li>
            <strong class="text-primary list-label">Seller's Email: </strong> ${droid.sellers_email}
          </li>
        </ul>
        <button class="btn btn-primary">Remove From Favourites</button>
      </div>
    </li>
  `;
};
