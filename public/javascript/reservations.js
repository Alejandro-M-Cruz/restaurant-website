const reservationsPageContent = {
    "title": "Reservas",
    "tableHeaders": [ "Fecha", "Hora", "Número de personas", "A nombre de" ],
    "availableResLabel": "Puede realizar $ reserva/s más",
    "backButtonLabel": "Atrás",
    "cancelResButtonLabel": "Cancelar reserva",
    "newResButtonLabel": "Realizar nueva reserva",
    "selectResAlertMessage": "Seleccione una reserva para poder cancelarla",
    "confirmCancelMessage": "¿Seguro que desea eliminar la reserva seleccionada?",
    "maxResAlertMessage": "Ha alcanzado el máximo de reservas"
}

const loggedOutPageContent = {
    "title": "Reservas",
    "message": "Inicie sesión o regístrese para poder acceder a sus reservas",
    "backButtonLabel": "Atrás",
    "loginButtonLabel": "Iniciar sesión",
    "signupButtonLabel": "Registrarse"
}

const API = "/api/v1"
document.querySelector(".page-title").innerHTML = reservationsPageContent.title
const content = document.querySelector(".content-section")
fetch(`${API}/user`).then(response => response.json()).then(user => {
    if (user != null) {
        content.setAttribute("w3-include-html", "/html/templates/logged-in-reservations-template.html")
        return w3IncludeHTML(() => loadReservations(user.id))
    }
    content.setAttribute("w3-include-html", "/html/templates/logged-out-reservations-template.html")
    w3IncludeHTML(loadLoggedOut)
})

function loadLoggedOut() {
    document.querySelector(".info").innerHTML = loggedOutPageContent.message
    document.querySelector(".back-button-alt").innerHTML = loggedOutPageContent.backButtonLabel
    document.querySelector(".login-button").innerHTML = loggedOutPageContent.loginButtonLabel
    document.querySelector(".signup-button").innerHTML = loggedOutPageContent.signupButtonLabel
}

let reservations

function loadReservations(userId) {
    fetch(`${API}/reservations/${userId}`).then(response => response.json()).then(data => {
        reservations = data
        loadPage()
    })
}

const MAX_RESERVATIONS = 5
const NEW_RESERVATION_HTML = "new-reservation.html"

function tableTitleHTML() {
    return `
        <tr class="title-row">
            <th>${reservationsPageContent.tableHeaders[0]}</th>
            <th>${reservationsPageContent.tableHeaders[1]}</th>
            <th>${reservationsPageContent.tableHeaders[2]}</th>
            <th>${reservationsPageContent.tableHeaders[3]}</th>
        </tr>
    `
}

function emptyRowHTML() {
    return `
        <tr class="empty-row">
            <td colspan="4">${reservationsPageContent.availableResLabel
                .replace("$", (MAX_RESERVATIONS-reservations.length).toString())}</td>
        </tr>
    `
}

function reservationHTML(reservation) {
    return `
        <tr id="reservation${reservation.id}">
            <td>${reservation.date}</td>
            <td>${reservation.time}</td>
            <td>${reservation.numberOfPeople}</td>
            <td>${reservation.name}</td>
        </tr>
    `
}

function fillTable(table) {
    table.innerHTML = tableTitleHTML()
    reservations.forEach((reservation) => table.innerHTML += reservationHTML(reservation))
    for (let i = reservations.length; i < MAX_RESERVATIONS; i++) table.innerHTML += emptyRowHTML()

    // Rows selection
    const rows = document.querySelectorAll(".reservations-table tr:not(.title-row):not(.empty-row)")
    rows.forEach((row) => {
        row.onclick = () => {
            rows.forEach((r) => {
                if (r !== row) r.classList.remove("selected-row")
            })
            row.classList.toggle("selected-row")
        }
    })
}

function loadPage() {
    const table = document.querySelector(".reservations-table")
    const backButton = document.querySelector(".back-button")
    const cancelButton = document.querySelector(".delete-button")
    const newResButton = document.querySelector(".create-button")

    fillTable(table)

    backButton.innerHTML = reservationsPageContent.backButtonLabel
    cancelButton.innerHTML = reservationsPageContent.cancelResButtonLabel
    cancelButton.onclick = () => {
        const selectedRow = document.querySelector(".selected-row")
        cancelOnClick(selectedRow, table)
    }
    newResButton.innerHTML = reservationsPageContent.newResButtonLabel
    newResButton.onclick = () => {
        if (reservations.length >= MAX_RESERVATIONS) return alert(reservationsPageContent.maxResAlertMessage)
        window.location.href = NEW_RESERVATION_HTML
    }
}

function cancelOnClick(selectedRow, table) {
    if (selectedRow === null) return alert(reservationsPageContent.selectResAlertMessage)
    for (let i=0; i<reservations.length; i++) {
        if (selectedRow.id === "reservation" + reservations[i].id) {
            if (confirm(reservationsPageContent.confirmCancelMessage)) {
                reservations.splice(i, 1)
                fillTable(table)
            } 
            break
        }
    }
}
