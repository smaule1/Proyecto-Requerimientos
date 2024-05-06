
let btnAddFloor;
let btnRemoveFloor;
let btnCerrar;
let btnAbrir;
let btnP1;
let btnP2;
let btnP3;
let btnP4;
let elevScreen;
let floorButtonContainer;

let elevatorContainer

const maxFloors = 8;
let floorCount = 0;
let floorList = [];
let floorButtonList = [];

let currentTop = 0;


let pasoDeMovimiento = 170;
let sosEmergency = false; 
let sosColor = false;
let isClosed = 1; //0 abierta, 1 cerrada
let isDoorMoving = 0; //0 quieta, 1 moviendo
let isElevMoving = 0; //0 quieto, 1 moviendo
let floorAmount = 0; //Inicia en 0, se incrementa conforme se añaden pisos
let currentFloor = 1; //Inicia en 1, varía conforme se desarrolla la ejecución
let lastFloor = 1; //Inicia en 1, guarda el valor de currentFloor antes de que este cambie

let x = 0;
let y = 0;



function loadPage(){
    /*Puertas, si están cerradas y constante de movimiento*/

    //const elevator = document.createElement("div");

   
    elevatorContainer = document.getElementById("ElevatorContainer");

    floorButtonContainer = document.getElementById("floorButtonContainer");
     

    //const puertaIzq = document.getElementById("puerta_elev_izq");
    //const puertaDer = document.getElementById('puerta_elev_der');
    
    /*Botones y pantalla*/
    btnAddFloor = document.getElementById('btn_add_floor');
    btnRemoveFloor = document.getElementById('btn_remove_floor');
    btnCerrar = document.getElementById('btn_elev_cerrar');
    btnAbrir = document.getElementById('btn_elev_abrir');
    btnRequestElevDown = document.getElementById("btn_request_elev_down");
    btnRequestElevUp = document.getElementById("btn_request_elev_up");
    btnSOS = document.getElementById("btn_elev_sos");
    elevScreen = document.getElementById("hd_elev_screen");

    if (btnCerrar) { //Cierra ambas puertas manualmente
        btnCerrar.addEventListener('click', function() {
            if(sosEmergency) return;
            const floorNum = obtienePisoEnPantalla();
            cerrarPuertas(floorNum);
        });
      }
    if (btnAbrir) { //Abre ambas puertas manualmente
        btnAbrir.addEventListener('click', function(){
            if(sosEmergency) return;
            const floorNum = obtienePisoEnPantalla();
            abrirPuertas(floorNum);
        })
    }
    if(btnRequestElevUp){
        btnRequestElevUp.addEventListener('click', function(){
            if(sosEmergency) return;
            const floorNum = obtienePisoEnPantalla();
            solicitarElevadorUp(floorNum);
        })
    }
    if(btnRequestElevDown){
        btnRequestElevDown.addEventListener('click', function(){
            if(sosEmergency) return;
            const floorNum = obtienePisoEnPantalla();
            solicitarElevadorDown(floorNum);
        })
    }
    if (btnAddFloor) { 
        btnAddFloor.addEventListener('click', function(){
            if(sosEmergency) return;
            addFloor(floorAmount);
        })
    }
    if (btnRemoveFloor) {
        btnRemoveFloor.addEventListener('click', function(){
            if(sosEmergency) return;
            if(currentFloor < floorAmount || currentFloor == 1){
                removeFloor();
            }
        })
    }
    if (btnSOS) {        
        btnSOS.addEventListener('click', function(){            
            if(sosEmergency) return;
            sosEvent();            
        })
    }
};

 

function sosEvent(){
    sosEmergency = true;
    elevScreen.textContent = "SOS";
    elevScreen.style.color = "#ff0000";

    for(let i = 1; i<=14; i++){
        let color = (i%2==0) ? "#ff0000" : "#ff6000"; 
        setTimeout(function() {    
            elevScreen.style.color = color;
            console.log(color);
        }, 500*i);
    }    
    setTimeout(function() {
        sosEmergency = false;        
        elevScreen.style.color = "#9acd32";        
        elevScreen.textContent = "P" + currentFloor;
    }, 7000);
}


