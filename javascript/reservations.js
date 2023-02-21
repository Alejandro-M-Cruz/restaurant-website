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
        "id": 5,
        "date": "15/02/2023",
        "hour": "14:30",
        "numberOfPeople": "1",
        "name": "Alberto Santana"
      }
    ]
`

const MAX_RESERVATIONS = 5
const NEW_RESERVATION_HTML = "new-reservation.html"

const reservations = JSON.parse(reservationsJson)
const table = document.querySelector(".reservations-table")
const cancelButton = document.querySelector(".cancel-res-button")
const newResButton = document.querySelector(".new-res-button")

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
        }
    })
}

fillTable()

// Cancel button
cancelButton.onclick = () => {
    const selectedRow = document.querySelector(".selected-row")
    cancelOnClick(selectedRow, reservations)
}

function cancelOnClick(selectedRow, reservations) {
    if (selectedRow === null) return alert("Seleccione una reserva para poder cancelarla")
    for (let i=0; i<reservations.length; i++) {
        if (selectedRow.id === "reservation" + reservations[i].id) {
            if (confirm("¿Seguro que desea eliminar la reserva seleccionada?")) {
                reservations.splice(i, 1)
                fillTable()
            } 
            break
        }
    }
}

newResButton.onclick = () => {
    const selectedRow = document.querySelector(".selected-row")
    if (reservations.length >= MAX_RESERVATIONS) return alert("Ha alcanzado el máximo de reservas")
    window.location.href = NEW_RESERVATION_HTML
}