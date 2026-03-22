// Données d'exemple pour les étudiants
eleves =[   
{
    matricule: "E001",
    nom: "Rakoto",
    prenom: "Jean",
    dateNaissance: "2000-05-15",
    dateEntree: "2025-01-10",
    email: "rakoto@mail.com",
    telephone: "0341234567",
    facebook: "jean.rakoto",
    niveau: "B1",
    paiement: "payé",
    totalAPayer: 200,
    montantPayé: 200,
    A1: true,
    A2: true,
    B1: "L",
    B2: "LM",
    C1: "SM",
    C2: ""
}];

// script pour afficher les étudiants dans la table
function afficheEtudiants() {

    // Récupérer les données des étudiants (ici, nous utilisons des données d'exemple)
    let tbody = document.getElementById("tableBody");

    // Vider le corps du tableau avant de le remplir
    tbody.innerHTML = "";

    // Afficher les données des étudiants dans le tableau
    eleves.forEach((e) => {
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
        </tr>`;
        tbody.innerHTML += row;

    })
}

window.onload = afficheEtudiants;  
