
/* =====================================================
   DATOS DE LA BODA
===================================================== */

const datosBoda = {

    novio: "Julio",

    novia: "Brígida",

    fecha:
        "2026-10-03T18:00:00"

};


/* =====================================================
   ELEMENTOS HTML
===================================================== */

const sobre =
    document.getElementById("sobre");


const botonAbrir =
    document.getElementById(
        "abrirInvitacion"
    );


const pantallaSobre =
    document.getElementById(
        "pantallaSobre"
    );


const invitacion =
    document.getElementById(
        "invitacion"
    );


const musica =
    document.getElementById(
        "musica"
    );


const botonMusica =
    document.getElementById(
        "botonMusica"
    );


/* =====================================================
   ABRIR INVITACIÓN
===================================================== */

function abrirSobre() {


        /*
            Abrimos el sobre.
        */

        sobre.classList.add(
            "abierto"
        );


        /*
            Intentamos reproducir
            la música.

            Como el usuario acaba
            de hacer clic, el navegador
            normalmente permite el audio.
        */

        musica.play()
            .then(function () {

                botonMusica.classList.add(
                    "visible"
                );

                botonMusica.classList.add(
                    "reproduciendo"
                );

            })
            .catch(function (error) {

                console.log(
                    "El navegador bloqueó el audio:",
                    error
                );

                botonMusica.classList.add(
                    "visible"
                );

            });


        /*
            Esperamos que termine
            la animación del sobre.
        */

        setTimeout(
            function () {


                pantallaSobre.classList.add(
                    "ocultar"
                );


                invitacion.classList.add(
                    "mostrar"
                );


                /*
                    Comenzamos los pétalos.
                */

                iniciarPetalos();


                /*
                    Comenzamos la animación
                    de elementos visibles.
                */

                mostrarElementos();


                /*
                    Llevamos la página
                    al principio.
                */

                window.scrollTo({

                    top: 0,

                    behavior: "smooth"

                });


            },
            1500
        );

}


let sobreAbierto = false;


function manejarAperturaSobre() {

    if (sobreAbierto) {
        return;
    }

    sobreAbierto = true;

    abrirSobre();

}


botonAbrir.addEventListener(
    "click",
    manejarAperturaSobre
);


sobre.addEventListener(
    "click",
    manejarAperturaSobre
);


/* =====================================================
   BOTÓN DE MÚSICA
===================================================== */

botonMusica.addEventListener(
    "click",
    function () {


        /*
            Si la música está pausada
        */

        if (
            musica.paused
        ) {


            musica.play()
                .then(function () {

                    botonMusica.classList.add(
                        "reproduciendo"
                    );

                    botonMusica.innerHTML =
                        '<i class="fa-solid fa-volume-high"></i>';

                });


        }

        /*
            Si la música está sonando
        */

        else {


            musica.pause();


            botonMusica.classList.remove(
                "reproduciendo"
            );


            botonMusica.innerHTML =
                '<i class="fa-solid fa-volume-xmark"></i>';

        }

    }
);


/* =====================================================
   CUENTA REGRESIVA
===================================================== */

function actualizarCuentaRegresiva() {


    /*
        Obtenemos la fecha
        configurada anteriormente.
    */

    const fechaBoda =
        new Date(
            datosBoda.fecha
        );


    /*
        Fecha actual.
    */

    const ahora =
        new Date();


    /*
        Diferencia.
    */

    const diferencia =
        fechaBoda - ahora;


    /*
        Si la fecha ya pasó.
    */

    if (
        diferencia <= 0
    ) {


        document.getElementById(
            "dias"
        ).textContent = "00";


        document.getElementById(
            "horas"
        ).textContent = "00";


        document.getElementById(
            "minutos"
        ).textContent = "00";


        document.getElementById(
            "segundos"
        ).textContent = "00";


        return;

    }


    /*
        Días.
    */

    const dias =
        Math.floor(
            diferencia /
            (
                1000 *
                60 *
                60 *
                24
            )
        );


    /*
        Horas.
    */

    const horas =
        Math.floor(
            (
                diferencia %
                (
                    1000 *
                    60 *
                    60 *
                    24
                )
            )
            /
            (
                1000 *
                60 *
                60
            )
        );


    /*
        Minutos.
    */

    const minutos =
        Math.floor(
            (
                diferencia %
                (
                    1000 *
                    60 *
                    60
                )
            )
            /
            (
                1000 *
                60
            )
        );


    /*
        Segundos.
    */

    const segundos =
        Math.floor(
            (
                diferencia %
                (
                    1000 *
                    60
                )
            )
            /
            1000
        );


    /*
        Mostramos.
    */

    document.getElementById(
        "dias"
    ).textContent =
        agregarCero(dias);


    document.getElementById(
        "horas"
    ).textContent =
        agregarCero(horas);


    document.getElementById(
        "minutos"
    ).textContent =
        agregarCero(minutos);


    document.getElementById(
        "segundos"
    ).textContent =
        agregarCero(segundos);

}


