let currentEditingNode = null;
let currentDeletingNode = null; // Nodo della playlist da eliminare

// Funzione per aprire il modale di creazione playlist
function createPlaylist() {
  const createPlaylistModal = new bootstrap.Modal(document.getElementById('createPlaylistModal'));
  createPlaylistModal.show();
}

// Funzione per salvare una nuova playlist
function saveNewPlaylist() {
  const newPlaylistName = document.getElementById('newPlaylistName').value;
  if (newPlaylistName) {
    // Aggiungi la playlist a localStorage
    let playlists = JSON.parse(localStorage.getItem("playlists")) || [];
    playlists.unshift(newPlaylistName);  // Aggiungi in cima alla lista
    localStorage.setItem("playlists", JSON.stringify(playlists));

    // Aggiorna la lista di playlist nella pagina corrente
    const listOfPlay = document.getElementById("playlist-index");
    const node = createPlaylistNode(newPlaylistName);
    listOfPlay.prepend(node);  // Aggiungi in cima alla lista

    // Chiudi il modale
    const createPlaylistModal = bootstrap.Modal.getInstance(document.getElementById('createPlaylistModal'));
    createPlaylistModal.hide();
  }
}

// Funzione per caricare le playlist all'avvio della pagina
function loadPlaylists() {
  const playlists = JSON.parse(localStorage.getItem("playlists")) || [];
  const listOfPlay = document.getElementById("playlist-index");

  // Svuota la lista esistente
  listOfPlay.innerHTML = '';

  // Aggiungi le playlist caricate
  playlists.forEach(playlist => {
    const node = createPlaylistNode(playlist);
    listOfPlay.appendChild(node);
  });
}

// Funzione per creare un nodo lista per una playlist
function createPlaylistNode(playlist) {
  const node = document.createElement("li");
  node.classList.add("pt-2");
  node.textContent = playlist;

  // Aggiungi l'evento per il click destro
  node.addEventListener("contextmenu", function (event) {
    event.preventDefault();
    showContextMenu(event, node);
  });

  return node;
}

// Funzione per mostrare il menu contestuale
function showContextMenu(event, playlistNode) {
  const contextMenu = document.createElement("div");
  contextMenu.classList.add("context-menu");
  contextMenu.style.top = `${event.clientY}px`;
  contextMenu.style.left = `${event.clientX}px`;

  const editOption = document.createElement("div");
  editOption.textContent = "Modifica";
  editOption.addEventListener("click", function () {
    editPlaylist(playlistNode);
    document.body.removeChild(contextMenu);
  });

  const deleteOption = document.createElement("div");
  deleteOption.textContent = "Elimina";
  deleteOption.addEventListener("click", function () {
    showDeleteModal(playlistNode); // Mostra il modale di conferma eliminazione
    document.body.removeChild(contextMenu);
  });

  contextMenu.appendChild(editOption);
  contextMenu.appendChild(deleteOption);
  document.body.appendChild(contextMenu);

  document.addEventListener("click", function onClick() {
    document.body.removeChild(contextMenu);
    document.removeEventListener("click", onClick);
  });
}

// Funzione per aprire il modale di modifica playlist
function editPlaylist(playlistNode) {
  currentEditingNode = playlistNode;
  const editPlaylistName = document.getElementById('editPlaylistName');
  editPlaylistName.value = playlistNode.textContent;

  const editPlaylistModal = new bootstrap.Modal(document.getElementById('editPlaylistModal'));
  editPlaylistModal.show();
}

// Funzione per salvare le modifiche alla playlist
function saveEditedPlaylist() {
  const newName = document.getElementById('editPlaylistName').value;
  if (newName && currentEditingNode) {
    const playlists = JSON.parse(localStorage.getItem("playlists")) || [];
    const index = playlists.indexOf(currentEditingNode.textContent);
    if (index > -1) {
      playlists[index] = newName;
      localStorage.setItem("playlists", JSON.stringify(playlists));
      currentEditingNode.textContent = newName;

      // Chiudi il modale
      const editPlaylistModal = bootstrap.Modal.getInstance(document.getElementById('editPlaylistModal'));
      editPlaylistModal.hide();
    }
  }
}

// Funzione per mostrare il modale di conferma eliminazione
function showDeleteModal(playlistNode) {
  currentDeletingNode = playlistNode; // Imposta il nodo corrente per l'eliminazione
  const deletePlaylistModal = new bootstrap.Modal(document.getElementById('deletePlaylistModal'));
  deletePlaylistModal.show();
}

// Funzione per confermare ed eliminare la playlist
function confirmDeletePlaylist() {
  if (currentDeletingNode) {
    const playlists = JSON.parse(localStorage.getItem("playlists")) || [];
    const index = playlists.indexOf(currentDeletingNode.textContent);
    if (index > -1) {
      playlists.splice(index, 1);
      localStorage.setItem("playlists", JSON.stringify(playlists));
      currentDeletingNode.parentNode.removeChild(currentDeletingNode);

      // Chiudi il modale
      const deletePlaylistModal = bootstrap.Modal.getInstance(document.getElementById('deletePlaylistModal'));
      deletePlaylistModal.hide();
    }
  }
}

// Carica le playlist all'avvio della pagina
document.addEventListener("DOMContentLoaded", loadPlaylists);
