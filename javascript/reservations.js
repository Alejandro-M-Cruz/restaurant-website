const navBar = `
        <div id="nav-bar-container">
            <h1 id="la-nostra-casa-nav-button"><a href="#">La Nostra Casa</a></h1>
            <nav>
                <ul class="lista-paginas">
                    <li class="lista-paginas__inicio"><a href="#">Inicio</a></li>
                    <li class="lista-paginas__menu"><a href="#">Menú</a></li>
                    <li class="lista-paginas__reservas"><a href="#">Reservas</a></li>
                    <li class="lista-paginas__about-us"><a href="#">Sobre nosotros</a></li>
                    <li class="lista-paginas__contacto"><a href="#">Contacto</a></li>
                    <li class="lista-paginas__user-icon"><a href="#" class="user-icon"><img
                        src="/images/user-icon.png" alt="User"></a></li>
                </ul>
            </nav>
        </div>
    `

document.querySelector("header").innerHTML = navBar
