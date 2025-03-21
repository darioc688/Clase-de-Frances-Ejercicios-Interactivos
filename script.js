/* script.js */

/* Función común para inicializar el ejercicio en cada grado.
   Se reciben:
   - questions: Array con 20 ejercicios.
   - gradeName: Nombre del grado (para mostrar en mensajes, etc.)
*/
function initializeGrade(questions, gradeName) {
  let currentQuestionIndex = 0;
  let correctCount = 0;
  const totalQuestions = questions.length;
  const container = document.getElementById('exercise-container');
  const feedbackDiv = document.getElementById('feedback');
  
  // Muestra el ejercicio actual según su tipo
  function showQuestion() {
    container.innerHTML = ""; // Limpia el contenido
    if (currentQuestionIndex >= totalQuestions) {
      // Terminar: calcular puntaje (cada ejercicio suma 5 puntos)
      const score = Math.round((correctCount / totalQuestions) * 100);
      container.innerHTML = `<h2>¡Has terminado ${gradeName}!</h2>
                             <p>Respuestas correctas: ${correctCount} de ${totalQuestions}</p>
                             <p>Tu calificación: ${score} / 100</p>
                             <button onclick="location.reload()">Reintentar</button>`;
      return;
    }
    
    const q = questions[currentQuestionIndex];
    let html = `<h2>Ejercicio ${currentQuestionIndex + 1} de ${totalQuestions}</h2>
                <p>${q.question}</p>`;
    
    // Según el tipo de ejercicio, se genera el input correspondiente
    if (q.type === "fill") {
      html += `<input type="text" id="userAnswer" placeholder="Escribe tu respuesta">`;
    } else if (q.type === "mcq") {
      q.options.forEach(option => {
        html += `<label><input type="radio" name="mcq" value="${option}"> ${option}</label><br>`;
      });
    } else if (q.type === "select") {
      html += `<select id="userAnswer">
                <option value="">Selecciona una opción</option>`;
      q.options.forEach(option => {
        html += `<option value="${option}">${option}</option>`;
      });
      html += `</select>`;
    }
    
    html += `<br><button onclick="submitAnswer()">Comprobar</button>`;
    container.innerHTML = html;
    feedbackDiv.textContent = "";
  }
  
  // Procesa la respuesta del usuario y actualiza el puntaje
  window.submitAnswer = function() {
    let userResponse = "";
    const currentQ = questions[currentQuestionIndex];
    if (currentQ.type === "fill") {
      userResponse = document.getElementById('userAnswer').value.trim().toLowerCase();
    } else if (currentQ.type === "mcq") {
      const radios = document.getElementsByName('mcq');
      for (const radio of radios) {
        if (radio.checked) {
          userResponse = radio.value;
          break;
        }
      }
    } else if (currentQ.type === "select") {
      userResponse = document.getElementById('userAnswer').value;
    }
    
    if (userResponse === "") {
      feedbackDiv.textContent = "Por favor, selecciona o escribe una respuesta.";
      feedbackDiv.style.color = "red";
      return;
    }
    
    // Comprueba la respuesta (comparación simple en minúsculas)
    if (userResponse.toLowerCase() === currentQ.correctAnswer.toLowerCase()) {
      feedbackDiv.textContent = "¡Correcto!";
      feedbackDiv.style.color = "green";
      correctCount++;
    } else {
      feedbackDiv.textContent = `Incorrecto. La respuesta correcta es: ${currentQ.correctAnswer}`;
      feedbackDiv.style.color = "red";
    }
    
    currentQuestionIndex++;
    setTimeout(showQuestion, 1000); // Espera 1 segundo antes de pasar al siguiente ejercicio
  }
  
  // Inicia el primer ejercicio
  showQuestion();
}
