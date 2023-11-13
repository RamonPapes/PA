document.addEventListener('DOMContentLoaded', () => {
    const userId = localStorage.getItem('userId'); // Obtém o ID do usuário do localStorage
    // Obtém todas as imagens com a classe "foto"
    const fotoElements = document.querySelectorAll('.foto img');
    const cinzaUrl = '../IMG/cinza.png';

    fotoElements.forEach((foto) => {
        foto.style.backgroundColor = 'gray';

        foto.setAttribute('src', cinzaUrl);
    })

    if (userId) {
        // Faça uma requisição ao backend para obter as conquistas do usuário
        fetch(`http://localhost:3000/users/${userId}`)
            .then((response) => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    console.error('Erro ao obter conquistas do usuário.');
                }
            })
            .then((user) => {
                if (user.achievements.length !== 0) {
                    user.achievements.forEach(achievement => {
                        console.log(achievement);
                        if (achievement.name == 'jogoMemoria') {
                            const jogoMemoriaImage = document.querySelector('.galeria img');
                            jogoMemoriaImage.style.backgroundColor = 'transparent';
                            jogoMemoriaImage.setAttribute('src', '../IMG/eco.png');
                        }
                        if (achievement.name == 'cacaPalavras') {
                            const cacaPalavrasImage = document.querySelector('.arara img');
                            cacaPalavrasImage.style.backgroundColor = 'transparent';
                            cacaPalavrasImage.setAttribute('src', '../IMG/tucano.png');
                        }
                        if (achievement.name == 'quebraCabeca') {
                            const quebraCabecaImage = document.querySelector('.ballena img');
                            quebraCabecaImage.style.backgroundColor = 'transparent';
                            quebraCabecaImage.setAttribute('src', '../IMG/lontra.png');
                        }
                    });
                }
            })
            .catch((error) => {
                console.error('Erro:', error);
            });
    }
});
