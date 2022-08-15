const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque');
const sectionReiniciar = document.getElementById('reiniciar');
const botonMascotaJugador = document.getElementById('boton-mascota');
const botonReiniciar = document.getElementById('boton-reiniciar');
sectionReiniciar.style.display = 'none';
const sectionSeleccionarMascota = document.getElementById(
  'seleccionar-mascota'
);
const spanMascotaJugador = document.getElementById('mascota-jugador');
const spanMascotaEnemigo = document.getElementById('mascota-enemigo');
const spanVidasJugador = document.getElementById('vidas-jugador');
const spanVidasEnemigo = document.getElementById('vidas-enemigo');
const sectionMensajes = document.getElementById('resultado');
const ataquesDelJugador = document.getElementById('ataques-del-jugador');
const ataquesDelEnemigo = document.getElementById('ataques-del-enemigo');
const contenedorTarjetas = document.getElementById('contenedorTarjetas');
const contenedorAtaques = document.getElementById('contenedorAtaques');
const sectionVerMapa = document.getElementById('ver-mapa');
const mapa = document.getElementById('mapa');

let mokepones = [];
let ataqueJugador = [];
let ataqueEnemigo = [];
let ataquesMokeponEnemigo;
let opcionDeMokepones;
let inputHipodoge;
let inputCapipepo;
let inputRatigueya;
let mascotaJugador;
let mascotaJugadorObjeto;
let ataquesMokepon;
let botonFuego;
let botonAgua;
let botonTierra;
let botones = [];
let indexAtaqueJugador;
let indexAtaqueEnemigo;
let victoriasJugador = 0;
let victoriasEnemigo = 0;
let spanvidasJugador = 0;
let spanvidasEnemigo = 0;
let lienzo = mapa.getContext('2d');
let intervalo;
let mapaBackground = new Image();
mapaBackground.src = './assets/mokemap.png';
let alturaQueBuscamos = 0;
let anchoDelMapa = window.innerWidth - 20;
const anchoMaximoDelMapa = 600;
if (anchoDelMapa > anchoMaximoDelMapa) {
  anchoDelMapa = anchoMaximoDelMapa - 20;
}
alturaQueBuscamos = (anchoDelMapa * 600) / 800;
mapa.width = anchoDelMapa;
mapa.height = alturaQueBuscamos;

let botonArriba = document.getElementById('botonMoverArriba');
let botonAbajo = document.getElementById('botonMoverAbajo');
let botonIzquierda = document.getElementById('botonMoverIzquierda');
let botonDerecha = document.getElementById('botonMoverDerecha');
let textoAtaques = document.getElementById('subtitulo-ataques');

class Mokepon {
  constructor(nombre, foto, vida, fotoMapa) {
    this.nombre = nombre;
    this.foto = foto;
    this.vida = vida;
    this.ataques = [];
    this.ancho = 40;
    this.alto = 40;
    this.x = aleatorio(0, mapa.width - this.ancho);
    this.y = aleatorio(0, mapa.height - this.alto);
    this.mapaFoto = new Image();
    this.mapaFoto.src = fotoMapa;
    this.velocidadX = 0;
    this.velocidadY = 0;
  }
  pintarMokepon() {
    lienzo.drawImage(this.mapaFoto, this.x, this.y, this.ancho, this.alto);
  }
}

let hipodoge = new Mokepon(
  'Hipodoge',
  './assets/mokepons_mokepon_hipodoge_attack.png',
  5,
  './assets/hipodoge.png'
);
let capipepo = new Mokepon(
  'Capipepo',
  './assets/mokepons_mokepon_capipepo_attack.png',
  5,
  './assets/capipepo.png'
);
let ratigueya = new Mokepon(
  'Ratigueya',
  './assets/mokepons_mokepon_ratigueya_attack.png',
  5,
  './assets/ratigueya.png'
);

