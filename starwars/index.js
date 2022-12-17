'use strict';

const AllButton = document.createElement('button');

AllButton.textContent = 'TOUS';
AllButton.id = 'all';
document.body.append(AllButton);

const RandomButton = document.createElement('button');
RandomButton.textContent = 'RANDOM';
RandomButton.id = 'random';
document.body.append(RandomButton);

// Me permet de charger et afficher les noms des 10 premiers personnages.

const loadTenFirstCharacters = async () => {
    const response = await fetch('https://swapi.dev/api/people/');
    const data = await response.json();
    const characters = data.results;
    console.log(characters)
    characters.forEach(character => {
        const div = document.createElement('div');
        div.textContent = character.name;
        document.body.append(div);
    });
}

const loadFilms = async (id) => {
    const response = await fetch(`https://swapi.dev/api/films/${id}`);
    const allFilms = await response.json();
    return allFilms;
}

// Me permet de charger et afficher un personnage random.

const loadRandomCharacter = async () => {
    const response = await fetch('https://swapi.dev/api/people/');
    const data = await response.json();
    const characters = data.results;
    const randomCharacter = characters[Math.floor(Math.random() * characters.length)];
    console.table(randomCharacter);
    const div = document.createElement('div');
    div.textContent = 'Name : ' + randomCharacter.name;
    document.body.append(div);
    const div2 = document.createElement('div');
    div2.textContent = 'Height : ' + randomCharacter.height;
    document.body.append(div2);
    const div3 = document.createElement('div');
    div3.textContent = 'Mass : ' + randomCharacter.mass;
    document.body.append(div3);
    const films = randomCharacter.films;
    films.forEach(async film => {
        const id = film.split('/')[5];
        const allFilms = await loadFilms(id);
        const div = document.createElement('div');
        div.textContent = 'films : ' + allFilms.title;
        document.body.append(div);
    });
}

RandomButton.addEventListener('click', () => {
    loadRandomCharacter();
});

/**
 * Non utilisé ?
 * Perso je trouve ça plus propre de charger toutes les infos
 * d'un perso avant de l'afficher
 */
const loadCharacterWithFilms = async (id) => {
    const response = await fetch(`https://swapi.dev/api/people/${id}`);
    const data = await response.json();
    const films = await Promise.all(data.films.map(film => loadFilms(film)));
    console.log(films)
    return {
        ...data,
        films
    }
}

AllButton.addEventListener('click', loadTenFirstCharacters);

// Me permet de charger et afficher un personnage en fonction de son id.

const loadCharacter = async (id) => {
    const response = await fetch(`https://swapi.dev/api/people/${id}/`);
    const data = await response.json();
    // const character = data;
    console.log(data);

    /**
     * Ça vaudrait le coup de faire une fonction du code
     * de création des infos d'un personnage pour éviter la duplication
     */
    const div = document.createElement('div');
    div.textContent = 'Name : ' + data.name;
    /**
     * Si tu cliques vite sur plusieurs boutons
     * les infos des persos vont se cumuler à l'écran
     */
    document.body.append(div);
    const div2 = document.createElement('div');
    div2.textContent = 'Height : ' + data.height;
    document.body.append(div2);
    const div3 = document.createElement('div');
    div3.textContent = 'Mass : ' + data.mass;
    document.body.append(div3);
    const films = data.films;
    console.log(films)
    films.forEach(async film => {
        const id = film.split('/')[5];
        const allFilms = await loadFilms(id);
        const div = document.createElement('div');
        div.textContent = 'films : ' + allFilms.title;
        document.body.append(div);
    });

    // Tu pourrais sortir ce code de cette fonction pour ne l'exécuter qu'une seule fois
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const divs = document.querySelectorAll('div');
            divs.forEach(div => div.remove());
        });
    })
}

for (let i = 1; i <= 10; i++) {
    const button = document.createElement('button');
    button.textContent = i;
    button.addEventListener('click', () => loadCharacter(i));
    document.body.append(button);
}

// Me permet d'ajouter et enlever la couleur d'un bouton lorsque je clique dessus

const buttons = document.querySelectorAll('button');

buttons.forEach(button => {
    button.addEventListener('click', () => {
        buttons.forEach(button => button.classList.remove('active'));
        button.classList.add('active');
        console.log('click')
    });
})

// Me permet de reset les informations affichées

const resetButton = document.createElement('button');

resetButton.textContent = 'RESET';
resetButton.id = 'reset';
document.body.append(resetButton);

resetButton.addEventListener('click', () => {
    location.reload();
})
