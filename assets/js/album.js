// FUNZIONE X CREAZIONE PLAYLIST

function createPlaylist() {
  const playlist = prompt(
    "Scrivi di seguito il nome della playlist",
    "ES: Summer 2K21"
  );

  // localStorage.setItem("nome playlist", playlist)
  // const localPlay = localStorage.getItem(playlist)

  const listOfPlay = document.getElementById("playlist-index");
  const node = document.createElement("li");
  node.classList.add("pt-2");
  node.textContent = `${playlist}`;
  listOfPlay.appendChild(node);
}

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

// FUNZIONE X PLAYER SPOTIFY

const addressBarParameters = new URLSearchParams(location.search)
const albumId = addressBarParameters.get('albumId')
console.log('albumId', albumId)

let track_index = 0;
const URL = "https://striveschool-api.herokuapp.com/api/deezer/album/";

const getAlbum = function () {
  fetch(URL + albumId)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Errore nella chiamata, response non OK");
      }
    })
    .then((album) => {
      let songs = album.tracks.data;
      displayAlbumInfo(album, songs);
      displaySongs(songs, createArray(songs));
    })
    .catch((error) => {
      console.log("ERRORE!", error);
    });
};

function displayAlbumInfo(album, songs) {
  console.log(album);
  document.getElementById("album-img").src = album.cover_big;
  document.getElementById("artist-img").src = album.artist.picture_small;
  document.getElementById("album-title").innerText = album.title;
  document.getElementById("album-artist-name").innerText = album.artist.name;
  document.getElementById("album-release-date").innerText = new Date(album.release_date).getFullYear();
  document.getElementById("tracks-number").innerText = songs.length + " brani,";
  document.getElementById("album-duration").innerText = " " + formatSecondsWithLetters(album.duration);

}

function createArray(songs) {
  let track_list = [];
  songs.forEach((song) => {
    track_list.push({
      name: song.title,
      path: song.preview,
      artist: song.artist.name,
      album_cover: song.album.cover,
    });
  });

  return track_list;
}

function formatSeconds(seconds) {
  let minutes = Math.floor(seconds / 60);
  let secondsLeft = seconds % 60;

  secondsLeft = secondsLeft < 10 ? "0" + secondsLeft : secondsLeft;

  return minutes + ":" + secondsLeft;
}

function formatSecondsWithLetters(seconds) {
  let minutes = Math.floor(seconds / 60);
  let secondsLeft = seconds % 60;

  secondsLeft = secondsLeft < 10 ? "0" + secondsLeft : secondsLeft;

  return minutes + " min " + secondsLeft + " sec.";
}

function displaySongs(songs, track_list) {
  const songsContainer = document.getElementById("songs");
  const marquee = document.getElementById('marquee');
  songs.forEach((song, index) => {
      const songDiv = document.createElement("div");
      songDiv.classList.add("row", "px-4", "py-2");
      songDiv.dataset.index = index;
      songDiv.innerHTML = `
          <div class="d-flex align-items-center fw-lighter song-row">
              <div class="col-6 mb-2 d-flex align-items-center">
                  <div class="me-3">
                      <span>${index + 1}</span>
                  </div>
                  <div class="d-flex flex-column">
                      <span id="textScroll" class="fw-bold">${song.title}</span>
                      <span>${song.artist.name}</span>
              
                  </div>
              </div>
              <div class="col-3 d-flex justify-content-end">
                  <span>${song.id}</span>
              </div>
              <div class="col-3 d-flex justify-content-end">
                  <span>${formatSeconds(song.duration)}</span>
              </div>
          </div>
      `;
    songDiv.addEventListener("click", () => loadTrack(index, track_list));
    songDiv.addEventListener("click", function() {
      if (marquee.classList.contains('marquee')) {
        marquee.classList.remove('marquee');
      } else {
        marquee.classList.add("marquee");
      }
    })
    songsContainer.appendChild(songDiv);

  });

}

// let now_playing = document.querySelector(".now-playing");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

let isPlaying = false;
let updateTimer;






// Create new audio element
// sessionStorage.setItem("footerLocal", footer);
// console.log(footer);



let curr_track = document.createElement("audio");

