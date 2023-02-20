const signUpPageJson = `
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
`

const logInPageJson = `
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
`

const signUpPageContent = JSON.parse(signUpPageJson)
const logInPageContent = JSON.parse(logInPageJson)

const title = document.querySelector("#main-title")
const form = document.querySelector("#user-form")
const alreadyDiv = document.querySelector(".already-div")

function loadPage(pageContent) {
    title.innerHTML = pageContent.mainTitle
    form.innerHTML = ""
    for (const field of pageContent.formFields) {
        form.innerHTML += `
            <div>
                <label for="${field.id}">${field.label}</label>
                <input id="${field.id}" type="${field.type}" name="${field.name}" required>
            </div>
        `
    }
    form.innerHTML += `
        <button class="cancel-button" type="reset">${pageContent.cancelButtonLabel}</button>
        <button class="submit-button" type="submit">${pageContent.confirmButtonLabel}</button>
    `
    alreadyDiv.innerHTML = `
        <p class="already-paragraph">${pageContent.already}</p>
        <a href="#" id="go-to-login-signup" onclick="changePage()"><b>${pageContent.alreadyLink}</b></a>
    `
}

let page = "login"
loadPage(logInPageContent)

function changePage() {
    if (page === "login") {
        page = "signup"
        return loadPage(signUpPageContent)
    }    
    page = "login"
    loadPage(logInPageContent)
}

