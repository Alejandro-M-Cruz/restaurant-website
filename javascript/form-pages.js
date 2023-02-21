const path = window.location.pathname
const filename = path.substring(path.lastIndexOf('/') + 1)

w3IncludeHTML(() => {
    switch (filename) {
        case "login.html":
            loadPage(logInPageContent)
            break
        case "signup.html":
            loadPage(signUpPageContent)
            break
        default:
            loadPage(newReservationPageContent)
    }
})

const logInPageContent =
    {
        "mainTitle": "Inicie sesión para poder ver sus reservas",
        "formFields": [
            {
                "id": "phone-number",
                "label": "Número de teléfono: ",
                "type": "text",
                "name": "phoneNumber"
            },
            {
                "id": "password",
                "label": "Contraseña: ",
                "type": "password",
                "name": "password"
            }
        ],
        "cancelButtonLabel": "Atrás",
        "confirmButtonLabel": "Iniciar sesión",
        "already": "Si aún no se ha registrado, ",
        "alreadyLink": "REGÍSTRESE AQUÍ",
        "linkHref": "signup.html"
    }

const signUpPageContent =
    {
        "mainTitle": "Regístrese para poder realizar su primera reserva",
        "formFields": [
            {
                "id": "phone-number",
                "label": "Número de teléfono: ",
                "type": "text",
                "name": "phoneNumber"
            },
            {
                "id": "password",
                "label": "Contraseña: ",
                "type": "password",
                "name": "password"
            },
            {
                "id": "password-confirm",
                "label": "Confirme su contraseña: ",
                "type": "password",
                "name": "passwordConfirmation"
            }
        ],
        "cancelButtonLabel": "Atrás",
        "confirmButtonLabel": "Registrarse",
        "already": "Si ya se ha registrado, ",
        "alreadyLink": "INICIE SESIÓN AQUÍ",
        "linkHref": "login.html"
    }

const newReservationPageContent =
    {
        "mainTitle": "Complete los datos para confirmar su reserva",
        "formFields": [
            {
                "id": "full-name",
                "label": "Nombre completo: ",
                "type": "text",
                "name": "fullName"
            },
            {
                "id": "date",
                "label": "Fecha: ",
                "type": "date",
                "name": "date"
            },
            {
                "id": "time",
                "label": "Hora: ",
                "type": "time",
                "name": "time"
            },
            {
                "id": "number-of-people",
                "label": "Número de personas: ",
                "type": "number",
                "name": "number"
            }
        ],
        "cancelButtonLabel": "Atrás",
        "confirmButtonLabel": "Confirmar"
    }

function loadPage(pageContent) {
    const title = document.querySelector(".page-title")
    const formLabels = document.querySelector(".labels-container")
    const formInputs = document.querySelector(".inputs-container")
    const cancelButton = document.querySelector(".cancel-button")
    const submitButton = document.querySelector(".submit-button")
    const alreadyDiv = document.querySelector(".already-div")

    title.innerHTML = pageContent.mainTitle
    formLabels.innerHTML = ""
    formInputs.innerHTML = ""
    pageContent.formFields.forEach(field => {
        formLabels.innerHTML += `<label for="${field.id}">${field.label}</label>`
        formInputs.innerHTML += `<input id="${field.id}" type="${field.type}" name="${field.name}" required>`
    })
    cancelButton.innerHTML = pageContent.cancelButtonLabel
    submitButton.innerHTML = pageContent.confirmButtonLabel
    if (filename !== "new-reservation.html") {
        alreadyDiv.innerHTML = `
            <p class="already-paragraph">${pageContent.already}</p>
            <a href="${pageContent.linkHref}" class="go-to-login-signup"><b>${pageContent.alreadyLink}</b></a>
        `
    }
}
