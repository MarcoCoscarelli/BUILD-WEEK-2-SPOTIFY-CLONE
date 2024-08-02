let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

let isPlaying = false;

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
          let path = album.tracks.data[0].preview;
          resetValues();
          curr_track.src = path;
          sessionStorage.setItem("currentAudio", curr_track.src);

          curr_track.img = album.cover_medium;
          sessionStorage.setItem("currentCover", curr_track.img);

          curr_track.name = album.tracks.data[0].title;
          sessionStorage.setItem("currentName", curr_track.name);

          curr_track.artist = album.artist.name;
          sessionStorage.setItem("currentArtist", curr_track.artist);

          const imgPlayer = document.getElementById("imgPlayer");
          const nameTrack = document.getElementById("nameTrack");
          const nameArt = document.getElementById("nameArt");

          imgPlayer.innerHTML = `  <img src="${curr_track.img}" class="img-fluid" />`;

          nameTrack.innerHTML = `${curr_track.name}`;
          nameArt.innerHTML = `${curr_track.artist}`;

          curr_track.load();

          updateTimer = setInterval(seekUpdate, 1000);
          if (!isPlaying) {
            curr_track.play();
            isPlaying = true;
            playpause_btn.innerHTML = `
            <svg aria-hidden="true" focusable="false" width="28" data-prefix="fas" data-icon="pause" class="svg-inline--fa fa-pause fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
              <path fill="currentColor" d="M144 479h-80c-17.7 0-32-14.3-32-32V64c0-17.7 14.3-32 32-32h80c17.7 0 32 14.3 32 32v383c0 17.7-14.3 32-32 32zm240-32V64c0-17.7-14.3-32-32-32h-80c-17.7 0-32 14.3-32 32v383c0 17.7 14.3 32 32 32h80c17.7 0 32-14.3 32-32z"></path>
            </svg>  
          `;
          } else {
            curr_track.pause();
            isPlaying = false;
            playpause_btn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="32" fill="currentColor" class="bi bi-pause-circle-fill play-btn"
              viewBox="0 0 16 16">
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814z" />
            </svg>`;
          }
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



function resetValues() {
  curr_time.textContent = "00:00";
  total_duration.textContent = "00:00";
  seek_slider.value = 0;
}


function seekTo() {
  let seekto = curr_track.duration * (seek_slider.value / 100);
  curr_track.currentTime = seekto;
  sessionStorage.setItem("currentTiming", curr_track.currentTime);
}

function setVolume() {
  curr_track.volume = volume_slider.value / 100;
}

function seekUpdate() {
  let seekPosition = 0;

  if (!isNaN(curr_track.duration)) {
    seekPosition = curr_track.currentTime * (100 / curr_track.duration);

    seek_slider.value = seekPosition;

    let currentMinutes = Math.floor(curr_track.currentTime / 60);
    let currentSeconds = Math.floor(
      curr_track.currentTime - currentMinutes * 60
    );
    let durationMinutes = Math.floor(curr_track.duration / 60);
    let durationSeconds = Math.floor(
      curr_track.duration - durationMinutes * 60
    );

    if (currentSeconds < 10) {
      currentSeconds = "0" + currentSeconds;
    }
    if (durationSeconds < 10) {
      durationSeconds = "0" + durationSeconds;
    }
    if (currentMinutes < 10) {
      currentMinutes = "0" + currentMinutes;
    }
    if (durationMinutes < 10) {
      durationMinutes = "0" + durationMinutes;
    }

    curr_time.textContent = currentMinutes + ":" + currentSeconds;
    total_duration.textContent = durationMinutes + ":" + durationSeconds;
  }
}

doMultipleFetch(1121401);
doMultipleFetch(664237);
doMultipleFetch(184617922);
doMultipleFetch(479176555);
doMultipleFetch(112275);

doFetch();
