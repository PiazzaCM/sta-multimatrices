import express from 'express';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use( express.static('public') );


// Ruta para manejar la solicitud POST
app.post('/multiplicar', (req, res) => {
    const { matrix1, matrix2 } = req.body; // Obtener las matrices del cuerpo de la solicitud
    // Realizar la multiplicación de matrices
    const result = multiplyMatrices(matrix1, matrix2);
    res.json(result); // Enviar el resultado como respuesta
});

// Función para multiplicar matrices
function multiplyMatrices(matrix1, matrix2) {
    const rows1 = matrix1.length;
    const cols1 = matrix1[0].length;
    const rows2 = matrix2.length;
    const cols2 = matrix2[0].length;

    const result = [];
    for (let i = 0; i < rows1; i++) {
        result[i] = [];
        for (let j = 0; j < cols2; j++) {
            let sum = 0;
            for (let k = 0; k < cols1; k++) {
                sum += matrix1[i][k] * matrix2[k][j];
            }
            result[i][j] = sum;
        }
    }
    return result;
}

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});