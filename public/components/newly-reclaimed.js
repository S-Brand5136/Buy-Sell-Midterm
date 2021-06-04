const newlyReclaimed = (droid) => {
  return `
  <div class="card">
  <img src="../${droid.image_url}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${droid.name}</h5>
    <p class="card-text"><small class="text-muted">${new Date(droid.date_posted).toLocaleDateString()}
       </small></p>
    <p class="card-text">${droid.description}</p>
    <p><strong class='text-primary list-label'>Manufacturer:</strong> ${droid.manufacturer}</p>    <p><strong class='text-primary list-label'>Model:</strong> ${droid.model}</p>
    <p><strong class='text-primary list-label'>Price:</strong> $${droid.price}</p>
    <a href="#" data-destination='/droids/${droid.id}' class="links btn btn-primary btn-lg">View <i class="fas fa-robot"></i><a>
    </div>
</div>
  `
}
