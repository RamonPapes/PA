const setaLista = document.getElementById("seta-lista");
const listaTurma = document.getElementById("lista-turma");


window.addEventListener("DOMContentLoaded", (event) => { 
    if (setaLista) {
        setaLista.addEventListener("click", () => {
            if (listaTurma.classList.contains("hidden")) {
                listaTurma.classList.remove("hidden");
                setaLista.src = "../IMG/arrow-up-removebg-preview.png";
            } else {
                listaTurma.classList.add("hidden");
                setaLista.src = "../IMG/arrow-down-removebg-preview.png";
            }
        });
    }
});