function loadTrack(track_index, track_list) {
  //clearInterval(updateTimer);
  resetValues();

  curr_track.src = track_list[track_index].path;
  sessionStorage.setItem('currentAudio', curr_track.src);


  curr_track.img = track_list[track_index].album_cover;
  sessionStorage.setItem('currentCover', curr_track.img);

  curr_track.name = track_list[track_index].name;
  sessionStorage.setItem('currentName', curr_track.name);

  curr_track.artist = track_list[track_index].artist;
  sessionStorage.setItem('currentArtist', curr_track.artist);

  const imgPlayer = document.getElementById('imgPlayer');
  const nameTrack = document.getElementById('nameTrack');
  const nameArt = document.getElementById('nameArt');

  imgPlayer.innerHTML = `  <img src="${curr_track.img}" class="img-fluid" />`
  console.log(track_list)

  nameTrack.innerHTML = `${curr_track.name}`;
  nameArt.innerHTML = `${curr_track.artist}`;


  curr_track.load();


  updateTimer = setInterval(seekUpdate, 1000);
  curr_track.addEventListener("ended", nextTrack);
  playTrack();
}

function resetValues() {
  curr_time.textContent = "00:00";
  total_duration.textContent = "00:00";
  seek_slider.value = 0;
}

function playpauseTrack() {
  if (!isPlaying) playTrack();
  else pauseTrack();
}

function playTrack() {
  curr_track.play();
  isPlaying = true;
  playpause_btn.innerHTML =
  `
    <svg aria-hidden="true" focusable="false" width="28" data-prefix="fas" data-icon="pause" class="svg-inline--fa fa-pause fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
    <path fill="currentColor" d="M144 479h-80c-17.7 0-32-14.3-32-32V64c0-17.7 14.3-32 32-32h80c17.7 0 32 14.3 32 32v383c0 17.7-14.3 32-32 32zm240-32V64c0-17.7-14.3-32-32-32h-80c-17.7 0-32 14.3-32 32v383c0 17.7 14.3 32 32 32h80c17.7 0 32-14.3 32-32z"></path>
</svg>

  
  `;
}

function pauseTrack() {
  curr_track.pause();
  isPlaying = false;
  playpause_btn.innerHTML =

  `<svg xmlns="http://www.w3.org/2000/svg" width="32" fill="currentColor" class="bi bi-pause-circle-fill play-btn"
  viewBox="0 0 16 16">
  <path
      d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814z" />
</svg>`

}

function nextTrack(track_list) {
  if (track_index < track_list.length - 1) track_index += 1;
  else track_index = 0;
  loadTrack(track_index);
  playTrack();
}

function prevTrack() {
  if (track_index > 0) track_index -= 1;
  else track_index = track_list.length;
  loadTrack(track_index);
  playTrack();
}

function seekTo() {
  let seekto = curr_track.duration * (seek_slider.value / 100);
  curr_track.currentTime = seekto;
  sessionStorage.setItem('currentTiming', curr_track.currentTime);
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

document.addEventListener("DOMContentLoaded", function() {
  const img = document.getElementById('album-img');

  img.onload = function() {
    Vibrant.from(img.src).getPalette()
      .then((palette) => {
        const mainColor = palette.Vibrant.getHex();
        console.log(mainColor); // Stampa il colore principale

        // Applicare il colore di sfondo a #album-info
        const albumInfo = document.getElementById('album-info');
        albumInfo.style.backgroundColor = mainColor;

      })
      .catch((error) => {
        console.error(error);
      });
  };

  // img.src = '/mnt/data/immagine_2022-10-17_003405925.png';
});

window.onload = () => {
  let currentAudio = sessionStorage.getItem('currentAudio')
  let currentCover = sessionStorage.getItem('currentCover')
  let currentName = sessionStorage.getItem('currentName')
  let currentArtist = sessionStorage.getItem('currentArtist')


  if (currentAudio) {
    curr_track.src = currentAudio;
  }


  if (currentCover) {
    curr_track.img = currentCover;
    const imgPlayer = document.getElementById('imgPlayer');
    if (imgPlayer) {
      imgPlayer.innerHTML = `<img src="${currentCover}" class="img-fluid" />`;
    }
  }


  if (currentName) {
    curr_track.name = currentName;
    const nameTrack = document.getElementById('nameTrack');
    if (nameTrack) {
      nameTrack.textContent = currentName;
    }
  }


  if (currentArtist) {
    curr_track.artist = currentArtist;
    const nameArt = document.getElementById('nameArt');
    if (nameArt) {
      nameArt.textContent = currentArtist;
    }
  }

  getAlbum();
}
