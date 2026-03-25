function openFormModal() {
    document.getElementById("paymentModal").classList.add("show");
}

function closepaymentModal() {
    document.getElementById("modal").classList.remove("show");
}

function openPaymentModal(index) {

    const e = students[index];

    document.getElementById("paymentModal").classList.add("show");

    document.getElementById("p_matricule").value = e.matricule;
    document.getElementById("p_nom").value = e.nom;
    document.getElementById("p_prenom").value = e.prenom;
    document.getElementById("p_niveau").value = e.niveau;   

    document.getElementById("p_total").value = e.totalAPayer || 0;
    document.getElementById("p_dejaPaye").value = e.montantPayé || 0;

    document.getElementById("p_montant").value = "";
    document.getElementById("p_reste").value = e.totalAPayer - (e.montantPayé || 0);
    window.paymentIndex = index;
}

function closePaymentModal() {
    document.getElementById("paymentModal").classList.remove("show");
}