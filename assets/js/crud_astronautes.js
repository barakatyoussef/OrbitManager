let astronautes = JSON.parse(localStorage.getItem("astronautes")) || [];
let indexModification = -1;

renderTable()

function createAstronaut() {

    let nom = document.getElementById("astroName").value.trim();
    let role = document.getElementById("astroRole").value;
    let mission = document.getElementById("astroMission").value.trim();

    // 2. SÉCURITÉ RENFORCÉE (Validation)
    // On vérifie si Nom OU Mission est vide
    if (nom === "" || mission === "") {
        alert("⛔ Stop ! Tous les champs sont obligatoires habibi !");
        return; // Le mot magique : il arrête la fonction ici. Rien ne sera ajouté.
    }


  const nouveauAstronaute = {
    nom: nom,
    role: role,
    mission: mission,
  };

  if (indexModification === -1) {
    astronautes.push(nouveauAstronaute);
  } else {
    astronautes[indexModification] = nouveauAstronaute;
    resetButton()
    indexModification = -1;
  }
  savedata()
  renderTable()
  resetForm()
}

function searchAstronauts() {

    const query = document.getElementById('searchInput').value.toLowerCase();


    const filteredAstronautes = astronautes.filter(astro =>
        astro.nom.toLowerCase().includes(query) ||
        astro.role.toLowerCase().includes(query) ||
        astro.mission.toLowerCase().includes(query)
    );

    renderTable(filteredAstronautes);
}

// On ajoute un paramètre optionnel "sourceDonnees"
function renderTable(sourceDonnees = astronautes) {
    const tbody = document.getElementById('astroTableBody');
    tbody.innerHTML = "";

    sourceDonnees.forEach((astro) => {
        // ASTUCE MAGIQUE 🌟 :
        // On cherche à quel numéro se trouve cet astronaute dans la GRANDE liste principale
        // Comme ça, même si on filtre, on supprime toujours la bonne personne.
        const indexReel = astronautes.indexOf(astro);

        const row = `
        <tr class="border-b border-gray-700 hover:bg-gray-700/50 transition duration-200">
            <td class="p-4 text-white font-semibold text-base">${astro.nom}</td>

            <td class="p-4">
                <span class="inline-flex items-center gap-2 bg-indigo-600 text-white text-sm font-bold px-4 py-1.5 rounded-full shadow-lg shadow-indigo-500/40 border border-indigo-400/30">
                    <i class="fa-solid fa-user-astronaut text-xs"></i>
                    ${astro.role}
                </span>
            </td>

            <td class="p-4 text-gray-300 font-medium">${astro.mission}</td>

            <td class="p-4 text-center">
                <button class="text-yellow-400 hover:text-white hover:bg-yellow-500 p-2 rounded-lg transition-all mx-1" onclick="preparerEdition(${indexReel})">
                    <i class="fa-solid fa-pen-to-square text-lg"></i>
                </button>
                <button class="text-red-400 hover:text-white hover:bg-red-600 p-2 rounded-lg transition-all mx-1" onclick="supprimer(${indexReel})">
                    <i class="fa-solid fa-trash text-lg"></i>
                </button>
            </td>
        </tr>`;

        tbody.innerHTML += row;
    });
}

function preparerEdition(index){
    indexModification=index;
    const asrtronaut=astronautes[indexModification]

    document.getElementById("astroName").value= asrtronaut.nom
    document.getElementById("astroRole").value= asrtronaut.role
    document.getElementById("astroMission").value= asrtronaut.mission

    const btn=document.getElementById('btnSaveAstro')
    btn.innerHTML = "<i class='fa-solid fa-rotate mr-2'></i> Mettre à jour";
    btn.className = "w-full bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded transition";
}

function supprimer(index){
    if(confirm('vous voulez vraiment supprimer ça')){
        astronautes.splice(index,1)
        renderTable()
        savedata()
    }
}

function resetForm(){
    document.getElementById("astroName").value=''
    document.getElementById("astroRole").value='Commandant'
    document.getElementById("astroMission").value=''
}

function resetButton(){
    const btn=document.getElementById('btnSaveAstro');
    btn.innerHTML = "<i class='fa-solid fa-save mr-2'></i> Enregistrer";
    btn.className = "w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition";
}

function savedata(){
    localStorage.setItem("astronautes",JSON.stringify(astronautes))
}


