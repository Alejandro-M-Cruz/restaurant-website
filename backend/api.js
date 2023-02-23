const { users, reservations, addUser, addReservation } = require("./database")
const express = require("express")
const app = express()
const apiRoute = "/api/v1"

let loggedIn = null
function login(userId) { loggedIn = userId }

app.use(express.static("public"))
app.use(express.urlencoded({extended: false}))

app.get("/", (req, res) => {
    res.redirect("/html/reservations.html")
})

app.post(`${apiRoute}/new-reservation`, (req, res) => {
    const reservation = {
        id: reservations.length > 0 ? reservations[reservations.length - 1].id + 1 : 1,
        date: req.body.date,
        time: req.body.time,
        numberOfPeople: req.body.numberOfPeople,
        name: req.body.fullName
    }
    console.log(reservation)
    addReservation(reservation)
    res.redirect("/html/reservations.html")
})

app.post(`${apiRoute}/user-login`, (req, res) => {
    for (const user of users) {
        if (user.phoneNumber === req.body.phoneNumber && user.password === req.body.password) {
            login(user.id)
            return res.redirect("/")
        }
    }
    res.status(404).send("Usuario no registrado o contraseña incorrecta")
})

app.get(`${apiRoute}/user`, (req, res) => {
    res.json({ loggedIn })
})

app.post(`${apiRoute}/user-signup`, (req, res) => {
    if (req.body.password !== req.body.passwordConfirmation) {
        return res.send("Las contraseñas deben coincidir")
    }
    const newUser = {
        id: users.length > 0 ? users[users.length - 1].id + 1 : 1,
        phoneNumber: req.body.phoneNumber,
        password: req.body.password
    }
    for (const user of users) {
        if (user.phoneNumber === newUser.phoneNumber) {
            return res.send("Ya existe un usuario con este número de teléfono")
        }
    }
    addUser(newUser)
    login(newUser.id)
    res.redirect("/")
})

app.all(`${apiRoute}/users`, (req, res) => {
    res.status(200).json(users)
})

app.all(`${apiRoute}/reservations/:userId`, (req, res) => {
    res.status(200).json(reservations.filter(reservation => reservation.userId === req.params.userId))
})

app.listen(8080, () => {
    console.log("Server is listening on port 8080")
})
