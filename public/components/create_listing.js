const create_listing = () => {
  return `<div class="modal fade" id="createDroidMOdal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form action="/droids/" id="create-listing" method="POST">
          <label class="form-label" for="">Title</label>
          <input class="form-control" type="text" id="droid-title" name="droid-title">

          <label class="form-label" for="">Description</label>
          <input class="form-control" type="text" id="droid-description" name="droid-description">

          <label class="form-label" for="">Model</label>
          <input class="form-control" type="text" id="droid-model" name="droid-model">

          <label class="form-label" for="">Manufacturer</label>
          <input class="form-control" type="text" id="droid-manufacturer" name="droid-manufacturer">

          <label class="form-label" for="">Price</label>
          <input class="form-control" type="number" id="droid-price" name="droid-price">

          <label class="form-label" for="">Image</label>
          <input class="form-control" type="file" id="droid-image" name="droid-image">
          <input type="submit" class="btn btn-primary">Create Listing</input>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
      </div>
    </div>
  </div>
</div>
`
}

// $('body').on('click', '#create-listing', function(event) {
//   console.log('here');
//   event.preventDefault();
//   const data = $(this).serialize();
//   addDroid(data)
// });
