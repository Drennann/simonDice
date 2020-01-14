let AZUL = document.getElementById("0")
let AMARILLO = document.getElementById("1")
let VERDE = document.getElementById("2")
let ROJO = document.getElementById("3")
let BUTTON = document.getElementById("button")
const NIVEL_MAXIMO = 10;

class Juego {
    constructor(){
        this.iluminarSecuencia = this.iluminarSecuencia.bind(this)
        this.escucharClicks = this.escucharClicks.bind(this)
        this.armarSecuenciaUsuario = this.armarSecuenciaUsuario.bind(this)
        this.inicializar();
    }
    inicializar(){
        BUTTON.classList.add("hide")
        this.nivel = 1;
        this.iniciarSecuencia()
    }
    iniciarSecuencia(){
        this.secuencia = new Array(NIVEL_MAXIMO).fill(0).map(n => Math.floor(Math.random()*4))
        this.iluminarSecuencia()
        }
    iluminarColor(color){
        switch(color){
            case 0:
                AZUL.classList.add("claro")
                break;
            case 1:
                AMARILLO.classList.add("claro")
                break;
            case 2:
                VERDE.classList.add("claro")
                break;
            case 3:
                ROJO.classList.add("claro")
                break;
            }
        
    }
    apagarColor(color){
        switch(color){
            case 0:
                AZUL.classList.remove("claro")
                break;
            case 1:
                AMARILLO.classList.remove("claro")
                break;
            case 2:
                VERDE.classList.remove("claro")
                break;
            case 3:
                ROJO.classList.remove("claro")
                break;
        }
    }
    iluminarSecuencia(){
        this.secuenciaUsuario = [];
        for(let i = 0; i < this.nivel; i++){
            setTimeout(this.iluminarColor, i * 1000 + 1000, this.secuencia[i])
            setTimeout(this.apagarColor, i * 1000 + 1500, this.secuencia[i])
            setTimeout(this.escucharClicks, this.nivel * 1000)
        }
    }
    escucharClicks(){
        document.addEventListener("click", this.armarSecuenciaUsuario)
    }
    armarSecuenciaUsuario(ev){
        this.secuenciaUsuario.push(ev.target.dataset.color)
        if(this.secuenciaUsuario.length === this.nivel){
            document.removeEventListener("click", this.armarSecuenciaUsuario)
            this.compararSecuencias()
        }
    }
    compararSecuencias(){
        for(let i=0; i<this.nivel; i++){
            if(this.secuenciaUsuario[i] != this.secuencia[i]){
                i = this.nivel;
                return this.perderJuego()
            }
        }
        if(this.nivel === NIVEL_MAXIMO){
            this.ganarJuego()
        }
        this.nivel++
        this.iluminarSecuencia()
    }
    ganarJuego(){
        BUTTON.classList.remove("hide")
        swal("Ganaste", "Flaquito el bisagras eh", "success");
    }
    perderJuego(){
        BUTTON.classList.remove("hide")
        swal("Perdiste", "Y por allá", "error");
    }
}

function empezarJuego(){
    Window.game = new Juego()
}