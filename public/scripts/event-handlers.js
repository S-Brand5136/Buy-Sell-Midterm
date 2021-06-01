const imageSwapClickHandler = function() {
  let primaryImageSrc = $('.droid-primary img').attr('src');

  // swap images
  $('.droid-primary img').attr('src', $(this).attr('src'));
  $(this).attr('src', primaryImageSrc);
};

const deleteDroidEventHandler = function(id) {
  console.log(id);
  $.ajax({
    method: 'DELETE',
    url: `/api/droids/${id}`
  })
    .then(result => console.log(result))
    .catch(err => console.error(err));
};
