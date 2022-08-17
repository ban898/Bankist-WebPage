'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');
const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

// Modal window
const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//Learn more button
btnScrollTo.addEventListener('click', function (e) {
  const s1cords = section1.getBoundingClientRect();
  section1.scrollIntoView({ behavior: 'smooth' });
});

//Page navigation
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

//Tab Animation
tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');

  if (!clicked) return;

  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  clicked.classList.add('operations__tab--active');

  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

//Menu Fade Animation
const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

//Sticky nav
const stickyNav = function (entires) {
  const [entry] = entires;
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headObserver.observe(header);

//Reveal sections
const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

//Lazy Loading images
const imgTargets = document.querySelectorAll('img[data-src]');

const loadImg = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  //Replace src with data-src
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
});
imgTargets.forEach(img => imgObserver.observe(img));

//Slider
const sliders = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  let currentSlide = 0;
  const maxSlide = slides.length;

  //Functions
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  //Active dot toggle
  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  //Moving the slide
  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  //Next slide
  const nextSlide = function () {
    if (currentSlide === maxSlide - 1) {
      currentSlide = 0;
    } else {
      currentSlide++;
    }

    goToSlide(currentSlide);
    activateDot(currentSlide);
  };

  //Prev slide
  const prevSlide = function () {
    if (currentSlide === 0) {
      currentSlide = maxSlide - 1;
    } else {
      currentSlide--;
    }
    goToSlide(currentSlide);
    activateDot(currentSlide);
  };

  //Initial function calls
  const init = function () {
    goToSlide(0);
    createDots();
    activateDot(0);
  };
  init();

  //Event handlers
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    console.log(e);
    e.key === 'ArrowLeft' && prevSlide();
    e.key === 'ArrowRight' && nextSlide();
  });

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      currentSlide = parseInt(slide, 10);
      activateDot(slide);
    }
  });
};

sliders();

//-------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------

// const btnScrollTo = document.querySelector('.btn--scroll-to');
// const section1 = document.querySelector('#section--1');

//btnScrollTo.addEventListener('click', function (e) {
//The command below we store the cordinates of the elemnt we want to scroll to
//.getBoundingClientRect Method will return us DOM RECTANGLE OBJ which contains the position of the element in the page
// const s1cords = section1.getBoundingClientRect();
// console.log(e.target.getBoundingClientRect());
// //The command below will show the position of the scroll bar
// console.log('Current scroll (X/Y)', window.pageXOffset, window.pageYOffset);
// //The command below will shot the position of your view page
// console.log(
//   'height/width viewport',
//   document.documentElement.clientHeight,
//   document.documentElement.clientWidth
// );

//Scrolling
// window.scrollTo(
//   s1cords.left + window.pageXOffset, //curren position + current scroll
//   s1cords.top + window.pageYOffset
// );

//Here we scroll by passing an object and sending behaivor with it
// window.scrollTo({
//   left: s1cords.left + window.pageXOffset,
//   top: s1cords.top + window.pageYOffset,
//   behavior: 'smooth',
// });

