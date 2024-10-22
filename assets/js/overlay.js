document.addEventListener('DOMContentLoaded', function () {
    let imageContainer = document.querySelector('.image-container');
    let modalTitle = document.querySelector('#modalLabel');
    let modalBody = document.querySelector('.modal-body');
    
    let words = window.words;
    words.forEach((word, index) => {
        let item = document.createElement('div');
        item.classList.add('item');
        item.classList.add(word.english.toLowerCase().replace(/ /g, '-'));

        let sentenceCount = word.sentences ? word.sentences.length : 0;

        let translation = document.createElement('div');
        translation.classList.add('translation');
        translation.innerHTML = `${word.spanish} (${word.english}) - ${sentenceCount}`;
        translation.dataset.bsToggle = 'modal';
        translation.dataset.bsTarget = '#modal';

        translation.addEventListener('click', function () {
            modalTitle.textContent = word.spanish;

            if (word.sentences) {
                modalBody.innerHTML = '';
                word.sentences.forEach(sentence => {
                    let sentenceDiv = document.createElement('div');
                    sentenceDiv.classList.add('sentence');
                    sentenceDiv.innerHTML = `<strong>Spanish:</strong> ${sentence.spanish}<br><strong>English:</strong> ${sentence.english}`;
                    modalBody.appendChild(sentenceDiv);
                });
            } else {
                modalBody.textContent = 'No sentences available.';
            }
        });

        item.appendChild(translation);
        imageContainer.appendChild(item);
    });
});
