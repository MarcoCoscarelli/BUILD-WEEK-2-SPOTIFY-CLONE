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


// FUNZIONE X CREAZIONE PLAYLIST
function createPlaylist() {
  const playlist = prompt("Scrivi di seguito il nome della playlist", "ES: Summer 2K21")


  // localStorage.setItem("nome playlist", playlist)
  // const localPlay = localStorage.getItem(playlist)

  const listOfPlay = document.getElementById("playlist-index")
  const node = document.createElement("li")
  node.classList.add("pt-2")
  node.textContent = `${playlist}`
  listOfPlay.appendChild(node)
}

