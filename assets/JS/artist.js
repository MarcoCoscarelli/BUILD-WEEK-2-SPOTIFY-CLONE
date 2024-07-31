const urlArtist =
  "https://striveschool-api.herokuapp.com/api/deezer/artist/412";
console.log(urlArtist);

const infoArtist = function () {
  fetch(urlArtist)
    .then((response) => {
      console.log(response);
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("La response non è ok");
      }
    })
    .then((dataArtist) => {
      console.log(dataArtist);
      populateTitle(dataArtist);
      return fetch(dataArtist.tracklist);
    })
    .then((response) => {
      console.log(response);
      if(response.ok) {
        return response.json()
      } else {
        throw new Error ('Ci sei quasi')
      }
    })
    .then((dataTrack) => {
      console.log(dataTrack.data)
      // populateTracks(dataTrack)
    })

    .catch((error) => {
      console.log("Hai sbagliato qualcosa", error);
    });
};

const populateTitle = function (dataArtist) {
  const imageBackground = document.getElementById("imageBackground");
  imageBackground.style.backgroundImage = `url(${dataArtist.picture_xl})`;
  const artistTitle = document.getElementById('artistTitle')
  artistTitle.innerText = dataArtist.name
  const artistFan = document.getElementById('artistFan')
  artistFan.innerText = `${dataArtist.nb_fan} ascoltatori mensili`
}


// const populateTracks = function (dataTrack) {
//   const songsList = document.getElementById('songsList')
//   console.log(songsList)
//   for (let i = 0; i < dataTrack.length; i++) {

//     }
//   songsList.innerHTML = `
//   <div class="row px-4 py-2">
//    <div class="d-flex  align-items-center fw-lighter">
//      <div class="col-6 mb-2 d-flex align-items-center">
//        <div class="me-3">
//          <span>${dataTrack[0]}</span>
//        </div>
//        <div class="d-flex flex-column">
//          <span class="fw-bold">${dataTrack[0].title_short}</span>
//          <span> Pinguini Tattici Nucleari</span>
//        </div>
//      </div>
//      <div class="col-3 d-flex justify-content-end">
//        <span>694.578</span>
//      </div>
//      <div class="col-3 d-flex justify-content-end">
//        <span>1:28</span>
//      </div>
//    </div>
//  </div>
// `
// }

// FUNZIONE X APPARSA/SCOMPARSA ATTIVITA AMICI
function modalNostrum() {
  const test1 = document.getElementById("test_01");
  const test2 = document.getElementById("test_02");


  if (test2.classList.contains("col-10") ) {
    test2.classList.remove("col-10");
    test2.classList.add("col-8");
    test1.classList.toggle("d-none");
    
  } else {
    test2.classList.remove("col-8");
    test2.classList.add("col-10");
    test1.classList.toggle("d-none");
  }
}

infoArtist()


