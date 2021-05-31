const filter_options = () => {
  return `
  <h2>Browse Droids for sale</h2>
  <span id="filter-btn">Filter Options <i class="fas fa-angle-double-down btn" id="filter-btn"></i></span>
  <div id="filter-options">
    <form action="/api/droids" method="get" id="filter-form">
      <label for="input-search" class="form-label">Keyword Search</label>
      <input type="text" class="form-control" name="keyword" placeholder="Repair droid" />
      <div></div>
      <label for="min-price">Minimum Price</label>
      <input type="number" class="form-control" name="minimum_price" placeholder="500" min="0" max="10000">
      <label for="max-price">Maximum Price</label>
      <input type="number" class="form-control" name="maximum_price" placeholder="1500" min="0" max="10000">
      <div></div>
      <label for="manufac">Manufacturer</label>
      <input type="text" name="manufacturer" class="form-control" placeholder="Cybot">
      <div></div>
      <label for="model">Model</label>
      <input type="text" name="model" class="form-control" placeholder="Repair">
      <div></div>
      <label for="limit">Droids Displayed</label>
      <input type="number" class="form-control" name="limit" placeholder="10">
      <input type="submit" value="Submit" class="btn btn-outline-primary">
    </form>
  </div>`;
}

$('#filter-btn').on('click', () => {
  if($('#filter-options').is(":hidden")) {
   $('#filter-options').slideDown();
  } else {
    console.log('here');
    $('#filter-options').slideUp();
  }
})