/* =====================================================
   AGREGAR CERO
===================================================== */

function agregarCero(
    numero
) {


    if (
        numero < 10
    ) {

        return "0" + numero;

    }


    return numero;

}


/*
    Ejecutamos inmediatamente.
*/

actualizarCuentaRegresiva();


/*
    Actualizamos cada segundo.
*/

setInterval(
    actualizarCuentaRegresiva,
    1000
);


/* =====================================================
   ANIMACIÓN AL HACER SCROLL
===================================================== */

const elementos =
    document.querySelectorAll(
        ".revelar"
    );


function mostrarElementos() {


    elementos.forEach(
        function (elemento) {


            const posicion =
                elemento.getBoundingClientRect();


            /*
                Si el elemento entra
                en la pantalla.
            */

            if (
                posicion.top <
                window.innerHeight - 100
            ) {


                elemento.classList.add(
                    "visible"
                );

            }

        }
    );

}


window.addEventListener(
    "scroll",
    mostrarElementos
);


mostrarElementos();


/* =====================================================
   PÉTALOS
===================================================== */

function crearPetalo() {


    const petalo =
        document.createElement(
            "div"
        );


    petalo.classList.add(
        "petal"
    );


    /*
        Posición horizontal
        aleatoria.
    */

    petalo.style.left =
        Math.random() * 100 + "vw";


    /*
        Tamaño aleatorio.
    */

    const tamaño =
        Math.random() * 10 + 8;


    petalo.style.width =
        tamaño + "px";


    petalo.style.height =
        tamaño * 1.4 + "px";


    /*
        Duración aleatoria.
    */

    const duracion =
        Math.random() * 5 + 5;


    petalo.style.animationDuration =
        duracion + "s";


    /*
        Transparencia.
    */

    petalo.style.opacity =
        Math.random() * .5 + .3;


    /*
        Lo agregamos al documento.
    */

    document.body.appendChild(
        petalo
    );


    /*
        Lo eliminamos después
        de terminar la animación.
    */

    setTimeout(
        function () {

            petalo.remove();

        },
        duracion * 1000
    );

}


/* =====================================================
   INICIAR PÉTALOS
===================================================== */

let intervaloPetalos;


function iniciarPetalos() {


    /*
        Evitamos crear
        varios intervalos.
    */

    if (
        intervaloPetalos
    ) {

        return;

    }


    /*
        Creamos un pétalo
        cada 700 milisegundos.
    */

    intervaloPetalos =
        setInterval(
            crearPetalo,
            700
        );

}


/* =====================================================
   EFECTO DE MOVIMIENTO DEL RATÓN
===================================================== */

document.addEventListener(
    "mousemove",
    function (evento) {


        const luces =
            document.querySelectorAll(
                ".luz"
            );


        const x =
            (
                evento.clientX /
                window.innerWidth
            ) - .5;


        const y =
            (
                evento.clientY /
                window.innerHeight
            ) - .5;


        luces.forEach(
            function (luz, indice) {


                const movimiento =
                    (indice + 1) * 15;


                luz.style.transform =
                    `
                    translate(
                        ${x * movimiento}px, 
                        ${y * movimiento}px
                    )
                    `;

            }
        );

    }
);

