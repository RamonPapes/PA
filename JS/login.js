document.addEventListener('DOMContentLoaded', function () {
    const emailInput = document.getElementById('email');
    const senhaInput = document.getElementById('senha');
    const confirmarButton = document.querySelector('.confirmar a');

    confirmarButton.addEventListener('click', (event) => {
        event.preventDefault();
        const email = emailInput.value;
        const senha = senhaInput.value;

        if (!email || !senha) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        // Fazer uma solicitação POST para o backend para fazer o login
        fetch('http://localhost:3000/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({ email, password: senha }),
        })
            .then(async (response) => {
                try {
                    if (response.status === 201) {
                        const data = await response.json();
                        localStorage.setItem('userId', data); // Altere para data._id para armazenar o ID
                        alert('Login realizado com sucesso!');
                        window.location.href = 'inicio.html';
                    } else {
                        alert('Credenciais inválidas. Por favor, verifique seus dados e tente novamente.');
                        throw new Error('Credenciais inválidas');
                    }
                } catch (error) {
                    console.error('Erro:', error);
                }
            });
    });
});
