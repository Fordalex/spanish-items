let currentWordType = null;
let currentPair = null;
let currentForm = null;
let correctOption = null;
let currentWord = null;

// Initialize the word type selection screen
function initializeWordTypeSelection() {
  const wordTypeContainer = document.getElementById("wordTypeButtons");
  wordTypeContainer.innerHTML = '';

  Object.keys(words).forEach(type => {
    const button = document.createElement("button");
    button.classList.add("button");
    button.textContent = capitalize(type);
    button.onclick = () => selectWordType(type);
    wordTypeContainer.appendChild(button);
  });

  document.getElementById("wordTypeSelection").style.display = 'block';
}

// Capitalize function for button text
function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

// Select a word type and move to pair selection
function selectWordType(type) {
  currentWordType = type;
  document.getElementById("wordTypeSelection").style.display = 'none';
  displayPairSelection();
}

// Display pairs for the selected word type
function displayPairSelection() {
  const pairButtonsContainer = document.getElementById("pairButtons");
  pairButtonsContainer.innerHTML = '';

  window.words[currentWordType].forEach((pair, index) => {
    const [word1, word2] = Object.keys(pair.base);
    const button = document.createElement("button");
    button.classList.add("button");
    button.textContent = `${capitalize(word1)}/${capitalize(word2)}`;
    button.onclick = () => startPractice(pair);
    pairButtonsContainer.appendChild(button);
  });

  document.getElementById("pairSelection").style.display = 'block';
}

// Start practice with selected pair
function startPractice(pair) {
  currentPair = pair;
  document.getElementById("pairSelection").style.display = 'none';
  document.getElementById("practiceSection").style.display = 'block';
  newQuestion();
}

// Generate a new question for the selected pair
function newQuestion() {
  const forms = Object.keys(currentPair);
  currentForm = forms[Math.floor(Math.random() * forms.length)];

  const words = Object.keys(currentPair[currentForm]);
  currentWord = words[Math.floor(Math.random() * words.length)];
  const correctTranslation = currentPair[currentForm][currentWord].translation;
  const incorrectTranslation = getRandomIncorrectTranslation(currentForm, correctTranslation);

  document.getElementById("question").innerText = `Select the correct translation for: "${currentWord}"`;
  document.getElementById("feedback").innerText = "";
  document.getElementById("example").innerText = "";
  correctOption = Math.random() < 0.5 ? 0 : 1;
  document.getElementById(`option${correctOption}`).innerText = correctTranslation;
  document.getElementById(`option${1 - correctOption}`).innerText = incorrectTranslation;
  document.getElementById("nextButton").style.display = "none";
}

// Get a random incorrect translation from the same form
function getRandomIncorrectTranslation(form, correctTranslation) {
  const translations = Object.values(currentPair[form]).map(entry => entry.translation).filter(t => t !== correctTranslation);
  return translations[Math.floor(Math.random() * translations.length)];
}

// Check if selected answer is correct
function checkAnswer(selectedOption) {
  if (selectedOption === correctOption) {
    let spanishExample = currentPair[currentForm][currentWord].spanish_example;
    let englishExample = currentPair[currentForm][currentWord].english_example;

    document.getElementById("feedback").innerText = "Correct!";
    document.getElementById("example").innerText = `English: ${englishExample} - Spanish: ${spanishExample}`;
    document.getElementById("nextButton").style.display = "block";
  } else {
    document.getElementById("feedback").innerText = "Try again!";
  }
}

// Return to word type selection
function returnToWordTypeSelection() {
  document.getElementById("practiceSection").style.display = 'none';
  document.getElementById("wordTypeSelection").style.display = 'block';
}

// Initialize the game by showing word type selection
initializeWordTypeSelection();
