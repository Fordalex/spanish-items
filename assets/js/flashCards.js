const words = {
    have: {
        past: { english: 'I had', spanish: 'tenía' },
        present: { english: 'I have', spanish: 'tengo' },
        future: { english: 'I will have', spanish: 'tendré' }
    },
    take: {
        past: { english: 'I took', spanish: 'tomé' },
        present: { english: 'I take', spanish: 'tomo' },
        future: { english: 'I will take', spanish: 'tomaré' }
    },
    want: {
        past: { english: 'I wanted', spanish: 'quería' },
        present: { english: 'I want', spanish: 'quiero' },
        future: { english: 'I will want', spanish: 'querré' }
    },
    go: {
        past: { english: 'I went', spanish: 'fui' },
        present: { english: 'I go', spanish: 'voy' },
        future: { english: 'I will go', spanish: 'iré' }
    },
    come: {
        past: { english: 'I came', spanish: 'vine' },
        present: { english: 'I come', spanish: 'vengo' },
        future: { english: 'I will come', spanish: 'vendré' }
    },
    make: {
        past: { english: 'I made', spanish: 'hice' },
        present: { english: 'I make', spanish: 'hago' },
        future: { english: 'I will make', spanish: 'haré' }
    },
    know: {
        past: { english: 'I knew', spanish: 'sabía' },
        present: { english: 'I know', spanish: 'sé' },
        future: { english: 'I will know', spanish: 'sabré' }
    },
    say: {
        past: { english: 'I said', spanish: 'dije' },
        present: { english: 'I say', spanish: 'digo' },
        future: { english: 'I will say', spanish: 'diré' }
    },
    feel: {
        past: { english: 'I felt', spanish: 'sentí' },
        present: { english: 'I feel', spanish: 'siento' },
        future: { english: 'I will feel', spanish: 'sentiré' }
    },
    need: {
        past: { english: 'I needed', spanish: 'necesitaba' },
        present: { english: 'I need', spanish: 'necesito' },
        future: { english: 'I will need', spanish: 'necesitaré' }
    },
    like: {
        past: { english: 'I liked', spanish: 'me gustaba' },
        present: { english: 'I like', spanish: 'me gusta' },
        future: { english: 'I will like', spanish: 'me gustará' }
    },
    watch: {
        past: { english: 'I watched', spanish: 'vi' },
        present: { english: 'I watch', spanish: 'veo' },
        future: { english: 'I will watch', spanish: 'veré' }
    },
};


const selectedWords = [];
const display = document.getElementById('word-display');
const showNextBtn = document.getElementById('show-next-btn');
let currentWordIndex = null;
let showMode = true;

// Populate buttons dynamically based on verbs
const buttonsContainer = document.getElementById('buttons-container');
Object.keys(words).forEach(verb => {
    const button = document.createElement('button');
    button.className = 'word-btn';
    button.textContent = verb.charAt(0).toUpperCase() + verb.slice(1); // Capitalize first letter
    button.addEventListener('click', () => {
        // Clear selected words and populate them with all tenses for the chosen verb
        selectedWords.length = 0;
        const tenses = words[verb];
        for (const tense in tenses) {
            selectedWords.push(tenses[tense]);
        }
        resetDisplay();
    });
    buttonsContainer.appendChild(button);
});

// Show/Next button logic
showNextBtn.addEventListener('click', () => {
    if (selectedWords.length === 0) {
        display.innerText = 'Please select a verb to practice!';
        return;
    }

    if (showMode) {
        let spanish = selectedWords[currentWordIndex].spanish;
        let english = selectedWords[currentWordIndex].english;
        display.innerText = `${spanish} - ${english}`;
        showNextBtn.innerText = 'Next';
    } else {
        showRandomWord();
        showNextBtn.innerText = 'Show';
    }
    showMode = !showMode;
});

function resetDisplay() {
    showNextBtn.innerText = 'Show';
    display.innerText = 'Ready to start?';
    showMode = true;
    showRandomWord();
}

function showRandomWord() {
    currentWordIndex = Math.floor(Math.random() * selectedWords.length);
    display.innerText = selectedWords[currentWordIndex].english;
}
