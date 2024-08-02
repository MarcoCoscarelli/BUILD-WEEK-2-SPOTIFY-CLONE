// FUNZIONE X CREAZIONE PLAYLIST
function createPlaylist() {
  const playlist = prompt(
    "Scrivi di seguito il nome della playlist",
    "ES: Summer 2K21"
  );


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

  if (test2.classList.contains("col-9")) {
    test2.classList.remove("col-9");
    test2.classList.add("col-7");
    test1.classList.toggle("d-none");
  } else {
    test2.classList.remove("col-7");
    test2.classList.add("col-9");
    test1.classList.toggle("d-none");
  }
}

// FUNZIONE X PLAYER SPOTIFY
const addressBarParameters = new URLSearchParams(location.search)
const albumId = addressBarParameters.get('albumId') // questo torna l'_id nella barra degli indirizzi
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
                      <span class="fw-bold">${song.title}</span>
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
let curr_track = document.createElement("audio");

function loadTrack(track_index, track_list) {
  clearInterval(updateTimer);
  resetValues();
  curr_track.src = track_list[track_index].path;
  curr_track.load();

  // now_playing.textContent =
  //  "PLAYING " + (track_index + 1) + " OF " + track_list.length;

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
    '<i role="button" class="bi bi-pause-circle-fill fs-2"></i>';
}

function pauseTrack() {
  curr_track.pause();
  isPlaying = false;
  playpause_btn.innerHTML =
    '<i role="button" class="bi bi-play-circle-fill fs-2"></i>';
}

function nextTrack() {
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

  img.src = '/mnt/data/immagine_2022-10-17_003405925.png';
});

// Define the tracks that have to be played
/*
let track_list = [
  {
    name: "Night Owl",
    artist: "Broke For Free",
    image:
      "https://images.pexels.com/photos/2264753/pexels-photo-2264753.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    path: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/WFMU/Broke_For_Free/Directionless_EP/Broke_For_Free_-_01_-_Night_Owl.mp3",
  },
  {
    name: "Enthusiast",
    artist: "Tours",
    image:
      "https://images.pexels.com/photos/3100835/pexels-photo-3100835.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    path: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Tours/Enthusiast/Tours_-_01_-_Enthusiast.mp3",
  },
  {
    name: "Shipping Lanes",
    artist: "Chad Crouch",
    image:
      "https://images.pexels.com/photos/1717969/pexels-photo-1717969.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    path: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/ccCommunity/Chad_Crouch/Arps/Chad_Crouch_-_Shipping_Lanes.mp3",
  },
];*/

getAlbum();
