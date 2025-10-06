// Theme toggle functionality
const themeToggle = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");
const body = document.body;
const navbar = document.getElementById("navbar");
const scrollButton = document.getElementById("scroll-button");
const homeSection = document.getElementById("home");
const projectsSection = document.getElementById("projects");
const projectCards = document.querySelectorAll("#projects .bg-white"); // Select all project cards
const projectParagraphs = document.querySelectorAll("#projects p"); // Select all <p> elements in project cards
const classProjectsSection = document.getElementById("class");
const classProjectCards = document.querySelectorAll("#class .bg-white"); // Select all class project cards
const classProjectParagraphs = document.querySelectorAll("#class p"); // Select all <p> elements in class project cards
const menuToggle = document.getElementById("menu-toggle");
const menu = document.getElementById("menu"); // Mobile navbar
const nowPlayingWidget = document.getElementById("now-playing-widget");
const loadingBox = document.getElementById("loading");
const trackBox = document.getElementById("track");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const album = document.getElementById("album");
const nowPlayingCard = document.getElementById("nowplayingcard");
const trackTitle = document.getElementById("tracktitle");
const trackArtist = document.getElementById("trackartist");
const trackArt = document.getElementById("trackart");
// Function to apply the theme
function applyTheme(isDarkMode) {
  // Update body background and text
  body.classList.toggle("bg-gray-800", isDarkMode);
  body.classList.toggle("text-white", isDarkMode);
  body.classList.toggle("bg-gray-100", !isDarkMode);
  body.classList.toggle("text-gray-800", !isDarkMode);

  // Update navbar background and text
  navbar.classList.toggle("bg-gray-800", isDarkMode);
  navbar.classList.toggle("text-white", isDarkMode);
  navbar.classList.toggle("bg-gray-100", !isDarkMode);
  navbar.classList.toggle("text-gray-800", !isDarkMode);

  // Update scroll button background and text
  scrollButton.classList.toggle("bg-gray-800", isDarkMode);
  scrollButton.classList.toggle("text-white", isDarkMode);
  scrollButton.classList.toggle("hover:bg-gray-700", isDarkMode);
  scrollButton.classList.toggle("bg-gray-100", !isDarkMode);
  scrollButton.classList.toggle("text-gray-800", !isDarkMode);
  scrollButton.classList.toggle("hover:bg-gray-300", !isDarkMode);

  // Update home section background and text
  homeSection.classList.toggle("bg-gray-800", isDarkMode);
  homeSection.classList.toggle("text-white", isDarkMode);
  homeSection.classList.toggle("bg-gray-100", !isDarkMode);
  homeSection.classList.toggle("text-gray-800", !isDarkMode);

  // Update projects section background and text
  projectsSection.classList.toggle("bg-gray-800", isDarkMode);
  projectsSection.classList.toggle("text-white", isDarkMode);
  projectsSection.classList.toggle("bg-gray-100", !isDarkMode);
  projectsSection.classList.toggle("text-gray-800", !isDarkMode);

  classProjectsSection.classList.toggle("bg-gray-800", isDarkMode);
  classProjectsSection.classList.toggle("text-white", isDarkMode);
  classProjectsSection.classList.toggle("bg-gray-100", !isDarkMode);
  classProjectsSection.classList.toggle("text-gray-800", !isDarkMode);

  // Update hamburger menu background
  menuToggle.classList.toggle("bg-gray-800", isDarkMode);
  menuToggle.classList.toggle("hover:bg-gray-700", isDarkMode);
  menuToggle.classList.toggle("bg-gray-100", !isDarkMode);
  menuToggle.classList.toggle("hover:bg-gray-300", !isDarkMode);

  // Update theme toggle button background
  themeToggle.classList.toggle("bg-gray-800", isDarkMode);
  themeToggle.classList.toggle("hover:bg-gray-700", isDarkMode);
  themeToggle.classList.toggle("bg-gray-100", !isDarkMode);
  themeToggle.classList.toggle("hover:bg-gray-300", !isDarkMode);

  // Update mobile navbar background
  menu.classList.toggle("bg-gray-800", isDarkMode);
  menu.classList.toggle("text-white", isDarkMode);
  menu.classList.toggle("bg-gray-100", !isDarkMode);
  menu.classList.toggle("text-gray-800", !isDarkMode);

  // Update project cards
  projectCards.forEach((card) => {
    card.classList.toggle("bg-gray-800", isDarkMode);
    card.classList.toggle("text-white", isDarkMode);
    card.classList.toggle("bg-white", !isDarkMode);
    card.classList.toggle("text-gray-700", !isDarkMode);
  });

  // Update project paragraphs
  projectParagraphs.forEach((paragraph) => {
    paragraph.classList.toggle("text-gray-300", isDarkMode); // Light text for dark mode
    paragraph.classList.toggle("text-gray-700", !isDarkMode); // Dark text for light mode
  });

  // Update class project cards
  classProjectCards.forEach((card) => {
    card.classList.toggle("bg-gray-800", isDarkMode);
    card.classList.toggle("text-white", isDarkMode);
    card.classList.toggle("bg-white", !isDarkMode);
    card.classList.toggle("text-gray-700", !isDarkMode);
  });

  // Update class project paragraphs
  classProjectParagraphs.forEach((paragraph) => {
    paragraph.classList.toggle("text-gray-300", isDarkMode); // Light text for dark mode
    paragraph.classList.toggle("text-gray-700", !isDarkMode); // Dark text for light mode
  });

  nowPlayingCard.classList.toggle("bg-gray-800", isDarkMode);
  nowPlayingCard.classList.toggle("text-white", isDarkMode);
  nowPlayingCard.classList.toggle("bg-white", !isDarkMode);
  nowPlayingCard.classList.toggle("text-gray-800", !isDarkMode);
  nowPlayingCard.classList.toggle("shadow-lg", true);

  // Track title link color
  trackTitle.classList.toggle("text-blue-400", isDarkMode);
  trackTitle.classList.toggle("text-blue-700", !isDarkMode);

  // Track artist color
  trackArtist.classList.toggle("text-gray-300", isDarkMode);
  trackArtist.classList.toggle("text-gray-600", !isDarkMode);

  // Update theme icon
  if (isDarkMode) {
    themeIcon.innerHTML = getDarkModeSVG();
  } else {
    themeIcon.innerHTML = getLightModeSVG();
  }
}

