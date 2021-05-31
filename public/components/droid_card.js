const droid_card = () => {
  return `
  <div class="card mb-3">
    <div class="row g-0">
      <div class="col-xs-2 col-sm-4 col-md-4 col-lg-4">
        <img src="../public/images/droid_images/c3po.jpg" alt="Droid img">
      </div>
      <div class="col-xs-3 col-sm-5 col-md-4 col-lg-5">
        <div class="card-body">
          <h5 class="card-title">C-3PO protocol droid</h5>
          <p class="card-text"><small class="text-muted">Date Posted: 2021-03-15</small></p>
          <p class="card-text">Fluent in over 6 million forms of communication, the 3PO droid excels at human-cyborg
            relations. The PO-series droid, was a model of protocol droid produced by Cybot Galactica sometime prior
            to the Invasion of Naboo.</p>
        </div>
      </div>
      <div class="col-xs-3 col-sm-2 col-md-4 col-lg-3 align-self-center">
        <div class="d-flex justify-content-center flex-column">
          <span>Manufacturer: Cybot Galactica</span>
          <span>Model: Protocol Droid</span>
          <span>Price: 1150 credits</span>
        </div>
        <div class="d-flex justify-content-center align-items-center flex-row button-group">
          <span id="#favourite"><i class="far fa-heart"></i></span>
          <button class="btn btn-primary">View <i class="fas fa-robot"></i></button>
        </div>
      </div>
    </div>
  </div>`;
}
