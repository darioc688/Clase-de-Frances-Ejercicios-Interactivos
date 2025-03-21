/* script.js */

/**
 * Inicializa la sección de ejercicios para un grado determinado.
 * @param {Array} questions - Arreglo de preguntas (20 objetos).
 * @param {String} gradeName - Nombre del grado (e.g., "Grado 1").
 */
function initializeGrade(questions, gradeName) {
  let currentQuestionIndex = 0;
  let correctCount = 0;
  const totalQuestions = questions.length;
  
  const container = document.getElementById('exercise-container');
  const feedbackDiv = document.getElementById('feedback');

  // Muestra el ejercicio actual en el contenedor
  function showQuestion() {
    // Si ya no hay más preguntas, mostrar resultados
    if (currentQuestionIndex >= totalQuestions) {
      const score = Math.round((correctCount / totalQuestions) * 100);
      container.innerHTML = `
        <h2>¡Has terminado ${gradeName}!</h2>
        <p>Respuestas correctas: ${correctCount} de ${totalQuestions}</p>
        <p>Tu calificación: ${score} / 100</p>
        <button onclick="location.reload()">Reintentar</button>
      `;
      feedbackDiv.textContent = "";
      return;
    }

    // Limpia el contenedor y el feedback
    container.innerHTML = "";
    feedbackDiv.textContent = "";

    // Obtenemos la pregunta actual
    const q = questions[currentQuestionIndex];

    // Título del ejercicio
    let html = `<h2>Ejercicio ${currentQuestionIndex + 1} de ${totalQuestions}</h2>
                <p>${q.question}</p>`;

    // Generamos el input según el tipo
    if (q.type === "fill") {
      html += `<input type="text" id="userAnswer" placeholder="Escribe tu respuesta...">`;
    } else if (q.type === "mcq") {
      q.options.forEach(option => {
        html += `
          <label>
            <input type="radio" name="mcq" value="${option}"> 
            ${option}
          </label><br>
        `;
      });
    } else if (q.type === "select") {
      html += `<select id="userAnswer">
                <option value="">Selecciona una opción</option>`;
      q.options.forEach(option => {
        html += `<option value="${option}">${option}</option>`;
      });
      html += `</select>`;
    }

    // Botón para comprobar la respuesta
    html += `<br><button onclick="submitAnswer()">Comprobar</button>`;

    container.innerHTML = html;
  }

  // Comprueba la respuesta y avanza al siguiente ejercicio
  window.submitAnswer = function() {
    const currentQ = questions[currentQuestionIndex];
    let userResponse = "";

    if (currentQ.type === "fill") {
      userResponse = document.getElementById('userAnswer').value.trim().toLowerCase();
    } else if (currentQ.type === "mcq") {
      const radios = document.getElementsByName('mcq');
      for (const radio of radios) {
        if (radio.checked) {
          userResponse = radio.value.toLowerCase();
          break;
        }
      }
    } else if (currentQ.type === "select") {
      userResponse = document.getElementById('userAnswer').value.trim().toLowerCase();
    }

    // Verifica que el usuario haya seleccionado o escrito algo
    if (!userResponse) {
      feedbackDiv.textContent = "Por favor, selecciona o escribe una respuesta.";
      feedbackDiv.style.color = "red";
      return;
    }

    // Compara con la respuesta correcta
    if (userResponse === currentQ.correctAnswer.toLowerCase()) {
      feedbackDiv.textContent = "¡Correcto!";
      feedbackDiv.style.color = "green";
      correctCount++;
    } else {
      feedbackDiv.textContent = `Incorrecto. La respuesta correcta es: ${currentQ.correctAnswer}`;
      feedbackDiv.style.color = "red";
    }

    currentQuestionIndex++;
    setTimeout(showQuestion, 1000); // Espera 1 segundo y muestra la siguiente
  };

  // Inicia mostrando la primera pregunta
  showQuestion();
}
