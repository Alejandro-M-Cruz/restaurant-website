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
        "alreadyLink": "INICIE SESIÓN AQUÍ"
    }


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
        "alreadyLink": "REGÍSTRESE AQUÍ"
    }


const title = document.querySelector(".main-title")
const formLabels = document.querySelector(".labels-container")
const formInputs = document.querySelector(".inputs-container")
const cancelButton = document.querySelector(".cancel-button")
const submitButton = document.querySelector(".submit-button")
const alreadyDiv = document.querySelector(".already-div")

function loadPage(pageContent) {
    title.innerHTML = pageContent.mainTitle
    formLabels.innerHTML = ""
    formInputs.innerHTML = ""
    for (const field of pageContent.formFields) {
        formLabels.innerHTML += `<label for="${field.id}">${field.label}</label>`
        formInputs.innerHTML += `<input id="${field.id}" type="${field.type}" name="${field.name}" required>`
    }
    cancelButton.innerHTML = pageContent.cancelButtonLabel
    submitButton.innerHTML = pageContent.confirmButtonLabel

    alreadyDiv.innerHTML = `
        <p class="already-paragraph">${pageContent.already}</p>
        <a href="#" id="go-to-login-signup" onclick="changePage()"><b>${pageContent.alreadyLink}</b></a>
    `
}

let currentPage = "login"
loadPage(logInPageContent)

function changePage() {
    if (currentPage === "login") {
        currentPage = "signup"
        return loadPage(signUpPageContent)
    }    
    currentPage = "login"
    loadPage(logInPageContent)
}

