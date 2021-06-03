const individualDroid = function(droid) {
  const primaryImage = droid.images.filter(img => img.is_primary)[0];
  const otherImages = droid.images.filter(img => !img.is_primary);
  const user = getUserFromStorage();

  let secondaryImages = '';
  for (const img of otherImages) {
    secondaryImages += `<img src="../${img.image_url}" class="droid-secondary" alt="droid: ${droid.name}" data-imageId="${img.id}">`;
  }

  let droidString = `
  <section id="show-droid">
    <h2>${droid.name}</h2>
    <div class="container">
      <div>
        <div class="droid-primary">
          <img src="../${primaryImage.image_url}" alt="droid: ${droid.name}" data-imageId="${primaryImage.id}">
        </div>
        <div class="droid-secondary">
          ${secondaryImages}
        </div>
      </div>
      <article>
        <h4>${droid.sold_out ? 'SOLD OUT' : '$' +droid.price}</h4>
        <h3>Description</h3>
        <p>${droid.description}</p>
        <ul>
          <li><strong class='text-primary list-label'>Manufactured by:</strong> ${droid.manufacturer}</li>
          <li><strong class='text-primary list-label'>Model:</strong> ${droid.model}</li>
          <li><strong class='text-primary list-label'>Seller:</strong> ${droid.sellers_name}</li>
          <li><strong class='text-primary list-label'>Email: <a href="mailto:${droid.email}">${droid.email}</a></strong></li>
        </ul>
        ${user.id === droid.sellers_id ? `<button id="delete-droid" class="btn btn-danger">Delete Droid</button> ` : ''}
      </article>
    </div>
  </section>
  `;

  return droidString;
};
