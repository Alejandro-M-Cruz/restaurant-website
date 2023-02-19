let reservationsJson = `
    [
      {
        "date": "08/02/2023",
        "hour": "14:30",
        "numberOfPeople": "7",
        "name": "Alberto Santana"
      },
      {
        "date": "10/02/2023",
        "hour": "14:30",
        "numberOfPeople": "2",
        "name": "Alberto Santana"
      },
      {
        "date": "07/02/2023",
        "hour": "14:30",
        "numberOfPeople": "5",
        "name": "Carlos Santana"
      },
      {
        "date": "15/02/2023",
        "hour": "14:30",
        "numberOfPeople": "1",
        "name": "Alberto Santana"
      }
    ]
`

const MAX_RESERVATIONS = 5
const reservations = JSON.parse(reservationsJson)

function emptyRow() {
    return `<td colspan="4">Puede realizar ${MAX_RESERVATIONS-reservations.length} reserva/s más</td>`
}

function fillTable() {
    const table = document.querySelector(".reservations-table")
    table.innerHTML = `
        <tr className="title-row">
            <th>Fecha</th>
            <th>Hora</th>
            <th>Número de personas</th>
            <th>A nombre de</th>
        </tr>
    `
    reservations.forEach((reservation) => {
        table.innerHTML += `
            <tr>
                <td>${reservation.date}</td>
                <td>${reservation.hour}</td>
                <td>${reservation.numberOfPeople}</td>
                <td>${reservation.name}</td>
            </tr>
        `
    })
    for (let i = reservations.length; i < MAX_RESERVATIONS; i++) {
        table.innerHTML += `
            <tr class="empty-row">
                ${emptyRow()}
            </tr>
        `
    }

    const rows = document.querySelectorAll(".reservations-table tr:not(.title-row):not(.empty-row)")
    rows.forEach((row) => {
        row.onclick = () => {
            rows.forEach((r) => {
                if (r !== row) {
                    r.classList.remove("selected-row")
                }
            })
            row.classList.toggle("selected-row")
        }
    })
}

fillTable()

const cancelButton = document.querySelector(".cancel-res-button")
cancelButton.onclick = () => {
    const selectedRow = document.querySelector(".selected-row")
    const date = selectedRow.childNodes[1].firstChild.textContent
    const hour = selectedRow.childNodes[3].firstChild.textContent
    console.log(selectedRow.childNodes)
    for (let i=0; i<reservations.length; i++) {
        if (reservations[i].date === date && reservations[i].hour === hour) {
            reservations.splice(i, 1)
            fillTable()
            break
        }
    }
}
