// Funciones para manejar las pestañas
function showTab(tabName) {
    // Ocultar todos los contenidos de pestañas
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => {
        content.classList.remove('active');
    });
    
    // Remover clase active de todos los botones
    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(button => {
        button.classList.remove('active');
    });
    
    // Mostrar el contenido seleccionado
    document.getElementById(tabName).classList.add('active');
    
    // Activar el botón seleccionado
    event.target.classList.add('active');
}

// Datos para el quiz
const quizData = [
    {
        question: "¿Cuál es el pronombre correcto para referirse a una mujer?",
        options: ["He", "She", "It", "They"],
        correct: 1,
        explanation: "She es el pronombre femenino de tercera persona singular"
    },
    {
        question: "¿Qué pronombre usamos para hablar de nosotros mismos en plural?",
        options: ["You", "We", "They", "I"],
        correct: 1,
        explanation: "We es el pronombre de primera persona plural (nosotros/as)"
    },
    {
        question: "¿Cuál es el pronombre para referirse a un hombre?",
        options: ["She", "It", "He", "We"],
        correct: 2,
        explanation: "He es el pronombre masculino de tercera persona singular"
    },
    {
        question: "¿Qué pronombre usamos para objetos o animales?",
        options: ["He", "She", "It", "You"],
        correct: 2,
        explanation: "It es el pronombre neutro para objetos, animales y cosas"
    },
    {
        question: "¿Cuál es el pronombre de segunda persona (singular y plural)?",
        options: ["I", "You", "We", "They"],
        correct: 1,
        explanation: "You se usa tanto para tú/usted como para ustedes"
    },
    {
        question: "¿Qué pronombre usamos para referirnos a un grupo de personas?",
        options: ["He", "She", "We", "They"],
        correct: 3,
        explanation: "They es el pronombre de tercera persona plural (ellos/as)"
    },
    {
        question: "¿Cuál es el pronombre de primera persona singular?",
        options: ["I", "You", "We", "Me"],
        correct: 0,
        explanation: "I es el pronombre de primera persona singular (yo)"
    },
    {
        question: "Si hablo de mi familia y yo, ¿qué pronombre uso?",
        options: ["They", "You", "We", "Us"],
        correct: 2,
        explanation: "We incluye al hablante y a otras personas (nosotros/as)"
    }
];

let currentQuestion = 0;
let score = 0;
let quizActive = false;

// Función para iniciar el quiz
function startQuiz() {
    quizActive = true;
    currentQuestion = 0;
    score = 0;
    document.getElementById('quiz-container').style.display = 'block';
    document.querySelector('.quiz-button').style.display = 'none';
    showQuestion();
}

// Función para mostrar la pregunta actual
function showQuestion() {
    if (currentQuestion >= quizData.length) {
        showFinalScore();
        return;
    }
    
    const question = quizData[currentQuestion];
    document.getElementById('quiz-question').innerHTML = `
        <div style="margin-bottom: 10px;">Pregunta ${currentQuestion + 1} de ${quizData.length}</div>
        ${question.question}
    `;
    
    const optionsContainer = document.getElementById('quiz-options');
    optionsContainer.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const optionElement = document.createElement('button');
        optionElement.className = 'quiz-option';
        optionElement.textContent = option;
        optionElement.onclick = () => selectOption(index);
        optionsContainer.appendChild(optionElement);
    });
    
    document.getElementById('quiz-result').innerHTML = '';
}

// Función para seleccionar una opción
function selectOption(selectedIndex) {
    const question = quizData[currentQuestion];
    const options = document.querySelectorAll('.quiz-option');
    
    // Deshabilitar todos los botones
    options.forEach((option, index) => {
        option.onclick = null;
        if (index === question.correct) {
            option.classList.add('correct');
        } else if (index === selectedIndex && index !== question.correct) {
            option.classList.add('incorrect');
        }
    });
    
    // Mostrar resultado
    const resultDiv = document.getElementById('quiz-result');
    if (selectedIndex === question.correct) {
        score++;
        resultDiv.innerHTML = `
            <div style="color: #48bb78; background: #f0fff4; padding: 15px; border-radius: 10px;">
                <strong>¡Correcto! 🎉</strong><br>
                ${question.explanation}
            </div>
        `;
    } else {
        resultDiv.innerHTML = `
            <div style="color: #f56565; background: #fff5f5; padding: 15px; border-radius: 10px;">
                <strong>Incorrecto 😔</strong><br>
                ${question.explanation}<br>
                <small>La respuesta correcta era: <strong>${question.options[question.correct]}</strong></small>
            </div>
        `;
    }
    
    // Botón para siguiente pregunta
    setTimeout(() => {
        const nextButton = document.createElement('button');
        nextButton.textContent = currentQuestion === quizData.length - 1 ? 'Ver Resultados' : 'Siguiente Pregunta';
        nextButton.className = 'quiz-button';
        nextButton.style.marginTop = '15px';
        nextButton.onclick = () => {
            currentQuestion++;
            showQuestion();
        };
        resultDiv.appendChild(nextButton);
    }, 1000);
}

