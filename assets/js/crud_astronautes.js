let astronautes = JSON.parse(localStorage.getItem("astronautes")) || [];
let indexModification = -1;

// ✅ Pagination (ADDED)
let currentPage = 1;
const rowsPerPage = 5; // change this number if you want more/less per page
let lastRenderSource = astronautes; // keeps track of what we're displaying (full list or filtered)

// ✅ Pagination buttons listeners (ADDED)
// Make sure you have these elements in HTML: btnPrev, btnNext, pageInfo
document.getElementById("btnPrev").addEventListener("click", () => {
  goToPage(currentPage - 1);
});

document.getElementById("btnNext").addEventListener("click", () => {
  goToPage(currentPage + 1);
});

renderTable();

function createAstronaut() {
  let nom = document.getElementById("astroName").value.trim();
  let role = document.getElementById("astroRole").value;
  let mission = document.getElementById("astroMission").value.trim();

  if (nom === "" || mission === "") {
    alert("⛔ Stop ! Tous les champs sont obligatoires habibi !");
    return;
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
    resetButton();
    indexModification = -1;
  }

  savedata();

  // ✅ After adding/updating, go to last page so you can see the new item (ADDED)
  lastRenderSource = astronautes;
  const totalPages = Math.max(1, Math.ceil(lastRenderSource.length / rowsPerPage));
  currentPage = totalPages;

  renderTable();
  resetForm();
}

function searchAstronauts() {
  const query = document.getElementById("searchInput").value.toLowerCase();

  const filteredAstronautes = astronautes.filter(
    (astro) =>
      astro.nom.toLowerCase().includes(query) ||
      astro.role.toLowerCase().includes(query) ||
      astro.mission.toLowerCase().includes(query)
  );

  // ✅ Reset page when searching (ADDED)
  currentPage = 1;

  renderTable(filteredAstronautes);
}

// ✅ Pagination helpers (ADDED)
function goToPage(page) {
  const totalPages = Math.max(1, Math.ceil(lastRenderSource.length / rowsPerPage));
  currentPage = Math.min(Math.max(1, page), totalPages);
  renderTable(lastRenderSource);
}

function updatePaginationUI(totalItems) {
  const totalPages = Math.max(1, Math.ceil(totalItems / rowsPerPage));

  document.getElementById("pageInfo").textContent = `Page ${currentPage} / ${totalPages}`;

  document.getElementById("btnPrev").disabled = currentPage === 1;
  document.getElementById("btnNext").disabled = currentPage === totalPages;

  document.getElementById("btnPrev").classList.toggle("opacity-50", currentPage === 1);
  document.getElementById("btnPrev").classList.toggle("cursor-not-allowed", currentPage === 1);

  document.getElementById("btnNext").classList.toggle("opacity-50", currentPage === totalPages);
  document.getElementById("btnNext").classList.toggle("cursor-not-allowed", currentPage === totalPages);
}

// On ajoute un paramètre optionnel "sourceDonnees"
function renderTable(sourceDonnees = astronautes) {
  // ✅ Remember current dataset (ADDED)
  lastRenderSource = sourceDonnees;

  const tbody = document.getElementById("astroTableBody");
  tbody.innerHTML = "";

  // ✅ Pagination slice (ADDED)
  const totalItems = sourceDonnees.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / rowsPerPage));

  if (currentPage > totalPages) currentPage = totalPages;

  const start = (currentPage - 1) * rowsPerPage;
  const end = start + rowsPerPage;
  const pageItems = sourceDonnees.slice(start, end);

  pageItems.forEach((astro) => {
    // ASTUCE MAGIQUE 🌟 :
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

  // ✅ Update UI (ADDED)
  updatePaginationUI(totalItems);
}

function preparerEdition(index) {
  indexModification = index;
  const asrtronaut = astronautes[indexModification];

  document.getElementById("astroName").value = asrtronaut.nom;
  document.getElementById("astroRole").value = asrtronaut.role;
  document.getElementById("astroMission").value = asrtronaut.mission;

  const btn = document.getElementById("btnSaveAstro");
  btn.innerHTML = "<i class='fa-solid fa-rotate mr-2'></i> Mettre à jour";
  btn.className =
    "w-full bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded transition";
}

function supprimer(index) {
  if (confirm("vous voulez vraiment supprimer ça")) {
    astronautes.splice(index, 1);
    savedata();

    // ✅ If we were showing filtered list, keep it; otherwise use full list (ADDED)
    // Here we re-render using lastRenderSource, but after delete it may be stale if it was filtered.
    // simplest: if lastRenderSource === astronautes (full list), renderTable() is fine.
    // If you want delete to also remove from filtered view, just call renderTable(lastRenderSource) after updating it.
    renderTable(lastRenderSource === astronautes ? astronautes : lastRenderSource.filter(a => astronautes.includes(a)));
  }
}

function resetForm() {
  document.getElementById("astroName").value = "";
  document.getElementById("astroRole").value = "Commandant";
  document.getElementById("astroMission").value = "";
}

function resetButton() {
  const btn = document.getElementById("btnSaveAstro");
  btn.innerHTML = "<i class='fa-solid fa-save mr-2'></i> Enregistrer";
  btn.className =
    "w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition";
}

function savedata() {
  localStorage.setItem("astronautes", JSON.stringify(astronautes));
}



