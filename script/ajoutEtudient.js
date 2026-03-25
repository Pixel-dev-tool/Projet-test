const Ajout_webhook = "https://hook.eu1.make.com/eff2ik1cgfhfw5e2zj6oussktxjscbxa";

async function ajouterEtudiant() {

  try {
    const dataToSend = {
      matricule: document.getElementById("matricule").value,
      nom: document.getElementById("nom").value,
      prenom: document.getElementById("prenom").value,
      dateNaissance: document.getElementById("dateNaissance").value,
      dateEntree: document.getElementById("dateEntree").value,
      email: document.getElementById("email").value,
      telephone: document.getElementById("telephone").value,
      facebook: document.getElementById("facebook").value,
      niveau: document.getElementById("niveau").value,
      totalAPayer: parseFloat(document.getElementById("totalAPayer").value) || 0,
      montantPaye: parseFloat(document.getElementById("montantPaye").value) || 0,

      A1: document.getElementById("a1").checked,
      A2: document.getElementById("a2").checked,
      B1: document.getElementById("B1").value,
      B2: document.getElementById("B2").value,
      C1: document.getElementById("C1").value,
      C2: document.getElementById("C2").value,
      Code: document.getElementById("Code").value
    };

    const res = await fetch(Ajout_webhook, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(dataToSend)
    });

    const text = await res.text();

    console.log("Réponse:", text);

    alert("Étudiant ajouté ✅");

    closeModal();

    // optionnel: reload table
    if (typeof loadStudents === "function") {
      loadStudents();
    }

  } catch (error) {
    console.error(error);
    alert("Erreur ❌");
  }
}


function editStudent(index) {

  const e = students[index];

  openModal();

  document.getElementById("matricule").value = e.matricule;
  document.getElementById("nom").value = e.nom;
  document.getElementById("prenom").value = e.prenom;
  document.getElementById("niveau").value = e.niveau;

  document.getElementById("dateNaissance").value = e.dateNaissance;
  document.getElementById("dateEntree").value = e.dateEntree;

  document.getElementById("facebook").value = e.facebook;
  document.getElementById("email").value = e.email;
  document.getElementById("telephone").value = e.telephone;

  document.getElementById("totalAPayer").value = e.totalAPayer;
  document.getElementById("montantPaye").value = e.montantPayé;

  document.getElementById("a1").checked = e.A1;
  document.getElementById("a2").checked = e.A2;

  document.getElementById("B1").value = e.B1 || "Null";
  document.getElementById("B2").value = e.B2 || "Null";
  document.getElementById("C1").value = e.C1 || "Null";
  document.getElementById("C2").value = e.C2 || "Null";
  document.getElementById("Code").value = "modif";
  // stocker l'index pour update
  window.editIndex = index;
}
async function deleteStudent(index) {
  const e = students[index];
  
  if (!confirm("Êtes-vous sûr de vouloir supprimer cet étudiant ?")) {
    return;
  }
  try {
    const res = await fetch(Ajout_webhook, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        code: "dlt",
        matricule: e.matricule
      })
    });

    const text = await res.text();

    console.log("Réponse:", text);

    alert("Étudiant supprimé ✅");

    closeModal();

    // optionnel: reload table
    if (typeof loadStudents === "function") {
      loadStudents();
    }

  } catch (error) {
    console.error(error);
    alert("Erreur ❌");

    afficheEtudiants();
  }
}



function generateFactureNumber() {
    return "FACT-" + new Date().getFullYear() + "-" + Date.now();
}

function generateReference() {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
}


const Paiement_webhook = "https://hook.eu1.make.com/r9lt1xsfall3yckkvo41vkx4u3tm57an";
async function validerPaiement() {

    try {
        const e = students[window.paymentIndex];
        const paiementActuel = parseFloat(document.getElementById("p_montant").value) || 0;
        const total = e.totalAPayer || 0;
        const deja = e.montantPayé || 0;

        if (paiementActuel <= 0) {
            alert("Montant invalide ❌");
            return;
        }

        if (paiementActuel > (total - deja)) {
            alert("Montant dépasse le reste ❌");
            return;
        }

        const nouveauTotal = deja + paiementActuel;
        const reste = total - nouveauTotal;

  
      const res = await fetch(Paiement_webhook, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
            action: "paiement",

            facture: generateFactureNumber(),
            reference: generateReference(),
            date: new Date().toISOString().split("T")[0],

            matricule: e.matricule,
            nom: e.nom,
            prenom: e.prenom,
            niveau: e.niveau,

            paiementNumero: (e.nombrePaiements || 0) + 1,

            totalAPayer: total,
            dejaPaye: deja,
            paiementActuel: paiementActuel,
            nouveauTotal: nouveauTotal,
            reste: reste,

            mode: document.getElementById("p_mode").value
        })
    });

    const data = await res.json();

    console.log("Réponse:", data);
    if (data.success) {

    alert("Étudiant ajouté ✅");

    closeModal();

    // optionnel: reload table
    if (typeof loadStudents === "function") {
      loadStudents();
    }

  }
} catch (error) {
    console.log(error);
    alert("<p>Erreur ${error.message} ❌</p>");
  }
      
}