let hipodogeEnemigo = new Mokepon(
  'Hipodoge',
  './assets/mokepons_mokepon_hipodoge_attack.png',
  5,
  './assets/hipodoge.png'
);
let capipepoEnemigo = new Mokepon(
  'Capipepo',
  './assets/mokepons_mokepon_capipepo_attack.png',
  5,
  './assets/capipepo.png'
);
let ratigueyaEnemigo = new Mokepon(
  'Ratigueya',
  './assets/mokepons_mokepon_ratigueya_attack.png',
  5,
  './assets/ratigueya.png'
);

hipodoge.ataques.push(
  { nombre: '💧', id: 'boton-agua' },
  { nombre: '💧', id: 'boton-agua' },
  { nombre: '💧', id: 'boton-agua' },
  { nombre: '🔥', id: 'boton-fuego' },
  { nombre: '🪵', id: 'boton-tierra' }
);
capipepo.ataques.push(
  { nombre: '🪵', id: 'boton-tierra' },
  { nombre: '🪵', id: 'boton-tierra' },
  { nombre: '🪵', id: 'boton-tierra' },
  { nombre: '💧', id: 'boton-agua' },
  { nombre: '🔥', id: 'boton-fuego' }
);
ratigueya.ataques.push(
  { nombre: '🔥', id: 'boton-fuego' },
  { nombre: '🔥', id: 'boton-fuego' },
  { nombre: '🔥', id: 'boton-fuego' },
  { nombre: '💧', id: 'boton-agua' },
  { nombre: '🪵', id: 'boton-tierra' }
);

hipodogeEnemigo.ataques.push(
  { nombre: '💧', id: 'boton-agua' },
  { nombre: '💧', id: 'boton-agua' },
  { nombre: '💧', id: 'boton-agua' },
  { nombre: '🔥', id: 'boton-fuego' },
  { nombre: '🪵', id: 'boton-tierra' }
);
capipepoEnemigo.ataques.push(
  { nombre: '🪵', id: 'boton-tierra' },
  { nombre: '🪵', id: 'boton-tierra' },
  { nombre: '🪵', id: 'boton-tierra' },
  { nombre: '💧', id: 'boton-agua' },
  { nombre: '🔥', id: 'boton-fuego' }
);
ratigueyaEnemigo.ataques.push(
  { nombre: '🔥', id: 'boton-fuego' },
  { nombre: '🔥', id: 'boton-fuego' },
  { nombre: '🔥', id: 'boton-fuego' },
  { nombre: '💧', id: 'boton-agua' },
  { nombre: '🪵', id: 'boton-tierra' }
);

mokepones.push(hipodoge, capipepo, ratigueya);

function iniciarJuego() {
  sectionSeleccionarAtaque.style.display = 'none';
  sectionVerMapa.style.display = 'none';
  mokepones.forEach((mokepon) => {
    opcionDeMokepones = `
        <input type="radio" name="mascota" id=${mokepon.nombre} />
        <label class="tarjeta-de-mokepon" for=${mokepon.nombre}>
            <p>${mokepon.nombre}</p>
            <img src=${mokepon.foto} alt=${mokepon.nombre}>
        </label>
        `;
    contenedorTarjetas.innerHTML += opcionDeMokepones;
    inputHipodoge = document.getElementById('Hipodoge');
    inputCapipepo = document.getElementById('Capipepo');
    inputRatigueya = document.getElementById('Ratigueya');
  });
  botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador);
  botonReiniciar.addEventListener('click', reiniciarJuego);
  unirseAlJuego();
}

function unirseAlJuego() {
  fetch('http://localhost:8080/unirse').then(function (res) {
    if (res.ok) {
      res.text().then(function (respuesta) {
        console.log(respuesta);
      });
    }
  });
}