//Notice BEST SOLUTION Notice for scrolling
// ELEMENT WE WANT.scrollIntoView({behaivor:'?'});
//   section1.scrollIntoView({ behavior: 'smooth' });
// });
//-------------------------------------------------------------------------------------
//Methods
//Selecting Elements from withit the DOM
//console.log(document.documentElement);
//console.log(document.head);
//console.log(document.body);
//document.querySelector('.header'); //-->use . inside of the brackets for class
//document.querySelector('#header'); //-->use # inside of the brackets for ID
//-------------------------------------------------------------------------------------
//Methods
//Selecting and storing few elements in 1 time
// const allSections = document.querySelectorAll('.section');
// console.log(allSections);
//Notice this will return a node list
//Notice Node List isnt a Live collection
//Notice Live collection means that the collection updates online
//which means if we LOG allSections and then from within the page we delete one section and LOG the allsections again our collection will NOT be decrease by 1 ! BECAUSE ITS NOT A LIVE COLLECTION
//-------------------------------------------------------------------------------------
//Methods
//Select elemnts by ID
//document.getElementById('section--1');
// const allButtons = document.getElementsByTagName('button');
// console.log(allButtons);
//Notice this will return a HTMLCollection
//Notice HTMLCollection is a Live collection
//Notice Live collection means that the collection updates online
//which means if we LOG allbuttons and then from within the page we delete one button and LOG the allbuttons again our collection will decrease by 1 ! BECAUSE ITS A LIVE COLLECTION
//-------------------------------------------------------------------------------------
//Methods
//Select elemnts by Class
//Notice this will return a HTMLCollection
//Notice HTMLCollection is a Live collection
//Notice Live collection means that the collection updates online
// document.getElementsByClassName('btn');
//-------------------------------------------------------------------------------------
//Create and Insert Elements
//.insertAdjacentHTML - regular Method
//
// another Method message.textContent =
//   'We use coockies for improved functionality and analystics';
// const header = document.querySelector('.header');
// const message = document.createElement('div');
// message.classList.add('cookie-message');
// message.innerHTML =
//   'We use coockies for improved functionality and analystics. <button class="btn btn--close-cookie">Got it!</button>';
// header.prepend(message);
// header.append(message);
//header.before(message)
//header.after(message)
//prepend Method will make the recived elemnt as first child of header
//append Method will make the recived elemnt as last child of header
//before Method will make the recived elemnt as sibling of header and will place it before him in the DOM
//after Method will make the recived elemnt as sibling of header and will place it after him in the DOM
//-------------------------------------------------------------------------------------
//Method
//Clone elemnts
// message.cloneNode(true);
//-------------------------------------------------------------------------------------
//Method
//Delete elements
// document
//   .querySelector('.btn--close-cookie')
//   .addEventListener('click', function () {
//     message.remove();
//   });
//-------------------------------------------------------------------------------------
//Styles Methods
// message.style.backgroundColor = '#37383d';
// message.style.width = '120%';
//-------------------------------------------------------------------------------------
//you cant get styles from a css file like this :
// console.log(message.style.color); //--> this is will not work

//but you can get them if the css style was written in in-line code[in the html code]
// console.log(message.style.backgroundColor);

//-------------------------------------------------------------------------------------
//Method to get a properties from a css file
// console.log(getComputedStyle(message).color);
// console.log(getComputedStyle(message).height);
//Now you can manipulate the hieght
// message.style.height =
//   Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';
//we used Number.parseFloat to get only the number out of the string
//we send above the value 10 because we tell to parseFloar use 10 base numbers
//-------------------------------------------------------------------------------------
//Woking with css variables (changeig them)
// document.documentElement.style.setProperty('--color-primary', 'orangered');
//-------------------------------------------------------------------------------------
//Atributes Methods
//Read attribute
// const logo = document.querySelector('.nav__logo');
// console.log(logo.alt);
// console.log(logo.src); //--> will give us back ABSOLUTE URL
// console.log(logo.className);

// console.log(logo.designer); //--> this will not work bcz its non standart
// console.log(logo.getAttribute('designer'));

//Set attribute
// logo.alt = 'Beatifull';
// console.log(logo.alt);

// logo.setAttribute('company', 'pc');
// console.log(logo.getAttribute('company'));
// console.log(logo.getAttribute('src')); //-->will give u s back RELATIVE URL

//Data attributes
// console.log(logo.dataset.versionNumber);

//Classes
// logo.classList.add('c', 'b');
// logo.classList.remove('c', 'b');
// logo.classList.toggle('c');
// logo.classList.contains('c');

//Notice DONT USE LOGO.CLASS = 'BLA' Notice
//Use logo.clasList.add instead

//-------------------------------------------------------------------------------------
//Events Methods

//Old WAY
// const h1 = document.querySelector('h1');
// h1.onmouseenter = function (e) {
//   alert('addEventListener: Great!');
// };

//Modern way
// const h1 = document.querySelector('h1');
// h1.addEventListener('mouseenter', function (e) {
//   alert('addEventListener: Great!');
// });

//Best Solution
// const h1 = document.querySelector('h1');

// const alertH1 = function (e) {
//   alert('addEventListener: Great!');
// };

