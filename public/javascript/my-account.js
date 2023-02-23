const pageContent = {
    "title": "Mi cuenta",
    "userInfo": "Número de teléfono: $",
    "backButtonLabel": "Atrás",
    "deleteButtonLabel": "Eliminar cuenta",
    "logoutButtonLabel": "Cerrar sesión"
}

const API = "/api/v1"
w3IncludeHTML(() => {
    fetch(`${API}/user`).then(response => response.json()).then(data => {
        loadPage(data)
    })
})

function loadPage(userData) {
    document.querySelector(".page-title").innerHTML = pageContent.title
    document.querySelector(".content-section").innerHTML = `
        <p class="info">${pageContent.userInfo.replace("$", userData.phoneNumber)}</p>
        <button class="management-button back-button" onclick="window.history.back()">${pageContent.backButtonLabel}</button>
        <button class="management-button delete-button">${pageContent.deleteButtonLabel}</button>
        <button class="management-button logout-button">${pageContent.logoutButtonLabel}</button>
    `
}