function validar() {
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const repSenha = document.getElementById('Repsenha').value;

    // Validar se campos obrigatórios estão preenchidos
    if (!nome || !email || !senha || !repSenha) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    // Validar se a senha e a repetição de senha coincidem
    if (senha !== repSenha) {
        alert('As senhas não coincidem.');
        return;
    }

    // Desativar o botão para evitar cliques adicionais
    const cadastrarButton = document.querySelector('input[type="button"]');
    cadastrarButton.disabled = true;

    // Criar um objeto de usuário com os dados do formulário
    const user = {
        name: nome,
        email: email,
        password: senha,
    };

    fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.id) {
                alert('Usuário cadastrado com sucesso!');
                setTimeout(() => {
                    window.location.href = 'index.html'; // Redirecionar para a página de login após 2 segundos
                }, 2000);
            } else {
                alert('Erro ao cadastrar o usuário. Verifique os campos e tente novamente.');
                cadastrarButton.disabled = false; // Reativar o botão em caso de erro
            }
        })
        .catch((error) => {
            console.error('Erro:', error);
        });
}

const enviar = document.getElementById("enviar");

enviar.addEventListener('click',validar);