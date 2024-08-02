const cardList = document.getElementById('cardList');
const arrayCard = [
    {
        src: "assets/imgs/search/image-52.jpg",
        title: "Top Gaming Tracks",
    },

    {
        src: "assets/imgs/search/image-51.jpg",
        title: "Mood Booster",
    },

    {
        src: "assets/imgs/search/image-36.jpg",
        title: "In The Name Of The Blues",
    },

    {
        src: "assets/imgs/search/image-31.jpg",
        title: "Kickass Metal",
    },
    {
        src: "assets/imgs/search/image-29.jpg",
        title: "Classic Essentials",
    },

    {
        src: "assets/imgs/search/image-28.jpg",
        title: "Afro Hits",
    },

    {
        src: "assets/imgs/search/image-27.jpg",
        title: "Party Hits",
    },

    {
        src: "assets/imgs/search/image-24.jpg",
        title: "Peaceful Guitar",
    },

    {
        src: "assets/imgs/search/image-23.jpg",
        title: "Deep Focus",
    },


    {
        src: "assets/imgs/search/image-19.jpg",
        title: "Island Pop",
    },

    {
        src: "assets/imgs/search/image-18.jpg",
        title: "Sleep",
    },

    {
        src: "assets/imgs/search/image-14.jpg",
        title: "Top Songs Global",
    },


    {
        src: "assets/imgs/search/image-12.jpg",
        title: "All Out 10s",
    },

    {
        src: "assets/imgs/search/image-11.jpg",
        title: "Songs To Sing in the Car",
    },

    {
        src: "assets/imgs/search/image-8.jpg",
        title: "Beast Mode",
    },

    {
        src: "assets/imgs/search/image-7.jpg",
        title: "Rock This",
    },

    {
        src: "assets/imgs/search/image-6.jpg",
        title: "Are & Be",
    },

    {
        src: "assets/imgs/search/image-5.jpg",
        title: "Viva Latino",
    },

    {
        src: "assets/imgs/search/image-4.jpg",
        title: "Mint",
    },


    {
        src: "assets/imgs/main/image-3.jpg",
        title: "Concentrazione",
    },

    {
        src: "assets/imgs/main/image-4.jpg",
        title: "Peaceful Piano",
    },

    {
        src: "assets/imgs/main/image-5.jpg",
        title: "Lofi Beat",
    },

    {
        src: "assets/imgs/main/image-6.jpg",
        title: "Jazz Vibe",
    },

    {
        src: "assets/imgs/main/image-7.jpg",
        title: "Caffè Del Buongiorno",
    },

    {
        src: "assets/imgs/main/image-8.jpg",
        title: "Sanguegiovane",
    },

    {
        src: "assets/imgs/main/image-9.jpg",
        title: "Canta Sotto La Doccia",
    },

    {
        src: "assets/imgs/main/image-10.jpg",
        title: "Operazione Buonumore",
    },

    {
        src: "assets/imgs/main/image-13.jpg",
        title: "Pulizie Di Casa",
    },

    {
        src: "assets/imgs/main/image-14.jpg",
        title: "Allenamento a Casa",
    },

    {
        src: "assets/imgs/main/image-15.jpg",
        title: "Casa Dolce Casa",
    },

    {
        src: "assets/imgs/main/image-16.jpg",
        title: "Lavorare Da Casa",
    },

    {
        src: "assets/imgs/main/image-17.jpg",
        title: "New Music Friday",
    },

    {
        src: "assets/imgs/main/image-18.jpg",
        title: "Estate 2022",
    },

    {
        src: "assets/imgs/main/image-19.jpg",
        title: "Street Culto",
    },
];
const inputSearch = document.getElementById('inputSearch');
const form = document.getElementById('form');
const containerSearch = document.getElementById('containerSearch');

