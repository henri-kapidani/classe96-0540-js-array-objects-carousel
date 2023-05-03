const arrImages = [
	{
		image: 'img/01.webp',
		title: 'Marvel\'s Spiderman Miles Morale',
		text: 'Experience the rise of Miles Morales as the new hero masters incredible, explosive new powers to become his own Spider-Man.',
	},
	{
		image: 'img/02.webp',
		title: 'Ratchet & Clank: Rift Apart',
		text: 'Go dimension-hopping with Ratchet and Clank as they take on an evil emperor from another reality.',
	},
	{
		image: 'img/03.webp',
		title: 'Fortnite',
		text: "Grab all of your friends and drop into Epic Games Fortnite, a massive 100 - player face - off that combines looting, crafting, shootouts and chaos.",
	},
	{
		image: 'img/04.webp',
		title: 'Stray',
		text: 'Lost, injured and alone, a stray cat must untangle an ancient mystery to escape a long-forgotten city',
	},
	{
		image: 'img/05.webp',
		title: "Marvel's Avengers",
		text: 'Marvel\'s Avengers is an epic, third-person, action-adventure game that combines an original, cinematic story with single-player and co-operative gameplay.',
	}
];

let activeIndex = Math.floor(arrImages.length / 2); // 0 per partire dalla prima slide
let sliderDirection = 1; // 1: left to right, -1: right to left
let isAutorun = true;
let autorunTime = 2000;
let idAutorun;

const eleCarousel = document.querySelector('.carousel');
const containerHighlighted = document.querySelector('.highlighted');
const containerThumbs = document.querySelector('.thumbs-imgs');
const btnInvert = document.querySelector('.btn-invert');
const btnController = document.querySelector('.btn-controller');
const btnPrev = document.querySelector('.btn-prev');
const btnNext = document.querySelector('.btn-next');

renderSlider();
runSlider();



/* EVENT LISTENERS */

btnInvert.addEventListener('click', invertSliderDirection);
btnController.addEventListener('click', toggleAutorun);
btnNext.addEventListener('click', showNextSlide);
btnPrev.addEventListener('click', showPrevSlide);
eleCarousel.addEventListener('mouseover', stopAutorun);
eleCarousel.addEventListener('mouseout', runSlider);

const listHighlighted = document.querySelectorAll('.highlighted .slide');
const listThumbs = document.querySelectorAll('.thumbs img');
for (let i = 0; i < listThumbs.length; i++) {
	listThumbs[i].addEventListener('click', () => setActiveIndex(i))
}



/* FUNCTION DEFINITIONS */

function renderSlider() {
	for (let i = 0; i < arrImages.length; i++) {
		const slide = arrImages[i];
		containerHighlighted.innerHTML += `
			<div class="slide${i == activeIndex ? ' active' : ''}">
				<img src="${slide.image}" alt="${slide.title}">
				<div class="contents">
					<h2>${slide.title}</h2>
					<p>${slide.text}</p>
				</div>
			</div>`;

		containerThumbs.innerHTML += `<img src="${slide.image}" alt="" class="${i == activeIndex ? 'active' : ''}">`;
	}
}

function setActiveIndex(i) {
	console.log('cliccata la miniature in posizione ' + i)
	listHighlighted[activeIndex].classList.remove('active');
	listThumbs[activeIndex].classList.remove('active');
	activeIndex = i;
	listHighlighted[activeIndex].classList.add('active');
	listThumbs[activeIndex].classList.add('active');
}

function showNextSlide() {
	// dall'immagine attiva tolgo la classe active
	listHighlighted[activeIndex].classList.remove('active');
	listThumbs[activeIndex].classList.remove('active');
	// settiamo il nuovo valore di active index
	activeIndex++;
	if (activeIndex >= listHighlighted.length) {
		activeIndex = 0;
	}
	// alla nuova immagine attiva aggiungiamo la classe active
	listHighlighted[activeIndex].classList.add('active');
	listThumbs[activeIndex].classList.add('active');
}

function showPrevSlide() {
	// dall'immagine attiva tolgo la classe active
	listHighlighted[activeIndex].classList.remove('active');
	listThumbs[activeIndex].classList.remove('active');
	// settiamo il nuovo valore di active index
	activeIndex--;
	if (activeIndex < 0) {
		activeIndex = listHighlighted.length - 1;
	}
	// alla nuova immagine attiva aggiungiamo la classe active
	listHighlighted[activeIndex].classList.add('active');
	listThumbs[activeIndex].classList.add('active');
}

function invertSliderDirection() {
	sliderDirection *= -1;
}

function runSlider() {
	console.log('run');
	if (isAutorun) {
		idAutorun = setInterval(() => sliderDirection == 1 ? showNextSlide() : showPrevSlide(), autorunTime);
		btnController.innerHTML = 'STOP';
	} else {
		clearInterval(idAutorun);
		btnController.innerHTML = 'Start';
	}
}

function toggleAutorun() {
	isAutorun = !isAutorun;
	runSlider();
}

function stopAutorun() {
	console.log('attraversato il bordo');
	clearInterval(idAutorun);
}