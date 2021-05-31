const individualDroid = function(droid) {
  const primaryImage = droid.images.filter(img => img.is_primary)[0].image_url;
  console.log(primaryImage);
  const otherImages = droid.images.filter(img => !img.is_primary);

  let secondaryImages = '';
  for (const img of otherImages) {
    secondaryImages += `<img src="../${img.image_url}" class="droid-secondary" alt="droid: ${droid.name}">`;
  }

  let droidString = `
  <section id="show-droid">
    <h2>DROID NAME</h2>
    <div class="jumbotron">
      <div class="droid-primary">
        <img src="${primaryImage}" alt="droid: ${droid.name}">
      </div>
      <div>
        ${secondaryImages}
      </div>
    </div>
  </section>
  `;

  return droidString;
};
