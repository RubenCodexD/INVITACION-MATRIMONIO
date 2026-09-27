/* =========================================
   DATOS DE LA BODA
========================================= */

const datosBoda = {

    novio: "Julio",

    novia: "Brigida",

    fecha: "2026-12-20T18:00:00"

};


/* =========================================
   ELEMENTOS HTML
========================================= */

const sobre =
    document.getElementById("sobre");

const botonAbrir =
    document.getElementById("abrirInvitacion");

const pantallaSobre =
    document.getElementById("pantallaSobre");

const invitacion =
    document.getElementById("invitacion");


/* =========================================
   ABRIR INVITACIÓN
========================================= */

botonAbrir.addEventListener("click", function () {

    /*
        Agregamos la clase "abierto"
        al sobre.

        CSS se encarga de realizar
        la animación.
    */

    sobre.classList.add("abierto");


    /*
        Esperamos un poco para que
        se vea la animación del sobre.
    */

    setTimeout(function () {

        pantallaSobre.classList.add("ocultar");

        invitacion.classList.add("mostrar");

        /*
            Movemos la página hacia
            arriba de forma suave.
        */

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    }, 1500);

});


/* =========================================
   CUENTA REGRESIVA
========================================= */

function actualizarCuentaRegresiva() {

    /*
        Fecha del matrimonio
    */

    const fechaBoda =
        new Date(datosBoda.fecha);


    /*
        Fecha actual
    */

    const ahora =
        new Date();


    /*
        Diferencia entre ambas fechas
    */

    const diferencia =
        fechaBoda - ahora;


    /*
        Si la fecha ya llegó
    */

    if (diferencia <= 0) {

        document.getElementById("dias").textContent = "00";

        document.getElementById("horas").textContent = "00";

        document.getElementById("minutos").textContent = "00";

        document.getElementById("segundos").textContent = "00";

        return;

    }


    /*
        Calculamos días
    */

    const dias =
        Math.floor(
            diferencia /
            (1000 * 60 * 60 * 24)
        );


    /*
        Calculamos horas
    */

    const horas =
        Math.floor(
            (diferencia %
                (1000 * 60 * 60 * 24))
            /
            (1000 * 60 * 60)
        );


    /*
        Calculamos minutos
    */

    const minutos =
        Math.floor(
            (diferencia %
                (1000 * 60 * 60))
            /
            (1000 * 60)
        );


    /*
        Calculamos segundos
    */

    const segundos =
        Math.floor(
            (diferencia %
                (1000 * 60))
            /
            1000
        );


    /*
        Mostramos los resultados
    */

    document.getElementById("dias").textContent =
        agregarCero(dias);

    document.getElementById("horas").textContent =
        agregarCero(horas);

    document.getElementById("minutos").textContent =
        agregarCero(minutos);

    document.getElementById("segundos").textContent =
        agregarCero(segundos);

}


/* =========================================
   AGREGAR CERO
========================================= */

function agregarCero(numero) {

    if (numero < 10) {

        return "0" + numero;

    }

    return numero;

}


/*
    Ejecutamos el contador inmediatamente.
*/

actualizarCuentaRegresiva();


/*
    Actualizamos cada segundo.
*/

setInterval(
    actualizarCuentaRegresiva,
    1000
);


/* =========================================
   ANIMACIÓN AL HACER SCROLL
========================================= */

const elementos =
    document.querySelectorAll(".revelar");


function mostrarElementos() {

    elementos.forEach(function (elemento) {

        const posicion =
            elemento.getBoundingClientRect();


        /*
            Si el elemento está
            dentro de la pantalla
        */

        if (
            posicion.top <
            window.innerHeight - 100
        ) {

            elemento.classList.add("visible");

        }

    });

}


/*
    Ejecutamos al hacer scroll.
*/

window.addEventListener(
    "scroll",
    mostrarElementos
);


/*
    Ejecutamos una vez al cargar.
*/

mostrarElementos();


/* =========================================
   CONFIRMAR ASISTENCIA
========================================= */

const botonConfirmar =
    document.getElementById("confirmar");

const mensajeConfirmacion =
    document.getElementById(
        "mensajeConfirmacion"
    );


botonConfirmar.addEventListener(
    "click",
    function () {

        mensajeConfirmacion.textContent =
            "¡Gracias! Esperamos compartir este día contigo ♥";

        /*
            Cambiamos temporalmente
            el texto del botón.
        */

        botonConfirmar.textContent =
            "¡Asistencia confirmada!";

    }
);