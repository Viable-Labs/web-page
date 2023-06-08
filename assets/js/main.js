/**
* Template Name: Vesperr - v4.9.1
* Template URL: https://bootstrapmade.com/vesperr-free-bootstrap-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    if (!header.classList.contains('header-scrolled')) {
      offset -= 20
    }

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },

      1200: {
        slidesPerView: 2,
        spaceBetween: 20
      }
    }
  });

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

  /**
   * Initiate Pure Counter 
   */
  new PureCounter();

})()

/*--------------------------------------------------------------
# moving element
--------------------------------------------------------------*/
// var movingElement_1 = document.querySelector('.moving-element-1');
// var totalDistance = document.querySelector('.moving-element-1').offsetWidth;

// var markerInterval = totalDistance *0.25;

// var imageContainers_1 = document.querySelectorAll('.content-sub-container-1');
// console.log(imageContainers_1);

// setInterval(function() {
//   for (var j = 0; j < imageContainers_1.length; j++) {
//     var paragraph = imageContainers_1[j].querySelector('p');
//     paragraph.classList.remove('bold-marker');
//   }

//   var currentIndex = Math.floor((movingElement_1.offsetLeft- movingElement_1.parentElement.offsetWidth) / markerInterval);
//   var nextIndex = (currentIndex + 1) % imageContainers_1.length;

//   var nextParagraph = imageContainers_1[nextIndex].querySelector('p');
//   nextParagraph.classList.add('bold-marker');
// }, 1000)

// var movingElement_2 = document.querySelector('.moving-element-2');
// var totalDistance2 = document.querySelector('.moving-element-2').offsetWidth;
// var markerInterval2 = totalDistance2 *0.25;
// var imageContainers_2 = document.querySelectorAll('.content-sub-container-2');
// console.log(imageContainers_2);

// setInterval(function() {
//   for (var j = 0; j < imageContainers_2.length; j++) {
//     var paragraph2 = imageContainers_2[j].querySelector('p');
//     paragraph2.classList.remove('bold-marker');
//   }

//   var currentIndex2 = Math.floor((movingElement_2.offsetLeft- movingElement_2.parentElement.offsetWidth) / markerInterval2);
//   var nextIndex2 = (currentIndex2 + 1) % imageContainers_2.length;

//   var nextParagraph2 = imageContainers_2[nextIndex2].querySelector('p');
//   nextParagraph2.classList.add('bold-marker');
// }, 1000)

var paragraphs = Array.from(document.querySelectorAll('.content-sub-container-1 p'));
paragraphs.splice(3, 1);
var currentIndex = 0;

function boldNextParagraph() {
  paragraphs[currentIndex].classList.remove('bold-marker');
  currentIndex = (currentIndex + 1) % paragraphs.length;
  paragraphs[currentIndex].classList.add('bold-marker');
}

boldNextParagraph(); 

setInterval(boldNextParagraph, 2500); 

var paragraphs2 = Array.from(document.querySelectorAll('.content-sub-container-2 p'));
  paragraphs2.splice(3, 1); 

  var currentIndex2 = paragraphs2.length - 1;

  function boldNextParagraph2() {
    paragraphs2[currentIndex2].classList.remove('bold-marker');
    currentIndex2 = (currentIndex2 - 1 + paragraphs2.length) % paragraphs2.length;
    paragraphs2[currentIndex2].classList.add('bold-marker');
  }

  boldNextParagraph2(); 

  setInterval(boldNextParagraph2, 2500); 