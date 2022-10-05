const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const featuresSection = document.getElementById("section-1");
const operationsTabs = document.querySelectorAll(".tab");
const operationsTabContent = document.querySelectorAll(".content");
const nav = document.querySelector("nav");
const header = document.querySelector("header");
const allSections = document.querySelectorAll("section");
const imgTarget = document.querySelectorAll("img[data-src");
const slides = document.querySelectorAll(".slide");
const sliderBtnLeft = document.querySelector(".slider-btn-left");
const sliderBtnRight = document.querySelector(".slider-btn-right");
const dotsContainer = document.querySelector(".dots");

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function (e) {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

const escapeModal = function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) closeModal();
};

///////////////////////////////////////////////////////////////////////////

const scroll = function (e) {
  featuresSection.scrollIntoView({ behavior: "smooth" });
};

const navScroll = function (e) {
  // Aficient Way, with event bubbling
  // 1. Add event listener to common parent element
  // 2. Determine what element originated the event
  e.preventDefault();

  // Matching strategy
  if (e.target.classList.contains("nav-link")) {
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
};

///////////////////////////////////////////////////////////////////////////

const selectTab = function (e) {
  // This will solve a problem of <span> selection inside <button>
  const btn = e.target.closest(".tab");

  // Prevent false clicks outside <button> and a return of 'null'
  if (!btn) return;

  // Active tab
  operationsTabs.forEach(tab => tab.classList.remove("tab-active"));
  btn.classList.add("tab-active");

  // Active Content
  operationsTabContent.forEach(content =>
    content.classList.remove("content-active")
  );
  document
    .querySelector(`.content-${btn.dataset.set}`)
    .classList.add("content-active");
};

///////////////////////////////////////////////////////////////////////////

const menuHover = function (e) {
  if (e.target.classList.contains("nav-link")) {
    const link = e.target;
    const siblings = link.closest("nav").querySelectorAll(".nav-link");
    const logo = link.closest("nav").querySelector("img");

    siblings.forEach(item => {
      if (item !== link) item.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

// Sticky Nav
// Intersection Observer API
const navHeight = nav.getBoundingClientRect().height;
const stickyNav = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

///////////////////////////////////////////////////////////////////////////

// Intersection Observer API
const revealSections = function (entries, observer) {
  const [entry] = entries;
  // this if is to make 1st observer event to be ignored, so 1st section would get the animation too
  if (!entry.isIntersecting) return;

  entry.target.classList.remove("section-hidden");

  // to unobserve sections, because the work is done, and we dont need to observe them all over again
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSections, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add("section-hidden");
});

///////////////////////////////////////////////////////////////////////////
// Lazy Image Load

const lazyImgLoad = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  // Replace src with data-src
  entry.target.src = entry.target.dataset.src;

  // Listen for load-img event, 1st lazy-img load, after large-img are finished loading lazy-img are relaced and filter is removed
  entry.target.addEventListener("load", function () {
    entry.target.classList.remove("lazy-img");
  });

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(lazyImgLoad, {
  root: null,
  threshold: 0,
  // rootMargin: will start lazy-img loading ahead of time, so the user wount see the process, but the loading aficiency will be preserved
  rootMargin: "200px",
});

imgTarget.forEach(img => imgObserver.observe(img));

///////////////////////////////////////////////////////////////////////////

const slider = function () {
  let currentSlide = 0;
  const maxSlide = slides.length;

  const createDots = function () {
    slides.forEach(function (_, i) {
      dotsContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="dots-dot" data-slide="${i}"></button>`
      );
    });
  };

  const activeDot = function (slide) {
    document
      .querySelectorAll(".dots-dot")
      .forEach(dot => dot.classList.remove("dots-dot-active"));
    document
      .querySelector(`.dots-dot[data-slide="${slide}"]`)
      .classList.add("dots-dot-active");
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (item, i) => (item.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  const nextSlide = function () {
    if (currentSlide === maxSlide - 1) {
      currentSlide = 0;
    } else {
      currentSlide++;
    }

    // currentSlide = 1: -100%, 0%, 100%, 200%
    goToSlide(currentSlide);
    activeDot(currentSlide);
  };

  const prevSlide = function () {
    if (currentSlide === 0) {
      currentSlide = maxSlide - 1;
    } else {
      currentSlide--;
    }
    goToSlide(currentSlide);
    activeDot(currentSlide);
  };

  const keyPress = function (e) {
    if (e.key === "ArrowLeft") prevSlide();
    if (e.key === "ArrowRight") nextSlide();
  };

  const changeActiveDot = function (e) {
    if (e.target.classList.contains("dots-dot")) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activeDot(slide);
    }
  };

  const init = function () {
    createDots();
    goToSlide(0);
    activeDot(0);
  };
  init();

  // Event Listeners
  sliderBtnLeft.addEventListener("click", prevSlide);
  sliderBtnRight.addEventListener("click", nextSlide);
  document.addEventListener("keydown", keyPress);
  dotsContainer.addEventListener("click", changeActiveDot);
};

///////////////////////////////////////////////////////////////////////////

const cookieMessage = document.createElement("div");
cookieMessage.classList.add("cookie-message");
cookieMessage.innerHTML =
  'We use cookies for improved functionality and analytics. <button class="close-cookie">Got it!</button>';
header.append(cookieMessage);

const closeCookie = function () {
  cookieMessage.remove();
};

export {
  openModal,
  closeModal,
  escapeModal,
  scroll,
  navScroll,
  selectTab,
  menuHover,
  slider,
  closeCookie,
};
