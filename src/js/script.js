import {
  openModal,
  closeModal,
  escapeModal,
  scroll,
  navScroll,
  selectTab,
  menuHover,
  slider,
  closeCookie,
} from "./functions.js";

const btnCloseModal = document.querySelector(".close-modal");
const btnsShowModal = document.querySelectorAll(".show-modal");
const overlay = document.querySelector(".overlay");
const navLinks = document.querySelector(".nav-links");
const btnScroll = document.querySelector(".btn-scroll");
const operationsContainer = document.querySelector(".operations-container");
const nav = document.querySelector("nav");
const closeCookieEl = document.querySelector(".close-cookie");

// Modal Window / Sign-up Window
// selects multiple elements => forEach
btnsShowModal.forEach(btn => btn.addEventListener("click", openModal));
btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);
document.addEventListener("keydown", escapeModal);

// Scroll Button
btnScroll.addEventListener("click", scroll);

// Smooth Bav Link Scroll
navLinks.addEventListener("click", navScroll);

// Operations => Tabbed components
operationsContainer.addEventListener("click", selectTab);

// Menu Hover Animation
nav.addEventListener("mouseover", menuHover.bind(0.5));
nav.addEventListener("mouseout", menuHover.bind(1));

// Sticky Nav, Section Scroll Fade-in => No need for event listeners

// Lazy Image Load => event Listener is in functions.js

// Slider
// Event Listeners are contained within slider()
slider();

// Cookies
closeCookieEl.addEventListener("click", closeCookie);
