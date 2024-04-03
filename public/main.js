function createMatrices() {
  const rows = parseInt(document.getElementById('rows').value);
  const columns = parseInt(document.getElementById('columns').value);

  const rows2 = parseInt(document.getElementById('rows2').value);
  const columns2 = parseInt(document.getElementById('columns2').value);

  if (columns !== rows2) {
      alert('El número de columnas de la matriz 1 es distinto al número de filas de la matriz 2');
      document.getElementById('matrices').innerHTML = '';
  } else {
      const matrix1Id = 'matriz1';
      const matrix2Id = 'matriz2';
      const matrix1 = createMatrix(rows, columns, 'matriz1', matrix1Id);
      const matrix2 = createMatrix(rows2, columns2, 'matriz2', matrix2Id);

      document.getElementById('matrices').innerHTML = matrix1 + matrix2;

      // Asociar evento a los inputs de las matrices
      const matrix1Inputs = document.querySelectorAll(`#${matrix1Id} .matrix-input`);
      const matrix2Inputs = document.querySelectorAll(`#${matrix2Id} .matrix-input`);
      matrix1Inputs.forEach(input => {
          input.addEventListener('input', multiplyMatrices);
      });
      matrix2Inputs.forEach(input => {
          input.addEventListener('input', multiplyMatrices);
      });
  }
}

function createMatrix(rows, columns, matrixName, matrixId) {
  let matrixHTML = `<div id="${matrixId}" class="matrix">
                      <h3>${matrixName}</h3>`;
  for (let i = 0; i < rows; i++) {
      matrixHTML += '<div class="matrix-row">';
      for (let j = 0; j < columns; j++) {
          matrixHTML += `<input type="number" class="matrix-input" id="${matrixId}_${i}_${j}">`;
      }
      matrixHTML += '</div>';
  }
  matrixHTML += '</div>';
  return matrixHTML;
}

function multiplyMatrices() {
  const myButton = document.getElementById('myButton');
  myButton.addEventListener('click', () => {
      const rows1 = parseInt(document.getElementById('rows').value);
      const cols1 = parseInt(document.getElementById('columns').value);
      const rows2 = parseInt(document.getElementById('rows2').value);
      const cols2 = parseInt(document.getElementById('columns2').value);

      const matrix1 = getMatrixValues('matrix1', rows1, cols1);
      const matrix2 = getMatrixValues('matrix2', rows2, cols2);

      if (matrix1 && matrix2) {
          // Enviar los datos al servidor
          fetch('/multiplicar', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({ matrix1, matrix2 }) // Enviar las matrices como datos JSON
          })
              .then(response => response.json()) // Convertir la respuesta a JSON
              .then(resultado => {
                  // Mostrar el resultado obtenido del servidor
                  displayResult(resultado);
              })
              .catch(error => {
                  console.error('Error:', error);
              });
      }

  });
}


function getMatrixValues(matrixId, rows, columns) {
  const matrix = [];
  for (let i = 0; i < rows; i++) {
      matrix[i] = [];
      for (let j = 0; j < columns; j++) {
          const value = parseFloat(document.getElementById(`${matrixId}_${i}_${j}`).value);
          matrix[i][j] = value;
      }
  }
  return matrix;
}

function displayResult(result) {
  let resultHTML = '<h2>Matriz Resultante:</h2>';
  resultHTML += '<table>';
  for (let i = 0; i < result.length; i++) {
      resultHTML += '<tr>';
      for (let j = 0; j < result[i].length; j++) {
          resultHTML += `<td class="matrix-input">${result[i][j]}</td>`;
      }
      resultHTML += '</tr>';
  }
  resultHTML += '</table>';
  document.getElementById('resultado').innerHTML = resultHTML;
}