function addButton(floorNum){
    const button = document.createElement("button");
    button.className = "button"; 

    const btnShadow = document.createElement("span");
    btnShadow.className = "shadow shadow-round";

    const btnEdge = document.createElement("span");
    btnEdge.className = "edge edge-round";

    const btnFront = document.createElement("span");
    btnFront.className = "front front-round";
    btnFront.innerHTML = `${floorNum}`;
    
    
    button.addEventListener("click", function(){
        if(sosEmergency) return;
        llegarPisoSeleccionado(floorNum);
    });
    
    button.appendChild(btnShadow);
    button.appendChild(btnEdge);
    button.appendChild(btnFront);

    floorButtonContainer.appendChild(button);
    floorButtonList.unshift(button);
};

function addFloor(){      
    if(floorCount>=maxFloors){
        return;
    }  

    floorCount++;
        
    const elevator = document.createElement("div");    
    elevator.className = "elevador";
    elevator.style.top= `${currentTop + 30}px`;           
    
    const outElevator = document.createElement("span");
    outElevator.innerHTML = "<img draggable=\"false\" src=\"./icons/outsideElev.png\" height=\"800\" width=\"1300\"/>";
    outElevator.className = "outElev";
    outElevator.style.top = `${0}px`;

    const inElevator = document.createElement("span");
    inElevator.innerHTML = "<img draggable=\"false\" src=\"./icons/insideElev.png\" height=\"520\" width=\"340\"/>";
    inElevator.className = "inElev";
    inElevator.style.top = `${130}px`;

    const leftDoor = document.createElement("span");
    leftDoor.innerHTML = "<img draggable=\"false\" src=\"./icons/leftDoor.png\" height=\"520\" width=\"170\"/>";
    leftDoor.className = "puerta puerta-izq";
    leftDoor.style.top = `${130}px`;

    const rightDoor = document.createElement("span");
    rightDoor.innerHTML = "<img draggable=\"false\" src=\"./icons/rightDoor.png\" height=\"520\" width=\"170\"/>";
    rightDoor.className = "puerta puerta-der";
    rightDoor.style.top = `${130}px`;
    
    const floorNumber = document.createElement("span");
    floorNumber.innerHTML = `P${floorCount}`;
    floorNumber.className = "floor-number";
    floorNumber.style.top = `${60}px`;
    
    elevator.appendChild(outElevator);
    elevator.appendChild(inElevator);
    elevator.appendChild(leftDoor);
    elevator.appendChild(rightDoor);
    elevator.appendChild(floorNumber);
       
    floorList.unshift(elevator);
    elevatorContainer.appendChild(elevator);
    currentTop += 850;
    elevatorContainer.style.height = `${currentTop}px`; 
    addButton(floorCount);
    floorAmount++;
    updateFloorNum();
};

function removeFloor() {
    if (floorList.length > 0) {
        const removedFloor = floorList.shift();
        floorCount--;
        removedFloor.remove();
        currentTop -= 850;
        elevatorContainer.style.height = `${currentTop}px`;
        removeButton();
        updateFloorNum();
        floorAmount--;
    } else {
        console.log("No floors to remove");
    }
};

function removeButton() {
    if (floorButtonList.length > 0) {
        const removedButton = floorButtonList.shift();        
        removedButton.remove();                    
    }
};

function updateFloorNum(){    
    for (let i = floorCount; i>0; i--) {
        floorList[i-1].childNodes[4].innerHTML = `P${i}`;
      }
};

function moverPuertasDer(puerta) {        
    const posicionActual = parseInt(getComputedStyle(puerta).left);
    puerta.style.left = `${posicionActual + pasoDeMovimiento}px`;
};

function moverPuertasIzq(puerta) {
    const posicionActual = parseInt(getComputedStyle(puerta).left);
    puerta.style.left = `${posicionActual - pasoDeMovimiento}px`;
};

