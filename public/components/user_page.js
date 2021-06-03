const userPage = function(user) {
  let userString = `
  <div id="user-content">
    <section>
      <div>
        <h2 class="user-page-title">
          ${user.name}
          ${user.is_admin && '<span class="badge rounded-pill bg-success">Administrator</span>'}
        </h2>
        <img src="../${user.avatar_url}">
      </div>
      <ul>
        <li><strong class="text-primary">Email:</strong> ${user.email}</li>
        <li><strong class="text-primary">Phone:</strong> ${user.mobile_phone}</li>
        <li><strong class="text-primary">Date Joined:</strong> ${new Date(user.created_at).toLocaleDateString()}</li>
  `;

  userString += '</ul>';

  if (user.is_admin) {
    userString += `
      <div>
        <button id="nuke" class="btn btn-danger type="button>
          <i class="fas fa-exclamation-triangle"></i>
          Delete All Droid Listings!
          <i class="fas fa-bomb"></i>
        </button>
      </div>`;
  }

  userString += `
  </section>
  <section class='users-droid-nav'>
    <nav>
      <ul class="nav nav-tabs">
        <li class="nav-item">
          <button id="user-favourites-button" class="nav-link">Favourites</button>
        </li>
        <li class="nav-item">
          <button id="user-purchases-button" class="nav-link">Purchases</button>
        </li>
        ${user.is_admin ? `<li class="nav-item">
        <button id="user-listings-button" class="nav-link">My Listings</button>
      </li>` : ''}
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
        <h4><a href='/droids/${droid.droid_id}'>${droid.name}</a></h4>
        <small>Date Posted: ${new Date(droid.date_posted).toLocaleDateString()}</small>
        <ul>
          <li>
            <strong class="text-primary list-label">Manufacturer:</strong> ${droid.manufacturer}
          </li>
          <li>
            <strong class="text-primary list-label">Model:</strong> ${droid.model}
          </li>
          <li>
            <strong class="text-primary list-label">Price</strong>
             ${droid.sold_out ? 'SOLD OUT' : '$' + droid.price}
          </li>
          <li>
            <strong class="text-primary list-label">Seller:</strong> ${droid.sellers_name}
          </li>
          <li>
            <strong class="text-primary list-label">Seller's Email: </strong> ${droid.sellers_email}
          </li>
        </ul>
        <button class="btn btn-warning" data-id='${droid.droid_id}' id='remove-btn'>Remove From Favourites</button>
        <a href='/droids/${droid.droid_id}' class="btn btn-primary">View <i class="fas fa-robot"></i><a>
      </div>
    </li>
  `;
};

const userPurchasedContent = (droid) => {
  return `
    <li>
      <img src="../${droid.image_url}">
      <div>
      <h4><a href='/droids/${droid.droid_id}'>${droid.name}</a></h4>
        <small>Date Purchased: ${new Date(droid.sold_on).toLocaleDateString()}</small>
        <ul>
          <li>
            <strong class="text-primary list-label">Manufacturer:</strong> ${droid.manufacturer}
          </li>
          <li>
            <strong class="text-primary list-label">Model:</strong> ${droid.model}
          </li>
          <li>
            <strong class="text-primary list-label">Price</strong>
             ${droid.sold_out ? 'SOLD OUT' : '$' + droid.sold_price}
          </li>
          <li>
            <strong class="text-primary list-label">Seller:</strong> ${droid.sellers_name}
          </li>
          <li>
            <strong class="text-primary list-label">Seller's Email: </strong> ${droid.email}
          </li>
        </ul>
        <a href='/droids/${droid.droid_id}' class="btn btn-primary">View <i class="fas fa-robot"></i><a>
      </div>
    </li>
  `;
};

const userListings = (droid) => {
  return `
    <li>
      <img src="../${droid.image_url}">
      <div>
      <h4><a href='/droids/${droid.id}'>${droid.name}</a></h4>
        <small>Date Posted: ${new Date(droid.date_posted).toLocaleDateString()}</small>
        <ul>
          <li>
            <strong class="text-primary list-label">Manufacturer:</strong> ${droid.manufacturer}
          </li>
          <li>
            <strong class="text-primary list-label">Model:</strong> ${droid.model}
          </li>
          <li>
            <strong class="text-primary list-label">Price</strong>
            ${droid.sold_out ? 'SOLD OUT' : '$' + droid.price}

          </li>
          <li>
            <strong class="text-primary list-label">Seller:</strong> ${droid.sellers_name}
          </li>
          <li>
            <strong class="text-primary list-label">Seller's Email: </strong> ${droid.sellers_email}
          </li>
        </ul>
        <button class="btn btn-primary" data-sold='${droid.sold_out}' data-id='${droid.id}' id='listings-btn'>Mark as Sold</button>
        <a href='/droids/${droid.id}' class="btn btn-primary">View <i class="fas fa-robot"></i><a>
      </div>
    </li>
  `;
};

// to do: Add rest of funtion
$('body').on('click', '#listings-btn', function() {
  const droidId = $(this).data('id');
  const isSoldOut = !$(this).data('sold')
  const user = getUserFromStorage();

  markAsSold(droidId, isSoldOut, user.id)
});

$('body').on('click', '#remove-btn', function() {
  const droidId = $(this).data('id');
  const user = getUserFromStorage();

  removeDroidFromFavouritesEventHandler(user.id, droidId);
  onClickFavourites(user.id);
});