// Función para mostrar el puntaje final
function showFinalScore() {
    const percentage = Math.round((score / quizData.length) * 100);
    let message = '';
    let emoji = '';
    
    if (percentage >= 90) {
        message = '¡Excelente! Dominas los pronombres perfectamente.';
        emoji = '🏆';
    } else if (percentage >= 70) {
        message = '¡Muy bien! Tienes un buen conocimiento de los pronombres.';
        emoji = '🌟';
    } else if (percentage >= 50) {
        message = 'Bien, pero puedes mejorar. ¡Sigue practicando!';
        emoji = '📚';
    } else {
        message = 'Necesitas repasar más los pronombres. ¡No te desanimes!';
        emoji = '💪';
    }
    
    document.getElementById('quiz-question').innerHTML = `
        <h3>¡Quiz Completado! ${emoji}</h3>
    `;
    
    document.getElementById('quiz-options').innerHTML = '';
    
    document.getElementById('quiz-result').innerHTML = `
        <div style="background: linear-gradient(45deg, #667eea, #764ba2); color: white; padding: 25px; border-radius: 15px; margin: 20px 0;">
            <h3 style="margin-bottom: 15px;">Tus Resultados</h3>
            <div style="font-size: 2em; margin: 15px 0;">${score} / ${quizData.length}</div>
            <div style="font-size: 1.5em; margin: 15px 0;">${percentage}%</div>
            <p style="font-size: 1.1em; margin-top: 15px;">${message}</p>
            <button class="quiz-button" onclick="restartQuiz()" style="margin-top: 20px; background: white; color: #667eea;">
                Intentar de Nuevo
            </button>
            <button class="quiz-button" onclick="closeQuiz()" style="margin-top: 10px; background: rgba(255,255,255,0.2);">
                Volver al Inicio
            </button>
        </div>
    `;
}

// Función para reiniciar el quiz
function restartQuiz() {
    startQuiz();
}

// Función para cerrar el quiz
function closeQuiz() {
    document.getElementById('quiz-container').style.display = 'none';
    document.querySelector('.quiz-button').style.display = 'inline-block';
    quizActive = false;
}

// Efectos de sonido (opcional)
function playSound(type) {
    // Esta función podría implementarse con Web Audio API
    // para agregar efectos de sonido al quiz
    if (type === 'correct') {
        // Sonido de respuesta correcta
    } else if (type === 'incorrect') {
        // Sonido de respuesta incorrecta
    }
}

// Función para pronunciación (usando Web Speech API)
function speak(text, lang = 'en-US') {
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = lang;
        utterance.rate = 0.8;
        utterance.pitch = 1;
        window.speechSynthesis.speak(utterance);
    }
}

// Agregar botones de pronunciación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    // Agregar botones de pronunciación a cada pronombre
    const pronounCards = document.querySelectorAll('.pronoun-card');
    
    pronounCards.forEach(card => {
        const title = card.querySelector('h3');
        if (title) {
            const pronoun = title.textContent.split(' ')[0]; // Obtener solo el pronombre
            
            const speakButton = document.createElement('button');
            speakButton.innerHTML = '🔊';
            speakButton.className = 'speak-button';
            speakButton.style.cssText = `
                background: #4CAF50;
                color: white;
                border: none;
                border-radius: 50%;
                width: 40px;
                height: 40px;
                font-size: 18px;
                cursor: pointer;
                margin-left: 10px;
                transition: all 0.3s ease;
            `;
            
            speakButton.onmouseover = function() {
                this.style.background = '#45a049';
                this.style.transform = 'scale(1.1)';
            };
            
            speakButton.onmouseout = function() {
                this.style.background = '#4CAF50';
                this.style.transform = 'scale(1)';
            };
            
            speakButton.onclick = () => speak(pronoun);
            title.appendChild(speakButton);
        }
    });
    
    // Agregar evento de teclado para navegación
    document.addEventListener('keydown', function(e) {
        if (quizActive) {
            if (e.key >= '1' && e.key <= '4') {
                const optionIndex = parseInt(e.key) - 1;
                const options = document.querySelectorAll('.quiz-option');
                if (options[optionIndex] && options[optionIndex].onclick) {
                    options[optionIndex].click();
                }
            }
        }
    });
});

// Funcionalidad para cambiar entre modo claro y oscuro
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    const isDark = document.body.classList.contains('dark-theme');
    localStorage.setItem('darkTheme', isDark);
}

// Cargar tema guardado
document.addEventListener('DOMContentLoaded', function() {
    const isDark = localStorage.getItem('darkTheme') === 'true';
    if (isDark) {
        document.body.classList.add('dark-theme');
    }
});