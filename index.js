    const header = document.querySelector("header");
      const menuToggler = document.querySelectorAll("#menu_toggle");

      menuToggler.forEach(toggler => {
        toggler.addEventListener("click", () => header.classList.toggle("showMenu"));
      });
// Add click event listener to reviews
        const reviews = document.querySelectorAll('.review');
        reviews.forEach(review => {
            review.addEventListener('click', () => {
                // Remove 'active' class from all reviews
                reviews.forEach(r => r.classList.remove('active'));
                // Add 'active' class to clicked review
                review.classList.add('active');
            });
        });
      document.addEventListener("DOMContentLoaded", function() {
  let mainScreenshot = null;

  const screenshots = document.querySelectorAll('.screenshot');

  screenshots.forEach(screenshot => {
    const enlargeBtn = screenshot.querySelector('.enlarge-btn');
    const shrinkBtn = screenshot.querySelector('.shrink-btn');
    const img = screenshot.querySelector('img');

    screenshot.addEventListener('click', () => {
      prioritizeMainScreen(screenshot);
    });

    enlargeBtn.addEventListener('click', (event) => {
      event.stopPropagation();
      toggleEnlarge(img);
    });

    shrinkBtn.addEventListener('click', (event) => {
      event.stopPropagation();
      shrinkImage(img);
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft' && mainScreenshot && mainScreenshot.previousElementSibling) {
      prioritizeMainScreen(mainScreenshot.previousElementSibling);
    } else if (event.key === 'ArrowRight' && mainScreenshot && mainScreenshot.nextElementSibling) {
      prioritizeMainScreen(mainScreenshot.nextElementSibling);
    } else if (event.key === 'Escape' && mainScreenshot) {
      shrinkImage(mainScreenshot.querySelector('img'));
    }
  });

  function prioritizeMainScreen(screenshot) {
    if (mainScreenshot) {
      mainScreenshot.classList.remove('main');
    }
    screenshot.classList.add('main');
    mainScreenshot = screenshot;
  }

  function toggleEnlarge(img) {
    img.classList.toggle('enlarged');
    document.body.classList.toggle('fullscreen');
    addCloseButton();
    setTimeout(() => {
      document.addEventListener('click', closeOnClickOutside);
    }, 100);
  }

  function shrinkImage(img) {
    img.classList.remove('enlarged');
    document.body.classList.remove('fullscreen');
    removeCloseButton();
    document.removeEventListener('click', closeOnClickOutside);
  }

  function addCloseButton() {
    const closeButton = document.createElement('button');
    closeButton.textContent = 'Close';
    closeButton.classList.add('close-button');
    closeButton.addEventListener('click', () => {
      shrinkImage(mainScreenshot.querySelector('img'));
    });
    document.body.appendChild(closeButton);
  }

  function removeCloseButton() {
    const closeButton = document.querySelector('.close-button');
    if (closeButton) {
      closeButton.remove();
    }
  }

  function closeOnClickOutside(event) {
    if (!mainScreenshot.contains(event.target)) {
      shrinkImage(mainScreenshot.querySelector('img'));
    }
  }
});
