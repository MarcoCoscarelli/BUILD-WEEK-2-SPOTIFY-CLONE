// FUNZIONE X APPARSA/SCOMPARSA ATTIVITA AMICI
function modalNostrum() {
  const test1 = document.getElementById("test_01");
  const test2 = document.getElementById("test_02");

  if (test2.classList.contains("col-10")) {
    test2.classList.remove("col-10");
    test2.classList.add("col-8");
    test1.classList.toggle("d-none");
  } else {
    test2.classList.remove("col-8");
    test2.classList.add("col-10");
    test1.classList.toggle("d-none");
  }
}

function doFetch(albumId) {
  const URL = "https://striveschool-api.herokuapp.com/api/deezer/album/";

  fetch(URL + albumId)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Errore nella chiamata, response non OK");
        }
      })
      .then((album) => {
        console.log(album)
        generateRowAlbum(album);
      })
      .catch((error) => {
        console.log("ERRORE!", error);
      }
  );
}

function generateRowAlbum(album) {
  document.getElementById("altro_che_ti_piace").innerHTML += `
                            <a href="./album.html?albumId=${album.id}" class="text-decoration-none">
                              <div class="mb-3">
                                  <div class="card  text-white">
                                      <img src="${album.cover_medium}" alt="music cover"
                                          class="card-img-top rounded-4 p-2" />
                                      <div class="card-body">
                                          <h5 class="card-title">${album.title}</h5>
                                          <p class="text-secondary">${album.artist.name}</p>
                                      </div>
                                  </div>
                              </div>
                            </a>
                            `;
}

doFetch(1121401);
doFetch(664237);
doFetch(184617922);
doFetch(479176555);
doFetch(112275);

// // Funzione createPlaylist
// function createPlaylist() {
//   const playlist = prompt("Scrivi di seguito il nome della playlist", "ES: Summer 2K21");
//   if (playlist) {
//     // Aggiungi la playlist a localStorage
//     let playlists = JSON.parse(localStorage.getItem("playlists")) || [];
//     playlists.push(playlist);
//     localStorage.setItem("playlists", JSON.stringify(playlists));

//     // Aggiorna la lista di playlist nella pagina corrente
//     const listOfPlay = document.getElementById("playlist-index");
//     const node = document.createElement("li");
//     node.classList.add("pt-2");
//     node.textContent = playlist;
//     listOfPlay.appendChild(node);
//   }
// }

// // Funzione loadPlaylists
// function loadPlaylists() {
//   const playlists = JSON.parse(localStorage.getItem("playlists")) || [];
//   const listOfPlay = document.getElementById("playlist-index");

//   // Svuota la lista esistente
//   listOfPlay.innerHTML = '';

//   // Aggiungi le playlist caricate
//   playlists.forEach(playlist => {
//     const node = document.createElement("li");
//     node.classList.add("pt-2");
//     node.textContent = playlist;
//     listOfPlay.appendChild(node);
//   });
// }

// // Carica le playlist all'avvio della pagina
// document.addEventListener("DOMContentLoaded", loadPlaylists);
