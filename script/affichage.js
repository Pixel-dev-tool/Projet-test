
// URL du webhook pour le login
const ETUDIENT_WEBHOOK = "https://hook.eu1.make.com/vhkt0aixnbctlmn182uprw0kfp5s2m57";
let students = [];
async function fetchStudents() {
  const res = await fetch(ETUDIENT_WEBHOOK, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
        action: "fetch_students"
    })
  });

// Récupération de la réponse
  const data = await res.json();
  return data;

}

async function loadStudents() {
    students = await fetchStudents();
    console.log(students);
    afficheEtudiants();
  } 


// script pour afficher les étudiants dans la table
function afficheEtudiants() {

    // Récupérer les données des étudiants (ici, nous utilisons des données d'exemple)
    let tbody = document.getElementById("tableBody");

    // Vider le corps du tableau avant de le remplir
    tbody.innerHTML = "";
    document.getElementById("matricule").value = students.length+1;

    // Afficher les données des étudiants dans le tableau
    students.forEach((e, index) => {
        let row = `<tr>
            <td>${e.matricule}</td>
            <td>${e.nom}</td>
            <td>${e.prenom}</td>
            <td>${e.dateNaissance}</td>
            <td>${e.dateEntree}</td>
            <td>${e.email}</td>
            <td>${e.telephone}</td>
            <td>${e.facebook}</td>
            <td>${e.niveau}</td>
            <td>${e.totalAPayer}</td>
            <td>${e.montantPayé}</td>
            <td>${e.totalAPayer - e.montantPayé}</td>
            <td>${e.A1 ? "✔️" : "❌"}</td>
            <td>${e.A2 ? "✔️" : "❌"}</td>
            <td>${e.B1}</td>
            <td>${e.B2}</td>
            <td>${e.C2}</td>
            <td>${e.C1}</td>
            <td>
                <button onclick="editStudent(${index})">Modifier</button>
                <button onclick="deleteStudent(${index})">Supprimer</button>
                <button onclick="openPaymentModal(${index})">💰 Payer</button>
            </td>
        </tr>`;
        tbody.innerHTML += row;

    })
}

document.addEventListener("DOMContentLoaded", () => {

    const montantInput = document.getElementById("p_montant");

    montantInput.addEventListener("input", function () {

        let montant = parseFloat(this.value) || 0;
        let total = parseFloat(document.getElementById("p_total").value) || 0;
        let deja = parseFloat(document.getElementById("p_dejaPaye").value) || 0;

        let reste = total - (deja + montant);

        document.getElementById("p_reste").value = reste;
    });

});

// Appeler la fonction pour afficher les étudiants lorsque la page est chargée
window.onload = loadStudents;