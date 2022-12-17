'use strict';

const newInput = document.createElement('input');

// Création de l'input

newInput.textContent = 'NAME';
newInput.placeholder = "Type name here..";
document.body.append(newInput);

// Création du boutton de l'ajout de nom

const addNameButton = document.createElement('button');
addNameButton.textContent = "Add Name";
document.body.append(addNameButton);

// Création du boutton du choix random du nom

const randomNameButton = document.createElement('button');
randomNameButton.textContent = "Random Name";
document.body.append(randomNameButton);

// Bouton et Event qui permet de sauvegarder la liste

const saveButton = document.createElement('button');
saveButton.textContent = 'Save';
document.body.append(saveButton);

saveButton.addEventListener('click', () => {
    const items = Array.from(list.children).map(item => item.textContent);
    localStorage.setItem('items', JSON.stringify(items));
});

// Bouton et Event qui permet de charger la liste

const loadButton = document.createElement('button');
loadButton.textContent = 'Load';
document.body.append(loadButton);

/**
 * Fonctionne, mais ça parait plus pratique de sauvegarder
 * et charger les données automatiquement
 */
loadButton.addEventListener('click', () => {
    const items = JSON.parse(localStorage.getItem('items'));
    items.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = item;
        list.append(listItem);
    });
});

// Boutton et Event qui permet de supprimer la liste

const deleteButton = document.createElement('button');
deleteButton.textContent = 'Delete';
document.body.append(deleteButton);

deleteButton.addEventListener('click', () => {
    localStorage.removeItem('items');
    // Tu n'as pas vraiment besoin de reload
    location.reload();
});

const list = document.createElement('ul');
document.body.append(list);

// Création d'une fonction qui permettra d'ajouter un nom à la liste

const allNames = [];

function addName() {
    const nameOfTheList = newInput.value;
    const listItem = document.createElement('li');
    listItem.textContent = nameOfTheList;
    list.append(listItem);
    allNames.push(nameOfTheList);
    // console.table(allNames);
}

addNameButton.addEventListener('click', addName);

let alreadySelected = [];

// Fonction qui me permet de tirer un nom au sort et de l'afficher

function randomName() {
    const resultRandom = Math.floor(Math.random() * allNames.length);
    console.table(resultRandom);
    const randomSection = document.createElement('section');
    document.body.append(randomSection);
    randomSection.classList.add('randomSection');
    const randomName = list.children[resultRandom].textContent;
    const randomNameDisplay = document.createElement('h1');
    randomNameDisplay.textContent = randomName;
    randomSection.append(randomNameDisplay);
    randomNameDisplay.classList.add("randomNameDisplay");
    /**
     * Pour éviter que cela arrive, tu devrais te baser sur une liste filtrée
     * en fonction de ton alreadySelected pour choisir le nouveau nom
     */
    if(alreadySelected.includes(randomName)) {
        const p = document.createElement('p');
        p.textContent = 'Ce nom a déja été tiré au sort, recommence';
        randomSection.append(p);
    }else{
        alreadySelected.push(randomName);
        console.table(alreadySelected);
        list.children[resultRandom].classList.add('selected');
    }

    randomNameButton.addEventListener('click', () => {
        randomSection.remove();
    });

    list.children[resultRandom].classList.add('selected');
    alreadySelected.push(randomName);
    console.table(alreadySelected);
}

randomNameButton.addEventListener('click', randomName);

// création de mon container avec l'ensemble de mes boutons

const containerButton = document.createElement('section');
containerButton.classList.add('container2');
document.body.append(containerButton);
containerButton.append(newInput, addNameButton, randomNameButton, saveButton, loadButton, deleteButton);

// Création de mon container avec ma liste de prénom et nom

const containerList = document.createElement('section');
containerList.classList.add('container');
document.body.append(containerList);
containerList.append(list);