function cerrarPuertas(pisoDeseado){
    if (isDoorMoving == 0 && isClosed == 0 && currentFloor==pisoDeseado){
        const floorIndex = pisoDeseado - 1;
        const floor = floorList[floorIndex];
        if (!floor) return;
        const leftDoor = floor.querySelector('.puerta-izq');
        const rightDoor = floor.querySelector('.puerta-der');
        isDoorMoving = 1;
        moverPuertasDer(leftDoor);
        moverPuertasIzq(rightDoor);
        setTimeout(function() {
            isClosed = 1;
            isDoorMoving = 0;
        }, 1000);
    }
};

function abrirPuertas(pisoDeseado){
    if (isDoorMoving == 0 && isClosed == 1 && currentFloor==pisoDeseado){
        const floorIndex = pisoDeseado - 1;
        const floor = floorList[floorIndex];
        if (!floor) return;
        const leftDoor = floor.querySelector('.puerta-izq');
        const rightDoor = floor.querySelector('.puerta-der');
        isDoorMoving = 1;        
        moverPuertasDer(rightDoor);
        moverPuertasIzq(leftDoor);
        setTimeout(function() {
            isClosed = 0;
            isDoorMoving = 0;
        }, 1000);
    }
};

function obtienePisoEnPantalla(){
    return (floorCount) - Math.floor(y/850);
};


function subebajaElevador(piso){
    isElevMoving = 1;
    setTimeout(function() {
        elevScreen.textContent = "P" + piso;
        isElevMoving = 0;
        abrirPuertas(piso);
        setTimeout(function() {
            cerrarPuertas(piso);
        }, 3000);
    }, 2000);
    if (lastFloor < piso) {
        elevScreen.textContent = "▲P" + lastFloor;
    } else if (lastFloor > piso){
        elevScreen.textContent = "▼P" + lastFloor;
    } else {
        elevScreen.textContent = "P" + piso;
    }
};

function llegarPisoSeleccionado(piso){
    if (isClosed == 0 && isDoorMoving == 0 && isElevMoving == 0){
        cerrarPuertas(currentFloor);
        lastFloor = currentFloor;
        setTimeout(function() {
            subebajaElevador(piso);
        }, 1000);
        currentFloor = piso;
    }
    else if (isClosed == 1 && isDoorMoving == 0 && isElevMoving == 0){
        lastFloor = currentFloor;
        subebajaElevador(piso);
        currentFloor = piso;
    }
};

function solicitarElevadorUp(pisoDeseado){
    if(floorAmount > 0){
        const floorNumber = pisoDeseado;
        if(floorNumber == floorAmount){
            console.log("Piso Máximo. No se puede subir más");
        } else{
            if(floorNumber == currentFloor){
                abrirPuertas(floorNumber);
                setTimeout(function() {
                    cerrarPuertas(floorNumber);
                }, 2000);
            } else{
                if(currentFloor > floorNumber){
                    console.log("Bajando");
                    lastFloor = currentFloor;
                    currentFloor = floorNumber;
                    subebajaElevador(floorNumber);
                    
                } else{
                    console.log("Subiendo");
                    lastFloor = currentFloor;
                    currentFloor = floorNumber;
                    subebajaElevador(floorNumber);
                }
            }
        }
    }
};

function solicitarElevadorDown(pisoDeseado){
    if(floorAmount > 0){
        const floorNumber = pisoDeseado;
        if(floorNumber == 1){
            console.log("Piso Mínimo. No se puede bajar más");
        } else{
            if(floorNumber == currentFloor){
                abrirPuertas(floorNumber);
                setTimeout(function() {
                    cerrarPuertas(floorNumber);
                }, 2000);
            } else{
                if(currentFloor > floorNumber){
                    console.log("Bajando");
                    lastFloor = currentFloor;
                    currentFloor = floorNumber;
                    subebajaElevador(floorNumber);
                } else{
                    console.log("Subiendo");
                    lastFloor = currentFloor;
                    currentFloor = floorNumber;
                    subebajaElevador(floorNumber);
                }
            }
        }
    }
};

window.addEventListener("load", loadPage);

function showCoords(event) {
    x = event.clientX;   
    y = event.pageY; 
};

document.addEventListener("scroll", (event)=>{
    x = event.clientX;   
    y = event.pageY; 
});