// h1.addEventListener('mouseenter', alertH1);
// setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 3000);
//-------------------------------------------------------------------------------------
//Rdndom Color
//Example for event bubbling

// const randomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min + 1) + min);
// const randomColor = () =>
//   `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log('LINK', e.target, e.currentTarget);
//   console.log(e.currentTarget === this);

//   //Stop propagation
//   //e.stopPropagation();
// });

// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log('Container', e.target, e.currentTarget);
//   //e.target is where actually the event happend --> the whole elemnt
//   //e.currentTarget is the element on which the event hendler is attached to --> the whole elemnt
// });

// document.querySelector('.nav').addEventListener(
//   'click',
//   function (e) {
//     this.style.backgroundColor = randomColor();
//     console.log('NAV', e.target, e.currentTarget);
//   },
//   true //This will capture the event while it go down the DOM tree
//   //FOR A BETTER EXPLENATION GO TO LECTURE 191 MIN 16:00
// );

//-------------------------------------------------------------------------------------
//Page navigation

// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();

//     const id = this.getAttribute('href');
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

//Event delegation
//1. add event listener to common parent element
//2. determine what element originated the event

// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   e.preventDefault();
//   //Matching Strategy
//   //Selecting only events that we want to manipulate
//   if (e.target.classList.contains('nav__link')) {
//     //Saving their ID
//     const id = e.target.getAttribute('href');
//     //Using their ID
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   }
// });
//-------------------------------------------------------------------------------------
//going down Methods (selecting child)

// const h1 = document.querySelector('h1');
// console.log(h1.querySelectorAll('.highlight')); //--> NodeList that contains elements with class name highlights [only chilldren of h1]
// console.log(h1.childNodes); //--> Nodelist      [all Nodes]
// console.log(h1.children); //--> HTMLCollection [Live] only the elemnts inside h1 //Notice works only for direct children
// h1.firstElementChild.style.color = 'white'; //only first child will be white
// h1.lastElementChild.style.color = 'orangered'; //last child

//-------------------------------------------------------------------------------------
//going up Methods (selecting parents)
// console.log(h1.parentNode); //--> NODE OF PARENT [DIRECT PARENT]
// console.log(h1.parentElement); //--> NODE OF PARENT [DIRECT PARENT]
// //Selecting closest parent element that has header class
// h1.closest('.header').style.background = 'var(--gradient-secondary)';

//-------------------------------------------------------------------------------------
//going sideways Methods (selecting brother , sibling)
//we can access only the next brother or the previous brother
// console.log(h1.previousElementSibling);
// console.log(h1.nextElementSibling); //--> element

// console.log(h1.previousSibling);
// console.log(h1.nextSibling); //-->NODE

//Lets say we want all the siblings
// console.log(h1.parentElement.children); //-->HTMLCollection [all siblings elements]
// [...h1.parentElement.children].forEach(function (el) {
//   if (el !== h1) el.style.transform = 'scale(0.5)';
// });

//-------------------------------------------------------------------------------------
//Notice Differnce between NODE AND ELEMENT
//A node is the generic name for any type of object in the DOM hierarchy.
//A node could be one of the built-in DOM elements such as document or document.body,
//it could be an HTML tag specified in the HTML such as <input> or <> or it could be a text node that is created by the system to hold a block of text inside another element.
//So, in a nutshell, a node is any DOM object.
//An element is one specific type of node as there are many other types of nodes (text nodes, comment nodes, document nodes, etc...).
//-------------------------------------------------------------------------------------
//Tab elemnt selection
// const tabs = document.querySelectorAll('.operations__tab');
// const tabsContainer = document.querySelector('.operations__tab-container');
// const tabsContent = document.querySelectorAll('.operations__content');

// // tabs.forEach(t=>t.addEventListener('click',()=>console.log('tab');))

// tabsContainer.addEventListener('click', function (e) {
//   const clicked = e.target.closest('.operations__tab');

//   //Guard [if someone click on content and not on the button itself]
//   if (!clicked) return;

//   //Renove active classes
//   tabs.forEach(t => t.classList.remove('operations__tab--active'));
//   tabsContent.forEach(c => c.classList.remove('operations__content--active'));

