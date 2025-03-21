/* script.js */

// Función para comprobar el ejercicio de completar espacios
function checkFillInBlanks() {
  const userAnswer = document.getElementById('blank1').value.trim().toLowerCase();
  const correctAnswer = 'parle';
  const resultElement = document.getElementById('fillResult');
  if (userAnswer === correctAnswer) {
    resultElement.textContent = '¡Correcto!';
    resultElement.style.color = 'green';
  } else {
    resultElement.textContent = 'Incorrecto. Inténtalo de nuevo.';
    resultElement.style.color = 'red';
  }
}

// Función para comprobar la opción múltiple
function checkMCQ() {
  const choices = document.getElementsByName('mcq');
  let selectedValue = '';
  for (const choice of choices) {
    if (choice.checked) {
      selectedValue = choice.value;
      break;
    }
  }
  const resultElement = document.getElementById('mcqResult');
  if (selectedValue === 'pomme') {
    resultElement.textContent = '¡Correcto!';
    resultElement.style.color = 'green';
  } else {
    resultElement.textContent = 'Incorrecto. La respuesta correcta es "pomme".';
    resultElement.style.color = 'red';
  }
}

// Función para comprobar la selección de palabra
function checkSelectWord() {
  const dropdown = document.getElementById('selectWordDropdown');
  const selected = dropdown.value;
  const resultElement = document.getElementById('selectResult');
  if (selected === 'manger') {
    resultElement.textContent = '¡Correcto!';
    resultElement.style.color = 'green';
  } else {
    resultElement.textContent = 'Incorrecto. La respuesta correcta es "manger".';
    resultElement.style.color = 'red';
  }
}
