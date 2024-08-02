// const url: 'https://striveschool-api.herokuapp.com/api/deezer/artist/'
// const urlParams = new URLSearchParams(location.search);
// const artistId = urlParams.get("artistId");


const urlArtist =
    "https://striveschool-api.herokuapp.com/api/deezer/artist/412";
// console.log(urlArtist);

const infoArtist = function () {
    fetch(urlArtist)
        .then((response) => {
            // console.log(response);
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("La response non è ok");
            }
        })
        .then((dataArtist) => {
            // console.log(dataArtist);
            populateArtistInfo(dataArtist);
            return fetch(dataArtist.tracklist);
        })
        .then((response) => {
            // console.log(response);
            if (response.ok) {
                return response.json()
            } else {
                throw new Error('Ci sei quasi')
            }
        })
        .then((dataTrack) => {
            // console.log(dataTrack)
            populateTracks(dataTrack)
            showMoreTracks()
        })

        .catch((error) => {
            console.log("Hai sbagliato qualcosa", error);
        });
};

infoArtist()


let top50Songs = [];
let songsCount = 0;
let expanded = false;

const populateArtistInfo = function (dataArtist) {
    const imageBackground = document.getElementById("imageBackground");
    imageBackground.style.backgroundImage = `url(${dataArtist.picture_xl})`;
    const artistTitle = document.getElementById('artistTitle')
    artistTitle.innerText = dataArtist.name
    const artistFan = document.getElementById('artistFan')
    artistFan.innerText = `${dataArtist.nb_fan} ascoltatori mensili`
    const imgSm = document.getElementById('imgSm')
    imgSm.innerHTML = `
  <img src="${dataArtist.picture_xl}" alt="img a caso" class="w-25 me-2">
                      <div>
                      <h6> Sono i top 10 Brani </h6>
                      <p>Di ${dataArtist.name}</p>
                    </div>
  `
}

function formatSeconds(seconds) {
    let minutes = Math.floor(seconds / 60);
    let secondsLeft = seconds % 60;

    secondsLeft = secondsLeft < 10 ? "0" + secondsLeft : secondsLeft;

    return minutes + ":" + secondsLeft;
}

const populateTracks = function (dataTrack) {
    top50Songs = dataTrack.data
    console.log(top50Songs)
    songsCount = 0
    loadSongs(5)
    // return top50Songs;
}

const loadSongs = function (contatore) {
    const songsList = document.getElementById('songsList')
    songsList.innerHTML = ''
    for (let i = 0; i < top50Songs.length && i < songsCount + contatore; i++) {
        let song = top50Songs[i]
        let artistName = song.artist.name
        let imageAlbum = song.album.cover_small;
        let titleAlbum = song.title_short;
        let albumId = song.id;
        let durationSong = formatSeconds(song.duration)
        console.log(songsList)

        songsList.innerHTML += `
      <div class="row px-4 py-2">
       <div class="d-flex  align-items-center fw-lighter">
         <div class="col-6 mb-2 d-flex align-items-center">
           <div class="me-3">
             <span>${i + 1}</span>
             <img src=${imageAlbum} alt= imgAlbum
           </div>
           <div class="d-flex flex-column">
             <span class="fw-bold">${titleAlbum}</span>
             <span> ${artistName}</span>
           </div>
         </div>
         <div class="col-3 d-flex justify-content-end">
           <span>${albumId}</span>
         </div>
         <div class="col-3 d-flex justify-content-end">
           <span>${durationSong}</span>
         </div>
       </div>
     </div>
    `
    }
    songsCount += contatore
}

const showMoreTracks = function () {
    const btnOfExpand = document.getElementById('btnOfExpand')
    btnOfExpand.addEventListener('click', function () {
        if (!expanded) {
            loadSongs(5);
            btnOfExpand.innerText = "SHOW LESS";
        } else {
            songsCount -= 5;
            loadSongs(0);
            btnOfExpand.innerText = "SHOW MORE";
        }
        expanded = !expanded;
    })
}
