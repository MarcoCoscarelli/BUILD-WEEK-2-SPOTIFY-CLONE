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
      populateTitle(dataArtist)


      //   imageBackground.innerHTML = `
      //    <div class="d-flex justify-content-between align-items-center">
      //           <div class="fs-4 d-flex">
      //             <div class="me-3">
      //               <i class="bi bi-arrow-left-circle"></i>
      //             </div>
      //             <div>
      //               <i class="bi bi-arrow-right-circle rounded-pill m-0 p-0"></i>
      //             </div>
      //           </div>
      //           <div class="dropdown">
      //             <button class="btn btn-secondary dropdown-toggle d-flex align-items-center rounded-pill ps-0 pe-2 py-0"
      //               type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
      //               <div class="imageUser me-1">
      //                 <img src="assets/imgs/main/image-1.jpg" class="img-fluid rounded-pill">
      //               </div>
      //               <span class="userName me-1">Riccardo Mamoli</span>
      //             </button>
      //             <ul class="dropdown-menu me-1" aria-labelledby="dropdownMenuButton1">
      //               <li><a class="dropdown-item" href="#">Profile</a></li>
      //               <li><a class="dropdown-item" href="#">Settings</a></li>
      //               <li><a class="dropdown-item" href="#">Log Out</a></li>
      //             </ul>
      //           </div>
      //         </div>
      //         <div class="mt-3 d-flex mb-3">
      //           <div class="d-flex flex-column justify-content-end">
      //             <div>
      //               <span><i class="bi bi-patch-check-fill"></i> Artista Verificato</span>
      //             </div>
      //             <div>
      //               <h1 class="p-0 album-title fw-bold"> I Pinguini Tattici Nucleari </h1>
      //             </div>
      //             <div class="d-flex align-items-center">
      //               <div>
      //                 <div class="d-flex align-items-center justofy-content-center">
      //                   <span class="fw-bold">
      //                     1.000.000 ascoltatori mensili
      //                   </span>
      //                 </div>
      //               </div>
      //             </div>
      //           </div>
      //         </div>
      //       </div>
      //   `
    })
    .catch((error) => {
      console.log("Hai sbagliato qualcosa", error);
    });
};

const populateTitle = function (dataArtist) {
    const imageBackground = document.getElementById("imageBackground");
    imageBackground.style.backgroundImage = `url(${dataArtist.picture_xl})`;
      const nameArtist = document.getElementById("nameArtist");
      nameArtist.innerText= dataArtist.name
}

infoArtist();

