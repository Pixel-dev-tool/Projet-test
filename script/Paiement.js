// Générer numéro facture
function generateFactureNumber() {
    return "FACT-" + new Date().getFullYear() + "-" + Date.now();
}

// Générer référence paiement
function generateReference() {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
}

// Date du jour
function todayDate() {
    return new Date().toISOString().split("T")[0];
}