//   //Active tab
//   clicked.classList.add('operations__tab--active');

//   //Active content area
//   document
//     .querySelector(`.operations__content--${clicked.dataset.tab}`)
//     .classList.add('operations__content--active');
// });

//-------------------------------------------------------------------------------------
//Menu Fade Animation
// const handleHover = function (e   ,   .bind Method [its like saying this = 0.5]) {
//   if (e.target.classList.contains('nav__link')) {
//     const link = e.target;
//     const siblings = link.closest('.nav').querySelectorAll('.nav__link');
//     const logo = link.closest('.nav').querySelector('img');

//     siblings.forEach(el => {
//       if (el !== link) el.style.opacity = this;
//     });
//     logo.style.opacity = this;
//   }
// };

// nav.addEventListener('mouseover', handleHover.bind(0.5));
// nav.addEventListener('mouseout', handleHover.bind(1));
//We cant say addEventListenet('mouseover',handleHover(0.5))
//Because handleHover(0.5) will return a value and not a function
//We have to use .bind because addEventListener expect to recive a function
//.bind will attach the sent value to the 'this' keyword [so basicly like saying this = 0.5]
//.bind will return a new function which is why addEventListener will work

//-------------------------------------------------------------------------------------
//Sticky nav
//Old WAY
//this is a bad way because on every px of a scroll it will generate an event that my overwelm our PC
// const intialCords = section1.getBoundingClientRect();

// window.addEventListener('scroll', function (e) {
//   if (window.scrollY > intialCords.top) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// });

//Notice
//New WAY with Intersection Observer API
//Notice

//this callback function will get called each time that the observed element[our target element : section1] is intersecting the root element and the threshold that we defined
//This function will get called with 2 arguments
//1.entries (ערכים)
//2.Observer obj itself
// const obsCallback = function (entries, Observer) {
//   entries.forEach(entry => {
//     console.log(entry);
//   });
// };

//Setting options object
//Options must have root
//[in this example section1 is the target]
//intersect (הצטלבות)
// const obsOptions = {
//   root: null, //the root is the element that the target is intersecting
//   threshold: [0, 0.2], //the precentage of intersection at which the Observer callback will be called[the obsCallback func]
//in other words if we set the threshold to 10% then observer will trigger ONLY when we see 10% of the element
// };

//Creating an new observer
//the observer must got 2 things :
//1. call back function
//2. its options
//then on the observer obj we created we call .observe Method and sending it the TARGET
// const Observer = new IntersectionObserver(obsCallback, obsOptions);
// Observer.observe(section1);

//-------------------------------------------------------------------------------------
// const header = document.querySelector('.header');
//

// const stickyNav = function (entires) {
//   const [entry] = entires;
//   if (!entry.isIntersecting) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// };

// const headerObserver = new IntersectionObserver(stickyNav, {
//   root: null, //we set null because we want the root to be the entire viewport of chrome
//   threshold: 0, //we set 0 here because we want the stickynav to 'stick' only when the whole header element is unvisiable
//   //in other words we want the function to be called when header visability is 0%
//   rootMargin:'-90px', //we add this option to make the nav appear a litlle bit before the end of the whole header
// });
// headerObserver.observe(header);
//-------------------------------------------------------------------------------------
//Lazy Loading images
// const imgTargets = document.querySelectorAll('img[data-src]');

// const loadImg = function (entries, observer) {
//   const [entry] = entries;
//   console.log(entry);
//   if (!entry.isIntersecting) return;
//   //Replace src with data-src
//   entry.target.src = entry.target.dataset.src;
//   entry.target.addEventListener('load', function () {
//     entry.target.classList.remove('lazy-img');
//   });
//   observer.unobserve(entry.target);
// };

// const imgObserver = new IntersectionObserver(loadImg, {
//   root: null,
//   threshold: 0,
// });
// imgTargets.forEach(img => imgObserver.observe(img));
//-------------------------------------------------------------------------------------
// /Slider
// const slides = document.querySelectorAll('.slide');
// const btnLeft = document.querySelector('.slider__btn--left');
// const btnRight = document.querySelector('.slider__btn--right');