function seleccionarMascotaJugador() {
  //Declaracion de Variables
  let jugar = 1;
  if (inputHipodoge.checked) {
    spanMascotaJugador.innerHTML = inputHipodoge.id;
    mascotaJugador = inputHipodoge.id;
  } else if (inputCapipepo.checked) {
    spanMascotaJugador.innerHTML = inputCapipepo.id;
    mascotaJugador = inputCapipepo.id;
  } else if (inputRatigueya.checked) {
    spanMascotaJugador.innerHTML = inputRatigueya.id;
    mascotaJugador = inputRatigueya.id;
  } else {
    alert('Selecciona una mascota');
    jugar = 0;
  }

  //Condicion para jugar... solo se cumple si el jugador eligio mascota
  if (jugar == 1) {
    sectionSeleccionarMascota.style.display = 'none';
    sectionVerMapa.style.display = 'flex';
    iniciarMapa();

    extraerAtaques(mascotaJugador);
  }
}
function extraerAtaques(mascotaJugador) {
  let ataques;
  for (let i = 0; i < mokepones.length; i++) {
    if (mascotaJugador === mokepones[i].nombre) {
      ataques = mokepones[i].ataques;
    }
  }
  mostrarAtaques(ataques);
}
function mostrarAtaques(ataques) {
  ataques.forEach((ataque) => {
    ataquesMokepon = `
        <button id=${ataque.id} class="boton-de-ataque BAtaque">${ataque.nombre}</button>
        `;
    contenedorAtaques.innerHTML += ataquesMokepon;
  });
  botonFuego = document.getElementById('boton-fuego');
  botonAgua = document.getElementById('boton-agua');
  botonTierra = document.getElementById('boton-tierra');
  botones = document.querySelectorAll('.BAtaque');
}
function secuenciaAtaque() {
  botones.forEach((boton) => {
    boton.addEventListener('click', (e) => {
      if (e.target.textContent === '🔥') {
        ataqueJugador.push('FUEGO');
        console.log(ataqueJugador);
        boton.style.background = '#041562';
        boton.style.border = '2px solid rgb(255, 255, 255)';
        boton.style.borderRadius = '80px';
        boton.style.borderColor = 'yellowgreen';
        boton.disabled = true;
        boton.style.cursor = 'not-allowed';
      } else if (e.target.textContent === '💧') {
        ataqueJugador.push('AGUA');
        console.log(ataqueJugador);
        boton.style.background = '#041562';
        boton.style.border = '2px solid rgb(255, 255, 255)';
        boton.style.borderRadius = '80px';
        boton.style.borderColor = 'yellowgreen';
        boton.disabled = true;
        boton.style.cursor = 'not-allowed';
      } else {
        ataqueJugador.push('TIERRA');
        console.log(ataqueJugador);
        boton.style.background = '#041562';
        boton.style.border = '2px solid rgb(255, 255, 255)';
        boton.style.borderRadius = '80px';
        boton.style.borderColor = 'yellowgreen';
        boton.disabled = true;
        boton.style.cursor = 'not-allowed';
      }
      ataqueAleatorioEnemigo();
    });
  });
}
//Funcion Selecionar Mokepon Enemigo
function seleccionarMascotaEnemigo(enemigo) {
  spanMascotaEnemigo.innerHTML = enemigo.nombre;
  ataquesMokeponEnemigo = enemigo.ataques;
  secuenciaAtaque();
}
// Fuuncion Ataque Aleatorio Enemigo
function ataqueAleatorioEnemigo() {
  let ataqueAleatorio = aleatorio(0, ataquesMokeponEnemigo.length - 1);
  if (ataqueAleatorio == 0 || ataqueAleatorio == 1) {
    ataqueEnemigo.push('FUEGO');
  } else if (ataqueAleatorio == 3 || ataqueAleatorio == 4) {
    ataqueEnemigo.push('AGUA');
  } else {
    ataqueEnemigo.push('TIERRA');
  }
  iniciarPelea();
}
//Funcion Iniciar Pelea
function iniciarPelea() {
  if (ataqueJugador.length === 5) {
    combate();
  }
}
//Funcion indice de del Combate
function indexAmbosOponentes(jugador, enemigo) {
  indexAtaqueJugador = ataqueJugador[jugador];
  indexAtaqueEnemigo = ataqueEnemigo[enemigo];
}
//Funcion Combate
function combate() {
  for (let index = 0; index < ataqueJugador.length; index++) {
    if (ataqueJugador[index] === ataqueEnemigo[index]) {
      indexAmbosOponentes(index, index);
      crearMensaje('EMPATE');
    } else if (
      ataqueJugador[index] === 'FUEGO' &&
      ataqueEnemigo[index] === 'TIERRA'
    ) {
      indexAmbosOponentes(index, index);
      crearMensaje('GANASTE');
      victoriasJugador++;
      spanVidasJugador.innerHTML = victoriasJugador;
    } else if (
      ataqueJugador[index] === 'AGUA' &&
      ataqueEnemigo[index] === 'FUEGO'
    ) {
      indexAmbosOponentes(index, index);
      crearMensaje('GANASTE');
      victoriasJugador++;
      spanVidasJugador.innerHTML = victoriasJugador;
    } else if (
      ataqueJugador[index] === 'TIERRA' &&
      ataqueEnemigo[index] === 'AGUA'
    ) {
      indexAmbosOponentes(index, index);
      crearMensaje('GANASTE');
      victoriasJugador++;
      spanVidasJugador.innerHTML = victoriasJugador;
    } else {
      indexAmbosOponentes(index, index);
      crearMensaje('PERDISTE');
      victoriasEnemigo++;
      spanVidasEnemigo.innerHTML = victoriasEnemigo;
    }
    revisarVidas();
  }
}
//Funcion Revisar Vidas
function revisarVidas() {
  if (victoriasJugador == victoriasEnemigo) {
    crearMensajeFinal('Esto es un EMPATE!!!');
  } else if (victoriasJugador > victoriasEnemigo) {
    crearMensajeFinal('GANASTE!!!');
  } else {
    crearMensajeFinal('PERDISTE!!!');
  }
}
//Funcion Crear Mensajes
function crearMensaje(resultado) {
  botones.forEach((boton) => {
    boton.style.display = 'none';
  });
  let nuevoAtaqueDelJugador = document.createElement('p');
  let nuevoAtaqueDelEnemigo = document.createElement('p');
  sectionMensajes.innerHTML = resultado;
  nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador;
  nuevoAtaqueDelEnemigo.innerHTML = indexAtaqueEnemigo;
  ataquesDelJugador.appendChild(nuevoAtaqueDelJugador);
  ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo);
}
//Funcion Crear Mensajes Final
function crearMensajeFinal(resultadoFinal) {
  sectionMensajes.innerHTML = resultadoFinal;
  sectionMensajes.style.fontWeight = 'bold';
  sectionReiniciar.style.display = 'block';
  textoAtaques.style.display = 'none';
}

