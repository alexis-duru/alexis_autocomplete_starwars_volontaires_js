'use strict';

const input = document.createElement('input');
input.id = 'input';
document.body.append(input);
const ul = document.createElement('ul');
ul.id = 'ul';
document.body.append(ul);
ul.classList.add('autocomplete-items')

const autocomplete = () => {

    input.addEventListener('input', (event) => {
        const value = event.target.value;
        const commune = `https://geo.api.gouv.fr/communes?nom=${value}&fields=nom,code,codesPostaux,codeDepartement,codeRegion,population&format=json&geometry=centre`;
        const departement = `https://geo.api.gouv.fr/departements?nom=${value}&fields=nom,code,codeRegion&format=json&geometry=centre`;
        const region = `https://geo.api.gouv.fr/regions?nom=${value}&fields=nom,code&format=json&geometry=centre`;

        const fetchCommune = fetch(commune);
        const fetchDepartement = fetch(departement);
        const fetchRegion = fetch(region);

        Promise.all([fetchCommune, fetchDepartement, fetchRegion])

        .then((response) => {
            return Promise.all(response.map((res) => res.json()));
        })

        .then((data) => {
            const [communes, departements, regions] = data;
            const results = [...communes, ...departements, ...regions];
            // console.table(results);
            ul.innerHTML = '';
            results.forEach((result) => {
                // Je définis une couleur pour les communes, les départements et les régions grâce a une condition ternaire
                const li = document.createElement('li');
                li.innerHTML = result.nom + ' (' + result.code + ')';
                ul.append(li);
                // Utilise du CSS
                li.style.fontSize = '1.2rem';
                li.style.fontFamily = 'helvetica';
                // Tes départements sont affichés en vert
                const color = result.codesPostaux ? 'red' : result.codeDepartement ? 'blue' : 'green';
                li.style.color = color;

                // Je créé un évènement au click sur les li de la liste déroulante pour afficher le nom de la commune, du département ou de la région dans l'input

                li.addEventListener('click', (event) => {
                    input.value = event.target.innerText;
                    ul.innerHTML = '';
                });
                //  Me permet d'afficher en grand dans la page les informations du choix, et fermer l'autocomplete
                li.addEventListener('click', (event) => {
                    const div = document.createElement('div');
                    div.id = 'div';
                    document.body.append(div);
                    div.classList.add('result');
                    div.innerHTML = event.target.innerText;
                    // Utilise du CSS plutôt
                    div.style.fontSize = '2rem';
                    div.style.fontFamily = 'helvetica';
                    div.style.color = color;
                    div.style.textAlign = 'center';
                    div.style.marginTop = '2rem';
                    div.style.marginBottom = '2rem';
                    ul.innerHTML = '';
                    /**
                     * Ce ternaire est bizarre: tu as tjrs la div avec l'id 'div',
                     * vu qu'elle est créée et ajoutée un peu plus haut
                     */
                    document.getElementById('div') ? document.getElementById('div').replaceWith(div) : document.body.append(div);
                });
                // Me permet de fermer l'autocomplete lorsque je clique en dehors de l'input
                document.addEventListener('click', (event) => {
                    if (event.target.id !== 'input') {
                        ul.innerHTML = '';
                    }
                });
                // Me permet d'enlever les valeurs affichés lorsque j'efface ce qu'il y a dans l'input et que je recommence une recherche
                input.addEventListener('input', (event) => {
                    if (event.target.value === '') {
                        div.innerHTML = '';
                    }
                }
                );
            });
        });
    });
};

autocomplete();














