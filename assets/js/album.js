const URL = "https://striveschool-api.herokuapp.com/api/deezer/album/";

/*const addressBarParameters = new URLSearchParams(location.search);
const urlAlbumId = addressBarParameters.get("albumId");
console.log("L'albumId è", urlAlbumId);
*/

const getAlbum = function () {
  fetch(URL + 108564)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Errore nella chiamata, response non OK");
      }
    })
    .then((album) => {
      console.log(album);

      document.getElementById("album-img").src = album.cover_medium;
      document.getElementById("album-title").innerText = album.title;
      document.getElementById("album-artist-name").innerText =
        album.artist.name;
      document.getElementById("album-release-date").innerText = new Date(
        album.release_date
      ).getFullYear();
      document.getElementById("tracks-number").innerText =
        album.tracks.data.length + " Brani, ";
      document.getElementById("album-duration").innerText =
        formatSecondsWithletters(album.duration);

      let songs = album.tracks.data;

      songs.forEach((song) => {
        // song.preview
        document.getElementById("songs").innerHTML += `
            <div class="row px-4 py-2" id="songs" onClick="startPreview('${
              song.preview
            }')">
                <div class="d-flex  align-items-center fw-lighter">
                    <div class="col-6 mb-2 d-flex align-items-center">
                    <div class="me-3">
                        <span>${songs.indexOf(song) + 1}</span>
                    </div>
                    <div class="d-flex flex-column">
                        <span class="fw-bold">${song.title}</span>
                        <span>${album.artist.name}</span>
                    </div>
                    </div>
                    <div class="col-3 d-flex justify-content-end">
                    <span>${song.id}</span>
                    </div>
                    <div class="col-3 d-flex justify-content-end">
                    <span>${formatSeconds(song.duration)}</span>
                    </div>
                </div>
            </div>
            
        `;
      });
      document.querySelector("main").innerHTML += `
        </div>
        </div>
        </div>
        </div>
        </div>`;
    })
    .catch((error) => {
      console.log("ERRORE!", error);
    });
};

function formatSecondsWithletters(seconds) {
  let minutes = Math.floor(seconds / 60);
  let secondsLeft = seconds % 60;

  secondsLeft = secondsLeft < 10 ? "0" + secondsLeft : secondsLeft;

  return minutes + " min " + secondsLeft + " sec";
}

function formatSeconds(seconds) {
  let minutes = Math.floor(seconds / 60);
  let secondsLeft = seconds % 60;

  secondsLeft = secondsLeft < 10 ? "0" + secondsLeft : secondsLeft;

  return minutes + ":" + secondsLeft;
}

function startPreview(previewUrl) {
  const audio = new Audio(previewUrl);
  audio.play();
}

getAlbum();
