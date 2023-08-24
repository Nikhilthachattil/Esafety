const menu = document.querySelector("#menu_bars");
const navbar = document.querySelector(".Navbar");

menu.onclick = () => {
  menu.classList.toggle("fa-x");
  navbar.classList.add("active");
  if (!menu.classList.contains("fa-x")) {
    navbar.classList.remove("active");
  }
};

const carouses = document.querySelectorAll(".carouse1, .carouse2, .carouse3");

carouses.forEach((carouse) => {
  const prevButton = carouse.querySelector("#prev");
  const nextButton = carouse.querySelector("#next");

  let currentCarousel;
  let isDragging = false;
  let startPosition = 0;
  let clickedPosition = 0; // Added to track the clicked position
  const scrollSpeed = 2; // Adjust this value to control the scrolling speed

  const preventTextSelection = () => {
    window.getSelection().removeAllRanges();
  };

  const dragStart = (e) => {
    isDragging = true;
    currentCarousel = e.currentTarget;

    // Update the clickedPosition
    clickedPosition = e.pageX - currentCarousel.offsetLeft;

    // Update the startPosition
    startPosition = clickedPosition - currentCarousel.scrollLeft;

    preventTextSelection();
  };

  const dragEnd = () => {
    isDragging = false;
  };

  const dragging = (e) => {
    if (!isDragging) return;

    e.preventDefault();

    const newPosition = e.pageX - currentCarousel.offsetLeft;
    const scrollDelta = (newPosition - clickedPosition) * scrollSpeed;

    const minScroll = 0;
    const maxScroll = currentCarousel.scrollWidth - currentCarousel.clientWidth;
    const newScrollLeft = Math.max(
      minScroll,
      Math.min(maxScroll, currentCarousel.scrollLeft - scrollDelta)
    );
    currentCarousel.scrollLeft = newScrollLeft;
  };

  carouse.addEventListener("mousedown", dragStart);
  carouse.addEventListener("mouseup", dragEnd);
  carouse.addEventListener("mouseleave", dragEnd);
  carouse.addEventListener("mousemove", dragging);

  prevButton.addEventListener("click", () => {
    currentCarousel.scrollLeft -= 100; // Adjust this value to control navigation distance
  });

  nextButton.addEventListener("click", () => {
    currentCarousel.scrollLeft += 100; // Adjust this value to control navigation distance
  });
});

const links = document.querySelectorAll(".global_button");

links.forEach((link) => {
  const dropdown = link.nextElementSibling;

  link.addEventListener("click", () => {
    dropdown.classList.toggle("show");
    dropdown.classList.add("active");
  });

  document.addEventListener("click", (event) => {
    if (event.target === dropdown) {
      dropdown.classList.remove("show");
      dropdown.classList.remove("active");
    }
  });
});
// countrylist

document.addEventListener("DOMContentLoaded", function () {
  const buttonListPairs = [
    {
      button: document.getElementById("global1"),
      list: document.getElementById("countryList1"),
    },
    {
      button: document.getElementById("global2"),
      list: document.getElementById("countryList2"),
    },
    {
      button: document.getElementById("global3"),
      list: document.getElementById("countryList3"),
    },
    {
      button: document.getElementById("global4"),
      list: document.getElementById("countryList4"),
    },
  ];

  buttonListPairs.forEach((pair) => {
    pair.button.addEventListener("click", function () {
      pair.list.classList.toggle("show");
    });
  });

  // Handle clicks outside of dropdowns and buttons
  document.addEventListener("click", function (event) {
    buttonListPairs.forEach((pair) => {
      if (
        !pair.button.contains(event.target) &&
        !pair.list.contains(event.target)
      ) {
        pair.list.classList.remove("show");
      }
    });
  });
});
