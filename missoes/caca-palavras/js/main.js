function mountBackEndUserRequest(path = '') {
	const userId = localStorage.getItem('userId');
	const BACKENDAPI = 'http://localhost:3000/users';
	return path ? `${BACKENDAPI}/${userId}/${path}` : `${BACKENDAPI}/${userId}`;
}


(function () {
	'use strict';

	var $form = document.querySelector('[data-js="form"]');
	var $search = document.querySelector('[data-js="search"]');
	var $tbody = document.querySelector('[data-js="tbody"]');
	var $timer = document.querySelector('[data-js="timer"]');
	var $errorCount = document.querySelector('[data-js="error-count"]');

	var startTime;
	var endTime;
	var errorCount = 0;

	const sendGameDataToBackend = (time, erros) => {
		const apiUrl = mountBackEndUserRequest('word-search-games');

		const data = {
			time: time,
			erros: erros,
		};

		fetch(apiUrl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		})
			.then((response) => {
				if (response.ok) {
					console.log('Dados do jogo enviados com sucesso para o backend.');
				} else {
					console.error('Erro ao enviar dados do jogo para o backend.');
				}
			})
			.catch((error) => {
				console.error('Erro ao enviar dados do jogo para o backend:', error);
			});
	};

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


	function getIndex(name) {
		if (gameWords.indexOf(name.toLowerCase()) > -1) {
			var i = gameWords.indexOf(name.toLowerCase());
			return indexes[i];
		}

		$search.value = '';
		return false;
	}

	function selectTd(line, column) {
		var tr = $tbody.children[line];
		var td = tr.children[column];
		td.classList.add("color");
		$search.value = '';
	}

	function startTimer() {
		startTime = new Date();
	}

	function stopTimer() {
		endTime = new Date();
		var timeDiff = endTime - startTime;
		var seconds = Math.floor(timeDiff / 1000);
		$timer.textContent = 'Tempo: ' + seconds + ' segundos';
		return seconds;
	}

	function incrementErrorCount() {
		errorCount++;
		$errorCount.textContent = 'Erros: ' + errorCount;
	}

	var lines = [];

	letters.map(function (item, index) {
		lines[index] = document.querySelector('[data-js="line' + index + '"]');
	});

	letters.forEach(function (item, index) {
		letters[index].forEach(function (item) {
			lines[index].insertAdjacentHTML('beforeend', '<td>' + item + '</td>');
		});
	});

	$form.addEventListener('submit', function (event) {
		event.preventDefault();
		var valueSearch = $search.value.toLowerCase();
		var getIndexes = getIndex(valueSearch);
		if (getIndexes) {
			for (var i = 0; i < getIndexes.length; i++) {
				selectTd(getIndexes[i][0], getIndexes[i][1])
			}
			console.log($timer);
		} else {
			incrementErrorCount();
		}
		if (isGameFinished()) {
			const seconds = stopTimer();
			console.log(seconds);
			sendGameDataToBackend(seconds, errorCount);
			setTimeout(()=>{
				alert('Parabéns, você finalizou o jogo!');
				window.location.href ="../../HTML/inicio.html" 
			},1000)
			
		}
	}, false);

	function isGameFinished() {
		for (var i = 0; i < gameWords.length; i++) {
			for (var j = 0; j < gameWords[i].length; j++) {
				var line = indexes[i][j][0];
				var column = indexes[i][j][1];
				if (!$tbody.children[line].children[column].classList.contains("color")) {
					return false; // Se uma letra não foi encontrada, o jogo não está finalizado
				}
			}
		}
		return true; // Se todas as letras foram encontradas, o jogo está finalizado
	}

	function updateTimer() {
		var currentTime = new Date();
		var timeElapsed = Math.floor((currentTime - startTime) / 1000); // Tempo decorrido em segundos
		var minutes = Math.floor(timeElapsed / 60);
		var seconds = timeElapsed % 60;
		$timer.textContent = 'Tempo: ' + minutes + 'm ' + seconds + 's';
	}

	function updateErrorCount() {
		$errorCount.textContent = 'Erros: ' + errorCount;
	}

	setInterval(updateTimer, 1000); // Atualiza o tempo a cada segundo

	startTimer();

})();