//Funcion pintar Mokepones
function pintarCanvas() {
  mascotaJugadorObjeto.x =
    mascotaJugadorObjeto.x + mascotaJugadorObjeto.velocidadX;
  mascotaJugadorObjeto.y =
    mascotaJugadorObjeto.y + mascotaJugadorObjeto.velocidadY;
  lienzo.clearRect(0, 0, mapa.width, mapa.height);
  lienzo.drawImage(mapaBackground, 0, 0, mapa.width, mapa.height);
  mascotaJugadorObjeto.pintarMokepon();
  hipodogeEnemigo.pintarMokepon();
  capipepoEnemigo.pintarMokepon();
  ratigueyaEnemigo.pintarMokepon();
  if (
    mascotaJugadorObjeto.velocidadX !== 0 ||
    mascotaJugadorObjeto.velocidadY !== 0
  ) {
    revisarColision(hipodogeEnemigo);
    revisarColision(capipepoEnemigo);
    revisarColision(ratigueyaEnemigo);
  }
}

//Funcion mover Mokepones
function moverDerecha() {
  if (mascotaJugadorObjeto.x < mapa.width - mascotaJugadorObjeto.ancho) {
    mascotaJugadorObjeto.velocidadX = 5;
    botonDerecha.style.backgroundColor = '#5792e5';
    botonDerecha.style.borderColor = 'yellowgreen';
    botonDerecha.style.borderRadius = '5rem';
  } else {
    detenerMovimiento();
  }
}
function moverIzquierda() {
  if (mascotaJugadorObjeto.x > 0) {
    mascotaJugadorObjeto.velocidadX = -5;
    botonIzquierda.style.backgroundColor = '#5792e5';
    botonIzquierda.style.borderColor = 'yellowgreen';
    botonIzquierda.style.borderRadius = '5rem';
  } else {
    detenerMovimiento();
  }
}

