// let slideIndex = 1;
// showSlides(slideIndex);

// // Next/previous controls
// function plusSlides(n) {
//   showSlides(slideIndex += n);
// }

// // Thumbnail image controls
// function currentSlide(n) {
//   showSlides(slideIndex = n);
// }

// function showSlides(n) {
//   let i;
//   let slides = document.getElementsByClassName("mySlides");
//   let dots = document.getElementsByClassName("dot");
//   if (n > slides.length) {slideIndex = 1}
//   if (n < 1) {slideIndex = slides.length}
//   for (i = 0; i < slides.length; i++) {
//     slides[i].style.display = "none";
//   }
//   for (i = 0; i < dots.length; i++) {
//     dots[i].className = dots[i].className.replace(" active", "");
//   }
//   slides[slideIndex-1].style.display = "block";
//   dots[slideIndex-1].className += " active";
// }

/**
 * GAME CLUB GALLERY SLIDER
 * Controls the automatic and manual navigation of event photos
 */

// Get all slide images and initialize tracking variables
const slides = document.querySelectorAll(".slides img");
let slideIndex = 0;       // Tracks current slide position
let intervalId = null;    // Stores the auto-advance interval

// Initialize slider when DOM is fully loaded
document.addEventListener("DOMContentLoaded", initializeSlider);

/**
 * Sets up the slider functionality
 * - Shows first slide
 * - Starts auto-advance timer (5s interval)
 */
function initializeSlider() {
  if (slides.length > 0) {
    slides[slideIndex].classList.add("displaySlide");
    intervalId = setInterval(nextSlide, 5000); // Auto-advance every 5 seconds
  }
}

/**
 * Displays the slide at the given index
 * - Handles wrap-around for infinite looping
 * - Manages slide visibility classes
 * @param {number} index - The slide index to display
 */
function showSlide(index) {
  // Handle wrap-around for infinite slider
  if (index >= slides.length) {
    slideIndex = 0; // Loop to first slide if past end
  } else if (index < 0) {
    slideIndex = slides.length - 1; // Loop to last slide if before start
  }

  // Hide all slides
  slides.forEach((slide) => {
    slide.classList.remove("displaySlide");
  });
  
  // Show current slide
  slides[slideIndex].classList.add("displaySlide");
}

/**
 * Navigates to the previous slide
 * - Resets auto-advance timer on manual navigation
 */
function prevSlide() {
    clearInterval(intervalId); // Pause auto-advance
    slideIndex--;
    showSlide(slideIndex);
    // Note: Auto-advance would need to be restarted if desired
}

/**
 * Navigates to the next slide
 * - Continues auto-advance cycle
 */
function nextSlide() {
  slideIndex++;
  showSlide(slideIndex);
}