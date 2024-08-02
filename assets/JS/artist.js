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
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Ci sei quasi");
      }
    })
    .then((dataTrack) => {
      console.log(dataTrack);
      populateTracks(dataTrack);
      showAndHidden();
    })

    .catch((error) => {
      console.log("Hai sbagliato qualcosa", error);
    });
};

let top50Songs = [];
let songsCount = 0;
let expanded = false;

const populateTitle = function (dataArtist) {
  const imageBackground = document.getElementById("imageBackground");
  imageBackground.style.backgroundImage = `url(${dataArtist.picture_xl})`;
  const artistTitle = document.getElementById("artistTitle");
  artistTitle.innerText = dataArtist.name;
  const artistFan = document.getElementById("artistFan");
  artistFan.innerText = `${dataArtist.nb_fan} ascoltatori mensili`;
  const imgSm = document.getElementById("imgSm");
  imgSm.innerHTML = `
       <div id="likedImg" class="me-3">
<img src="${dataArtist.picture_small}" alt="imgSm">
</div>
  <div>
  <h6> Sono i top 10 brani</h6>
  <p>di ${dataArtist.name}</p>
  </div>
  `
  ;
};

function formatSeconds(seconds) {
  let minutes = Math.floor(seconds / 60);
  let secondsLeft = seconds % 60;

  secondsLeft = secondsLeft < 10 ? "0" + secondsLeft : secondsLeft;

  return minutes + ":" + secondsLeft;
}

const populateTracks = function (dataTrack) {
  top50Songs = dataTrack.data;
  console.log(top50Songs);
  songsCount = 0;
  loadSongs(5);
  // return top50Songs;
};

const loadSongs = function (contatore) {
  const songsList = document.getElementById("songsList");
  songsList.innerHTML = "";
  for (let i = 0; i < top50Songs.length && i < songsCount + contatore; i++) {
    let song = top50Songs[i];
    let imageAlbum = song.album.cover_small;
    let titleAlbum = song.title_short;
    let albumId = song.id;
    let durationSong = formatSeconds(song.duration);
    console.log(songsList);

    songsList.innerHTML += `
      <div class="track-row">
        <span class="track-number">${i + 1}</span>
        <img src=${imageAlbum} alt="imgAlbum" class="img-album">
        <span class="track-title">${titleAlbum}</span>
        <span class="album-id">${albumId}</span>
        <span class="duration-song">${durationSong}</span>
      </div>
    `;
  }
  songsCount += contatore;
};

const showAndHidden = function () {
  const btnOfExpand = document.getElementById("btnOfExpand");
  btnOfExpand.addEventListener("click", function () {
    if (!expanded) {
      loadSongs(5);
      btnOfExpand.innerText = "SHOW LESS";
    } else {
      songsCount -= 5;
      loadSongs(0);
      btnOfExpand.innerText = "SHOW MORE";
    }
    expanded = !expanded;
  });
};

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

infoArtist();
