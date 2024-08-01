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
