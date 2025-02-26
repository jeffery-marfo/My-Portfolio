// Color mode toggle
const toggleMode = document.getElementById("toggleMode");
toggleMode.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

// Changing text animation
const changingText = document.getElementById("changing-text");
const textOptions = [
  "Web Designer",
  "Jeffery Marfo",
  "UI UX Designer",
  "Junior Web Developer",
];
let currentIndex = 0;

function typeText(text, index = 0) {
  if (index < text.length) {
    changingText.textContent = text.substring(0, index + 1);
    setTimeout(() => typeText(text, index + 1), 100);
  } else {
    setTimeout(deleteText, 2000);
  }
}

function deleteText() {
  const currentText = changingText.textContent;
  if (currentText.length > 0) {
    changingText.textContent = currentText.substring(0, currentText.length - 1);
    setTimeout(deleteText, 50);
  } else {
    currentIndex = (currentIndex + 1) % textOptions.length;
    setTimeout(() => typeText(textOptions[currentIndex]), 500);
  }
}

// Start the animation
typeText(textOptions[currentIndex]);
