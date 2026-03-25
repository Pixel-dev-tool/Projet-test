
// URL du webhook pour le login
const Payement_WEBHOOK = "https://hook.eu1.make.com/lb3cspjo74thqbp8fla5t164c2ofvxag";
let payements = [];
async function fetchPayements() {
  const res = await fetch(Payement_WEBHOOK, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
        action: "fetch_payements"
    })
  });

// Récupération de la réponse
  const data = await res.json();
  return data;

}


async function loadPayements() {
    payements = await fetchPayements();
    console.log(payements);
    affichePayements();
  } 


// script pour afficher les étudiants dans la table
function affichePayements() {

    // Récupérer les données des étudiants (ici, nous utilisons des données d'exemple)
    let tbody = document.getElementById("tableBody");

    // Vider le corps du tableau avant de le remplir
    tbody.innerHTML = "";

    // Afficher les données des étudiants dans le tableau
    payements.forEach((e) => {
        let row = `<tr>
        <td>${e.Reference}</td>
            <td>${e.Mode_pay}</td>
            <td>${e.nom}</td>
            <td>${e.Prénom}</td>
            <td>${e.Date}</td>
            <td>${e.Matricule_etudiant}</td>
            <td>${e.email}</td>
            <td>${e.Niveau}</td>
            <td>${e.TotalAPayer}</td>
            <td>${e.DejatPayer}</td>
            <td>${e.Reste}</td>
        </tr>`;
        tbody.innerHTML += row;

    })
}


// Appeler la fonction pour afficher les étudiants lorsque la page est chargée
window.onload = loadPayements;