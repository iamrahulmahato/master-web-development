document.getElementById('calculateBtn').addEventListener('click', function() {
    const input = document.getElementById('matrixInput').value;
    const matrix = parseMatrix(input);
    
    if (matrix && isSquareMatrix(matrix)) {
        if (matrix.length > 3) {
            displayError('This calculator currently supports only 2x2 and 3x3 matrices.');
        } else {
            const eigen = calculateEigenvaluesAndVectors(matrix);
            displayResults(eigen);
        }
    } else {
        displayError('Invalid matrix input. Ensure the matrix is square (NxN) and contains only numbers.');
    }
});

function parseMatrix(input) {
    try {
        const rows = input.trim().split('\n').map(row => row.split(',').map(Number));
        const columnCount = rows[0].length;
        for (let i = 0; i < rows.length; i++) {
            if (rows[i].length !== columnCount || rows[i].some(isNaN)) {
                return null; // If matrix is irregular or contains non-numeric values
            }
        }
        return rows;
    } catch (error) {
        return null; // If parsing fails
    }
}

function isSquareMatrix(matrix) {
    return matrix.length === matrix[0].length;
}

function calculateEigenvaluesAndVectors(matrix) {
    if (matrix.length === 2) {
        // Calculate for 2x2 matrix
        const a = matrix[0][0];
        const b = matrix[0][1];
        const c = matrix[1][0];
        const d = matrix[1][1];
        const trace = a + d;
        const det = a * d - b * c;
        const eigenvalue1 = (trace + Math.sqrt(trace ** 2 - 4 * det)) / 2;
        const eigenvalue2 = (trace - Math.sqrt(trace ** 2 - 4 * det)) / 2;

        const eigenvector1 = calculateEigenvector(matrix, eigenvalue1);
        const eigenvector2 = calculateEigenvector(matrix, eigenvalue2);

        return {
            eigenvalues: [eigenvalue1.toFixed(4), eigenvalue2.toFixed(4)],
            eigenvectors: [
                `(${eigenvector1.map(val => val.toFixed(4)).join(', ')})`,
                `(${eigenvector2.map(val => val.toFixed(4)).join(', ')})`
            ]
        };
    } else if (matrix.length === 3) {
        return {
            eigenvalues: ['(Calculation for 3x3 matrices not supported yet)'],
            eigenvectors: ['(Calculation for 3x3 eigenvectors not supported yet)']
        };
    } else {
        return {
            eigenvalues: ['Error calculating eigenvalues'],
            eigenvectors: ['Error calculating eigenvectors']
        };
    }
}

function calculateEigenvector(matrix, eigenvalue) {
    const a = matrix[0][0] - eigenvalue;
    const b = matrix[0][1];
    const c = matrix[1][0];
    const d = matrix[1][1] - eigenvalue;

    if (b !== 0) {
        return [1, -a / b]; // Eigenvector for non-zero b
    } else if (c !== 0) {
        return [-d / c, 1]; // Eigenvector for non-zero c
    } else {
        return [1, 0]; // Default eigenvector for diagonal matrices
    }
}

function displayResults(eigen) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `<h2>Eigenvalues:</h2><p>${eigen.eigenvalues.join(', ')}</p>
                            <h2>Eigenvectors:</h2><p>${eigen.eigenvectors.join(', ')}</p>`;
}

function displayError(message) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `<p style="color: red;">${message}</p>`;
}