// let currentSlide = 0;
// const maxSlide = slides.length;

// // const slider = document.querySelector('.slider');
// // slider.style.transform = 'scale(0.4) translateX(-800px)';
// // slider.style.overflow = 'visible';

// const goToSlide = function (slide) {
//   slides.forEach(
//     (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
//   );
// };

// goToSlide(0);

// //Next slide
// const nextSlide = function () {
//   if (currentSlide === maxSlide - 1) {
//     currentSlide = 0;
//   } else {
//     currentSlide++;
//   }

//   goToSlide(currentSlide);
// };

// const prevSlide = function () {
//   if (currentSlide === 0) {
//     currentSlide = maxSlide - 1;
//   } else {
//     currentSlide--;
//   }
//   goToSlide(currentSlide);
// };

// btnRight.addEventListener('click', nextSlide);
// btnLeft.addEventListener('click', prevSlide);

//-------------------------------------------------------------------------------------
//DOMContent loaded is an event that 'fires' as as the HTML is completely parsed
//which the HTML is finished its download and been converted into the DOM tree
//Also all scripts must be downloaded and executed before the DOMContent event can happend
//Lets look at the EVENT
// document.addEventListener('DOMContentLoaded', function (e) {
//   console.log('DOMContent is finished being parsed', e);
// });
//Notice we want our JAVASCRIPT code to be executed last [after the DOM is fully loaded]
//thats why we put our script tag in the end of the body element
//-------------------------------------------------------------------------------------
//We got a similar event which called load
//its fired up as soon as not only all the HTML loaded but also all the images and external resources like css files are also loaded
//so basiclly when the complete page has finished loading is when this event is gets fired
//Lets see the event
// window.addEventListener('load', function (e) {
//   console.log('Full page loadede', e);
// });
//-------------------------------------------------------------------------------------
//another evenr is beforeunload
//which happens when the user want to leave the page
// window.addEventListener('beforeunload', function (e) {
//   e.preventDefault();
//   //Must return an empty string for it to work
//   e.returnValue = '';
//   console.log(e);
// });
//Notice dont use it too much because it might be annoying
//use it only when neccesery like when user leave a page [in middle of a form input]
//-------------------------------------------------------------------------------------
//Ways of load JS to the page
//1.
//The regular way
//<script src="myjs.js"></script>
//We can put this script in 2 places :
// 1.1  = in the HEAD element
// 1.2  = in the END OF Body element
//when 1.1 the load of the page will look like this :
//-------------- Here is HTML WAITING!!!!!!!!!!------------------------------------------
//Parsing HTML > fetch script > execute script > finished Parsing HTML  = DOMContent loaded
//Notice as you can see HTML parsing waiting for script to be fully executed
//when 1.2 the load of the page will look like this :
//Parsing HTML > finished Parsing HTML > fetch script > execute script > DOMContent loaded
//Notice as you can see in 1.2 the HTML dont wait at all after it fully loaded only then JS is being executed
//-------------------------------------------------------------------------------------
//2.
//<script async src="myjs.js"></script>
//When we use the 2. way the load of the page will look like this :
//parsing HTML > WAITING > finish parsing HTML = DOMContent loaded
//fetch script > execute
//Notice as you can see the script is loaded at the same time as the HTML is being parsed
//Notice however HTML is still stoppping to wait for the script execute
//Notice usually the DOMContent event waits for all scripts to execute , EXCEPT for async scripts
//SO DOMContent does NOT wait for an async script
//Notice scripts not guarenteed to execute in oreder
//-------------------------------------------------------------------------------------
//3.
//<script defer src="myjs.js"></script>
// when we use the 3. way  the load of the page will look like this :
// parsing HTML > execute script = DOMContent loaded
// fetch script
//Notice as you can see the parsing of HTML and the fetch of the script start at the same time
//Notice but the execution of the script starting only after all the parsing of HTML is done
//Notice DOMContent event fires after defer script is executed
//Notice scripts are executed in order
//Notice this is OVERALL BEST SOLUTION
//-------------------------------------------------------------------------------------
