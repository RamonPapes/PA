function createWordSearch(gameWords) {
  const gridSize = 10; // Tamanho da grade
  const letters = []; // Matriz de letras
  const indexes = []; // Lista de índices das letras das palavras

  // Inicialize a matriz de letras com espaços em branco
  for (let i = 0; i < gridSize; i++) {
    letters.push([]);
    for (let j = 0; j < gridSize; j++) {
      letters[i][j] = ' ';
    }
  }

  // Função para verificar se é possível inserir uma palavra na grade
  function canPlaceWord(word, row, col, direction) {
    if (direction === 'horizontal') {
      if (col + word.length > gridSize) return false;
      for (let i = 0; i < word.length; i++) {
        if (letters[row][col + i] !== ' ' && letters[row][col + i] !== word[i]) {
          return false;
        }
      }
    } else {
      if (row + word.length > gridSize) return false;
      for (let i = 0; i < word.length; i++) {
        if (letters[row + i][col] !== ' ' && letters[row + i][col] !== word[i]) {
          return false;
        }
      }
    }
    return true;
  }

  // Função para inserir uma palavra na grade
  function placeWord(word, row, col, direction) {
    indexes.push([]);
    for (let i = 0; i < word.length; i++) {
      if (direction === 'horizontal') {
        letters[row][col + i] = word[i];
        indexes[indexes.length - 1].push([row, col + i]);
      } else {
        letters[row + i][col] = word[i];
        indexes[indexes.length - 1].push([row + i, col]);
      }
    }
  }

  // Insira as palavras na grade
  for (const word of gameWords) {
    let placed = false;
    while (!placed) {
      const row = Math.floor(Math.random() * gridSize);
      const col = Math.floor(Math.random() * gridSize);
      const direction = Math.random() < 0.5 ? 'horizontal' : 'vertical';

      if (canPlaceWord(word, row, col, direction)) {
        placeWord(word, row, col, direction);
        placed = true;
      }
    }
  }

  // Preencha os espaços vazios com letras aleatórias
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      if (letters[i][j] === ' ') {
        letters[i][j] = alphabet[Math.floor(Math.random() * alphabet.length)];
      }
    }
  }

  return { letters, indexes };
}

const gameWords = ['reciclagem', 'energia', 'preservar', 'natureza', 'poluir', 'floresta', 'agua', 'terra'];

const { letters, indexes } = createWordSearch(gameWords);

// Imprima a matriz de letras
console.log(letters);

// Imprima a lista de índices das letras das palavras
console.log(indexes);
