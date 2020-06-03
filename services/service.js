
url = 'https://swapi.dev/api/films/'
const test = function () {
    return new Promise(() => {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                films = data.results
                films.map(film => {
                    let filmPlanets = []
                    let characters = []
                    let starships = []
                    film.planets.map(planet => {
                        api(planet)
                            .then(data => {
                                filmPlanets.push({
                                    name: data.name,
                                    terrain: data.terrain,
                                    gravity: data.gravity,
                                    diameter: data.diameter,
                                    population: data.population
                                })
                            })
                            .catch(err => console.log(err))
                    });
                    film.characters.map(character => {
                        api(character)
                            .then(data => {
                                let species = {}
                                data.species.map(specie => {
                                    api(specie)
                                    .then(data => {
                                        species = {
                                            name: data.name,
                                            language: data.language,
                                            average_height: data.average_height,
                                        }
                                    })
                                })
                                characters.push({
                                    name: data.name,
                                    gender: data.gender,
                                    hair_color: data.hair_color,
                                    eye_color: data.eye_color,
                                    height: data.height,
                                    homeworld: data.homeworld,
                                    species: species
                                })
                            })
                    });
                    film.starships.map(starship => {
                        api(starship)
                        .then(data => {
                            starships.push(data);
                        })
                        .catch(err => console.log(err))
                    })
                    
                    console.log(film.title, filmPlanets, characters, starshipBig(starships))
                }
                )
            })
    }).catch(function (error) {
        console.log(error)
    });
}

const starshipBig = starships => {
    return starships.sort((a,b) => {
        return parseFloat(b.length) - parseFloat(a.length)
    })[0]
}

const api = url => {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then(response => response.json())
            .then(data => resolve(data))
            .catch(err => reject(err))
    })
}