function displayPlaylist() {
    cardList.innerHTML = "";
    for (let i = 0; i < arrayCard.length; i++) {
        cardList.innerHTML += `
        
        <div class="col-3">
            <div class="cardSize rounded-3 overflow-hidden position-relative py-2 px-2 singleCard">
                <span class="fs-5"> ${arrayCard[i].title} </span>
                    <div class="rotatedImage">
                         <img src="${arrayCard[i].src}" class="img-fluid rounded-2">
                    </div>
            </div>
        </div>
        `;

        // function randomColor() {
        //     let randomInt = Math.floor(Math.random() * 16777215);
        //     let randomHex = randomInt.toString(16);
        //     while (randomHex.length < 6) {
        //         randomHex = '0' + randomHex;
        //     }
        //     return '#' + randomHex;
        // }

        function randomColor() {
            let r, g, b, brightness;

            do {
                r = Math.floor(Math.random() * 256);
                g = Math.floor(Math.random() * 256);
                b = Math.floor(Math.random() * 256);

                // Calcola la luminosità complessiva usando la formula percepita (Weighted RGB)
                brightness = 0.299 * r + 0.587 * g + 0.114 * b;

                // Ripeti se la luminosità è troppo alta (ad esempio, > 200) per garantire contrasto con testo bianco
            } while (brightness > 200);

            // Converti i componenti RGB in formato esadecimale e costruisci la stringa del colore
            let randomHex = '#' +
                r.toString(16).padStart(2, '0') +
                g.toString(16).padStart(2, '0') +
                b.toString(16).padStart(2, '0');

            return randomHex;
        }



        const cards = document.querySelectorAll('.singleCard');
        cards.forEach(card => {
            card.style.backgroundColor = randomColor();
        })
    }
}

function search(artist) {
    const url = "https://striveschool-api.herokuapp.com/api/deezer/search?q=";

    fetch(url + artist)
        .then((response) => {
            if (response.ok) {
                console.log(response);
                return response.json();
            } else {
                throw new Error('Non funziona');
            }
        })
        .then((singleArtist) => {
            console.log(singleArtist);
            console.log('Il suo ID è ' + singleArtist.data[0].artist.id)
            displayArtist(singleArtist);
        })
        .catch((err) => {
            console.log("Errore", err);
        })
}


function displayArtist(singleArtist) {

    const arrayName = [];
    const countMap = {};

    for (i = 0; i < singleArtist.data.length; i++) {
        let singleName = singleArtist.data[i].artist.name;
        let singlePic = singleArtist.data[i].artist.picture;
        let singleID = singleArtist.data[i].artist.id;
        arrayName.push({ name: singleName, picture: singlePic, id: singleID });

        if (countMap[singleName]) {
            countMap[singleName]++;
        } else {
            countMap[singleName] = 1;
        }
    };

    console.log(arrayName);
    console.log(countMap);

    let mostFrequentArtist = null;
    let maxCount = 0;

    for (let name in countMap) {
        if (countMap[name] > maxCount) {
            maxCount = countMap[name];
            mostFrequentArtist = name;
        }
    }

    let relevantPic = singleArtist.data.find(artist => artist.artist.name === mostFrequentArtist).artist.picture;
    let relevantID = singleArtist.data.find(artist => artist.artist.name === mostFrequentArtist).artist.id;
    let relevantName = mostFrequentArtist;


    cardList.style.visibility = 'hidden';
    containerSearch.innerHTML += `

     <div class="container-fluid">
    <div class="row py-2 px-4">
        <div class="col-12 p-0 mb-3">
            <h1 class="m-0 p-0"> Risultato piu rilevante</h1>
        </div>
        <a href="./artist.html?artistID=${relevantID}" class="text-decoration-none text-light">
        <div class="col-5 bg-dark rounded-2 py-4 px-3">

            <div class="imageArtistSearch">
                <img src="${relevantPic}" class="img-fluid rounded-pill">
            </div>
            <div>
                <span class="fs-2 fw-bold">${relevantName}</span>
            </div>
            <div>
                <span class="fw-light">Artista</span>
            </div>

        </div>
        </a>
    </div>
</div> 

    
    `


}


let debounceTimer;

form.addEventListener('input', function () {


    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
        let searchQ = inputSearch.value.trim();
        
        if (searchQ.length > 0) {
            containerSearch.innerHTML = ``;
            search(searchQ);
        } else {
            containerSearch.innerHTML = ``;
            cardList.style.visibility = 'visible';
            displayPlaylist()
        };
    },

        300);
});



window.onload = () => {
    displayPlaylist();
}









