let reservationsJson = `
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
      },
      {
        "id": 4,
        "date": "15/02/2023",
        "hour": "14:30",
        "numberOfPeople": "1",
        "name": "Alberto Santana"
      }
    ]
`

const MAX_RESERVATIONS = 5
const reservations = JSON.parse(reservationsJson)
const table = document.querySelector(".reservations-table")
const cancelButton = document.querySelector(".cancel-res-button")
const newResButton = document.querySelector(".new-res-button")
const confirmationDialog = document.querySelector(".confirmation-dialog")
const reservationToDelete = document.querySelector("#reservation-to-delete")
const dialogButtons = document.querySelectorAll(".dialog-button")

function tableTitleHTML() {
    return `
        <tr class="title-row">
            <th>Fecha</th>
            <th>Hora</th>
            <th>Número de personas</th>
            <th>A nombre de</th>
        </tr>
    `
}

function emptyRowHTML() {
    return `
        <tr class="empty-row">
            <td colspan="4">Puede realizar ${MAX_RESERVATIONS-reservations.length} reserva/s más</td>
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

function checkButtons() {
    const isRowSelected = document.querySelectorAll(".selected-row").length > 0
    cancelButton.disabled = !isRowSelected || confirmationDialog.style.display !== "none";
    newResButton.disabled = reservations.length === MAX_RESERVATIONS;
}

function fillTable() {
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
            checkButtons()
        }
    })
    checkButtons()
}

fillTable()

// Cancel button
cancelButton.onclick = () => {
    const selectedRow = document.querySelector(".selected-row")
    for (let i=0; i<reservations.length; i++) {
        if (selectedRow.id === "reservation" + reservations[i].id) {
            showConfirmationDialog(reservations[i])
            reservations.splice(i, 1)
            if (reservations.length === 0) cancelButton.disabled = true
            fillTable()
            break
        }
    }
    checkButtons()
}

function showConfirmationDialog(reservation) {
    reservationToDelete.innerHTML = reservationHTML(reservation)
    confirmationDialog.style.display = "block"
}

for (const button of dialogButtons) {
    button.onclick = () => {
        confirmationDialog.style.display = "none"
    }
}
