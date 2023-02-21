w3IncludeHTML(loadPage)

let reservationsPageContent =
    {
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

let reservations =
    [
      {
        "id": 1,
        "date": "08/02/2023",
        "hour": "14:30",
        "numberOfPeople": "7",
        "name": "Alberto Santana"
      },
      {
        "id": 2,
        "date": "10/02/2023",
        "hour": "14:30",
        "numberOfPeople": "2",
        "name": "Alberto Santana"
      },
      {
        "id": 3,
        "date": "07/02/2023",
        "hour": "14:30",
        "numberOfPeople": "5",
        "name": "Carlos Santana"
      },
      {
        "id": 4,
        "date": "15/02/2023",
        "hour": "14:30",
        "numberOfPeople": "1",
        "name": "Alberto Santana"
      }
    ]

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
            <td>${reservation.hour}</td>
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
    const cancelButton = document.querySelector(".cancel-res-button")
    const newResButton = document.querySelector(".new-res-button")

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
