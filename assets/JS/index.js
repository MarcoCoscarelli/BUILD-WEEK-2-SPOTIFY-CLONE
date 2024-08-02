let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

let is_playing_song = false;

let curr_track = document.createElement("audio");

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

function doMultipleFetch(albumId) {
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
      console.log(album);
      generateRowAlbum(album);
    })
    .catch((error) => {
      console.log("ERRORE!", error);
    });
}

function doFetch() {
  const URL = "https://striveschool-api.herokuapp.com/api/deezer/album/";

  fetch(URL + 112275)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Errore nella chiamata, response non OK");
      }
    })
    .then((album) => {
      console.log(album);
      generateAnnuncio(album);
      document
        .getElementById("play_button")
        .addEventListener("click", function () {
          // Create new audio element
          curr_track.src = album.tracks.data[0].preview;

          if (!is_playing_song) {
            curr_track.load();
            curr_track.play();
            is_playing_song = true;
          } else {
            curr_track.pause();
            is_playing_song = false;
          }
        });
      
      document.getElementById("nascondi_annunci").addEventListener("click", function() {
        document.getElementById("annuncio").style.display = "none";
      });
    })
    .catch((error) => {
      console.log("ERRORE!", error);
    });
}

function generateAnnuncio(album) {
  document.getElementById("album_cover").src = album.cover_medium;
  document.getElementById("nome_canzone").innerText =
    album.tracks.data[0].title;
  document.getElementById("nome_artista").innerText = album.artist.name;
  document.getElementById("ascolta_singolo").innerText +=
    " " + album.artist.name;
}

// nella index.html deve comparire una canzone random (al posto di dove ora ce viola)
// sempre li al tasto play deve avviare la canzone
// al click di nascondi annunci il div della canzone deve acquisire display none

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

doFetch();

doMultipleFetch(1121401);
doMultipleFetch(664237);
doMultipleFetch(184617922);
doMultipleFetch(479176555);
doMultipleFetch(112275);
