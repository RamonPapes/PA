document.addEventListener('DOMContentLoaded', () => {
    const userId = localStorage.getItem('userId');

    if (userId) {
        fetch(`http://localhost:3000/users/${userId}`)
            .then((response) => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    console.error('Erro ao obter informações do usuário.');
                }
            })
            .then((userData) => {
                const userName = document.getElementById('userName');
                const userEmail = document.getElementById('userEmail');

                userName.innerText = `Nome: ${userData.name}`;
                userEmail.innerText = `Email: ${userData.email}`;

                userName.style.color = 'white';
                userEmail.style.color = 'white';
                userName.style.fontFamily = 'inherit';
                userEmail.style.fontFamily = 'inherit';
                userName.style.textAlign = 'left';
                userEmail.style.textAlign = 'left';

                const editButton = document.getElementById('editButton');
                const userInfo = document.getElementById('userInfo');
                const editForm = document.getElementById('editForm');
                const newNameInput = document.getElementById('newName');
                const newEmailInput = document.getElementById('newEmail');
                const saveButton = document.getElementById('saveButton');
                const cancelButton = document.getElementById('cancelButton');

                editButton.addEventListener('click', () => {
                    userInfo.style.display = 'none';
                    editForm.style.display = 'block';
                    newNameInput.value = userData.name;
                    newEmailInput.value = userData.email;
                });

                saveButton.addEventListener('click', async () => {
                    const newName = newNameInput.value;
                    const newEmail = newEmailInput.value;

                    try {
                        const response = await fetch(`http://localhost:3000/users/${userId}`, {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                name: newName,
                                email: newEmail,
                            }),
                        });

                        if (response.status === 200) {
                            userName.innerText = `Nome: ${newName}`;
                            userEmail.innerText = `Email: ${newEmail}`;
                            userInfo.style.display = 'block';
                            editForm.style.display = 'none';
                        } else {
                            console.error('Falha ao atualizar as informações do usuário.');
                        }
                    } catch (error) {
                        console.error('Erro:', error);
                    }
                });

                cancelButton.addEventListener('click', () => {
                    userInfo.style.display = 'block';
                    editForm.style.display = 'none';
                });
            })
            .catch((error) => {
                console.error('Erro:', error);
            });
    }
    else{
        console.log('sem usuario')
    }
});
