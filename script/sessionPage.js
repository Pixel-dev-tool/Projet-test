
// sessionPage.js
let nowtoken = localStorage.getItem("token");
let expireTime = localStorage.getItem("expireTime");

// Vérifier si le token existe et s'il n'est pas expiré
let now = new Date().getTime();

// Si le token n'existe pas ou s'il est expiré, rediriger vers la page de connexion
if (!nowtoken || !expireTime || now > expireTime) {
    localStorage.clear();
    window.location.href = "login.html";
}

// Ajouter un écouteur d'événement pour réinitialiser le temps d'expiration à chaque clic
document.onclick = () => { 
    const newExpireTime = new Date().getTime() + 60 * 60 * 60 * 1000; // 30 minutes
    localStorage.setItem("expireTime", newExpireTime);
}
// Fin du script sessionPage.js