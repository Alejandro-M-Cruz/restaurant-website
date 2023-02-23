const users = [
    {
        "id": 1,
        "phoneNumber": "123456789",
        "password": "password1234"
    },
    {
        "id": 2,
        "phoneNumber": "1",
        "password": "2"
    }
]

const reservations = [
    {
        "id": 1,
        "userId": "2",
        "date": "2023-02-09",
        "time": "14:30",
        "numberOfPeople": "7",
        "name": "Alberto Santana"
    },
    {
        "id": 2,
        "userId": "2",
        "date": "2023-02-10",
        "time": "14:30",
        "numberOfPeople": "2",
        "name": "Alberto Santana"
    },
    {
        "id": 3,
        "userId": "2",
        "date": "2023-02-14",
        "time": "14:30",
        "numberOfPeople": "5",
        "name": "Carlos Santana"
    },
    {
        "id": 4,
        "userId": "1",
        "date": "2023-02-20",
        "time": "14:30",
        "numberOfPeople": "1",
        "name": "Alberto Santana"
    }
]

function addUser(user) {
    users.push(user)
}

function addReservation(reservation) {
    reservations.push(reservation)
}

module.exports = { users, reservations, addUser, addReservation }