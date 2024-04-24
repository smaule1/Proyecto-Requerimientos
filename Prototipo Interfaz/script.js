
window.addEventListener("load", function() {
    /*Puertas, si están cerradas y constante de movimiento*/

    const puertaIzq = document.getElementById('puerta_elev_izq');
    const puertaDer = document.getElementById('puerta_elev_der');
    const pasoDeMovimiento = 170;
    let isClosed = 0; //0 abierta, 1 cerrada
    let isDoorMoving = 0; //0 quieta, 1 moviendo
    let isElevMoving = 0; //0 quieto, 1 moviendo

    /*Botones y pantalla*/
    const btnCerrar = document.getElementById('btn_elev_cerrar');
    const btnAbrir = document.getElementById('btn_elev_abrir');
    const btnP1 = document.getElementById("btn_elev_1");
    const btnP2 = document.getElementById("btn_elev_2");
    const btnP3 = document.getElementById("btn_elev_3");
    const btnP4 = document.getElementById("btn_elev_4");
    const elevScreen = document.getElementById("hd_elev_screen");
  
    function moverPuertasDer(puerta) {
      const posicionActual = parseInt(getComputedStyle(puerta).left);
      puerta.style.left = `${posicionActual + pasoDeMovimiento}px`;
    }
  
    function moverPuertasIzq(puerta) {
      const posicionActual = parseInt(getComputedStyle(puerta).left);
      puerta.style.left = `${posicionActual - pasoDeMovimiento}px`;
    }
    
    function abrirPuertas(){
        isDoorMoving = 1;
        moverPuertasDer(puertaDer);
        moverPuertasIzq(puertaIzq);
        setTimeout(function() {
            isClosed = 0;
            isDoorMoving = 0;
        }, 1000);
    }
    function cerrarPuertas(){
        isDoorMoving = 1;
        moverPuertasDer(puertaIzq);
        moverPuertasIzq(puertaDer);
        setTimeout(function() {
            isClosed = 1;
            isDoorMoving = 0;
        }, 1000);
    }

    function subebajaElevador(piso){
        isElevMoving = 1;
        setTimeout(function() {
            elevScreen.textContent = "P" + piso;
            isElevMoving = 0;
            abrirPuertas();
        }, 1000);
    }
    
    /*Acciones de botones del panel interno*/

    if (btnCerrar) { //Cierra ambas puertas manualmente
        btnCerrar.addEventListener('click', function() {
            if (isClosed == 0 && isDoorMoving == 0 && isElevMoving == 0){
                cerrarPuertas();
            }
        });
      }
    if (btnAbrir) { //Abre ambas puertas manualmente
        btnAbrir.addEventListener('click', function(){
            if (isClosed == 1 && isDoorMoving == 0 && isElevMoving == 0){
                abrirPuertas();
            }
        })
    }
    if (btnP1) { //Selecciona el piso 1
        btnP1.addEventListener('click', function(){
            if (isClosed == 0 && isDoorMoving == 0 && isElevMoving == 0){
                cerrarPuertas();
                setTimeout(function() {
                    subebajaElevador(1);
                }, 1000);
            }
            else if (isClosed == 1 && isDoorMoving == 0 && isElevMoving == 0){
                subebajaElevador(1);
            }
        })
    }
    if (btnP2) { //Selecciona el piso 2
        btnP2.addEventListener('click', function(){
            if (isClosed == 0 && isDoorMoving == 0 && isElevMoving == 0){
                cerrarPuertas();
                setTimeout(function() {
                    subebajaElevador(2);
                }, 1000);
            }
            else if (isClosed == 1 && isDoorMoving == 0 && isElevMoving == 0){
                subebajaElevador(2);
            }
        })
    }
    if (btnP3) { //Selecciona el piso 3
        btnP3.addEventListener('click', function(){
            if (isClosed == 0 && isDoorMoving == 0 && isElevMoving == 0){
                cerrarPuertas();
                setTimeout(function() {
                    subebajaElevador(3);
                }, 1000);
            }
            else if (isClosed == 1 && isDoorMoving == 0 && isElevMoving == 0){
                subebajaElevador(3);
            }
        })
    }
    if (btnP4) { //Selecciona el piso 4
        btnP4.addEventListener('click', function(){
            if (isClosed == 0 && isDoorMoving == 0 && isElevMoving == 0){
                cerrarPuertas();
                setTimeout(function() {
                    subebajaElevador(4);
                }, 1000);
            }
            else if (isClosed == 1 && isDoorMoving == 0 && isElevMoving == 0){
                subebajaElevador(4);
            }
        })
    }
});