function moverAbajo() {
  if (mascotaJugadorObjeto.y < mapa.height - mascotaJugadorObjeto.alto) {
    mascotaJugadorObjeto.velocidadY = 5;
    botonAbajo.style.backgroundColor = '#5792e5';
    botonAbajo.style.borderColor = 'yellowgreen';
    botonAbajo.style.borderRadius = '5rem';
  } else {
    detenerMovimiento();
  }
}

function moverArriba() {
  if (mascotaJugadorObjeto.y > 0) {
    mascotaJugadorObjeto.velocidadY = -5;
    botonArriba.style.backgroundColor = '#5792e5';
    botonArriba.style.borderColor = 'yellowgreen';
    botonArriba.style.borderRadius = '5rem';
  } else {
    detenerMovimiento();
  }
}

function detenerMovimiento() {
  mascotaJugadorObjeto.velocidadX = 0;
  mascotaJugadorObjeto.velocidadY = 0;
  botonArriba.style.backgroundColor = '#11468f';
  botonArriba.style.borderColor = 'white';
  botonArriba.style.borderRadius = '0.625rem';
  botonAbajo.style.backgroundColor = '#11468f';
  botonAbajo.style.borderColor = 'white';
  botonAbajo.style.borderRadius = '0.625rem';
  botonIzquierda.style.backgroundColor = '#11468f';
  botonIzquierda.style.borderColor = 'white';
  botonIzquierda.style.borderRadius = '0.625rem';
  botonDerecha.style.backgroundColor = '#11468f';
  botonDerecha.style.borderColor = 'white';
  botonDerecha.style.borderRadius = '0.625rem';
}

function sePrecionoUnaTecla(event) {
  switch (event.key) {
    case 'ArrowUp':
      moverArriba();
      break;
    case 'ArrowDown':
      moverAbajo();
      break;
    case 'ArrowLeft':
      moverIzquierda();
      break;
    case 'ArrowRight':
      moverDerecha();
      break;
    default:
      break;
  }
}

function iniciarMapa() {
  mascotaJugadorObjeto = obtenerObjetoMascota(mascotaJugador);
  intervalo = setInterval(pintarCanvas, 50);
  window.addEventListener('keydown', sePrecionoUnaTecla);
  window.addEventListener('keyup', detenerMovimiento);
}

function obtenerObjetoMascota() {
  for (let i = 0; i < mokepones.length; i++) {
    if (mascotaJugador === mokepones[i].nombre) {
      return mokepones[i];
    }
  }
}

function revisarColision(enemigo) {
  const arribaEnemigo = enemigo.y;
  const abajoEnemigo = enemigo.y + enemigo.alto;
  const derechaEnemigo = enemigo.x + enemigo.ancho;
  const izquierdaEnemigo = enemigo.x;

  const arribaMascota = mascotaJugadorObjeto.y;
  const abajoMascota = mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto;
  const derechaMascota = mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho;
  const izquierdaMascota = mascotaJugadorObjeto.x;

  if (
    abajoMascota < arribaEnemigo ||
    arribaMascota > abajoEnemigo ||
    derechaMascota < izquierdaEnemigo ||
    izquierdaMascota > derechaEnemigo
  ) {
    return;
  }
  clearInterval(intervalo);
  detenerMovimiento();
  seleccionarMascotaEnemigo(enemigo);
  sectionSeleccionarAtaque.style.display = 'flex';
  sectionVerMapa.style.display = 'none';
}

//Funcion Reiniciar Juego
function reiniciarJuego() {
  location.reload();
}
//Funcion Aleatorio
function aleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
window.addEventListener('load', iniciarJuego);
