const url = 'https://striveschool-api.herokuapp.com/api/deezer/artist/412'

const getArtistTraks = function () {
fetch(url) 
.then((response) => {
    if (response.ok) {
        console.log(response)
        return response.json()
    } else {
        throw new Erron ('Ritardato stai sbagliando')
    }
})
.then((dataArtist) => {
    console.log(dataArtist)
})
.catch((error) => {
    console.log('Va male', error)
})
}

getArtistTraks()