// Check system preference and localStorage
const userPreference = localStorage.getItem("theme");
const systemPreference = window.matchMedia(
  "(prefers-color-scheme: dark)"
).matches;
const isDarkMode =
  userPreference === "dark" || (userPreference === null && systemPreference);

// Apply the initial theme
applyTheme(isDarkMode);

// Save theme to localStorage on toggle
themeToggle.addEventListener("click", () => {
  const isDarkMode = body.classList.contains("bg-gray-800");
  localStorage.setItem("theme", isDarkMode ? "light" : "dark");
  applyTheme(!isDarkMode);
});

// Scroll button behavior
window.addEventListener("scroll", () => {
  const isAtTop = window.scrollY < homeSection.offsetHeight / 2;

  if (isAtTop) {
    scrollButton.href = "#content";
    scrollButton.textContent = "Go Down";
  } else {
    scrollButton.href = "#home";
    scrollButton.textContent = "To Top";
  }
});

//Navigation menu toggle functionality
menuToggle.addEventListener("click", () => {
  menu.classList.toggle("hidden");
});

// SVG for Light Mode Icon
function getLightModeSVG() {
  return `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364-6.364l-1.414 1.414M6.05 17.95l-1.414-1.414m12.728 0l1.414 1.414M6.05 6.05L4.636 4.636M12 7a5 5 0 100 10 5 5 0 000-10z" />
        </svg>
    `;
}

// SVG for Dark Mode Icon
function getDarkModeSVG() {
  return `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6 flex items-center justify-center">
            <g transform="translate(14.5, 14.5)">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.293-1.707A8 8 0 11-2.707-9.293a8.001 8.001 0 007.586 7.586z" />
            </g>
        </svg>
    `;
}
