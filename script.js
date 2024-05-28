document.addEventListener('DOMContentLoaded', function() {
    const welcomeContainer = document.getElementById('welcomeContainer');
    const mainContainer = document.getElementById('mainContainer');
    const alphabetContainer = document.getElementById('alphabetSection');
    const startButton = document.getElementById('startButton');
    const translateButton = document.getElementById('translateButton');
    const clearButton = document.getElementById('clearButton');
    const showAlphabetButton = document.getElementById('showAlphabetButton');
    const hideAlphabetButton = document.getElementById('hideAlphabetButton');
    const speakButton = document.getElementById('speakButton');

    startButton.addEventListener('click', function() {
        welcomeContainer.style.display = 'none';
        mainContainer.style.display = 'block';
    });

    translateButton.addEventListener('click', translateToSignLanguage);
  
    // Evento para el campo de entrada de texto
    const inputText = document.getElementById('inputText');
  
    inputText.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            translateToSignLanguage();
        }
    });
  
    clearButton.addEventListener('click', clearText);
    showAlphabetButton.addEventListener('click', showAlphabet);
    hideAlphabetButton.addEventListener('click', hideAlphabet);

    // Reconocimiento de Voz
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = false;
    recognition.lang = 'es-ES';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    speakButton.addEventListener('click', function() {
        recognition.start();
        document.getElementById('error').style.display = 'none'; // Ocultar mensajes de error al iniciar el reconocimiento
    });

    recognition.onresult = function(event) {
        const transcript = event.results[0][0].transcript;
        document.getElementById('inputText').value = transcript;
    };

    recognition.onspeechend = function() {
        recognition.stop();
    };

    recognition.onerror = function(event) {
        const errorDiv = document.getElementById('error');
        let errorMessage = 'Error en el reconocimiento de voz.';

        switch(event.error) {
            case 'no-speech':
                errorMessage = 'No se detectó ninguna voz. Por favor, intenta de nuevo.';
                break;
            case 'audio-capture':
                errorMessage = 'No se pudo acceder al micrófono. Asegúrate de que esté conectado y habilitado.';
                break;
            case 'not-allowed':
                errorMessage = 'El permiso para usar el micrófono fue denegado. Por favor, permite el acceso al micrófono.';
                break;
            default:
                errorMessage = 'Ocurrió un error desconocido: ' + event.error;
        }

        errorDiv.innerText = errorMessage;
        errorDiv.style.display = 'block';
    };
  
    const alphabetImages = {
        'a': 'https://i.imgur.com/bREklbs.jpeg',
        'b': 'https://i.imgur.com/aOVXeIP.jpg',
        'c': 'https://i.imgur.com/HBSkAnK.jpg',
        'd': 'https://i.imgur.com/EnkpJoN.jpg',
        'e': 'https://i.imgur.com/EfWa28q.jpg',
        'f': 'https://i.imgur.com/rN53xkV.jpg',
        'g': 'https://i.imgur.com/zYuVt80.jpg',
        'h': 'https://i.imgur.com/sHnIY7E.jpg',
        'i': 'https://i.imgur.com/Xjo8GQz.jpg',
        'j': 'https://i.imgur.com/ClykS7P.jpg',
        'k': 'https://i.imgur.com/bHyYZtt.jpg',
        'l': 'https://i.imgur.com/TrhfqzS.jpg',
        'm': 'https://i.imgur.com/Tl58Ew2.jpg',
        'n': 'https://i.imgur.com/K9tMa0l.jpg',
        'o': 'https://i.imgur.com/NmXDe6G.jpg',
        'p': 'https://i.imgur.com/bmW3zQJ.jpg',
        'q': 'https://i.imgur.com/H4V7QCj.jpg',
        'r': 'https://i.imgur.com/gZdBx4R.jpg',
        's': 'https://i.imgur.com/tWdEylW.jpg',
        't': 'https://i.imgur.com/oQ7tBK9.jpg',
        'u': 'https://i.imgur.com/PW1mOnI.jpg',
        'v': 'https://i.imgur.com/43rzcZq.jpg',
        'w': 'https://i.imgur.com/CXZsd5o.jpg',
        'x': 'https://i.imgur.com/nIxVqJx.jpg',
        'y': 'https://i.imgur.com/ayL0Epd.jpg',
        'z': 'https://i.imgur.com/MjhHpc2.jpg'
    };
          
  
    const imageLinks = {
        'hola': 'https://i.imgur.com/cQxvEm0.png',
        'adios': 'https://i.imgur.com/JvzLeAZ.png',
        'buenos dias': 'https://i.imgur.com/NAk2b0Q.png',
        'buenas tardes': 'https://i.imgur.com/aNhr8Ri.png',
        'buenas noches': 'https://i.imgur.com/EdSn7qH.png',
        'como estas': 'https://i.imgur.com/3j5zcvm.png',
        'por favor': 'https://i.imgur.com/JXbzOA9.png',
        'gracias': 'https://i.imgur.com/9rNtb3J.png',
        'perdon': 'https://i.imgur.com/5Qc7Xma.png',
        'de nada': 'https://i.imgur.com/HzY7uz2.png',
        'cuidate': 'https://i.imgur.com/lZf0cmS.png',
        '1': 'https://i.imgur.com/UQMNNV8.png',
        'uno': 'https://i.imgur.com/UQMNNV8.png',
        'dos': 'https://i.imgur.com/1Busyh5.png',
        '2': 'https://i.imgur.com/1Busyh5.png',
        'tres': 'https://i.imgur.com/vWwJG8Q.png',
        '3': 'https://i.imgur.com/vWwJG8Q.png',
        'cuatro': 'https://i.imgur.com/PGBr5LQ.png',
        '4': 'https://i.imgur.com/PGBr5LQ.png',
        'cinco': 'https://i.imgur.com/H5lTifz.png',
        '5': 'https://i.imgur.com/H5lTifz.png',
        'seis': 'https://i.imgur.com/26ux8aS.png',
        '6': 'https://i.imgur.com/26ux8aS.png',
        'siete': 'https://i.imgur.com/yFf2Udr.png',
        '7': 'https://i.imgur.com/yFf2Udr.png',
        'ocho': 'https://i.imgur.com/b172Yfx.png',
        '8': 'https://i.imgur.com/b172Yfx.png',
        'nueve': 'https://i.imgur.com/7vcmZpF.jpeg',
        '9': 'https://i.imgur.com/7vcmZpF.jpeg',
        'diez': 'https://i.imgur.com/6EgMQgx.jpeg',
        '10': 'https://i.imgur.com/6EgMQgx.jpeg',
        'cien': 'https://i.imgur.com/yuqyifI.jpeg',
        '100': 'https://i.imgur.com/yuqyifI.jpeg',
        'mil': 'https://i.imgur.com/HMRKztm.jpeg',
        '1000': 'https://i.imgur.com/HMRKztm.jpeg',
        'lunes': 'https://i.imgur.com/HrfCtfm.jpeg',
        'martes': 'https://i.imgur.com/QUpCM1e.jpeg',
        'miércoles': 'https://i.imgur.com/mVhjly3.jpeg',
        'jueves': 'https://i.imgur.com/hN85Dx9.jpeg',
        'viernes': 'https://i.imgur.com/4SjSI4H.jpeg',
        'sábado': 'https://i.imgur.com/cmJRCzu.jpeg',
        'domingo': 'https://i.imgur.com/hvhFxB8.jpeg',
        'rojo': '',
        'azul': '',
        'verde': '',
        'amarillo': '',
        'blanco': '',
        'negro': '',
    };

    function translateToSignLanguage() {
        const inputText = document.getElementById('inputText').value.toLowerCase();
        translate(inputText);
    }

    const allImages = { ...imageLinks, ...alphabetImages };
  
    function translate(word) {
    const outputDiv = document.getElementById('output');
    
    // Limpiar el contenido previo
    outputDiv.innerHTML = '';
    
    // Verificar si la palabra está en el objeto allImages
    if (allImages.hasOwnProperty(word)) {
        const img = document.createElement('img');
        img.src = allImages[word];
        img.alt = word;
        outputDiv.appendChild(img);
    } else {
        // Si la palabra no está en imageLinks, mostrar un mensaje de error
        const errorMessage = document.createElement('span');
        errorMessage.textContent = 'Traducción no disponible para: ' + word;
        outputDiv.appendChild(errorMessage);
    }

    // Mostrar la sección de imágenes después de traducir
    outputDiv.style.display = 'block';
}


    function clearText() {
        document.getElementById('inputText').value = ''; // Limpiar el campo de texto
        const outputDiv = document.getElementById('output');
        outputDiv.innerHTML = ''; // Limpiar el contenido de imágenes
    }

    function showAlphabet() {
        mainContainer.style.display = 'none';
        alphabetContainer.style.display = 'block';
        displayAlphabet();
    }

    function hideAlphabet() {
        alphabetContainer.style.display = 'none';
        mainContainer.style.display = 'block';
    }

    function displayAlphabet() {
        const alphabetDiv = document.getElementById('alphabet');
        alphabetDiv.innerHTML = ''; // Limpiar el contenido previo

        for (let char in alphabetImages) {
            if (alphabetImages[char]) {
                const img = document.createElement('img');
                img.src = alphabetImages[char];
                img.alt = char;
                alphabetDiv.appendChild(img);
             }
        }
    }
});
