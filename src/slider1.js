const names = [
  "Flores de Oro",
  "Ardiente Sol",
  "Olimpo Sagrado",
  "Meditación Ninja",
  "Luna roja",
  "Jardines Orientales",
  "Samurai Ninja"
];

const descriptions = [
  "Las flores de oro brillan como el sol atrapado en pétalos, símbolo eterno de belleza y riqueza.",
  "Ardiente sol, fuego del cielo que acaricia y quema, rey incansable de los días.",
  "Olimpo de guerreros, cielo sagrado donde ruge el honor y descansan los valientes. Cada alma es leyenda, cada espada un eco de gloria eterna.",
  "Silencio afilado como katana, mente en sombra,cuerpo en calma. En la quietud, el guerrero se encuentra y el caos se rinde.",
  "Mirada sangrante del cielo que susurra secretos en la noche. Presagio místico que embruja el alma y despierta lo oculto.",
  "Poesía viva entre piedras y flores, donde el viento susurra calma. Cada rincón es un respiro del alma y un viaje al equilibrio.",
  "Honor y sombra en un solo ser, filo de leyenda y sigilo ancestral. Camina entre el deber y el misterio, con el alma afilada como su Katana."

];

const imageName = document.getElementById("imageName");
const imageDescription = document.getElementById("imageDescription");

// Función para actualizar el texto
function updateInfo(index) {
  imageName.textContent = names[index];
  imageDescription.textContent = descriptions[index];
}




const cards = document.querySelectorAll('.card');
const fullscreenImage = document.getElementById('fullscreenImage');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const imageCounter = document.getElementById('imageCounter');

let currentIndex = 0;
let autoplayInterval = null;

function updateFullscreen(index) {
  cards.forEach(card => card.classList.remove('active'));
  cards[index].classList.add('active');

  fullscreenImage.classList.remove('fade');
  void fullscreenImage.offsetWidth;
  fullscreenImage.src = cards[index].src;
  fullscreenImage.classList.add('fade');

  updateInfo(index);// 💥 Esto actualiza el nombre y descripción de la imagen

  imageCounter.textContent = `${index + 1} / ${cards.length}`;
}

function startAutoplay() {
  autoplayInterval = setInterval(() => {
    currentIndex = (currentIndex + 1) % cards.length;
    updateFullscreen(currentIndex);
  }, 4000);

}

function stopAutoplay() {
  clearInterval(autoplayInterval);
}

cards.forEach((card, i) => {
  card.addEventListener('click', () => {
    currentIndex = i;
    updateFullscreen(i);
    stopAutoplay();
    startAutoplay();
  });
});

prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + cards.length) % cards.length;
  updateFullscreen(currentIndex);
  stopAutoplay();
  startAutoplay();
});

nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % cards.length;
  updateFullscreen(currentIndex);
  stopAutoplay();
  startAutoplay();
});

startAutoplay();
